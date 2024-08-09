import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup"
    const token = request.cookies.get("nextapprouter")?.value || ""
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/profile", "/", "/login", "/signup"],
}