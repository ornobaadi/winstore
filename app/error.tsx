"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-12">
      <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
        <div className="rounded-md bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] lg:p-8">
          <h1 className="text-2xl font-medium text-[#151515] lg:text-3xl">Something went wrong</h1>
          <p className="mt-3 text-[#596066]">We could not load this section. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 h-11 rounded-md bg-[#1ca6ae] px-6 text-white transition hover:bg-[#168f96]"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  )
}
