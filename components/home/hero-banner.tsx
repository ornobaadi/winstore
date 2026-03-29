import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-y border-[#d9d6bf] bg-[#ece9cf]">
      <div className="relative mx-auto w-full max-w-480">
        <div className="relative h-68 w-full sm:h-82 lg:h-107.5">
          <Image
            src="/banner.png"
            alt="Promotional banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#f2efd6]/90 via-[#f2efd6]/35 to-transparent" />

          <div className="absolute left-[6%] top-1/2 z-10 w-[58%] -translate-y-1/2 sm:w-[50%] lg:w-[38%]">
            <h1 className="text-2xl leading-[0.95] font-light text-[#111] sm:text-4xl lg:text-[72px]">
              Shop <span className="text-[#12a3b2]">Computer</span>
              <br />
              <span className="text-[#12a3b2]">& experience</span>
            </h1>

            <p className="mt-2 text-[11px] leading-snug text-[#232323] sm:mt-3 sm:text-sm lg:mt-4 lg:text-[20px]">
              You Cannot Inspect Quality Into The Product; It Is Already There.
              <br />
              I Am Not A Product Of My Circumstances. I Am A Product Of My
              Decisions.
            </p>

            <button
              type="button"
              className="mt-3 rounded-md bg-[#19a8e5] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#1198d1] sm:mt-4 sm:px-5 sm:py-2 sm:text-sm lg:mt-5 lg:px-7 lg:py-2.5 lg:text-lg"
            >
              View More
            </button>
          </div>

          <div className="absolute right-[8%] top-[12%] z-10 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-b from-[#f7b733] to-[#f07f2e] text-center text-white sm:h-24 sm:w-24 lg:right-[10.5%] lg:top-[11%] lg:h-[210px] lg:w-[210px]">
            <p className="text-xl leading-none font-light sm:text-2xl lg:text-[64px]">
              40%
              <br />
              <span className="text-xl sm:text-2xl lg:text-[64px]">Off</span>
            </p>
          </div>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 sm:gap-3 lg:bottom-5 lg:gap-4">
            <span className="h-2 w-8 rounded-full bg-[#016f73] sm:h-2.5 sm:w-10 lg:h-3 lg:w-12" />
            <span className="h-2 w-8 rounded-full bg-[#a48f99] sm:h-2.5 sm:w-10 lg:h-3 lg:w-12" />
            <span className="h-2 w-8 rounded-full bg-[#a48f99] sm:h-2.5 sm:w-10 lg:h-3 lg:w-12" />
          </div>
        </div>
      </div>
    </section>
  )
}