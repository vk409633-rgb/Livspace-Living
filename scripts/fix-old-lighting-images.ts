import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateOldLightingImages() {
    console.log('Updating old lighting product images...')

    // Update LED Panel Light
    const ledPanel = await prisma.product.findUnique({
        where: { slug: 'led-panel-light-2x2-36w' },
        include: { images: true }
    })

    if (ledPanel) {
        await prisma.productImage.deleteMany({
            where: { productId: ledPanel.id }
        })

        await prisma.productImage.create({
            data: {
                url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1920&q=90',
                productId: ledPanel.id
            }
        })
        console.log('✓ Updated LED Panel Light image to HD')
    }

    // Update Chandelier
    const chandelier = await prisma.product.findUnique({
        where: { slug: 'chandelier-crystal-pendant' },
        include: { images: true }
    })

    if (chandelier) {
        await prisma.productImage.deleteMany({
            where: { productId: chandelier.id }
        })

        await prisma.productImage.create({
            data: {
                url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&q=90',
                productId: chandelier.id
            }
        })
        console.log('✓ Updated Chandelier image to HD')
    }

    console.log('\n✅ All old lighting product images updated!')
}

updateOldLightingImages()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
