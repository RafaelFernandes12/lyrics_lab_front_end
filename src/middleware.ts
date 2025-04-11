import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verifySession } from './services/axios'

export async function middleware(request: NextRequest) {
  const publicRoutes = ['/', '/login', '/register']
  const url = request.nextUrl.clone()

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next()
  }

  const isAuthenticated = await verifySession()

  if (isAuthenticated) {
    return NextResponse.next()
  }

  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
