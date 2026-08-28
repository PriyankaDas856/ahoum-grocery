import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import { useCartStore } from '../stores/cartStore'

function Checkout() {
  const navigate = useNavigate()

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const reconcile = useCartStore((state) => state.reconcile)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  const total = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)

    if (!product) {
      return sum
    }

    return sum + product.price * item.quantity
  }, 0)

  if (items.length === 0) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="px-4 pt-6">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-100" />
        <div className="mt-8 h-48 animate-pulse rounded-xl bg-gray-100" />
      </div>
    )
  }

  const placeOrder = () => {
    clearCart()
    navigate('/checkout/success')
  }

  return (
    <div className="px-4 pt-5">
      <header className="flex items-center justify-between">
        <Link
          to="/cart"
          className="text-xl text-gray-700"
          aria-label="Back to cart"
        >
          ←
        </Link>

        <h1 className="text-lg font-semibold text-gray-900">
          Checkout
        </h1>

        <span className="w-5" />
      </header>

      <section className="mt-7 divide-y divide-gray-100 border-y border-gray-100">
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-gray-400">Delivery</p>
            <p className="mt-1 text-sm font-semibold">
              Select Method
            </p>
          </div>

          <span className="text-gray-400">›</span>
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-gray-400">Payment</p>
            <p className="mt-1 text-sm font-semibold">
              💳 Card
            </p>
          </div>

          <span className="text-gray-400">›</span>
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-gray-400">
              Promo Code
            </p>
            <p className="mt-1 text-sm font-semibold">
              Pick discount
            </p>
          </div>

          <span className="text-gray-400">›</span>
        </button>
      </section>

      <section className="mt-6 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Total Cost
          </span>

          <span className="text-lg font-bold">
            ${total.toFixed(2)}
          </span>
        </div>

        <p className="mt-4 text-[10px] leading-4 text-gray-400">
          By placing an order you agree to our Terms and
          Conditions and Privacy Policy.
        </p>
      </section>

      <button
        type="button"
        onClick={placeOrder}
        className="mt-6 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white"
      >
        Place Order
      </button>

      <Link
        to="/checkout/failure"
        className="mt-3 block text-center text-xs font-medium text-gray-400"
      >
        View failure state
      </Link>
    </div>
  )
}

export default Checkout