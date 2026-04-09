import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";

// NextAuth/Auth.js v5 entrypoint.
// Export handlers for the route file and `auth()` for server-side session reads.
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

