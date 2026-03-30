import type { Metadata } from "next"

import { BEST_DEALS_TABS } from "@/constants"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { NewArrivals } from "@/components/home/new-arrivals"
import { BestDeals } from "@/components/home/best-deals"
import { getCategories } from "@/actions/category.actions"
import { getAllProducts, getProductsByCategory } from "@/actions/product.actions"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover WinStore latest arrivals, category picks, and best deals across electronics, jewelery, and fashion.",
}

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ])

  const latestTenProducts = products.slice(0, 10)
  const availableCategoryNames = new Set(categories.map((category) => category.name))
  const initialBestDealsCategory =
    BEST_DEALS_TABS.find((tab) => availableCategoryNames.has(tab.apiCategory))
      ?.apiCategory ?? categories[0]?.name ?? ""
  const initialBestDealsProducts = initialBestDealsCategory
    ? await getProductsByCategory(initialBestDealsCategory)
    : []

  return (
    <main className="min-h-screen bg-(--winstore-page-bg)">
      <HeroBanner />
      <CategoryCarousel categories={categories} />
      <NewArrivals products={latestTenProducts} />
      <BestDeals categories={categories} initialProducts={initialBestDealsProducts} />
    </main>
  )
}
