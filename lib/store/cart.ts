import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@prisma/client'

export type CartProduct = Product & {
    images?: { url: string }[]
    category?: { slug: string; name: string } | null
}

export interface CartItem {
    product: CartProduct
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: CartProduct) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: () => number
    totalPrice: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items
                const existingItem = items.find((item) => item.product.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    })
                } else {
                    set({ items: [...items, { product, quantity: 1 }] })
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.product.id !== productId),
                })
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }
                set({
                    items: get().items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                ),
        }),
        {
            name: 'cart-storage',
        }
    )
)
