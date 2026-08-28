import { create } from 'zustand'
import { searchProducts } from '../api/products'
import type { Product } from '../api/types'

type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

interface SearchState {
  query: string
  results: Product[]
  status: SearchStatus
  error: string | null
  search: (query: string) => Promise<void>
  clear: () => void
}

let latestRequestId = 0
let activeController: AbortController | null = null

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  status: 'idle',
  error: null,

  search: async (query: string) => {
    const normalizedQuery = query.trim()
    const requestId = ++latestRequestId

    activeController?.abort()

    const controller = new AbortController()
    activeController = controller

    set({
      query: normalizedQuery,
      status: 'loading',
      error: null,
    })

    try {
      const results = await searchProducts(
        normalizedQuery,
        controller.signal,
      )

      if (requestId !== latestRequestId) {
        return
      }

      set({
        results,
        status: 'success',
      })
    } catch (error) {
      if (requestId !== latestRequestId) {
        return
      }

      if (
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {
        return
      }

      set({
        status: 'error',
        error: 'Unable to load search results.',
      })
    }
  },

  clear: () => {
    latestRequestId += 1
    activeController?.abort()
    activeController = null

    set({
      query: '',
      results: [],
      status: 'idle',
      error: null,
    })
  },
}))