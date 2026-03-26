import { redis } from "./rateLimit";

export async function isAccountLocked(email) {
  return await redis.get(`lock:${email}`);
}

export async function lockAccount(email) {
  const lockTime = 60; // or progressive if you want later

  await redis.set(`lock:${email}`, true, { ex: lockTime });

  return lockTime;
}

export async function resetLoginAttempts(email) {
  await redis.del(`lock:${email}`);
}

export async function getLockTTL(email) {
  return await redis.ttl(`lock:${email}`);
}