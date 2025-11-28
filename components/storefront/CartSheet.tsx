"use client"

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store/cart"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CartSheet() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()
    const [isMounted, setIsMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            {totalItems()}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({totalItems()})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingCart className="h-12 w-12 opacity-20" />
                            <p>Your cart is empty</p>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-slate-50 shrink-0">
                                        <Image
                                            src={item.product.images[0] || "/placeholder-product.jpg"}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between gap-2">
                                            <h4 className="font-medium text-sm line-clamp-2">
                                                {item.product.name}
                                            </h4>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                                                onClick={() => removeItem(item.product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <span className="font-medium">
                                                {formatCurrency(item.product.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-4 pt-4">
                        <Separator />
                        <div className="space-y-1.5">
                            <div className="flex justify-between">
                                <span className="text-sm">Subtotal</span>
                                <span className="font-medium">{formatCurrency(totalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span className="text-sm">Shipping</span>
                                <span className="text-sm">Calculated at checkout</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
