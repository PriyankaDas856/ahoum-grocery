import type { Product } from '../../api/types'
import { useCartStore } from '../../stores/cartStore'

interface QuantityControlProps {
  product: Product
}

function QuantityControl({ product }: QuantityControlProps) {
  const item = useCartStore((state) =>
    state.items.find((cartItem) => cartItem.productId === product.id),
  )
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const quantity = item?.quantity ?? 0

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() =>
          updateQuantity(product.id, quantity - 1)
        }
        disabled={quantity === 0}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-500 disabled:opacity-30"
        aria-label={`Decrease ${product.name} quantity`}
      >
        −
      </button>

      <span className="min-w-5 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() =>
          updateQuantity(product.id, quantity + 1)
        }
        disabled={quantity >= product.stock}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#53B175] text-xl text-[#53B175] disabled:opacity-30"
        aria-label={`Increase ${product.name} quantity`}
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl