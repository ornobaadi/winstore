import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength - 2)}..`
}

export function formatPrice(value: number, currency = "$") {
  return `${currency}${value.toFixed(2)}`
}

export function calculateOriginalPrice(price: number) {
  return Math.round(price * 1.2 * 100) / 100
}

export function formatCategoryName(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
