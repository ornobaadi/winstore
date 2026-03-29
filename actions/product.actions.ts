"use server"

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

type ProductsResponse = {
  success: boolean
  message: string
  data: Product[]
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://mm-assesment-server.vercel.app/api/v1"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as ProductsResponse
    if (!payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || "Invalid products response")
    }

    return [...payload.data].sort((a, b) => b.id - a.id)
  } catch (error) {
    console.error("[getAllProducts]", error)
    return []
  }
}
