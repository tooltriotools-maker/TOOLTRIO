import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Caloric Needs Calculator — Daily Calories by Goal 2026 | ToolTrio',
  description: 'Free caloric needs calculator 2026. Find your exact daily calorie target for weight loss, maintenance, or muscle gain. Uses Mifflin-St Jeor equation with activity adjustment and macro breakdown.',
  slug: 'caloric-needs-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['caloric needs calculator', 'daily calorie needs calculator', 'how many calories should I eat calculator', 'calorie target for weight loss calculator', 'calories per day calculator by age weight'],
})

const relatedCalculators = [{'name': 'BMR Calculator', 'href': '/calculators/health/bmr-calculator', 'icon': '❤️', 'desc': 'Calories at rest'}, {'name': 'TDEE Calculator', 'href': '/calculators/health/tdee-calculator', 'icon': '📊', 'desc': 'Total daily energy'}, {'name': 'Macro Calculator', 'href': '/calculators/health/macro-calculator', 'icon': '🥗', 'desc': 'Protein, carbs, fat'}, {'name': 'Calorie Deficit', 'href': '/calculators/health/calorie-deficit-calculator', 'icon': '📉', 'desc': 'Safe deficit for fat loss'}]

const faqs = [
  {"question": "How do I calculate how many calories I need per day?", "answer": "Your daily calorie needs equal your Basal Metabolic Rate (BMR) multiplied by an activity factor. BMR is calculated from your weight, height, age, and sex using the Mifflin-St Jeor equation — the most validated formula for general adults. The activity multiplier ranges from 1.2 (sedentary) to 1.9 (very hard training). For weight loss, subtract 300-500 calories from your TDEE. For weight gain (muscle building), add 250-300 calories. Never eat below your BMR for extended periods."},
  {"question": "What is a safe calorie deficit for weight loss?", "answer": "A deficit of 300-500 calories below your TDEE produces weight loss of approximately 0.5-1 lb per week, which is the clinically recommended rate for sustainable fat loss. Deficits larger than 750 calories per day increase the risk of muscle loss, nutrient deficiencies, fatigue, and metabolic adaptation (where your body reduces its metabolic rate). The minimum calorie floor — eating below which is rarely safe — is your BMR: the calories needed to run your organs at rest."},
  {"question": "How much protein do I need when losing weight?", "answer": "Research consistently shows that higher protein intake (1.6-2.2 g per kg body weight per day) during a calorie deficit preserves muscle mass, increases satiety, and modestly boosts the thermic effect of food. At 1.6 g/kg for a 75kg person, that is 120 grams of protein per day. Spreading protein across 3-4 meals (30-40g each) is more effective for muscle protein synthesis than consuming most protein in one meal."}
]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Caloric Needs Calculator', description: 'Free caloric needs calculator 2026. Find your exact daily calorie target for weight loss, maintenanc', url: 'https://tooltrio.com/calculators/health/caloric-needs-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
