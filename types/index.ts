import { Product, Category, Supplier, User, Order, OrderItem, Address } from '@prisma/client'

// Extended types with relations
export type ProductWithRelations = Product & {
    category: Category
    supplier: Supplier | null
    images: { url: string }[]
}

export type OrderWithRelations = Order & {
    items: (OrderItem & {
        product: Product
    })[]
    user: User
    address: Address
}

// Filter types
export interface ProductFilters {
    categoryId?: string
    supplierId?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    search?: string
    size?: string
    finish?: string
    color?: string
    material?: string
    brand?: string
    sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
    page?: number
    limit?: number
}

// Cart types
export interface CartItemWithProduct {
    id: string
    quantity: number
    product: Product
}

// Checkout types
export interface CheckoutData {
    items: CartItemWithProduct[]
    addressId: string
    paymentMethod: 'COD' | 'RAZORPAY'
    couponCode?: string
}

// Service booking types
export interface ServiceBookingData {
    serviceType: 'INSTALLATION' | 'TILE_CUTTING' | 'DESIGN_3D' | 'SHOWROOM_VISIT' | 'B2B_MEMBERSHIP'
    customerName: string
    email: string
    phone: string
    preferredDate: Date
    preferredTime?: string
    address?: string
    city?: string
    message?: string
}

// Sample request types
export interface SampleRequestData {
    productId: string
    customerName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    message?: string
}

// Bulk enquiry types
export interface BulkEnquiryData {
    productId?: string
    companyName: string
    contactPerson: string
    email: string
    phone: string
    quantity: number
    message?: string
}

// Admin dashboard stats
export interface DashboardStats {
    totalOrders: number
    totalRevenue: number
    totalProducts: number
    totalCustomers: number
    recentOrders: OrderWithRelations[]
    lowStockProducts: Product[]
    topSellingProducts: (Product & { salesCount: number })[]
}

// CSV import types
export interface ProductCSVRow {
    name: string
    sku: string
    category: string
    supplier?: string
    price: number
    mrp?: number
    stock: number
    description?: string
    specifications?: string
    images?: string
    weight?: number
    dimensions?: string
}
