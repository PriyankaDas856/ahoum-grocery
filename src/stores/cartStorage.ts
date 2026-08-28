import type { CartItem } from './cartStore'

const CART_STORAGE_KEY = 'ahoum-grocery-cart'

export function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed as CartItem[]
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function clearStoredCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY)
}