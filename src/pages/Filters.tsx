import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const categoryOptions = [
  'Fruits',
  'Vegetables',
  'Ghee',
  'Cooking Oil',
  'Meat',
  'Fish',
  'Biscuits',
  'Cookies',
  'Noodles',
  'Instant Noodles',
  'Eggs',
  'Milk',
  'Juice',
  'Soft Drinks',
]

function Filters() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentCategory = searchParams.get('category') ?? ''

  const [selectedSubcategories, setSelectedSubcategories] = useState<
    string[]
  >(searchParams.getAll('subcategory'))

  const toggleSubcategory = (value: string) => {
    setSelectedSubcategories((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (currentCategory) {
      params.set('category', currentCategory)
    }

    selectedSubcategories.forEach((subcategory) => {
      params.append('subcategory', subcategory)
    })

    navigate(
      `/category/${encodeURIComponent(currentCategory)}?${params.toString()}`,
    )
  }

  const clearFilters = () => {
    setSelectedSubcategories([])

    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(currentCategory)}`,
      )
    } else {
      navigate('/explore')
    }
  }

  const closeFilters = () => {
    if (currentCategory) {
      navigate(
        `/category/${encodeURIComponent(currentCategory)}`,
      )
    } else {
      navigate('/explore')
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={closeFilters}
          className="flex h-8 w-8 items-center text-2xl text-[#181725]"
          aria-label="Close filters"
        >
          ×
        </button>

        <h1 className="text-base font-semibold text-[#181725]">
          Filters
        </h1>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-[#53B175]"
        >
          Clear
        </button>
      </header>

      {/* Filters */}
      <main className="mt-8">
        <section>
          <h2 className="text-base font-semibold text-[#181725]">
            Category
          </h2>

          <div className="mt-5 space-y-4">
            {categoryOptions.map((subcategory) => {
              const checked =
                selectedSubcategories.includes(subcategory)

              return (
                <label
                  key={subcategory}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubcategory(subcategory)}
                    className="h-5 w-5 accent-[#53B175]"
                  />

                  <span className="text-sm text-[#181725]">
                    {subcategory}
                  </span>
                </label>
              )
            })}
          </div>
        </section>
      </main>

      {/* Apply */}
      <button
        type="button"
        onClick={applyFilters}
        className="mt-10 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white transition active:scale-[0.98]"
      >
        Apply Filter
      </button>
    </div>
  )
}

export default Filters