/**
 * Product Image Utilities
 * Provides high-quality fallback images from Unsplash for different product categories
 */

export const categoryImages = {
    tiles: [
        "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=1920&q=90", // Marble tiles
        "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1920&q=90", // Modern tiles
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=90", // Ceramic tiles
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&q=90", // Floor tiles
    ],
    furniture: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90", // Modern sofa
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1920&q=90", // Bed
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=90", // Dining table
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90", // Chair
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1920&q=90", // Wardrobe
    ],
    "sanitary-ware": [
        "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=1920&q=90", // Modern bathroom
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1920&q=90", // Sink
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=90", // Faucet
        "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1920&q=90", // Shower
    ],
    "modular-kitchen": [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1920&q=90", // Modern kitchen
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90", // Kitchen cabinets
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1920&q=90", // Kitchen island
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1920&q=90", // Kitchen counter
    ],
    lighting: [
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1920&q=90", // Pendant light
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&q=90", // Chandelier
        "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1920&q=90", // LED lights
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1920&q=90", // Wall lights
    ],
    tools: [
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1920&q=90", // Tools
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1920&q=90", // Construction tools
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=90", // Power tools
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1920&q=90", // Hand tools
    ],
    default: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90", // Modern interior
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90", // Home decor
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=90", // Interior design
    ]
}

/**
 * Get a fallback image for a product based on its category
 */
export function getCategoryImage(categorySlug: string, index: number = 0): string {
    const normalizedSlug = categorySlug.toLowerCase().replace(/\s+/g, '-')
    const images = categoryImages[normalizedSlug as keyof typeof categoryImages] || categoryImages.default
    return images[index % images.length]
}

/**
 * Get product image URL with fallback
 */
export function getProductImageUrl(
    productImages: Array<{ url: string }> | undefined,
    categorySlug?: string,
    productIndex: number = 0
): string {
    // If product has images, use the first one
    if (productImages && productImages.length > 0) {
        return productImages[0].url
    }

    // Otherwise, use category-specific fallback
    if (categorySlug) {
        return getCategoryImage(categorySlug, productIndex)
    }

    // Final fallback
    return categoryImages.default[0]
}

/**
 * Get multiple product images with fallbacks
 */
export function getProductImages(
    productImages: Array<{ url: string }> | undefined,
    categorySlug?: string,
    count: number = 4
): string[] {
    // If product has images, return them
    if (productImages && productImages.length > 0) {
        return productImages.map(img => img.url)
    }

    // Otherwise, return category-specific fallbacks
    if (categorySlug) {
        const normalizedSlug = categorySlug.toLowerCase().replace(/\s+/g, '-')
        const images = categoryImages[normalizedSlug as keyof typeof categoryImages] || categoryImages.default
        return images.slice(0, count)
    }

    // Final fallback
    return categoryImages.default.slice(0, count)
}

/**
 * Hero/Banner images for different sections
 */
export const bannerImages = {
    hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=90",
    tiles: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=2000&q=90",
    furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=90",
    sanitaryWare: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=2000&q=90",
    modularKitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=2000&q=90",
    lighting: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=2000&q=90",
    tools: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=2000&q=90",
}
