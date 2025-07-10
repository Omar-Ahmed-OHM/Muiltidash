import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const tokenAdmin = request.cookies.get('token_admin')?.value;

  // لو مفيش توكن أدمن → روّح على صفحة تسجيل دخول التاجر
  if (!tokenAdmin) {
    return NextResponse.redirect(new URL('/trade/login_trade', request.url));
  }

  // لو فيه توكن أدمن → اسمح له يكمل
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
