import { notFound } from "next/navigation"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, FileText, Truck, ShieldCheck } from "lucide-react"
import prisma from "@/lib/prisma"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ImageGallery } from "@/components/storefront/ImageGallery"
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await prisma.product.findUnique({
        where: { slug },
    })

    if (!product) {
        return {
            title: "Product Not Found",
        }
    }

    return {
        title: product.name,
        description: product.shortDescription || product.description?.substring(0, 160),
        openGraph: {
            images: product.images || [],
        },
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            supplier: true,
        },
    })

    if (!product) {
        notFound()
    }

    // Fetch related products
    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: product.id },
            isActive: true,
        },
        take: 4,
    })

    const discount = product.mrp ? calculateDiscount(product.mrp, product.price) : 0
    const specifications = product.specifications as Record<string, string> || {}

    return (
        <div className="container-custom py-8 md:py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/products" className="hover:text-primary">Products</Link>
                <span className="mx-2">/</span>
                <Link href={`/categories/${product.category.slug}`} className="hover:text-primary">
                    {product.category.name}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                {/* Image Gallery */}
                <ImageGallery images={product.images} name={product.name} />

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>SKU: {product.sku}</span>
                            {product.supplier && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span>Brand: {product.supplier.name}</span>
                                </>
                            )}
                            {product.stock > 0 ? (
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">In Stock</Badge>
                            ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold text-primary">
                            {formatCurrency(product.price)}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                            <>
                                <span className="text-xl text-muted-foreground line-through">
                                    {formatCurrency(product.mrp)}
                                </span>
                                <Badge className="bg-red-500 hover:bg-red-600">
                                    {discount}% OFF
                                </Badge>
                            </>
                        )}
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                        {product.shortDescription || product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="flex-1 gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2">
                            <Heart className="h-5 w-5" />
                            Save
                        </Button>
                        <Button size="lg" variant="ghost" className="px-3">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                            <Truck className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Fast Delivery</p>
                                <p className="text-muted-foreground text-xs">Within 3-5 business days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Quality Guarantee</p>
                                <p className="text-muted-foreground text-xs">Verified authentic products</p>
                            </div>
                        </div>
                    </div>

                    {/* Bulk Enquiry & Sample Request */}
                    <div className="flex flex-col gap-3 pt-4">
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" asChild>
                                <Link href={`/bulk-enquiry?product=${product.id}`}>
                                    Bulk Enquiry
                                </Link>
                            </Button>
                            <Button variant="outline" className="flex-1" asChild>
                                <Link href={`/sample-request?product=${product.id}`}>
                                    Request Sample
                                </Link>
                            </Button>
                        </div>
                        {product.brochureUrl && (
                            <Button variant="link" className="text-muted-foreground h-auto p-0 justify-start gap-2">
                                <FileText className="h-4 w-4" />
                                Download Brochure
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs: Description, Specs, Reviews */}
            <Tabs defaultValue="specifications" className="mb-16">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                        value="specifications"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                    >
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                    >
                        Description
                    </TabsTrigger>
                    <TabsTrigger
                        value="shipping"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                    >
                        Shipping & Returns
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="pt-6">
                    <Card className="border-none shadow-none">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Feature</TableHead>
                                    <TableHead>Detail</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(specifications).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                ))}
                                {product.weight && (
                                    <TableRow>
                                        <TableCell className="font-medium">Weight</TableCell>
                                        <TableCell>{product.weight} kg</TableCell>
                                    </TableRow>
                                )}
                                {product.dimensions && (
                                    <TableRow>
                                        <TableCell className="font-medium">Dimensions</TableCell>
                                        <TableCell>{product.dimensions}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="description" className="pt-6">
                    <div className="prose max-w-none">
                        <p>{product.description}</p>
                    </div>
                </TabsContent>

                <TabsContent value="shipping" className="pt-6">
                    <div className="prose max-w-none">
                        <h3>Shipping Information</h3>
                        <p>We offer reliable shipping across India. Shipping costs are calculated based on the weight of your order and your location.</p>
                        <ul>
                            <li>Free shipping on orders above ₹5,000</li>
                            <li>Standard delivery: 3-7 business days</li>
                            <li>Express delivery available in select cities</li>
                        </ul>

                        <h3>Returns Policy</h3>
                        <p>We accept returns within 7 days of delivery for damaged or defective products. Please inspect your order upon delivery.</p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <FeaturedProducts
                    products={relatedProducts}
                    title="Related Products"
                    subtitle="You might also like these"
                />
            )}
        </div>
    )
}
