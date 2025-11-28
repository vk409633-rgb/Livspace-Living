import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                                R
                            </div>
                            <span className="font-bold text-xl text-white">
                                RetailStore
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-xs">
                            Your one-stop destination for premium tiles, furniture, sanitary ware, and complete home finishing solutions.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    Blog & News
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/categories/tiles" className="hover:text-primary transition-colors">
                                    Tiles & Flooring
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/furniture" className="hover:text-primary transition-colors">
                                    Furniture
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/sanitary-ware" className="hover:text-primary transition-colors">
                                    Sanitary Ware
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/modular-kitchen" className="hover:text-primary transition-colors">
                                    Modular Kitchen
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/lighting" className="hover:text-primary transition-colors">
                                    Lighting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>
                                    123 Main Road, Kankarbagh,<br />
                                    Patna, Bihar - 800020
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>info@retailstore.com</span>
                            </li>
                        </ul>

                        <div className="pt-2">
                            <h4 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h4>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Your email"
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-9"
                                />
                                <Button size="sm">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-slate-800" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} RetailStore. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/shipping" className="hover:text-white transition-colors">
                            Shipping Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
