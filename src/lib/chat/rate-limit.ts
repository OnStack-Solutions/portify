// Sliding-window rate limiter kept in memory. On Vercel each serverless instance has its
// own memory, so this is best-effort protection against bursts from one client — enough
// for a deterministic assistant that calls no paid API.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { ok: boolean; retryAfter: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}
