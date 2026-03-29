"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
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
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.name ?? "",
  )

  const activeProducts = useMemo(() => {
    if (!activeCategory) return []
    return productsByCategory[activeCategory] ?? []
  }, [activeCategory, productsByCategory])

  return (
    <section className="bg-(--winstore-page-bg) py-8 lg:py-10">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8">
          <h2 className="text-[34px] leading-none font-light text-[#151515] lg:text-[46px]">
            <span className="font-normal text-[#17b2c0]">Best</span>{" "}
            <span className="font-normal text-[#1e1e1e]">Deals</span>
          </h2>

          <div className="flex items-center gap-4">
            <div className="scrollbar-none flex max-w-full items-center gap-7 overflow-x-auto whitespace-nowrap text-[15px] font-semibold tracking-wide text-[#252525] lg:text-[34px]">
              {categories.map((category) => {
                const isActive = category.name === activeCategory

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.name)}
                    className={`border-b-3 pb-1 transition ${
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

            <div className="hidden items-center gap-1 text-black/60 lg:flex">
              <ChevronLeft className="h-5 w-5" />
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {activeProducts.slice(0, 12).map((product) => {
            const currentPrice = product.price.toFixed(2)
            const previousPrice = (product.price + 5).toFixed(2)

            return (
              <article
                key={product.id}
                className="border border-[#cfcfcf] bg-white px-4 pt-3 pb-4"
              >
                <p className="text-[15px] leading-tight text-[#3d3d3d]">
                  Bin Bakar Electronics
                </p>

                <h3 className="mt-3 text-[16px] leading-tight font-medium text-[#0f5f68]">
                  {truncateText(product.title, 23)}
                </h3>

                <div className="relative mt-3 h-35">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 50vw, 20vw"
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 flex items-center gap-3 text-[18px]">
                  <span className="text-[18px] leading-none text-[#8a8a8a] line-through">
                    ${previousPrice}
                  </span>
                  <span className="text-[18px] leading-none text-[#00aeba]">
                    ${currentPrice}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 h-11 w-full bg-[#1ca6ae] text-[18px] font-normal text-white transition hover:bg-[#168f96]"
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
