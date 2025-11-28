"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Trash2, Plus, ArrowLeft } from "lucide-react"
import { Category, Supplier } from "@prisma/client"
import Link from "next/link"

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    mrp: z.coerce.number().min(0).optional(),
    sku: z.string().min(2, "SKU is required"),
    stock: z.coerce.number().int().min(0),
    categoryId: z.string().min(1, "Category is required"),
    supplierId: z.string().optional(),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    images: z.array(z.object({ url: z.string().url("Must be a valid URL") })),
    specifications: z.array(z.object({ key: z.string().min(1), value: z.string().min(1) })),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
    categories: Category[]
    suppliers: Supplier[]
    initialData?: any
}

export function ProductForm({ categories, suppliers, initialData }: ProductFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const initialSpecs = initialData?.specifications
        ? (typeof initialData.specifications === 'string'
            ? Object.entries(JSON.parse(initialData.specifications)).map(([key, value]) => ({ key, value: String(value) }))
            : [])
        : []

    const initialImages = initialData?.images
        ? initialData.images.map((img: any) => ({ url: img.url }))
        : []

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            shortDescription: initialData?.shortDescription || "",
            price: initialData?.price || 0,
            mrp: initialData?.mrp || 0,
            sku: initialData?.sku || "",
            stock: initialData?.stock || 0,
            categoryId: initialData?.categoryId || "",
            supplierId: initialData?.supplierId || "",
            isActive: initialData?.isActive ?? true,
            isFeatured: initialData?.isFeatured ?? false,
            images: initialImages.length > 0 ? initialImages : [{ url: "" }],
            specifications: initialSpecs,
        },
    })

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control,
        name: "images",
    })

    const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
        control: form.control,
        name: "specifications",
    })

    const [isDeleting, setIsDeleting] = useState(false)

    async function onDelete() {
        if (!initialData) return
        if (!confirm("Are you sure you want to delete this product?")) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/products/${initialData.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            router.push("/admin/products")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setIsDeleting(false)
        }
    }

    async function onSubmit(data: ProductFormValues) {
        setIsLoading(true)
        try {
            const specsObject = data.specifications.reduce((acc, curr) => {
                acc[curr.key] = curr.value
                return acc
            }, {} as Record<string, string>)

            const payload = {
                ...data,
                specifications: JSON.stringify(specsObject),
                images: data.images.filter(img => img.url.trim() !== "").map(img => img.url),
            }

            const url = initialData ? `/api/products/${initialData.id}` : `/api/products`
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            router.push("/admin/products")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please check console.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {initialData ? "Edit Product" : "Create Product"}
                    </h1>
                </div>
                {initialData && (
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={isLoading || isDeleting}
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Product
                    </Button>
                )}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Basic Information</h3>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" disabled={isLoading} {...form.register("name")} />
                            {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" disabled={isLoading} {...form.register("slug")} />
                            {form.formState.errors.slug && <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Textarea id="shortDescription" disabled={isLoading} {...form.register("shortDescription")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Full Description</Label>
                            <Textarea id="description" className="min-h-[150px]" disabled={isLoading} {...form.register("description")} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Pricing & Inventory</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" disabled={isLoading} {...form.register("price")} />
                                {form.formState.errors.price && <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mrp">MRP</Label>
                                <Input id="mrp" type="number" disabled={isLoading} {...form.register("mrp")} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sku">SKU</Label>
                                <Input id="sku" disabled={isLoading} {...form.register("sku")} />
                                {form.formState.errors.sku && <p className="text-sm text-red-500">{form.formState.errors.sku.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input id="stock" type="number" disabled={isLoading} {...form.register("stock")} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Category</Label>
                            <select
                                id="categoryId"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLoading}
                                {...form.register("categoryId")}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.categoryId && <p className="text-sm text-red-500">{form.formState.errors.categoryId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supplierId">Supplier</Label>
                            <select
                                id="supplierId"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLoading}
                                {...form.register("supplierId")}
                            >
                                <option value="">Select a supplier</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isActive"
                                    checked={form.watch("isActive")}
                                    onCheckedChange={(checked) => form.setValue("isActive", checked as boolean)}
                                />
                                <Label htmlFor="isActive">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isFeatured"
                                    checked={form.watch("isFeatured")}
                                    onCheckedChange={(checked) => form.setValue("isFeatured", checked as boolean)}
                                />
                                <Label htmlFor="isFeatured">Featured</Label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Images</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendImage({ url: "" })}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Image
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {imageFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input
                                    placeholder="Image URL (e.g., https://example.com/image.jpg)"
                                    disabled={isLoading}
                                    {...form.register(`images.${index}.url`)}
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Specifications</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendSpec({ key: "", value: "" })}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Specification
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {specFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Input
                                    placeholder="Key (e.g., Material)"
                                    disabled={isLoading}
                                    {...form.register(`specifications.${index}.key`)}
                                />
                                <Input
                                    placeholder="Value (e.g., Ceramic)"
                                    disabled={isLoading}
                                    {...form.register(`specifications.${index}.value`)}
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSpec(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Product" : "Create Product"}
                </Button>
            </form>
        </div>
    )
}
