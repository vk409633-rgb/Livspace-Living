"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

// Load CartSheet only on client to prevent hydration errors
const CartSheet = dynamic(() => import("./CartSheet").then(mod => ({ default: mod.CartSheet })), {
    ssr: false,
    loading: () => (
        <Button variant="ghost" size="icon" className="relative">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </Button>
    )
})

const categories = [
    { name: "Tiles", href: "/categories/tiles" },
    { name: "Furniture", href: "/categories/furniture" },
    { name: "Sanitary", href: "/categories/sanitary-ware" },
    { name: "Kitchen", href: "/categories/modular-kitchen" },
    { name: "Lighting", href: "/categories/lighting" },
    { name: "Tools", href: "/categories/tools" },
]

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/services"
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Services
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                            R
                        </div>
                        <span className="hidden font-bold text-xl sm:inline-block">
                            RetailStore
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="transition-colors hover:text-primary"
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>

                {/* Search, Cart, Account */}
                <div className="flex items-center gap-2">
                    <div className="hidden lg:flex relative w-64 mr-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 h-9"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link href="/account/login">
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>

                    <CartSheet />
                </div>
            </div>
        </header>
    )
}
