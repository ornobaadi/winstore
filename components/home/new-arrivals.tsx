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
    <section className="bg-(--winstore-page-bg) py-10 lg:py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <h2 className="mb-6 text-[34px] leading-none font-light text-[#151515] lg:mb-8 lg:text-[46px]">
          <span className="font-normal text-[#17b2c0]">New</span>{" "}
          <span className="font-normal text-[#1e1e1e]">Arrivals</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => {
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
