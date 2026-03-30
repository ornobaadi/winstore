import Link from "next/link"

export default function EasyMonthlyInstallmentsPage() {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-10 lg:py-14">
      <section className="mx-auto w-full max-w-11/12 rounded-md bg-white px-5 py-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Easy Monthly Installments</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#2f2f2f] lg:text-[18px]">
          Flexible installment plans are available on selected products. Contact support for plan duration,
          documentation requirements, and eligibility details.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#1ca6ae] px-6 text-white transition hover:bg-[#168f96]"
        >
          Back to home
        </Link>
      </section>
    </main>
  )
}
