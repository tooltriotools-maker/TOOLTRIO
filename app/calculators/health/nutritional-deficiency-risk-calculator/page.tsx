import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Nutritional Deficiency Risk Calculator 2026 | ToolTrio',
  description: 'Free nutritional deficiency risk calculator 2026. Identify your risk for vitamin B12, D, iron, calcium, omega-3, and other deficiencies based on your diet pattern, food groups, and lifestyle.',
  slug: 'nutritional-deficiency-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['nutritional deficiency risk calculator', 'vitamin deficiency calculator', 'vegan nutrient deficiency calculator', 'iron deficiency risk calculator', 'vitamin B12 deficiency test online free'],
})

const relatedCalculators = [{'name': 'Vitamin D Status', 'href': '/calculators/health/vitamin-d-status-calculator', 'icon': '☀️', 'desc': 'Vitamin D level estimate'}, {'name': 'Iron Intake', 'href': '/calculators/health/iron-intake-calculator', 'icon': '💊', 'desc': 'Daily iron target'}, {'name': 'Omega-3', 'href': '/calculators/health/omega3-calculator', 'icon': '🐟', 'desc': 'EPA & DHA needs'}, {'name': 'Calcium Calculator', 'href': '/calculators/health/calcium-calculator', 'icon': '🦷', 'desc': 'Calcium needs'}]

const faqs = [
  {"question": "What are the most common nutrient deficiencies?", "answer": "According to CDC NHANES data, the most prevalent nutrient deficiencies in the US are: Vitamin D (41% of US adults are deficient; 82% of Black Americans, 70% of Hispanic Americans), Vitamin B12 (deficient in ~6% of adults under 60, rising to 20% over 60), Iron (iron-deficiency affects ~10 million Americans, predominantly women of reproductive age), Magnesium (~50% of Americans consume below the RDA), and Omega-3 fatty acids (most Americans have suboptimal EPA/DHA intake). These deficiencies are largely preventable through diet optimization and targeted supplementation."},
  {"question": "Do vegans need to supplement B12?", "answer": "Yes — vitamin B12 supplementation is non-negotiable for vegans and strongly recommended for vegetarians. B12 is found exclusively in animal products (meat, eggs, dairy, fish). Plant foods that appear to contain B12 (tempeh, nori, nutritional yeast) contain mostly inactive analogues that do not prevent deficiency. Untreated B12 deficiency causes irreversible neurological damage including peripheral neuropathy, cognitive decline, and macrocytic anemia. The recommended dose for vegans is 1,000 mcg of cyanocobalamin daily, or 2,000 mcg weekly, since oral absorption is inefficient (only 1-2% of large doses absorbed)."},
  {"question": "How do I know if I'm actually vitamin D deficient?", "answer": "The gold standard is a blood test measuring serum 25-hydroxyvitamin D (25-OH vitamin D). Levels are reported in ng/mL: deficiency is < 20 ng/mL, insufficiency is 20-29 ng/mL, sufficiency is 30-80 ng/mL, and toxicity risk starts above 150 ng/mL. Risk factors for deficiency include: dark skin tone (melanin blocks UVB), northern latitude (above 37°N from November to March), exclusively indoor lifestyle, obesity (vitamin D is fat-soluble and gets sequestered in adipose tissue), kidney or liver disease, and elderly age (skin produces 75% less vitamin D than younger adults)."}
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
          generateWebAppStructuredData({ name: 'Nutritional Deficiency Risk Calculator', description: 'Free nutritional deficiency risk calculator 2026. Identify your risk for vitamin B12, D, iron, calci', url: 'https://tooltrio.com/calculators/health/nutritional-deficiency-risk-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch45DeepDive slug="nutritional-deficiency-risk-calculator" />
</>
  )
}
