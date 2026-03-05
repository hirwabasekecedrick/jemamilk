import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const {userId, token} = await req.json()
    if (!userId || !token) {
        throw NextResponse.json(
            {message: "Invalid Request"},{status: 500}
        )
    }
    const userExists = await prisma.user.findUnique({
        where: {id: userId}
    })

    if (!userExists) {
        throw NextResponse.json(
            {message: "User Not found"},{status: 400}
        )
    }

    const setIsActive = await prisma.user.update({
        where: {id: userId},
        data: {
            is_active: true,
            last_seen: `${Date.now()}`
        }
    })
    if (!setIsActive) {
        return NextResponse.json(
            {message: "Failed to Logout, Try refreshing"},
            {status: 400}
        )
    }

    const response =  NextResponse.json(
            {message: "Logout Successfully"},
            {status: 200}
        )
    response.cookies.set("user", "")
    return response
}