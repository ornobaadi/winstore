import { HomeNavbar } from "@/components/layout/home-navbar"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { getCategories } from "@/actions/category.actions"

export default async function Page() {
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-[var(--winstore-page-bg)]">
      <HomeNavbar />
      <HeroBanner />
      <CategoryCarousel categories={categories} />
    </main>
  )
}
