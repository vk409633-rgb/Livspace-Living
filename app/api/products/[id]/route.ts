import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        const { id } = await params

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

        // Update product
        const product = await prisma.product.update({
            where: { id },
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
                specifications,
            }
        })

        // Update images (delete all and recreate - simple strategy)
        await prisma.productImage.deleteMany({
            where: { productId: id }
        })

        if (images && images.length > 0) {
            // SQLite doesn't support createMany well in some Prisma versions or configurations, 
            // but let's try. If it fails, I'll loop.
            // Actually createMany is supported in SQLite since Prisma 2.26+
            for (const url of images) {
                await prisma.productImage.create({
                    data: {
                        url,
                        productId: id
                    }
                })
            }
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("[PRODUCT_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        const { id } = await params

        if (!session || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const product = await prisma.product.delete({
            where: { id }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.error("[PRODUCT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
