import { useNavigate } from 'react-router-dom'

function Orders() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-4 pb-10 pt-6 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-[740px]">
        {/* Header */}
        <header className="flex items-center">
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5] text-2xl text-[#181725]"
            aria-label="Go back"
          >
            ‹
          </button>

          <h1 className="text-xl font-semibold text-[#181725]">
            Orders
          </h1>
        </header>

        {/* Empty orders state */}
        <main className="mt-16 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F2F8F3] text-4xl">
            🛍
          </div>

          <h2 className="mt-6 text-lg font-semibold text-[#181725]">
            No orders yet
          </h2>

          <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#7C7C7C]">
            Your completed grocery orders will appear
            here once you place your first order.
          </p>

          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="mt-7 rounded-xl bg-[#53B175] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#47A568]"
          >
            Start Shopping
          </button>
        </main>
      </div>
    </div>
  )
}

export default Orders