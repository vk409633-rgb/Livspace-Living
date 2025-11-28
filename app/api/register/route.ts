import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "CUSTOMER",
            },
        })

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        console.error("[REGISTER_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
