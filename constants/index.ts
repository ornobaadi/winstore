export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://mm-assesment-server.vercel.app/api/v1"

export const NAV_TOP_LINKS = [
  "Home",
  "Easy Monthly Installments",
  "Shop by Brands",
  "Become a Vendor",
]

export const NAV_SOCIALS = [
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
] as const

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1326&auto=format&fit=crop",
  jewelery:
    "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1025&auto=format&fit=crop",
  "men's clothing":
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
  "women's clothing":
    "https://images.unsplash.com/photo-1753161024053-4ef8b6237973?q=80&w=1631&auto=format&fit=crop",
}

export const BEST_DEALS_TABS = [
  { label: "ELECTRONICS", apiCategory: "electronics" },
  { label: "JEWELERY", apiCategory: "jewelery" },
  { label: "MEN'S CLOTHING", apiCategory: "men's clothing" },
  { label: "WOMEN'S CLOTHING", apiCategory: "women's clothing" },
]

export const FOOTER_TRENDING_LINKS = [
  "Installments",
  "Electronics",
  "Grocery",
  "Health & Beauty",
  "Home Appliances",
  "Mobile Accessories",
]

export const FOOTER_INFORMATION_LINKS = [
  "About Us",
  "Contact Us",
  "FAQs",
  "Shipping & Return",
  "Privacy policy",
  "Terms & Conditions",
]

export const FOOTER_CUSTOMER_CARE_LINKS = [
  "My Account",
  "Track Your Order",
  "Recently Viewed",
  "Wishlist",
  "Compare",
  "Become a Vendor",
]

export const HERO_SLIDES = [
  {
    id: 1,
    titlePrimary: "Shop",
    titleAccent: "Computer",
    titleSecondary: "& experience",
    description:
      "You Cannot Inspect Quality Into The Product; It Is Already There. I Am Not A Product Of My Circumstances. I Am A Product Of My Decisions.",
    badge: "40% Off",
    ctaLabel: "View More",
    image: "/banner.png",
  },
]
