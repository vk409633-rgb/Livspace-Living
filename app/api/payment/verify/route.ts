import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "secret_placeholder")
        shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`)
        const digest = shasum.digest("hex")

        if (digest !== razorpaySignature) {
            return new NextResponse("Invalid signature", { status: 400 })
        }

        // Update Order Status
        await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "CONFIRMED",
                paymentStatus: "PAID",
                paymentId: razorpayPaymentId,
            }
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("[PAYMENT_VERIFY]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
