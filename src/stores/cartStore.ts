import { create } from 'zustand'
import type { Product } from '../api/types'

export interface CartItem {
  productId: string
  quantity: number
  priceAtAdd: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === product.id,
      )

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    product.stock,
                  ),
                }
              : item,
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            quantity: 1,
            priceAtAdd: product.price,
          },
        ],
      }
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.productId !== productId,
      ),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => item.productId !== productId,
          ),
        }
      }

      return {
        items: state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity }
            : item,
        ),
      }
    }),

  clearCart: () => set({ items: [] }),
}))