import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(req: NextRequest) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not configured");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const token = req.cookies.get("user")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; iat: number; exp: number };

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("actingUser", decoded.id);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error("JWT token expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error("Invalid JWT token");
        } else {
            console.error("JWT verification failed:", error);
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/logout"],
}