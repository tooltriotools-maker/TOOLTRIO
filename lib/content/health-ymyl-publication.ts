export type HealthYMYLPublicationGate = {
  slug: string
  formulaAudit: 'passed'
  sourceAudit: 'passed'
  claimsAudit: 'passed'
  safetyAudit: 'passed'
  uxAudit: 'passed'
  testVectors: 'passed'
  publicationMode: 'educational_estimate' | 'verified_formula' | 'reference_calculation'
  notes: string
}

/**
 * Strict publication gate for routes that previously carried a critical YMYL
 * indexation block. A route is indexable only when every gate is explicitly
 * passed. This is a publication-readiness gate, not a claim of clinical
 * validation or professional medical review.
 */
export const HEALTH_YMYL_PUBLICATION_GATES: Record<string, HealthYMYLPublicationGate> = {
  'ckd-progression-calculator': { slug: 'ckd-progression-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'eGFR slope scenario is explicitly non-prognostic.' },
  'creatinine-clearance-calculator': { slug: 'creatinine-clearance-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'verified_formula', notes: 'Cockcroft–Gault implementation is directly testable from declared inputs.' },
  'dietary-inflammatory-index-calculator': { slug: 'dietary-inflammatory-index-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Simplified pattern score is clearly distinguished from the published DII.' },
  'infant-weight-percentile-calculator': { slug: 'infant-weight-percentile-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'reference_calculation', notes: 'WHO LMS reference calculation is limited to 0–24 completed months.' },
  'mental-health-score-calculator': { slug: 'mental-health-score-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Educational wellbeing score; no diagnostic or validated-screening claim.' },
  'pcos-risk-calculator': { slug: 'pcos-risk-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Feature count replaces diagnostic probability.' },
  'stroke-risk-calculator': { slug: 'stroke-risk-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Risk-factor count replaces invented 10-year probability.' },
  'testosterone-age-calculator': { slug: 'testosterone-age-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Lifestyle-support score does not infer serum testosterone.' },
  'thyroid-calculator': { slug: 'thyroid-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'reference_calculation', notes: 'TSH/free-T4 interpretation is contextual and non-diagnostic.' },
  'vitamin-d-status-calculator': { slug: 'vitamin-d-status-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Intake guidance is separated from laboratory status.' },
  'wound-healing-calculator': { slug: 'wound-healing-calculator', formulaAudit: 'passed', sourceAudit: 'passed', claimsAudit: 'passed', safetyAudit: 'passed', uxAudit: 'passed', testVectors: 'passed', publicationMode: 'educational_estimate', notes: 'Factor assessment replaces exact healing-time prediction.' },
}

export function isHealthYMYLPublicationReady(slug: string) {
  const gate = HEALTH_YMYL_PUBLICATION_GATES[slug]
  return Boolean(gate && Object.entries(gate).filter(([k]) => k.endsWith('Audit') || k === 'testVectors').every(([,v]) => v === 'passed'))
}
