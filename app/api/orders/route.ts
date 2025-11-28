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

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { items, shippingAddress, totalAmount } = body

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 })
        }

        // 1. Create Address
        const address = await prisma.address.create({
            data: {
                userId: session.user.id,
                fullName: shippingAddress.fullName,
                phone: shippingAddress.phone,
                addressLine1: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode,
                // Add default values for required fields if missing in form
                addressLine2: "",
                landmark: "",
            }
        })

        // 2. Calculate totals
        const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
        const tax = 0 // Implement tax logic if needed
        const shippingCost = 0 // Implement shipping logic if needed
        const total = subtotal + tax + shippingCost

        // 3. Generate Order Number
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        const orderNumber = `ORD-${timestamp}-${random}`

        // 4. Create Order in DB
        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                orderNumber,
                addressId: address.id,
                subtotal,
                tax,
                shippingCost,
                total,
                status: "PENDING",
                paymentStatus: "PENDING",
                paymentMethod: "RAZORPAY",
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.price * item.quantity
                    }))
                }
            }
        })

        // 5. Create Razorpay Order
        const amountInPaise = Math.round(total * 100)
        const currency = "INR"

        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
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
