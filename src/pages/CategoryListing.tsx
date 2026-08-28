import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductGrid from '../components/product/ProductGrid'

function CategoryListing() {
  const { category } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const decodedCategory = decodeURIComponent(category ?? '')

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((allProducts) => {
        const filtered = allProducts.filter(
          (product) => product.category === decodedCategory,
        )

        setProducts(filtered)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [decodedCategory])

  return (
    <div className="px-4 pt-5">
      <header className="flex items-center justify-between">
        <Link
          to="/explore"
          className="text-lg text-gray-700"
          aria-label="Back"
        >
          ←
        </Link>

        <h1 className="text-base font-semibold text-gray-900">
          {decodedCategory}
        </h1>

        <Link
          to="/search"
          className="text-gray-700"
          aria-label="Search"
        >
          🔍
        </Link>
      </header>

      <div className="mt-6">
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
      </div>
    </div>
  )
}

export default CategoryListing