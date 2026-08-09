# Health Batch 07 Audit

23 canonical health routes audited.

Critical formula/claim review:
- stroke-risk-calculator: custom heuristic must not be described as validated 10-year risk.
- testosterone-age-calculator: custom estimate; not a serum measurement.
- thyroid-calculator: custom symptom/risk heuristic; not a thyroid-function test.
- vitamin-d-status-calculator: estimated serum level/dose requires replacement or explicit non-clinical labeling.
- wound-healing-calculator: custom healing-time estimate must not delay clinical wound care.
- visual-acuity-risk-calculator: interpretation requires validation.

Additional reviewed/custom calculators have methodology and limitations registered in `lib/content/health-batch-07.ts`.