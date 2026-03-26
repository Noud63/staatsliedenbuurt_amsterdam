import { NextResponse } from "next/server";
import { getLockTTL } from "@/lib/loginLock";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ ttl: 0 });
  }

  const ttl = await getLockTTL(email);

  return Response.json({
    ttl: ttl > 0 ? ttl : 0,
  });
}