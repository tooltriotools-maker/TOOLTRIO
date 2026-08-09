# Health Batch 05 Audit

## Scope

Canonical health routes 101–124, plus the legacy `pregnancy-due-date-calculator` redirect.

## Key findings

- `mental-health-score-calculator`: critical route/formula mismatch. The implementation is BMI/age/sex based and is not a validated mental-health instrument.
- `pcos-risk-calculator`: critical model-label mismatch. The custom weighted score is not the Rotterdam diagnostic criteria.
- `obesity-comorbidity-calculator`: mixed validated thresholds and custom disease-risk heuristics; percentage disease-risk outputs are not supported by the current implementation.
- `night-shift-health-calculator`: removed unsupported fixed percentage diabetes/cardiovascular outputs from the calculation result.
- `oral-health-risk-calculator`: removed unsupported fixed cardiovascular/oral-cancer multipliers from the result.
- `migraine-risk-calculator`: removed fixed supplement dosing from the generic prevention output.
- `nutritional-deficiency-risk-calculator`: corrected the B12 statement to recognize fortified foods/supplements rather than claiming B12 is found only in animal products.
- `pregnancy-due-date-calculator`: confirmed as a permanent redirect-only legacy URL; canonical page remains `pregnancy-calculator`.

## Evidence posture

Custom scores are explicitly labeled as estimates. Validated claims are only used where a named methodology/source is documented.

## URL policy

No canonical URL was changed. The legacy due-date URL remains available as a permanent redirect for existing links/bookmarks.
