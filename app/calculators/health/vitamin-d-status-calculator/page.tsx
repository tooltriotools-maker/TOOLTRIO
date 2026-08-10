import { CalculatorBatch46DeepDive } from '@/components/ui/CalculatorBatch46DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Vitamin D Intake & Status Context Calculator 2026 | ToolTrio',
  description: 'Compare vitamin D intake with general reference values. Serum 25(OH)D status requires laboratory testing.',
  slug: 'vitamin-d-status-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['vitamin D calculator', 'vitamin D intake calculator', 'vitamin D reference intake', '25(OH)D testing', 'vitamin D safety'],
})

const relatedCalculators = [{'name': 'Vitamin D Calculator', 'href': '/calculators/health/vitamin-d-calculator', 'icon': '💊', 'desc': 'Daily vitamin D needs'}, {'name': 'Bone Density Risk', 'href': '/calculators/health/bone-density-risk-calculator', 'icon': '🦴', 'desc': 'Osteoporosis risk'}, {'name': 'UV Exposure', 'href': '/calculators/health/uv-exposure-calculator', 'icon': '☀️', 'desc': 'Safe sun time'}, {'name': 'Immune Health', 'href': '/calculators/health/immune-health-calculator', 'icon': '🛡️', 'desc': 'Immune strength score'}]

const faqs = [
  { question: 'How much vitamin D does sun exposure produce?', answer: "On a sunny summer day in a temperate climate, exposing arms and legs for 10-15 minutes produces approximately 10,000-25,000 IU of vitamin D3 in fair-skinned individuals — far more than the RDA of 600-800 IU. However, sun-based synthesis is impaired by: dark skin (requires 3-10× more sun time), winter at latitudes above 35°N (UVB angle too oblique from November to March), sunscreen use (SPF 15 reduces synthesis by 99%), glass (UVB does not penetrate), obesity (vitamin D gets sequestered in fat), and aging (the skin of a 70-year-old produces 75% less vitamin D than a 20-year-old's skin even under identical UV exposure." },
  { question: 'What is the optimal vitamin D level?', answer: 'The definition of optimal vitamin D remains debated. The Endocrine Society defines sufficiency as ≥ 20 ng/mL (50 nmol/L) and potential toxicity above 150 ng/mL. Many functional medicine and integrative practitioners target 40-60 ng/mL for optimal immune, bone, and metabolic function. The VITAL trial, the largest vitamin D supplementation RCT (25,000 participants), used 2,000 IU/day and found significant benefits for cancer mortality reduction and immune health, achieving average blood levels of approximately 42 ng/mL. For most deficient adults, 2,000-4,000 IU/day safely raises blood levels into the sufficient range.' },
  { question: 'Can you get too much vitamin D from supplements?', answer: 'Vitamin D toxicity (hypervitaminosis D) is rare but possible with prolonged very high doses. Toxicity typically occurs with sustained intake above 10,000 IU/day for months, resulting in hypercalcemia (elevated blood calcium) with symptoms including nausea, weakness, polyuria, and kidney stone risk. Blood levels above 150 ng/mL are associated with toxicity. Vitamin D toxicity is uncommon but can occur with excessive supplemental intake. The NIH lists 4,000 IU/day as the adult tolerable upper intake level. Sun exposure is not a reliable way to determine an individual blood level, and supplement choice should be discussed when medical conditions or medications are relevant.' },
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Vitamin D Status Calculator', description: "Free vitamin D status calculator 2026. Estimate your vitamin D level from sun exposure, skin tone, l", url: 'https://tooltrio.com/calculators/health/vitamin-d-status-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch46DeepDive slug="vitamin-d-status-calculator" />
</>
  )
}
