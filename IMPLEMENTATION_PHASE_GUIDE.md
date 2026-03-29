# WinStore Assessment — Phase-by-Phase Implementation Guide

This guide is built from:
- The project PRD in this repository
- The attached WinStore reference screenshot
- The assessment brief constraints (App Router + Server Actions only)

It is designed as an execution checklist so you can build, verify, and submit without missing requirements.

---

## 1. Design and Requirement Analysis Summary

### What must be pixel-accurate
1. Header with two rows (top utility/search row + category/nav row)
2. Hero area with promotional text, CTA button, discount badge, and slide indicators
3. Category showcase strip under hero
4. New Arrivals section (limit 10 cards)
5. Best Deals tabbed section (category-based products)
6. Footer with 4 columns + payment and copyright strip

### API and architecture constraints you must enforce
1. Use App Router only under app/
2. Use TypeScript throughout
3. Use Tailwind for styling
4. All API reads happen in server actions only
5. No fetch/axios in client components
6. No Redux/Zustand (local state only where needed)

### Data-to-UI assumptions to implement (document in README)
1. Original/strike price is synthetic: rounded product price × 1.2
2. Best Deals labels are mapped to actual API categories (4 categories)
3. Hero slides are static demo data
4. Add to Cart is UI-only (no backend cart service)
5. Category images are static assets mapped by category name

---

## 2. Phase Plan (Execution Order)

## Phase 1 — Project Foundation and Guardrails

### Goal
Lock in project conventions so every later phase remains compliant with the assessment rules.

### Steps
1. Confirm dependencies are installed and app runs locally.
2. Add environment files:
   - .env.local
   - .env.example
3. Set NEXT_PUBLIC_API_BASE_URL to the provided base URL.
4. Create folders if missing:
   - actions
   - constants
   - types
   - components/layout
   - components/home
   - components/product
   - components/ui
5. Add lint/check scripts (if absent): lint, typecheck, build.
6. Add a manual rule note in README: no client-side fetch for API calls.

### Done Criteria
1. App boots successfully.
2. Env variables are read on server side.
3. Basic folder skeleton matches architecture.

### Validation
1. npm run dev
2. npm run lint
3. npm run build

---

## Phase 2 — Domain Types, Constants, and Utilities

### Goal
Centralize shared contracts and static data before UI composition.

### Steps
1. Define API types in types/index.ts:
   - Product
   - Category
   - ApiResponse generic
2. Add constants/index.ts:
   - BASE URL fallback helper
   - HERO_SLIDES (static)
   - CATEGORY_IMAGE_MAP
   - BEST_DEALS_TABS
   - NAV links and footer link groups
3. Expand lib/utils.ts with helpers:
   - formatPrice(number)
   - calculateOriginalPrice(number) using 1.2 multiplier
   - truncateText(text, maxLength)
   - formatCategoryName(name)
4. Keep these functions pure and reusable.

### Done Criteria
1. No any types used.
2. All static design data is centralized.
3. Utility functions are testable and deterministic.

### Validation
1. Typecheck passes.
2. Utility usage compiles cleanly in components.

---

## Phase 3 — Server Actions Layer (API Integration Core)

### Goal
Implement all API communication in server actions with robust error handling and caching.

### Steps
1. Create actions/category.actions.ts with use server.
2. Implement getCategories with revalidate 3600.
3. Create actions/product.actions.ts with use server.
4. Implement:
   - getAllProducts with revalidate 60
   - getProductById with revalidate 300
   - getProductsByCategory with revalidate 60
5. For each action:
   - Check response ok
   - Parse JSON safely
   - Validate success flag
   - Return normalized data shape
   - Log useful error context
6. Decide fallback behavior:
   - Empty arrays for list APIs on recoverable failure
   - Throw on product-by-id if detail page must show not-found

### Done Criteria
1. Every API endpoint is reachable through actions only.
2. No UI component directly calls remote API via fetch.
3. Caching rules match PRD.

### Validation
1. Run local page rendering that consumes each action.
2. Verify response failures do not crash unrelated sections.

---

## Phase 4 — Layout Shell (Navbar, Secondary Nav, Footer)

### Goal
Build reusable page chrome matching screenshot proportions and styling.

### Steps
1. Build components/layout/Navbar.tsx as server component.
2. Add NavbarSearch as client component for controlled search input UI only.
3. Add secondary navigation row (Browse by category + links + social icons).
4. Build components/layout/Footer.tsx with 4 content columns and bottom payment strip.
5. Wire layout shell in app/layout.tsx so all pages share consistent chrome.
6. Apply color tokens close to PRD:
   - primary teal
   - dark navy/charcoal background
   - muted text color

### Done Criteria
1. Desktop and mobile header behavior is usable.
2. Footer structure and visual density match reference.
3. Layout wraps all routes consistently.

### Validation
1. Visual check against screenshot at desktop width.
2. Mobile check for overflow and wrapping.

---

## Phase 5 — Shared Product UI Building Blocks

### Goal
Create reusable product-card primitives used across home, category, and detail pages.

### Steps
1. Add components/ui:
   - SectionHeader
   - PriceTag
   - Badge
2. Add components/product:
   - StarRating
   - AddToCartButton (client)
   - ProductCard
   - ProductGrid
3. Ensure ProductCard supports:
   - Image
   - Truncated title
   - Original + sale price
   - Add to cart action
4. Use next/image with proper sizes and object-fit.
5. Keep card dimensions consistent to avoid layout jumps.

### Done Criteria
1. Card component reused in at least two sections.
2. No duplicated pricing logic.
3. Add to cart interaction works without backend dependency.

### Validation
1. Inspect card rendering with long titles and edge prices.
2. Confirm no hydration mismatch warnings.

---

## Phase 6 — Homepage Composition

### Goal
Build all major homepage sections to match visual structure and behavior.

### Steps
1. HeroBanner (client): static slides, indicators, CTA, discount badge.
2. CategoryShowcase (server): load categories action + image mapping.
3. NewArrivals (server): call getAllProducts and slice first 10.
4. BestDeals:
   - Render tabs from mapped categories
   - Load initial tab data on server
   - On tab switch use useTransition and invoke server action
5. Compose in app/page.tsx in exact screenshot order.
6. Tune spacing, section heights, and typography hierarchy.

### Done Criteria
1. Hero, category strip, New Arrivals, Best Deals all render.
2. New Arrivals strictly limited to 10 products.
3. Best Deals tab switch updates products correctly.

### Validation
1. Manual comparison with screenshot for spacing and section order.
2. Confirm no direct API fetch from client files.

---

## Phase 7 — Inner Routes and Navigation Flow

### Goal
Complete required functional pages and route linking.

### Steps
1. Create app/products/[id]/page.tsx:
   - Product details
   - Breadcrumb
   - Rating and category badge
   - Related products from same category
2. Create app/category/[name]/page.tsx:
   - Category heading
   - Full product grid
3. Ensure product cards link to product detail page.
4. Ensure category UI elements link to category route.
5. Handle invalid ids/names with notFound where appropriate.

### Done Criteria
1. Product detail route works for valid ids.
2. Category route shows products for each API category.
3. Navigation between home, category, and product is seamless.

### Validation
1. Open multiple product ids directly.
2. Open encoded category routes (apostrophes in category names).

---

## Phase 8 — Loading, Error, Empty, and Not Found States

### Goal
Harden UX for network delays and failures (assessment scoring focus).

### Steps
1. Add app/loading.tsx (global skeleton).
2. Add route-level loading where useful.
3. Add app/error.tsx with retry capability.
4. Add app/not-found.tsx for invalid routes/entities.
5. Add empty-state UI for no products in any section.
6. Ensure action-level errors are either surfaced or safely degraded.

### Done Criteria
1. No blank sections during loading/failure.
2. Error handling is visible and recoverable.
3. Invalid routes do not crash the app.

### Validation
1. Simulate API failure and confirm graceful fallbacks.
2. Confirm error boundary and not-found behavior manually.

---

## Phase 9 — Pixel Fit, Responsiveness, and Performance Pass

### Goal
Close the gap between implementation and design reference.

### Steps
1. Compare desktop layout against screenshot section-by-section.
2. Adjust:
   - Font sizes/weights
   - Vertical rhythm
   - Button dimensions
   - Card gutters
   - Footer spacing
3. Verify responsive breakpoints:
   - Mobile < 640: stacked nav and fewer product columns
   - Tablet 640-1024: 2-3 columns
   - Desktop > 1024: 6-column rhythm in product rows where intended
4. Optimize images with next/image and meaningful sizes.
5. Remove layout shift risks by setting consistent image boxes.

### Done Criteria
1. UI resembles reference at major breakpoints.
2. No horizontal overflow on mobile.
3. Largest sections render without jumpy reflow.

### Validation
1. Browser responsive mode screenshots at mobile, tablet, desktop.
2. Quick Lighthouse run for basic performance/accessibility sanity.

---

## Phase 10 — Submission Packaging

### Goal
Deliver exactly what assessment asks for.

### Steps
1. Rewrite README with:
   - Setup commands
   - Architecture explanation
   - Assumptions section
2. Include server-action-only API policy explicitly.
3. Commit .env.example.
4. Run final checks:
   - lint
   - build
   - typecheck
5. Push GitHub repository.
6. Deploy to Vercel and verify production routes.
7. Add live URL to README.

### Done Criteria
1. GitHub repo is clean and runnable.
2. Vercel deployment is live and complete.
3. README clearly documents architecture and assumptions.

---

## 3. Compliance Checklist (Final Gate)

Use this before submission.

1. App Router only, no pages directory used
2. All remote API calls live in server actions only
3. No client-side fetch/axios for remote data
4. New Arrivals limited to 10 products
5. Best Deals uses category mapping and tab switching
6. Product detail and category pages fully functional
7. Loading, error, and not-found states implemented
8. Responsive behavior verified at mobile/tablet/desktop
9. README includes run instructions, architecture, assumptions
10. .env.example committed
11. GitHub URL and Vercel URL ready for submission

---

## 4. Recommended Daily Execution Plan

If you want to complete quickly with low risk:

1. Day 1: Phases 1-3
2. Day 2: Phases 4-6
3. Day 3: Phases 7-8
4. Day 4: Phases 9-10 + final polish

This sequence minimizes rework and keeps API correctness in place before UI complexity grows.
