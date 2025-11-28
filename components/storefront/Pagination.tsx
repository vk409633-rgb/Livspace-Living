"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", pageNumber.toString())
        return `/products?${params.toString()}`
    }

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page))
    }

    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
            </Button>

            <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8"
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
            </Button>
        </div>
    )
}
