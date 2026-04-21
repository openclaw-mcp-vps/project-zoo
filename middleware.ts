import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";

const protectedRoutes = ["/browse", "/template", "/api/clone"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasAccessCookie = Boolean(request.cookies.get(ACCESS_COOKIE_NAME)?.value);

  if (hasAccessCookie) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Pro access is required for this endpoint." },
      { status: 401 }
    );
  }

  const redirectUrl = new URL("/", request.url);
  redirectUrl.searchParams.set("paywall", "1");

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/browse/:path*", "/template/:path*", "/api/clone"]
};
