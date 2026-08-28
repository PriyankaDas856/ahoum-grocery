import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { useFavouriteStore } from '../stores/favouriteStore'

function Favourite() {
  const favourites = useFavouriteStore(
    (state) => state.items,
  )

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-6 md:mx-auto md:max-w-[1100px] md:px-8">
      {/* Header */}
      <header className="flex items-center justify-center">
        <h1 className="text-xl font-semibold text-[#181725] md:text-2xl">
          Favourite
        </h1>
      </header>

      {favourites.length === 0 ? (
        /* Empty State */
        <main className="mt-16 flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F2F8F3] text-5xl text-[#53B175]">
            ♡
          </div>

          <h2 className="mt-6 text-lg font-semibold text-[#181725]">
            Your favourites are empty
          </h2>

          <p className="mt-2 max-w-[280px] text-sm leading-5 text-[#7C7C7C]">
            Save products you love and they will appear
            here.
          </p>

          <Link
            to="/explore"
            className="mt-7 rounded-xl bg-[#53B175] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#469D68] active:scale-[0.98]"
          >
            Explore Products
          </Link>
        </main>
      ) : (
        /* Favourite Products */
        <main className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#181725]">
              Saved Products
            </h2>

            <span className="text-xs text-[#7C7C7C]">
              {favourites.length}{' '}
              {favourites.length === 1
                ? 'item'
                : 'items'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {favourites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  )
}

export default Favourite