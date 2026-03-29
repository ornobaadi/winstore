"use server"

type Category = {
  id: number
  name: string
}

type CategoriesResponse = {
  success: boolean
  message: string
  data: Category[]
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://mm-assesment-server.vercel.app/api/v1"

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as CategoriesResponse
    if (!payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || "Invalid categories response")
    }

    return payload.data
  } catch (error) {
    console.error("[getCategories]", error)
    return []
  }
}
