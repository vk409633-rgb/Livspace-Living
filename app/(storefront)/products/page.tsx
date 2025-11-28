import prisma from "@/lib/prisma"
import { ProductCard } from "@/components/storefront/ProductCard"
import { ProductFilters } from "@/components/storefront/ProductFilters"
import { Pagination } from "@/components/storefront/Pagination"
import { Prisma } from "@prisma/client"

export const revalidate = 0 // Dynamic page

interface ProductsPageProps {
    searchParams: Promise<{
        page?: string
        categoryId?: string
        supplierId?: string
        minPrice?: string
        maxPrice?: string
        sort?: string
        search?: string
    }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams
    const page = Number(params.page) || 1
    const limit = 12
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: Prisma.ProductWhereInput = {
        isActive: true,
    }

    if (params.categoryId) {
        where.categoryId = { in: params.categoryId.split(",") }
    }

    if (params.supplierId) {
        where.supplierId = { in: params.supplierId.split(",") }
    }

    if (params.minPrice || params.maxPrice) {
        where.price = {
            gte: params.minPrice ? Number(params.minPrice) : undefined,
            lte: params.maxPrice ? Number(params.maxPrice) : undefined,
        }
    }

    if (params.search) {
        where.OR = [
            { name: { contains: params.search } },
            { description: { contains: params.search } },
        ]
    }

    // Determine sort order
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }
    if (params.sort === "price-asc") orderBy = { price: "asc" }
    if (params.sort === "price-desc") orderBy = { price: "desc" }
    if (params.sort === "name-asc") orderBy = { name: "asc" }
    if (params.sort === "name-desc") orderBy = { name: "desc" }

    // Fetch data
    const [products, totalCount, categories, suppliers] = await Promise.all([
        prisma.product.findMany({
            where,
            take: limit,
            skip,
            orderBy,
            include: {
                category: true,
                supplier: true,
                images: true,
            },
        }),
        prisma.product.count({ where }),
        prisma.category.findMany({ where: { isActive: true } }),
        prisma.supplier.findMany({ where: { isActive: true } }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 shrink-0">
                    <ProductFilters categories={categories} suppliers={suppliers} />
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            All Products <span className="text-muted-foreground text-lg font-normal">({totalCount})</span>
                        </h1>
                        {/* Sort dropdown could go here */}
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-slate-50">
                            <h3 className="text-lg font-medium">No products found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    <Pagination currentPage={page} totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}
