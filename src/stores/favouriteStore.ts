import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../api/types'

type FavouriteState = {
  items: Product[]
  toggleFavourite: (product: Product) => void
  isFavourite: (productId: string) => boolean
}

export const useFavouriteStore =
  create<FavouriteState>()(
    persist(
      (set, get) => ({
        items: [],

        toggleFavourite: (product) => {
          const exists = get().items.some(
            (item) => item.id === product.id,
          )

          if (exists) {
            set((state) => ({
              items: state.items.filter(
                (item) => item.id !== product.id,
              ),
            }))
          } else {
            set((state) => ({
              items: [...state.items, product],
            }))
          }
        },

        isFavourite: (productId) =>
          get().items.some(
            (item) => item.id === productId,
          ),
      }),
      {
        name: 'nectar-favourites',
      },
    ),
  )