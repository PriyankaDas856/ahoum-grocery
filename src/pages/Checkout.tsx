import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import {
  calculatePromoDiscount,
  getEligiblePromos,
  type PromoCode,
} from '../lib/promotions'
import { useCartStore } from '../stores/cartStore'

type DeliveryMethod = {
  id: string
  name: string
  description: string
  price: number
}

const deliveryMethods: DeliveryMethod[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivered within 2–3 days',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Delivered within 24 hours',
    price: 2.99,
  },
  {
    id: 'pickup',
    name: 'Store Pickup',
    description: 'Pick up from your nearest store',
    price: 0,
  },
]

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit / Debit Card',
    icon: '💳',
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: '💵',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: '📱',
  },
]

function Checkout() {
  const navigate = useNavigate()

  const items = useCartStore((state) => state.items)
  const reconcile = useCartStore((state) => state.reconcile)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod | null>(null)

  const [paymentMethod, setPaymentMethod] =
    useState<string | null>(null)

  const [promo, setPromo] =
    useState<PromoCode | null>(null)

  const [showDeliveryMethods, setShowDeliveryMethods] =
    useState(false)

  const [showPaymentMethods, setShowPaymentMethods] =
    useState(false)

  const [showPromos, setShowPromos] =
    useState(false)

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

  const subtotal = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)

    if (!product) {
      return sum
    }

    return sum + product.price * item.quantity
  }, 0)

  const eligiblePromos = useMemo(
    () => getEligiblePromos(items, products),
    [items, products],
  )

  const promoResult = useMemo(
    () => calculatePromoDiscount(promo, subtotal),
    [promo, subtotal],
  )

  const deliveryCost =
    deliveryMethod?.price ?? 0

  const total = Math.max(
    0,
    subtotal +
      deliveryCost -
      promoResult.discount,
  )

  if (items.length === 0) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen px-4 pt-6">
        <div className="flex justify-center">
          <div className="h-6 w-24 animate-pulse rounded bg-[#F2F3F2]" />
        </div>

        <div className="mt-8 h-48 animate-pulse rounded-xl bg-[#F7F7F7]" />
      </div>
    )
  }

  const placeOrder = () => {
    if (!deliveryMethod || !paymentMethod) {
      return
    }

    navigate('/checkout/success')
  }

  return (
    <div className="relative min-h-screen bg-white px-4 pb-6 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link
          to="/cart"
          className="flex h-8 w-8 items-center text-xl text-[#181725]"
          aria-label="Back to cart"
        >
          ←
        </Link>

        <h1 className="text-lg font-semibold text-[#181725]">
          Checkout
        </h1>

        <span className="w-8" />
      </header>

      {/* Checkout options */}
      <section className="mt-7 divide-y divide-[#E2E2E2] border-y border-[#E2E2E2]">
        {/* Delivery */}
        <button
          type="button"
          onClick={() =>
            setShowDeliveryMethods(true)
          }
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-[#9B9B9B]">
              Delivery
            </p>

            <p className="mt-1 text-sm font-semibold text-[#181725]">
              {deliveryMethod?.name ??
                'Select Method'}
            </p>

            {deliveryMethod && (
              <p className="mt-1 text-[10px] text-[#7C7C7C]">
                {deliveryMethod.description}
              </p>
            )}
          </div>

          <span className="text-lg text-[#7C7C7C]">
            ›
          </span>
        </button>

        {/* Payment */}
        <button
          type="button"
          onClick={() =>
            setShowPaymentMethods(true)
          }
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-[#9B9B9B]">
              Payment
            </p>

            <p className="mt-1 text-sm font-semibold text-[#181725]">
              {paymentMethod
                ? paymentMethods.find(
                    (method) =>
                      method.id === paymentMethod,
                  )?.name
                : 'Select Payment Method'}
            </p>
          </div>

          <span className="text-lg text-[#7C7C7C]">
            ›
          </span>
        </button>

        {/* Promo */}
        <button
          type="button"
          onClick={() => setShowPromos(true)}
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <div>
            <p className="text-xs text-[#9B9B9B]">
              Promo Code
            </p>

            <p className="mt-1 text-sm font-semibold text-[#181725]">
              {promo
                ? promo.code
                : eligiblePromos.length > 0
                  ? `${eligiblePromos.length} available`
                  : 'No offers available'}
            </p>
          </div>

          <span className="text-lg text-[#7C7C7C]">
            ›
          </span>
        </button>
      </section>

      {/* Price summary */}
      <section className="mt-6 rounded-xl bg-[#F7F7F7] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#7C7C7C]">
            Subtotal
          </span>

          <span className="text-sm font-semibold text-[#181725]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-[#7C7C7C]">
            Delivery
          </span>

          <span className="text-sm font-semibold text-[#181725]">
            {deliveryCost === 0
              ? 'Free'
              : `$${deliveryCost.toFixed(2)}`}
          </span>
        </div>

        {promoResult.discount > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#53B175]">
              Discount ({promo?.code})
            </span>

            <span className="text-sm font-semibold text-[#53B175]">
              -${promoResult.discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="mt-4 border-t border-[#E2E2E2] pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#181725]">
              Total Cost
            </span>

            <span className="text-lg font-bold text-[#181725]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="mt-4 text-[10px] leading-4 text-[#9B9B9B]">
          By placing an order you agree to our Terms
          and Conditions and Privacy Policy.
        </p>
      </section>

      {/* Place order */}
      <button
        type="button"
        onClick={placeOrder}
        disabled={
          !deliveryMethod || !paymentMethod
        }
        className="mt-6 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#D9D9D9]"
      >
        {!deliveryMethod
          ? 'Select Delivery Method'
          : !paymentMethod
            ? 'Select Payment Method'
            : 'Place Order'}
      </button>

      {/* Failure state */}
      <Link
        to="/checkout/failure"
        className="mt-3 block text-center text-xs font-medium text-[#9B9B9B]"
      >
        View failure state
      </Link>

      {/* Delivery modal */}
      {showDeliveryMethods && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30">
          <div className="w-full rounded-t-3xl bg-white px-5 pb-7 pt-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#181725]">
                Select Delivery Method
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowDeliveryMethods(false)
                }
                className="text-2xl text-[#181725]"
                aria-label="Close delivery methods"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {deliveryMethods.map((method) => {
                const selected =
                  deliveryMethod?.id === method.id

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setDeliveryMethod(method)
                      setShowDeliveryMethods(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                      selected
                        ? 'border-[#53B175] bg-[#F2F8F3]'
                        : 'border-[#E2E2E2] bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#181725]">
                        {method.name}
                      </p>

                      <p className="mt-1 text-xs text-[#7C7C7C]">
                        {method.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#181725]">
                        {method.price === 0
                          ? 'Free'
                          : `$${method.price.toFixed(2)}`}
                      </span>

                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selected
                            ? 'border-[#53B175] bg-[#53B175] text-white'
                            : 'border-[#D9D9D9]'
                        }`}
                      >
                        {selected && '✓'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPaymentMethods && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30">
          <div className="w-full rounded-t-3xl bg-white px-5 pb-7 pt-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#181725]">
                Select Payment Method
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowPaymentMethods(false)
                }
                className="text-2xl text-[#181725]"
                aria-label="Close payment methods"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {paymentMethods.map((method) => {
                const selected =
                  paymentMethod === method.id

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method.id)
                      setShowPaymentMethods(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                      selected
                        ? 'border-[#53B175] bg-[#F2F8F3]'
                        : 'border-[#E2E2E2] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {method.icon}
                      </span>

                      <span className="text-sm font-semibold text-[#181725]">
                        {method.name}
                      </span>
                    </div>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? 'border-[#53B175] bg-[#53B175] text-white'
                          : 'border-[#D9D9D9]'
                      }`}
                    >
                      {selected && '✓'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Promo modal */}
      {showPromos && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30">
          <div className="w-full rounded-t-3xl bg-white px-5 pb-7 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#181725]">
                  Available Offers
                </h2>

                <p className="mt-1 text-xs text-[#7C7C7C]">
                  Offers depend on your current cart.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPromos(false)}
                className="text-2xl text-[#181725]"
                aria-label="Close promo codes"
              >
                ×
              </button>
            </div>

            {eligiblePromos.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-4xl">
                  🏷️
                </div>

                <p className="mt-4 text-sm font-semibold text-[#181725]">
                  No offers available
                </p>

                <p className="mt-2 text-xs leading-5 text-[#7C7C7C]">
                  Add qualifying products or reach a
                  minimum order value to unlock offers.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {eligiblePromos.map((availablePromo) => {
                  const selected =
                    promo?.id === availablePromo.id

                  return (
                    <button
                      key={availablePromo.id}
                      type="button"
                      onClick={() => {
                        setPromo(availablePromo)
                        setShowPromos(false)
                      }}
                      className={`w-full rounded-xl border p-4 text-left ${
                        selected
                          ? 'border-[#53B175] bg-[#F2F8F3]'
                          : 'border-[#E2E2E2] bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#181725]">
                            {availablePromo.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                            {availablePromo.description}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-[#E8F7EC] px-2 py-1 text-[10px] font-bold text-[#53B175]">
                          {availablePromo.code}
                        </span>
                      </div>
                    </button>
                  )
                })}

                {promo && (
                  <button
                    type="button"
                    onClick={() => {
                      setPromo(null)
                      setShowPromos(false)
                    }}
                    className="w-full py-2 text-center text-xs font-semibold text-red-500"
                  >
                    Remove applied promo
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout