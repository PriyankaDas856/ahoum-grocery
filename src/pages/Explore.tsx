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
    image: '/images/organic-bananas.png',
  },
  {
    name: 'Meat & Fish',
    image: '/images/bell-pepper-red.png',
  },
  {
    name: 'Bakery & Snacks',
    image: '/images/egg-noodles.png',
  },
  {
    name: 'Dairy & Eggs',
    image: '/images/egg-chicken-red.png',
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
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <div className="px-4 pt-5">
      <header className="text-center">
        <h1 className="text-lg font-semibold text-gray-900">
          Find Products
        </h1>

        <Link
          to="/search"
          className="mt-4 flex h-11 items-center rounded-xl bg-gray-100 px-4 text-left text-xs text-gray-400"
        >
          🔍&nbsp;&nbsp; Search Store
        </Link>
      </header>

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">
          Categories
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-4 text-center"
            >
              <img
                src={category.image}
                alt=""
                className="h-20 w-20 object-contain"
              />

              <span className="mt-3 text-xs font-semibold text-gray-800">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">
          All Products
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  )
}

export default Explore