import {
  ChevronDown,
  Headphones,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react"
import Image from "next/image"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6"

const topLinks = [
  "Home",
  "Easy Monthly Installments",
  "Shop by Brands",
  "Become a Vendor",
]

const socials = [
  { name: "facebook", icon: FaFacebookF },
  { name: "twitter", icon: FaXTwitter },
  { name: "linkedin", icon: FaLinkedinIn },
  { name: "instagram", icon: FaInstagram },
]

export function HomeNavbar() {
  return (
    <header className="w-full border-b border-(--winstore-border) shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="bg-(--winstore-nav-top) text-white">
        <div className="mx-auto flex max-w-11/12 w-full items-center gap-6 px-4 py-2 lg:px-8">
          <div className="shrink-0">
            <a
              href="#"
              className="flex items-center"
              aria-label="Win Store Home"
            >
              <Image
                src="/logo.png"
                alt="WinStore"
                width={180}
                height={56}
                priority
                className="h-11 w-auto"
              />
            </a>
          </div>

          <div className="hidden min-w-0 shrink-0 items-center lg:flex lg:w-1/2">
            <div className="flex h-12 w-full overflow-hidden rounded-md bg-white">
              <button
                type="button"
                className="flex w-48 items-center justify-between border-r border-black/10 px-4 text-left text-base font-normal text-[var(--winstore-input-muted)]"
              >
                <span>All categories</span>
                <ChevronDown className="h-5 w-5 text-black/40" />
              </button>
              <input
                type="text"
                aria-label="Search for products"
                placeholder="Search for products"
                className="h-full min-w-0 flex-1 bg-white px-4 text-lg text-(--winstore-input-muted) outline-none placeholder:text-[var(--winstore-input-placeholder)]"
              />
              <button
                type="button"
                aria-label="Search"
                className="grid w-12 place-items-center bg-(--winstore-search-button) text-white transition hover:bg-[var(--winstore-search-button-hover)]"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <div className="text-left leading-tight text-white">
              <p className="text-sm font-light">Call Us Now</p>
              <p className="mt-1 flex items-center justify-start gap-2 text-xl font-medium">
                <Headphones className="h-5 w-5" />
                +011 5827918
              </p>
              <p className="mt-1 text-lg font-light">Sign In</p>
            </div>

            <button type="button" aria-label="Profile" className="text-white/95">
              <UserRound className="h-7 w-7" strokeWidth={1.8} />
            </button>

            <button type="button" aria-label="Wishlist" className="text-white/95">
              <Heart className="h-7 w-7" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="relative flex items-center gap-2 text-white/95"
            >
              <span className="absolute -top-2 left-3 text-sm font-semibold text-(--winstore-cart-count)">
                
              </span>
              <ShoppingCart className="h-7 w-7" strokeWidth={1.8} />
              <span className="text-2xl font-light">Cart</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <button type="button" aria-label="Open menu" className="rounded-md p-2 hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </button>
            <button type="button" aria-label="Cart" className="rounded-md p-2 hover:bg-white/10">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 lg:hidden">
          <div className="flex h-11 items-center overflow-hidden rounded-md bg-white">
            <input
              type="text"
              aria-label="Search mobile"
              placeholder="Search for products"
              className="h-full flex-1 px-4 text-sm text-[#757575] outline-none"
            />
            <button
              type="button"
              aria-label="Search"
              className="grid h-full w-11 place-items-center bg-[#a4a6a9] text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-(--winstore-nav-bottom) text-white">
        <div className="mx-auto hidden max-w-11/12 w-full items-center justify-between px-4 py-4 lg:flex lg:px-8">
          <div className="flex items-center gap-10">
            <button
              type="button"
              className="flex items-end gap-4 text-xl font-light leading-tight"
            >
              <Menu className="h-6 w-6" />
              <span>
                Browse By Category
              </span>
            </button>
            <nav aria-label="Primary" className="flex items-center gap-12">
              {topLinks.map((link) => (
                <a key={link} href="#" className="text-xl font-light transition hover:text-white/80">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/40 transition hover:bg-white/10"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}