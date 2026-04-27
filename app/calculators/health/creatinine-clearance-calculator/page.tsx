import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Creatinine Clearance Calculator — GFR Estimation (Cockcroft-Gault & CKD-EPI) 2026',
  description: 'Calculate estimated kidney function using Creatinine Clearance (Cockcroft-Gault formula) and eGFR (CKD-EPI equation). Interpret results against CKD staging criteria and understand implications for drug dosing. Free online creatinine clearance calculator 2026. No signup required.',
  slug: 'creatinine-clearance-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'creatinine clearance calculator 2026',
    'free creatinine clearance calculator',
    'creatinine clearance calculator usa 2026',
    'creatinine clearance calculator free 2026',
    'creatinine clearance calculator',
    'cockcroft gault formula calculator',
    'egfr calculator from creatinine',
    'kidney function calculator from creatinine',
    'ckd staging calculator',
    'creatinine clearance for drug dosing',
    'kidney filtration rate calculator',
    'what is normal creatinine clearance',
    'egfr and kidney disease stages',
    'creatinine to kidney function',
  ],
})

const relatedCalculators = [

  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"Body mass index assessment"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Daily calorie needs"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total energy expenditure"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition analysis"},
  {name:"Protein Intake Calculator",href:"/calculators/health/protein-intake-calculator",icon:"🥩",desc:"Optimal protein targets"},
  {name:"Water Intake Calculator",href:"/calculators/health/water-intake-calculator",icon:"💧",desc:"Daily hydration needs"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Cardiovascular zones"},
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Macronutrient targets"}

]

const faqs = [
  {question:'What does creatinine clearance measure?',answer:'Creatinine clearance (CrCl) estimates the glomerular filtration rate (GFR) — the volume of blood the kidneys filter per minute. It is calculated from blood creatinine levels (sometimes 24-hour urine creatinine), age, weight, and sex using the Cockcroft-Gault equation: CrCl = [(140 - age) × weight (kg)] / [72 × serum creatinine (mg/dL)] × 0.85 for women. It is expressed in mL/min and represents how efficiently the kidneys are removing creatinine — a metabolic waste product of muscle metabolism — from the blood. Normal CrCl is approximately 90-140 mL/min for young healthy adults, declining with age.',},
  {question:'What is a normal creatinine clearance?',answer:'Normal values: young adults (20-30 years): 100-140 mL/min; middle age (40-50): 90-120 mL/min; older adults (60+): 60-90 mL/min. CrCl declines approximately 1 mL/min per year after age 40 as part of normal aging. CKD staging by GFR: Stage 1 (≥90 mL/min with kidney damage markers); Stage 2 (60-89 mL/min with damage markers); Stage 3a (45-59 mL/min); Stage 3b (30-44 mL/min); Stage 4 (15-29 mL/min); Stage 5 (<15 mL/min, kidney failure). Values below 60 mL/min for more than 3 months indicate chronic kidney disease.',},
  {question:'How is creatinine clearance used for drug dosing?',answer:'Many drugs are primarily cleared by kidney excretion — for these drugs, the dose must be reduced and/or dosing interval extended when kidney function is impaired. Examples requiring dose adjustment: most antibiotics (aminoglycosides, vancomycin, many cephalosporins), metformin (contraindicated when CrCl <30 mL/min due to lactic acidosis risk), digoxin, most blood thinners, gabapentin, and many chemotherapy agents. The Cockcroft-Gault equation specifically was validated for drug dosing and remains the preferred formula in pharmacokinetics, even though CKD-EPI is more accurate for kidney disease staging.',},
  {question:'What is the difference between eGFR and creatinine clearance?',answer:'eGFR (estimated GFR) is calculated from the CKD-EPI or MDRD equations using serum creatinine, age, sex, and race — it directly estimates GFR in mL/min/1.73m² (normalized to average body surface area). Creatinine clearance (CrCl) from the Cockcroft-Gault equation estimates clearance before normalizing to body surface area, in mL/min. For clinical drug dosing, Cockcroft-Gault CrCl (non-normalized) is typically used because drug clearance scales with absolute kidney function, not body-surface-area-normalized function. For CKD staging and epidemiology, CKD-EPI eGFR is preferred for better accuracy across different GFR ranges.',},
  {question:'What causes acute versus chronic kidney function decline?',answer:'Acute kidney injury (AKI): sudden CrCl decline from dehydration, sepsis, hypotension (reduced blood flow to kidneys), nephrotoxic drugs (NSAIDs, aminoglycoside antibiotics, contrast dye, some chemotherapy), urinary obstruction, or acute glomerulonephritis. CrCl typically recovers with treatment. Chronic kidney disease (CKD): slow, progressive decline from diabetic nephropathy (most common cause in US), hypertension-related nephrosclerosis (second most common), polycystic kidney disease, chronic glomerulonephritis, or recurrent kidney infections. CKD is generally irreversible but its progression can be slowed by blood pressure control, blood glucose control, and ACE inhibitors/ARBs.',},
  {question:'How does muscle mass affect creatinine levels?',answer:'Serum creatinine is a byproduct of muscle creatine metabolism — production rate correlates with muscle mass. This creates an important clinical confounder: a 130 lb woman with CKD may have a serum creatinine of 0.9 mg/dL that appears \'normal\' because her low muscle mass produces less creatinine. Her actual GFR might be substantially below normal despite the apparently reassuring creatinine. Conversely, a very muscular bodybuilder might have serum creatinine of 1.4 mg/dL from high muscle mass with perfectly normal kidney function. The Cockcroft-Gault equation partially corrects for this by including body weight, and the CKD-EPI equation was developed specifically to reduce this muscle mass confound.',},
  {question:'When should I see a nephrologist for kidney function concerns?',answer:'Indications for nephrology referral: eGFR below 30 mL/min/1.73m²; rapid kidney function decline (>25% eGFR drop within 12 months); recurrent kidney stones; significant proteinuria (protein in urine); hematuria (blood in urine) without an obvious cause; suspected rare kidney diseases (lupus nephritis, ANCA vasculitis, IgA nephropathy); consideration for dialysis or kidney transplant preparation; and patients in whom the cause of CKD is unclear. Primary care should be involved in managing all stages of CKD, but specialist care is appropriate for the indications above.',},
]

const seoContent = {
  title: 'Creatinine Clearance Calculator',
  category: 'health' as const,
  intro: `Creatinine clearance is a measure of kidney filtration efficiency — specifically, how well your kidneys are removing creatinine (a waste product from muscle metabolism) from your blood. When kidneys function normally, they clear creatinine efficiently and blood levels stay low. When kidney function declines, creatinine accumulates. Measuring how much creatinine the kidneys clear per minute gives clinicians a practical window into overall glomerular filtration rate (GFR).

This matters because many medications are cleared by the kidneys, and dosing must be adjusted for people with reduced kidney function to avoid toxicity. The Cockcroft-Gault equation — the standard formula used in clinical pharmacology for 50 years — estimates creatinine clearance from serum creatinine, age, body weight, and sex. Normal creatinine clearance is roughly 90-130 mL/min for adults, declining gradually with age.

Values below 60 mL/min indicate at least moderate kidney function reduction; below 30 mL/min requires careful medication management and close nephrology follow-up; below 15 mL/min typically indicates end-stage kidney disease.

This calculator requires your serum creatinine from a blood test. If you don't have that value, this calculator won't give you useful results — creatinine clearance cannot be estimated without lab data.

**Long-tail searches answered here:** creatinine clearance calculator free online usa, gfr calculator from creatinine level free tool, cockcroft gault creatinine clearance formula calculator, kidney function calculator from blood test free, egfr calculator no signup free online usa, how to calculate kidney function from creatinine, creatinine 1.2 what does that mean gfr calculator, cockcroft gault vs mdrd egfr formula comparison free, creatinine clearance for elderly patients calculator usa free, creatinine based drug dosing adjustment calculator free, serum creatinine to gfr conversion steps free usa, creatinine clearance for 70 year old female calculator, adjusted vs unadjusted creatinine clearance calculator free, creatinine clearance race correction calculator usa free, creatinine clearance decline rate calculator free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate creatinine clearance from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

Results are calibrated against population reference data from major US health surveys including NHANES (National Health and Nutrition Examination Survey), giving your result meaningful context relative to real Americans of your age and sex.

All calculations run locally in your browser. No data is transmitted anywhere. Results appear instantly as you adjust inputs.`,
  benefits: [
        {title:"Evidence-based clinical formulas",text:"Uses peer-reviewed, validated formulas from major health organizations — the same calculations trusted by healthcare professionals in clinical and research settings."},
        {title:"Instant real-time results",text:"Results update as you type — no button to click. Explore multiple scenarios in seconds to understand how changes affect your result."},
        {title:"Complete data privacy",text:"All calculations run entirely in your browser. No personal health data is transmitted, stored, or shared anywhere — ever."},
        {title:"Health context included",text:"Beyond a raw number, results include reference ranges, health category classification, and guidance from major health organizations on what your result means."},
        {title:"Works on all devices",text:"Fully responsive design works perfectly on phone, tablet, and desktop. No app download required — just open in your browser."},
        {title:"Completely free",text:"No signup, no subscription, no premium features. Every calculation and all health context is permanently free for every user."},
  ],
  useCases: [
        {title:"Annual health monitoring",text:"Calculate and record key health metrics annually to build a personal health history that reveals meaningful trends and supports proactive health decisions over time."},
        {title:"Doctor appointment preparation",text:"Arrive at medical appointments with your own calculations already done, enabling more focused and productive conversations about your health with your healthcare provider."},
        {title:"Wellness program participation",text:"Track progress in employer wellness programs or personal health initiatives with objective, calculated metrics that are meaningful and evidence-based."},
        {title:"Health education and research",text:"Students, educators, and researchers in health and nutrition fields use these tools to apply classroom formulas to real-world calculations and develop genuine health literacy."},
  ],
  tipsSection: `Take measurements consistently under the same conditions for meaningful trend comparisons. Use the same time of day, same equipment, and same protocol each time you recalculate to minimize measurement variability.

Track trends over months rather than reacting to any single measurement. Health metrics fluctuate naturally based on hydration, food intake, sleep, and stress — patterns over 3-6 months are far more meaningful than individual data points.

Bring your results to your healthcare provider for professional interpretation in the context of your full health history, especially if results fall significantly outside the healthy reference ranges shown.`,
  scienceSection: `The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals. Reference ranges are drawn from NHANES population survey data — the CDC's nationally representative survey of American adults — ensuring your result is compared against real, current population data.

As with all health calculations, individual results differ from population-average predictions based on genetic factors, medications, health conditions, and lifestyle variables. These calculations are educational tools, not diagnostic instruments. Always consult qualified healthcare professionals for medical decisions.`,
  conclusion: `Creatinine clearance estimates are exactly that — estimates. The Cockcroft-Gault equation can over- or underestimate true GFR by 10-20% in various populations, particularly in older adults with low muscle mass who have falsely low serum creatinine.

If your calculated creatinine clearance is below 60 mL/min, or if you're experiencing symptoms of kidney dysfunction, these results should be discussed with your physician. Kidney function assessment typically involves multiple labs beyond serum creatinine.

For medication dosing adjustments based on kidney function, always use the formula specified in the drug's prescribing information or by your pharmacist — different medications use different estimation equations.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Creatinine Clearance Calculator', description: 'Calculate estimated kidney function using Creatinine Clearance (Cockcroft-Gault formula) and eGFR (CKD-EPI equation). Interpret results against CKD st', url: 'https://tooltrio.com/calculators/health/creatinine-clearance-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Creatinine Clearance Calculator', description: 'Calculate estimated kidney function using Creatinine Clearance (Cockcroft-Gault formula) and eGFR (CKD-EPI equation). Interpret results against CKD st', url: 'https://tooltrio.com/calculators/health/creatinine-clearance-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Creatinine Clearance Calculator', url: '/calculators/health/creatinine-clearance-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
