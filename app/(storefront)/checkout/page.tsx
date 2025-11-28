import { CheckoutForm } from "@/components/storefront/CheckoutForm"
import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Checkout | Retail Ecommerce",
    description: "Complete your purchase",
}

export default function CheckoutPage() {
    return (
        <div className="container-custom py-8 md:py-12">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <CheckoutForm />
        </div>
    )
}
