import { NextRequest, NextResponse } from "next/server";
import { validateAudioBuffer } from "@/lib/security/audio-validator";
import { inMemoryLimiterInstance, getClientIdentifier } from "@/lib/security/rate-limiter";
import { getDogAiProvider } from "@/lib/ai/provider";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const requestStart = Date.now();

  try {
    // 1. Rate Limiting Check with safe connection source fallback
    const connectionSource =
      (req as unknown as { ip?: string }).ip ||
      (req as unknown as { socket?: { remoteAddress?: string } }).socket?.remoteAddress ||
      null;
    const clientIp = getClientIdentifier(req.headers, connectionSource);

    const rateLimit = await inMemoryLimiterInstance.check({
      identifier: clientIp,
      route: "/api/translate-dog",
      action: "analyze_audio",
    });

    if (!rateLimit.allowed) {
      console.warn(`[API] Rate limit exceeded for identifier: ${clientIp.slice(0, 8)}...`);
      return NextResponse.json(
        {
          status: "rate_limited",
          error: "Rate limit reached. Please wait a moment before analyzing another sound.",
          retryAfterMs: rateLimit.resetTimeMs - Date.now(),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimit.resetTimeMs - Date.now()) / 1000)),
          },
        }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const audioEntry = formData.get("audio");
    const context = (formData.get("context") as string) || "unknown";
    const reportedDuration = Number(formData.get("duration")) || undefined;

    if (!audioEntry || !(audioEntry instanceof Blob)) {
      return NextResponse.json(
        {
          status: "invalid_audio",
          error: "Missing or invalid audio recording in request payload.",
        },
        { status: 400 }
      );
    }

    const fileName = (audioEntry as File).name || "audio.wav";
    const clientMime = audioEntry.type || "";

    // Convert Blob to ephemeral Buffer in memory
    const arrayBuffer = await audioEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Strict Server-Side Audio Security & Magic Bytes Validation
    const validation = validateAudioBuffer(buffer, clientMime, fileName);
    if (!validation.valid) {
      const err = validation.error || "Audio validation failed.";
      let statusCategory = "invalid_audio";

      if (err.includes("exceeds maximum allowed size")) {
        statusCategory = "audio_too_large";
      } else if (err.includes("too brief")) {
        statusCategory = "audio_too_short";
      } else if (err.includes("exceeds maximum allowed")) {
        statusCategory = "audio_too_long";
      } else if (err.includes("unsupported audio format")) {
        statusCategory = "unsupported_audio";
      }

      console.warn(`[API] Validation failed [${statusCategory}]: ${err}`);
      return NextResponse.json(
        { status: statusCategory, error: err },
        { status: 400 }
      );
    }

    // 4. Safe AI Provider Dispatch via Abstraction
    const provider = getDogAiProvider();
    const result = await provider.analyzeDogSound({
      audioBuffer: buffer,
      mimeType: clientMime || `audio/${validation.detectedFormat}`,
      durationSeconds: validation.estimatedDurationSeconds || reportedDuration,
      fileName,
      context,
    });

    // 5. Ephemeral Audio Clean-up: buffer leaves scope and is discarded by GC

    // 6. Safe Server-Side Diagnostic Logging (Never log raw audio or keys)
    const totalLatency = Date.now() - requestStart;
    console.log(
      `[API] /api/translate-dog complete: provider=${provider.name} status=${result.status} vocalization=${result.vocalization} latency=${totalLatency}ms`
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    // Suppress internal secrets and stack traces from public responses
    const errMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[API Error] /api/translate-dog unexpected failure:", errMsg);

    return NextResponse.json(
      {
        status: "internal_error",
        error:
          "An unexpected error occurred while analyzing the audio. Please verify your file and try again.",
      },
      { status: 500 }
    );
  }
}
