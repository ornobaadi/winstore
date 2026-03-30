"use client"

import { useCart } from "@/components/providers/cart-provider"
import { useToast } from "@/components/providers/toast-provider"
import type { Product } from "@/types"

type AddToCartButtonProps = {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { pushToast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    pushToast(`${product.title} added to cart`)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`mt-3 h-8.5 w-full bg-[#1ca6ae] text-[14px] font-normal text-white transition hover:bg-[#168f96] sm:h-9 sm:text-[15px] lg:h-10 lg:text-[18px] ${className}`.trim()}
    >
      Add to cart
    </button>
  )
}
