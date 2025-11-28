import prisma from "@/lib/prisma"
import { ProductCard } from "@/components/storefront/ProductCard"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params
    const category = await prisma.category.findUnique({
        where: { slug }
    })

    if (!category) {
        return {
            title: "Category Not Found"
        }
    }

    return {
        title: `${category.name} | RetailStore`,
        description: category.description || `Browse our ${category.name} collection`
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                where: { isActive: true },
                include: {
                    images: true,
                    category: true,
                    supplier: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="container-custom py-8">
            {/* Category Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
                {category.description && (
                    <p className="text-muted-foreground text-lg">{category.description}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                    {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
                </p>
            </div>

            {/* Products Grid */}
            {category.products.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-slate-50">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                        We're currently updating our {category.name} collection. Please check back soon!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
