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
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6"
import { useCart } from "@/components/providers/cart-provider"
import { NAV_SOCIALS, NAV_TOP_LINKS } from "@/constants"
import { formatPrice, truncateText } from "@/lib/utils"
import type { Product } from "@/types"

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

function getBestRatedProducts(products: Product[]) {
  return [...products]
    .sort((a, b) => {
      if (b.rating.rate !== a.rating.rate) {
        return b.rating.rate - a.rating.rate
      }
      return b.rating.count - a.rating.count
    })
    .slice(0, 3)
}

function getClosestProducts(products: Product[], query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    return getBestRatedProducts(products)
  }

  const ranked = products.map((product) => {
    const title = product.title.toLowerCase()
    const category = product.category.toLowerCase()
    const description = product.description.toLowerCase()

    let score = product.rating.rate * 10

    if (title === normalizedQuery) score += 1000
    if (title.startsWith(normalizedQuery)) score += 700

    const titleIndex = title.indexOf(normalizedQuery)
    if (titleIndex >= 0) score += 300 - Math.min(titleIndex, 250)

    if (category.startsWith(normalizedQuery)) score += 240
    if (category.includes(normalizedQuery)) score += 120
    if (description.includes(normalizedQuery)) score += 60

    for (const word of title.split(" ")) {
      if (word.startsWith(normalizedQuery)) {
        score += 320
      }
    }

    return { product, score }
  })

  return ranked
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      if (b.product.rating.rate !== a.product.rating.rate) {
        return b.product.rating.rate - a.product.rating.rate
      }
      return b.product.rating.count - a.product.rating.count
    })
    .slice(0, 3)
    .map((entry) => entry.product)
}

type HomeNavbarProps = {
  searchableProducts: Product[]
}

export function HomeNavbar({ searchableProducts }: HomeNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDesktopSearchFocused, setIsDesktopSearchFocused] = useState(false)
  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false)
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(0)

  const headerRef = useRef<HTMLDivElement>(null)
  const desktopSearchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const miniCartRef = useRef<HTMLDivElement>(null)
  const lastScrollYRef = useRef(0)

  const { items, totalItems, subtotal, removeItem } = useCart()
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const visibleItems = isHydrated ? items : []
  const visibleTotalItems = isHydrated ? totalItems : 0
  const visibleSubtotal = isHydrated ? subtotal : 0

  const suggestions = useMemo(
    () => getClosestProducts(searchableProducts, searchQuery),
    [searchQuery, searchableProducts],
  )

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node

      const clickedInsideDesktop = desktopSearchRef.current?.contains(target)
      const clickedInsideMobile = mobileSearchRef.current?.contains(target)
      const clickedInsideMiniCart = miniCartRef.current?.contains(target)

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsDesktopSearchFocused(false)
        setIsMobileSearchFocused(false)
      }

      if (!clickedInsideMiniCart) {
        setIsMiniCartOpen(false)
      }
    }

    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const observer = new ResizeObserver((entries) => {
      const nextHeight = entries[0]?.contentRect.height ?? header.offsetHeight
      setHeaderHeight(nextHeight)
    })

    observer.observe(header)
    setHeaderHeight(header.offsetHeight)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY <= 10) {
        setIsHeaderVisible(true)
        lastScrollYRef.current = currentY
        return
      }

      if (currentY < lastScrollYRef.current) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
        setIsMiniCartOpen(false)
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="w-full">
      <div style={{ height: headerHeight }} aria-hidden />

      <div
        ref={headerRef}
        className={`fixed top-0 right-0 left-0 z-50 w-full bg-(--winstore-nav-top) text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          isHeaderVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex w-full max-w-11/12 items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4 lg:gap-6 lg:px-8 lg:py-2">
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
            <div ref={desktopSearchRef} className="relative w-full">
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
                  value={searchQuery}
                  onFocus={() => setIsDesktopSearchFocused(true)}
                  onChange={(event) => setSearchQuery(event.target.value)}
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

              {isDesktopSearchFocused && suggestions.length > 0 && (
                <div className="absolute top-full right-0 left-0 z-40 mt-2 rounded-md border border-black/10 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.16)]">
                  <p className="px-2 py-1 text-xs font-medium tracking-wide text-[#6f6f6f] uppercase">
                    {searchQuery.trim() ? "Top matches" : "Best rated products"}
                  </p>

                  <ul className="mt-1 space-y-1">
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.id}`}
                          onClick={() => {
                            setIsDesktopSearchFocused(false)
                            setSearchQuery(product.title)
                          }}
                          className="grid grid-cols-[44px_1fr] items-center gap-2 rounded px-2 py-2 transition hover:bg-[#f4f6f8]"
                        >
                          <div className="relative h-10 w-10">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="40px"
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm text-[#1f1f1f]">{product.title}</p>
                            <p className="truncate text-xs text-[#6c6c6c]">{product.category}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

            <div ref={miniCartRef} className="relative">
              <button
                type="button"
                aria-label="Cart"
                onClick={() => setIsMiniCartOpen((prev) => !prev)}
                className="relative flex items-center gap-2 text-white/95"
              >
                {visibleTotalItems > 0 && (
                  <span className="absolute -top-2 left-3 text-sm font-semibold text-(--winstore-cart-count)">
                    {visibleTotalItems}
                  </span>
                )}
                <ShoppingCart className="h-7 w-7" strokeWidth={1.8} />
                <span className="text-2xl font-normal">Cart</span>
              </button>

              {isMiniCartOpen && (
                <div className="absolute top-full right-0 z-50 mt-3 w-85 rounded-md border border-black/10 bg-white p-3 text-[#1f1f1f] shadow-[0_8px_30px_rgba(0,0,0,0.16)]">
                  <p className="text-sm font-semibold text-[#4a4a4a]">My Cart ({visibleTotalItems})</p>

                  {visibleItems.length === 0 ? (
                    <p className="mt-3 text-sm text-[#6c6c6c]">Your cart is empty.</p>
                  ) : (
                    <>
                      <ul className="mt-3 max-h-70 space-y-2 overflow-y-auto pr-1">
                        {visibleItems.slice(0, 4).map((item) => (
                          <li key={item.id} className="grid grid-cols-[48px_1fr_auto] items-center gap-2">
                            <div className="relative h-11 w-11">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="44px"
                                className="object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm">{truncateText(item.title, 32)}</p>
                              <p className="text-xs text-[#6c6c6c]">
                                {item.quantity} x {formatPrice(item.price)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-[#8b8b8b] hover:text-[#1f1f1f]"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 border-t border-[#e8e8e8] pt-3 text-sm">
                        <div className="flex items-center justify-between font-medium">
                          <span>Subtotal</span>
                          <span>{formatPrice(visibleSubtotal)}</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Link
                          href="/cart"
                          onClick={() => setIsMiniCartOpen(false)}
                          className="grid h-9 place-items-center rounded border border-[#cfd2d4] text-sm text-[#2f2f2f] transition hover:bg-[#f3f3f3]"
                        >
                          View Cart
                        </Link>
                        <Link
                          href="/cart"
                          onClick={() => setIsMiniCartOpen(false)}
                          className="grid h-9 place-items-center rounded bg-[#1ca6ae] text-sm text-white transition hover:bg-[#168f96]"
                        >
                          Checkout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
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
            <Link href="/cart" aria-label="Cart" className="relative rounded-md p-2 hover:bg-white/10">
              {visibleTotalItems > 0 && (
                <span className="absolute -top-0.5 right-0.5 text-xs font-semibold text-(--winstore-cart-count)">
                  {visibleTotalItems}
                </span>
              )}
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>

        <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:hidden">
          <div ref={mobileSearchRef} className="relative">
            <div className="flex h-10 items-center overflow-hidden rounded-md bg-white sm:h-11">
              <input
                type="text"
                aria-label="Search mobile"
                placeholder="Search for products"
                value={searchQuery}
                onFocus={() => setIsMobileSearchFocused(true)}
                onChange={(event) => setSearchQuery(event.target.value)}
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

            {isMobileSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full right-0 left-0 z-40 mt-2 rounded-md border border-black/10 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.16)]">
                <p className="px-2 py-1 text-[11px] font-medium tracking-wide text-[#6f6f6f] uppercase">
                  {searchQuery.trim() ? "Top matches" : "Best rated products"}
                </p>

                <ul className="mt-1 space-y-1">
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setIsMobileSearchFocused(false)
                          setIsMobileMenuOpen(false)
                          setSearchQuery(product.title)
                        }}
                        className="grid grid-cols-[40px_1fr] items-center gap-2 rounded px-2 py-2 transition hover:bg-[#f4f6f8]"
                      >
                        <div className="relative h-9 w-9">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm text-[#1f1f1f]">{product.title}</p>
                          <p className="truncate text-xs text-[#6c6c6c]">{product.category}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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