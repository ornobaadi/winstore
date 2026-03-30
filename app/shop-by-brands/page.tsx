import type { Metadata } from "next"
import Link from "next/link"

const featuredBrands = ["Samsung", "Apple", "Acer", "Sony", "LG", "Anker"]

export const metadata: Metadata = {
  title: "Shop by Brands",
  description:
    "Explore WinStore products by top brands including Samsung, Apple, Sony, LG, and more.",
}

export default function ShopByBrandsPage() {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-10 lg:py-14">
      <section className="mx-auto w-full max-w-11/12 rounded-md bg-white px-5 py-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Shop by Brands</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#2f2f2f] lg:text-[18px]">
          Browse products by your preferred brands. This section can be expanded with brand collections and
          dedicated landing pages.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {featuredBrands.map((brand) => (
            <span
              key={brand}
              className="rounded-full bg-[#dff4f6] px-3 py-1 text-sm font-medium text-[#0f5f68]"
            >
              {brand}
            </span>
          ))}
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#1ca6ae] px-6 text-white transition hover:bg-[#168f96]"
        >
          Back to home
        </Link>
      </section>
    </main>
  )
}
