import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const is_admin = req.nextUrl.pathname.startsWith("/admin/add-product");
  const token = req.cookies.get("token_admin")?.value;

  if (is_admin && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/add-product:path*"],
};
