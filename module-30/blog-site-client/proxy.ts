import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;

  // Get user and session data
  const { data } = await userService.getSession();

  // Check session data and user role
  if (data) {
    isAuthenticated = true;
    isAdmin = data?.user?.role === Roles.admin;
  }

  // Redirect to login page if session data is missing
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to admin dashboard if role is admin and want to visit user dashboard
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // Redirect to user dashboard if role is user and want to visit admin dashboard
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
