# ToolTrio Architecture

## Core principle

ToolTrio uses a **single canonical tool registry**. A tool should be defined once and consumed by search, sitemap, counts and generated discovery files.

```text
                    ┌──────────────────────┐
                    │ lib/catalog/tools.ts │
                    │  canonical registry  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Global Search       Sitemap       llms.txt
              │                │                │
              └────────────┬───┴────────────┘
                           ▼
                    Site-wide counts
```

## Registry files

- `lib/catalog/tools.ts` — generated route-backed tool catalog.
- `lib/catalog/index.ts` — active tools, counts, lookup and search helpers.
- `scripts/generate-catalog.mjs` — regenerates the registry from route folders while preserving known names.
- `scripts/check-catalog.mjs` — fails if a route is missing from the registry or a duplicate href exists.
- `scripts/generate-llms.mjs` — generates `public/llms.txt` from the active registry.

## Commands

```bash
npm run catalog:generate
npm run catalog:check
npm run llms:generate
npm run verify:config
npm run typecheck
npm run lint
npm run build
```

## Adding a new tool

1. Add the route under the correct category.
2. Run `npm run catalog:generate`.
3. Review the generated name/keywords.
4. Run `npm run catalog:check`.
5. The tool is then automatically available to the sitemap, search and generated `llms.txt`.

## Redirects

Redirect-only URLs are retained as known routes but excluded from the active registry through `REDIRECTED_TOOL_HREFS` in `lib/catalog/index.ts`. This prevents redirect destinations from appearing as canonical tools in search or the sitemap.

## Content architecture

`SEOContent` is a presentation component, not the source of truth for SEO claims. Calculator-specific content belongs with the calculator and should provide real material: formula, assumptions, examples, limitations, sources and regional rules when applicable.

The shared component intentionally uses a neutral `Complete Guide` heading by default. A jurisdiction label is opt-in through `regionLabel`; it must only be supplied when the page genuinely contains regional guidance.

Health/YMYL pages must not inherit blanket claims such as "CDC & NIH validated". Sources and review dates are explicit per page rather than generated from the current build date.
