import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
    {
        name: "Premium Tiles",
        slug: "tiles",
        image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=1000&auto=format&fit=crop",
        description: "Ceramic, Vitrified, Porcelain & more"
    },
    {
        name: "Modern Furniture",
        slug: "furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
        description: "Sofas, Beds, Dining & Living"
    },
    {
        name: "Sanitary Ware",
        slug: "sanitary-ware",
        image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
        description: "Basins, Toilets, Faucets & Showers"
    },
    {
        name: "Modular Kitchen",
        slug: "modular-kitchen",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
        description: "Complete kitchen solutions"
    },
    {
        name: "Lighting",
        slug: "lighting",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1000&auto=format&fit=crop",
        description: "LEDs, Chandeliers & Decorative"
    },
    {
        name: "Tools & Adhesives",
        slug: "tools",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop",
        description: "Installation tools & materials"
    }
]

export function FeaturedCategories() {
    return (
        <section className="section bg-slate-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
                        <p className="text-muted-foreground">Explore our wide range of premium products</p>
                    </div>
                    <Link href="/categories" className="text-primary font-medium flex items-center hover:underline">
                        View All Categories <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
