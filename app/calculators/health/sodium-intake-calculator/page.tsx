import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Sodium Intake Calculator 2026 | ToolTrio',
  description: 'Calculate your personalized daily sodium target based on blood pressure, age, kidney health, and cardiovascular risk. Track dietary sodium from common.',
  slug: 'sodium-intake-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'sodium intake calculator 2026',
    'free sodium intake calculator',
    'sodium intake calculator usa 2026',
    'sodium intake calculator free 2026',
    'sodium intake calculator',
    'daily sodium limit calculator',
    'sodium and blood pressure calculator',
    'low sodium diet calculator',
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
  {question:'How much sodium per day is actually recommended?',answer:`The American Heart Association recommends no more than 2,300 mg of sodium per day for most adults, with an ideal target of 1,500 mg for people with hypertension, heart disease, or kidney disease. The average American consumes approximately 3,400 mg daily. For context, 2,300 mg equals roughly one teaspoon of table salt. Each 100 mg reduction in daily sodium is associated with a 1-5 mmHg drop in systolic blood pressure in people with hypertension.`},
  {question:'Where does most dietary sodium actually come from?',answer:`Approximately 70-75% of dietary sodium in the American diet comes from food manufacturing and restaurant preparation — not from the salt shaker. Top sources: breads and rolls, deli meats, pizza, canned soups, sandwiches, cheese, and fast food meals. A single restaurant meal can contain 2,000-3,000 mg of sodium — the entire recommended daily intake. Reducing processed and restaurant food consumption has far more impact on sodium intake than avoiding table salt at home.`},
  {question:'Does sodium cause high blood pressure in everyone?',answer:`About 50% of people with hypertension and 25% with normal blood pressure are salt-sensitive — meaning their blood pressure rises meaningfully with high sodium intake. The other half are relatively salt-insensitive. Salt sensitivity is more common in older adults, African Americans, people with kidney disease, and those with diabetes. For salt-sensitive individuals, sodium restriction is a useful blood pressure intervention. For salt-insensitive people, the blood pressure effect is minimal.`},
  {question:'What is the difference between sodium and salt?',answer:`Table salt (sodium chloride) is approximately 40% sodium by weight. So 2,300 mg of sodium equals approximately 5,750 mg (about 1 teaspoon) of table salt. Nutrition labels list sodium, not salt. Many additives beyond table salt contribute sodium: MSG, sodium bicarbonate, sodium benzoate, sodium citrate, and sodium nitrate. Sea salt and Himalayan pink salt have essentially identical sodium content to regular table salt despite their healthier marketing.`},
  {question:'Can you eat too little sodium?',answer:`The minimum sodium requirement is approximately 500 mg per day to replace obligatory losses. True deficiency in healthy adults is rare but occurs with certain diuretics, heart failure causing dilutional hyponatremia, or rarely in endurance athletes drinking excessive plain water. Symptoms of low blood sodium range from headache and nausea to confusion and seizures in severe cases. For most healthy people eating any variety of foods, sodium deficiency is not a practical concern.`},
  {question:'How does sodium affect kidney health?',answer:`High sodium intake increases blood pressure which damages glomerular capillaries over time. It also activates the renin-angiotensin system, further raising blood pressure. For people with existing kidney disease, sodium restriction under 2,000 mg daily is particularly important — impaired kidneys cannot regulate sodium excretion efficiently, making dietary sodium more impactful. Excessive sodium also increases urinary calcium loss, potentially contributing to kidney stones in susceptible individuals.`},
  {question:'What are the best practical ways to reduce sodium intake?',answer:`Most effective strategies by impact: choosing low-sodium or no-salt-added canned goods (reduces sodium 40-60%), cooking more meals at home versus restaurants, reading Nutrition Facts labels and comparing brands, using herbs and spices instead of salt, rinsing canned beans before use (reduces sodium by ~40%), and limiting deli meats. Potassium-rich foods like fruits, vegetables, and legumes help counteract sodium's blood pressure effects — the DASH diet's effectiveness comes partly from this sodium-potassium balance.`},
  {question:'Does the timing or form of sodium consumption matter?',answer:`Total daily sodium matters more than when or how it is consumed. However, consuming sodium spread throughout the day produces smaller blood pressure fluctuations than a single large sodium load. Liquid sodium (soups, sports drinks) is absorbed faster than sodium in solid foods. One practical distinction: salt added at the table creates concentrated surface crystals that hit taste receptors directly, often providing perceived saltiness with less actual sodium than the same amount dissolved into cooking — this can help with palatability during sodium reduction.`},
]

const seoContent = {
  healthSourceProfile: 'sodium-intake-calculator',
  title: 'Sodium Intake Calculator',
  category: 'health' as const,
  intro: `Sodium is genuinely important to health — but the relationship is more nuanced than less is always better. Sodium is essential for fluid balance, nerve signal transmission, and muscle contraction. The kidneys regulate sodium with extraordinary precision, and sodium deficiency (hyponatremia) can be as dangerous as excess.

That said, most Americans consume approximately 3,400mg of sodium per day — well above the 2,300mg recommendation and far above the 1,500mg recommended for people with hypertension or kidney disease. In people who are sodium-sensitive (roughly 25-50% of the population), high sodium directly raises blood pressure.

The primary source of sodium in the American diet is not table salt — it's processed and restaurant food, which accounts for roughly 75% of sodium intake. Bread, deli meats, canned soups, condiments, and fast food are the major contributors. Drastically reducing processed food consumption typically reduces sodium intake more effectively than avoiding table salt.

This calculator estimates your daily sodium intake from dietary habits and gives specific reduction targets and food swap recommendations based on your health profile.

`,
  howItWorks: `This guide explains the specific calculation used by this tool, its inputs, and the population or guideline context for interpreting the result. It is not a blanket claim that the calculator is clinically validated.` ,
  benefits: [
  ],
  scienceSection: `The methodology and reference information for this calculator should be interpreted in the context of the specific formula, population, and assumptions described on this page; generic population-survey language is not a substitute for a calculator-specific source.

As with all health calculations, individual results differ from population-average predictions based on genetic factors, medications, health conditions, and lifestyle variables. These calculations are educational tools, not diagnostic instruments. Always consult qualified healthcare professionals for medical decisions.`,
  conclusion: `For people with high blood pressure, reducing sodium from the typical American intake of 3,400mg to 2,300mg can lower systolic blood pressure by 2-8 mmHg on its own — modest, but meaningful in the context of overall cardiovascular risk.

Potassium is sodium's physiological counterpart — it promotes sodium excretion and vasodilation, and adequate potassium intake substantially reduces the blood pressure impact of sodium. Eating more fruits and vegetables addresses both sides of the sodium-potassium balance simultaneously.

When reducing sodium, it takes 2-4 weeks for taste preferences to adapt. Food that initially tastes bland often tastes normal within a month as taste receptors recalibrate. Use [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator) to track how sodium reduction affects your blood pressure readings.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Sodium Intake Calculator', description: 'Calculate your personalized daily sodium target based on blood pressure, age, kidney health, and cardiovascular risk. Track dietary sodium from common', url: 'https://tooltrio.com/calculators/health/sodium-intake-calculator', category: 'HealthApplication' }),      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
    </>
  )
}
