# ToolTrio Whole-Build SEO / YMYL / Formula Audit — Continued

Date: 2026-08-09

## Scope

Audited the uploaded final build across:

- 286 blog articles
- 389 Finance routes
- 173 Health routes (172 canonical + 1 redirect-only)
- 726 active catalog tools
- SEO metadata/canonical/robots/sitemap architecture
- Finance/Health YMYL copy and authority claims
- AI-related wording in Finance/Health
- calculation libraries and exported calculation functions
- existing registry/source/claim/FAQ/related-tool audits

## Results

### Blog

- 286/286 articles
- 286 unique slugs
- 0 duplicate slugs
- 0 invalid categories
- 0 broken internal links
- 0 broken calculator links
- 0 thin articles
- 0 catalog mismatch
- 0 near-duplicate pairs

### YMYL strict content audit

- 389 Finance routes checked
- 173 Health routes checked
- 562 Finance/Health routes total
- 0 unsupported authority-claim failures
- 0 financial overclaim failures
- 0 medical absolute-safety failures
- 0 clinical-recommendation overclaim failures
- 0 AI-generation/ChatGPT/OpenAI/LLM user-facing wording failures
- 0 effective title-length failures
- 0 effective description-length failures

### Formula runtime safety

`audit-calculation-functions.mjs`:

- 360 exported calculation functions tested
- 720 executions
- nominal + boundary-oriented execution checks
- 0 runtime failures on nominal vectors
- 0 non-finite outputs on nominal vectors

The suite intentionally treats some zero-input boundary cases as domain warnings rather than claiming every calculator accepts every zero input as valid. It is a safety/smoke suite, not a proof of mathematical correctness for every inline route formula.

### SEO changes

- Removed emitted `meta keywords` from calculator metadata. Google states that the meta keywords tag has no effect on Search.
- Added effective title normalization to keep Finance/Health title output concise without blind source truncation.
- Existing metadata description normalization remains capped at 155 characters.
- Removed unsupported YMYL claims found in Finance/Health pages.
- Removed AI-related generation/marketing wording from Finance/Health content where found.
- Removed hard-coded deployment dates from sitemap static URLs.
- Sitemap now uses actual `lastReviewed`/blog update dates when available and omits invented dates.
- Sitemap no longer relies on priority/changefreq signals.

### Formula fixes

Added zero/boundary protections to core Finance calculations including:

- SIP zero-rate handling
- EMI zero-rate/zero-term handling
- compound-interest/FD frequency validation
- retirement real-return zero handling
- CAGR zero-input handling
- XIRR invalid cash-flow/non-convergence handling
- I-Bond zero principal/term handling
- home-office zero-home-area handling
- T-Bill zero-price/term handling
- Rent-vs-Buy invalid-term handling

Health calculation safety fixes include:

- sleep-cycle invalid-time fallback
- hydration zero-duration / zero-rate protection
- pain-frequency fallback
- wound-healing location/size protection

## Important remaining production risks

### Next.js

The project still uses Next.js 14.2.35. Current Next.js support policy lists 14.x as unsupported. A supported Next.js release should be adopted before production deployment. The migration was not forced in this audit because dependencies could not be installed in this execution environment.

### Full production build

`npm ci` remains blocked by the execution environment's npm mirror because `yocto-queue@0.1.0` is unavailable there. Therefore a real `next build` cannot be honestly marked as passed here.

### YMYL review status

Some Health registry entries still carry internal statuses such as `needs_formula_review` or `needs_manual_review`. These statuses are not silently converted to `reviewed`. They remain visible in the internal quality system so the project does not manufacture expertise or review claims.

### Formula scope

The 360 exported calculation functions were smoke-tested. Many calculator pages also contain route-local inline calculations; those require route-specific expected-value vectors for mathematical proof. No automated smoke test should be represented as proof that every formula is mathematically correct.

## Final source-level status

Blog audit: PASS
Catalog audit: PASS
YMYL strict copy/SEO audit: PASS
Formula runtime safety audit: PASS
Targeted TypeScript calculation-library check: PASS
AI-related Finance/Health wording audit: PASS

Production Next.js build: NOT VERIFIED because dependency installation is environment-blocked.
