import type { Product } from "@/types"

import { ProductCard } from "@/components/product/product-card"

type ProductGridProps = {
  products: Product[]
  columnsClassName?: string
  itemClassName?: string
  emptyMessage?: string
}

export function ProductGrid({
  products,
  columnsClassName = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6",
  itemClassName = "",
  emptyMessage = "No products available.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[#b8b8b8] bg-white p-8 text-center text-lg text-[#5d5d5d]">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={columnsClassName}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className={itemClassName} />
      ))}
    </div>
  )
}
