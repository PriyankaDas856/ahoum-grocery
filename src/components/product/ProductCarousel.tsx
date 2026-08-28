import type { Product } from '../../api/types'
import ProductCard from './ProductCard'

interface ProductCarouselProps {
  products: Product[]
}

function ProductCarousel({
  products,
}: ProductCarouselProps) {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-8 md:gap-5 md:px-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[165px] shrink-0 md:w-[210px]"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductCarousel