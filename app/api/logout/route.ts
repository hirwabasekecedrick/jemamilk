import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userId = await req.headers.get("actingUser");
        console.log(userId,"Lolo");
        
        if (!userId) {
            return NextResponse.json(
                { message: "Invalid request - no user ID" },
                { status: 401 }
            );
        }

        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Clear the user session/token (is_active false or delete session)
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        // Clear the user cookie
        response.cookies.set("user", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}