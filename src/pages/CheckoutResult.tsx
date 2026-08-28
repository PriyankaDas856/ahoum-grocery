import { Link, useParams } from 'react-router-dom'

function CheckoutResult() {
  const { result } = useParams()

  const success = result === 'success'

  if (!success) {
    return (
      <div className="min-h-[80vh] px-4 pt-8">
        <div className="flex justify-end">
          <Link
            to="/"
            className="text-2xl text-gray-500"
            aria-label="Close"
          >
            ×
          </Link>
        </div>

        <div className="mt-16 rounded-2xl bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-green-50 text-6xl">
            🛍️
          </div>

          <h1 className="mt-7 text-xl font-bold text-gray-900">
            Oops! Order Failed
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Something went terribly wrong.
          </p>

          <Link
            to="/checkout"
            className="mt-8 block rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white"
          >
            Please Try Again
          </Link>

          <Link
            to="/"
            className="mt-5 block text-xs font-medium text-gray-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[#53B175]/15">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#53B175] text-6xl text-white">
          ✓
        </div>
      </div>

      <h1 className="mt-8 text-2xl font-bold text-gray-900">
        Your Order has been
        <br />
        accepted
      </h1>

      <p className="mt-4 text-xs leading-5 text-gray-400">
        Your items has been placed and is on
        <br />
        its way to being processed
      </p>

      <Link
        to="/"
        className="mt-8 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white"
      >
        Track Order
      </Link>

      <Link
        to="/"
        className="mt-5 text-xs font-medium text-gray-700"
      >
        Back to home
      </Link>
    </div>
  )
}

export default CheckoutResult