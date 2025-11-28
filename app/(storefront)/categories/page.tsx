import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { categoryImages } from "@/lib/product-images"

export const metadata: Metadata = {
    title: "Categories | RetailStore",
    description: "Browse our product categories"
}

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        where: { isActive: true },
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: { sortOrder: 'asc' }
    })

    // Map category slugs to images
    const getCategoryImage = (slug: string) => {
        const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-')
        const images = categoryImages[normalizedSlug as keyof typeof categoryImages]
        return images ? images[0] : categoryImages.default[0]
    }

    return (
        <div className="container-custom py-8 md:py-12">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h1>
                <p className="text-muted-foreground text-lg">
                    Explore our wide range of premium products
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all"
                    >
                        <Image
                            src={getCategoryImage(category.slug)}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                            <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                {category._count.products} {category._count.products === 1 ? 'product' : 'products'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12 border rounded-lg bg-slate-50">
                    <h3 className="text-lg font-medium mb-2">No categories found</h3>
                    <p className="text-muted-foreground">
                        Categories will appear here once they are added.
                    </p>
                </div>
            )}
        </div>
    )
}
