import Image from "next/image"

import { truncateText } from "@/lib/utils"

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
}

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="bg-(--winstore-page-bg) py-8 lg:py-10">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <h2 className="mb-5 text-[30px] leading-none font-light text-[#151515] lg:mb-7 lg:text-[42px]">
          <span className="font-normal text-[#17b2c0]">New</span>{" "}
          <span className="font-normal text-[#1e1e1e]">Arrivals</span>
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => {
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

          {products.length === 0 && (
            <div className="col-span-full rounded-md border border-dashed border-[#b8b8b8] bg-white p-8 text-center text-lg text-[#5d5d5d]">
              New arrivals are currently unavailable.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
