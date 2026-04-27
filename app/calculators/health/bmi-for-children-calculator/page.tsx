import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMI Calculator for Children — CDC BMI-for-Age Percentile (Ages 2-19) 2026',
  description: 'Free BMI for Children Calculator 2026. Calculate BMI-for-age percentile for children and teens aged 2-19 using CDC growth charts. Understand healthy weight ranges by age and sex.\', and what the percentile means for growth trajectory.',
  slug: 'bmi-for-children-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'bmi for children calculator 2026',
    'free bmi for children calculator',
    'bmi for children calculator usa 2026',
    'bmi calculator 2026',
    'bmi calculator usa 2026',
    'body mass index calculator 2026',
    'bmi calculator for children',
    'bmi for age percentile calculator',
    'child bmi calculator ages 2 to 19',
    'healthy bmi range for 10 year old',
    'overweight bmi percentile child',
    'cdc growth chart calculator',
    'bmi for teens calculator',
    'child obesity bmi cutoff',
    'pediatric bmi calculator',
    'bmi for kids by age and height',
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
  {question:'How is BMI different for children than for adults?',answer:'Unlike adult BMI, which uses fixed cutoffs (18.5, 25, 30) regardless of age, children\'s BMI must be interpreted using age- and sex-specific percentile charts because normal body composition changes dramatically during growth and development. A BMI of 17 means something completely different for a 5-year-old, a 12-year-old, and a 17-year-old. The CDC uses \'BMI-for-age percentiles\' that compare a child\'s BMI against thousands of same-age, same-sex children from a nationally representative US reference population collected in the 1960s-1970s.',},
  {question:'What BMI percentile is healthy for a child?',answer:'CDC BMI-for-age categories: underweight is below the 5th percentile; healthy weight is the 5th through 84th percentile; overweight is the 85th through 94th percentile; obesity is the 95th percentile or above. Severe obesity (Class 2) is defined as BMI ≥ 120% of the 95th percentile for age and sex. The 85th percentile threshold for overweight was chosen to align with BMI values associated with increased cardiovascular risk factors in pediatric studies, while the 5th percentile for underweight aligns with increased malnutrition risk.',},
  {question:'My child is above the 95th percentile — do I need to see a doctor?',answer:'Yes, a BMI at or above the 95th percentile (obesity) warrants evaluation by a pediatrician. The doctor will assess whether the elevated BMI is associated with metabolic complications (elevated blood pressure, blood glucose, lipids), assess dietary patterns and activity levels, and determine whether intervention is appropriate. For children, treatment focuses on \'healthy weight maintenance\' or gradual slowing of weight gain rather than active weight loss in most cases — children are still growing and aggressive weight loss can interfere with healthy development.',},
  {question:'How accurate is BMI for children?',answer:'BMI-for-age is a screening tool, not a diagnostic one — the same limitations that apply to adult BMI apply here and more. Muscular, athletic children with high lean mass may fall in the overweight or obese categories despite having healthy body composition. Conversely, sedentary children with high body fat may have normal BMI with poor metabolic health. The CDC explicitly recommends that BMI should never be used as a sole diagnostic measure — clinical evaluation including physical examination, activity assessment, dietary history, and often laboratory testing is needed for any child with concerning BMI results.',},
  {question:'What causes childhood obesity and can BMI track its improvement?',answer:'Childhood obesity results from a complex interaction of genetic predisposition, dietary environment (high-calorie processed foods), reduced physical activity, insufficient sleep, screen time, socioeconomic factors, and family dynamics. BMI-for-age percentile can track improvement during treatment — a child maintaining BMI-for-age percentile while growing in height is effectively reducing relative weight. Because children are growing, the goal is often to slow weight gain (maintain current weight while height increases) rather than active weight loss, which moves the BMI percentile downward gradually.',},
  {question:'What is the difference between overweight and obese on the children\'s BMI chart?',answer:'On the CDC children\'s BMI-for-age chart: overweight is 85th to 94th percentile — the child is heavier than most peers but not at the highest-risk threshold; obese is 95th percentile and above — associated with significantly elevated risk of cardiovascular risk factors, type 2 diabetes, sleep apnea, orthopedic issues, and psychological impacts including depression and bullying. Severe obesity (≥120% of the 95th percentile) is associated with the highest near-term medical complication risk and may warrant more intensive medical management.',},
  {question:'Should I tell my child about their BMI?',answer:'Child psychologists and pediatricians generally recommend framing conversations around behaviors (nutritious foods, active play, adequate sleep) rather than weight or BMI numbers. Telling children they are \'overweight\' based on BMI can contribute to body image issues, disordered eating, and weight stigma without producing the desired behavioral changes. The American Academy of Pediatrics recommends \'weight-neutral\' approaches that focus on building healthy habits for the whole family rather than weight-focused messaging directed at children. BMI monitoring is for parents and clinicians to use in care planning, not for motivating children directly.',},
]

const seoContent = {
  title: 'BMI Calculator for Children',
  category: 'health' as const,
  intro: `BMI means something very different for a child than it does for an adult. You cannot use adult BMI cutoffs — 18.5, 25, 30 — for children and teenagers. A BMI of 22 is healthy for a 35-year-old adult and would indicate obesity in a 7-year-old. For children aged 2-19, the correct measure is BMI-for-age percentile, which accounts for the fact that healthy body composition changes dramatically as kids grow.

The CDC 2000 growth charts establish sex-specific BMI-for-age curves based on nationally representative data. A child at the 75th percentile for BMI-for-age has a higher BMI than 75% of children the same age and sex — and that's within the healthy range. The concern thresholds are: below the 5th percentile (underweight), 85th-94th percentile (overweight), and 95th percentile or above (obese). These cutoffs are statistical, not absolute — they reflect elevated risk of health problems, not certainty.

This calculator computes your child's BMI from weight and height, then looks up the age- and sex-specific percentile using CDC growth chart data. Results include the percentile, the weight category, and the BMI range that corresponds to normal weight at your child's age and height.

One measurement tells you where a child stands today. A series of measurements plotted over years tells you whether their growth trajectory is healthy — which is the more meaningful clinical picture.

**Long-tail searches answered here:** bmi calculator for children free online usa 2026, kids bmi percentile calculator by age cdc, child bmi for age calculator free no signup, is my child a healthy weight bmi calculator, pediatric bmi chart calculator free tool, cdc bmi calculator for kids age 2 to 19, bmi percentile for 8 year old boy calculator usa free, healthy weight for 10 year old girl by height calculator, underweight child bmi calculator usa free online, overweight child bmi percentile calculator free, how does child bmi differ from adult bmi calculator, bmi for children by age 2 to 20 calculator usa free, what bmi percentile is healthy for kids calculator, child obesity classification by bmi percentile calculator, bmi for school age children by grade level calculator usa`,
  howItWorks: `Pediatric BMI-for-age percentile is calculated by first computing BMI (weight/height²) using the standard adult formula, then looking up the result in CDC sex-specific growth chart tables for the child's exact age in months. The CDC 2000 growth charts were derived from multiple national surveys representing the US population and are the standard reference for ages 2-19.

Percentile interpretation for children is fundamentally different from adult BMI categories. Healthy weight: 5th to 84th percentile. Overweight: 85th to 94th percentile. Obese: 95th percentile or above. Underweight: below 5th percentile. These cutoffs were chosen based on health outcome research in pediatric populations, not by direct correspondence to adult BMI cutoffs.`,
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
  tipsSection: `Plot your child's BMI-for-age on a growth chart over multiple years. A single measurement is far less meaningful than the trend — a child whose BMI percentile has been increasing across measurements over 2-3 years signals a pattern requiring attention, while a stable percentile means growth is proportional.

BMI percentile is not appropriate for children under age 2. For infants, weight-for-length percentiles using WHO growth standards are the appropriate measure.

Discuss BMI results with your pediatrician rather than acting independently. Children's weight management requires professional guidance sensitive to developmental stage, nutritional needs, and psychological factors that adult weight management doesn't face.`,
  scienceSection: `The CDC pediatric growth charts are based on nationally representative US data from NHANES surveys conducted between 1963 and 1994 — deliberately excluding data from 1988-1994 (when childhood obesity prevalence was rising rapidly) to establish a reference population rather than a current-population description. This means the growth charts represent the weight distribution of American children from a period before the obesity epidemic became severe.`,
  conclusion: `If your child's BMI percentile falls in the overweight or obese range, the most important next step is a conversation with their pediatrician — not an immediate diet. Children are growing, and the intervention approach differs significantly from adult weight management. Restricting calories in growing children can affect height and development. Pediatric weight management focuses on slowing weight gain while allowing normal height growth, increasing physical activity, improving food quality, and addressing behavioral and environmental factors.

Equally important: don't use this information in ways that create body image issues or food anxiety for your child. Framing health conversations around energy, strength, and how food makes them feel — rather than weight and appearance — supports healthier long-term relationships with food and their body.

Plot your child's results on a CDC growth chart over time to see the trend that matters most. A single percentile snapshot is far less meaningful than a trajectory that shows whether their BMI-for-age is stable, increasing, or decreasing as they grow.`,
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
        generateWebAppStructuredData({ name: 'BMI Calculator for Children', description: 'Calculate BMI-for-age percentile for children and teens aged 2-19 using CDC growth charts. Understand healthy weight ranges for your child\'s age and s', url: 'https://tooltrio.com/calculators/health/bmi-for-children-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'BMI Calculator for Children', description: 'Calculate BMI-for-age percentile for children and teens aged 2-19 using CDC growth charts. Understand healthy weight ranges for your child\'s age and s', url: 'https://tooltrio.com/calculators/health/bmi-for-children-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BMI Calculator for Children', url: '/calculators/health/bmi-for-children-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
