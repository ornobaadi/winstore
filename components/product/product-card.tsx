import Image from "next/image"
import Link from "next/link"

import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { PriceTag } from "@/components/ui/price-tag"
import type { Product } from "@/types"
import { truncateText } from "@/lib/utils"

type ProductCardProps = {
  product: Product
  showAddToCart?: boolean
  titleMaxLength?: number
  brandLabel?: string
  className?: string
}

export function ProductCard({
  product,
  showAddToCart = true,
  titleMaxLength = 23,
  brandLabel = "Bin Bakar Electronics",
  className = "",
}: ProductCardProps) {
  return (
    <article className={`min-w-0 border border-[#cfcfcf] bg-white px-2.5 pt-2.5 pb-3 sm:px-3 sm:pt-3 lg:px-4 lg:pb-4 ${className}`.trim()}>
      <p className="text-[11px] leading-tight text-[#3d3d3d] sm:text-[12px] lg:text-[13px]">
        {brandLabel}
      </p>

      <Link href={`/products/${product.id}`} className="block">
        <h3 className="mt-2 text-[12px] leading-snug font-medium text-[#0f5f68] sm:mt-2.5 sm:text-[14px] lg:text-[16px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden hover:text-[#0b4950]">
          {truncateText(product.title, titleMaxLength)}
        </h3>
      </Link>

      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mt-2 h-24 sm:mt-2.5 sm:h-28 lg:h-35">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 16vw"
            className="object-contain"
          />
        </div>
      </Link>

      <PriceTag price={product.price} />
      {showAddToCart ? <AddToCartButton /> : null}
    </article>
  )
}
