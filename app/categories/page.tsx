import type { Metadata } from "next"
import Link from "next/link"

import { getCategories } from "@/actions/category.actions"
import { CATEGORY_IMAGE_MAP } from "@/constants"
import { formatCategoryName } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all WinStore categories and jump directly to category product listings.",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
      <section className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Browse Categories</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${encodeURIComponent(category.name)}`}
              className="group relative min-h-52 overflow-hidden border border-[#e8e8e8] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] lg:min-h-62"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(${CATEGORY_IMAGE_MAP[category.name] ?? CATEGORY_IMAGE_MAP.electronics})`,
                }}
              />

              <div className="absolute inset-x-0 bottom-3 mx-3 flex items-center justify-between bg-white/92 px-4 py-2.5 shadow-[0_5px_15px_rgba(0,0,0,0.16)] backdrop-blur-[2px] lg:mx-4 lg:px-5 lg:py-3">
                <h2 className="text-xl font-medium leading-tight">
                  {formatCategoryName(category.name)}
                </h2>
                <span className="text-xl font-light text-[#20a7d9] transition group-hover:text-[#188cba]">
                  Shop
                </span>
              </div>
            </Link>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full rounded-md border border-dashed border-[#b8b8b8] bg-white p-8 text-center text-lg text-[#5d5d5d]">
              No categories available right now.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
