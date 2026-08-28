import type { Product } from '../api/types'
import type { CartItem } from '../stores/cartStore'

export interface PromoCode {
  id: string
  code: string
  title: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
}

export interface PromoResult {
  eligible: boolean
  discount: number
  message: string
}

export const promoCodes: PromoCode[] = [
  {
    id: 'fresh10',
    code: 'FRESH10',
    title: 'Fresh 10% Off',
    description: '10% off Fruits & Vegetables orders over $20',
    type: 'percentage',
    value: 10,
  },
  {
    id: 'dairy5',
    code: 'DAIRY5',
    title: 'Dairy 5% Off',
    description: '5% off when you buy Dairy & Eggs',
    type: 'percentage',
    value: 5,
  },
  {
    id: 'save10',
    code: 'SAVE10',
    title: '$10 Off',
    description: '$10 off orders over $50',
    type: 'fixed',
    value: 10,
  },
  {
    id: 'meat15',
    code: 'MEAT15',
    title: 'Meat & Fish 15% Off',
    description: '15% off Meat & Fish orders over $25',
    type: 'percentage',
    value: 15,
  },
]

export function getEligiblePromos(
  items: CartItem[],
  products: Product[],
): PromoCode[] {
  const productMap = new Map(
    products.map((product) => [product.id, product]),
  )

  const subtotal = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)

    if (!product) {
      return sum
    }

    return sum + product.price * item.quantity
  }, 0)

  const fruitsVegetablesTotal = items.reduce(
    (sum, item) => {
      const product = productMap.get(item.productId)

      if (
        !product ||
        product.category !== 'Fruits & Vegetables'
      ) {
        return sum
      }

      return sum + product.price * item.quantity
    },
    0,
  )

  const meatFishTotal = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)

    if (
      !product ||
      product.category !== 'Meat & Fish'
    ) {
      return sum
    }

    return sum + product.price * item.quantity
  }, 0)

  const hasDairy = items.some((item) => {
    const product = productMap.get(item.productId)

    return product?.category === 'Dairy & Eggs'
  })

  return promoCodes.filter((promo) => {
    switch (promo.code) {
      case 'FRESH10':
        return fruitsVegetablesTotal >= 20

      case 'DAIRY5':
        return hasDairy

      case 'SAVE10':
        return subtotal >= 50

      case 'MEAT15':
        return meatFishTotal >= 25

      default:
        return false
    }
  })
}

export function calculatePromoDiscount(
  promo: PromoCode | null,
  subtotal: number,
): PromoResult {
  if (!promo) {
    return {
      eligible: false,
      discount: 0,
      message: '',
    }
  }

  const discount =
    promo.type === 'percentage'
      ? (subtotal * promo.value) / 100
      : Math.min(promo.value, subtotal)

  return {
    eligible: true,
    discount: Number(discount.toFixed(2)),
    message: `${promo.code} applied`,
  }
}