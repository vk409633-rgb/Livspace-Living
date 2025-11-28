import prisma from "@/lib/prisma"
import { StatsCard } from "@/components/admin/StatsCard"
import { formatCurrency } from "@/lib/utils"
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const revalidate = 0

async function getDashboardStats() {
    const [
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        recentOrders,
        lowStockProducts
    ] = await Promise.all([
        // Calculate total revenue (sum of all paid orders)
        prisma.order.aggregate({
            _sum: { total: true },
            where: { paymentStatus: 'PAID' }
        }),
        // Count total orders
        prisma.order.count(),
        // Count total customers
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
        // Count total products
        prisma.product.count({ where: { isActive: true } }),
        // Get recent orders
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        }),
        // Get low stock products
        prisma.product.findMany({
            where: {
                stock: { lte: 10 },
                isActive: true
            },
            take: 5,
            orderBy: { stock: 'asc' }
        })
    ])

    return {
        revenue: totalRevenue._sum.total || 0,
        orders: totalOrders,
        customers: totalCustomers,
        products: totalProducts,
        recentOrders,
        lowStockProducts
    }
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats()

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(stats.revenue)}
                    icon={DollarSign}
                    description="Lifetime revenue"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.orders}
                    icon={ShoppingBag}
                    description="All time orders"
                />
                <StatsCard
                    title="Customers"
                    value={stats.customers}
                    icon={Users}
                    description="Active customers"
                />
                <StatsCard
                    title="Active Products"
                    value={stats.products}
                    icon={Package}
                    description="In catalog"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Orders */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.recentOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No orders found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    stats.recentOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                            <TableCell>{order.user.name || order.user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === 'DELIVERED' ? 'default' : 'secondary'}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Low Stock Alerts */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Low Stock Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Stock</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.lowStockProducts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                                            All stock levels healthy
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    stats.lowStockProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium truncate max-w-[200px]">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="text-right text-red-600 font-bold">
                                                {product.stock}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
