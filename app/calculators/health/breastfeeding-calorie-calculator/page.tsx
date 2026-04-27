import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Breastfeeding Calorie Calculator — Extra Calories Needed While Nursing 2026',
  description: 'Free Breastfeeding Calorie Calculator 2026. Calculate extra calorie needs while breastfeeding based on age, weight, activity, and feeding frequency. Includes protein and hydration guidance.\', hydration targets, and nutrient priorities for optimal milk production and maternal health.',
  slug: 'breastfeeding-calorie-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'breastfeeding calorie calculator 2026',
    'free breastfeeding calorie calculator',
    'breastfeeding calorie calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'breastfeeding calorie calculator',
    'how many extra calories while breastfeeding',
    'calorie needs nursing mother',
    'breastfeeding and weight loss calculator',
    'how much water to drink while breastfeeding',
    'protein intake breastfeeding',
    'calorie needs exclusive breastfeeding',
    'breastfeeding diet calculator',
    'nursing calories per day',
    'breastfeeding nutrition calculator',
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
  {question:'How many extra calories do breastfeeding mothers need?',answer:'Breastfeeding requires approximately 500 extra calories per day during exclusive breastfeeding (producing ~750-800 mL of milk daily) compared to pre-pregnancy maintenance calories. The Dietary Guidelines for Americans recommend an additional 330 kcal/day above pre-pregnancy needs for the first 6 months and 400 kcal/day for months 7-12, reflecting declining milk production and increasing complementary food introduction. These recommendations assume stored fat from pregnancy contributes approximately 170 kcal/day, with the remainder coming from dietary intake.',},
  {question:'Can I diet to lose pregnancy weight while breastfeeding?',answer:'Modest calorie restriction (no more than 500 calories below TDEE while breastfeeding) can be safely implemented after 6-8 weeks postpartum once milk supply is established, without compromising milk volume or quality. Research shows that gradual weight loss of 0.5-1 kg/week during breastfeeding does not affect infant growth or milk composition in well-nourished women. Aggressive restriction (more than 25% below TDEE) can reduce milk production and should be avoided. Many women lose weight naturally while breastfeeding through the high caloric demand of milk production without intentional restriction.',},
  {question:'What nutrients are most critical during breastfeeding?',answer:'Priority nutrients during breastfeeding: iodine (270 μg/day — severely deficient in many American women; critical for infant brain development); choline (550 mg/day — most women consume far below this; essential for infant nervous system); vitamin D (600-800 IU/day for mother, breast milk typically provides insufficient vitamin D for exclusively breastfed infants who typically need supplemental 400 IU/day); DHA omega-3 (200-300 mg/day — passes into breast milk supporting infant brain development); and calcium (1,000 mg/day — if deficient, mother\'s bones mobilize calcium to maintain milk supply).',},
  {question:'How does breastfeeding affect postpartum calorie needs?',answer:'The metabolic demand of breastfeeding is substantial — producing 750-800 mL of milk daily requires approximately 600-700 calories of energy input. After accounting for approximately 170 calories mobilized from maternal fat stores, the dietary requirement is approximately 500 extra calories above pre-pregnancy maintenance. This is why exclusively breastfeeding women often experience natural weight loss without intentional dieting — the caloric demand of milk production exceeds the caloric intake of many women\'s normal diets. Women who gained appropriate gestational weight (25-35 lbs for normal BMI) and breastfeed exclusively for 6 months typically return to pre-pregnancy weight without intentional restriction.',},
  {question:'Does maternal diet quality affect breast milk?',answer:'Breast milk composition is remarkably consistent for macronutrients (fat, protein, carbohydrates) regardless of maternal diet quality — the body prioritizes infant nutrition even at maternal expense. However the fatty acid profile of breast milk does reflect maternal diet: DHA content is significantly higher in women consuming fatty fish or DHA supplements, and trans fat content reflects maternal trans fat intake. Fat-soluble vitamins (A, D, E, K) and some water-soluble vitamins (B12, thiamin, riboflavin) in milk reflect maternal dietary intake. Iodine content is particularly sensitive to maternal iodine intake and is critical for infant thyroid function.',},
  {question:'How much water should breastfeeding mothers drink?',answer:'Breastfeeding increases fluid needs significantly — the National Academies recommend 3.8 liters total fluid per day for breastfeeding women compared to 2.7 liters for non-pregnant women, an increase of approximately 1.1 liters per day. Adequate hydration is important for milk volume — maternal dehydration can reduce milk production. Practical guidance: drink a large glass of water every time you breastfeed (convenient timing cue), keep a water bottle visible at all feeding stations, and use urine color (pale yellow) as a hydration check throughout the day.',},
  {question:'When can I start exercising after delivery while breastfeeding?',answer:'Most healthcare providers recommend waiting at least 6 weeks postpartum before resuming moderate-to-vigorous exercise to allow pelvic floor and abdominal muscle recovery. After clearance, exercise does not negatively affect milk volume, composition, or infant acceptance of breast milk in most studies, even with vigorous exercise. A small subset of infants may reject post-exercise breast milk due to lactic acid accumulation — if this occurs, nursing before exercise or waiting 1-2 hours post-exercise resolves the issue. Maintaining adequate calorie and fluid intake is essential during the exercise-and-breastfeeding combination period.',},
]

const seoContent = {
  title: 'Breastfeeding Calorie Calculator',
  category: 'health' as const,
  intro: `Breastfeeding burns more calories than most new mothers expect — roughly 400-500 extra calories per day for exclusive breastfeeding, depending on milk production volume. For context, that's approximately the caloric equivalent of running 4 miles. The energy goes directly into milk synthesis: breast milk contains about 20 calories per ounce, and most mothers produce 25-35 ounces per day for a fully breastfed newborn.

The challenge is that caloric needs during breastfeeding are highly individual. Milk production volume varies, activity levels change significantly postpartum, and body fat stores accumulated during pregnancy are designed to partially offset the caloric demands of lactation. Eating too little while breastfeeding can reduce milk supply, leave you exhausted, and slow postpartum recovery. Eating too much can make postpartum weight management harder.

This calculator estimates your total daily calorie needs while breastfeeding by combining your pre-pregnancy TDEE adjusted for current weight and activity level with the estimated caloric cost of your current feeding schedule. It also calculates your protein and fluid needs, which increase substantially during lactation.

The numbers here are starting estimates. Your actual needs depend on your milk production, how much stored body fat you're mobilizing, and how you feel day to day. Hunger is a reliable signal during breastfeeding — consistently being very hungry suggests you're under-eating.

**Long-tail searches answered here:** breastfeeding calorie calculator free online usa, how many extra calories needed while breastfeeding, lactation calorie needs calculator by baby age free, breastfeeding nutrition calculator free no account, calories burned breastfeeding per day calculator, how much should i eat while nursing calculator usa, breastfeeding calorie needs by milk production volume, extra calorie needs for exclusively pumping calculator free, breastfeeding and weight loss calorie deficit calculator, postpartum calorie intake for nursing mothers usa free, breastfeeding calorie calculator twins vs single baby, macros for breastfeeding women calculator free usa, protein needs while breastfeeding calculator free online, iron and calcium needs while breastfeeding calculator usa, breastfeeding calorie burn vs formula feeding comparison`,
  howItWorks: `Additional calorie needs during breastfeeding are calculated from milk production volume and caloric content. Mature breast milk contains approximately 67 kcal per 100 mL. Average milk production: 750-800 mL/day for exclusively breastfeeding mothers of infants under 6 months. Caloric cost: roughly 500 kcal/day for full milk production (accounting for approximately 20% metabolic efficiency in milk synthesis). The recommended additional calorie intake is 330-500 kcal/day above pre-pregnancy TDEE — the range accounting for the 100-150 kcal released from maternal fat stores that supplements dietary calories.`,
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
  tipsSection: `Do not restrict calories significantly while exclusively breastfeeding — milk supply responds to caloric availability. Restriction below 1,500 kcal/day is associated with reduced milk volume and nutritional quality. Gradual, modest calorie restriction (250-300 kcal/day below lactation TDEE) after 2 months postpartum supports weight loss at approximately 0.5 kg/week without impairing milk supply for most women.

Hydration is critical — produce roughly 750-800 mL of milk per day (mostly water), dehydration reduces milk volume. Drink to thirst plus an additional 500 mL/day above your pre-pregnancy baseline.

Protein needs increase by 25g/day during exclusive breastfeeding compared to non-pregnant baseline — prioritize protein-rich foods at each meal to meet the total of approximately 1.1-1.3 g/kg/day.`,
  scienceSection: `Nutritional requirements during lactation are the highest of any non-athletic life stage. The 2005 Dietary Reference Intakes for lactation (updated recommendations coming from IOM) specify increased requirements for virtually every nutrient, particularly iodine (+140% above baseline), choline (+30%), vitamin D, DHA, and all B vitamins. Iodine deficiency during lactation impairs infant thyroid function and neurodevelopment — a major concern given low iodine status in many American women.`,
  conclusion: `Most lactation specialists recommend that breastfeeding mothers not aggressively restrict calories for at least the first 6-8 weeks postpartum, allowing milk supply to establish before introducing any calorie deficit. After that point, a modest deficit of 200-300 calories below your breastfeeding TDEE is generally considered safe for gradual weight loss without affecting milk supply for most women.

The foods that matter most during breastfeeding aren't about calorie counting — they're about nutrient density. Continuing prenatal vitamins, prioritizing omega-3 fatty acids, calcium, vitamin D, and adequate protein supports both your recovery and your milk's nutritional quality.

Use [our Hydration Calculator](/calculators/health/hydration-calculator) to understand your fluid needs — milk production requires significant additional water intake — and [our Calorie Calculator](/calculators/health/calorie-calculator) if you want a complete nutritional breakdown for your postpartum eating plan.`,
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
        generateWebAppStructuredData({ name: 'Breastfeeding Calorie Calculator', description: 'Calculate extra calorie needs while breastfeeding based on age, weight, activity, and feeding frequency. Includes protein and hydration guidance.', url: 'https://tooltrio.com/calculators/health/breastfeeding-calorie-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Breastfeeding Calorie Calculator', description: 'Calculate extra calorie needs while breastfeeding based on age, weight, activity, and feeding frequency. Includes protein and hydration guidance.', url: 'https://tooltrio.com/calculators/health/breastfeeding-calorie-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Breastfeeding Calorie Calculator', url: '/calculators/health/breastfeeding-calorie-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
