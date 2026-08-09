# Health Batch 02 — Summary

## Scope

The second health batch covers the next 25 routes alphabetically, from `caloric-needs-calculator` through `ergonomics-score-calculator`.

## Architecture changes

- Added `lib/content/health-calculation-audits.ts` as a calculation-level QA registry.
- Added 25 source profiles to `lib/content/health-sources.ts`.
- Added `scripts/audit-health-batch-02.mjs` and `npm run health:audit:batch-02`.
- Preserved all canonical calculator URLs.

## Critical findings

1. `creatinine-clearance-calculator` was a route/function mismatch: it displayed a generic BMI-derived wellness score rather than creatinine clearance. It now implements the Cockcroft–Gault equation with serum creatinine, age, weight and sex inputs.
2. `ckd-progression-calculator` uses a simple linear eGFR extrapolation for its years-to-dialysis output. This is not a validated prognosis and is flagged for replacement with an appropriate validated model.
3. `cardiac-output-calculator` needs formula review for cardiac index/body-surface-area assumptions and SVR assumptions.
4. `diabetes-risk-calculator` is not an exact implementation of the official CDC prediabetes risk test or a complete FINDRISC implementation; validated-model claims are therefore flagged.
5. `dietary-inflammatory-index-calculator` is a simplified custom score and does not reproduce the published DII methodology.
6. `emf-exposure-calculator` is a relative educational score, not RF dosimetry or a WHO/ICNIRP health-risk calculation.
7. `erectile-dysfunction-risk-calculator` uses a custom additive score and should not present its output as a validated probability.

## Validation

- Build-safety check: passed.
- Catalog check: passed (728 unique tools).
- Health Batch 02 audit: passed (25/25 source profiles, 25/25 calculation audits, 0 route mismatches).
- Full Next.js build remains pending successful dependency installation in the current environment.
