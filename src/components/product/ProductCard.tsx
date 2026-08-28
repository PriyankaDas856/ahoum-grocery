import { Link } from 'react-router-dom'
import type { Product } from '../../api/types'
import { useCartStore } from '../../stores/cartStore'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity,
  )

  const quantity = useCartStore(
    (state) =>
      state.items.find(
        (item) => item.productId === product.id,
      )?.quantity ?? 0,
  )

  const handleAdd = () => {
    if (quantity < product.stock) {
      addItem(product)
    }
  }

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1)
  }

  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1)
    }
  }

  return (
    <article className="flex min-h-[250px] flex-col rounded-xl border border-[#E2E2E2] bg-white p-3 transition hover:shadow-md md:min-h-[310px] md:rounded-2xl md:p-4">
      <Link
        to={`/product/${product.id}`}
        className="flex h-[120px] items-center justify-center md:h-[170px]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col md:mt-4">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#181725] md:text-base md:leading-6"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs text-[#7C7C7C] md:text-sm">
          {product.unit}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="text-base font-semibold text-[#181725] md:text-lg">
            ${product.price.toFixed(2)}
          </p>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#53B175] text-xl font-medium text-white transition hover:bg-[#469D68] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#D9D9D9] md:h-10 md:w-10"
              aria-label={`Add ${product.name} to cart`}
            >
              +
            </button>
          ) : (
            <div className="flex h-9 items-center overflow-hidden rounded-xl bg-[#53B175] text-white md:h-10">
              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-9 w-9 items-center justify-center text-lg font-medium transition hover:bg-[#469D68] active:scale-95 md:h-10 md:w-10"
                aria-label={`Remove one ${product.name}`}
              >
                −
              </button>

              <span
                className="min-w-7 text-center text-sm font-semibold md:min-w-8"
                aria-label={`${quantity} in cart`}
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
                className="flex h-9 w-9 items-center justify-center text-lg font-medium transition hover:bg-[#469D68] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10"
                aria-label={`Add one more ${product.name}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard