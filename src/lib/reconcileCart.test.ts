import { describe, expect, it } from 'vitest'
import type { Product } from '../api/types'
import type { CartItem } from '../stores/cartStore'
import { reconcileCart } from './reconcileCart'

const cart: CartItem[] = [
  {
    productId: 'apple',
    quantity: 5,
    priceAtAdd: 100,
  },
  {
    productId: 'banana',
    quantity: 2,
    priceAtAdd: 50,
  },
  {
    productId: 'missing',
    quantity: 1,
    priceAtAdd: 20,
  },
]

const products: Product[] = [
  {
    id: 'apple',
    name: 'Apple',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 120,
    unit: '1 kg',
    stock: 2,
    image: '/images/apple.png',
    rating: 4.5,
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 50,
    unit: '1 kg',
    stock: 10,
    image: '/images/banana.png',
    rating: 4.5,
  },
]

describe('reconcileCart', () => {
  it('removes missing products', () => {
    const result = reconcileCart(cart, products)

    expect(result.items).not.toContainEqual(
      expect.objectContaining({
        productId: 'missing',
      }),
    )

    expect(result.removedProductIds).toContain('missing')
  })

  it('updates changed prices', () => {
    const result = reconcileCart(cart, products)

    expect(result.items).toContainEqual(
      expect.objectContaining({
        productId: 'apple',
        priceAtAdd: 120,
      }),
    )

    expect(result.priceUpdatedProductIds).toContain('apple')
  })

  it('clamps quantity to current stock', () => {
    const result = reconcileCart(cart, products)

    expect(result.items).toContainEqual(
      expect.objectContaining({
        productId: 'apple',
        quantity: 2,
      }),
    )

    expect(result.quantityAdjustedProductIds).toContain('apple')
  })
})