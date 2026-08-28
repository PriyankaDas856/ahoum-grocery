import type { Product } from '../api/types'
import type { CartItem } from '../stores/cartStore'

export interface ReconciliationResult {
  items: CartItem[]
  removedProductIds: string[]
  priceUpdatedProductIds: string[]
  quantityAdjustedProductIds: string[]
}

export function reconcileCart(
  cartItems: CartItem[],
  products: Product[],
): ReconciliationResult {
  const productMap = new Map(
    products.map((product) => [product.id, product]),
  )

  const removedProductIds: string[] = []
  const priceUpdatedProductIds: string[] = []
  const quantityAdjustedProductIds: string[] = []

  const items = cartItems.flatMap((item) => {
    const product = productMap.get(item.productId)

    if (!product) {
      removedProductIds.push(item.productId)
      return []
    }

    const quantity = Math.min(item.quantity, product.stock)

    if (quantity !== item.quantity) {
      quantityAdjustedProductIds.push(item.productId)
    }

    if (item.priceAtAdd !== product.price) {
      priceUpdatedProductIds.push(item.productId)
    }

    if (quantity <= 0) {
      removedProductIds.push(item.productId)
      return []
    }

    return [
      {
        ...item,
        quantity,
        priceAtAdd: product.price,
      },
    ]
  })

  return {
    items,
    removedProductIds,
    priceUpdatedProductIds,
    quantityAdjustedProductIds,
  }
}