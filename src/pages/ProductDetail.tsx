import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import QuantityControl from '../components/product/QuantityControl'
import { useCartStore } from '../stores/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((products) => {
        const found = products.find(
          (item) => item.id === id,
        )

        setProduct(found ?? null)
      })
      .catch(() => {
        setProduct(null)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <div className="px-4 pt-5">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-100" />
        <div className="mt-5 aspect-square animate-pulse rounded-2xl bg-gray-100" />
        <div className="mt-5 h-6 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="px-4 pt-8 text-center">
        <p className="font-semibold text-gray-900">
          Product not found
        </p>

        <Link
          to="/"
          className="mt-4 inline-block text-sm font-semibold text-[#53B175]"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl text-gray-700"
          aria-label="Back"
        >
          ←
        </Link>

        <button
          type="button"
          className="text-lg text-gray-500"
          aria-label="Add to favourites"
        >
          ♡
        </button>
      </header>

      <div className="mt-5 flex aspect-square items-center justify-center rounded-2xl bg-gray-50 p-8">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mt-1 text-xs text-gray-400">
              {product.unit}
            </p>
          </div>

          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-5 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Product Detail
            </h2>

            <span className="text-xs text-gray-400">
              {product.category}
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            Fresh quality {product.name.toLowerCase()} selected
            for your everyday grocery needs.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="text-sm font-semibold">
            Nutrition
          </span>

          <span className="text-gray-400">›</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="text-sm font-semibold">
            Reviews
          </span>

          <span className="text-sm text-orange-400">
            ★★★★★
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <QuantityControl product={product} />

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="flex-1 rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white disabled:opacity-40"
          >
            {product.stock === 0
              ? 'Out of Stock'
              : 'Add to Basket'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail