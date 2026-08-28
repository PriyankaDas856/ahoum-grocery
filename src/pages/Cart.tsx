import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import { useCartStore } from '../stores/cartStore'

function Cart() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const reconcile = useCartStore((state) => state.reconcile)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((catalogue) => {
        setProducts(catalogue)
        reconcile(catalogue)
      })
      .catch(() => {
        setProducts([])
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [reconcile])

  const productMap = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
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
      <div className="px-4 pt-6">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-100" />
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5">
      <header className="flex items-center justify-center">
        <h1 className="text-lg font-semibold text-gray-900">
          My Cart
        </h1>
      </header>

      {cartProducts.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="text-5xl">🛒</div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-xs text-gray-400">
            Add some fresh groceries to get started.
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
          <section className="mt-6 divide-y divide-gray-100 border-y border-gray-100">
            {cartProducts.map(({ item, product }) => (
              <article
                key={product.id}
                className="flex gap-3 py-4"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-semibold text-gray-900"
                    >
                      {product.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-lg text-gray-300"
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {product.unit}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            item.quantity - 1,
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500"
                      >
                        −
                      </button>

                      <span className="text-xs font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            item.quantity + 1,
                          )
                        }
                        disabled={
                          item.quantity >= product.stock
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#53B175] text-[#53B175] disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-semibold">
                      $
                      {(product.price * item.quantity).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="font-semibold">
                $0.00
              </span>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Total Cost
                </span>

                <span className="font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 block rounded-xl bg-[#53B175] py-4 text-center text-sm font-semibold text-white"
          >
            Go to Checkout
          </Link>
        </>
      )}
    </div>
  )
}

export default Cart