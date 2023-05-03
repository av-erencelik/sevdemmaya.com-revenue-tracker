import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env.mjs";
const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default withClerkMiddleware(async (req: NextRequest) => {
  const ip = req.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const { userId } = getAuth(req);
  if (isAuthPage) {
    if (userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = { matcher: "/((?!_next/image|_next/static|favicon.ico).*)" };
