import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getProductById, getProductsByCategory } from "@/actions/product.actions"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { ProductGrid } from "@/components/product/product-grid"
import { StarRating } from "@/components/product/star-rating"
import { Badge } from "@/components/ui/badge"
import { calculateOriginalPrice, formatPrice, truncateText } from "@/lib/utils"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId <= 0) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  try {
    const product = await getProductById(productId)
    return {
      title: truncateText(product.title, 55),
      description: truncateText(product.description, 150),
      openGraph: {
        title: truncateText(product.title, 55),
        description: truncateText(product.description, 150),
        images: [{ url: product.image, alt: product.title }],
      },
    }
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound()
  }

  let product
  try {
    product = await getProductById(productId)
  } catch {
    notFound()
  }

  const relatedProducts = (await getProductsByCategory(product.category))
    .filter((item) => item.id !== product.id)
    .slice(0, 6)

  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <nav className="mb-6 text-sm text-[#596066] lg:text-base" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0f5f68]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-[#0f5f68]"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0f5f68]">{truncateText(product.title, 35)}</span>
        </nav>

        <section className="grid gap-8 rounded-md bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:p-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-8">
          <div className="relative h-72 rounded-md bg-white sm:h-90">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain"
            />
          </div>

          <div>
            <Badge>{product.category}</Badge>

            <h1 className="mt-3 text-2xl leading-tight font-medium text-[#151515] lg:text-4xl">
              {product.title}
            </h1>

            <StarRating rate={product.rating.rate} count={product.rating.count} />

            <div className="mt-4 flex items-end gap-3">
              <span className="text-xl text-[#8a8a8a] line-through lg:text-2xl">
                {formatPrice(calculateOriginalPrice(product.price))}
              </span>
              <span className="text-3xl text-[#00aeba] lg:text-4xl">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-[#2f2f2f] lg:text-[17px]">
              {product.description}
            </p>

            <AddToCartButton product={product} className="mt-6 w-auto px-8" />
          </div>
        </section>

        <section className="mt-10 lg:mt-12">
          <h2 className="text-2xl font-medium text-[#151515] lg:text-3xl">Related Products</h2>

          <ProductGrid
            products={relatedProducts}
            columnsClassName="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6"
            emptyMessage="No related products found."
          />
        </section>
      </div>
    </main>
  )
}
