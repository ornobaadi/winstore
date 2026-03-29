import { HomeNavbar } from "@/components/layout/home-navbar"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { NewArrivals } from "@/components/home/new-arrivals"
import { getCategories } from "@/actions/category.actions"
import { getAllProducts } from "@/actions/product.actions"

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ])

  const latestFiveProducts = products.slice(0, 6)

  return (
    <main className="min-h-screen bg-(--winstore-page-bg)">
      <HomeNavbar />
      <HeroBanner />
      <CategoryCarousel categories={categories} />
      <NewArrivals products={latestFiveProducts} />
    </main>
  )
}
