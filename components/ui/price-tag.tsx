import { calculateOriginalPrice, formatPrice } from "@/lib/utils"

type PriceTagProps = {
  price: number
  className?: string
}

export function PriceTag({ price, className = "" }: PriceTagProps) {
  return (
    <div className={`mt-3 flex items-center gap-1.5 sm:gap-2.5 ${className}`.trim()}>
      <span className="text-[11px] leading-none text-[#8a8a8a] line-through sm:text-[13px] lg:text-[15px]">
        {formatPrice(calculateOriginalPrice(price))}
      </span>
      <span className="text-[16px] leading-none text-[#00aeba] sm:text-[19px] lg:text-[24px]">
        {formatPrice(price)}
      </span>
    </div>
  )
}
