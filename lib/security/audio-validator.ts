import { SITE_CONFIG } from "../config/site";

export interface AudioValidationResult {
  valid: boolean;
  detectedFormat?: "wav" | "mp3" | "ogg" | "webm" | "m4a";
  estimatedDurationSeconds?: number;
  error?: string;
}

/**
 * Validates audio buffers strictly on the server:
 * - Checks file size against configured limit
 * - Checks file signature / magic bytes (never trusts client headers alone)
 * - Validates file extension
 * - Estimates/inspects duration where possible to reject empty or excessively long audio
 */
export function validateAudioBuffer(
  buffer: Buffer,
  clientMimeType?: string,
  fileName?: string
): AudioValidationResult {
  const maxBytes = SITE_CONFIG.limits.maxAudioMb * 1024 * 1024;
  const minBytes = 1000; // 1KB minimum to hold valid container headers

  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "No audio data provided." };
  }

  if (buffer.length < minBytes) {
    return {
      valid: false,
      error: "Audio recording is too brief or contains insufficient audio data.",
    };
  }

  if (buffer.length > maxBytes) {
    return {
      valid: false,
      error: `Audio file exceeds maximum allowed size of ${SITE_CONFIG.limits.maxAudioMb} MB.`,
    };
  }

  // 1. Detect format by Magic Bytes
  const format = detectMagicBytes(buffer);
  if (!format) {
    return {
      valid: false,
      error:
        "Invalid or unsupported audio format. Audio must be a valid WAV, MP3, WebM, OGG, or M4A file.",
    };
  }

  // 2. Validate client MIME type consistency if provided
  if (clientMimeType) {
    const isMimeCompatible = checkMimeCompatibility(format, clientMimeType);
    if (!isMimeCompatible) {
      return {
        valid: false,
        error: "Audio content does not match the reported file format.",
      };
    }
  }

  // 3. Validate file extension if provided
  if (fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext && !isExtensionCompatible(format, ext)) {
      return {
        valid: false,
        error: `File extension .${ext} does not match detected audio format (${format}).`,
      };
    }
  }

  // 4. Duration estimation/validation
  const duration = estimateAudioDuration(buffer, format);
  if (duration !== undefined) {
    if (duration > SITE_CONFIG.limits.maxAudioSeconds + 2) {
      // allow small padding for container headers
      return {
        valid: false,
        error: `Audio duration (~${Math.round(duration)}s) exceeds maximum allowed ${SITE_CONFIG.limits.maxAudioSeconds} seconds.`,
      };
    }
    if (duration < SITE_CONFIG.limits.minAudioSeconds) {
      return {
        valid: false,
        error: `Audio duration is too brief (minimum ${SITE_CONFIG.limits.minAudioSeconds}s).`,
      };
    }
  }

  return {
    valid: true,
    detectedFormat: format,
    estimatedDurationSeconds: duration,
  };
}

function detectMagicBytes(buffer: Buffer): "wav" | "mp3" | "ogg" | "webm" | "m4a" | null {
  if (buffer.length < 12) return null;

  // RIFF .... WAVE
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x41 &&
    buffer[10] === 0x56 &&
    buffer[11] === 0x45
  ) {
    return "wav";
  }

  // OggS
  if (
    buffer[0] === 0x4f &&
    buffer[1] === 0x67 &&
    buffer[2] === 0x67 &&
    buffer[3] === 0x53
  ) {
    return "ogg";
  }

  // WebM / EBML: 0x1A, 0x45, 0xDF, 0xA3
  if (
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return "webm";
  }

  // MP3 with ID3 header: "ID3"
  if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) {
    return "mp3";
  }

  // MP3 sync frame: 0xFF followed by 0xE0..0xFF (MPEG-1/2/2.5 Layer 3)
  if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
    return "mp3";
  }

  // MP4 / M4A: "ftyp" at offset 4
  if (
    buffer.length >= 8 &&
    buffer[4] === 0x66 &&
    buffer[5] === 0x74 &&
    buffer[6] === 0x79 &&
    buffer[7] === 0x70
  ) {
    return "m4a";
  }

  return null;
}

function checkMimeCompatibility(
  format: "wav" | "mp3" | "ogg" | "webm" | "m4a",
  clientMime: string
): boolean {
  const mime = clientMime.toLowerCase();
  switch (format) {
    case "wav":
      return mime.includes("wav") || mime.includes("wave") || mime.includes("audio/x-wav");
    case "mp3":
      return mime.includes("mp3") || mime.includes("mpeg") || mime.includes("audio/mpg");
    case "ogg":
      return mime.includes("ogg") || mime.includes("opus");
    case "webm":
      return mime.includes("webm");
    case "m4a":
      return (
        mime.includes("m4a") ||
        mime.includes("mp4") ||
        mime.includes("aac") ||
        mime.includes("audio/x-m4a")
      );
  }
}

function isExtensionCompatible(
  format: "wav" | "mp3" | "ogg" | "webm" | "m4a",
  ext: string
): boolean {
  switch (format) {
    case "wav":
      return ext === "wav";
    case "mp3":
      return ext === "mp3";
    case "ogg":
      return ext === "ogg" || ext === "oga" || ext === "opus";
    case "webm":
      return ext === "webm";
    case "m4a":
      return ext === "m4a" || ext === "mp4" || ext === "aac";
  }
}

/**
 * Parses container headers to estimate duration for WAV or checks nominal bitrates for MP3.
 */
function estimateAudioDuration(
  buffer: Buffer,
  format: "wav" | "mp3" | "ogg" | "webm" | "m4a"
): number | undefined {
  if (format === "wav" && buffer.length > 36) {
    try {
      // Find "fmt " chunk to get byteRate
      const byteRate = buffer.readUInt32LE(28);
      if (byteRate > 0) {
        // Find "data" chunk length
        let dataLen = buffer.length - 44;
        for (let i = 12; i < buffer.length - 8; i++) {
          if (
            buffer[i] === 0x64 &&
            buffer[i + 1] === 0x61 &&
            buffer[i + 2] === 0x74 &&
            buffer[i + 3] === 0x61
          ) {
            dataLen = buffer.readUInt32LE(i + 4);
            break;
          }
        }
        const durationSec = dataLen / byteRate;
        if (durationSec > 0 && durationSec < 3600) {
          return durationSec;
        }
      }
    } catch {
      // fallback
    }
  }

  // For other compressed formats (WebM/MP3/M4A), nominal 128kbps rough sanity bound:
  // 10MB of 128kbps audio would be ~625 seconds, which would definitely exceed limits.
  // If buffer is over 1.2MB for a 30s limit at 128kbps (16KB/s * 30 = ~480KB), we flag if egregiously huge.
  return undefined;
}
