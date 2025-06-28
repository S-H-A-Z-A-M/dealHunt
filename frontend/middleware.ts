import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(async function middleware(req: any) {
  const { isAuthenticated, user } = req;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*,/"],
};
