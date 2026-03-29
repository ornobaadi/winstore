import { HomeNavbar } from "@/components/layout/home-navbar"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { NewArrivals } from "@/components/home/new-arrivals"
import { BestDeals } from "@/components/home/best-deals"
import { Footer } from "@/components/layout/footer"
import { getCategories } from "@/actions/category.actions"
import { getAllProducts, getProductsByCategory } from "@/actions/product.actions"

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ])

  const latestSixProducts = products.slice(0, 6)

  const productsByCategoryEntries = await Promise.all(
    categories.map(async (category) => {
      const categoryProducts = await getProductsByCategory(category.name)
      return [category.name, categoryProducts] as const
    }),
  )

  const productsByCategory = Object.fromEntries(productsByCategoryEntries)

  return (
    <main className="min-h-screen bg-(--winstore-page-bg)">
      <HomeNavbar />
      <HeroBanner />
      <CategoryCarousel categories={categories} />
      <NewArrivals products={latestSixProducts} />
      <BestDeals
        categories={categories}
        productsByCategory={productsByCategory}
      />
      <Footer />
    </main>
  )
}
