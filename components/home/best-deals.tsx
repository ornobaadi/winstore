"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { BEST_DEALS_TABS } from "@/constants"
import { getProductsByCategory } from "@/actions/product.actions"
import { ProductGrid } from "@/components/product/product-grid"
import { SectionHeader } from "@/components/ui/section-header"
import type { Category, Product } from "@/types"

type BestDealsProps = {
  categories: Category[]
  initialProducts: Product[]
}

export function BestDeals({ categories, initialProducts }: BestDealsProps) {
  const dealTabs = useMemo(() => {
    const availableNames = new Set(categories.map((category) => category.name))
    return BEST_DEALS_TABS.filter((tab) => availableNames.has(tab.apiCategory))
  }, [categories])

  const defaultCategory = dealTabs[0]?.apiCategory ?? categories[0]?.name ?? ""

  const tabsRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isPending, startTransition] = useTransition()
  const [showTabArrows, setShowTabArrows] = useState(false)
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false)
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(false)

  const activeCategory = dealTabs.some((tab) => tab.apiCategory === selectedCategory)
    ? selectedCategory
    : defaultCategory

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

  const handleTabChange = (categoryName: string) => {
    if (categoryName === activeCategory || isPending) {
      return
    }

    setSelectedCategory(categoryName)

    startTransition(async () => {
      const nextProducts = await getProductsByCategory(categoryName)
      setProducts(nextProducts)
    })
  }

  return (
    <section className="overflow-x-hidden bg-white py-8 lg:py-10">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="mb-6 flex flex-col items-start gap-3 overflow-hidden lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader accent="Best" neutral="Deals" />

          <div className="flex w-full min-w-0 items-center gap-2 lg:w-auto lg:gap-4">
            <div
              ref={tabsRef}
              className="scrollbar-none flex w-full min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 pr-1 text-[12px] font-semibold tracking-wide text-[#252525] sm:gap-4 sm:text-[13px] lg:w-auto lg:max-w-full lg:gap-6 lg:text-[18px]"
            >
              {dealTabs.map((tab) => {
                const isActive = tab.apiCategory === activeCategory

                return (
                  <button
                    key={tab.apiCategory}
                    type="button"
                    onClick={() => handleTabChange(tab.apiCategory)}
                    disabled={isPending}
                    className={`shrink-0 border-b-3 pb-1 transition ${
                      isActive
                        ? "border-[#17b2c0] text-[#17b2c0]"
                        : "border-transparent hover:text-[#17b2c0]"
                    }`}
                  >
                    {tab.label}
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

        {isPending ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-60 animate-pulse rounded bg-[#e6e6e6]" />
            ))}
          </div>
        ) : (
          <ProductGrid
            products={products.slice(0, 12)}
            columnsClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6"
            emptyMessage="No deals found for this category."
          />
        )}
      </div>
    </section>
  )
}
