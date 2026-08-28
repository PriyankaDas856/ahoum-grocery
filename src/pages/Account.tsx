import { Link } from 'react-router-dom'

function Account() {
  return (
    <div className="min-h-screen px-4 pb-10 pt-6">
      <header className="text-center">
        <h1 className="text-xl font-semibold text-[#181725]">
          Account
        </h1>
      </header>

      <main className="mt-8">
        {/* Profile */}
        <div className="flex items-center rounded-2xl bg-[#F2F8F3] p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#53B175] text-2xl text-white">
            ♙
          </div>

          <div className="ml-4">
            <p className="text-base font-semibold text-[#181725]">
              My Account
            </p>

            <p className="mt-1 text-xs text-[#7C7C7C]">
              Manage your account and orders
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
          <Link
            to="/cart"
            className="flex items-center justify-between border-b border-[#EEEEEE] px-4 py-4"
          >
            <span className="text-sm text-[#181725]">
              My Orders
            </span>

            <span className="text-[#7C7C7C]">
              ›
            </span>
          </Link>

          <Link
            to="/favourites"
            className="flex items-center justify-between border-b border-[#EEEEEE] px-4 py-4"
          >
            <span className="text-sm text-[#181725]">
              Favourite
            </span>

            <span className="text-[#7C7C7C]">
              ›
            </span>
          </Link>

          <Link
            to="/explore"
            className="flex items-center justify-between border-b border-[#EEEEEE] px-4 py-4"
          >
            <span className="text-sm text-[#181725]">
              Browse Products
            </span>

            <span className="text-[#7C7C7C]">
              ›
            </span>
          </Link>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('userLocation')
              window.location.href = '/welcome'
            }}
            className="flex w-full items-center justify-between px-4 py-4 text-left"
          >
            <span className="text-sm text-red-500">
              Log Out
            </span>

            <span className="text-red-400">
              ›
            </span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default Account