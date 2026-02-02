/**
 * Rate limiting utility with optional Upstash-backed storage.
 * Falls back to in-memory for local development.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (clears on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

let lastCleanup = 0;
const cleanupIntervalMs = 5 * 60 * 1000;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const hasUpstash = Boolean(upstashUrl && upstashToken);
let upstashLimiter: Ratelimit | null = null;

function getUpstashLimiter(maxRequests: number, windowMs: number): Ratelimit | null {
  if (!hasUpstash) {
    return null;
  }
  if (!upstashLimiter) {
    const redis = new Redis({
      url: upstashUrl as string,
      token: upstashToken as string,
    });
    const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
    upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
      analytics: true,
      prefix: "flowai_rl",
    });
  }
  return upstashLimiter;
}

/**
 * Simple rate limiter
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limit exceeded
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000 // 15 minutes default
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const upstash = getUpstashLimiter(maxRequests, windowMs);
  if (upstash) {
    const result = await upstash.limit(identifier);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  }

  const now = Date.now();
  if (now - lastCleanup > cleanupIntervalMs) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetTime,
  };
}

/**
 * Get client identifier from request
 * @param request - Next.js request object
 * @returns Client identifier (IP address or fallback)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback for development
  return 'unknown';
}

