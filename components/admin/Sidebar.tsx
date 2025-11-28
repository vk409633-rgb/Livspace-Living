"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Tags,
    Truck,
    Upload
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Bulk Import", href: "/admin/bulk-import", icon: Upload },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-slate-900 text-slate-300 md:block md:w-64 lg:w-72 h-screen sticky top-0">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-white text-xl">
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                        A
                    </div>
                    Admin Panel
                </Link>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`)

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                                isActive
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                    : "hover:bg-slate-800"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {link.name}
                        </Link>
                    )
                })}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
                <Button variant="destructive" className="w-full gap-2 justify-start">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
