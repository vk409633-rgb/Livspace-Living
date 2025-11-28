import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkLightingProducts() {
    const lightingCategory = await prisma.category.findUnique({
        where: { slug: 'lighting' },
        include: {
            products: {
                include: {
                    images: true
                }
            }
        }
    })

    if (!lightingCategory) {
        console.log('Lighting category not found')
        return
    }

    console.log(`\nLighting Category Products (${lightingCategory.products.length} total):\n`)

    for (const product of lightingCategory.products) {
        console.log(`Product: ${product.name}`)
        console.log(`  Slug: ${product.slug}`)
        console.log(`  Price: ₹${product.price}`)
        console.log(`  Images: ${product.images.length}`)
        product.images.forEach((img, i) => {
            console.log(`    ${i + 1}. ${img.url}`)
        })
        console.log('')
    }
}

checkLightingProducts()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
