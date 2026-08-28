import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { useSearchStore } from '../stores/searchStore'

function Search() {
  const [input, setInput] = useState('')

  const query = useSearchStore((state) => state.query)
  const results = useSearchStore((state) => state.results)
  const status = useSearchStore((state) => state.status)
  const error = useSearchStore((state) => state.error)
  const search = useSearchStore((state) => state.search)
  const clear = useSearchStore((state) => state.clear)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (input.trim()) {
        void search(input)
      } else {
        clear()
      }
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [input, search, clear])

  return (
    <div className="px-4 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/"
          className="text-xl text-gray-700"
          aria-label="Back"
        >
          ←
        </Link>

        <div className="flex flex-1 items-center rounded-xl bg-gray-100 px-4">
          <span className="text-sm text-gray-400">
            🔍
          </span>

          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Search Store"
            className="h-11 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
            autoFocus
          />

          {input && (
            <button
              type="button"
              onClick={() => setInput('')}
              className="text-sm text-gray-400"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          className="text-gray-500"
          aria-label="Open filters"
        >
          ☷
        </button>
      </header>

      <div className="mt-6">
        {status === 'loading' && (
          <p className="mb-4 text-xs text-gray-400">
            Searching...
          </p>
        )}

        {status === 'error' && (
          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void search(query)}
              className="mt-2 text-xs font-semibold text-[#53B175]"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold">
                {query
                  ? `Results for "${query}"`
                  : 'Products'}
              </h1>

              <span className="text-xs text-gray-400">
                {results.length} results
              </span>
            </div>

            <ProductGrid products={results} />
          </>
        )}

        {status === 'idle' && (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold text-gray-800">
              Search for groceries
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Try eggs, bananas, beverages, or vegetables.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search