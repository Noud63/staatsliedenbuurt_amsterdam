import connectDB from "@/connectDB/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { CredentialsSignin } from "@auth/core/errors";
import clientPromise from "@/lib/db";
import { ipLimiter, accountLimiter } from "@/lib/rateLimit";
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

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour - refresh session hourly
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24, // 24 hours
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "strict", // "strict" if using OAuth providers
        path: "/",
        secure: true, //in production >  process.env.NODE_ENV === "production"
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new CredentialsError("MISSING_CREDENTIALS");
          }

          const email = credentials.email.toLowerCase();

          //Not in production!
          const normalizeIp = (ip) => {
            if (!ip) return "unknown";
            if (ip === "::1") return "127.0.0.1";
            return ip;
          };

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
            throw new CredentialsError(`INVALID_EMAIL_FORMAT`);
          }

          await connectDB();

          const dbUser = await User.findOne({ email }).select("+password");

          //Against timing attacks use dummy password
          const dummyHash = process.env.DUMMY_ARGON2_HASH; // any valid bcrypt hash format
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
          if (error instanceof CredentialsSignin) throw error;
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    //Invoked on successful signin
    async signIn({ user, profile, account }) {
      if (account.provider === "google") {
        // console.log("Google profile:", profile);
        // console.log("User:", user);

        await connectDB();

        // Find the user in your DB
        const dbUser = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create it
        if (!dbUser) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.given_name,
            name: profile.name,
          });
          return {
            id: newUser._id.toString(),
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
          };
        } else {
          return {
            id: user.id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          };
        }
      }

      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
        token.avatar = user.avatar;
      }
      if (trigger === "update" && session?.user) {
        token.avatar = session.user.avatar;
      }

      return token;
    },

    //Modify the session object
    async session({ session, token }) {
      //  NextAuth automatically includes the name property in the session if it exists on the user object
      // Assign user id to the session
      session.user.id = token.id;
      // Assign username to the session
      session.user.username = token.username;
      // Assign avatar to the session
      session.user.avatar = token.avatar;
      // console.log("Session:", session);
      return session;
    },
  },
};

//--------------- !! In production add these to authorize !! ----------------------

// sameSite: "lax", // Prevents CSRF but allows external-site navigation

// SECURITY: Validate required environment variables
// if (!process.env.NEXTAUTH_SECRET) {
//   throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
// }

// SECURITY: Rate limiter (login with credentials) for brute force protection

// SECURITY: Enhanced email validation with RFC 5322 simplified checks regex

// Consideusing external rate limiting service (e.g., Redis) for production scaling

// Add email verification flow for credential-based signups

// Environment variable validation
// Enhanced email validation (RFC 5322 compliant)
// Removed allowDangerousEmailAccountLinking
// Strict CSRF protection (sameSite: "strict")
// Email verification checks
// OAuth profile validation
// Sanitized error logging (dev vs production)

// And this:
// utils/getClientIp.ts
// export const getClientIp = (req: any) => {
//   // Try x-forwarded-for first (may contain multiple IPs)
//   const forwarded = req?.headers?.get("x-forwarded-for");
//   if (forwarded) {
//     // Take the first IP in the chain, trimming whitespace
//     const firstIp = forwarded.split(",")[0].trim();
//     if (firstIp) return firstIp;
//   }

//   // Fallback to x-real-ip
//   const realIp = req?.headers?.get("x-real-ip");
//   if (realIp) return realIp;

//   // Last fallback to socket remoteAddress
//   const remote = req?.socket?.remoteAddress;
//   if (remote) return remote;

//   // Could not detect IP → treat as unknown, but consider blocking requests without IP
//   return null;
// };

// Get real client IP
// const ip = getClientIp(req);
// if (!ip) {
//   // Optional: reject requests without a detectable IP
//   throw new CredentialsError("INVALID_REQUEST");
// }
