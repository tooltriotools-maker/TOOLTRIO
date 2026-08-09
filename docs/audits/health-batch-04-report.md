# Health Batch 04 Audit Report

Date: 2026-08-08

Routes audited: 25

## Scope

This batch covers the canonical health route order from `immune-health-calculator` through `menstrual-health-calculator`.

## Key fixes

- `kidney-function-calculator`: replaced the older CKD-EPI-style coefficients with the 2021 race-free CKD-EPI creatinine equation.
- Removed blanket claims that the batch uses universally clinically validated formulas.
- `infant-weight-percentile-calculator`: marked as a critical logic issue because its polynomial approximations do not reproduce official WHO/CDC growth-chart LMS data. Metadata now explicitly says official chart-data migration is pending.
- Added a batch-specific evidence/audit registry at `lib/content/health-batch-04.ts`.
- Added `npm run health:audit:batch-04` structural validation.

## Status summary

- Reviewed / deterministic or source-backed: 4
- Custom educational estimates: 14
- Needs formula review: 3
- Critical logic issue: 1
- Remaining routes are conservative custom/heuristic tools and are not described as clinical prediction models.

## Important implementation notes

The following should receive deeper formula work in later batches:

- infant growth percentiles: migrate to official WHO/CDC chart datasets rather than approximations.
- lung capacity: replace fixed 70% obstruction logic and simplified predicted values with appropriate reference equations/LLO-based interpretation.
- lean body mass: separate named LBM equations from derived component estimates.
- longevity/longevity risk: keep clearly heuristic unless a named validated survival model is implemented.
- menopause/menstrual health: do not imply diagnosis from custom symptom scores.

## Canonical URLs

No canonical calculator URLs were renamed or changed in this batch.
