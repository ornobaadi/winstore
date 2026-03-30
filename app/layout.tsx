import type { Metadata } from "next"
import { Geist_Mono, Outfit } from "next/font/google"

import "./globals.css"
import { getCategories } from "@/actions/category.actions"
import { getAllProducts } from "@/actions/product.actions"
import { CartProvider } from "@/components/providers/cart-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { HomeNavbar } from "@/components/layout/home-navbar"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://winstore-kohl.vercel.app"),
  title: {
    default: "WinStore | Modern Online Shopping",
    template: "%s | WinStore",
  },
  description:
    "WinStore is a modern e-commerce storefront for electronics, jewelery, and fashion with curated deals and product discovery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WinStore | Modern Online Shopping",
    description:
      "Browse categories, latest arrivals, and best deals across electronics, jewelery, and clothing.",
    url: "https://winstore-kohl.vercel.app",
    siteName: "WinStore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WinStore | Modern Online Shopping",
    description:
      "Browse categories, latest arrivals, and best deals across electronics, jewelery, and clothing.",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [searchableProducts, searchableCategories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ])

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", outfit.variable)}
    >
      <body>
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <HomeNavbar
                searchableProducts={searchableProducts}
                searchableCategories={searchableCategories}
              />
              {children}
              <Footer />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
