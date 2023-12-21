import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname == '/') {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
}
