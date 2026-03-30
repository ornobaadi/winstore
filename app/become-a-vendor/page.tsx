import Link from "next/link"

export default function BecomeVendorPage() {
  return (
    <main className="min-h-screen bg-(--winstore-page-bg) py-10 lg:py-14">
      <section className="mx-auto w-full max-w-11/12 rounded-md bg-white px-5 py-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-3xl font-medium text-[#151515] lg:text-4xl">Become a Vendor</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#2f2f2f] lg:text-[18px]">
          Join WinStore as a vendor to list your products and reach more customers. Submit your business profile
          and product catalog to get started.
        </p>

        <ul className="mt-5 list-disc space-y-2 pl-5 text-[16px] text-[#2f2f2f]">
          <li>Business registration details</li>
          <li>Valid CNIC or equivalent identification</li>
          <li>Product inventory and fulfillment information</li>
        </ul>

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
