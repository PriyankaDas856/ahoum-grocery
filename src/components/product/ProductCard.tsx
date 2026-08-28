import { Link } from 'react-router-dom'
import type { Product } from '../../api/types'
import { useCartStore } from '../../stores/cartStore'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="min-w-0">
      <Link to={`/product/${product.id}`}>
        <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-50 p-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="mt-2">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-semibold text-gray-900"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs text-gray-400">
          {product.unit}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#53B175] text-lg font-medium text-white disabled:opacity-40"
            aria-label={`Add ${product.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard