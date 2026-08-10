# ToolTrio YMYL Batch Promotion — Final

Date: 2026-08-09

## Objective

Reduce unnecessary `noindex` usage across Finance and Health calculators while preserving strict protection for genuinely unsafe or structurally invalid YMYL routes.

## Batch 01 — Source-backed promotion

The YMYL layer was changed so review-pending routes are not automatically blocked when a route has a documented quality profile and methodology. Pages expose their review state and limitations instead of hiding the URL from search.

## Batch 02 — Methodology-backed promotion

The promotion gate now permits every Finance route with a documented methodology and limitations to remain indexable. Health routes are indexable when they have a route-level quality/source profile and are not marked `critical_logic_issue` or `redirect_only`.

## Final indexation state

| Category | Routes | Indexable | Meta noindex | Redirect-only |
|---|---:|---:|---:|---:|
| Finance | 389 | 389 | 0 | 0 |
| Health | 173 | 161 | 11 | 1 |
| **Total** | **562** | **550** | **11** | **1** |

## Protected Health routes

The remaining 11 `critical_logic_issue` routes are intentionally protected until their calculation logic is corrected:

- ckd-progression-calculator
- creatinine-clearance-calculator
- dietary-inflammatory-index-calculator
- infant-weight-percentile-calculator
- mental-health-score-calculator
- pcos-risk-calculator
- stroke-risk-calculator
- testosterone-age-calculator
- thyroid-calculator
- vitamin-d-status-calculator
- wound-healing-calculator

These are not being hidden merely because they are Health pages. They remain protected because their current calculation/model cannot honestly be represented as validated clinical logic.

## Redirect-only route

`pregnancy-due-date-calculator` is now explicitly represented as `redirect_only` rather than a generic review-pending page. The route permanently redirects to `/calculators/health/pregnancy-calculator`, is excluded from the sitemap, and no longer contains an explicit `robots: noindex` metadata override.

## Visible YMYL trust treatment

Every Finance/Health calculator continues to expose:

- Quality & methodology
- Methodology
- Limitations and assumptions
- Evidence status
- Applicable rule/model year where available
- Sources and references where available
- Educational-use / non-advice disclaimer
- Review-pending disclosure where applicable

When source references are not yet complete, the page explicitly says so rather than claiming institutional validation.

## Automated validation

Passed:

- YMYL route audit: 562/562
- Finance quality registry: 389/389
- Health quality registry: 173/173
- Finance registry safety: PASS
- Health source architecture: PASS
- YMYL indexation audit: PASS
- YMYL promotion Batch 02: PASS

## Production note

The source-level YMYL checks pass. A full Next.js production compilation still requires the project's dependencies to be installed in an environment where the package registry resolves the existing lockfile successfully.
