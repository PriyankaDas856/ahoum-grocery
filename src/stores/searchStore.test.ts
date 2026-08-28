import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '../api/types'

const searchProductsMock = vi.fn()

vi.mock('../api/products', () => ({
  searchProducts: searchProductsMock,
}))

const { useSearchStore } = await import('./searchStore')

const milkProduct: Product = {
  id: 'milk-1',
  name: 'Milk',
  category: 'Dairy & Eggs',
  subcategory: 'Dairy',
  price: 2.99,
  unit: '1L',
  stock: 10,
  image: '/images/milk.png',
  rating: 4.5,
}

const eggsProduct: Product = {
  id: 'eggs-1',
  name: 'Egg Chicken Red',
  category: 'Dairy & Eggs',
  subcategory: 'Eggs',
  price: 1.99,
  unit: '4 pcs',
  stock: 20,
  image: '/images/egg-chicken-red.png',
  rating: 4.4,
}

describe('search store', () => {
  beforeEach(() => {
    searchProductsMock.mockReset()
    useSearchStore.getState().clear()
  })

  it('keeps the newest search results when an older request resolves later', async () => {
    let resolveMilk!: (products: Product[]) => void
    let resolveEggs!: (products: Product[]) => void

    const milkRequest = new Promise<Product[]>((resolve) => {
      resolveMilk = resolve
    })

    const eggsRequest = new Promise<Product[]>((resolve) => {
      resolveEggs = resolve
    })

    searchProductsMock
      .mockReturnValueOnce(milkRequest)
      .mockReturnValueOnce(eggsRequest)

    const firstSearch = useSearchStore.getState().search('milk')
    const secondSearch = useSearchStore.getState().search('eggs')

    resolveEggs([eggsProduct])
    await secondSearch

    resolveMilk([milkProduct])
    await firstSearch

    const state = useSearchStore.getState()

    expect(state.query).toBe('eggs')
    expect(state.results).toEqual([eggsProduct])
    expect(state.status).toBe('success')
  })
})