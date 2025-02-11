import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value || null
  const url = request.nextUrl.clone()

  if (
    token &&
    (url.pathname === '/login' ||
      url.pathname === '/register' ||
      url.pathname === '/coverage/**')
  ) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (
    !token &&
    url.pathname !== '/login' &&
    url.pathname !== '/register' &&
    url.pathname === '/coverage/**'
  ) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
