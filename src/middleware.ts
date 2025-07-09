import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('✅ middleware is working');

  const token = request.cookies.get('token_admin')?.value;
  const token_user = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/trade/login_trade', request.url));
  }
  if(!token_user){
    return NextResponse.redirect(new URL('/login',request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], 
};
