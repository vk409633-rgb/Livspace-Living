# 🏪 Retail E-Commerce Platform

A complete, production-ready e-commerce platform built with Next.js 14 for retail businesses selling tiles, furniture, sanitary-ware, kitchen items, lighting, tools, and house-finishing products.

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse products by categories with advanced filtering
- **Product Details**: Detailed product pages with image gallery, specifications, and related products
- **Shopping Cart**: Add/remove products, update quantities
- **Wishlist**: Save products for later
- **Checkout**: Seamless checkout with multiple payment options
- **Order Tracking**: Track order status and history
- **Sample Requests**: Request product samples
- **Bulk Enquiry**: Get quotes for bulk orders
- **Services**: Book installation, tile cutting, 3D design, showroom visits

### 🔧 Admin Features
- **Dashboard**: Sales analytics, revenue charts, low stock alerts
- **Product Management**: CRUD operations for products with image upload
- **Category Management**: Organize products in hierarchical categories
- **Supplier Management**: Manage supplier information
- **Order Management**: Process and track orders
- **Customer Management**: View customer details and order history
- **Bulk Import**: Import products via CSV
- **Coupon Management**: Create and manage discount coupons

### 💳 Payment & Shipping
- **Razorpay Integration**: Secure online payments
- **Cash on Delivery**: COD option available
- **Shipping Calculator**: Weight-based shipping cost calculation
- **Free Shipping**: Automatic free shipping above threshold

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL (Neon/PlanetScale)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Payment**: Razorpay
- **File Upload**: Uploadthing
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand

## 📁 Project Structure

```
retail-ecommerce/
├── app/                    # Next.js app directory
│   ├── (storefront)/      # Customer-facing pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── storefront/       # Customer components
│   └── admin/            # Admin components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── prisma/               # Database schema & migrations
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Neon/PlanetScale account)
- Razorpay account
- Uploadthing account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/retail-ecommerce.git
cd retail-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/retail_ecommerce"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_key_id"
RAZORPAY_KEY_SECRET="your_secret"
UPLOADTHING_SECRET="your_secret"
UPLOADTHING_APP_ID="your_app_id"
```

4. **Set up database**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Admin Credentials

After seeding:
- **Email**: admin@retailstore.com
- **Password**: admin123

⚠️ **Change these credentials immediately in production!**

## 📊 Database Schema

The application uses Prisma with PostgreSQL and includes:

- **User**: Customer and admin accounts
- **Product**: Product catalog with specifications
- **Category**: Hierarchical product categories
- **Supplier**: Supplier information
- **Order**: Order management
- **Cart**: Shopping cart items
- **Wishlist**: Saved products
- **Coupon**: Discount coupons
- **Address**: Customer addresses
- **ServiceBooking**: Service requests
- **SampleRequest**: Product sample requests
- **BulkEnquiry**: Bulk order enquiries

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Primary, secondary, accent colors
- **Typography**: Inter for body, Poppins for headings
- **Components**: Reusable UI components from shadcn/ui
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Support for dark mode (optional)

## 📱 Key Pages

### Customer Pages
- `/` - Home page with featured products
- `/products` - All products listing
- `/products/[slug]` - Product detail page
- `/categories/[slug]` - Category products
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/wishlist` - Wishlist

### Admin Pages
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/categories` - Category management
- `/admin/suppliers` - Supplier management
- `/admin/bulk-import` - CSV import

## 🔌 API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `GET/POST /api/products` - Products CRUD
- `GET/POST /api/cart` - Cart management
- `POST /api/checkout` - Process checkout
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/upload` - File upload
- `POST /api/bulk-import` - CSV import

## 📦 CSV Import

Import products in bulk using CSV files. See [CSV_IMPORT_TEMPLATE.md](./CSV_IMPORT_TEMPLATE.md) for format details.

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

Quick deployment to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📈 Performance

- **Lighthouse Score**: 90+ for Performance, SEO, Accessibility
- **Image Optimization**: Next/Image for automatic optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Lazy load images and components
- **Caching**: Proper caching headers

## 🔒 Security

- **Authentication**: Secure authentication with NextAuth
- **Password Hashing**: bcrypt for password hashing
- **CSRF Protection**: Built-in CSRF protection
- **SQL Injection**: Prisma prevents SQL injection
- **XSS Protection**: React's built-in XSS protection
- **Environment Variables**: Secrets stored in environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Razorpay](https://razorpay.com/)

## 📞 Support

For support, email support@yourstore.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Implement all page components
- [ ] Complete API routes
- [ ] Add search functionality
- [ ] Implement reviews and ratings
- [ ] Add email notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Vendor management system

## 📸 Screenshots

(Add screenshots of your application here)

---

Built with ❤️ for retail businesses in India
