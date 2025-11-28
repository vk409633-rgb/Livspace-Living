"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { getProductImageUrl } from "@/lib/product-images"
import { ProductWithRelations } from "@/types"
import { useCartStore } from "@/lib/store/cart"

interface ProductCardProps {
    product: ProductWithRelations
}

export function ProductCard({ product }: ProductCardProps) {
    const discount = product.mrp ? calculateDiscount(product.mrp, product.price) : 0
    const imageUrl = getProductImageUrl(product.images, product.category?.slug)
    const addItem = useCartStore((state) => state.addItem)

    return (
        <Card className="product-card group h-full flex flex-col border-none shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-product overflow-hidden bg-gray-100 rounded-t-lg">
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        quality={100}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {discount > 0 && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                            -{discount}%
                        </Badge>
                    )}
                    {product.isNewArrival && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                            New
                        </Badge>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute right-2 top-2 flex flex-col gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-sm">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                </div>
            </div>

            <CardContent className="p-4 flex-1">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    {/* Category name would go here if available */}
                    Product
                </div>
                <Link href={`/products/${product.slug}`} className="group-hover:text-primary transition-colors">
                    <h3 className="font-medium line-clamp-2 min-h-[3rem]">{product.name}</h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                        {formatCurrency(product.price)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                            {formatCurrency(product.mrp)}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full gap-2"
                    size="sm"
                    onClick={() => addItem(product)}
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
