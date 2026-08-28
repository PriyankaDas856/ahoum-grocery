import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductGrid from '../components/product/ProductGrid'

const categories = [
  {
    name: 'Fresh Fruits & Vegetables',
    image: '/images/fresh-fruits-&-vegetables.png',
  },
  {
    name: 'Cooking Oil & Ghee',
    image: '/images/Cooking Oil & Ghee.png',
  },
  {
    name: 'Meat & Fish',
    image: '/images/Meat & Fish.png',
  },
  {
    name: 'Bakery & Snacks',
    image: '/images/biscuit.png',
  },
  {
    name: 'Dairy & Eggs',
    image: '/images/fresh-milk.png',
  },
  {
    name: 'Beverages',
    image: '/images/beverages.png',
  },
  {
    name: 'Pulses',
    image: '/images/pulses.png',
  },
  {
    name: 'Chocolates',
    image: '/images/milk-chocolate.png',
  },
]

function Explore() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(
    (controller: AbortController) => {
      return getProducts(controller.signal)
        .then((data) => {
          if (!controller.signal.aborted) {
            setProducts(data)
            setError(null)
          }
        })
        .catch((requestError: unknown) => {
          if (
            requestError instanceof DOMException &&
            requestError.name === 'AbortError'
          ) {
            return
          }

          if (!controller.signal.aborted) {
            setProducts([])
            setError(
              'Unable to load products. Please try again.',
            )
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false)
          }
        })
    },
    [],
  )

  useEffect(() => {
    const controller = new AbortController()

    void fetchProducts(controller)

    return () => {
      controller.abort()
    }
  }, [fetchProducts])

  const handleRetry = () => {
    setLoading(true)
    setError(null)

    const controller = new AbortController()

    void fetchProducts(controller)
  }

  return (
    <div className="px-4 pt-5 md:px-8 md:pt-8">
      {/* Header */}
      <header className="mx-auto max-w-[900px] text-center">
        <h1 className="text-lg font-semibold text-[#181725] md:text-2xl">
          Find Products
        </h1>

        <Link
          to="/search"
          className="mt-4 flex h-11 items-center rounded-xl bg-[#F2F3F2] px-4 text-left text-xs text-[#7C7C7C] transition hover:bg-[#EDEEEE] md:h-12 md:text-sm"
        >
          <span className="text-sm">
            ⌕
          </span>

          <span className="ml-2">
            Search Store
          </span>
        </Link>
      </header>

      <main className="mx-auto max-w-[1100px]">
        {/* Categories */}
        <section className="mt-6 md:mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#181725] md:text-2xl">
              Categories
            </h2>

            <span className="text-xs text-[#7C7C7C] md:text-sm">
              {categories.length} categories
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${encodeURIComponent(
                  category.name,
                )}`}
                className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#F8F8F8] p-4 text-center transition hover:-translate-y-1 hover:border-[#53B175] hover:bg-[#F2F8F3] hover:shadow-sm md:min-h-[210px] md:rounded-2xl"
              >
                <div className="flex h-28 w-full items-center justify-center md:h-36">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-24 w-24 object-contain md:h-32 md:w-32"
                  />
                </div>

                <span className="mt-3 max-w-[180px] text-[11px] font-medium leading-4 text-[#181725] md:text-sm md:leading-5">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="mt-8 pb-8 md:mt-12 md:pb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#181725] md:text-2xl">
              All Products
            </h2>

            {!loading && !error && (
              <span className="text-xs text-[#7C7C7C] md:text-sm">
                {products.length} items
              </span>
            )}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div
                    key={item}
                    className="h-64 animate-pulse rounded-2xl bg-gray-100 md:h-[310px]"
                  />
                ),
              )}
            </div>
          ) : error ? (
            /* Request failure */
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-[#F8F8F8] px-6 text-center">
              <div className="text-4xl">
                ⚠️
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#181725]">
                Something went wrong
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-5 text-[#7C7C7C]">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 rounded-xl bg-[#53B175] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#469D68] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            /* Empty state */
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-[#F8F8F8] text-center">
              <div className="text-4xl">
                🛒
              </div>

              <p className="mt-4 text-sm font-semibold text-[#181725]">
                No products available
              </p>

              <p className="mt-2 text-xs text-[#7C7C7C]">
                Please check back again later.
              </p>
            </div>
          ) : (
            /* Products */
            <ProductGrid products={products} />
          )}
        </section>
      </main>
    </div>
  )
}

export default Explore