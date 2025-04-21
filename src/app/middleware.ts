// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Match all /admin/pages/* routes EXCEPT the login page
    if (pathname.startsWith('/admin/login/:path*')) {
        const token = request.cookies.get('admin-auth')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }
    //test

    return NextResponse.next()
}

// 👇 Tell Next.js which routes to run the middleware on
export const config = {
    matcher: ['/admin/login/:path*'],
}
