"use client"

type AddToCartButtonProps = {
  className?: string
}

export function AddToCartButton({ className = "" }: AddToCartButtonProps) {
  return (
    <button
      type="button"
      className={`mt-3 h-8.5 w-full bg-[#1ca6ae] text-[14px] font-normal text-white transition hover:bg-[#168f96] sm:h-9 sm:text-[15px] lg:h-10 lg:text-[18px] ${className}`.trim()}
    >
      Add to cart
    </button>
  )
}
