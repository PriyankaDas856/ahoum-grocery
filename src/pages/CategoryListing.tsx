import { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import ProductGrid from '../components/product/ProductGrid'

function CategoryListing() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const decodedCategory = decodeURIComponent(
    category ?? '',
  )

  useEffect(() => {
    const controller = new AbortController()

    const selectedSubcategories =
      searchParams.getAll('subcategory')

    const priceRange =
      searchParams.get('priceRange') ?? ''

    const minRatingParam =
      searchParams.get('minRating')

    const inStockOnly =
      searchParams.get('inStock') === 'true'

    const minRating = minRatingParam
      ? Number(minRatingParam)
      : null

    getProducts(controller.signal)
      .then((allProducts) => {
        if (controller.signal.aborted) {
          return
        }

        // First filter by category.
        const categoryProducts =
          allProducts.filter(
            (product) =>
              product.category ===
              decodedCategory,
          )

        // Apply all selected filters.
        const filteredProducts =
          categoryProducts.filter(
            (product) => {
              // Subcategory filter
              if (
                selectedSubcategories.length > 0 &&
                !selectedSubcategories.includes(
                  product.subcategory,
                )
              ) {
                return false
              }

              // Price filter
              if (
                priceRange === 'under100' &&
                product.price >= 100
              ) {
                return false
              }

              if (
                priceRange === '100-300' &&
                (
                  product.price < 100 ||
                  product.price > 300
                )
              ) {
                return false
              }

              if (
                priceRange === '300-500' &&
                (
                  product.price < 300 ||
                  product.price > 500
                )
              ) {
                return false
              }

              if (
                priceRange === 'above500' &&
                product.price <= 500
              ) {
                return false
              }

              // Rating filter
              if (
                minRating !== null &&
                product.rating < minRating
              ) {
                return false
              }

              // Stock filter
              if (
                inStockOnly &&
                product.stock <= 0
              ) {
                return false
              }

              return true
            },
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

    return () => {
      controller.abort()
    }
  }, [decodedCategory, searchParams])

  const filterUrl =
    `/filters?category=${encodeURIComponent(
      decodedCategory,
    )}`

  return (
    <div className="min-h-screen px-4 pt-5 md:px-8 md:pt-8">
      {/* Header */}
      <header className="mx-auto flex max-w-[1100px] items-center justify-between">
        <Link
          to="/explore"
          className="flex h-8 w-8 items-center justify-start text-xl text-[#181725] transition hover:text-[#53B175]"
          aria-label="Back to categories"
        >
          ←
        </Link>

        <h1 className="max-w-[240px] text-center text-base font-semibold text-[#181725] md:max-w-none md:text-2xl">
          {decodedCategory}
        </h1>

        <Link
          to="/search"
          className="flex h-8 w-8 items-center justify-end text-lg text-[#181725] transition hover:text-[#53B175]"
          aria-label="Search products"
        >
          ⌕
        </Link>
      </header>

      <main className="mx-auto mt-7 max-w-[1100px] md:mt-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
            ].map((item) => (
              <div
                key={item}
                className="h-[270px] animate-pulse rounded-2xl bg-[#F7F7F7] md:h-[310px]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-[#181725]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-4 rounded-xl bg-[#53B175] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#469D68]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Product count + Filter */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-[#7C7C7C] md:text-sm">
                {products.length}{' '}
                {products.length === 1
                  ? 'product'
                  : 'products'}
              </p>

              <Link
                to={filterUrl}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-[#181725] transition hover:bg-[#F2F8F3] hover:text-[#53B175] md:text-sm"
              >
                <span>Filter</span>

                <span
                  className="text-base"
                  aria-hidden="true"
                >
                  ⚙
                </span>
              </Link>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F8F3] text-2xl">
                  🛒
                </div>

                <p className="mt-5 text-sm font-semibold text-[#181725]">
                  No products found
                </p>

                <p className="mt-2 max-w-[280px] text-xs leading-5 text-[#7C7C7C]">
                  No products match your current
                  filters. Try changing or
                  clearing your filters.
                </p>

                <Link
                  to={filterUrl}
                  className="mt-5 rounded-xl bg-[#53B175] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#469D68]"
                >
                  Change Filters
                </Link>
              </div>
            ) : (
              <ProductGrid
                products={products}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default CategoryListing