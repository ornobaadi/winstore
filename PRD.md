# PRD — WinStore E-Commerce (Next.js Assessment)

> **Status:** Draft v1.0  
> **Stack:** Next.js 16+ · App Router · TypeScript · Tailwind CSS · Server Actions  
> **Deadline:** Per assessment brief  
> **APIs:** `https://mm-assesment-server.vercel.app/api/v1`

---

## 1. Project Overview

Build a pixel-perfect, production-quality e-commerce storefront based on the provided Figma design and the WinStore screenshot. The app is purely a **frontend consumer** of the given REST APIs — no database, no auth, no server-side state management libraries.

### Goals
- Reproduce the WinStore UI faithfully (layout, colours, typography, spacing, responsiveness)
- Integrate all four API endpoints cleanly via **Server Actions only**
- Demonstrate mastery of Next.js 16 App Router patterns (RSC, streaming, caching)
- Submit a clean, well-documented GitHub repo + live Vercel deployment

---

## 2. Constraints & Rules (Non-Negotiable)

| Rule | Detail |
|---|---|
| ✅ App Router only | Use `app/` directory exclusively |
| ✅ Server Actions for all API calls | `"use server"` directive — no `fetch()` in any client component |
| ✅ TypeScript everywhere | Strict mode preferred |
| ✅ Tailwind CSS | No other CSS framework |
| ❌ No Redux / Zustand | Plain React state (`useState`) is fine where a Client Component is truly needed |
| ❌ No `pages/` directory | |
| ❌ No direct DB calls | Only the given APIs |
| ❌ No `axios` in client components | |

---

## 3. API Reference

### 3.1 Endpoints

| Name | URL | Method | Notes |
|---|---|---|---|
| All Products | `/products` | GET | Returns latest 20 products, sorted by id desc |
| Categories | `/products/categories` | GET | Returns 4 categories |
| Products by Category | `/products/category/:name` | GET | e.g. `/category/jewelery` |
| Single Product | `/products/:id` | GET | e.g. `/products/1` |

Base URL: `https://mm-assesment-server.vercel.app/api/v1`

### 3.2 Response Shape

**All Products / Category Products**
```ts
{
  success: boolean;
  message: string;
  data: Product[];
}
```

**Single Product**
```ts
{
  success: boolean;
  message: string;
  data: Product;
}
```

**Categories**
```ts
{
  success: boolean;
  message: string;
  data: { id: number; name: string }[];
}
```

### 3.3 Product Type (canonical)
```ts
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;          // "electronics" | "jewelery" | "men's clothing" | "women's clothing"
  image: string;
  rating: {
    rate: number;            // e.g. 3.9
    count: number;           // e.g. 120
  };
};

export type Category = {
  id: number;
  name: string;
};
```

### 3.4 Caching Strategy

| Endpoint | Revalidation | Rationale |
|---|---|---|
| `/products` | `revalidate: 60` | New arrivals section — reasonably fresh |
| `/products/categories` | `revalidate: 3600` | Rarely changes |
| `/products/category/:name` | `revalidate: 60` | Best deals tabs |
| `/products/:id` | `revalidate: 300` | Product detail page |

---

## 4. Pages & Routes

```
app/
├── page.tsx                     → Homepage (/)
├── products/
│   └── [id]/
│       └── page.tsx             → Single Product Detail (/products/1)
├── category/
│   └── [name]/
│       └── page.tsx             → Category Listing (/category/electronics)
└── layout.tsx                   → Root layout (Navbar + Footer)
```

---

## 5. Component Architecture

### 5.1 Folder Structure

```
src/
├── app/                         ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/[id]/page.tsx
│   └── category/[name]/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           ← Server Component
│   │   ├── NavbarSearch.tsx     ← Client Component (search input interaction)
│   │   ├── Footer.tsx           ← Server Component
│   │   └── CategoryBar.tsx      ← Server Component (Browse By Category bar)
│   │
│   ├── home/
│   │   ├── HeroBanner.tsx       ← Client Component (carousel/slider)
│   │   ├── CategoryShowcase.tsx ← Server Component (4 category cards with images)
│   │   ├── NewArrivals.tsx      ← Server Component (wraps ProductGrid, limit 10)
│   │   └── BestDeals.tsx        ← Client Component (tabbed by category)
│   │
│   ├── product/
│   │   ├── ProductCard.tsx      ← Server Component
│   │   ├── ProductGrid.tsx      ← Server Component
│   │   ├── ProductDetail.tsx    ← Server Component
│   │   ├── AddToCartButton.tsx  ← Client Component (button interaction)
│   │   └── StarRating.tsx       ← Server Component
│   │
│   └── ui/
│       ├── Badge.tsx
│       ├── PriceTag.tsx         ← Shows original + discounted price
│       └── SectionHeader.tsx    ← "New Arrivals", "Best Deals" titles
│
├── actions/                     ← ALL API calls live here ("use server")
│   ├── product.actions.ts
│   └── category.actions.ts
│
├── types/
│   └── index.ts                 ← Product, Category, ApiResponse types
│
├── lib/
│   └── utils.ts                 ← formatPrice, truncateText, generateDiscount helpers
│
└── constants/
    └── index.ts                 ← BASE_URL, CATEGORY_IMAGES map, NAV_LINKS
```

### 5.2 Server vs Client Component Decision

| Component | Type | Reason |
|---|---|---|
| `Navbar` | Server | Static links, no interaction |
| `NavbarSearch` | **Client** | Controlled input state |
| `HeroBanner` | **Client** | Carousel needs `useState`/`useEffect` or a slider lib |
| `CategoryShowcase` | Server | Pure display, data from server action |
| `NewArrivals` | Server | Data fetched at build/revalidate |
| `BestDeals` | **Client** | Tab switching (active category state) — but data pre-fetched via server action passed as props |
| `ProductCard` | Server | Stateless display |
| `AddToCartButton` | **Client** | Click handler |
| `ProductDetail` | Server | Static display |

---

## 6. Server Actions Specification

### `actions/product.actions.ts`

```ts
"use server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllProducts(): Promise<Product[]>
// → GET /products, revalidate: 60
// → Returns data array (max 20, UI slices to 10 for New Arrivals)

export async function getProductById(id: number): Promise<Product>
// → GET /products/:id, revalidate: 300
// → Throws if !success or network error

export async function getProductsByCategory(category: string): Promise<Product[]>
// → GET /products/category/:name, revalidate: 60
// → Used for Best Deals tabs
```

### `actions/category.actions.ts`

```ts
"use server";

export async function getCategories(): Promise<Category[]>
// → GET /products/categories, revalidate: 3600
```

### Error Handling Pattern (inside every action)

```ts
try {
  const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
} catch (err) {
  console.error("[getAllProducts]", err);
  return [];      // or re-throw depending on context
}
```

---

## 7. UI Sections — Detailed Spec

### 7.1 Navbar
- **Left:** Logo "WIN store" (teal accent on "store")
- **Center:** Category dropdown (`All categories`) + Search input + Search button (teal)
- **Right:** Call us number, Sign In link, Wishlist icon, Cart icon with item count
- **Mobile:** Hamburger menu collapses center/right sections
- **Second row:** "Browse By Category" toggle | Home | Easy Monthly Installments | Shop by Brands | Become a Vendor | Social icons (FB, Twitter, LinkedIn, Instagram)
- Data source: Static (no API) — use `constants/index.ts`

### 7.2 Hero Banner
- Full-width image carousel
- Current slide: "Shop Computer & experience" with teal title accent
- "40% Off" badge (orange/yellow circle, top-right)
- "View More" CTA button (teal, outlined)
- Dot indicators at bottom
- **Data:** Static demo data (no API) — define in `constants/index.ts` as `HERO_SLIDES`

### 7.3 Category Showcase (below banner)
- Horizontal scrollable row of 4+ category cards
- Each card: Background image, category name (e.g. "Electronics"), "Shop" teal link
- Arrow navigation buttons (left/right)
- **Data:** From `getCategories()` — map category name → a relevant stock image (define `CATEGORY_IMAGE_MAP` in constants)
- **Mapping:**

```ts
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "electronics": "/images/categories/electronics.jpg",
  "jewelery": "/images/categories/jewelery.jpg",
  "men's clothing": "/images/categories/mens.jpg",
  "women's clothing": "/images/categories/womens.jpg",
};
```

### 7.4 New Arrivals
- Section header: "New **Arrivals**" (bold accent on second word)
- Horizontal scrollable grid of product cards
- **Limit: 10 products** (slice first 10 from `getAllProducts()`)
- Each card: Product image (contained, white bg), title (truncated), original price (strikethrough grey), sale price (teal/green), "Add to cart" teal button
- **Note:** API doesn't return an original/compare-at price — generate a fake "original" price by multiplying `price * 1.2` and rounding, for display purposes (clearly document this assumption)

### 7.5 Best Deals (Tabbed)
- Section header: "**Best** Deals"
- Tab bar: KITCHEN APPLIANCES | CONSOLES | TV & VIDEOS | CELL PHONES | GROCERY (← → scroll arrows)
- **Since API categories don't match these labels**, map them:

```ts
export const BEST_DEALS_TABS = [
  { label: "ELECTRONICS",     apiCategory: "electronics" },
  { label: "JEWELERY",        apiCategory: "jewelery" },
  { label: "MEN'S CLOTHING",  apiCategory: "men's clothing" },
  { label: "WOMEN'S CLOTHING",apiCategory: "women's clothing" },
];
```

  Document this assumption clearly in README.
- Default active tab: first tab (electronics)
- On tab change: call `getProductsByCategory(apiCategory)` — **this must be a Server Action called from the Client Component via `useTransition`**
- Grid: 2 rows × 6 columns on desktop, fewer on mobile
- Each card: Same structure as New Arrivals cards

### 7.6 Footer
- **Dark background** (#1a1a2e or similar dark navy/charcoal matching design)
- **Col 1:** Logo, "Got questions? Call us 24/7!", phone numbers, Contact Info email, social icons
- **Col 2:** Trending (Installments, Electronics, Grocery, Health & Beauty, Home Appliances, Mobile Accessories)
- **Col 3:** Information (About Us, Contact Us, FAQs, Shipping & Return, Privacy Policy, Terms & Conditions)
- **Col 4:** Customer Care (My Account, Track Your Order, Recently Viewed, Wishlist, Compare, Become a Vendor)
- **Bottom bar:** Copyright "© 2021 Winstore. All Rights Reserved." | Payment icons (Visa, Mastercard, Cash, etc.)
- **Data:** Static — define in `constants/index.ts`

### 7.7 Product Detail Page (`/products/[id]`)
- Breadcrumb: Home > Category > Product Title
- Left: Large product image
- Right: Title, Rating (stars + count), Price, Description, Add to Cart button, category badge
- Below: Related products from same category (call `getProductsByCategory`)

### 7.8 Category Page (`/category/[name]`)
- Page title: Category name (formatted)
- Product grid: All products in that category
- Each product links to `/products/[id]`

---

## 8. Colour & Typography

| Token | Value | Usage |
|---|---|---|
| `primary` | `#00b5b5` (teal) | Buttons, links, accents, active tabs underline |
| `primary-dark` | `#008f8f` | Button hover |
| `dark-bg` | `#1d2334` | Navbar, Footer background |
| `text-primary` | `#1a1a1a` | Body text |
| `text-muted` | `#888888` | Labels, strikethrough price |
| `sale-price` | `#00b5b5` | Product sale price |
| `badge-bg` | `#f5a623` | "Off" badge on hero |
| `white` | `#ffffff` | Card backgrounds |

**Tailwind config additions** (`tailwind.config.ts`):
```ts
theme: {
  extend: {
    colors: {
      primary: "#00b5b5",
      "primary-dark": "#008f8f",
      "dark-bg": "#1d2334",
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
    },
  },
},
```

---

## 9. Responsive Breakpoints

| Breakpoint | Columns (Product Grid) | Notes |
|---|---|---|
| Mobile (`< 640px`) | 1 | Stack navbar, hide second nav row |
| Tablet (`640–1024px`) | 2–3 | Show category bar, collapse some nav items |
| Desktop (`> 1024px`) | 6 | Full layout as per Figma |

---

## 10. Environment Variables

**.env.local**
```
NEXT_PUBLIC_API_BASE_URL=https://mm-assesment-server.vercel.app/api/v1
```

**.env.example** (to commit)
```
NEXT_PUBLIC_API_BASE_URL=https://mm-assesment-server.vercel.app/api/v1
```

> Even though it's a public URL, keeping it in `.env` makes it configurable and is good practice.

---

## 11. Key Implementation Notes & Assumptions

### Assumptions
1. **Fake "original" price:** The API has no compare-at price. A fake original = `Math.round(price * 1.2 * 100) / 100` will be computed in `lib/utils.ts` and shown as strikethrough. This is clearly a UI-only decoration.
2. **Best Deals tab labels:** The Figma shows tabs like "Kitchen Appliances", "Consoles", etc., which don't match the API's 4 categories. The tabs will be renamed to match the actual API categories (Electronics, Jewelery, Men's Clothing, Women's Clothing).
3. **Hero Banner:** Static data — no API provides banner content.
4. **Add to Cart:** No cart backend — button will show a toast/alert for now. State can be held in a simple `useState` inside a Context (only if needed, kept minimal).
5. **Category images:** Static assets placed in `/public/images/categories/`. Sourced from Unsplash (free licence).
6. **Currency:** API prices appear to be in USD ($). Will display with `$` prefix.

### Architecture Notes
- All API calls are **server-only**. Data is fetched in Server Components or via Server Actions called with `useTransition` in Client Components.
- The `BestDeals` tab component is a Client Component but receives initial data (first tab) as a server-side prop. Switching tabs calls the Server Action.
- `next/image` is used for all images with appropriate `sizes` props for performance.
- `loading.tsx` files are added to each route segment for Suspense-based streaming.
- `error.tsx` files handle API failures gracefully with a retry button.

---

## 12. File-by-File Build Order (Recommended)

Follow this order to avoid circular dependencies and blocked work:

```
Phase 1 — Foundation
  1. Init project: npx create-next-app@latest --typescript --tailwind --app
  2. src/types/index.ts            ← Type definitions
  3. src/constants/index.ts        ← All static data
  4. src/lib/utils.ts              ← Helper functions
  5. tailwind.config.ts            ← Extend with brand colours
  6. .env.local + .env.example

Phase 2 — Server Actions
  7. src/actions/category.actions.ts
  8. src/actions/product.actions.ts

Phase 3 — Layout
  9. src/components/layout/Footer.tsx
  10. src/components/layout/Navbar.tsx
  11. src/components/layout/NavbarSearch.tsx  (Client)
  12. src/components/layout/CategoryBar.tsx
  13. app/layout.tsx

Phase 4 — Shared UI
  14. src/components/ui/SectionHeader.tsx
  15. src/components/ui/PriceTag.tsx
  16. src/components/ui/Badge.tsx
  17. src/components/product/StarRating.tsx
  18. src/components/product/AddToCartButton.tsx  (Client)
  19. src/components/product/ProductCard.tsx
  20. src/components/product/ProductGrid.tsx

Phase 5 — Homepage Sections
  21. src/components/home/HeroBanner.tsx      (Client — static)
  22. src/components/home/CategoryShowcase.tsx
  23. src/components/home/NewArrivals.tsx
  24. src/components/home/BestDeals.tsx       (Client — tabs)
  25. app/page.tsx                            (compose all sections)

Phase 6 — Inner Pages
  26. app/products/[id]/page.tsx
  27. app/category/[name]/page.tsx

Phase 7 — Polish
  28. app/loading.tsx (global + per-route)
  29. app/error.tsx
  30. app/not-found.tsx
  31. README.md
```

---

## 13. README Template (to deliver with submission)

```md
# WinStore — Next.js E-Commerce Assessment

## Getting Started

\`\`\`bash
git clone <repo-url>
cd winstore
npm install
cp .env.example .env.local
npm run dev
\`\`\`

Open http://localhost:3000

## Architecture

- **Framework:** Next.js 16 (App Router)
- **API Layer:** All calls go through Server Actions in `src/actions/`
- **Rendering:** Server Components by default; Client Components only for carousel, tabs, search input, and add-to-cart button
- **Caching:** Next.js fetch cache with per-endpoint revalidation (60s for products, 3600s for categories)
- **Styling:** Tailwind CSS with custom brand tokens

## Assumptions

1. Fake "original" price is computed as `price × 1.2` for display purposes only.
2. Best Deals tabs use actual API categories (Electronics, Jewelery, etc.) since the Figma tab labels (Kitchen Appliances, Consoles…) don't match.
3. Hero banner uses static demo data — no API endpoint provides this content.
4. Currency displayed as USD ($).

## Live Demo

https://<your-app>.vercel.app
```

---

## 14. Deliverables Checklist

- [ ] GitHub repository (public)
- [ ] Live Vercel deployment URL
- [ ] `.env.example` committed
- [ ] `README.md` with run instructions, architecture, assumptions
- [ ] Pixel-accurate homepage (Hero, Categories, New Arrivals, Best Deals, Footer)
- [ ] Working `/products/[id]` detail page
- [ ] Working `/category/[name]` listing page
- [ ] Zero client-side fetch calls (ESLint rule or manual audit)
- [ ] TypeScript — no `any` types
- [ ] Responsive on mobile, tablet, desktop
- [ ] Error states handled (empty data, API down)
- [ ] Loading states with Suspense / `loading.tsx`
```
