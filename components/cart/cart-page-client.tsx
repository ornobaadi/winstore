"use client"

import Image from "next/image"
import Link from "next/link"
import { useSyncExternalStore } from "react"

import { useCart } from "@/components/providers/cart-provider"
import { formatPrice, truncateText } from "@/lib/utils"

export function CartPageClient() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } = useCart()
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
        <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
          <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Your Cart</h1>
          <div className="mt-6 rounded-md bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] lg:p-8">
            <p className="text-[16px] text-[#2f2f2f] lg:text-[18px]">Loading your cart...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-6 rounded-md bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] lg:p-8">
            <p className="text-[16px] text-[#2f2f2f] lg:text-[18px]">Your cart is currently empty.</p>
            <Link
              href="/"
              className="mt-5 inline-flex h-11 items-center rounded-md bg-[#1ca6ae] px-6 text-white transition hover:bg-[#168f96]"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <section className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[84px_1fr] gap-3 rounded-md bg-white p-3 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:grid-cols-[96px_1fr] sm:gap-4 sm:p-4"
                >
                  <div className="relative h-20 w-full sm:h-24">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <Link href={`/products/${item.id}`} className="text-[#0f5f68] hover:text-[#0b4950]">
                      <h2 className="text-[14px] font-medium sm:text-[16px]">
                        {truncateText(item.title, 52)}
                      </h2>
                    </Link>

                    <p className="mt-2 text-[18px] text-[#00aeba]">{formatPrice(item.price)}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded border border-[#cfcfcf] text-[#2f2f2f]"
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-[15px] text-[#2f2f2f]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded border border-[#cfcfcf] text-[#2f2f2f]"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-sm text-[#8b8b8b] transition hover:text-[#2f2f2f]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-md bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:p-5 lg:sticky lg:top-6 lg:h-fit">
              <h2 className="text-xl font-medium text-[#151515]">Order Summary</h2>

              <div className="mt-4 space-y-2 text-[#2f2f2f]">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#e4e4e4] pt-4">
                <div className="flex items-center justify-between text-lg font-medium text-[#151515]">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 h-11 w-full rounded-md bg-[#1ca6ae] text-white transition hover:bg-[#168f96]"
              >
                Proceed to checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 h-10 w-full rounded-md border border-[#d2d2d2] text-[#2f2f2f] transition hover:bg-[#f2f2f2]"
              >
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
