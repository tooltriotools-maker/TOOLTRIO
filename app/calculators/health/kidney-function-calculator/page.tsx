import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Kidney Function Calculator — eGFR, CKD Stages & Creatinine Interpretation 2026',
  description: 'Estimate kidney function from blood creatinine level using CKD-EPI and Cockcroft-Gault equations. Understand CKD staging, what eGFR values mean for kidney health, and when to seek nephrology evaluation. Free online kidney function calculator 2026. No signup required.',
  slug: 'kidney-function-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'kidney function calculator 2026',
    'free kidney function calculator',
    'kidney function calculator usa 2026',
    'kidney function calculator free 2026',
    'kidney function calculator from creatinine',
    'egfr calculator',
    'ckd staging from egfr',
    'kidney disease risk calculator',
    'creatinine to egfr calculator',
    'kidney health assessment',
    'what is egfr kidney function',
    'kidney function by age',
    'chronic kidney disease stages',
    'kidney function test interpretation',
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
  {question:'What is eGFR and what does it actually measure?',answer:`eGFR (estimated Glomerular Filtration Rate) measures how much blood the kidneys filter per minute, normalized to body surface area. The glomeruli are tiny filtering units in the kidney — each kidney contains approximately 1 million of them. The gold standard is to measure actual GFR using inulin clearance or iohexol infusion (extremely precise but clinically impractical). eGFR uses serum creatinine — a muscle metabolism waste product that the kidneys filter — as a proxy. If creatinine is accumulating in blood (rising), the kidneys are filtering less efficiently. The CKD-EPI 2021 equation (which no longer adjusts for race) uses creatinine, age, and sex to estimate GFR in mL/min/1.73m2. A normal eGFR is 90 or above. Importantly, eGFR below 60 for more than 3 months meets the definition of chronic kidney disease regardless of cause.`},
  {question:'What are the 5 stages of chronic kidney disease?',answer:`CKD is staged by eGFR and the presence of kidney damage markers (proteinuria, abnormal imaging, structural abnormalities). Stage 1: eGFR 90 or above with evidence of kidney damage (like persistent proteinuria). Stage 2: eGFR 60-89 with kidney damage. Stage 3a: eGFR 45-59; Stage 3b: eGFR 30-44. Stage 4: eGFR 15-29 — patients are prepared for renal replacement therapy (dialysis or transplant) planning. Stage 5: eGFR below 15 — kidney failure, requiring dialysis or transplant for survival. The progression rate varies enormously: many people with Stage 3 CKD, particularly those with diabetes and hypertension well-controlled, remain stable at Stage 3 for decades. Untreated hypertension, poorly controlled diabetes, and certain medications accelerate progression significantly.`},
  {question:'What are the earliest warning signs that kidneys are struggling?',answer:`Early CKD (Stages 1-3) is almost always asymptomatic — this is the key reason routine testing matters. The kidneys have enormous reserve capacity; symptoms don't typically appear until eGFR falls below 15-30 (Stage 4-5). When symptoms do appear, they include: foamy urine (protein leak causes a persistent foam, like shaking soapy water); swelling in ankles, feet, or around eyes (fluid retention from reduced albumin and sodium excretion); fatigue and weakness (anemia from reduced erythropoietin production begins around eGFR 30); nausea and reduced appetite; increased urination frequency, especially at night (loss of concentrating ability, a late sign); and itching (uremic pruritus from retained waste products, a late sign in Stage 4-5). The presence of hypertension, type 2 diabetes, or family history of kidney disease warrants annual creatinine and urinalysis testing even without symptoms.`},
  {question:'How do blood pressure and kidney disease interact?',answer:`Hypertension and CKD are mutually reinforcing — one of medicine's most important vicious cycles. High blood pressure damages glomerular capillaries through hemodynamic stress, causing progressive nephron loss, which in turn reduces the kidney's sodium-excreting capacity, raising blood pressure further. Approximately 80-85% of CKD patients have hypertension by Stage 3-4. Target blood pressure in CKD is below 130/80 mmHg — more aggressive than the general population target — because even mildly elevated pressure in the context of damaged kidneys causes disproportionate progression. ACE inhibitors and ARBs are first-line antihypertensives in CKD with proteinuria because they specifically reduce intraglomerular pressure (offering kidney protection beyond just lowering blood pressure), though they require monitoring for hyperkalemia and creatinine rises in early treatment.`},
  {question:'Can the kidneys heal or regenerate after damage?',answer:`The kidneys have very limited regenerative capacity compared to the liver. Individual nephrons, once lost, do not regenerate. However, remaining nephrons can hypertrophy (enlarge) and increase their filtration rate to partially compensate for lost units — this is why people with one kidney can have near-normal kidney function. Acute kidney injury (AKI) — sudden kidney function loss from dehydration, sepsis, or toxic exposures — can often fully recover if the cause is quickly reversed, because acute tubular injury can heal while the glomeruli remain intact. Chronic kidney disease represents fibrosis of the glomerular architecture that is not reversible with current treatments. However, progression can be substantially slowed or even arrested with excellent blood pressure control, diabetes management, appropriate medication adjustments, and avoiding nephrotoxic exposures. The goal of CKD management is stopping progression, not restoring lost function.`},
  {question:'Which common medications damage the kidneys?',answer:`Nephrotoxic medications are a significant and underrecognized cause of kidney injury. NSAIDs (ibuprofen, naproxen, diclofenac) reduce prostaglandin-mediated afferent arteriole dilation, reducing glomerular perfusion — this is particularly harmful in patients with existing CKD, heart failure, or dehydration, where prostaglandins are essential to maintaining renal blood flow. Regular NSAID use increases CKD progression rate significantly and can cause papillary necrosis with very heavy long-term use. Aminoglycoside antibiotics (gentamicin, tobramycin) are directly tubulotoxic and require monitoring. Contrast dye for imaging can cause contrast-induced nephropathy, particularly in those with CKD or diabetes. Metformin doesn't damage kidneys directly but must be held before contrast administration and in severe CKD because it's renally cleared and can accumulate to toxic levels. Certain herbal supplements, particularly aristolochic acid-containing compounds, cause severe progressive nephropathy.`},
  {question:'What dietary changes protect kidney function?',answer:`Evidence-based dietary strategies for CKD: protein restriction (0.6-0.8g/kg body weight in Stages 3-5 reduces uremia symptoms and may slow progression by reducing glomerular hyperfiltration), though adequate protein for muscle maintenance must be balanced; sodium restriction (under 2,000 mg/day reduces blood pressure and proteinuria); phosphorus control in advanced CKD (reduced kidney clearance causes phosphate retention, which drives parathyroid hormone excess and vascular calcification — processed foods and dark colas are especially high in phosphate additives); potassium management in later stages when kidneys can no longer excrete excess potassium; and limiting red meat (increases uremic toxin precursors and acidifies blood). Plant-based diets are increasingly supported in CKD research: they produce less uremic toxin load, tend to be lower in phosphate with less absorbable forms, and reduce blood pressure.`},
  {question:'How is kidney disease diagnosed and monitored?',answer:`Standard CKD diagnosis and monitoring requires two components: an eGFR below 60 (or kidney damage marker present) on at least two occasions separated by at least 3 months (excluding acute conditions), plus the cause identified when possible. Monitoring tests include: serum creatinine and eGFR (every 3-12 months depending on stage and stability), urine albumin-to-creatinine ratio (UACR — the most sensitive proteinuria test, measured on a random urine sample; values above 30 mg/g indicate kidney damage), blood pressure, serum electrolytes (sodium, potassium, bicarbonate), phosphorus and calcium (in Stages 3-5), hemoglobin (erythropoietin deficiency causes anemia in advanced CKD), and parathyroid hormone (secondary hyperparathyroidism begins in Stage 3 from vitamin D deficiency and phosphate retention). Kidney ultrasound is typically performed at diagnosis to assess kidney size, structure, and rule out obstruction.`},
]

const seoContent = {
  title: 'Kidney Function Calculator',
  category: 'health' as const,
  intro: `Chronic kidney disease affects an estimated 37 million Americans — about 1 in 7 adults — and roughly 90% don't know they have it because early-to-moderate CKD has no symptoms. The kidneys lose function gradually over years, and by the time symptoms appear (fatigue, swelling, changes in urination, difficulty concentrating), significant permanent damage has often already occurred.

Estimated glomerular filtration rate (eGFR) is the primary measure of kidney function used clinically. Normal eGFR is above 90 mL/min/1.73m²; CKD staging goes from Stage 1 (eGFR >90 with evidence of kidney damage) through Stage 5 (<15, kidney failure requiring dialysis or transplant). Stages 1-3a often have no symptoms at all.

The 2021 CKD-EPI creatinine equation estimates eGFR from serum creatinine, age, and sex. It's more accurate than the older MDRD equation at higher eGFR values.

This calculator requires your serum creatinine from a recent blood test. Without that value, eGFR cannot be meaningfully estimated — kidney function cannot be assessed from symptoms or general health information alone.

**Long-tail searches answered here:** kidney function calculator free online usa, how healthy are my kidneys calculator free tool, gfr kidney function calculator from creatinine, ckd stage calculator from egfr no signup free, kidney disease risk score calculator usa free, kidney health assessment calculator free online 2026, egfr 60 vs 90 kidney function comparison calculator, stage 3 ckd egfr range calculator free usa, how quickly does kidney function decline calculator, creatinine to gfr conversion calculator usa free, medication dosing adjustment for kidney function calculator, kidney function from blood urea nitrogen calculator free, hydration impact on kidney function calculator usa free, protein intake and kidney health risk calculator free, progression of ckd stages timeline calculator free usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate kidney function from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `If your calculated eGFR falls below 60 mL/min/1.73m² on more than one measurement taken at least 3 months apart, this meets the definition of CKD and warrants nephrology consultation. A single low reading may represent acute kidney injury from dehydration, infection, or medication effects.

The most modifiable risk factors for CKD progression are blood pressure control (target below 130/80 mmHg in most CKD patients), blood glucose control in diabetes, and avoiding nephrotoxic exposures (NSAIDs like ibuprofen and naproxen, contrast dye, certain antibiotics).

Protein and potassium restriction are often recommended in later-stage CKD but are not appropriate for everyone — this is a conversation with a nephrologist or renal dietitian. Use [our Creatinine Clearance Calculator](/calculators/health/creatinine-clearance-calculator) for medication dosing applications.`,
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
        generateWebAppStructuredData({ name: 'Kidney Function Calculator', description: 'Estimate kidney function from blood creatinine level using CKD-EPI and Cockcroft-Gault equations. Understand CKD staging, what eGFR values mean for ki', url: 'https://tooltrio.com/calculators/health/kidney-function-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Kidney Function Calculator', description: 'Estimate kidney function from blood creatinine level using CKD-EPI and Cockcroft-Gault equations. Understand CKD staging, what eGFR values mean for ki', url: 'https://tooltrio.com/calculators/health/kidney-function-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Kidney Function Calculator', url: '/calculators/health/kidney-function-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
