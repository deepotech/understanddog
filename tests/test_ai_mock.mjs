import assert from "node:assert/strict";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: { "@": process.cwd() },
});

const { MockDogAiProvider } = jiti("../lib/ai/mock-provider.ts");
const { GeminiDogAiProvider } = jiti("../lib/ai/gemini-provider.ts");
const { getDogAiProvider } = jiti("../lib/ai/provider.ts");
const { normalizeAiResponse } = jiti("../lib/ai/response-normalizer.ts");
const { applySafetyLayer } = jiti("../lib/ai/safety-layer.ts");

async function runAiTests() {
  console.log("▶ Testing Phase 2 AI Provider Abstraction, Normalization & Safety Layer...");

  // 1. Provider Abstraction: MockDogAiProvider in test/dev
  const mock = new MockDogAiProvider();
  assert.equal(mock.name, "mock-dog-ai");

  const validBuffer = Buffer.alloc(2000, 0x55);
  const playResult = await mock.analyzeDogSound({
    audioBuffer: validBuffer,
    mimeType: "audio/wav",
    durationSeconds: 5,
    context: "playing",
  });

  assert.equal(playResult.status, "success", "Mock provider must return success on valid input");
  assert.equal(playResult.isDemoMode, true, "Mock provider must have isDemoMode: true");
  assert.equal(playResult.vocalization, "barking");
  assert.ok(
    ["possible", "likely", "strong"].includes(playResult.interpretation.confidence),
    "Confidence must strictly be qualitative (possible, likely, strong)"
  );
  assert.ok(playResult.suggestions.length > 0);
  assert.ok(playResult.disclaimer);
  console.log("  ✓ Test 1 Passed: Provider abstraction & mock simulation verified");

  // 2. Real Provider Configuration: requires API key, secrets cannot be empty
  assert.throws(
    () => new GeminiDogAiProvider(""),
    /GEMINI_API_KEY is required/i,
    "GeminiDogAiProvider must throw if API key is missing or blank"
  );

  const gemini = new GeminiDogAiProvider("test-gemini-dummy-key-for-unit-test");
  assert.equal(gemini.name, "gemini-dog-ai");
  console.log("  ✓ Test 2 Passed: Real Gemini provider enforces non-empty server credentials");

  // 3. Normalization: Strict schema mapping & hallucination stripping
  const rawModelResponse = {
    status: "success",
    vocalization: "barking",
    interpretation: {
      primary: "Territorial Alert Bark",
      summary: "Sharp acoustic energy suggesting perimeter notice.",
      confidence: "likely",
    },
    possibleContexts: ["Front door knocking", "Passing pedestrian"],
    observations: ["180 Hz - 400 Hz burst with 3 barks per second"],
    suggestions: ["Guide dog to calm zone"],
  };

  const normalized = normalizeAiResponse(rawModelResponse, false);
  assert.equal(normalized.status, "success");
  assert.equal(normalized.isDemoMode, false);
  assert.equal(normalized.vocalization, "barking");
  assert.equal(normalized.interpretation.confidence, "likely");
  console.log("  ✓ Test 3 Passed: Successful structured model output normalized strictly");

  // 4. Percentage Confidence Defense: Strip numerical confidence (e.g. 97.4%, 0.99)
  const rawPercentResponse = {
    status: "success",
    vocalization: "barking",
    interpretation: {
      primary: "Excited Barking",
      summary: "High energy play.",
      confidence: "97.4%", // Model hallucinated percentage
    },
  };
  const normalizedPercent = normalizeAiResponse(rawPercentResponse, false);
  assert.equal(
    normalizedPercent.interpretation.confidence,
    "likely",
    "Numerical confidence (97.4%) must be stripped and normalized to qualitative 'likely'"
  );
  console.log("  ✓ Test 4 Passed: Fake numerical confidence rejected and converted to qualitative scale");

  // 5. Invalid / Malformed Model Output Handling
  const garbageOutput = "This is not JSON at all";
  const normalizedGarbage = normalizeAiResponse(garbageOutput, false);
  assert.equal(
    normalizedGarbage.status,
    "malformed_ai_response",
    "Garbage non-object must normalize to malformed_ai_response"
  );
  console.log("  ✓ Test 5 Passed: Malformed / non-JSON model output handled safely");

  // 6. Non-Dog Audio Classification
  const nonDogRaw = {
    status: "not_a_dog_sound",
    notes: "Audio contains human talking and air conditioner hum.",
  };
  const normalizedNonDog = normalizeAiResponse(nonDogRaw, false);
  assert.equal(normalizedNonDog.status, "not_a_dog_sound");
  assert.equal(normalizedNonDog.vocalization, "unidentified");
  assert.match(normalizedNonDog.interpretation.primary, /No Canine Vocalization/i);
  console.log("  ✓ Test 6 Passed: Non-dog audio classification correctly normalized");

  // 7. Insufficient Audio Classification
  const shortRaw = {
    status: "insufficient_audio",
  };
  const normalizedShort = normalizeAiResponse(shortRaw, false);
  assert.equal(normalizedShort.status, "insufficient_audio");
  console.log("  ✓ Test 7 Passed: Insufficient audio classification correctly normalized");

  // 8. Deterministic Server-Side Safety Layer: Triggered on distress / pain signals
  const painResult = normalizeAiResponse({
    status: "success",
    vocalization: "whining",
    interpretation: {
      primary: "Sudden Discomfort",
      summary: "Audio pitch and context suggest possible orthopedic pain when trying to rise.",
      confidence: "possible",
    },
    observations: ["Muffled whimper with guarded posture"],
    suggestions: ["Monitor mobility closely"],
  });

  const safePainResult = applySafetyLayer(painResult);
  assert.ok(safePainResult.safetyNote, "Safety note must be injected for pain/distress signals");
  assert.match(
    safePainResult.safetyNote,
    /veterinarian/i,
    "Safety note must recommend consulting a qualified veterinarian"
  );
  assert.equal(safePainResult.recommendedAction, "check_comfort");
  console.log("  ✓ Test 8 Passed: Deterministic safety layer attached veterinary advisory");

  // 9. Provider Factory Isolation & Production Guard
  const originalEnv = process.env.NODE_ENV;
  const originalKey = process.env.GEMINI_API_KEY;
  const originalDemo = process.env.ALLOW_DEMO_AI;

  try {
    // Production without key -> must return UnavailableDogAiProvider
    process.env.NODE_ENV = "production";
    delete process.env.GEMINI_API_KEY;
    delete process.env.ALLOW_DEMO_AI;

    const unavailProvider = getDogAiProvider();
    assert.equal(unavailProvider.name, "unavailable-provider");
    const unavailResult = await unavailProvider.analyzeDogSound({
      audioBuffer: validBuffer,
      mimeType: "audio/wav",
    });
    assert.equal(unavailResult.status, "ai_unavailable");
    console.log("  ✓ Test 9 Passed: Production without credentials returns safe ai_unavailable state");

    // Production WITH key -> must return GeminiDogAiProvider
    process.env.GEMINI_API_KEY = "live-production-gemini-key";
    const realProdProvider = getDogAiProvider();
    assert.equal(realProdProvider.name, "gemini-dog-ai");
    console.log("  ✓ Test 10 Passed: Production with credentials returns real Gemini provider");

    // Non-production with ALLOW_DEMO_AI -> returns MockDogAiProvider
    process.env.NODE_ENV = "development";
    delete process.env.GEMINI_API_KEY;
    process.env.ALLOW_DEMO_AI = "true";

    const devMockProvider = getDogAiProvider();
    assert.equal(devMockProvider.name, "mock-dog-ai");
    console.log("  ✓ Test 11 Passed: Development mode with ALLOW_DEMO_AI returns Mock provider");
  } finally {
    process.env.NODE_ENV = originalEnv;
    if (originalKey) process.env.GEMINI_API_KEY = originalKey;
    else delete process.env.GEMINI_API_KEY;
    if (originalDemo) process.env.ALLOW_DEMO_AI = originalDemo;
    else delete process.env.ALLOW_DEMO_AI;
  }

  // 10. Secret Exposure Check: Ensure NEXT_PUBLIC_ does NOT leak API secrets
  const envKeys = Object.keys(process.env);
  const leakedPublicAiKeys = envKeys.filter(
    (k) => k.startsWith("NEXT_PUBLIC_") && /gemini|ai_key|secret|api_key/i.test(k)
  );
  assert.equal(
    leakedPublicAiKeys.length,
    0,
    `Secrets must never be exposed with NEXT_PUBLIC_ prefix: ${leakedPublicAiKeys.join(", ")}`
  );
  console.log("  ✓ Test 12 Passed: No AI secrets exposed via client-facing NEXT_PUBLIC_ variables");

  console.log("All Phase 2 AI provider, safety, and normalization tests passed successfully!\n");
}

runAiTests().catch((err) => {
  console.error("AI test failure:", err);
  process.exit(1);
});
