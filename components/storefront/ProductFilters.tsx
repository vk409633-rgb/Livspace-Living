"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Category, Supplier } from "@prisma/client"

interface ProductFiltersProps {
    categories: Category[]
    suppliers: Supplier[]
}

export function ProductFilters({ categories, suppliers }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [priceRange, setPriceRange] = useState([0, 10000])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

    // Initialize state from URL params
    useEffect(() => {
        const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0
        const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 10000
        setPriceRange([minPrice, maxPrice])

        const categoryParam = searchParams.get("categoryId")
        if (categoryParam) {
            setSelectedCategories(categoryParam.split(","))
        }

        const supplierParam = searchParams.get("supplierId")
        if (supplierParam) {
            setSelectedSuppliers(supplierParam.split(","))
        }
    }, [searchParams])

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("minPrice", priceRange[0].toString())
        params.set("maxPrice", priceRange[1].toString())

        if (selectedCategories.length > 0) {
            params.set("categoryId", selectedCategories.join(","))
        } else {
            params.delete("categoryId")
        }

        if (selectedSuppliers.length > 0) {
            params.set("supplierId", selectedSuppliers.join(","))
        } else {
            params.delete("supplierId")
        }

        // Reset page when filtering
        params.set("page", "1")

        router.push(`/products?${params.toString()}`)
    }

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, categoryId])
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
        }
    }

    const handleSupplierChange = (supplierId: string, checked: boolean) => {
        if (checked) {
            setSelectedSuppliers([...selectedSuppliers, supplierId])
        } else {
            setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplierId))
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <Button onClick={applyFilters} className="w-full mb-4">Apply Filters</Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/products")}
                >
                    Reset Filters
                </Button>
            </div>

            <Separator />

            <Accordion type="single" collapsible defaultValue="categories" className="w-full">
                <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${category.id}`}
                                        checked={selectedCategories.includes(category.id)}
                                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                                    />
                                    <Label htmlFor={`cat-${category.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <Slider
                                defaultValue={[0, 10000]}
                                max={50000}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="my-4"
                            />
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="min-price">Min</Label>
                                    <Input
                                        id="min-price"
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="h-8"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="max-price">Max</Label>
                                    <Input
                                        id="max-price"
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="suppliers">
                    <AccordionTrigger>Brands</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {suppliers.map((supplier) => (
                                <div key={supplier.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`sup-${supplier.id}`}
                                        checked={selectedSuppliers.includes(supplier.id)}
                                        onCheckedChange={(checked) => handleSupplierChange(supplier.id, checked as boolean)}
                                    />
                                    <Label htmlFor={`sup-${supplier.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {supplier.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
