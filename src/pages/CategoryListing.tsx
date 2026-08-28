import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductGrid from '../components/product/ProductGrid'

function CategoryListing() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()

  const decodedCategory = decodeURIComponent(category ?? '')
  const selectedSubcategories =
    searchParams.getAll('subcategory')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((allProducts) => {
        const categoryProducts = allProducts.filter(
          (product) =>
            product.category === decodedCategory,
        )

        const filteredProducts =
          selectedSubcategories.length === 0
            ? categoryProducts
            : categoryProducts.filter((product) =>
                selectedSubcategories.includes(
                  product.subcategory,
                ),
              )

        setProducts(filteredProducts)
        setError(null)
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setProducts([])
        setError('Unable to load products.')
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [
    decodedCategory,
    selectedSubcategories.join('|'),
  ])

  return (
    <div className="min-h-screen px-4 pt-5 md:px-8 md:pt-8">
      {/* Header */}
      <header className="mx-auto flex max-w-[1100px] items-center justify-between">
        <Link
          to="/explore"
          className="flex h-8 w-8 items-center justify-start text-xl text-[#181725]"
          aria-label="Back to categories"
        >
          ←
        </Link>

        <h1 className="max-w-[240px] text-center text-base font-semibold text-[#181725] md:max-w-none md:text-2xl">
          {decodedCategory}
        </h1>

        <Link
          to="/search"
          className="flex h-8 w-8 items-center justify-end text-lg text-[#181725]"
          aria-label="Search products"
        >
          ⌕
        </Link>
      </header>

      {/* Products */}
      <main className="mx-auto mt-7 max-w-[1100px] md:mt-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (item) => (
                <div
                  key={item}
                  className="h-[270px] animate-pulse rounded-2xl bg-[#F7F7F7] md:h-[310px]"
                />
              ),
            )}
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-[#181725]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-[#53B175] px-6 py-3 text-xs font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Result count + filter */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-[#7C7C7C] md:text-sm">
                {products.length}{' '}
                {products.length === 1
                  ? 'product'
                  : 'products'}
              </p>

              <Link
                to={`/filters?category=${encodeURIComponent(
                  decodedCategory,
                )}`}
                className="flex items-center gap-1 text-xs font-medium text-[#181725] md:text-sm"
              >
                Filter
                <span>⚙</span>
              </Link>
            </div>

            {/* Empty state */}
            {products.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <p className="text-sm font-semibold text-[#181725]">
                  No products found
                </p>

                <p className="mt-2 text-xs text-[#7C7C7C]">
                  Try removing some filters.
                </p>

                <Link
                  to={`/filters?category=${encodeURIComponent(
                    decodedCategory,
                  )}`}
                  className="mt-5 rounded-xl bg-[#53B175] px-6 py-3 text-xs font-semibold text-white"
                >
                  Change Filters
                </Link>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default CategoryListing