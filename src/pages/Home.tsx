import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductCarousel from '../components/product/ProductCarousel'

const categories = [
  {
    name: 'Fruits & Vegetables',
    image: '/images/natural-red-apple.png',
    background: 'bg-[#FFF4E5]',
  },
  {
    name: 'Cooking Oil & Ghee',
    image: '/images/Cooking Oil & Ghee.png',
    background: 'bg-[#FFF8E5]',
  },
  {
    name: 'Meat & Fish',
    image: '/images/Meat & Fish.png',
    background: 'bg-[#FFEFEF]',
  },
  {
    name: 'Bakery & Snacks',
    image: '/images/biscuit.png',
    background: 'bg-[#FFF3E8]',
  },
  {
    name: 'Dairy & Eggs',
    image: '/images/fresh-milk.png',
    background: 'bg-[#F2F8FF]',
  },
  {
    name: 'Beverages',
    image: '/images/sprite-can.png',
    background: 'bg-[#F1F8F3]',
  },
]

type UserLocation = {
  city: string
  area: string
}

function getSavedLocation(): UserLocation | null {
  const savedLocation =
    localStorage.getItem('userLocation')

  if (!savedLocation) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(
      savedLocation,
    )

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'city' in parsed &&
      'area' in parsed &&
      typeof parsed.city === 'string' &&
      typeof parsed.area === 'string'
    ) {
      return {
        city: parsed.city,
        area: parsed.area,
      }
    }
  } catch {
    localStorage.removeItem('userLocation')
  }

  return null
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [userLocation] =
    useState<UserLocation | null>(() =>
      getSavedLocation(),
    )

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setProducts(data)
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
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [])

  const exclusiveProducts = products.slice(0, 6)
  const bestSellingProducts = products.slice(6, 12)

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <header className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex justify-center">
          <span className="text-2xl font-bold tracking-tight text-[#53B175] sm:text-3xl">
            nectar
          </span>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#4C4F4D]">
          <span className="text-[#53B175]">
            ⌖
          </span>

          <span>
            {userLocation
              ? `${userLocation.area}, ${userLocation.city}`
              : 'Select your location'}
          </span>
        </div>
      </header>

      {/* Search */}
      <div className="mx-auto mt-5 max-w-[900px] px-4 sm:px-6 lg:px-10">
        <Link
          to="/search"
          className="flex h-12 items-center rounded-xl bg-[#F2F3F2] px-4 text-sm text-[#7C7C7C] transition hover:bg-[#EDEEEE]"
        >
          <span className="text-base">
            ⌕
          </span>

          <span className="ml-3">
            Search Store
          </span>
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto mt-5 max-w-[1180px] px-4 sm:px-6 lg:px-10">
        <Link
          to="/category/Fruits%20%26%20Vegetables"
          className="group relative block h-[180px] overflow-hidden rounded-2xl bg-[#FFFDF8] sm:h-[220px] lg:h-[260px]"
        >
          {/* Banner background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#FFFFFF_0%,#FFF8EC_55%,#F2F8F3_100%)]" />

          {/* Left-side grocery image */}
          <div className="pointer-events-none absolute bottom-0 left-[-20px] z-10 h-[90%] w-[32%] sm:left-[-10px] sm:h-[95%] sm:w-[30%] lg:left-0 lg:h-full lg:w-[28%]">
            <img
              src="/images/fresh-fruits-&-vegetables.png"
              alt=""
              className="h-full w-full object-contain object-left-bottom"
            />
          </div>

          {/* Right-side vegetable */}
          <div className="pointer-events-none absolute bottom-0 right-[-15px] z-10 h-[65%] w-[25%] sm:right-0 sm:h-[70%] sm:w-[22%] lg:h-[75%] lg:w-[20%]">
            <img
              src="/images/bell-pepper-red.png"
              alt=""
              className="h-full w-full object-contain object-right-bottom"
            />
          </div>

          {/* Center content */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-[25px] font-bold leading-tight text-[#181725] sm:text-[34px] lg:text-[44px]">
              Fresh Vegetables
            </h1>

            <p className="mt-1 text-[18px] font-semibold text-[#53B175] sm:text-[24px] lg:text-[30px]">
              Get Up To 40% OFF
            </p>

            {/* Slider indicators */}
            <div className="mt-4 flex items-center gap-3 sm:mt-5">
              <span className="h-2.5 w-8 rounded-full bg-[#53B175]" />

              <span className="h-2.5 w-2.5 rounded-full bg-[#A7A7A7]" />

              <span className="h-2.5 w-2.5 rounded-full bg-[#A7A7A7]" />
            </div>
          </div>
        </Link>
      </section>

      {/* Exclusive Offer */}
      <section className="mt-8 lg:mt-10">
        <div className="mb-4 flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <h2 className="text-xl font-semibold text-[#181725] sm:text-2xl">
            Exclusive Offer
          </h2>

          <Link
            to="/explore"
            className="text-sm font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-3 overflow-hidden px-4 sm:px-6 lg:px-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 w-[165px] shrink-0 animate-pulse rounded-2xl bg-gray-100 sm:w-[190px]"
              />
            ))}
          </div>
        ) : exclusiveProducts.length > 0 ? (
          <ProductCarousel
            products={exclusiveProducts}
          />
        ) : (
          <div className="px-4 text-sm text-[#7C7C7C] sm:px-6 lg:px-10">
            No products available right now.
          </div>
        )}
      </section>

      {/* Best Selling */}
      <section className="mt-8 lg:mt-10">
        <div className="mb-4 flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <h2 className="text-xl font-semibold text-[#181725] sm:text-2xl">
            Best Selling
          </h2>

          <Link
            to="/explore"
            className="text-sm font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-3 overflow-hidden px-4 sm:px-6 lg:px-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 w-[165px] shrink-0 animate-pulse rounded-2xl bg-gray-100 sm:w-[190px]"
              />
            ))}
          </div>
        ) : bestSellingProducts.length > 0 ? (
          <ProductCarousel
            products={bestSellingProducts}
          />
        ) : (
          <div className="px-4 text-sm text-[#7C7C7C] sm:px-6 lg:px-10">
            No products available right now.
          </div>
        )}
      </section>

      {/* Groceries */}
      <section className="mt-8 pb-10 lg:mt-10 lg:pb-14">
        <div className="mb-4 flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <h2 className="text-xl font-semibold text-[#181725] sm:text-2xl">
            Groceries
          </h2>

          <Link
            to="/explore"
            className="text-sm font-semibold text-[#53B175]"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:gap-4 sm:px-6 lg:grid-cols-6 lg:gap-5 lg:px-10">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(
                category.name,
              )}`}
              className={`flex min-h-[150px] flex-col items-center justify-center rounded-xl p-3 text-center transition hover:-translate-y-1 hover:shadow-md sm:min-h-[175px] lg:min-h-[190px] ${category.background}`}
            >
              <div className="flex h-24 w-full items-center justify-center sm:h-28 lg:h-32">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-20 w-20 object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                />
              </div>

              <span className="mt-2 text-[11px] font-medium leading-4 text-[#181725] sm:text-xs lg:text-sm">
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