export type HealthBatch06Status = 'reviewed' | 'custom_estimate' | 'needs_formula_review'

export type HealthBatch06Audit = {
  status: HealthBatch06Status
  formula: string
  implementationNotes: string
  limitations: string[]
  sources: { label: string; url: string; reviewed: string }[]
}

/**
 * Health Batch 06: canonical health order 126–150.
 *
 * This registry is intentionally conservative. A calculator is marked
 * `reviewed` only when its calculation is deterministic or tied to a named
 * guideline/equation. Custom scores are never described as diagnostic models.
 */
export const HEALTH_BATCH_06_AUDITS: Record<string, HealthBatch06Audit> = {
  'pregnancy-nutrition-calculator': {
    status: 'reviewed',
    formula: 'Trimester-aware nutrient planning using pregnancy intake recommendations and user-entered characteristics.',
    implementationNotes: 'Treat nutrient targets as guideline-based planning values. Do not imply that the calculator can diagnose nutritional deficiency or prescribe supplements.',
    limitations: ['Pregnancy nutrition needs vary with age, medical conditions, multiple gestation and clinician-directed care.', 'Supplement doses above standard recommendations should not be inferred from the calculator.'],
    sources: [{ label: 'NIH Office of Dietary Supplements — Pregnancy', url: 'https://ods.od.nih.gov/factsheets/Pregnancy-HealthProfessional/', reviewed: '2026-08-08' }]
  },
  'pregnancy-weight-gain-calculator': {
    status: 'reviewed',
    formula: 'Pre-pregnancy BMI categories mapped to established gestational weight-gain ranges, with gestational-age progress estimates.',
    implementationNotes: 'Uses the National Academies/IOM pregnancy weight-gain framework. The result is a guideline range, not an individualized obstetric prescription.',
    limitations: ['Starting BMI is a screening input and does not capture all pregnancy factors.', 'Twin or higher-order pregnancies use different ranges.', 'Clinical management may differ for individual pregnancies.'],
    sources: [{ label: 'National Academies — Weight Gain During Pregnancy', url: 'https://nap.nationalacademies.org/catalog/12584/weight-gain-during-pregnancy-reexamining-the-guidelines', reviewed: '2026-08-08' }, { label: 'ACOG — Weight Gain During Pregnancy', url: 'https://www.acog.org/womens-health/infographics/weight-gain-during-pregnancy', reviewed: '2026-08-08' }]
  },
  'protein-intake-calculator': {
    status: 'reviewed',
    formula: 'Protein target estimated from body weight and selected activity/training context.',
    implementationNotes: 'The calculator is a dietary planning aid. Protein targets should be separated from clinical nutrition prescriptions.',
    limitations: ['Kidney disease, pregnancy and other medical conditions can change protein requirements.', 'Activity-based targets are ranges, not exact physiological requirements.'],
    sources: [{ label: 'ACSM — Resistance Training Position Stand, 2026', url: 'https://acsm.org/science-spotlight-acsm-releases-new-position-stand-on-resistance-training/', reviewed: '2026-08-08' }]
  },
  'protein-per-meal-calculator': {
    status: 'custom_estimate',
    formula: 'Daily protein target divided across meals using an optional per-meal distribution rule.',
    implementationNotes: 'Per-meal distribution is a planning heuristic. It is not a validated diagnostic score or a guarantee of muscle-protein-synthesis response.',
    limitations: ['Meal timing and protein dose-response vary by person and training state.', 'Total daily intake and overall diet matter in addition to distribution.'],
    sources: []
  },
  'protein-synthesis-calculator': {
    status: 'custom_estimate',
    formula: 'Educational estimate of muscle-protein-synthesis response based on protein and training inputs.',
    implementationNotes: 'The result is a conceptual planning estimate, not a direct measurement of muscle-protein synthesis.',
    limitations: ['Actual muscle-protein synthesis cannot be inferred precisely from these inputs.', 'Do not use the result as a clinical or laboratory measurement.'],
    sources: []
  },
  'pull-up-calculator': {
    status: 'custom_estimate',
    formula: 'Performance estimate based on pull-up repetitions and selected body/training inputs.',
    implementationNotes: 'Strength categories are heuristic unless tied to a defined normative dataset and standardized technique.',
    limitations: ['Grip, range of motion, technique and body mass materially affect performance.', 'The result is not a medical fitness clearance.'],
    sources: []
  },
  'pushup-calculator': {
    status: 'custom_estimate',
    formula: 'Push-up performance estimate from repetitions and selected user characteristics.',
    implementationNotes: 'The output is a fitness estimate. It is not a validated cardiovascular or disease-risk assessment.',
    limitations: ['Testing technique and range of motion affect comparability.', 'Performance categories depend on age/sex/reference population assumptions.'],
    sources: []
  },
  'respiratory-rate-calculator': {
    status: 'needs_formula_review',
    formula: 'Resting respiratory-rate interpretation from breaths per minute.',
    implementationNotes: 'Reference ranges and alert thresholds need explicit age/population sourcing. Respiratory rate alone cannot diagnose respiratory disease.',
    limitations: ['Normal respiratory rate varies by age, activity, illness and measurement conditions.', 'Persistent abnormal breathing or respiratory distress requires clinical evaluation.'],
    sources: []
  },
  'resting-metabolic-rate-calculator': {
    status: 'reviewed',
    formula: 'RMR/BMR estimates using named equations including Mifflin-St Jeor, Harris-Benedict and Katch-McArdle where applicable.',
    implementationNotes: 'These equations estimate resting energy expenditure; they do not directly measure metabolic rate. Different equations can produce different estimates.',
    limitations: ['Measured RMR can differ materially from equation estimates.', 'Energy needs also depend on activity, thermic effect of food and individual context.'],
    sources: [{ label: 'Mifflin-St Jeor equation — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/', reviewed: '2026-08-08' }]
  },
  'running-pace-calculator': {
    status: 'reviewed',
    formula: 'Distance/time arithmetic with pace, speed and unit conversions.',
    implementationNotes: 'This is deterministic arithmetic. Performance predictions should remain clearly separate from the pace calculation.',
    limitations: ['Race performance depends on fitness, terrain, weather and pacing.', 'A calculated pace is not a medical assessment.'],
    sources: []
  },
  'sauna-benefits-calculator': {
    status: 'custom_estimate',
    formula: 'Educational estimate based on session duration, temperature and frequency.',
    implementationNotes: 'Sauna exposure is not converted into an individualized disease-risk reduction percentage. Benefits described in the guide are population-level associations where supported.',
    limitations: ['Heat tolerance varies substantially.', 'People with cardiovascular disease, pregnancy or other conditions may need individualized medical advice.'],
    sources: []
  },
  'sauna-health-calculator': {
    status: 'custom_estimate',
    formula: 'Custom sauna exposure score from duration, temperature and frequency.',
    implementationNotes: 'The score is an exposure-planning aid, not a validated health-risk model.',
    limitations: ['Hydration, medications, ambient conditions and medical history can change heat tolerance.', 'Do not interpret the score as proof of cardiovascular or longevity benefit.'],
    sources: []
  },
  'shift-work-health-calculator': {
    status: 'custom_estimate',
    formula: 'Custom shift-work exposure score using schedule, sleep and lifestyle inputs.',
    implementationNotes: 'The score is educational. It must not output a personalized disease probability merely from shift-work exposure.',
    limitations: ['Circadian disruption effects vary by schedule and individual factors.', 'The calculator does not diagnose sleep disorders or occupational disease.'],
    sources: [{ label: 'WHO/IARC — Night Shift Work', url: 'https://www.iarc.who.int/news-events/iarc-monographs-evaluate-the-carcinogenicity-of-night-shift-work/', reviewed: '2026-08-08' }]
  },
  'sit-and-reach-calculator': {
    status: 'custom_estimate',
    formula: 'Flexibility score from sit-and-reach performance and user characteristics.',
    implementationNotes: 'The test is a field measure of flexibility; the score should not be described as a diagnosis of mobility or musculoskeletal health.',
    limitations: ['Protocol, equipment and technique affect results.', 'Hamstring flexibility is only one component of mobility.'],
    sources: []
  },
  'skin-aging-calculator': {
    status: 'custom_estimate',
    formula: 'Heuristic skin-aging estimate from age, sun exposure and lifestyle inputs.',
    implementationNotes: 'The result is an educational estimate. It is not a validated biological-age or dermatologic diagnosis.',
    limitations: ['Skin aging is influenced by genetics, pigmentation, cumulative UV exposure and many other factors.', 'A numeric skin-age result should not be treated as a clinical measurement.'],
    sources: []
  },
  'skin-health-calculator': {
    status: 'custom_estimate',
    formula: 'Custom skin-health score from lifestyle, exposure and skin-care inputs.',
    implementationNotes: 'The score is not a validated dermatologic risk model and should not diagnose skin disease or cancer risk.',
    limitations: ['Persistent, changing or concerning skin lesions require professional evaluation.', 'Self-reported skin characteristics can be inaccurate.'],
    sources: []
  },
  'sleep-cycle-calculator': {
    status: 'custom_estimate',
    formula: 'Bedtime/wake-time planning based on assumed sleep-cycle intervals.',
    implementationNotes: 'Fixed 90-minute cycles are a simplification. Actual sleep cycles vary in duration across people and across the night.',
    limitations: ['The calculator cannot measure sleep stages or sleep quality.', 'Consistent sleep opportunity matters more than hitting an exact cycle boundary.'],
    sources: [{ label: 'AASM/Sleep Research Society — Adult Sleep Duration Consensus', url: 'https://www.aasm.org/resources/pdf/adultsleepdurationconsensus.pdf', reviewed: '2026-08-08' }]
  },
  'sleep-debt-calculator': {
    status: 'custom_estimate',
    formula: 'Difference between selected sleep target and reported sleep duration accumulated over time.',
    implementationNotes: 'The arithmetic is straightforward, but “sleep debt” is not equivalent to a bank account that can be repaid hour-for-hour. Recovery varies.',
    limitations: ['Sleep need varies by person and age.', 'Persistent daytime sleepiness or insomnia warrants clinical evaluation.'],
    sources: [{ label: 'CDC — Short Sleep Duration and Sleep Difficulties Among Adults, 2024', url: 'https://www.cdc.gov/nchs/data/databriefs/db559.pdf', reviewed: '2026-08-08' }, { label: 'AASM/Sleep Research Society — Adult Sleep Duration Consensus', url: 'https://www.aasm.org/resources/pdf/adultsleepdurationconsensus.pdf', reviewed: '2026-08-08' }]
  },
  'sleep-need-calculator': {
    status: 'reviewed',
    formula: 'Sleep-duration recommendation based primarily on age, with user-specific context used for planning.',
    implementationNotes: 'Adults generally need at least 7 hours regularly, but individual sleep need and sleep quality vary. The calculator is not a sleep-disorder diagnostic tool.',
    limitations: ['Sleep need is not determined by age alone.', 'Quality, timing, regularity and sleep disorders also matter.'],
    sources: [{ label: 'AASM/Sleep Research Society — Adult Sleep Duration Consensus', url: 'https://www.aasm.org/resources/pdf/adultsleepdurationconsensus.pdf', reviewed: '2026-08-08' }, { label: 'CDC NCHS — Sleep Data 2024', url: 'https://www.cdc.gov/nchs/data/databriefs/db559.pdf', reviewed: '2026-08-08' }]
  },
  'sodium-intake-calculator': {
    status: 'reviewed',
    formula: 'Daily sodium total compared with selected guideline targets.',
    implementationNotes: 'The result is a dietary intake comparison, not an individualized hypertension treatment plan.',
    limitations: ['Medical conditions can require individualized sodium targets.', 'Food labels and portion estimates introduce measurement error.'],
    sources: [{ label: 'American Heart Association — Sodium Guidance', url: 'https://www.heart.org/en/news/2026/05/04/sodium-can-sneak-up-on-anyone', reviewed: '2026-08-08' }]
  },
  'spo2-risk-calculator': {
    status: 'needs_formula_review',
    formula: 'SpO2 value interpreted against displayed oxygen-saturation thresholds.',
    implementationNotes: 'The tool must not diagnose hypoxemia from one home reading. FDA notes pulse-oximeter readings are estimates with accuracy limitations and should be interpreted with symptoms and context.',
    limitations: ['Accuracy can be affected by circulation, skin pigmentation, temperature, movement and other factors.', 'Only a clinician can diagnose a medical condition such as hypoxia.', 'Do not change medication or treatment based solely on a home pulse-oximeter reading.'],
    sources: [{ label: 'FDA — Pulse Oximeter Basics', url: 'https://www.fda.gov/consumers/consumer-updates/pulse-oximeters-and-oxygen-concentrators-what-know-about-home-oxygen-therapy', reviewed: '2026-08-08' }, { label: 'FDA — Pulse Oximeters', url: 'https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters', reviewed: '2026-08-08' }]
  },
  'sprint-calculator': {
    status: 'custom_estimate',
    formula: 'Sprint time/distance arithmetic with pace and speed conversions.',
    implementationNotes: 'Any fitness percentile or performance classification is a heuristic unless tied to a defined normative dataset.',
    limitations: ['Surface, timing method, wind and technique affect sprint performance.', 'The result is not a medical fitness clearance.'],
    sources: []
  },
  'squat-calculator': {
    status: 'custom_estimate',
    formula: 'Estimated one-repetition maximum and training percentages from squat load/repetition inputs.',
    implementationNotes: 'Named 1RM equations are prediction equations. They do not guarantee a safe or achievable maximal load.',
    limitations: ['Technique and exercise variation affect 1RM estimates.', 'Maximal lifting carries injury risk.'],
    sources: []
  },
  'standing-desk-calculator': {
    status: 'custom_estimate',
    formula: 'Standing/sitting schedule and workstation-planning estimate.',
    implementationNotes: 'The calculator should help plan posture variation and desk height, not claim a validated disease-risk reduction percentage.',
    limitations: ['Individual workstation ergonomics vary.', 'Standing continuously is not automatically healthier than alternating positions.'],
    sources: []
  },
  'steps-calculator': {
    status: 'reviewed',
    formula: 'Steps-to-distance conversion using estimated stride length plus MET-based calorie estimation when weight, pace and duration are supplied.',
    implementationNotes: 'Stride length is estimated, so distance and calorie outputs are approximations. Step-count health associations should not be presented as individual mortality predictions.',
    limitations: ['Stride length varies by person and walking pattern.', 'Wearables differ in step-count accuracy.', 'Calorie estimates are approximate.'],
    sources: []
  }
}
