import { NextResponse } from "next/server";

const LOGGED_IN = true

export function middleware(request) {
    console.log({request})
    if(!LOGGED_IN) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: '/myproposals/:path*'
}