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

Vercel URL: Pending deployment (add your live URL here before submission).

## Responsive Notes

- Navbar and secondary links are mobile-friendly with hamburger toggle behavior.
- Category and New Arrivals use horizontal carousel interactions with contextual arrows.
- Product detail related items use mobile-first single-column layout for cleaner odd/even behavior.
