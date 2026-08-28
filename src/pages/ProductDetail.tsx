import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../api/products'
import type { Product } from '../api/types'
import QuantityControl from '../components/product/QuantityControl'
import { useCartStore } from '../stores/cartStore'
import { useFavouriteStore } from '../stores/favouriteStore'

type ProductInformation = {
  description: string
  nutrition: string
  reviewCount: number
  rating: number
}

const productInformation: Record<
  string,
  ProductInformation
> = {
  'organic-bananas': {
    description:
      'Fresh organic bananas with a naturally sweet taste and soft texture. Perfect for breakfast, smoothies, snacks, and everyday meals.',
    nutrition: '89 kcal / 100g',
    reviewCount: 128,
    rating: 4.5,
  },

  'natural-red-apple': {
    description:
      'Crisp and naturally sweet red apples selected for freshness. Great as a healthy snack or for adding to salads, desserts, and smoothies.',
    nutrition: '52 kcal / 100g',
    reviewCount: 164,
    rating: 4.8,
  },

  'bell-pepper-red': {
    description:
      'Fresh red bell peppers with a crisp texture and naturally sweet flavour. Ideal for salads, stir-fries, curries, and roasted dishes.',
    nutrition: '31 kcal / 100g',
    reviewCount: 96,
    rating: 4.6,
  },

  ginger: {
    description:
      'Fresh ginger root with a warm and aromatic flavour. A versatile kitchen ingredient for tea, curries, marinades, sauces, and everyday cooking.',
    nutrition: '80 kcal / 100g',
    reviewCount: 72,
    rating: 4.4,
  },

  'egg-chicken-red': {
    description:
      'Fresh chicken eggs with a rich taste and smooth texture. Suitable for breakfast, baking, cooking, and everyday meals.',
    nutrition: '143 kcal / 100g',
    reviewCount: 87,
    rating: 4.4,
  },

  'egg-chicken-white': {
    description:
      'Fresh white chicken eggs suitable for breakfast and everyday cooking. A versatile ingredient for boiled eggs, omelettes, baking, and more.',
    nutrition: '143 kcal / 100g',
    reviewCount: 81,
    rating: 4.3,
  },

  'egg-potato': {
    description:
      'A convenient everyday grocery combination of fresh eggs and potatoes, perfect for quick breakfasts, snacks, and home-cooked meals.',
    nutrition: 'Approx. 120 kcal / 100g',
    reviewCount: 54,
    rating: 4.2,
  },

  'egg-noodles': {
    description:
      'Easy-to-cook egg noodles with a satisfying texture. Perfect for quick meals, stir-fries, soups, and homemade noodle dishes.',
    nutrition: 'Approx. 138 kcal / 100g',
    reviewCount: 103,
    rating: 4.5,
  },

  biscuit: {
    description:
      'Crunchy biscuits made for everyday snacking. Enjoy them with tea, coffee, milk, or as a quick snack throughout the day.',
    nutrition: 'Approx. 480 kcal / 100g',
    reviewCount: 61,
    rating: 4.4,
  },

  'choco-cookies': {
    description:
      'Crunchy chocolate cookies with a rich cocoa flavour. A convenient sweet snack to enjoy with tea, coffee, or milk.',
    nutrition: 'Approx. 490 kcal / 100g',
    reviewCount: 75,
    rating: 4.5,
  },

  maggie: {
    description:
      'Quick and convenient instant noodles for an easy meal. Prepare them with your favourite vegetables, eggs, or other ingredients.',
    nutrition: 'Approx. 450 kcal / 100g',
    reviewCount: 142,
    rating: 4.6,
  },

  ramen: {
    description:
      'Instant ramen noodles with a satisfying texture and rich flavour. Great for quick meals and easy custom recipes.',
    nutrition: 'Approx. 430 kcal / 100g',
    reviewCount: 89,
    rating: 4.4,
  },

  'fresh-milk': {
    description:
      'Fresh milk with a smooth and creamy taste. Enjoy it chilled, with breakfast cereals, tea, coffee, or in your favourite recipes.',
    nutrition: 'Approx. 61 kcal / 100ml',
    reviewCount: 117,
    rating: 4.5,
  },

  'oat-milk': {
    description:
      'Smooth oat-based milk with a naturally mild flavour. Great for breakfast, coffee, smoothies, and everyday drinks.',
    nutrition: 'Approx. 46 kcal / 100ml',
    reviewCount: 64,
    rating: 4.4,
  },

  ghee: {
    description:
      'Rich and aromatic ghee suitable for everyday Indian cooking. Perfect for curries, rice dishes, parathas, sweets, and frying.',
    nutrition: 'Approx. 900 kcal / 100g',
    reviewCount: 93,
    rating: 4.7,
  },

  'mustard-oil': {
    description:
      'Aromatic mustard oil with a distinctive flavour, suitable for traditional cooking, frying, marinades, and Indian recipes.',
    nutrition: 'Approx. 884 kcal / 100ml',
    reviewCount: 86,
    rating: 4.5,
  },

  'sunflower-oil': {
    description:
      'Light sunflower oil suitable for everyday cooking, frying, sautéing, and baking.',
    nutrition: 'Approx. 884 kcal / 100ml',
    reviewCount: 79,
    rating: 4.5,
  },

  'coca-cola-can': {
    description:
      'A chilled carbonated soft drink with a classic cola flavour. Perfect for serving cold with meals or enjoying as a refreshing drink.',
    nutrition: 'Approx. 42 kcal / 100ml',
    reviewCount: 211,
    rating: 4.7,
  },

  'diet-coke': {
    description:
      'A refreshing carbonated cola drink with a crisp taste. Best served chilled with meals or as a refreshing beverage.',
    nutrition: 'Low calorie beverage',
    reviewCount: 154,
    rating: 4.5,
  },

  'pepsi-can': {
    description:
      'A refreshing carbonated cola drink with a bold and sweet cola flavour. Best served chilled.',
    nutrition: 'Approx. 42 kcal / 100ml',
    reviewCount: 138,
    rating: 4.5,
  },

  'sprite-can': {
    description:
      'A crisp and refreshing lemon-lime flavoured carbonated drink. Best enjoyed chilled with meals or as a refreshing beverage.',
    nutrition: 'Approx. 42 kcal / 100ml',
    reviewCount: 127,
    rating: 4.4,
  },

  'apple-grape-juice': {
    description:
      'A refreshing blend of apple and grape flavours. Enjoy chilled as a fruity drink with breakfast or throughout the day.',
    nutrition: 'Approx. 46 kcal / 100ml',
    reviewCount: 91,
    rating: 4.6,
  },

  'orange-juice': {
    description:
      'Refreshing orange juice with a bright citrus flavour. Enjoy chilled at breakfast or as a refreshing drink during the day.',
    nutrition: 'Approx. 45 kcal / 100ml',
    reviewCount: 105,
    rating: 4.5,
  },

  'chicken-meat': {
    description:
      'Fresh chicken meat suitable for everyday cooking. Ideal for curries, grilling, roasting, stir-fries, and homemade meals.',
    nutrition: 'Approx. 165 kcal / 100g',
    reviewCount: 88,
    rating: 4.6,
  },

  'goat-meat': {
    description:
      'Fresh goat meat suitable for traditional curries, stews, grills, and slow-cooked dishes.',
    nutrition: 'Approx. 143 kcal / 100g',
    reviewCount: 67,
    rating: 4.5,
  },

  fish: {
    description:
      'Fresh fish suitable for a variety of home-cooked meals. Great for curries, frying, grilling, and steaming.',
    nutrition: 'Varies by fish type',
    reviewCount: 73,
    rating: 4.5,
  },
}

const defaultInformation: ProductInformation = {
  description:
    'Fresh quality grocery product selected for your everyday shopping needs. Carefully presented to help you enjoy convenient and reliable groceries at home.',
  nutrition:
    'Nutrition information varies by product.',
  reviewCount: 0,
  rating: 4.5,
}

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] =
    useState<Product | null>(null)

  const [loading, setLoading] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(true)

  const addItem = useCartStore(
    (state) => state.addItem,
  )

  const toggleFavourite = useFavouriteStore(
    (state) => state.toggleFavourite,
  )

  const isFavourite = useFavouriteStore(
    (state) =>
      product
        ? state.items.some(
            (item) => item.id === product.id,
          )
        : false,
  )

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((products) => {
        const found = products.find(
          (item) => item.id === id,
        )

        setProduct(found ?? null)
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setProduct(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <div className="px-4 pt-5 md:mx-auto md:max-w-[1100px] md:px-8 md:pt-8">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-100" />

        <div className="mt-5 aspect-square animate-pulse rounded-2xl bg-gray-100 md:h-[500px] md:aspect-auto" />

        <div className="mt-5 h-6 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-semibold text-[#181725]">
          Product not found
        </p>

        <Link
          to="/"
          className="mt-4 text-sm font-semibold text-[#53B175]"
        >
          Back to home
        </Link>
      </div>
    )
  }

  const information =
    productInformation[product.id] ??
    defaultInformation

  const fullStars = Math.round(
    information.rating,
  )

  const handleFavourite = () => {
    toggleFavourite(product)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-5 md:mx-auto md:max-w-[1100px] md:px-8 md:pt-8">
        <Link
          to="/"
          className="flex h-8 w-8 items-center text-xl text-[#181725]"
          aria-label="Back to home"
        >
          ←
        </Link>

        <span className="text-xs text-[#7C7C7C]">
          {product.category}
        </span>

        <button
          type="button"
          onClick={handleFavourite}
          className={`flex h-8 w-8 items-center justify-center text-2xl transition active:scale-90 ${
            isFavourite
              ? 'text-[#53B175]'
              : 'text-[#7C7C7C]'
          }`}
          aria-label={
            isFavourite
              ? 'Remove from favourites'
              : 'Add to favourites'
          }
          aria-pressed={isFavourite}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </header>

      <main className="md:mx-auto md:max-w-[1100px] md:px-8">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:py-8">
          {/* Product Image */}
          <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-b-3xl bg-[#F7F7F7] p-8 md:mt-0 md:aspect-auto md:h-[520px] md:rounded-3xl md:p-12">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="px-4 pb-8 md:px-0 md:pt-2">
            {/* Name + Favourite */}
            <div className="mt-5 flex items-start justify-between gap-4 md:mt-0">
              <div>
                <h1 className="text-xl font-bold text-[#181725] md:text-3xl">
                  {product.name}
                </h1>

                <p className="mt-1 text-xs font-medium text-[#7C7C7C] md:text-sm">
                  {product.unit}, Price
                </p>
              </div>

              <button
                type="button"
                onClick={handleFavourite}
                className={`text-2xl transition active:scale-90 ${
                  isFavourite
                    ? 'text-[#53B175]'
                    : 'text-[#7C7C7C]'
                }`}
                aria-label={
                  isFavourite
                    ? 'Remove from favourites'
                    : 'Add to favourites'
                }
                aria-pressed={isFavourite}
              >
                {isFavourite ? '♥' : '♡'}
              </button>
            </div>

            {/* Quantity + Price */}
            <div className="mt-7 flex items-center justify-between border-b border-[#E2E2E2] pb-6">
              <QuantityControl product={product} />

              <span className="text-xl font-bold text-[#181725] md:text-2xl">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Product Detail */}
            <section className="border-b border-[#E2E2E2]">
              <button
                type="button"
                onClick={() =>
                  setDetailsOpen(
                    (current) => !current,
                  )
                }
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={detailsOpen}
              >
                <span className="text-sm font-semibold text-[#181725]">
                  Product Detail
                </span>

                <span
                  className={`text-lg transition-transform ${
                    detailsOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                >
                  ⌄
                </span>
              </button>

              {detailsOpen && (
                <p className="pb-5 text-xs leading-5 text-[#7C7C7C] md:text-sm md:leading-6">
                  {information.description}
                </p>
              )}
            </section>

            {/* Nutrition */}
            <section className="border-b border-[#E2E2E2]">
              <div className="flex items-center justify-between py-5">
                <span className="text-sm font-semibold text-[#181725]">
                  Nutrition
                </span>

                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-[#F2F3F2] px-2 py-1 text-[9px] text-[#7C7C7C]">
                    100g
                  </span>

                  <span className="text-lg text-[#181725]">
                    ›
                  </span>
                </div>
              </div>

              <p className="pb-4 text-xs text-[#7C7C7C]">
                {information.nutrition}
              </p>
            </section>

            {/* Reviews */}
            <section className="border-b border-[#E2E2E2]">
              <div className="flex items-center justify-between py-5">
                <span className="text-sm font-semibold text-[#181725]">
                  Reviews
                </span>

                <div className="flex items-center gap-3">
                  <span
                    className="text-sm tracking-wide text-[#FF6B4A]"
                    aria-label={`${information.rating} out of 5 stars`}
                  >
                    {'★'.repeat(fullStars)}
                  </span>

                  <span className="text-lg text-[#181725]">
                    ›
                  </span>
                </div>
              </div>

              <p className="pb-4 text-xs text-[#7C7C7C]">
                {information.rating.toFixed(1)} / 5
                {information.reviewCount > 0 &&
                  ` · ${information.reviewCount} reviews`}
              </p>
            </section>

            {/* Add to Basket */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => addItem(product)}
                disabled={product.stock === 0}
                className="w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white transition hover:bg-[#469D68] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#D9D9D9] md:py-5 md:text-base"
              >
                {product.stock === 0
                  ? 'Out of Stock'
                  : 'Add To Basket'}
              </button>

              <p className="mt-3 text-center text-[10px] text-[#9B9B9B]">
                {product.stock > 0
                  ? `${product.stock} available in stock`
                  : 'Currently unavailable'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail