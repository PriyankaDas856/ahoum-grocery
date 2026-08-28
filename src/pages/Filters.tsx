import { useState } from 'react'
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

function Filters() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentCategory =
    searchParams.get('category') ?? ''

  const [selectedSubcategories, setSelectedSubcategories] =
    useState<string[]>(
      searchParams.getAll('subcategory'),
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

    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(
          currentCategory,
        )}?${params.toString()}`,
      )
    } else {
      navigate(
        `/explore?${params.toString()}`,
      )
    }
  }

  const clearFilters = () => {
    setSelectedSubcategories([])

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

  const availableSubcategories =
    categoryOptions.find(
      (item) =>
        item.category === currentCategory,
    )?.subcategories ??
    categoryOptions.flatMap(
      (item) => item.subcategories,
    )

  return (
    <div className="min-h-screen bg-white px-4 pb-8 pt-5 md:mx-auto md:max-w-[900px] md:px-8 md:pt-8">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#F0F0F0] pb-5">
        <button
          type="button"
          onClick={closeFilters}
          className="flex h-9 w-9 items-center justify-start text-2xl text-[#181725] transition hover:text-[#53B175] focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2"
          aria-label="Close filters"
        >
          ×
        </button>

        <h1 className="text-base font-semibold text-[#181725] md:text-xl">
          Filters
        </h1>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-[#53B175] transition hover:text-[#469D68] focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2 md:text-sm"
        >
          Clear
        </button>
      </header>

      {/* Current category */}
      {currentCategory && (
        <div className="mt-6 rounded-xl bg-[#F2F8F3] px-4 py-3">
          <p className="text-[10px] uppercase tracking-wide text-[#7C7C7C]">
            Filtering
          </p>

          <p className="mt-1 text-sm font-semibold text-[#181725]">
            {currentCategory}
          </p>
        </div>
      )}

      {/* Filters */}
      <main className="mt-7">
        <section>
          <h2 className="text-base font-semibold text-[#181725] md:text-lg">
            Subcategory
          </h2>

          <p className="mt-1 text-xs text-[#7C7C7C]">
            Choose one or more options
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {availableSubcategories.map(
              (subcategory) => {
                const checked =
                  selectedSubcategories.includes(
                    subcategory,
                  )

                return (
                  <label
                    key={subcategory}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      checked
                        ? 'border-[#53B175] bg-[#F2F8F3]'
                        : 'border-[#EDEDED] bg-white hover:border-[#B9DCC5]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleSubcategory(
                          subcategory,
                        )
                      }
                      className="h-5 w-5 accent-[#53B175]"
                    />

                    <span
                      className={`text-sm ${
                        checked
                          ? 'font-semibold text-[#181725]'
                          : 'text-[#181725]'
                      }`}
                    >
                      {subcategory}
                    </span>
                  </label>
                )
              },
            )}
          </div>

          {availableSubcategories.length ===
            0 && (
            <div className="mt-6 rounded-xl bg-[#F8F8F8] p-6 text-center">
              <p className="text-sm font-medium text-[#181725]">
                No filters available
              </p>

              <p className="mt-2 text-xs text-[#7C7C7C]">
                There are no subcategories for
                this section yet.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Apply */}
      <div className="mt-10 md:sticky md:bottom-0 md:bg-white md:pb-2 md:pt-4">
        <button
          type="button"
          onClick={applyFilters}
          className="w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white transition hover:bg-[#469D68] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2"
        >
          {selectedSubcategories.length > 0
            ? `Apply Filter (${selectedSubcategories.length})`
            : 'Apply Filter'}
        </button>
      </div>
    </div>
  )
}

export default Filters