export default function Loading() {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-8 lg:py-12">
      <div className="mx-auto w-full max-w-11/12 animate-pulse px-4 lg:px-8">
        <div className="h-10 w-64 rounded bg-[#d8d8d8]" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-64 rounded bg-[#e6e6e6]" />
          ))}
        </div>
      </div>
    </main>
  )
}
