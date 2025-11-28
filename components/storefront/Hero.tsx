import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative bg-slate-900 text-white overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=2053&auto=format&fit=crop')] bg-cover bg-center" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

            <div className="container-custom relative z-20 py-20 md:py-32 lg:py-40">
                <div className="max-w-2xl space-y-6 animate-fade-in">
                    <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30">
                        Premium Home Finishing Solutions
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Transform Your <br />
                        <span className="text-primary">Dream Space</span>
                    </h1>

                    <p className="text-lg text-slate-300 md:text-xl max-w-lg">
                        Discover our exclusive collection of premium tiles, modern furniture, sanitary ware, and modular kitchens. Quality that lasts a lifetime.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="text-base px-8 h-12" asChild>
                            <Link href="/products">
                                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-base px-8 h-12 border-white text-white hover:bg-white hover:text-slate-900" asChild>
                            <Link href="/categories">
                                Explore Categories
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
