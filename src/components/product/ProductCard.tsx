import { Link } from 'react-router-dom'
import type { Product } from '../../api/types'
import { useCartStore } from '../../stores/cartStore'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="min-w-0 rounded-2xl border border-[#E2E2E2] bg-white p-3">
      <Link
        to={`/product/${product.id}`}
        className="block"
      >
        <div className="flex aspect-square items-center justify-center rounded-xl bg-[#F8F8F8] p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="mt-3">
        <Link
          to={`/product/${product.id}`}
          className="block min-h-10 text-sm font-semibold leading-5 text-[#181725]"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs text-[#7C7C7C]">
          {product.unit}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-base font-semibold text-[#181725]">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#53B175] text-xl font-medium text-white transition hover:bg-[#469d66] disabled:opacity-40"
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