import { mockFetch } from './client'
import type { Product } from './types'

const PRODUCTS_URL = '/mock-data/products.json'

export async function getProducts(
  signal?: AbortSignal,
): Promise<Product[]> {
  return mockFetch<Product[]>(PRODUCTS_URL, signal)
}

export async function searchProducts(
  query: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  const products = await getProducts(signal)

  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return products
  }

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.subcategory.toLowerCase().includes(normalizedQuery)
    )
  })
}