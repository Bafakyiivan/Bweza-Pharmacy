type RateEntry = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & {
  __bwezaRateLimits?: Map<string, RateEntry>;
};

const limits = globalStore.__bwezaRateLimits ?? new Map<string, RateEntry>();
globalStore.__bwezaRateLimits = limits;

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export function rateLimit(request: Request, scope: string, maximum: number, windowMs: number) {
  const now = Date.now();
  const key = `${scope}:${clientKey(request)}`;
  const current = limits.get(key);

  if (!current || current.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= maximum) return null;

  return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
}
