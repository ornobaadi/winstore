"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { ProductCard } from "@/components/product/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import type { Product } from "@/types"

export function NewArrivals({ products }: { products: Product[] }) {
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
  }, [products, updateScrollState])

  const scrollTrack = (direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    const amount = Math.max(260, Math.floor(track.clientWidth * 0.45))
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative bg-(--winstore-page-bg) py-8 lg:py-10">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <SectionHeader accent="New" neutral="Arrivals" className="mb-5 lg:mb-7" />

        {hasOverflow && canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollTrack("left")}
            aria-label="Previous new arrivals"
            className="absolute top-[57%] left-2 z-10 -translate-y-1/2 rounded-full border border-black/25 bg-white/85 p-2 text-black transition hover:bg-white lg:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4 lg:gap-5"
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-5rem)/6)]"
              />
            )
          })}

          {products.length === 0 && (
            <div className="min-w-full rounded-md border border-dashed border-[#b8b8b8] bg-white p-8 text-center text-lg text-[#5d5d5d]">
              New arrivals are currently unavailable.
            </div>
          )}
        </div>

        {hasOverflow && canScrollRight && (
          <button
            type="button"
            onClick={() => scrollTrack("right")}
            aria-label="Next new arrivals"
            className="absolute top-[57%] right-2 z-10 -translate-y-1/2 rounded-full border border-black/25 bg-white/85 p-2 text-black transition hover:bg-white lg:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </section>
  )
}
