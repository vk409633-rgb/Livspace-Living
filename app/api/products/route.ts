import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const {
            name, slug, description, shortDescription, price, mrp, sku, stock,
            categoryId, supplierId, isActive, isFeatured, images, specifications
        } = body

        if (!name || !slug || !price || !sku || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                shortDescription,
                price,
                mrp,
                sku,
                stock,
                categoryId,
                supplierId: supplierId || null,
                isActive,
                isFeatured,
                specifications, // Already stringified
                images: {
                    create: images.map((url: string) => ({ url }))
                }
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.error("[PRODUCTS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
