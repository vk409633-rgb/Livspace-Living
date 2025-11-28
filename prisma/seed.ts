import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@retailstore.com' },
        update: {},
        create: {
            email: 'admin@retailstore.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('Admin user created:', admin.email)

    // Create categories
    const tilesCategory = await prisma.category.upsert({
        where: { slug: 'tiles' },
        update: {},
        create: {
            name: 'Tiles',
            slug: 'tiles',
            description: 'Premium quality tiles for floors and walls',
            isActive: true,
            sortOrder: 1,
        },
    })

    const vitrifiedTiles = await prisma.category.upsert({
        where: { slug: 'vitrified-tiles' },
        update: {},
        create: {
            name: 'Vitrified Tiles',
            slug: 'vitrified-tiles',
            description: 'High-quality vitrified tiles',
            parentId: tilesCategory.id,
            isActive: true,
            sortOrder: 1,
        },
    })

    const ceramicTiles = await prisma.category.upsert({
        where: { slug: 'ceramic-tiles' },
        update: {},
        create: {
            name: 'Ceramic Tiles',
            slug: 'ceramic-tiles',
            description: 'Durable ceramic tiles',
            parentId: tilesCategory.id,
            isActive: true,
            sortOrder: 2,
        },
    })

    const furnitureCategory = await prisma.category.upsert({
        where: { slug: 'furniture' },
        update: {},
        create: {
            name: 'Furniture',
            slug: 'furniture',
            description: 'Modern furniture for home and office',
            isActive: true,
            sortOrder: 2,
        },
    })

    const sanitaryCategory = await prisma.category.upsert({
        where: { slug: 'sanitary-ware' },
        update: {},
        create: {
            name: 'Sanitary Ware',
            slug: 'sanitary-ware',
            description: 'Premium bathroom fittings and accessories',
            isActive: true,
            sortOrder: 3,
        },
    })

    const kitchenCategory = await prisma.category.upsert({
        where: { slug: 'modular-kitchen' },
        update: {},
        create: {
            name: 'Modular Kitchen',
            slug: 'modular-kitchen',
            description: 'Complete modular kitchen solutions',
            isActive: true,
            sortOrder: 4,
        },
    })

    const lightingCategory = await prisma.category.upsert({
        where: { slug: 'lighting' },
        update: {},
        create: {
            name: 'Lighting',
            slug: 'lighting',
            description: 'LED lights and decorative lighting',
            isActive: true,
            sortOrder: 5,
        },
    })

    console.log('Categories created')

    // Create suppliers
    const suppliers = await Promise.all([
        prisma.supplier.upsert({
            where: { slug: 'kajaria' },
            update: {},
            create: {
                name: 'Kajaria Ceramics',
                slug: 'kajaria',
                description: 'India\'s largest tile manufacturer',
                gstNumber: '09AAACK1234F1Z5',
                city: 'Delhi',
                state: 'Delhi',
                isActive: true,
            },
        }),
        prisma.supplier.upsert({
            where: { slug: 'somany' },
            update: {},
            create: {
                name: 'Somany Ceramics',
                slug: 'somany',
                description: 'Premium tiles and bathroom solutions',
                gstNumber: '09AABCS1234F1Z5',
                city: 'Mumbai',
                state: 'Maharashtra',
                isActive: true,
            },
        }),
        prisma.supplier.upsert({
            where: { slug: 'hindware' },
            update: {},
            create: {
                name: 'Hindware',
                slug: 'hindware',
                description: 'Complete bathroom solutions',
                gstNumber: '09AABCH1234F1Z5',
                city: 'Bangalore',
                state: 'Karnataka',
                isActive: true,
            },
        }),
        prisma.supplier.upsert({
            where: { slug: 'godrej' },
            update: {},
            create: {
                name: 'Godrej Interio',
                slug: 'godrej',
                description: 'Premium furniture solutions',
                gstNumber: '09AABCG1234F1Z5',
                city: 'Mumbai',
                state: 'Maharashtra',
                isActive: true,
            },
        }),
    ])

    console.log('Suppliers created')

    // Create sample products
    const products = [
        {
            name: 'Premium Vitrified Floor Tile 600x600mm',
            slug: 'premium-vitrified-floor-tile-600x600',
            description: 'High-quality vitrified floor tiles with glossy finish. Perfect for living rooms and bedrooms.',
            shortDescription: 'Premium glossy vitrified tiles',
            categoryId: vitrifiedTiles.id,
            supplierId: suppliers[0].id,
            price: 45,
            mrp: 60,
            discount: 25,
            sku: 'VIT-600-001',
            stock: 500,
            specifications: {
                size: '600x600mm',
                finish: 'Glossy',
                color: 'Beige',
                material: 'Vitrified',
                thickness: '10mm',
                waterAbsorption: '0.5%',
                peiRating: 'PEI 4',
                application: 'Floor',
            },
            images: ['/products/tile-1.jpg'],
            weight: 12.5,
            dimensions: '600x600x10mm',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Large Format Vitrified Tile 800x1600mm',
            slug: 'large-format-vitrified-tile-800x1600',
            description: 'Extra-large format vitrified tiles for modern interiors. Creates seamless look with minimal joints.',
            shortDescription: 'Extra-large format tiles',
            categoryId: vitrifiedTiles.id,
            supplierId: suppliers[0].id,
            price: 125,
            mrp: 150,
            discount: 17,
            sku: 'VIT-800-002',
            stock: 200,
            specifications: {
                size: '800x1600mm',
                finish: 'Matt',
                color: 'Grey',
                material: 'Vitrified',
                thickness: '12mm',
                waterAbsorption: '0.3%',
                peiRating: 'PEI 5',
                application: 'Floor & Wall',
            },
            images: ['/products/tile-2.jpg'],
            weight: 35,
            dimensions: '800x1600x12mm',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Ceramic Wall Tile 300x450mm',
            slug: 'ceramic-wall-tile-300x450',
            description: 'Elegant ceramic wall tiles for bathrooms and kitchens. Water-resistant and easy to clean.',
            shortDescription: 'Ceramic bathroom tiles',
            categoryId: ceramicTiles.id,
            supplierId: suppliers[1].id,
            price: 28,
            mrp: 35,
            discount: 20,
            sku: 'CER-300-003',
            stock: 800,
            specifications: {
                size: '300x450mm',
                finish: 'Glossy',
                color: 'White',
                material: 'Ceramic',
                thickness: '8mm',
                waterAbsorption: '10%',
                application: 'Wall',
            },
            images: ['/products/tile-3.jpg'],
            weight: 4.5,
            dimensions: '300x450x8mm',
            isActive: true,
        },
        {
            name: 'Wooden Finish Vitrified Tile 200x1200mm',
            slug: 'wooden-finish-vitrified-tile-200x1200',
            description: 'Wood-look vitrified tiles that combine the beauty of wood with durability of tiles.',
            shortDescription: 'Wood-look plank tiles',
            categoryId: vitrifiedTiles.id,
            supplierId: suppliers[0].id,
            price: 85,
            mrp: 100,
            discount: 15,
            sku: 'VIT-200-004',
            stock: 350,
            specifications: {
                size: '200x1200mm',
                finish: 'Matt',
                color: 'Brown',
                material: 'Vitrified',
                thickness: '10mm',
                waterAbsorption: '0.5%',
                peiRating: 'PEI 4',
                application: 'Floor',
                design: 'Wood',
            },
            images: ['/products/tile-4.jpg'],
            weight: 8.5,
            dimensions: '200x1200x10mm',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Marble Look Porcelain Tile 600x1200mm',
            slug: 'marble-look-porcelain-tile-600x1200',
            description: 'Luxurious marble-look porcelain tiles. Perfect for premium residential and commercial spaces.',
            shortDescription: 'Marble-look porcelain',
            categoryId: vitrifiedTiles.id,
            supplierId: suppliers[1].id,
            price: 95,
            mrp: 120,
            discount: 21,
            sku: 'POR-600-005',
            stock: 300,
            specifications: {
                size: '600x1200mm',
                finish: 'Polished',
                color: 'White with Grey Veins',
                material: 'Porcelain',
                thickness: '10mm',
                waterAbsorption: '0.1%',
                peiRating: 'PEI 5',
                application: 'Floor & Wall',
            },
            images: ['/products/tile-5.jpg'],
            weight: 18,
            dimensions: '600x1200x10mm',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Premium Wash Basin with Pedestal',
            slug: 'premium-wash-basin-pedestal',
            description: 'Elegant ceramic wash basin with matching pedestal. Modern design with easy installation.',
            shortDescription: 'Ceramic pedestal basin',
            categoryId: sanitaryCategory.id,
            supplierId: suppliers[2].id,
            price: 3500,
            mrp: 4500,
            discount: 22,
            sku: 'SAN-BAS-006',
            stock: 50,
            specifications: {
                material: 'Ceramic',
                color: 'White',
                type: 'Pedestal',
                size: '550x450mm',
                warranty: '5 years',
            },
            images: ['/products/basin-1.jpg'],
            weight: 25,
            isActive: true,
        },
        {
            name: 'Wall Mounted Toilet Commode',
            slug: 'wall-mounted-toilet-commode',
            description: 'Space-saving wall-mounted toilet with soft-close seat. Modern European design.',
            shortDescription: 'Wall-hung toilet',
            categoryId: sanitaryCategory.id,
            supplierId: suppliers[2].id,
            price: 8500,
            mrp: 11000,
            discount: 23,
            sku: 'SAN-WC-007',
            stock: 30,
            specifications: {
                material: 'Ceramic',
                color: 'White',
                type: 'Wall Mounted',
                flushType: 'Dual Flush',
                warranty: '10 years',
            },
            images: ['/products/toilet-1.jpg'],
            weight: 35,
            isActive: true,
            isFeatured: true,
        },
        {
            name: '3-Seater Fabric Sofa Set',
            slug: '3-seater-fabric-sofa-set',
            description: 'Comfortable 3-seater sofa with premium fabric upholstery. Perfect for living room.',
            shortDescription: 'Premium fabric sofa',
            categoryId: furnitureCategory.id,
            supplierId: suppliers[3].id,
            price: 25000,
            mrp: 35000,
            discount: 29,
            sku: 'FUR-SOF-008',
            stock: 15,
            specifications: {
                material: 'Fabric',
                color: 'Grey',
                seatingCapacity: '3',
                dimensions: '210x90x85cm',
                warranty: '1 year',
            },
            images: ['/products/sofa-1.jpg'],
            weight: 80,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'King Size Bed with Storage',
            slug: 'king-size-bed-storage',
            description: 'Spacious king-size bed with hydraulic storage. Engineered wood with laminate finish.',
            shortDescription: 'King bed with storage',
            categoryId: furnitureCategory.id,
            supplierId: suppliers[3].id,
            price: 18000,
            mrp: 25000,
            discount: 28,
            sku: 'FUR-BED-009',
            stock: 20,
            specifications: {
                material: 'Engineered Wood',
                color: 'Walnut',
                size: 'King (72x78 inches)',
                storage: 'Hydraulic',
                warranty: '1 year',
            },
            images: ['/products/bed-1.jpg'],
            weight: 120,
            isActive: true,
        },
        {
            name: '6-Seater Dining Table Set',
            slug: '6-seater-dining-table-set',
            description: 'Elegant dining table with 6 chairs. Solid wood construction with cushioned seats.',
            shortDescription: '6-seater dining set',
            categoryId: furnitureCategory.id,
            supplierId: suppliers[3].id,
            price: 32000,
            mrp: 45000,
            discount: 29,
            sku: 'FUR-DIN-010',
            stock: 10,
            specifications: {
                material: 'Solid Wood',
                color: 'Brown',
                seatingCapacity: '6',
                tableSize: '180x90cm',
                warranty: '1 year',
            },
            images: ['/products/dining-1.jpg'],
            weight: 150,
            isActive: true,
        },
        {
            name: 'L-Shaped Modular Kitchen - 10ft',
            slug: 'l-shaped-modular-kitchen-10ft',
            description: 'Complete L-shaped modular kitchen with base and wall cabinets. Premium finish with soft-close hinges.',
            shortDescription: 'L-shaped modular kitchen',
            categoryId: kitchenCategory.id,
            supplierId: suppliers[3].id,
            price: 85000,
            mrp: 120000,
            discount: 29,
            sku: 'KIT-MOD-011',
            stock: 5,
            specifications: {
                layout: 'L-Shaped',
                length: '10 feet',
                material: 'HDHMR',
                finish: 'Acrylic',
                includes: 'Base cabinets, Wall cabinets, Countertop',
                warranty: '5 years',
            },
            images: ['/products/kitchen-1.jpg'],
            weight: 300,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'LED Panel Light 2x2 ft 36W',
            slug: 'led-panel-light-2x2-36w',
            description: 'Energy-efficient LED panel light for false ceiling. Cool white light with uniform illumination.',
            shortDescription: 'LED panel light',
            categoryId: lightingCategory.id,
            price: 850,
            mrp: 1200,
            discount: 29,
            sku: 'LIT-PAN-012',
            stock: 100,
            specifications: {
                wattage: '36W',
                size: '2x2 feet',
                color: 'Cool White',
                lumens: '3600',
                warranty: '2 years',
            },
            images: ['/products/light-1.jpg'],
            weight: 1.5,
            isActive: true,
        },
        {
            name: 'Chandelier Crystal Pendant Light',
            slug: 'chandelier-crystal-pendant',
            description: 'Elegant crystal chandelier for living and dining rooms. Creates stunning ambiance.',
            shortDescription: 'Crystal chandelier',
            categoryId: lightingCategory.id,
            price: 12000,
            mrp: 18000,
            discount: 33,
            sku: 'LIT-CHA-013',
            stock: 25,
            specifications: {
                type: 'Chandelier',
                material: 'Crystal & Metal',
                bulbs: '6 x E27',
                size: '24 inches diameter',
                warranty: '1 year',
            },
            images: ['/products/chandelier-1.jpg'],
            weight: 8,
            isActive: true,
            isFeatured: true,
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        })
    }

    console.log('Products created')

    // Create a coupon
    await prisma.coupon.upsert({
        where: { code: 'WELCOME10' },
        update: {},
        create: {
            code: 'WELCOME10',
            description: 'Welcome discount - 10% off',
            discountType: 'PERCENTAGE',
            discountValue: 10,
            minOrderValue: 1000,
            maxDiscount: 500,
            usageLimit: 100,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            isActive: true,
        },
    })

    console.log('Coupon created')

    console.log('Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
