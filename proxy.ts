import { NextRequest, NextResponse } from "next/server";

/**
 * Route protection proxy (Next.js 16+).
 * Protects /dashboard and /admin pages.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for a session cookie set after successful login
  const authCookie = request.cookies.get("learnpro-auth");

  if (!authCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
