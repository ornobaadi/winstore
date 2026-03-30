import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on WinStore.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="rounded-md bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] lg:p-8">
          <h1 className="text-2xl font-medium text-[#151515] lg:text-3xl">Page not found</h1>
          <p className="mt-3 text-[#596066]">
            The page you requested does not exist or the product/category is unavailable.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex h-11 items-center rounded-md bg-[#1ca6ae] px-6 text-white transition hover:bg-[#168f96]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
