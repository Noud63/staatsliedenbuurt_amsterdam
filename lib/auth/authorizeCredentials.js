import connectDB from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { CredentialsSignin } from "@auth/core/errors";
import { ipLimiter } from "@/lib/rateLimit";
import validator from "email-validator";
import {
  isAccountLocked,
  resetLoginAttempts,
  lockAccount,
} from "@/lib/loginLock";

class CredentialsError extends CredentialsSignin {
  code;
  constructor(code) {
    super();
    this.code = code;
  }
}

const normalizeIp = (ip) => {
  if (!ip) return "unknown";
  if (ip === "::1") return "127.0.0.1";
  return ip;
};

export async function authorizeCredentials(credentials, req) {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new CredentialsError("MISSING_CREDENTIALS");
    }

    const email = credentials.email.toLowerCase();

    console.log("Email:", email);

    const ip = normalizeIp(
      req?.headers?.get?.("x-forwarded-for")?.split(",")[0] ||
        req?.headers?.get?.("x-real-ip"),
    );

    // 1. GLOBAL limiter (covers invalid emails too)
    const { success: ipSuccess, remaining } = await ipLimiter.limit(ip);

    if (!ipSuccess || remaining === 0) {
      // only lock VALID emails
      if (validator.validate(email)) {
        const lockTime = await lockAccount(email);
        throw new CredentialsError(`ACCOUNT_LOCKED:${lockTime}`);
      }

      throw new CredentialsError("RATE_LIMIT_IP");
    }

    // 2. Check lock AFTER limiter (prevents bypass spam)
    const locked = await isAccountLocked(email);
    if (locked) {
      throw new CredentialsError("ACCOUNT_LOCKED:60");
    }

    // 3. Validate email (no DB hit yet)
    if (!validator.validate(email)) {
      throw new CredentialsError(`INVALID_EMAIL_FORMAT:${remaining}`);
    }

    await connectDB();

    const dbUser = await User.findOne({ email }).select("+password");

    //Against timing attacks use dummy password
    const dummyHash = process.env.DUMMY_ARGON2_HASH;
    const passwordHash = dbUser?.password || dummyHash;
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      passwordHash,
    );

    if (!dbUser || !isValidPassword) {
      throw new CredentialsError(`INVALID_CREDENTIALS:${remaining}`);
    }

    // successful login → clear lock
    await resetLoginAttempts(email);

    return {
      id: dbUser._id.toString(),
      name: dbUser.name,
      username: dbUser.username,
      email: dbUser.email,
      avatar: dbUser.avatar,
    };
  } catch (error) {
    // For expected credential failures, avoid noisy server error logs.
    if (error instanceof CredentialsError) throw error;
    console.error("Auth error:", error);
    throw error;
  }
}
