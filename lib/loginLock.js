import { redis } from "./rateLimit";

export async function isAccountLocked(email) {
  return await redis.get(`lock:${email}`);
}

export async function lockAccount(email) {
  await redis.set(`lock:${email}`, true, { ex: 60 }); // 1 minute
}

export async function resetLoginAttempts(email) {
  await redis.del(`lock:${email}`);
}

export async function getLockTTL(email) {
  return await redis.ttl(`lock:${email}`);
}