import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Format currency in INR
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

// Format date
export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

// Calculate discount percentage
export function calculateDiscount(mrp: number, price: number): number {
    if (mrp <= price) return 0
    return Math.round(((mrp - price) / mrp) * 100)
}

// Calculate shipping cost based on weight
export function calculateShipping(weight: number, subtotal: number): number {
    const freeShippingThreshold = parseFloat(process.env.FREE_SHIPPING_THRESHOLD || '5000')
    const ratePerKg = parseFloat(process.env.SHIPPING_RATE_PER_KG || '50')

    if (subtotal >= freeShippingThreshold) return 0
    return Math.ceil(weight) * ratePerKg
}

// Generate slug from string
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Generate order number
export function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `ORD-${timestamp}-${random}`
}

// Validate Indian phone number
export function validatePhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate Indian pincode
export function validatePincode(pincode: string): boolean {
    const pincodeRegex = /^[1-9][0-9]{5}$/
    return pincodeRegex.test(pincode)
}

// Validate GST number
export function validateGST(gst: string): boolean {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstRegex.test(gst)
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

// Get initials from name
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

// Parse specifications JSON safely
export function parseSpecifications(specs: any): Record<string, any> {
    if (typeof specs === 'string') {
        try {
            return JSON.parse(specs)
        } catch {
            return {}
        }
    }
    return specs || {}
}

// Get product image URL or placeholder
export function getProductImage(images: string[] | null, index: number = 0): string {
    if (!images || images.length === 0) {
        return '/placeholder-product.jpg'
    }
    return images[index] || images[0]
}

// Calculate cart total
export function calculateCartTotal(items: { quantity: number; product: { price: number } }[]): number {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
}

// Get order status color
export function getOrderStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-blue-100 text-blue-800',
        PROCESSING: 'bg-purple-100 text-purple-800',
        SHIPPED: 'bg-indigo-100 text-indigo-800',
        DELIVERED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        RETURNED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
}

// Get payment status color
export function getPaymentStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        PAID: 'bg-green-100 text-green-800',
        FAILED: 'bg-red-100 text-red-800',
        REFUNDED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
}
