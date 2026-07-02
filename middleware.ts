import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /admin/appointments)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login";

  // Get the token from cookies
  const isAuthenticated = request.cookies.get("admin_auth")?.value;

  // Redirect to login if accessing admin path without authentication
  if (!isAuthenticated && path.startsWith("/admin") && !isPublicPath) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect to admin dashboard if accessing login page with valid authentication
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Configure matcher for admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
