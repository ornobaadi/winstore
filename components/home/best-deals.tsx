"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { truncateText } from "@/lib/utils"

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
}

type Category = {
  id: number
  name: string
}

type BestDealsProps = {
  categories: Category[]
  productsByCategory: Record<string, Product[]>
}

function formatTabLabel(name: string) {
  return name.toUpperCase()
}

export function BestDeals({ categories, productsByCategory }: BestDealsProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.name ?? "",
  )
  const [showTabArrows, setShowTabArrows] = useState(false)
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false)
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(false)

  const updateTabsState = useCallback(() => {
    const tabs = tabsRef.current
    if (!tabs) return

    const overflow = tabs.scrollWidth > tabs.clientWidth + 1
    setShowTabArrows(overflow)

    if (!overflow) {
      setCanScrollTabsLeft(false)
      setCanScrollTabsRight(false)
      return
    }

    setCanScrollTabsLeft(tabs.scrollLeft > 1)
    setCanScrollTabsRight(tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const tabs = tabsRef.current
    if (!tabs) return

    updateTabsState()

    const handleScroll = () => updateTabsState()
    tabs.addEventListener("scroll", handleScroll)

    const observer = new ResizeObserver(() => updateTabsState())
    observer.observe(tabs)

    return () => {
      tabs.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [categories, updateTabsState])

  const scrollTabs = (direction: "left" | "right") => {
    const tabs = tabsRef.current
    if (!tabs) return

    const amount = Math.max(120, Math.floor(tabs.clientWidth * 0.35))
    tabs.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  const activeProducts = useMemo(() => {
    if (!activeCategory) return []
    return productsByCategory[activeCategory] ?? []
  }, [activeCategory, productsByCategory])

  return (
    <section className="overflow-x-hidden bg-(--winstore-page-bg) py-8 lg:py-10">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="mb-6 flex flex-col items-start gap-3 overflow-hidden lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-[30px] leading-none font-light text-[#151515] lg:text-[42px]">
            <span className="font-normal text-[#17b2c0]">Best</span>{" "}
            <span className="font-normal text-[#1e1e1e]">Deals</span>
          </h2>

          <div className="flex w-full min-w-0 items-center gap-2 lg:w-auto lg:gap-4">
            <div
              ref={tabsRef}
              className="scrollbar-none flex w-full min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 pr-1 text-[12px] font-semibold tracking-wide text-[#252525] sm:gap-4 sm:text-[13px] lg:w-auto lg:max-w-full lg:gap-6 lg:text-[18px]"
            >
              {categories.map((category) => {
                const isActive = category.name === activeCategory

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.name)}
                    className={`shrink-0 border-b-3 pb-1 transition ${
                      isActive
                        ? "border-[#17b2c0] text-[#17b2c0]"
                        : "border-transparent hover:text-[#17b2c0]"
                    }`}
                  >
                    {formatTabLabel(category.name)}
                  </button>
                )
              })}
            </div>

            {showTabArrows && (
              <div className="hidden shrink-0 items-center gap-1 text-black/60 lg:flex">
                {canScrollTabsLeft && (
                  <button
                    type="button"
                    aria-label="Scroll categories left"
                    onClick={() => scrollTabs("left")}
                    className="rounded p-1 hover:bg-black/5"
                  >
                    <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                )}
                {canScrollTabsRight && (
                  <button
                    type="button"
                    aria-label="Scroll categories right"
                    onClick={() => scrollTabs("right")}
                    className="rounded p-1 hover:bg-black/5"
                  >
                    <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {activeProducts.slice(0, 12).map((product) => {
            const currentPrice = product.price.toFixed(2)
            const previousPrice = (product.price + 5).toFixed(2)

            return (
              <article
                key={product.id}
                className="min-w-0 border border-[#cfcfcf] bg-white px-2.5 pt-2.5 pb-3 sm:px-3 sm:pt-3 lg:px-4 lg:pb-4"
              >
                <p className="text-[11px] leading-tight text-[#3d3d3d] sm:text-[12px] lg:text-[13px]">
                  Bin Bakar Electronics
                </p>

                <h3 className="mt-2 text-[12px] leading-snug font-medium break-words text-[#0f5f68] sm:mt-2.5 sm:text-[14px] lg:text-[16px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                  {truncateText(product.title, 23)}
                </h3>

                <div className="relative mt-2 h-24 sm:mt-2.5 sm:h-28 lg:h-35">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 16vw"
                    className="object-contain"
                  />
                </div>

                <div className="mt-3 flex items-center gap-1.5 sm:gap-2.5">
                  <span className="text-[11px] leading-none text-[#8a8a8a] line-through sm:text-[13px] lg:text-[15px]">
                    ${previousPrice}
                  </span>
                  <span className="text-[16px] leading-none text-[#00aeba] sm:text-[19px] lg:text-[24px]">
                    ${currentPrice}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-3 h-8.5 w-full bg-[#1ca6ae] text-[14px] font-normal text-white transition hover:bg-[#168f96] sm:h-9 sm:text-[15px] lg:h-10 lg:text-[18px]"
                >
                  Add to cart
                </button>
              </article>
            )
          })}

          {activeProducts.length === 0 && (
            <div className="col-span-full rounded-md border border-dashed border-[#b8b8b8] bg-white p-8 text-center text-lg text-[#5d5d5d]">
              No deals found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
