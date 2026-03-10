import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
    const cookie = request.cookies.get("site-auth");

    const isPasswordPage = request.nextUrl.pathname.startsWith("/password");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");

    if (cookie?.value === "true" || isPasswordPage || isApiRoute) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/password", request.url));
}