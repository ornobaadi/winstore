"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type Category = {
  id: number
  name: string
}

const categoryImageMap: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1326&auto=format&fit=crop",
  jewelery:
    "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1025&auto=format&fit=crop",
  "men's clothing":
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
  "women's clothing":
    "https://images.unsplash.com/photo-1753161024053-4ef8b6237973?q=80&w=1631&auto=format&fit=crop",
}

function formatCategoryName(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

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
              className="group relative min-h-45 min-w-70 flex-1 snap-start overflow-hidden border border-[#e8e8e8] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] lg:min-h-[250px] lg:min-w-[360px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(${categoryImageMap[category.name] ?? categoryImageMap.electronics})`,
                }}
              />

              <div className="absolute inset-x-0 bottom-3 mx-3 flex items-center justify-between bg-white/92 px-4 py-2.5 shadow-[0_5px_15px_rgba(0,0,0,0.16)] backdrop-blur-[2px] lg:bottom-4 lg:mx-4 lg:px-5 lg:py-3">
                <h3 className="text-xl font-medium leading-tight lg:text-2xl">
                  {formatCategoryName(category.name)}
                </h3>
                <button
                  type="button"
                  className="text-xl font-light text-[#20a7d9] transition hover:text-[#188cba] lg:text-2xl"
                >
                  Shop
                </button>
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