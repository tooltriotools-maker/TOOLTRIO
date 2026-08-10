# ToolTrio Finance + Health YMYL Google-Facing Audit

Date: 2026-08-09

## Important interpretation

Google does not publish a binary "YMYL pass/fail" score. This report uses a strict internal page-quality gate designed around Google's published people-first, E-E-A-T, technical indexing, structured-data, and spam guidance.

## Corpus

- Finance routes: 389
- Health routes: 173
- Total YMYL routes: 562
- Health redirect-only routes: 1
- Finance noindex routes: 0
- Health noindex routes: 0

## Gate criteria

Every canonical Finance/Health page is required to have:

1. Methodology disclosure
2. Limitations and assumptions
3. Topic-appropriate authoritative source coverage
4. Safety/educational framing
5. ToolTrio publisher identity
6. Canonical and metadata architecture
7. Structured-data architecture
8. No unsupported institutional-validation claims
9. No obvious keyword stuffing / free/best/no-signup SEO permutations
10. Shared YMYL quality presentation

## Results

- Finance: 389/389 page-quality gates passed
- Health: 173/173 page-quality gates passed
- Missing quality profiles: 0
- Missing methodology coverage: 0
- Missing limitations coverage: 0
- Missing source coverage: 0
- Suspicious authority/keyword patterns: 0
- Route audit failures: 0

## Source handling

Finance pages with empty profile source arrays now receive topic-specific authoritative source coverage from IRS, Department of Labor, CFPB, Federal Student Aid, SSA, Medicare, Investor.gov/FINRA, Treasury, NAIC, HUD, SBA or other appropriate primary resources.

Health pages use route-level sources first, health batch audit sources second, and topic-specific authoritative defaults such as CDC, WHO, ACOG, NIDDK, NHLBI, NIMH, NIH ODS, NCI, FDA, NIDCD, AAD, AAO, ADA and AAAAI when a route profile does not yet contain a direct reference.

A default source is a reference for the topic; it is not represented as having validated or approved ToolTrio's calculator.

## Content improvements

- Removed unsupported claims such as broad "CDC/NIH validated" and "SEC-validated" wording.
- Removed generic SEO stuffing such as "free online calculator", "best calculator", and "no signup" keyword permutations from YMYL page copy/metadata.
- Removed generic "instant evidence-based personalized results" health claims.
- Replaced marketing language such as "professional-grade", "saves thousands", and "no downside" with transparent, conditional language.
- Removed stale/hardcoded category counts and use route-derived counts.
- Health category schema is represented as WebPage rather than asserting a blanket MedicalWebPage classification.
- Shared calculator layout now exposes publisher identity and the YMYL quality dimensions.
- Metadata sanitization prevents YMYL keyword stuffing from reappearing through generated metadata.

## Indexation policy

The current Google-facing page-quality gate does not use a blanket noindex for formula-review labels. Those labels are internal product QA states, not Google YMYL requirements. Pages that are genuinely unsafe or intentionally redirect-only remain protected by the appropriate route policy.

The 11 previously critical Health calculators have already passed the separate strict publication gate and critical test-vector suite in the project.

## Validation commands

`npm run ymyl:verify`

Passed:

- `ymyl:google:audit`
- `ymyl:audit`
- `ymyl:indexation:audit`

Additional passes:

- health publication audit: 11/11
- health critical tests: 10/10
- health quality registry: 173 canonical routes
- health source architecture: 173/173
- health claims/content audit: 174 page files
- blog audit: 286 articles, 0 critical failures
- blog catalog: 286/286

## Build limitation

This audit does not claim a production Next.js build passed in the execution environment. The environment has previously lacked the installed Next.js/TypeScript dependency binaries. Source-level YMYL and route audits pass.
