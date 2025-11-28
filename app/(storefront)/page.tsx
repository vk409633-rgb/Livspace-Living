import { Hero } from "@/components/storefront/Hero"
import { FeaturedCategories } from "@/components/storefront/FeaturedCategories"
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts"
import prisma from "@/lib/prisma"

export const revalidate = 3600 // Revalidate every hour

async function getFeaturedProducts() {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                isFeatured: true,
            },
            take: 8,
            orderBy: {
                createdAt: 'desc',
            },
        })
        return products
    } catch (error) {
        console.error("Error fetching featured products:", error)
        return []
    }
}

async function getNewArrivals() {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
            },
            take: 4,
            orderBy: {
                createdAt: 'desc',
            },
        })
        return products
    } catch (error) {
        console.error("Error fetching new arrivals:", error)
        return []
    }
}

export default async function HomePage() {
    const featuredProducts = await getFeaturedProducts()
    const newArrivals = await getNewArrivals()

    return (
        <>
            <Hero />
            <FeaturedCategories />

            {featuredProducts.length > 0 && (
                <FeaturedProducts
                    products={featuredProducts}
                    title="Featured Collection"
                    subtitle="Our most popular and premium products"
                />
            )}

            {/* Banner Section */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert Advice?</h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                        Book a free consultation with our interior design experts or visit our showroom to experience our products firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/services/showroom-visit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                            Book Showroom Visit
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 text-slate-900">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            {newArrivals.length > 0 && (
                <FeaturedProducts
                    products={newArrivals}
                    title="New Arrivals"
                    subtitle="Check out the latest additions to our catalog"
                    linkHref="/products?sort=newest"
                />
            )}
        </>
    )
}
