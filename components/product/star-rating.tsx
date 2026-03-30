import { Star } from "lucide-react"

type StarRatingProps = {
  rate: number
  count: number
  className?: string
}

export function StarRating({ rate, count, className = "" }: StarRatingProps) {
  const clampedRate = Math.max(0, Math.min(5, rate))
  const rounded = Math.round(clampedRate)

  return (
    <div className={`mt-3 flex items-center gap-2 text-sm text-[#596066] lg:text-base ${className}`.trim()}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${clampedRate} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < rounded
          return (
            <Star
              key={index}
              className={`h-4 w-4 ${isFilled ? "fill-[#f5a623] text-[#f5a623]" : "text-[#c7c7c7]"}`}
            />
          )
        })}
      </div>
      <span>{clampedRate.toFixed(1)} / 5</span>
      <span>({count} reviews)</span>
    </div>
  )
}
