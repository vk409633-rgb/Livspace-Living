import { ProductForm } from "@/components/admin/ProductForm"
import prisma from "@/lib/prisma"

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({
        where: { isActive: true },
    })

    const suppliers = await prisma.supplier.findMany({
        where: { isActive: true },
    })

    return (
        <div className="max-w-4xl mx-auto">
            <ProductForm categories={categories} suppliers={suppliers} />
        </div>
    )
}
