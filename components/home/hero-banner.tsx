import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-y border-[#d9d6bf] bg-[#ece9cf]">
      <div className="relative mx-auto w-full max-w-480">
        <div className="relative h-75 w-full sm:h-90 lg:h-107.5">
          <Image
            src="/banner.png"
            alt="Promotional banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#f2efd6]/90 via-[#f2efd6]/35 to-transparent" />

          <div className="absolute left-[6%] top-1/2 z-10 w-[50%] -translate-y-1/2 sm:w-[46%] lg:w-[38%]">
            <h1 className="text-4xl leading-[0.95] font-light text-[#111] sm:text-5xl lg:text-[72px]">
              Shop <span className="text-[#12a3b2]">Computer</span>
              <br />
              <span className="text-[#12a3b2]">& experience</span>
            </h1>

            <p className="mt-4 text-sm leading-snug text-[#232323] sm:text-base lg:text-[20px]">
              You Cannot Inspect Quality Into The Product; It Is Already There.
              <br />
              I Am Not A Product Of My Circumstances. I Am A Product Of My
              Decisions.
            </p>

            <button
              type="button"
              className="mt-5 rounded-md bg-[#19a8e5] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1198d1] lg:px-7 lg:py-2.5 lg:text-lg"
            >
              View More
            </button>
          </div>

          <div className="absolute right-[10.5%] top-[11%] z-10 grid h-[95px] w-[95px] place-items-center rounded-full bg-gradient-to-b from-[#f7b733] to-[#f07f2e] text-center text-white sm:h-[120px] sm:w-[120px] lg:h-[210px] lg:w-[210px]">
            <p className="text-2xl leading-none font-light sm:text-3xl lg:text-[64px]">
              40%
              <br />
              <span className="text-2xl sm:text-3xl lg:text-[64px]">Off</span>
            </p>
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 lg:bottom-5">
            <span className="h-3 w-12 rounded-full bg-[#016f73]" />
            <span className="h-3 w-12 rounded-full bg-[#a48f99]" />
            <span className="h-3 w-12 rounded-full bg-[#a48f99]" />
          </div>
        </div>
      </div>
    </section>
  )
}