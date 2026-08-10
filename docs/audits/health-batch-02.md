# Health Batch 02 — calculation and claim audit

Routes audited: 25
Source profiles: 25/25
Calculation audits: 25/25
Route/function mismatches: 0

## Status
- caloric-needs-calculator: no flagged blanket claim
- calorie-burned-walking-calculator: no flagged blanket claim
- calorie-calculator: claim-review (healthy range)
- calorie-deficit-calculator: claim-review (healthy range)
- calories-burned-calculator: claim-review (healthy range)
- cardiac-output-calculator: no flagged blanket claim
- cholesterol-calculator: claim-review (healthy range)
- ckd-progression-calculator: no flagged blanket claim
- cognitive-load-calculator: no flagged blanket claim
- cold-exposure-calculator: claim-review (healthy range)
- cold-shower-benefits-calculator: claim-review (healthy range)
- cortisol-stress-calculator: claim-review (healthy range)
- creatine-dosage-calculator: claim-review (healthy range)
- creatinine-clearance-calculator: no flagged blanket claim
- cycling-calories-calculator: claim-review (healthy range)
- dehydration-calculator: claim-review (healthy range)
- dehydration-status-calculator: no flagged blanket claim
- dental-health-calculator: claim-review (healthy range)
- diabetes-risk-calculator: claim-review (clinically validated, healthy range)
- diet-quality-score-calculator: no flagged blanket claim
- dietary-inflammatory-index-calculator: no flagged blanket claim
- due-date-calculator: claim-review (healthy range)
- emf-exposure-calculator: no flagged blanket claim
- erectile-dysfunction-risk-calculator: no flagged blanket claim
- ergonomics-score-calculator: claim-review (clinically validated, healthy range)

## Critical implementation findings
- cardiac-output-calculator: cardiac index currently uses fixed sex-specific body-surface-area assumptions and SVR omits right-atrial pressure.
- ckd-progression-calculator: years-to-dialysis is a linear extrapolation and must not be presented as a validated prognosis.
- creatinine-clearance-calculator: replaced the previous BMI/wellness-score mismatch with Cockcroft–Gault inputs and calculation.
- diabetes-risk-calculator: current score is not the official CDC test/FINDRISC implementation.
- dietary-inflammatory-index-calculator: simplified score is not the published DII methodology.
- emf-exposure-calculator: relative score is not RF dosimetry or a WHO/ICNIRP risk score.

## Missing source profiles
- None

## Missing calculation audits
- None