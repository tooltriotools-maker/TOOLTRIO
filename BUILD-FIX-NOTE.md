# Build Fix — Structured Data Export + ESLint Flat Config

## Fixed

1. Restored the missing `generateFunToolStructuredDataFromSlug` export in `lib/seo/structured-data.ts`.
   - Resolves metadata from `lib/catalog/generated-tool-metadata.ts`.
   - Validates that the slug has generated title/description metadata.
   - Reuses the shared `generateFunToolStructuredData` implementation.
   - All 30 Fun tool pages using this helper now have a valid export.

2. Fixed `eslint.config.mjs`.
   - Uses `eslint-config-next/core-web-vitals` without the `.js` suffix.
   - Spreads the returned flat config array with `...nextVitals`.
   - This matches the Next.js flat-config setup.

## Verification performed

- Source syntax audit: 211 files, 0 syntax failures.
- Catalog: 65 unique tools.
- Master registry: 65 active routes (30 Fun, 35 ZIP).
- Generated metadata: 65/65 routes.
- Structured-data imports: 0 missing exports.
- Fun structured-data calls: 30/30 have generated metadata.
- Alias import audit: 0 missing local `@/` imports.
- Dynamic index type audit: PASS.
- Structured-data prop audit: PASS.
- Chart data prop audit: PASS.
- FAQ audit: 0 generic FAQ hits.
- SEO shape/content audits: PASS.

A full local TypeScript/build run cannot be completed in this environment because the uploaded source does not contain installed `node_modules`; dependency installation is required before `npm run build`.
