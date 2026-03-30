import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { NewArrivals } from "@/components/home/new-arrivals"
import { BestDeals } from "@/components/home/best-deals"
import { getCategories } from "@/actions/category.actions"
import { getAllProducts, getProductsByCategory } from "@/actions/product.actions"

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ])

  const latestTenProducts = products.slice(0, 10)
  const initialBestDealsCategory = categories[0]?.name ?? ""
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
