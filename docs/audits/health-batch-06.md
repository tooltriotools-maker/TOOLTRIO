# Health Batch 06 Audit

## Scope

25 canonical health calculator routes, canonical order 126–150.

## Quality statuses

- Reviewed / deterministic or guideline-based: pregnancy nutrition, pregnancy weight gain, protein intake, resting metabolic rate, running pace, sleep need, sodium intake, steps.
- Custom educational estimates: protein per meal, protein synthesis, pull-up, push-up, sauna benefits/health, shift-work health, sit-and-reach, skin aging/health, sleep cycle/debt, sprint, squat, standing desk.
- Needs formula/reference review: respiratory rate, SpO2 risk.

## Important rules applied

1. No calculator in this batch is described as a blanket “clinically validated” tool.
2. Custom scores are not represented as diagnoses or individualized disease probabilities.
3. Pregnancy and nutrition pages distinguish guideline targets from medical prescriptions.
4. Sleep pages distinguish sleep-duration guidance from sleep-disorder diagnosis.
5. SpO2 is explicitly treated as an estimate with device/context limitations.
6. Existing canonical URLs remain unchanged.

## Sources added to the audit registry

- NIH Office of Dietary Supplements — Pregnancy
- National Academies — Weight Gain During Pregnancy
- ACOG — Weight Gain During Pregnancy
- ACSM — 2026 Resistance Training Position Stand announcement
- PubMed — Mifflin-St Jeor equation
- AASM/Sleep Research Society — Adult Sleep Duration Consensus
- CDC NCHS — 2024 adult sleep data
- American Heart Association — Sodium guidance
- FDA — Pulse Oximeter Basics / Pulse Oximeters
- WHO/IARC — Night Shift Work
- ACOG — Due-date / pregnancy guidance

## Content cleanup

The batch removes the generic “peer-reviewed, clinically validated formulas” / universal NHANES wording from the shared `howItWorks`/science copy where present and replaces it with calculator-specific methodology language.

## Validation

- Build safety check: PASS
- Catalog check: PASS — 726 active tools
- Batch route/profile check: PASS — 25/25
- Full Next.js build: NOT CERTIFIED until dependencies can be installed successfully and `next build` executes.
