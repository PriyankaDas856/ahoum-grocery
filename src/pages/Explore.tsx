import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductGrid from '../components/product/ProductGrid'

const categories = [
  {
    name: 'Fruits & Vegetables',
    image: '/images/natural-red-apple.png',
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
    image: '/images/sprite-can.png',
  },
]

function Explore() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then(setProducts)
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
  }, [])

  return (
    <div className="px-4 pt-5 md:px-8 md:pt-8">
      <header className="mx-auto max-w-[900px] text-center">
        <h1 className="text-lg font-semibold text-[#181725] md:text-2xl">
          Find Products
        </h1>

        <Link
          to="/search"
          className="mt-4 flex h-11 items-center rounded-xl bg-[#F2F3F2] px-4 text-left text-xs text-[#7C7C7C] transition hover:bg-[#EDEEEE] md:h-12 md:text-sm"
        >
          <span className="text-sm">⌕</span>
          <span className="ml-2">Search Store</span>
        </Link>
      </header>

      <main className="mx-auto max-w-[1100px]">
        {/* Categories */}
        <section className="mt-6 md:mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[#181725] md:text-2xl">
            Categories
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="flex h-[155px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#F8F8F8] p-3 text-center transition-transform hover:scale-[1.01] hover:border-[#53B175] hover:bg-[#F2F8F3] md:h-[200px] md:rounded-2xl"
              >
                <div className="flex h-24 w-full items-center justify-center md:h-36">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-24 w-24 object-contain md:h-32 md:w-32"
                  />
                </div>

                <span className="mt-2 text-[11px] font-medium leading-4 text-[#181725] md:text-sm">
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

            <span className="text-xs text-[#7C7C7C] md:text-sm">
              {products.length} items
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-gray-100 md:h-[310px]"
                />
              ))}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </main>
    </div>
  )
}

export default Explore