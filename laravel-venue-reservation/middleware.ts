// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes
const publicRoutes = ['/', '/login', '/register', '/api/public']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(pathname)

  // Get token (from cookies for example)
  const token = request.cookies.get('token')?.value

  // If route is private and no token, redirect to login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If route is public and user has token, redirect to dashboard
  if (isPublicRoute && token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow request to proceed
  return NextResponse.next()
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}