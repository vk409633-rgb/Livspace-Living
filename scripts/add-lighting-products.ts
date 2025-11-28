import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addLightingProducts() {
    console.log('Adding lighting products...')

    // Get the lighting category
    const lightingCategory = await prisma.category.findUnique({
        where: { slug: 'lighting' }
    })

    if (!lightingCategory) {
        console.error('Lighting category not found!')
        return
    }

    const lightingProducts = [
        {
            name: 'Modern LED Wall Light - Black',
            slug: 'modern-led-wall-light-black',
            description: 'Sleek modern LED wall light with black finish. Perfect for accent lighting in living rooms, bedrooms, and hallways. Energy-efficient with warm white LED.',
            shortDescription: 'Modern black LED wall light',
            categoryId: lightingCategory.id,
            price: 1850,
            mrp: 2500,
            sku: 'LIT-WAL-014',
            stock: 75,
            specifications: JSON.stringify({
                type: 'Wall Light',
                color: 'Black',
                wattage: '12W LED',
                lightColor: 'Warm White',
                material: 'Aluminum',
                dimensions: '40cm x 8cm',
                warranty: '2 years',
            }),
            images: ['/products/wall-light-1.jpg'],
            weight: 1.2,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Flush Mount Ceiling Light Set',
            slug: 'flush-mount-ceiling-light-set',
            description: 'Set of modern flush mount ceiling lights ideal for bedrooms and living rooms. Provides ambient lighting with elegant design. Energy-efficient LED technology.',
            shortDescription: 'Ceiling light set for bedroom',
            categoryId: lightingCategory.id,
            price: 3200,
            mrp: 4500,
            sku: 'LIT-CEI-015',
            stock: 50,
            specifications: JSON.stringify({
                type: 'Ceiling Light',
                color: 'White',
                wattage: '18W LED per unit',
                lightColor: 'Warm White',
                material: 'Acrylic + Metal',
                quantity: '3 units',
                warranty: '2 years',
            }),
            images: ['/products/ceiling-light-1.jpg'],
            weight: 2.5,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Decorative Feather LED Wall Sconce',
            slug: 'decorative-feather-led-wall-sconce',
            description: 'Artistic feather-shaped LED wall sconce with ambient backlighting. Creates a stunning visual effect perfect for modern interiors. Premium acrylic construction.',
            shortDescription: 'Feather design LED wall light',
            categoryId: lightingCategory.id,
            price: 2850,
            mrp: 3800,
            sku: 'LIT-FEA-016',
            stock: 40,
            specifications: JSON.stringify({
                type: 'Decorative Wall Light',
                color: 'White with Gold Accent',
                wattage: '15W LED',
                lightColor: 'Warm White',
                material: 'Acrylic',
                dimensions: '60cm x 20cm',
                warranty: '1 year',
            }),
            images: ['/products/feather-wall-light.jpg'],
            weight: 1.8,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'LED Cove Lighting Strip Kit',
            slug: 'led-cove-lighting-strip-kit',
            description: 'Professional LED strip lighting kit for false ceiling cove lighting. Creates elegant indirect lighting effect. Complete kit with driver and accessories.',
            shortDescription: 'Cove lighting LED strip kit',
            categoryId: lightingCategory.id,
            price: 4500,
            mrp: 6000,
            sku: 'LIT-COV-017',
            stock: 60,
            specifications: JSON.stringify({
                type: 'LED Strip',
                color: 'Warm White',
                wattage: '60W',
                length: '5 meters',
                lightColor: 'Warm White 3000K',
                includes: 'LED Strip, Driver, Connectors',
                warranty: '2 years',
            }),
            images: ['/products/cove-lighting.jpg'],
            weight: 1.5,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Bedside Wall Lamp with Fabric Shade',
            slug: 'bedside-wall-lamp-fabric-shade',
            description: 'Elegant bedside wall lamp with premium fabric shade. Perfect for reading and ambient lighting. Adjustable arm for convenience. Classic design with modern functionality.',
            shortDescription: 'Bedside wall reading lamp',
            categoryId: lightingCategory.id,
            price: 1650,
            mrp: 2200,
            sku: 'LIT-BED-018',
            stock: 80,
            specifications: JSON.stringify({
                type: 'Wall Lamp',
                color: 'Beige/Cream',
                wattage: '7W LED',
                lightColor: 'Warm White',
                material: 'Metal + Fabric',
                features: 'Adjustable arm',
                warranty: '1 year',
            }),
            images: ['/products/bedside-wall-lamp.jpg'],
            weight: 1.0,
            isActive: true,
            isFeatured: false,
        },
    ]

    for (const product of lightingProducts) {
        const { images, ...productData } = product

        const createdProduct = await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: productData,
        })

        // Create images
        if (images && images.length > 0) {
            // Delete existing images first
            await prisma.productImage.deleteMany({
                where: { productId: createdProduct.id }
            })

            for (const imageUrl of images) {
                await prisma.productImage.create({
                    data: {
                        url: imageUrl,
                        productId: createdProduct.id
                    }
                })
            }
        }

        console.log(`✓ Created: ${product.name} - ₹${product.price}`)
    }

    console.log('\n✅ All lighting products added successfully!')
}

addLightingProducts()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
