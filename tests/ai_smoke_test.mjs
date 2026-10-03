import assert from "node:assert/strict";
import fs from "node:fs";
import { createJiti } from "jiti";

// Auto-load .env.local if present so CLI invocation works directly without special flags
if (fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...rest] = trimmed.split("=");
      const val = rest.join("=").trim();
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const jiti = createJiti(import.meta.url, {
  alias: { "@": process.cwd() },
});

const { getDogAiProvider } = jiti("../lib/ai/provider.ts");

/**
 * Generates mathematically modeled PCM WAV audio buffers matching legitimate canine acoustic profiles.
 */
function createCanineWav(
  type = "bark",
  options = { durationSeconds: 2, sampleRate: 16000 }
) {
  const sampleRate = options.sampleRate || 16000;
  const duration = options.durationSeconds || 2;
  const numSamples = Math.floor(sampleRate * duration);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    switch (type) {
      case "clear_bark": {
        // Staccato bark burst: 350 Hz fundamental with harmonic overtone, pulsed every 0.6s
        const burstT = t % 0.6;
        if (burstT < 0.22) {
          const env = Math.sin((Math.PI * burstT) / 0.22);
          const f0 = Math.sin(2 * Math.PI * 360 * t);
          const f1 = 0.5 * Math.sin(2 * Math.PI * 720 * t);
          sample = Math.floor((f0 + f1) * env * 15000);
        }
        break;
      }
      case "repeated_bark": {
        // Fast repeating alarm barks: 4 bursts per second
        const burstT = t % 0.25;
        if (burstT < 0.15) {
          const env = Math.sin((Math.PI * burstT) / 0.15);
          sample = Math.floor(Math.sin(2 * Math.PI * 420 * t) * env * 16000);
        }
        break;
      }
      case "whine": {
        // High tonal frequency sweep 1800 Hz - 2800 Hz
        const freq = 1800 + 800 * Math.sin(2 * Math.PI * 1.5 * t);
        const env = 0.7 + 0.3 * Math.sin(2 * Math.PI * 3 * t);
        sample = Math.floor(Math.sin(2 * Math.PI * freq * t) * env * 12000);
        break;
      }
      case "growl": {
        // Low guttural frequency 140 Hz with 25 Hz amplitude rumble modulation
        const rumble = 0.5 + 0.5 * Math.sin(2 * Math.PI * 25 * t);
        const f0 = Math.sin(2 * Math.PI * 140 * t);
        const f1 = 0.4 * Math.sin(2 * Math.PI * 280 * t);
        sample = Math.floor((f0 + f1) * rumble * 14000);
        break;
      }
      case "howl": {
        // Sustained high resonant tone 650 Hz with subtle pitch vibrato
        const vibrato = 650 + 40 * Math.sin(2 * Math.PI * 4 * t);
        const env = Math.min(1, Math.max(0, t < 0.5 ? t / 0.5 : 1));
        sample = Math.floor(Math.sin(2 * Math.PI * vibrato * t) * env * 15000);
        break;
      }
      case "short_unclear": {
        // 0.35 second faint click
        if (t < 0.35) {
          sample = Math.floor(Math.sin(2 * Math.PI * 220 * t) * 0.1 * 4000);
        }
        break;
      }
      case "bark_with_noise": {
        // 350 Hz bark mixed with environmental white noise
        const burstT = t % 0.8;
        const bark =
          burstT < 0.25
            ? Math.sin(2 * Math.PI * 350 * t) * Math.sin((Math.PI * burstT) / 0.25)
            : 0;
        const noise = (Math.random() * 2 - 1) * 0.25;
        sample = Math.floor((bark * 0.75 + noise) * 14000);
        break;
      }
      case "human_speech": {
        // Multi-frequency formant simulation resembling human voice (formants F1=500Hz, F2=1500Hz, F3=2500Hz)
        const voice =
          0.5 * Math.sin(2 * Math.PI * 180 * t) +
          0.3 * Math.sin(2 * Math.PI * 520 * t) +
          0.2 * Math.sin(2 * Math.PI * 1480 * t);
        sample = Math.floor(voice * 12000);
        break;
      }
      case "ambient_noise": {
        // Pure ambient white / brown noise without canine harmonic structure
        sample = Math.floor((Math.random() * 2 - 1) * 3000);
        break;
      }
      case "distress_whimper": {
        // High ascending whimper 2400 Hz - 3200 Hz with falling tension drop
        const freq = 2400 + 700 * Math.sin(Math.PI * (t % 1.2));
        const env = Math.sin((Math.PI * (t % 1.2)) / 1.2);
        sample = Math.floor(Math.sin(2 * Math.PI * freq * t) * env * 14000);
        break;
      }
      default: {
        sample = Math.floor(Math.sin(2 * Math.PI * 400 * t) * 10000);
      }
    }

    buffer.writeInt16LE(Math.max(-32767, Math.min(32767, sample)), 44 + i * 2);
  }

  return buffer;
}

async function runRealAiValidation() {
  const isRealMode = process.argv.some((arg) => arg.includes("--mode=REAL"));
  const hasKey =
    Boolean(process.env.OPENROUTER_API_KEY?.trim()) ||
    Boolean(process.env.GEMINI_API_KEY?.trim());

  console.log("================================================================================");
  console.log("PHASE 2: REAL AI MULTIMODAL CANINE AUDIO VALIDATION SUITE");
  console.log("================================================================================\n");

  if (!isRealMode) {
    console.log("ℹ SKIPPED — To run live provider test, pass: --mode=REAL\n");
    process.exit(0);
  }

  if (!hasKey) {
    console.log("ℹ SKIPPED — REAL AI credentials not configured (neither OPENROUTER_API_KEY nor GEMINI_API_KEY is set)\n");
    process.exit(0);
  }

  const provider = getDogAiProvider();
  if (provider.name === "unavailable-provider" || provider.name === "mock-dog-ai") {
    console.log("ℹ SKIPPED — REAL AI credentials not configured\n");
    process.exit(0);
  }

  console.log(`✓ Active AI Provider Initialized: [${provider.name}]`);
  console.log("✓ Credential Security: Server-side only (never exposed or logged)\n");

  const results = [];

  const testCases = [
    {
      id: "A",
      name: "Clear Dog Bark",
      audio: createCanineWav("clear_bark", { durationSeconds: 2 }),
      context: "someone_arrived",
    },
    {
      id: "B",
      name: "Repeated Fast Barking",
      audio: createCanineWav("repeated_bark", { durationSeconds: 2.5 }),
      context: "saw_another_dog",
    },
    {
      id: "C",
      name: "Dog Whining",
      audio: createCanineWav("whine", { durationSeconds: 2.5 }),
      context: "wanted_food",
    },
    {
      id: "D",
      name: "Dog Growling",
      audio: createCanineWav("growl", { durationSeconds: 3 }),
      context: "playing",
    },
    {
      id: "E",
      name: "Dog Howling",
      audio: createCanineWav("howl", { durationSeconds: 4 }),
      context: "unknown",
    },
    {
      id: "F",
      name: "Short / Unclear Vocalization",
      audio: createCanineWav("short_unclear", { durationSeconds: 0.6 }),
      context: "unknown",
    },
    {
      id: "G",
      name: "Dog Bark with Background Noise",
      audio: createCanineWav("bark_with_noise", { durationSeconds: 2.5 }),
      context: "someone_arrived",
    },
    {
      id: "H",
      name: "Human Speech (No Canine Vocalization)",
      audio: createCanineWav("human_speech", { durationSeconds: 2 }),
      context: "unknown",
    },
    {
      id: "I",
      name: "Ambient Noise / Non-Dog Audio",
      audio: createCanineWav("ambient_noise", { durationSeconds: 2 }),
      context: "unknown",
    },
    {
      id: "J",
      name: "Distress / Discomfort Vocalization",
      audio: createCanineWav("distress_whimper", { durationSeconds: 2.5 }),
      context: "resting_sleeping",
    },
  ];

  console.log("--------------------------------------------------------------------------------");
  console.log("Executing Live Real AI Audio & Context Test Scenarios...");
  console.log("--------------------------------------------------------------------------------\n");

  for (const tc of testCases) {
    const start = Date.now();
    try {
      const response = await provider.analyzeDogSound({
        audioBuffer: tc.audio,
        mimeType: "audio/wav",
        durationSeconds: tc.audio.length / 32000,
        context: tc.context,
      });
      const latency = Date.now() - start;

      // Assertions per spec
      assert.ok(response.status, "Response must include status");
      assert.equal(response.isDemoMode, false, "Live AI response must have isDemoMode: false");
      assert.ok(
        ["possible", "likely", "strong"].includes(response.interpretation.confidence),
        "Confidence must be qualitative"
      );
      assert.ok(response.disclaimer, "Disclaimer must be attached");

      const hasVetAdvisory = Boolean(response.safetyNote);

      console.log(`[Scenario ${tc.id}] ${tc.name}:`);
      console.log(`   • Status: ${response.status}`);
      console.log(`   • Vocalization: ${response.vocalization}`);
      console.log(`   • Primary: "${response.interpretation.primary}"`);
      console.log(`   • Confidence: ${response.interpretation.confidence}`);
      console.log(`   • Context: "${tc.context}"`);
      console.log(`   • Vet Advisory: ${hasVetAdvisory ? "ATTACHED (Safety Active)" : "None required"}`);
      console.log(`   • Latency: ${latency}ms`);
      console.log("");

      results.push({
        id: tc.id,
        name: tc.name,
        status: response.status,
        vocalization: response.vocalization,
        confidence: response.interpretation.confidence,
        vetAdvisory: hasVetAdvisory,
        latency,
        passed: true,
      });
    } catch (err) {
      console.error(`[Scenario ${tc.id}] ${tc.name} FAILED:`, err instanceof Error ? err.message : "Error");
      results.push({
        id: tc.id,
        name: tc.name,
        passed: false,
        error: err instanceof Error ? err.message : "Error",
      });
    }
  }

  // Summary Verification
  const allPassed = results.every((r) => r.passed);
  assert.ok(allPassed, "All real AI audio scenarios must pass");

  console.log("================================================================================");
  console.log(`REAL AI VALIDATION COMPLETE: ${results.length}/${results.length} Scenarios Passed`);
  console.log("================================================================================\n");
}

runRealAiValidation().catch((err) => {
  console.error("Live Real AI validation suite failed:", err instanceof Error ? err.message : "Unknown error");
  process.exit(1);
});
