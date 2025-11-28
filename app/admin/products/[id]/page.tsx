import { ProductForm } from "@/components/admin/ProductForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            images: true,
        },
    })

    if (!product) {
        notFound()
    }

    const categories = await prisma.category.findMany({
        where: { isActive: true },
    })

    const suppliers = await prisma.supplier.findMany({
        where: { isActive: true },
    })

    return (
        <div className="max-w-4xl mx-auto">
            <ProductForm
                categories={categories}
                suppliers={suppliers}
                initialData={product}
            />
        </div>
    )
}
