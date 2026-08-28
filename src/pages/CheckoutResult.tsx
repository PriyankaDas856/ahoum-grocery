import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'

function CheckoutResult() {
  const { result } = useParams()
  const clearCart = useCartStore((state) => state.clearCart)

  const isSuccess = result === 'success'

  useEffect(() => {
    if (isSuccess) {
      clearCart()
    }
  }, [isSuccess, clearCart])

  if (!isSuccess) {
    return (
      <div className="relative min-h-screen bg-white">
        {/* Dimmed background */}
        <div className="px-4 pt-5 opacity-40">
          <header className="flex items-center justify-between">
            <Link
              to="/cart"
              className="text-xl text-[#181725]"
              aria-label="Back"
            >
              ←
            </Link>

            <h1 className="text-lg font-semibold text-[#181725]">
              My Cart
            </h1>

            <span className="w-5" />
          </header>

          <div className="mt-8 h-32 rounded-xl bg-[#F7F7F7]" />
          <div className="mt-4 h-32 rounded-xl bg-[#F7F7F7]" />
        </div>

        {/* Error modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-[340px] rounded-2xl bg-white px-5 pb-6 pt-5 shadow-xl">
            {/* Close */}
            <div className="flex justify-start">
              <Link
                to="/"
                className="text-2xl leading-none text-[#181725]"
                aria-label="Close"
              >
                ×
              </Link>
            </div>

            {/* Illustration */}
            <div className="mt-3 flex justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#E8F7EC]">
                <div className="text-6xl">
                  🛍️
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <h1 className="text-xl font-bold text-[#181725]">
                Oops! Order Failed
              </h1>

              <p className="mt-3 text-xs text-[#7C7C7C]">
                Something went terribly wrong.
              </p>
            </div>

            <Link
              to="/checkout"
              className="mt-7 block rounded-xl bg-[#53B175] py-4 text-center text-sm font-semibold text-white"
            >
              Please Try Again
            </Link>

            <Link
              to="/"
              className="mt-4 block text-center text-sm font-medium text-[#181725]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-5">
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center">
        {/* Success illustration */}
        <div className="relative flex h-52 w-52 items-center justify-center">
          {/* Confetti */}
          <span className="absolute left-3 top-12 text-2xl text-[#53B175]">
            •
          </span>

          <span className="absolute right-2 top-16 text-3xl text-[#FF6B6B]">
            ╯
          </span>

          <span className="absolute bottom-10 left-8 text-2xl text-[#53B175]">
            ○
          </span>

          <span className="absolute bottom-8 right-10 text-xl text-[#FFB800]">
            ○
          </span>

          <span className="absolute bottom-20 right-1 text-xl text-[#6C63FF]">
            ○
          </span>

          <span className="absolute left-12 top-5 text-lg text-[#FFB800]">
            ○
          </span>

          {/* Check circle */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-[#53B175] bg-[#53B175]/10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#53B175]">
              <span className="text-5xl font-bold text-white">
                ✓
              </span>
            </div>
          </div>
        </div>

        <h1 className="-mt-2 text-2xl font-bold text-[#181725]">
          Your Order has been
          <br />
          accepted
        </h1>

        <p className="mt-4 max-w-[280px] text-xs leading-5 text-[#7C7C7C]">
          Your items have been placed and is on
          <br />
          its way to being processed
        </p>

        <Link
          to="/"
          className="mt-8 w-full max-w-[330px] rounded-xl bg-[#53B175] py-4 text-center text-sm font-semibold text-white"
        >
          Back to Home
        </Link>

        <Link
          to="/"
          className="mt-4 text-sm font-medium text-[#181725]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default CheckoutResult