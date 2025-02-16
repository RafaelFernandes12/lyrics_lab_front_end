import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value || null
  const url = request.nextUrl.clone()

<<<<<<< HEAD
  if (
    token &&
    (url.pathname === '/' ||
      url.pathname === '/login' ||
      url.pathname === '/register' ||
      url.pathname === '/coverage/**')
  ) {
=======
  if (token && (url.pathname === '/login' || url.pathname === '/register' || url.pathname === '/coverage/**')) {
>>>>>>> main
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

<<<<<<< HEAD
  if (
    !token &&
    url.pathname !== '/login' &&
    url.pathname !== '/register' &&
    url.pathname === '/coverage/**'
  ) {
    url.pathname = '/'
=======
  if (!token && url.pathname !== '/login' && url.pathname !== '/register' && url.pathname === '/coverage/**') {
    url.pathname = '/login'
>>>>>>> main
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
