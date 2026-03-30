"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

import { CATEGORY_IMAGE_MAP } from "@/constants"
import type { Category } from "@/types"
import { formatCategoryName } from "@/lib/utils"

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const overflow = track.scrollWidth > track.clientWidth + 1
    setHasOverflow(overflow)

    if (!overflow) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    setCanScrollLeft(track.scrollLeft > 1)
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateScrollState()

    const handleScroll = () => updateScrollState()
    track.addEventListener("scroll", handleScroll)

    const observer = new ResizeObserver(() => updateScrollState())
    observer.observe(track)

    return () => {
      track.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [categories, updateScrollState])

  const scrollTrack = (direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    const amount = Math.max(280, Math.floor(track.clientWidth * 0.45))
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative border-y border-[#dedcc8] bg-[#ece9cf] py-5 lg:py-6">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        {hasOverflow && canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollTrack("left")}
            aria-label="Previous categories"
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-black/25 bg-white/80 p-2 text-black transition hover:bg-white lg:left-4"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
        )}

        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto lg:gap-7"
        >
          {categories.map((category) => (
            <article
              key={category.id}
              className="group relative min-h-45 min-w-70 flex-1 snap-start overflow-hidden border border-[#e8e8e8] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] lg:min-h-62.5 lg:min-w-90"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(${CATEGORY_IMAGE_MAP[category.name] ?? CATEGORY_IMAGE_MAP.electronics})`,
                }}
              />

              <div className="absolute inset-x-0 bottom-3 mx-3 flex items-center justify-between bg-white/92 px-4 py-2.5 shadow-[0_5px_15px_rgba(0,0,0,0.16)] backdrop-blur-[2px] lg:bottom-4 lg:mx-4 lg:px-5 lg:py-3">
                <h3 className="text-xl font-medium leading-tight lg:text-2xl">
                  {formatCategoryName(category.name)}
                </h3>
                <Link
                  href={`/category/${encodeURIComponent(category.name)}`}
                  className="text-xl font-light text-[#20a7d9] transition hover:text-[#188cba] lg:text-2xl"
                >
                  Shop
                </Link>
              </div>
            </article>
          ))}

          {categories.length === 0 && (
            <div className="w-full py-10 text-center text-lg text-black/60">
              No categories available right now.
            </div>
          )}
        </div>

        {hasOverflow && canScrollRight && (
          <button
            type="button"
            onClick={() => scrollTrack("right")}
            aria-label="Next categories"
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-black/25 bg-white/80 p-2 text-black transition hover:bg-white lg:right-4"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        )}
      </div>
    </section>
  )
}