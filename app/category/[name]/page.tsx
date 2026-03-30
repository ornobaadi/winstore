import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductsByCategory } from "@/actions/product.actions"
import { ProductGrid } from "@/components/product/product-grid"
import { SectionHeader } from "@/components/ui/section-header"
import { formatCategoryName } from "@/lib/utils"

type CategoryPageProps = {
  params: Promise<{
    name: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { name } = await params
  const categoryName = formatCategoryName(decodeURIComponent(name))

  return {
    title: `${categoryName} Products`,
    description: `Browse ${categoryName} products available at WinStore with latest pricing and offers.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params
  const categoryName = decodeURIComponent(name)

  const products = await getProductsByCategory(categoryName)
  if (products.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <SectionHeader accent={formatCategoryName(categoryName)} neutral="Products" />
          <p className="text-sm text-[#596066] lg:text-base">{products.length} products</p>
        </div>

        <ProductGrid
          products={products}
          columnsClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          emptyMessage="No products in this category."
        />
      </div>
    </main>
  )
}
