type Bucket = { count: number; resetAt: number }
const store = new Map<string, Bucket>()

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const bucket = store.get(key)
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }
  if (bucket.count < limit) {
    bucket.count += 1
    return { allowed: true, remaining: limit - bucket.count, resetAt: bucket.resetAt }
  }
  return { allowed: false, remaining: 0, resetAt: bucket.resetAt }
}
