import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
    title: "Register | Retail Ecommerce",
    description: "Create a new account",
}

export default function RegisterPage() {
    return (
        <>
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                    Create an account
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                        Sign in
                    </Link>
                </p>
            </div>
            <RegisterForm />
        </>
    )
}
