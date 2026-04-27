import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Keto Macro Calculator — Net Carbs, Protein & Fat for Ketosis 2026',
  description: 'Free Keto Macro Calculator 2026 — Calculate your optimal macros (protein, carbs, fat) for your specific goals. Based on TDEE and goal type. Real examples for weight loss and muscle building. Instant results.',
  slug: 'keto-macro-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'keto macro calculator 2026',
    'free keto macro calculator',
    'keto macro calculator usa 2026',
    'macro calculator 2026',
    'keto macro calculator 2026',
    'macronutrient calculator 2026',
    'keto macro calculator',
    'ketogenic diet macro calculator',
    'net carbs for ketosis',
    'keto protein and fat ratio',
    'how many carbs for ketosis',
    'keto calorie calculator',
    'ketosis macro split',
    'keto for weight loss macros',
    'low carb macro calculator',
    'keto electrolyte needs calculator',
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
  {question:'What is the difference between nutritional ketosis and ketoacidosis?',answer:`Nutritional ketosis and diabetic ketoacidosis (DKA) are often confused but are entirely different physiological states. Nutritional ketosis — the state produced by a ketogenic diet — involves blood ketone levels of 0.5-3.0 mmol/L (occasionally up to 5 mmol/L in prolonged fasting). Insulin is present and functional, and blood glucose remains normal. The body is using ketones as an alternative fuel alongside remaining glucose. Diabetic ketoacidosis is a medical emergency occurring primarily in type 1 diabetes where insulin is absent — ketones rise to 15-25 mmol/L (5-8 times higher), blood glucose exceeds 250-300 mg/dL, and the blood pH drops dangerously (below 7.3). For people with a functional pancreas, including type 2 diabetics who still produce some insulin, DKA essentially cannot occur from diet alone. The confusion arises partly because both involve elevated ketones, but the mechanisms and magnitudes are completely different.`},
  {question:'How many carbohydrates can I eat and still stay in ketosis?',answer:`The carbohydrate threshold for ketosis varies significantly between individuals, but most people achieve nutritional ketosis by keeping net carbohydrates (total carbs minus fiber) under 20-30 grams per day initially, with some people tolerating up to 50 grams. Net carbs are calculated because fiber is not digested and doesn't affect blood glucose or insulin. After 3-4 weeks of keto-adaptation, some people can increase carbohydrates to 50-70g net carbs/day while maintaining ketosis, due to improved fat oxidation efficiency. Individual variation is driven by factors including: insulin sensitivity (more insulin-sensitive people can tolerate more carbs), activity level (athletes can consume more carbs because glucose is oxidized during exercise), metabolic rate, and measurement context (ketone levels vary throughout the day). Blood ketone monitoring with a meter is the only definitive way to identify your personal threshold.`},
  {question:'What are the most common keto mistakes that prevent ketosis?',answer:`Common mistakes that block ketosis: hidden carbohydrates in 'keto-friendly' processed foods (maltitol and other sugar alcohols still have significant glycemic impact; check labels carefully); protein overconsumption (excess protein above needs is converted to glucose via gluconeogenesis — protein should be moderate, roughly 0.7-1.0g per pound of body weight, not unlimited); dairy overconsumption (milk and most yogurts are high in lactose, a sugar; full-fat cheese and heavy cream are fine but milk and flavored yogurts are not); not tracking vegetables carefully (starchy vegetables like peas, corn, and beets have significant carbohydrates); medications that can affect glucose or insulin (some antidepressants, steroids, certain blood pressure medications); and not waiting for full keto-adaptation before assessing performance (the first 2-4 weeks of keto feel worse before performance improves as the body builds fat oxidation machinery).`},
  {question:'What is the keto flu and how long does it last?',answer:`The keto flu refers to a cluster of symptoms that commonly appear in the first 3-7 days of starting a strict ketogenic diet: fatigue, headache, brain fog, irritability, muscle cramps, nausea, dizziness, and poor exercise performance. The primary cause is electrolyte loss: when carbohydrate intake drops, insulin levels fall, and the kidneys excrete more sodium and water (insulin normally promotes sodium retention). Sodium loss takes potassium and magnesium with it through the kidneys and sweat. The symptoms are essentially a combination of mild dehydration and electrolyte imbalance, not a direct effect of ketosis itself. The solution: proactively replace electrolytes — 1-2 grams additional sodium daily (using sea salt liberally or adding it to water), 1-2 grams potassium, and 300-500 mg magnesium. Most people who supplement electrolytes adequately experience little to no keto flu. The adaptation period of 4-8 weeks (full keto-adaptation) is separate from the keto flu, which resolves within a week with adequate electrolytes.`},
  {question:'Does a ketogenic diet build or maintain muscle?',answer:`The keto diet's effect on muscle mass is better than its critics claim but requires deliberate management. Early studies showing muscle loss on keto typically used inadequate protein intake — when protein is kept at 1.6-2.2g/kg body weight, multiple studies show keto maintains lean mass similar to non-keto diets at the same protein intake. A 2022 study in Medicine and Science in Sports and Exercise found that resistance-trained athletes on a high-protein keto diet maintained muscle mass and actually improved body composition over 10 weeks compared to moderate-carb controls. The mechanism concern — that glycogen is required for anabolic signaling — is partially valid: peak power output and glycolytic exercise performance (sprinting, heavy HIIT, heavy compound lifting in the 1-5 rep range) are genuinely impaired on keto, which can limit training intensity. Steady-state aerobic exercise and moderate-intensity strength training (8-15 rep range) are less affected after full keto-adaptation.`},
  {question:'How does the keto diet affect cholesterol levels?',answer:`The ketogenic diet's effects on lipids are more nuanced than either advocates or critics typically portray. Consistent changes: most people see significant reductions in triglycerides (often 30-50%) from reduced carbohydrate intake, and increases in HDL cholesterol ('good' cholesterol). Total LDL cholesterol increases in most people, but the pattern within LDL matters: keto predominantly increases large, buoyant LDL particles (associated with lower cardiovascular risk) rather than small, dense LDL particles (associated with higher risk). However, a subset of people (approximately 5-30% depending on population) experience dramatic LDL increases — sometimes exceeding 300 mg/dL — from saturated fat-driven upregulation of VLDL/LDL synthesis. This 'lean mass hyper-responder' phenotype appears more common in lean, highly active people. Monitoring lipids 3 months after starting keto is recommended, with follow-up if dramatic LDL increases occur.`},
  {question:'Can I do intermittent fasting alongside keto?',answer:`Combining intermittent fasting (IF) with keto is a popular strategy and physiologically complementary. Fasting accelerates ketosis — during fasting, liver glycogen is depleted faster, driving ketone production sooner. Many people who struggle to enter ketosis through diet alone reach ketosis much faster when adding even a 16-hour fast. The combination also produces more stable energy levels: keto provides fat-burning machinery, and IF allows 16-24 hours daily in a higher-ketone, lower-insulin state. The practical challenge is that keto already suppresses appetite significantly (ketones reduce ghrelin, the hunger hormone), making IF easier to maintain than on a standard diet. The main concern with aggressive IF plus keto: both are calorie-restricting and protein intake can fall below optimal levels for muscle maintenance. Ensuring adequate daily protein within the eating window is the primary management consideration.`},
  {question:'Is the keto diet safe for people with type 2 diabetes?',answer:`The ketogenic diet has among the strongest evidence of any dietary intervention specifically for type 2 diabetes management. Multiple trials, including the Virta Health 2-year study, demonstrate that carbohydrate restriction sufficient to produce ketosis reduces HbA1c by 1-2 percentage points (equivalent to strong medication effects), reduces fasting insulin by 50-60%, and allows most participants to substantially reduce or eliminate diabetes medications. Importantly, this works through the most direct possible mechanism: removing the primary metabolic challenge (dietary carbohydrates convert to glucose, which type 2 diabetics process poorly). The primary safety concern: people on insulin or sulfonylureas must significantly reduce medication doses when starting keto — sometimes within days — because blood glucose drops rapidly. Medical supervision and frequent glucose monitoring are essential for diabetics starting a ketogenic diet. The Virta study conducted keto in type 2 diabetics under medical supervision with no serious adverse events attributable to the diet.`},
]

const seoContent = {
  title: 'Keto Macro Calculator',
  category: 'health' as const,
  intro: `A ketogenic diet works through a specific metabolic mechanism: restricting carbohydrates below roughly 20-50 grams net per day depletes liver glycogen, which triggers the production of ketone bodies from fat in the liver. These ketones become an alternative fuel for the brain and muscles. This metabolic state — nutritional ketosis — produces appetite suppression, stable blood glucose, and fat oxidation that many people find beneficial for weight loss and blood sugar management.

The diet's efficacy is well-supported for certain applications. Type 2 diabetes and prediabetes management: multiple RCTs show meaningful reductions in HbA1c and medication requirements. Weight loss in the short term (6-12 months): ketogenic diets produce faster initial weight loss than low-fat diets, though the advantage disappears at 12+ months when adherence is matched.

What makes keto hard is precision. The difference between ketosis and just eating low-carb is the difference between a clear metabolic state and just reducing carbohydrates without the benefits. Most people need 20-30g net carbs to enter ketosis reliably. Without tracking, it's easy to consume enough hidden carbs to prevent ketosis without knowing it.

This calculator sets your precise keto macros — carbohydrates, protein, and fat targets — based on your weight, height, activity level, and goal, with protein set to preserve lean mass and fat adjusted to hit your calorie target.

**Long-tail searches answered here:** keto macro calculator free online usa 2026, ketogenic diet macro calculator by weight free, how many carbs on keto calculator by goal free tool, keto calories protein fat ratio calculator no signup, keto diet macro breakdown calculator for women usa, net carbs vs total carbs keto calculator free, keto macro calculator for beginners free online usa, how much fat on keto diet per day calculator free, keto protein limit to stay in ketosis calculator free, lazy keto macro calculator free no account usa, keto macros for 200 pound man weight loss calculator, standard vs cyclical keto macro calculator free usa, carb limit for ketosis by body weight calculator free, how many grams of carbs on keto calculator usa free, keto calculator for kidney disease caution free usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate keto macro from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `The keto flu — fatigue, headache, brain fog, irritability in the first 1-2 weeks — is caused by glycogen depletion, electrolyte losses from the diuretic effect of low insulin levels, and your brain temporarily running on reduced glucose while ketone production ramps up. Aggressive sodium, potassium, and magnesium supplementation in the first 2-4 weeks dramatically reduces these symptoms — this is not optional for most people transitioning to keto.

Protein matters as much as carbohydrates. Excessive protein intake can cause gluconeogenesis (conversion of protein to glucose) that prevents or kicks you out of ketosis. The protein targets in this calculator are set to the sweet spot that preserves muscle without generating excess glucose.

Track your ketones with blood ketone strips (most accurate) or urine strips (less accurate but sufficient for confirming initial ketosis) for the first 4-6 weeks until you understand how your body responds to your specific food choices.`,
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
        generateWebAppStructuredData({ name: 'Keto Macro Calculator', description: 'Calculate ketogenic diet macros including net carb target (20-50g), protein allocation to prevent muscle loss, and fat for remaining calories. Find yo', url: 'https://tooltrio.com/calculators/health/keto-macro-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Keto Macro Calculator', description: 'Calculate ketogenic diet macros including net carb target (20-50g), protein allocation to prevent muscle loss, and fat for remaining calories. Find yo', url: 'https://tooltrio.com/calculators/health/keto-macro-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Keto Macro Calculator', url: '/calculators/health/keto-macro-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
