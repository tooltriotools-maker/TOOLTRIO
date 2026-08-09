# Health-wide Quality Consolidation

Canonical health routes: **172**

## Quality status counts

- critical_logic_issue: 11
- custom_estimate: 80
- needs_formula_review: 21
- needs_manual_review: 8
- reviewed: 49
- verified_formula: 3

## Quality gates

- Every canonical health route has exactly one quality-registry entry.
- Redirect-only pregnancy due-date route is excluded from the canonical registry.
- `critical_logic_issue`, `needs_formula_review`, and `needs_manual_review` are treated as manual-review states.
- The registry does not alter or rename public URLs.

## Current architecture gap

The quality registry is complete, but only a subset of health page implementations currently pass `healthSourceProfile` into `SEOContent`. The next migration should wire the canonical slug into the shared health content layer so every page can surface the correct evidence status without duplicating metadata.
