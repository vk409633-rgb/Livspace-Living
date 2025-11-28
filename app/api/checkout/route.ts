import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { z } from "zod"

const checkoutSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    paymentMethod: z.enum(["COD", "ONLINE"]),
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        price: z.number()
    })),
    total: z.number()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const data = checkoutSchema.parse(body)

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: `${data.firstName} ${data.lastName}`,
                    phone: data.phone,
                    role: "CUSTOMER"
                }
            })
        }

        // Create address
        const address = await prisma.address.create({
            data: {
                userId: user.id,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                addressLine1: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                country: "India",
                isDefault: true
            }
        })

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // Create order
        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId: user.id,
                shippingAddressId: address.id,
                billingAddressId: address.id,
                subtotal: data.total,
                shippingCost: 0,
                tax: 0,
                total: data.total,
                paymentMethod: data.paymentMethod,
                paymentStatus: data.paymentMethod === "COD" ? "PENDING" : "PENDING",
                status: "PENDING",
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        subtotal: item.price * item.quantity
                    }))
                }
            }
        })

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber
        })
    } catch (error) {
        console.error("Checkout error:", error)
        return NextResponse.json(
            { error: "Failed to process checkout" },
            { status: 500 }
        )
    }
}
