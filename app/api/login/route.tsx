import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    
    const body= await req.json();
    const parsed = await loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {message: "Invalid Data"},
        { status : 400}
      )
    }
    const { email, password } = parsed.data;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

     await prisma.user.update(
      {
        where: {
          id: user.id
        },
        data:{
          is_active: true,
          last_seen: `${Date.now()}`
        }
      }
    )

    const response = NextResponse.json(
      { message: "Login successful", userId: user.id, email: user.email },
      { status: 200 }
    );
    const token = generateToken(user.id)
    response.cookies.set("user", token, {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })
    return response
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
