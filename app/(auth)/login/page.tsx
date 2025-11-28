import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
    title: "Login | Retail Ecommerce",
    description: "Login to your account",
}

export default function LoginPage() {
    return (
        <>
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Or{" "}
                    <Link href="/register" className="font-medium text-primary hover:text-primary/90">
                        create a new account
                    </Link>
                </p>
            </div>
            <LoginForm />
        </>
    )
}
