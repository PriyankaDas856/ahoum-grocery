import { create } from 'zustand'
import type { Product } from '../api/types'
import { loadCart, saveCart } from './cartStorage'
import { reconcileCart } from '../lib/reconcileCart'

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
  reconcile: (products: Product[]) => void
  clearCart: () => void
}

const initialItems = loadCart()

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === product.id,
      )

      const items = existingItem
        ? state.items.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    product.stock,
                  ),
                }
              : item,
          )
        : [
            ...state.items,
            {
              productId: product.id,
              quantity: 1,
              priceAtAdd: product.price,
            },
          ]

      saveCart(items)

      return { items }
    }),

  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter(
        (item) => item.productId !== productId,
      )

      saveCart(items)

      return { items }
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter(
              (item) => item.productId !== productId,
            )
          : state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity }
                : item,
            )

      saveCart(items)

      return { items }
    }),

  reconcile: (products) =>
    set((state) => {
      const result = reconcileCart(state.items, products)

      saveCart(result.items)

      return {
        items: result.items,
      }
    }),

  clearCart: () => {
    saveCart([])
    set({ items: [] })
  },
}))