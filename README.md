# WinStore - Next.js E-Commerce Assessment

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open:

http://localhost:3000

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - run production build
- `npm run lint` - run lint checks
- `npm run typecheck` - run TypeScript checks

## Environment

`.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=https://mm-assesment-server.vercel.app/api/v1
```

## Architecture

- Framework: Next.js 16 App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Data layer: Server Actions under `actions/`
- Rendering: Server Components by default, Client Components only for interactive UI (navbar mobile menu, tabs, sliders)

### API Policy

All remote API calls are handled in server actions only.
No client component performs remote `fetch`/`axios` calls.

## Implemented Routes

- `/` Home page
- `/products/[id]` Product details page
- `/category/[name]` Category listing page

## Caching Strategy

- Products list: revalidate 60s
- Products by category: revalidate 60s
- Product details: revalidate 300s
- Categories: revalidate 3600s

## Assumptions

1. Original (strike) price is UI-only and computed as `price * 1.2`.
2. Hero section content is static demo data.
3. Add to cart is UI-only (no backend cart service).
4. Category card imagery is statically mapped by category name.

## Status Notes

- New Arrivals is limited to 10 products.
- Global `loading`, `error`, and `not-found` pages are implemented.
- Shared `types` and `constants` modules are included for reuse.

## Deployment

- Live URL: https://winstore-kohl.vercel.app/
- GitHub Repository: https://github.com/ornobaadi/winstore

## Design Reference

- Figma: https://www.figma.com/design/UAQ0gFBqYduDOatXQqBJIY/E-commerce-web-site?node-id=0-1&t=axIG6ScXeXkDDxdG-1

## Responsive Notes

- Navbar and secondary links are mobile-friendly with hamburger toggle behavior.
- Category and New Arrivals use horizontal carousel interactions with contextual arrows.
- Product detail related items use mobile-first single-column layout for cleaner odd/even behavior.

## Pixel-Fit Validation

- Desktop: header rows, hero block, category strip, New Arrivals, Best Deals, and footer structure aligned to reference hierarchy.
- Tablet: product grids collapse to intermediate columns with preserved spacing rhythm.
- Mobile: stacked flow verified for navbar controls, product sections, and detail/related product layouts.
- Known intentional adaptation: Best Deals tab labels use API-category mapping (`ELECTRONICS`, `JEWELERY`, `MEN'S CLOTHING`, `WOMEN'S CLOTHING`) per assessment assumption.

## Performance and Accessibility Validation

- Production build passes (`npm run build`).
- Product images use Next.js image optimization (removed remaining `unoptimized` overrides).
- Product and category pages define route-level metadata for SEO and sharing previews.
- Global metadata, OpenGraph, and Twitter card metadata configured in app layout.

## SEO

- Global SEO metadata is configured via Next.js Metadata API in `app/layout.tsx`.
- Route-level metadata is configured for home, product detail, category, and utility pages.
- Dynamic metadata is generated for product and category routes.

## Final Compliance Audit

- App Router only: implemented under `app/`
- Server actions only for remote API calls: implemented under `actions/`
- No client-side `fetch`/`axios`: verified in component files
- New Arrivals limited to 10: implemented on home page
- Best Deals tab switching via `useTransition` + server action: implemented
- Product and category routes: implemented and linked
- Loading/error/not-found states: implemented

## Final Submission Checklist

- [x] Public GitHub repository link included
- [x] Live Vercel URL included
- [x] `.env.example` committed
- [x] README includes setup instructions, architecture, assumptions
- [x] App Router-only structure (no `pages/` directory)
- [x] Server Actions-only remote API interactions
- [x] Responsive behavior across mobile/tablet/desktop
- [x] Error/loading/not-found states implemented
