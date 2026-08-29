import { useMemo, useState } from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

const categoryOptions = [
  {
    category: 'Fresh Fruits & Vegetables',
    subcategories: [
      'Fruits',
      'Vegetables',
    ],
  },
  {
    category: 'Cooking Oil & Ghee',
    subcategories: [
      'Ghee',
      'Cooking Oil',
    ],
  },
  {
    category: 'Meat & Fish',
    subcategories: [
      'Meat',
      'Fish',
    ],
  },
  {
    category: 'Bakery & Snacks',
    subcategories: [
      'Biscuits',
      'Cookies',
      'Noodles',
      'Pasta',
      'Instant Noodles',
      'Spreads & Sauces',
    ],
  },
  {
    category: 'Dairy & Eggs',
    subcategories: [
      'Eggs',
      'Milk',
    ],
  },
  {
    category: 'Beverages',
    subcategories: [
      'Juice',
      'Soft Drinks',
    ],
  },
  {
    category: 'Pulses',
    subcategories: [
      'Chickpeas',
      'Green Gram',
      'Kidney Beans',
      'Seeds & Pulses',
    ],
  },
  {
    category: 'Chocolates',
    subcategories: [
      'Chocolate Bars',
      'Dark Chocolate',
      'White Chocolate',
      'Chocolate Candies',
      'Chocolate Gifts',
    ],
  },
]

const priceOptions = [
  {
    label: 'Under $100',
    value: 'under100',
  },
  {
    label: '$100 – $300',
    value: '100-300',
  },
  {
    label: '$300 – $500',
    value: '300-500',
  },
  {
    label: 'Above $500',
    value: 'above500',
  },
]

const ratingOptions = [
  {
    label: '4★ & above',
    value: '4',
  },
  {
    label: '4.5★ & above',
    value: '4.5',
  },
  {
    label: '4.8★ & above',
    value: '4.8',
  },
]

function Filters() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentCategory =
    searchParams.get('category') ?? ''

  const initialSubcategories = useMemo(
    () => searchParams.getAll('subcategory'),
    [searchParams],
  )

  const [selectedSubcategories, setSelectedSubcategories] =
    useState<string[]>(
      initialSubcategories,
    )

  const [priceRange, setPriceRange] =
    useState(
      searchParams.get('priceRange') ?? '',
    )

  const [minRating, setMinRating] =
    useState(
      searchParams.get('minRating') ?? '',
    )

  const [inStockOnly, setInStockOnly] =
    useState(
      searchParams.get('inStock') === 'true',
    )

  const availableSubcategories =
    categoryOptions.find(
      (item) =>
        item.category === currentCategory,
    )?.subcategories ??
    categoryOptions.flatMap(
      (item) => item.subcategories,
    )

  const toggleSubcategory = (
    value: string,
  ) => {
    setSelectedSubcategories((current) =>
      current.includes(value)
        ? current.filter(
            (item) => item !== value,
          )
        : [...current, value],
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (currentCategory) {
      params.set(
        'category',
        currentCategory,
      )
    }

    selectedSubcategories.forEach(
      (subcategory) => {
        params.append(
          'subcategory',
          subcategory,
        )
      },
    )

    if (priceRange) {
      params.set(
        'priceRange',
        priceRange,
      )
    }

    if (minRating) {
      params.set(
        'minRating',
        minRating,
      )
    }

    if (inStockOnly) {
      params.set(
        'inStock',
        'true',
      )
    }

    const queryString =
      params.toString()

    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(
          currentCategory,
        )}${
          queryString
            ? `?${queryString}`
            : ''
        }`,
      )
    } else {
      navigate(
        `/explore${
          queryString
            ? `?${queryString}`
            : ''
        }`,
      )
    }
  }

  const clearFilters = () => {
    setSelectedSubcategories([])
    setPriceRange('')
    setMinRating('')
    setInStockOnly(false)

    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(
          currentCategory,
        )}`,
      )
    } else {
      navigate('/explore')
    }
  }

  const closeFilters = () => {
    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(
          currentCategory,
        )}`,
      )
    } else {
      navigate('/explore')
    }
  }

  const activeFilterCount =
    selectedSubcategories.length +
    (priceRange ? 1 : 0) +
    (minRating ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  const selectedPriceLabel =
    priceOptions.find(
      (option) =>
        option.value === priceRange,
    )?.label

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#EEEEEE] bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-8">
          <button
            type="button"
            onClick={closeFilters}
            className="flex h-9 w-9 items-center justify-start text-2xl text-[#181725] transition hover:text-[#53B175]"
            aria-label="Close filters"
          >
            ←
          </button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#181725]">
              Filters
            </h1>

            {currentCategory && (
              <p className="mt-1 text-xs text-[#7C7C7C]">
                {currentCategory}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-[#53B175] transition hover:text-[#469D68] md:text-sm"
          >
            Clear all
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[1200px] px-5 py-7 md:px-8 md:py-9">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-5">
              <h2 className="text-lg font-bold text-[#181725]">
                Filters
              </h2>

              {activeFilterCount > 0 && (
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#E8F5EC] px-2 text-xs font-semibold text-[#53B175]">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {/* Subcategories */}
            <section className="border-b border-[#EEEEEE] py-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7C7C7C]">
                Subcategory
              </h3>

              <div className="mt-4 space-y-3">
                {availableSubcategories.map(
                  (subcategory) => {
                    const checked =
                      selectedSubcategories.includes(
                        subcategory,
                      )

                    return (
                      <label
                        key={subcategory}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleSubcategory(
                              subcategory,
                            )
                          }
                          className="h-5 w-5 rounded accent-[#53B175]"
                        />

                        <span
                          className={`text-sm ${
                            checked
                              ? 'font-semibold text-[#181725]'
                              : 'text-[#404040]'
                          }`}
                        >
                          {subcategory}
                        </span>
                      </label>
                    )
                  },
                )}
              </div>
            </section>

            {/* Price */}
            <section className="border-b border-[#EEEEEE] py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7C7C7C]">
                  Price
                </h3>

                <span className="text-sm font-semibold text-[#53B175]">
                  {selectedPriceLabel ??
                    'Any'}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {priceOptions.map(
                  (option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={
                          priceRange ===
                          option.value
                        }
                        onChange={() =>
                          setPriceRange(
                            option.value,
                          )
                        }
                        className="h-4 w-4 accent-[#53B175]"
                      />

                      <span className="text-sm text-[#404040]">
                        {option.label}
                      </span>
                    </label>
                  ),
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPriceRange('')
                  }
                  className={`text-xs font-medium ${
                    !priceRange
                      ? 'text-[#53B175]'
                      : 'text-[#7C7C7C]'
                  }`}
                >
                  Any price
                </button>
              </div>
            </section>

            {/* Rating */}
            <section className="border-b border-[#EEEEEE] py-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7C7C7C]">
                Minimum Rating
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setMinRating('')
                  }
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    !minRating
                      ? 'border-[#53B175] bg-[#F2F8F3] text-[#53B175]'
                      : 'border-[#E5E5E5] text-[#404040]'
                  }`}
                >
                  All
                </button>

                {ratingOptions.map(
                  (option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setMinRating(
                          option.value,
                        )
                      }
                      className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                        minRating ===
                        option.value
                          ? 'border-[#53B175] bg-[#F2F8F3] text-[#53B175]'
                          : 'border-[#E5E5E5] text-[#404040]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ),
                )}
              </div>
            </section>

            {/* Stock */}
            <section className="py-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) =>
                    setInStockOnly(
                      event.target.checked,
                    )
                  }
                  className="h-5 w-5 rounded accent-[#53B175]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#181725]">
                    In Stock Only
                  </p>

                  <p className="mt-1 text-xs text-[#7C7C7C]">
                    Hide unavailable products
                  </p>
                </div>
              </label>
            </section>

            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded-xl border border-[#53B175] py-3 text-sm font-semibold text-[#53B175] transition hover:bg-[#F2F8F3]"
            >
              Reset Filters
            </button>
          </aside>

          {/* Summary */}
          <section className="flex flex-col">
            <div className="rounded-2xl bg-[#F8FAF8] p-6">
              <p className="text-xs uppercase tracking-wide text-[#7C7C7C]">
                {currentCategory
                  ? 'Current category'
                  : 'All groceries'}
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#181725]">
                {currentCategory ||
                  'Explore Groceries'}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#7C7C7C]">
                Refine the products shown by
                subcategory, price, rating,
                and availability.
              </p>
            </div>

            {/* Selected filters */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#181725]">
                Selected filters
              </h3>

              {activeFilterCount === 0 ? (
                <p className="mt-3 text-sm text-[#9B9B9B]">
                  No filters selected.
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSubcategories.map(
                    (subcategory) => (
                      <span
                        key={subcategory}
                        className="rounded-full bg-[#E8F5EC] px-3 py-2 text-xs font-medium text-[#53B175]"
                      >
                        {subcategory}
                      </span>
                    ),
                  )}

                  {selectedPriceLabel && (
                    <span className="rounded-full bg-[#E8F5EC] px-3 py-2 text-xs font-medium text-[#53B175]">
                      {selectedPriceLabel}
                    </span>
                  )}

                  {minRating && (
                    <span className="rounded-full bg-[#E8F5EC] px-3 py-2 text-xs font-medium text-[#53B175]">
                      {minRating}★ & above
                    </span>
                  )}

                  {inStockOnly && (
                    <span className="rounded-full bg-[#E8F5EC] px-3 py-2 text-xs font-medium text-[#53B175]">
                      In stock
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Apply */}
            <div className="mt-auto pt-10">
              <button
                type="button"
                onClick={applyFilters}
                className="w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#469D68] active:scale-[0.98]"
              >
                {activeFilterCount > 0
                  ? `Apply Filters (${activeFilterCount})`
                  : 'Apply Filters'}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Filters