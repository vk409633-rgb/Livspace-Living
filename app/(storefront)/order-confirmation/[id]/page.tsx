import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

interface OrderConfirmationPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
    const { id } = await params
    const order = await prisma.order.findUnique({
        where: { id },
    })

    if (!order) {
        notFound()
    }

    return (
        <div className="container-custom py-16 md:py-24 flex flex-col items-center text-center">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                Thank you for your purchase. Your order #{order.id.slice(0, 8)} has been confirmed and will be shipped shortly.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/profile/orders">View Orders</Link>
                </Button>
            </div>
        </div>
    )
}
