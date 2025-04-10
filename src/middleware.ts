import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('.AspNetCore.Identity.Application')?.value || null
  const url = request.nextUrl.clone()
  const publicRoutes = ['/', '/login', '/register']

  if (token && publicRoutes.includes(url.pathname)) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (!token && !publicRoutes.includes(url.pathname)) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
