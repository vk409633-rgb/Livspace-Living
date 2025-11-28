import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_placeholder",
})

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()
        const { items, shippingAddress, totalAmount } = body

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 })
        }

        // Create Order in DB
        const order = await prisma.order.create({
            data: {
                userId: session?.user?.id,
                totalAmount,
                status: "PENDING",
                paymentStatus: "PENDING",
                paymentMethod: "RAZORPAY",
                shippingAddress: JSON.stringify(shippingAddress),
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })

        // Create Razorpay Order
        const amount = Math.round(totalAmount * 100) // paise
        const currency = "INR"

        const razorpayOrder = await razorpay.orders.create({
            amount: amount,
            currency,
            receipt: order.id,
        })

        return NextResponse.json({
            orderId: order.id,
            razorpayOrderId: razorpayOrder.id
        })

    } catch (error) {
        console.error("[ORDER_CREATE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
