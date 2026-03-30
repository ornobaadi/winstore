"use server"

import { API_BASE_URL } from "@/constants"
import type { ApiResponse, Product } from "@/types"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as ApiResponse<Product[]>
    if (!payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || "Invalid products response")
    }

    return [...payload.data].sort((a, b) => b.id - a.id)
  } catch (error) {
    console.error("[getAllProducts]", error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as ApiResponse<Product[]>
    if (!payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || "Invalid category products response")
    }

    return [...payload.data].sort((a, b) => b.id - a.id)
  } catch (error) {
    console.error("[getProductsByCategory]", error)
    return []
  }
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const payload = (await response.json()) as ApiResponse<Product>
  if (!payload.success || !payload.data) {
    throw new Error(payload.message || "Invalid product response")
  }

  return payload.data
}
