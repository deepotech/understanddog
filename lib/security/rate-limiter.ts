export interface RateLimitContext {
  identifier: string; // Sanitized IP or verified identity
  route: string;      // e.g., '/api/translate-dog'
  provider?: string;   // e.g., 'gemini' or 'mock'
  action?: string;     // e.g., 'audio_analyze'
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
}

export interface RateLimiter {
  check(ctx: RateLimitContext, config?: RateLimitConfig): Promise<RateLimitResult>;
}

interface WindowRecord {
  timestamps: number[];
}

/**
 * In-memory sliding-window rate limiter.
 * Tracks requests by a composite key (identifier + route + action).
 */
export class InMemoryRateLimiter implements RateLimiter {
  private store = new Map<string, WindowRecord>();
  private defaultWindowMs: number;
  private defaultMaxRequests: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(defaultWindowMs = 60_000, defaultMaxRequests = 10) {
    this.defaultWindowMs = defaultWindowMs;
    this.defaultMaxRequests = defaultMaxRequests;

    // Periodic sweep every 5 minutes to prevent memory leak
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60_000);
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref();
      }
    }
  }

  async check(
    ctx: RateLimitContext,
    overrideConfig?: RateLimitConfig
  ): Promise<RateLimitResult> {
    const windowMs = overrideConfig?.windowMs ?? this.defaultWindowMs;
    const max = overrideConfig?.maxRequests ?? this.defaultMaxRequests;
    const now = Date.now();
    const windowStart = now - windowMs;

    const key = `${ctx.identifier}:${ctx.route}:${ctx.action || "default"}`;
    let record = this.store.get(key);

    if (!record) {
      record = { timestamps: [] };
      this.store.set(key, record);
    }

    // Filter out timestamps older than current window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= max) {
      const oldestInWindow = record.timestamps[0] || now;
      const resetTimeMs = oldestInWindow + windowMs;
      return {
        allowed: false,
        limit: max,
        remaining: 0,
        resetTimeMs,
      };
    }

    record.timestamps.push(now);
    return {
      allowed: true,
      limit: max,
      remaining: max - record.timestamps.length,
      resetTimeMs: now + windowMs,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      const valid = record.timestamps.filter((ts) => ts > now - this.defaultWindowMs);
      if (valid.length === 0) {
        this.store.delete(key);
      } else {
        record.timestamps = valid;
      }
    }
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

/**
 * Future Redis Rate Limiter Adapter Stub for multi-instance production.
 */
export class RedisRateLimiter implements RateLimiter {
  constructor(private redisClientUrl?: string) {}

  async check(ctx: RateLimitContext, config?: RateLimitConfig): Promise<RateLimitResult> {
    if (!this.redisClientUrl) {
      // Fallback to in-memory if Redis not yet connected
      return inMemoryLimiterInstance.check(ctx, config);
    }
    throw new Error("RedisRateLimiter requires a configured Redis client adapter.");
  }
}

export const inMemoryLimiterInstance = new InMemoryRateLimiter(60_000, 10);

export interface IpResolutionOptions {
  trustedProxy?: "cloudflare" | "reverse_proxy" | boolean;
}

/**
 * Validates whether a string is a valid IPv4 or IPv6 address.
 */
export function isValidIp(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const trimmed = ip.trim();

  // IPv4 check: 4 octets 0-255
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(trimmed)) return true;

  // IPv6 check: 16-bit hex fields with :: compression
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Regex.test(trimmed);
}

/**
 * Anti-spoofing client IP resolution:
 * - Only trusts 'cf-connecting-ip' when the deployment is explicitly configured behind Cloudflare (TRUST_PROXY === 'cloudflare')
 * - Only trusts 'x-real-ip' when explicitly deployed behind a trusted reverse proxy (TRUST_PROXY === 'reverse_proxy')
 * - Rejects non-IP / malformed values
 * - Otherwise falls back strictly to the connection/request source
 */
export function getClientIdentifier(
  headers: Headers,
  connectionIp?: string | null,
  options?: IpResolutionOptions
): string {
  const trustProxyEnv = process.env.TRUST_PROXY?.toLowerCase();
  const trustMode = options?.trustedProxy ?? trustProxyEnv;

  // 1. Only trust Cloudflare connecting IP when explicitly deployed behind Cloudflare
  if (trustMode === "cloudflare") {
    const cfIp = headers.get("cf-connecting-ip")?.trim();
    if (cfIp && isValidIp(cfIp)) {
      return cfIp;
    }
  }

  // 2. Only trust x-real-ip when explicitly deployed behind a trusted reverse proxy
  if (trustMode === "reverse_proxy" || trustMode === true || trustMode === "true") {
    const realIp = headers.get("x-real-ip")?.trim();
    if (realIp && isValidIp(realIp)) {
      return realIp;
    }
  }

  // 3. Fall back safely to the connection source (e.g. req.ip or socket remote address)
  if (connectionIp && isValidIp(connectionIp)) {
    return connectionIp.trim();
  }

  return "anonymous-client";
}
