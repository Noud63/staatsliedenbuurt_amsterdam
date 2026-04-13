import connectDB from "@/lib/database";

import { handlers } from "@/auth";

export const dynamic = "force-dynamic"; // prevent caching

connectDB();

export const { GET, POST } = handlers;
