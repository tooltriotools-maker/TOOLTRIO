# ToolTrio Finance + Health YMYL Upgrade

Date: 2026-08-09

## Scope

Applied the YMYL quality architecture across all 389 finance calculator routes and 173 health calculator routes in the final ToolTrio project.

## Google-aligned principles used

- People-first, reliable content and stronger E-E-A-T expectations for health and financial topics.
- Transparent methodology, assumptions, limitations, and source references.
- No fabricated reviewers, review dates, validation claims, or citations.
- Search indexation is gated by the route-level quality/evidence profile.
- Pages that still require formula/manual review or lack route-level source evidence are not included in the sitemap and receive `noindex,follow`.

## Implemented

### Shared YMYL quality layer

- Added `lib/seo/ymyl.ts`.
- Added route-level quality lookup for finance and health.
- Added shared methodology/evidence/limitations/disclaimer panel to every Finance/Health calculator rendered through `CalculatorLayout`.
- Added source/reference links where the route has a documented source profile.
- Added explicit status labels such as Reviewed methodology, Verified formula, Tax-rule reviewed, Custom planning estimate, and Manual review required.
- Added truthful noindex explanations for protected routes.

### Metadata and indexation

- `generateCalculatorMetadata()` now reads the canonical YMYL quality registry.
- Reviewed/indexable pages remain `index,follow` only when the strict evidence gate passes.
- Finance `needs_manual_review` and `formula_review` routes are noindex.
- Health `critical_logic_issue`, `needs_formula_review`, and `needs_manual_review` routes are noindex.
- Finance and health routes without a non-empty route-level source profile are noindex until evidence is documented.
- All protected routes remain crawlable with `follow` so Google can discover and process links.

### Sitemap

- Finance/health routes failing the YMYL indexation gate are excluded from `sitemap.xml`.
- Public URLs are not changed.

### Structured data

- Added a truthful `WebPage` schema for Finance/Health calculator pages with Organization publisher information.
- Removed the overly broad generic `MedicalWebPage` claim from the shared calculator schema generator.
- Replaced generic/incorrect HowTo steps with steps that match the actual shared methodology/limitations/source sections.

### Category pages

- Removed unsupported global claims that all health calculators were validated by CDC/NIH/AHA/ACSM.
- Removed wording that implied every calculator had the same evidence level.
- Added explicit Finance and Health quality-policy sections.
- Removed stale/misleading calculator-count wording from finance structured metadata.

### Quality automation

Added:

- `scripts/audit-ymyl-pages.mjs`
- `scripts/audit-ymyl-indexation.mjs`
- `reports/ymyl-page-audit.json`
- `reports/ymyl-indexation-audit.json`

Added npm commands:

- `npm run ymyl:audit`
- `npm run ymyl:indexation:audit`
- `npm run ymyl:verify`

`prebuild` now runs `ymyl:verify`.

## Current strict indexation gate

### Finance

- Total quality profiles: 389
- Indexable under the strict gate: 187
- Protected/noindex: 202

Status distribution:

- tax_rule_review: 107
- custom_estimate: 161
- reviewed: 39
- formula_review: 21
- needs_manual_review: 61

### Health

- Total quality profiles: 173
- Indexable under the strict gate: 22
- Protected/noindex: 151

Status distribution:

- reviewed: 49
- verified_formula: 3
- custom_estimate: 80
- needs_formula_review: 21
- needs_manual_review: 9
- critical_logic_issue: 11

The strict gate intentionally protects pages until formula/evidence/source requirements are satisfied. This is not a claim that the protected pages are bad; it is a quality-control state.

## Existing blog validation after upgrade

- 286 articles
- 286 unique slugs
- 0 duplicate slugs
- 0 duplicate titles
- 0 invalid categories
- 0 broken internal links
- 0 broken calculator links
- 0 thin articles
- 286 catalog entries
- 0 near-duplicate pairs

## Validation commands passed

- `npm run ymyl:verify`
- `npm run blog:verify`
- `node scripts/audit-health-claims.mjs`
- `node scripts/check-finance-registry-safety.mjs`
- `node scripts/check-related-tools.mjs`

## Production build limitation

The ZIP does not contain `node_modules`. In this execution environment the Next.js and TypeScript executables are unavailable, so a production `next build` cannot be honestly marked as completed here. The source-level YMYL, registry, sitemap-gating, and blog audits pass.

## Important editorial rule

Do not add fake medical/financial reviewers or fake review dates to make pages look authoritative. Google recommends making authorship, expertise, methodology, and sourcing understandable; the implementation therefore exposes evidence status rather than inventing credentials.
