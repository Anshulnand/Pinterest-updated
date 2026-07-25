import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xldmVyLW11c2tveC00OC5jbGVyay5hY2NvdW50cy5kZXYk";
const secretKey = process.env.CLERK_SECRET_KEY;

const clerkHandler = clerkMiddleware(undefined, {
  publishableKey,
  ...(secretKey ? { secretKey } : {}),
});

export default async function middleware(req: NextRequest, event: any) {
  try {
    return await (clerkHandler as any)(req, event);
  } catch (err) {
    console.error("Middleware invocation warning/error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|fontawesome|jpg|jpeg|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

