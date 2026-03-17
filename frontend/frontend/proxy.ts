import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const cookie = request.cookies.get("site-auth");
    const isPasswordPage = request.nextUrl.pathname.startsWith("/password");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");

    // Skip middleware for _next static files
    const isNextStatic = request.nextUrl.pathname.startsWith("/_next");

    if (cookie?.value === "true" || isPasswordPage || isApiRoute || isNextStatic) {
        return NextResponse.next();
    }

    const redirectUrl = new URL("/password", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
}