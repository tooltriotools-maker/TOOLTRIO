# YMYL Discovery Hide / Noindex Audit

Date: 2026-08-11

## Policy

Finance and Health calculator routes remain directly reachable for internal review, but are not part of public discovery. Every Finance/Health calculator response is marked `noindex, follow` through both Next.js metadata and `X-Robots-Tag` middleware.

Finance/Health-related blog posts are excluded from public blog listings, category navigation, search discovery and sitemap output. Direct blog routes remain available and receive `noindex, follow` metadata when their post belongs to a restricted YMYL category or links to a restricted calculator.

## Coverage

- Finance calculator routes: 389
- Health calculator routes: 173
- Total YMYL calculator routes hidden/noindex: 562
- Finance/Health category landing pages: noindex
- Finance/Health categories removed from public navbar
- Finance/Health tools removed from homepage discovery
- Finance/Health tools removed from GlobalSearch discovery
- Finance/Health tools removed from public footer discovery
- Finance/Health categories removed from public blog category navigation
- Restricted blog posts excluded from public blog listing
- Restricted blog posts excluded from sitemap
- Restricted blog categories excluded from sitemap
- Restricted blog posts receive noindex metadata on direct routes
- Finance/Health calculator routes excluded from sitemap
- robots.txt intentionally does NOT disallow these routes, so crawlers can see the noindex directive

## Blog discovery

The blog catalog contains 286 discovery entries. The public search filter hides entries matching the Finance/Health YMYL topic policy (207 currently matched by the catalog keyword/title/href policy), leaving 79 public discovery entries. The canonical blog listing uses the stronger category/related-calculator filter from `publicBlogPosts`, so restricted Finance/Health categories are not rendered there.

## Validation

- TypeScript/TSX transpile syntax check: 20 modified files, 0 syntax failures.
- Full `tsc --noEmit` could not complete because the uploaded environment is missing several type-definition packages (for example React/Node/d3/leaflet types). No source syntax errors were reported before those dependency/type-definition errors.
- Sitemap source excludes Finance/Health tools and restricted blog categories/posts.
- Public homepage/header/footer/search surfaces contain no Finance/Health calculator hrefs.
