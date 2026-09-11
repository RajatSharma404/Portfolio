import type { NextRequest } from "next/server";

const buckets = new Map<string, number[]>();

// Cleans up stale IPs periodically to prevent memory leaks in standing runtimes
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleBuckets(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, timestamps] of buckets.entries()) {
    const valid = timestamps.filter((ts) => now - ts < windowMs);
    if (valid.length === 0) {
      buckets.delete(key);
    } else {
      buckets.set(key, valid);
    }
  }
}

export function getClientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(
  clientKey: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000,
): boolean {
  cleanupStaleBuckets(windowMs);

  const now = Date.now();
  const recent = (buckets.get(clientKey) ?? []).filter(
    (ts) => now - ts < windowMs,
  );

  if (recent.length >= maxRequests) {
    buckets.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  buckets.set(clientKey, recent);
  return false;
}
