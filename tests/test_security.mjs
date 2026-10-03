import assert from "node:assert/strict";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: { "@": process.cwd() },
});
const { validateAudioBuffer } = jiti("../lib/security/audio-validator.ts");
const { InMemoryRateLimiter, getClientIdentifier } = jiti("../lib/security/rate-limiter.ts");

async function runSecurityTests() {
  console.log("▶ Testing Audio Security & Rate Limiting Guardrails...");

  // 1. Magic bytes detection: Real WAV header (2 seconds of audio at 32000 byteRate)
  const wavBuffer = Buffer.alloc(64044);
  wavBuffer.write("RIFF", 0);
  wavBuffer.writeUInt32LE(64036, 4);
  wavBuffer.write("WAVE", 8);
  wavBuffer.write("fmt ", 12);
  wavBuffer.writeUInt32LE(16, 16);
  wavBuffer.writeUInt16LE(1, 20); // PCM
  wavBuffer.writeUInt16LE(1, 22); // Mono
  wavBuffer.writeUInt32LE(16000, 24); // 16kHz
  wavBuffer.writeUInt32LE(32000, 28); // byteRate = 32000 bytes/sec
  wavBuffer.writeUInt16LE(2, 32);
  wavBuffer.writeUInt16LE(16, 34);
  wavBuffer.write("data", 36);
  wavBuffer.writeUInt32LE(64000, 40); // 64000 bytes = 2.0 seconds

  const wavVal = validateAudioBuffer(wavBuffer, "audio/wav", "recording.wav");
  assert.equal(wavVal.valid, true, "Valid WAV buffer should pass validation");
  assert.equal(wavVal.detectedFormat, "wav");
  console.log("  ✓ Test 1 Passed: Real WAV magic bytes correctly identified");

  // 2. Reject fake / disguised binary (e.g. random text pretending to be audio)
  const fakeBuffer = Buffer.from(
    "THIS IS PLAIN TEXT DISGUISED AS AUDIO FILE DATA CONTENT OVER 1000 BYTES ".repeat(20)
  );
  const fakeVal = validateAudioBuffer(fakeBuffer, "audio/wav", "malicious.wav");
  assert.equal(fakeVal.valid, false, "Disguised payload must be rejected by magic byte inspection");
  console.log("  ✓ Test 2 Passed: Payload without valid audio signature rejected");

  // 3. Reject oversized payload (> 10MB)
  const oversizedBuffer = Buffer.alloc(11 * 1024 * 1024);
  oversizedBuffer.write("RIFF", 0);
  oversizedBuffer.write("WAVE", 8);
  const sizeVal = validateAudioBuffer(oversizedBuffer, "audio/wav", "huge.wav");
  assert.equal(sizeVal.valid, false, "Oversized buffer must be rejected");
  assert.match(sizeVal.error, /exceeds maximum allowed size/i);
  console.log("  ✓ Test 3 Passed: 11MB file properly rejected by size guardrail");

  // 4. Reject tiny/empty payload (< 1000 bytes)
  const tinyBuffer = Buffer.alloc(200);
  const tinyVal = validateAudioBuffer(tinyBuffer, "audio/wav");
  assert.equal(tinyVal.valid, false, "Tiny buffer must be rejected as insufficient audio data");
  console.log("  ✓ Test 4 Passed: Insufficient payload rejected");

  // 5. Rate Limiter: Window and maximum request enforcement
  const limiter = new InMemoryRateLimiter(60_000, 3);
  const ctx = { identifier: "test-user-ip", route: "/api/translate-dog" };

  const r1 = await limiter.check(ctx);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = await limiter.check(ctx);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = await limiter.check(ctx);
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  // 4th request must be blocked
  const r4 = await limiter.check(ctx);
  assert.equal(r4.allowed, false, "Request beyond limit must be blocked");
  assert.equal(r4.remaining, 0);
  assert.ok(r4.resetTimeMs > Date.now());
  limiter.destroy();
  console.log("  ✓ Test 5 Passed: Rate limiter enforced 3-request ceiling strictly");

  // 6. Anti-spoofing verification: client-controlled headers cannot bypass rate limits
  const attackerConnectionIp = "192.0.2.100";

  // Case A: Default environment (NOT behind trusted proxy) - spoofed headers MUST be ignored
  const spoofedHeaders1 = new Headers({
    "cf-connecting-ip": "10.0.0.1",
    "x-real-ip": "10.0.0.2",
    "x-forwarded-for": "10.0.0.3",
  });
  const idUntrusted = getClientIdentifier(spoofedHeaders1, attackerConnectionIp);
  assert.equal(
    idUntrusted,
    attackerConnectionIp,
    "Spoofed headers must be ignored when not behind a trusted proxy, falling back to connection source"
  );
  console.log("  ✓ Test 6 Passed: Spoofed cf-connecting-ip and x-real-ip safely rejected without trusted proxy");

  // Case B: Attacker attempts to rotate fake cf-connecting-ip headers against rate limiter
  const limiterAntiSpoof = new InMemoryRateLimiter(60_000, 2);
  for (let i = 1; i <= 2; i++) {
    const fakeHeaders = new Headers({ "cf-connecting-ip": `203.0.113.${i}` });
    const resolvedId = getClientIdentifier(fakeHeaders, attackerConnectionIp);
    const check = await limiterAntiSpoof.check({ identifier: resolvedId, route: "/api/translate-dog" });
    assert.equal(check.allowed, true);
  }
  // 3rd request with a different fake IP in cf-connecting-ip
  const fakeHeaders3 = new Headers({ "cf-connecting-ip": "203.0.113.99" });
  const resolvedId3 = getClientIdentifier(fakeHeaders3, attackerConnectionIp);
  const blockedCheck = await limiterAntiSpoof.check({ identifier: resolvedId3, route: "/api/translate-dog" });
  assert.equal(
    blockedCheck.allowed,
    false,
    "Attacker rotating cf-connecting-ip headers must still be blocked by real connection source IP"
  );
  limiterAntiSpoof.destroy();
  console.log("  ✓ Test 7 Passed: Rate limiter bypass via header rotation successfully thwarted");

  // Case C: Explicitly configured behind Cloudflare - cf-connecting-ip IS trusted
  const cfHeaders = new Headers({ "cf-connecting-ip": "198.51.100.22" });
  const idCloudflare = getClientIdentifier(cfHeaders, attackerConnectionIp, {
    trustedProxy: "cloudflare",
  });
  assert.equal(
    idCloudflare,
    "198.51.100.22",
    "cf-connecting-ip should be trusted when deployment is explicitly behind Cloudflare"
  );
  console.log("  ✓ Test 8 Passed: Cloudflare connecting IP correctly trusted when deployed behind Cloudflare");

  // Case D: Explicitly configured behind trusted reverse proxy - x-real-ip IS trusted
  const proxyHeaders = new Headers({ "x-real-ip": "198.51.100.33" });
  const idProxy = getClientIdentifier(proxyHeaders, attackerConnectionIp, {
    trustedProxy: "reverse_proxy",
  });
  assert.equal(
    idProxy,
    "198.51.100.33",
    "x-real-ip should be trusted when deployment is explicitly behind a trusted reverse proxy"
  );
  console.log("  ✓ Test 9 Passed: x-real-ip correctly trusted when deployed behind trusted reverse proxy");

  // Case E: Malformed or non-IP headers are discarded
  const malformedHeaders = new Headers({
    "cf-connecting-ip": "attacker-spoofed-string; drop database;",
  });
  const idMalformed = getClientIdentifier(malformedHeaders, attackerConnectionIp, {
    trustedProxy: "cloudflare",
  });
  assert.equal(
    idMalformed,
    attackerConnectionIp,
    "Malformed IP header must be rejected, falling back to connection source"
  );
  console.log("  ✓ Test 10 Passed: Malformed non-IP values rejected by IP syntax validator");

  console.log("All security and rate-limiting tests passed successfully!\n");
}

runSecurityTests().catch((err) => {
  console.error("Security test failure:", err);
  process.exit(1);
});
