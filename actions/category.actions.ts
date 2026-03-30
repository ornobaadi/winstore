"use server"

import { API_BASE_URL } from "@/constants"
import type { ApiResponse, Category } from "@/types"

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as ApiResponse<Category[]>
    if (!payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || "Invalid categories response")
    }

    return payload.data
  } catch (error) {
    console.error("[getCategories]", error)
    return []
  }
}
