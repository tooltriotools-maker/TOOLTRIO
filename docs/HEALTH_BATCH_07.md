# Health Batch 07

Final health batch covering the remaining 23 canonical health calculators.

## Key fixes
- Corrected Steps-to-Calories result card to avoid unsupported fat-burn inference.
- Removed false validated-model wording from Stroke Risk.
- Corrected Zinc example copy (it previously said iron).
- Added structured formula/claim/limitation audit metadata for all 23 routes.

## High-risk items
Several tools are explicitly marked `critical_logic_issue` or `needs_formula_review` where their current heuristic is not a validated clinical model. These are not being presented as medically validated.

Canonical URLs are unchanged.
