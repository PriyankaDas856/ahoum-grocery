import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import { useCartStore } from '../stores/cartStore'

function Cart() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity,
  )
  const removeItem = useCartStore(
    (state) => state.removeItem,
  )
  const reconcile = useCartStore(
    (state) => state.reconcile,
  )

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((catalogue) => {
        setProducts(catalogue)
        reconcile(catalogue)
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setProducts([])
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reconcile])

  const productMap = useMemo(
    () =>
      new Map(
        products.map((product) => [
          product.id,
          product,
        ]),
      ),
    [products],
  )

  const cartProducts = items.flatMap((item) => {
    const product = productMap.get(item.productId)

    return product ? [{ item, product }] : []
  })

  const total = cartProducts.reduce(
    (sum, { item, product }) =>
      sum + product.price * item.quantity,
    0,
  )

  if (loading) {
    return (
      <div className="min-h-screen px-4 pt-6">
        <div className="flex justify-center">
          <div className="h-6 w-24 animate-pulse rounded bg-[#F2F3F2]" />
        </div>

        <div className="mt-8 space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-xl bg-[#F7F7F7]"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 pb-6 pt-5">
      {/* Header */}
      <header className="flex items-center justify-center">
        <h1 className="text-lg font-semibold text-[#181725]">
          My Cart
        </h1>
      </header>

      {cartProducts.length === 0 ? (
        <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F2F8F3] text-4xl">
            🛒
          </div>

          <h2 className="mt-5 text-lg font-semibold text-[#181725]">
            Your cart is empty
          </h2>

          <p className="mt-2 max-w-[240px] text-xs leading-5 text-[#7C7C7C]">
            Add some fresh groceries to your cart and they
            will appear here.
          </p>

          <Link
            to="/"
            className="mt-6 rounded-xl bg-[#53B175] px-8 py-3 text-sm font-semibold text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <section className="mt-6 divide-y divide-[#E2E2E2] border-y border-[#E2E2E2]">
            {cartProducts.map(({ item, product }) => (
              <article
                key={product.id}
                className="flex gap-3 py-5"
              >
                {/* Product image */}
                <Link
                  to={`/product/${product.id}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F7F7F7] p-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </Link>

                {/* Product information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="block truncate text-sm font-semibold text-[#181725]"
                      >
                        {product.name}
                      </Link>

                      <p className="mt-1 text-xs text-[#7C7C7C]">
                        {product.unit}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(product.id)
                      }
                      className="shrink-0 text-xl leading-none text-[#B3B3B3]"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            item.quantity - 1,
                            product.stock,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E2E2] text-lg text-[#7C7C7C]"
                        aria-label={`Decrease ${product.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center text-sm font-semibold text-[#181725]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            item.quantity + 1,
                            product.stock,
                          )
                        }
                        disabled={
                          item.quantity >= product.stock
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#53B175] text-lg text-[#53B175] disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Increase ${product.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold text-[#181725]">
                      $
                      {(
                        product.price * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Checkout summary */}
          <section className="mt-6 rounded-xl bg-[#F7F7F7] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7C7C7C]">
                Subtotal
              </span>

              <span className="text-sm font-semibold text-[#181725]">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-[#7C7C7C]">
                Delivery
              </span>

              <span className="text-sm font-semibold text-[#181725]">
                $0.00
              </span>
            </div>

            <div className="mt-4 border-t border-[#E2E2E2] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[#181725]">
                  Total Cost
                </span>

                <span className="text-base font-bold text-[#181725]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Checkout button */}
          <Link
            to="/checkout"
            className="mt-5 flex h-14 items-center justify-center rounded-xl bg-[#53B175] text-sm font-semibold text-white transition active:scale-[0.98]"
          >
            Go to Checkout
          </Link>
        </>
      )}
    </div>
  )
}

export default Cart