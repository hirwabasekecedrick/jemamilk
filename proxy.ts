import {NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export async function proxy(req: NextRequest) {
    const JWT_SECRET = process.env.JWT_SECRET || 'JingoPseudo'
    const token = req.cookies.get("user")?.value
    if (!token) {
        return NextResponse.redirect( new URL('/login', req.url))
    }
    const verify = await jwt.verify(token, JWT_SECRET)

    if (!verify) {
        return NextResponse.json(
            {message: "The user not allowed"}
        )
    }
    const userID = jwt.decode(token)
    console.log(userID);
    return NextResponse.next()
}