import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();

    if (password === process.env.SITE_PASSWORD) {
        const response = NextResponse.json({ success: true });

        response.cookies.set("site-auth", "true", {
            httpOnly: true,
            path: "/",
        });

        return response;
    }

    return new NextResponse("Unauthorized", { status: 401 });
}