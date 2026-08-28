import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductCard from '../components/product/ProductCard'

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

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then(setProducts)
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const exclusiveProducts = products.slice(0, 4)
  const bestSellingProducts = products.slice(2, 6)

  return (
    <div className="px-4 pt-5">
      <header>
        <div className="text-center">
          <span className="text-2xl font-bold tracking-tight text-[#53B175]">
            nectar
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-gray-700"
          >
            📍 Dhaka, Banassre
          </button>

          <Link
            to="/search"
            className="text-gray-700"
            aria-label="Search"
          >
            🔍
          </Link>
        </div>
      </header>

      <Link
        to="/category/Fruits & Vegetables"
        className="mt-5 block overflow-hidden rounded-xl bg-[#eef8f2]"
      >
        <div className="p-4">
          <p className="text-xs font-medium text-[#53B175]">
            Fresh groceries
          </p>
          <h1 className="mt-1 text-xl font-bold text-gray-900">
            Fresh vegetables
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Get fresh products delivered to your door.
          </p>
        </div>
      </Link>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Exclusive Offer
          </h2>

          <Link
            to="/category/Fruits & Vegetables"
            className="text-xs font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {exclusiveProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Best Selling
          </h2>

          <Link
            to="/explore"
            className="text-xs font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {bestSellingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Groceries
          </h2>

          <Link
            to="/explore"
            className="text-xs font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="flex h-24 items-center gap-3 rounded-xl bg-gray-50 p-3"
            >
              <img
                src={category.image}
                alt=""
                className="h-16 w-16 object-contain"
              />

              <span className="text-xs font-semibold text-gray-800">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home