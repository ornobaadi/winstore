"use client"

import {
  ChevronDown,
  Headphones,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6"
import { NAV_SOCIALS, NAV_TOP_LINKS } from "@/constants"

const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
}

const socials = NAV_SOCIALS.map((name) => ({
  name,
  icon: socialIcons[name],
}))

const topLinks = NAV_TOP_LINKS

const navHrefMap: Record<string, string> = {
  Home: "/",
  "Easy Monthly Installments": "/easy-monthly-installments",
  "Shop by Brands": "/shop-by-brands",
  "Become a Vendor": "/become-a-vendor",
}

const socialHrefMap: Record<string, string> = {
  facebook: "https://www.facebook.com",
  twitter: "https://x.com",
  linkedin: "https://www.linkedin.com",
  instagram: "https://www.instagram.com",
}

export function HomeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-(--winstore-border) shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="bg-(--winstore-nav-top) text-white">
        <div className="mx-auto flex w-full max-w-11/12 items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4 lg:gap-6 lg:px-8 lg:py-5">
          <div className="shrink-0">
            <Link href="/" className="flex items-center" aria-label="Win Store Home">
              <Image
                src="/logo.png"
                alt="WinStore"
                width={180}
                height={56}
                priority
                className="h-8 w-auto sm:h-10 lg:h-11"
              />
            </Link>
          </div>

          <div className="hidden min-w-0 shrink-0 items-center lg:flex lg:w-1/2">
            <div className="flex h-12 w-full overflow-hidden rounded-md bg-white">
              <button
                type="button"
                className="flex w-48 items-center justify-between border-r border-black/10 px-4 text-left text-base font-normal text-(--winstore-input-muted)"
              >
                <span>All categories</span>
                <ChevronDown className="h-5 w-5 text-black/40" />
              </button>
              <input
                type="text"
                aria-label="Search for products"
                placeholder="Search for products"
                className="h-full min-w-0 flex-1 bg-white px-4 text-lg text-(--winstore-input-muted) outline-none placeholder:text-(--winstore-input-placeholder)"
              />
              <button
                type="button"
                aria-label="Search"
                className="grid w-12 place-items-center bg-(--winstore-search-button) text-white transition hover:bg-(--winstore-search-button-hover)"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <div className="text-left leading-tight text-white">
              <p className="text-sm font-normal">Call Us Now</p>
              <p className="mt-1 flex items-center justify-start gap-2 text-xl font-medium">
                <Headphones className="h-5 w-5" />
                +011 5827918
              </p>
              <p className="mt-1 text-lg font-normal">Sign In</p>
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
              <span className="text-2xl font-normal">Cart</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-md p-2 transition hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
            <button type="button" aria-label="Cart" className="rounded-md p-2 hover:bg-white/10">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:hidden">
          <div className="flex h-10 items-center overflow-hidden rounded-md bg-white sm:h-11">
            <input
              type="text"
              aria-label="Search mobile"
              placeholder="Search for products"
              className="h-full flex-1 px-4 text-sm text-[#757575] outline-none"
            />
            <button
              type="button"
              aria-label="Search"
              className="grid h-full w-10 place-items-center bg-[#a4a6a9] text-white sm:w-11"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-white/15 transition-all duration-300 ease-out lg:hidden ${
            isMobileMenuOpen ? "max-h-105 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 px-3 py-4 sm:px-4 sm:py-5">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md bg-white/10 px-4 py-3 text-left text-base font-medium"
            >
              <span>Browse By Category</span>
              <ChevronDown className="h-5 w-5" />
            </button>

            <nav aria-label="Mobile primary" className="grid gap-2">
              {topLinks.map((link) => (
                <Link
                  key={link}
                  href={navHrefMap[link] ?? "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md px-4 py-2.5 text-base font-light transition hover:bg-white/10"
                >
                  {link}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5 px-2 pt-1">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={socialHrefMap[social.name]}
                  aria-label={social.name}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/90 transition-transform duration-200 hover:scale-110 hover:text-white"
                >
                  <social.icon size={26} />
                </a>
              ))}
            </div>
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
                <Link
                  key={link}
                  href={navHrefMap[link] ?? "/"}
                  className="text-xl font-light transition hover:text-white/80"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={socialHrefMap[social.name]}
                aria-label={social.name}
                target="_blank"
                rel="noreferrer"
                className="text-white/90 transition-transform duration-200 hover:scale-110 hover:text-white"
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}