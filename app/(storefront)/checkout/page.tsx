import { CheckoutForm } from "@/components/storefront/CheckoutForm"

export default function CheckoutPage() {
    return (
        <div className="container-custom py-8 md:py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <CheckoutForm />
        </div>
    )
}
