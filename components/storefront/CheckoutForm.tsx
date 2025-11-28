"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store/cart"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(6, "Valid pincode is required"),
    paymentMethod: z.enum(["COD", "ONLINE"]),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
    const router = useRouter()
    const { items, totalPrice, clearCart } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: "COD",
        },
    })

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsProcessing(true)
        try {
            // Create order via API
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    items: items.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price
                    })),
                    total: totalPrice()
                }),
            })

            if (!response.ok) throw new Error("Checkout failed")

            const result = await response.json()

            if (data.paymentMethod === "ONLINE") {
                // Handle Razorpay
                // For now, just redirect to success
                clearCart()
                router.push(`/checkout/success?orderId=${result.orderId}`)
            } else {
                clearCart()
                router.push(`/checkout/success?orderId=${result.orderId}`)
            }
        } catch (error) {
            console.error(error)
            // Show error toast
        } finally {
            setIsProcessing(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Button onClick={() => router.push("/products")}>
                    Continue Shopping
                </Button>
            </div>
        )
    }

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" {...form.register("firstName")} />
                                    {form.formState.errors.firstName && (
                                        <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" {...form.register("lastName")} />
                                    {form.formState.errors.lastName && (
                                        <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" {...form.register("email")} />
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" {...form.register("phone")} />
                                    {form.formState.errors.phone && (
                                        <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" {...form.register("address")} />
                                {form.formState.errors.address && (
                                    <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" {...form.register("city")} />
                                    {form.formState.errors.city && (
                                        <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" {...form.register("state")} />
                                    {form.formState.errors.state && (
                                        <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input id="pincode" {...form.register("pincode")} />
                                    {form.formState.errors.pincode && (
                                        <p className="text-sm text-red-500">{form.formState.errors.pincode.message}</p>
                                    )}
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Payment Method</h3>
                                <RadioGroup
                                    defaultValue="COD"
                                    onValueChange={(val) => form.setValue("paymentMethod", val as "COD" | "ONLINE")}
                                >
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem value="COD" id="cod" />
                                        <Label htmlFor="cod">Cash on Delivery</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem value="ONLINE" id="online" />
                                        <Label htmlFor="online">Online Payment (Razorpay)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex justify-between text-sm">
                                <span className="truncate max-w-[180px]">{item.product.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.product.price * item.quantity)}</span>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <span>Subtotal</span>
                            <span>{formatCurrency(totalPrice())}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-sm">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(totalPrice())}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            size="lg"
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Place Order • ${formatCurrency(totalPrice())}`
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
