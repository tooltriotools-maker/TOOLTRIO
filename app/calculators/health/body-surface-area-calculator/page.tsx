import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Body Surface Area Calculator — Mosteller, DuBois & Haycock Formulas 2026',
  description: 'Calculate Body Surface Area (BSA) in square meters using Mosteller, DuBois-DuBois, and Haycock formulas. BSA is used for chemotherapy dosing, burn treatment, and cardiac output calculations in clinical medicine. Free online body surface area calculator 2026. No signup required.',
  slug: 'body-surface-area-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'body surface area calculator 2026',
    'free body surface area calculator',
    'body surface area calculator usa 2026',
    'body surface area calculator free 2026',
    'body surface area calculator',
    'bsa calculator mosteller formula',
    'body surface area for chemotherapy dosing',
    'dubois formula bsa calculator',
    'haycock formula bsa calculator',
    'body surface area in square meters',
    'bsa calculator adults',
    'burn area body surface area',
    'clinical bsa calculation',
    'bsa for medication dosing',
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
  {question:'What is Body Surface Area and why is it used in medicine?',answer:'Body Surface Area (BSA) is the total surface area of the human body in square meters, estimated from height and weight. It is used in medicine primarily for chemotherapy dosing, because many chemotherapy drugs have narrow therapeutic windows — doses too low are ineffective, too high are toxic — and BSA provides a more reliable dose normalization parameter than body weight alone for these drugs. BSA is also used for calculating cardiac output index, burn injury extent assessment, and dosing some biological therapies and blood pressure medications.',},
  {question:'Which BSA formula is most accurate?',answer:'The most commonly used formulas and their characteristics: DuBois & DuBois (1916): the historical gold standard, still widely used in clinical practice. Mosteller (1987): simpler calculation, most widely adopted in modern clinical software — BSA = √(height cm × weight kg / 3600). Haycock (1978): most accurate for children. Boyd (1935): most accurate for very obese patients. The differences between formulas are typically under 5% in most adults. No single formula is universally most accurate — Mosteller is preferred for its simplicity and consistent performance across most adult populations.',},
  {question:'How is BSA used to calculate chemotherapy doses?',answer:'Chemotherapy doses are expressed in mg/m² of BSA — for example, carboplatin at 175 mg/m² BSA. A patient with BSA of 1.8 m² would receive 175 × 1.8 = 315 mg. The rationale for BSA-based dosing is that organ function (particularly liver metabolism and kidney clearance that eliminate drugs) correlates somewhat better with BSA than body weight. However BSA-based chemotherapy dosing has significant limitations: it doesn\'t account for pharmacogenomic variation, organ dysfunction, or pharmacokinetic factors. Many oncologists now use pharmacokinetically-guided dosing (AUC-based dosing) for drugs like carboplatin.',},
  {question:'What is a normal BSA for adults?',answer:'Average adult BSA values: men average approximately 1.9 m² (range 1.6-2.3 m²); women average approximately 1.7 m² (range 1.4-2.0 m²). BSA varies significantly with body size — a 6\'2" 220 lb man might have BSA of 2.2 m², while a 5\'2" 120 lb woman might have BSA of 1.5 m². Children have much smaller BSA proportional to body weight — a 2-year-old averaging approximately 0.52 m². This size difference is why pediatric dosing requires separate BSA calculation and why adult doses are never appropriate for children.',},
  {question:'How do burn injuries use BSA calculations?',answer:'In burn medicine, BSA is used to estimate the extent of burns using the \'Rule of Nines\': head and neck = 9% BSA; each arm = 9% BSA; chest = 9%, abdomen = 9%; upper back = 9%, lower back = 9%; each thigh = 9%, each lower leg = 9%; perineum = 1%. Fluid resuscitation volumes for burn patients (Parkland formula) are calculated as: 4 mL/kg/% burn for the first 24 hours. A 70 kg patient with 30% BSA burns would receive 4 × 70 × 30 = 8,400 mL of Lactated Ringer\'s in the first 24 hours (half in the first 8 hours, half in the next 16 hours).',},
  {question:'Is BSA or BMI more useful for health assessments?',answer:'They serve completely different purposes. BMI (weight/height²) is a screening tool for weight-related health risk — associating weight status with disease risk at the population level. BSA (√(height × weight / factor)) estimates total body surface area for clinical procedures and drug dosing. BMI is used in public health, primary care, and nutrition. BSA is used in oncology, cardiology, nephrology, and burn medicine for specific clinical calculations. Neither is better overall — they are tools designed for different applications. Using BSA for health screening or BMI for drug dosing would both be inappropriate misapplications.',},
  {question:'How does obesity affect BSA-based drug dosing?',answer:'Obesity complicates BSA-based dosing because very high BSA values in obese patients would indicate extremely high absolute drug doses that may not be safe. Most chemotherapy dosing guidelines cap BSA at 2.0-2.2 m² for obese patients or recommend using adjusted ideal body weight rather than actual body weight for BSA calculations. The pharmacokinetics of drugs in obese patients are complex — some drugs distribute into fat (lipophilic drugs) while others don\'t, and organ function may or may not scale with total body size. Oncologists and pharmacists should consult obesity-specific dosing guidelines for each drug in obese patients.',},
]

const seoContent = {
  title: 'Body Surface Area Calculator',
  category: 'health' as const,
  intro: `Body surface area is a clinical measurement — most people will encounter it in the context of medication dosing, burn assessment, or chemotherapy calculation rather than general wellness tracking. Unlike BMI, which is a proxy for body fatness, BSA is a direct geometric estimate of the total area of a person's skin. It matters because many drugs distribute across body surfaces and some cancer treatments are dosed by BSA to reduce toxicity while maintaining efficacy.

There are several validated formulas for estimating BSA, each developed from different population datasets: the Mosteller formula (simplest and widely used), the Du Bois formula (historically significant, derived from a small sample), the Haycock formula (more accurate in pediatric patients), and the Gehan-George formula. Results vary by a few percent between methods. This calculator provides results from multiple formulas so you can see the range and use whichever method is specified for your clinical context.

The average adult BSA is approximately 1.7 m² (ranging roughly 1.5-2.0 m² for typical adults). Pediatric BSA follows predictable growth curves but differs substantially from adult values — drug dosing calculations for children should always be done by a prescribing clinician, not a general-purpose calculator.

If you're using this for a clinical purpose, verify which formula your treatment protocol specifies. If you're calculating out of curiosity or for general health tracking, the Mosteller formula is the standard starting point.

**Long-tail searches answered here:** body surface area calculator free online usa, bsa calculator for medication dosing free tool, how to calculate body surface area formula online, mosteller formula bsa calculator free no signup, body surface area calculator for nurses and pharmacists, medical bsa calculator pounds and inches free, bsa for chemotherapy dosing calculator usa free, du bois formula vs mosteller bsa comparison calculator, body surface area calculation for pediatric dosing free, bsa calculator for fluid management clinical free usa, how body surface area changes with weight loss calculator, bsa for burn area coverage estimation calculator usa free, gehan george formula bsa calculator free online, body surface area vs body weight dosing comparison, bsa normalization for cardiac output calculator usa free`,
  howItWorks: `BSA is calculated from height and weight using one of four validated formulas. Mosteller: BSA(m²) = √(height(cm) × weight(kg)/3600) — widely used in clinical practice for simplicity. DuBois & DuBois: BSA = 0.20247 × height(m)^0.725 × weight(kg)^0.425 — the historical gold standard, validated against direct measurement of body surface area in 9 subjects in 1916. Haycock: BSA = 0.024265 × height(cm)^0.3964 × weight(kg)^0.5378 — most accurate for pediatric patients. Boyd: mathematically complex but accurate across extreme weight ranges.

BSA in m² is used to normalize drug doses in chemotherapy, cardiac index (cardiac output per m² BSA), and radiation therapy fields.`,
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
  tipsSection: `The clinical application of BSA is primarily for drug dosing — particularly chemotherapy where dosing errors can be life-threatening. If you are calculating BSA for clinical purposes, use the same formula your oncologist or clinical pharmacist is using, since different formulas produce results differing by 3-7%.

For most chemotherapy protocols, Mosteller is the most commonly used formula in the US due to its simplicity and acceptable accuracy. The DuBois formula tends to underestimate BSA in obese patients.

BSA calculation for pediatric patients should use Haycock or Mosteller — the DuBois formula was not validated in children and may be less accurate in this population.`,
  scienceSection: `The original DuBois & DuBois paper (1916) measured surface area by covering the bodies of 9 subjects with paper and weighing it — a remarkably simple but effective direct measurement technique that established the reference data for all subsequent regression equations. The resulting formula has been in continuous clinical use for over 100 years despite the small original sample size, a testament to its empirical accuracy.`,
  conclusion: `Body surface area rarely needs to be calculated outside of clinical contexts. If a physician or pharmacist has asked you to know your BSA — often for chemotherapy dosing, antifungal medication, or certain cardiovascular drugs — use the formula they specify and bring the result to your appointment rather than having them calculate it on the spot.

For general body composition tracking, BSA doesn't provide actionable health insights the way that body fat percentage, waist circumference, or cardiovascular fitness metrics do. It's a geometric measurement, not a metabolic one.

For more health-relevant body metrics, use [our BMI Calculator](/calculators/health/bmi-calculator) and [our Body Fat Calculator](/calculators/health/body-fat-calculator) alongside waist-to-height ratio to get a meaningful picture of your metabolic health status.`,
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
        generateWebAppStructuredData({ name: 'Body Surface Area Calculator', description: 'Calculate Body Surface Area (BSA) in square meters using Mosteller, DuBois-DuBois, and Haycock formulas. BSA is used for chemotherapy dosing, burn tre', url: 'https://tooltrio.com/calculators/health/body-surface-area-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Body Surface Area Calculator', description: 'Calculate Body Surface Area (BSA) in square meters using Mosteller, DuBois-DuBois, and Haycock formulas. BSA is used for chemotherapy dosing, burn tre', url: 'https://tooltrio.com/calculators/health/body-surface-area-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Body Surface Area Calculator', url: '/calculators/health/body-surface-area-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
