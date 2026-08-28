import { describe, expect, it } from 'vitest'
import type { Product } from '../api/types'
import type { CartItem } from '../stores/cartStore'
import {
  calculatePromoDiscount,
  getEligiblePromos,
  promoCodes,
} from './promotions'

const products: Product[] = [
  {
    id: 'apple',
    name: 'Natural Red Apple',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 5,
    unit: 'per kg',
    stock: 20,
    image: '/images/natural-red-apple.png',
    rating: 4.8,
  },
  {
    id: 'milk',
    name: 'Fresh Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Dairy',
    price: 4,
    unit: '1L',
    stock: 20,
    image: '/images/fresh-milk.png',
    rating: 4.5,
  },
  {
    id: 'meat',
    name: 'Fresh Meat',
    category: 'Meat & Fish',
    subcategory: 'Meat',
    price: 30,
    unit: 'per kg',
    stock: 10,
    image: '/images/meat.png',
    rating: 4.5,
  },
]

describe('promotion eligibility', () => {
  it('does not offer FRESH10 when fruits and vegetables total is below $20', () => {
    const items: CartItem[] = [
      {
        productId: 'apple',
        quantity: 3,
        priceAtAdd: 5,
      },
    ]

    const eligible = getEligiblePromos(items, products)

    expect(
      eligible.some((promo) => promo.code === 'FRESH10'),
    ).toBe(false)
  })

  it('offers FRESH10 when fruits and vegetables total reaches $20', () => {
    const items: CartItem[] = [
      {
        productId: 'apple',
        quantity: 4,
        priceAtAdd: 5,
      },
    ]

    const eligible = getEligiblePromos(items, products)

    expect(
      eligible.some((promo) => promo.code === 'FRESH10'),
    ).toBe(true)
  })

  it('offers DAIRY5 when the cart contains dairy', () => {
    const items: CartItem[] = [
      {
        productId: 'milk',
        quantity: 1,
        priceAtAdd: 4,
      },
    ]

    const eligible = getEligiblePromos(items, products)

    expect(
      eligible.some((promo) => promo.code === 'DAIRY5'),
    ).toBe(true)
  })

  it('offers SAVE10 when the subtotal reaches $50', () => {
    const items: CartItem[] = [
      {
        productId: 'meat',
        quantity: 2,
        priceAtAdd: 30,
      },
    ]

    const eligible = getEligiblePromos(items, products)

    expect(
      eligible.some((promo) => promo.code === 'SAVE10'),
    ).toBe(true)
  })

  it('calculates percentage discounts correctly', () => {
    const promo = promoCodes.find(
      (item) => item.code === 'FRESH10',
    )

    expect(promo).toBeDefined()

    const result = calculatePromoDiscount(promo ?? null, 40)

    expect(result.discount).toBe(4)
    expect(result.message).toBe('FRESH10 applied')
  })

  it('does not discount more than the subtotal for fixed discounts', () => {
    const promo = promoCodes.find(
      (item) => item.code === 'SAVE10',
    )

    expect(promo).toBeDefined()

    const result = calculatePromoDiscount(promo ?? null, 5)

    expect(result.discount).toBe(5)
  })
})