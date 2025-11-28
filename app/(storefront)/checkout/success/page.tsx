import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string; orderNumber?: string }>
}) {
    return (
        <div className="container-custom py-16">
            <Card className="max-w-2xl mx-auto text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-3xl">Order Placed Successfully!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        Thank you for your order. We've received your order and will process it shortly.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                        <p className="text-lg font-mono font-bold">
                            {/* Will be populated from searchParams */}
                            Check your email for order details
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            A confirmation email has been sent to your email address with order details.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
