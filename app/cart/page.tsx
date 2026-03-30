import type { Metadata } from "next"

import { CartPageClient } from "@/components/cart/cart-page-client"

export const metadata: Metadata = {
  title: "Cart",
  description: "Review cart items, update quantities, and proceed to checkout on WinStore.",
}

export default function CartPage() {
  return <CartPageClient />
}
