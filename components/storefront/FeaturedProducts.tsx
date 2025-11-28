import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { ProductWithRelations } from "@/types"

interface FeaturedProductsProps {
    products: ProductWithRelations[]
    title?: string
    subtitle?: string
    linkHref?: string
    linkText?: string
}

export function FeaturedProducts({
    products,
    title = "Featured Products",
    subtitle = "Handpicked selection just for you",
    linkHref = "/products",
    linkText = "View All Products"
}: FeaturedProductsProps) {
    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
                        <p className="text-muted-foreground">{subtitle}</p>
                    </div>
                    <Link href={linkHref} className="text-primary font-medium flex items-center hover:underline">
                        {linkText} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
