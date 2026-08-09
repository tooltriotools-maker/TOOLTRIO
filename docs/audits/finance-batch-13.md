# Finance Batch 13 Audit

Date: 2026-08-09

Scope: 25 canonical Finance routes from RV Annual Cost through SIP vs Endowment.

## Key fixes

- Corrected India Salary Calculator positioning: the implementation is CTC/PF/HRA/professional-tax based, so US payroll metadata and boilerplate were removed.
- Corrected SEP-IRA 2026 ceiling references from $70,000/$23,500 to the current $72,000/$24,500 retirement-plan values where applicable.
- Made the SEP-IRA tax-savings input functional instead of ignoring the entered tax rate.
- Corrected the sole-proprietor SEP contribution model to an explicitly simplified ~20% planning approximation after the self-employment adjustment, rather than multiplying 92.35% by 25%.
- Corrected Series EE implementation so new-bond purchase amount is not treated as half of face value; the page now labels the result as a simplified model for historical issues.
- Removed the automatic SBA Express classification for loans <= $350,000. The calculator now treats the result as an SBA 7(a) scenario rather than an eligibility determination.
- Removed the unsupported universal 3.5% SBA fee calculation.
- Removed US tax boilerplate from India SIP/FD/endowment pages.
- Removed false "exact after-tax" language from the salary-hike calculator; it is a salary/inflation projection, not a payroll-tax engine.
- Fixed three unrelated P0 syntax blockers discovered by the typecheck: personal-loan FAQ apostrophe, real-wage-growth FAQ apostrophe, and Army body-fat metadata apostrophe.

## Validation

- Finance Batch 13 route audit: PASS (25/25 routes).
- TypeScript parser-level syntax blockers discovered by typecheck: fixed.
- Full typecheck: BLOCKED by missing dependencies after `npm ci` failed against the configured package mirror (`yocto-queue@0.1.0` 404).
- Production `next build`: NOT CERTIFIED until dependencies install successfully.

## URL policy

No canonical public URLs were changed.
