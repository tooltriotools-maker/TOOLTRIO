export type HealthYMYLSource = { label: string; url: string }

const S = {
  cdc: { label: 'CDC — Health Topics', url: 'https://www.cdc.gov/health-topics/' },
  medline: { label: 'MedlinePlus — Health Information', url: 'https://medlineplus.gov/healthtopics.html' },
  who: { label: 'WHO — Health Topics', url: 'https://www.who.int/health-topics' },
  acog: { label: 'ACOG — Women’s Health', url: 'https://www.acog.org/womens-health' },
  niddk: { label: 'NIDDK — Health Information', url: 'https://www.niddk.nih.gov/health-information' },
  nhlbi: { label: 'NHLBI — Health Information', url: 'https://www.nhlbi.nih.gov/health' },
  nimh: { label: 'NIMH — Mental Health Information', url: 'https://www.nimh.nih.gov/health' },
  ods: { label: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
  nci: { label: 'National Cancer Institute', url: 'https://www.cancer.gov/about-cancer' },
  fda: { label: 'FDA — Drugs and Medical Products', url: 'https://www.fda.gov/drugs' },
  cdcExercise: { label: 'CDC — Physical Activity', url: 'https://www.cdc.gov/physical-activity/' },
  cdcSleep: { label: 'CDC — Sleep', url: 'https://www.cdc.gov/sleep/' },
  nidcd: { label: 'NIDCD — Hearing and Communication', url: 'https://www.nidcd.nih.gov/health' },
  aad: { label: 'American Academy of Dermatology — Skin Health', url: 'https://www.aad.org/public' },
  aao: { label: 'American Academy of Ophthalmology — Eye Health', url: 'https://www.aao.org/eye-health' },
  ada: { label: 'American Dental Association — Oral Health', url: 'https://www.ada.org/resources/ada-library/oral-health-topics' },
  aaaai: { label: 'AAAAI — Allergy and Immunology', url: 'https://www.aaaai.org/' },
} as const

export function getHealthYMYLSourceDefaults(slug: string): HealthYMYLSource[] {
  const s = slug.toLowerCase()
  if (/(pregnan|pregnancy|ovulation|fertility|menstrual|period|pcos|contracept|breastfeeding|due-date|due-date)/.test(s)) return [S.acog]
  if (/(infant|baby|child|growth|percentile|height|weight-for-age)/.test(s)) return [S.who, S.cdc]
  if (/(kidney|renal|creatinine|egfr|gfr|ckd)/.test(s)) return [S.niddk]
  if (/(diabetes|glucose|a1c|insulin)/.test(s)) return [S.niddk, S.cdc]
  if (/(thyroid)/.test(s)) return [S.niddk]
  if (/(exercise|workout|running|cycling|hiit|marathon|fitness|calorie-burned|steps|vo2|max-heart-rate)/.test(s)) return [S.cdcExercise]
  if (/(sleep|circadian|jet-lag)/.test(s)) return [S.cdcSleep]
  if (/(hearing|ear)/.test(s)) return [S.nidcd]
  if (/(skin|dermat|acne|sun|uv)/.test(s)) return [S.aad]
  if (/(eye|vision|visual|blue-light)/.test(s)) return [S.aao]
  if (/(dental|oral|tooth|gum)/.test(s)) return [S.ada]
  if (/(allergy|allergen|food-sensitivity)/.test(s)) return [S.aaaai]
  if (/(cholesterol|blood-pressure|heart|cardiac|stroke|abi|vascular|pulse|oxygen|spo2|respiratory)/.test(s)) return [S.nhlbi, S.cdc]
  if (/(mental|depression|anxiety|stress|wellbeing|wellness|loneliness|meditation)/.test(s)) return [S.nimh]
  if (/(vitamin|supplement|creatine|iron|calcium|magnesium|protein)/.test(s)) return [S.ods]
  if (/(cancer|oncology|tumou?r)/.test(s)) return [S.nci]
  if (/(drug|medication|dose|dosage|pill)/.test(s)) return [S.fda]
  return [S.medline]
}
