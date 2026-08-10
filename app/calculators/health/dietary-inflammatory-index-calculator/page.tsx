import { CalculatorBatch10DeepDive } from '@/components/ui/CalculatorBatch10DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Dietary Inflammatory Pattern Score 2026 | ToolTrio',
  description: "Free Dietary Inflammatory Index calculator 2026. Score your diet's pro- or anti-inflammatory potential based on red meat, processed foods, vegetables, fish, whole grains, and supplements.",
  slug: 'dietary-inflammatory-index-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['dietary inflammatory index calculator', 'anti-inflammatory diet score', 'DII calculator food', 'pro-inflammatory diet test', 'inflammation diet calculator free'],
})

const relatedCalculators = [{'name': 'Inflammation Risk', 'href': '/calculators/health/inflammation-risk-calculator', 'icon': '🔴', 'desc': 'Lifestyle inflammation score'}, {'name': 'Gut Health', 'href': '/calculators/health/gut-health-calculator', 'icon': '🦠', 'desc': 'Microbiome health'}, {'name': 'Omega-3 Calculator', 'href': '/calculators/health/omega3-calculator', 'icon': '🐟', 'desc': 'EPA & DHA needs'}, {'name': 'Glycemic Load', 'href': '/calculators/health/glycemic-load-calculator', 'icon': '📊', 'desc': 'Blood sugar impact'}]

const faqs = [
  { question: 'What is the Dietary Inflammatory Index (DII)?', answer: "The DII is a validated scoring tool developed by researchers at the University of South Carolina to measure the inflammatory potential of an individual's diet. Each food and nutrient is assigned a score based on its effect on six inflammatory biomarkers (IL-1β, IL-4, IL-6, IL-10, TNF-α, and CRP). Scores range from approximately -8.87 (maximally anti-inflammatory) to +7.98 (maximally pro-inflammatory). Higher DII scores are associated with increased risk of type 2 diabetes, cardiovascular disease, depression, and certain cancers." },
  { question: 'Which foods are the most anti-inflammatory?', answer: 'The most useful anti-inflammatory foods by DII scoring are: turmeric (curcumin), omega-3 fatty acids (from fatty fish and supplements), fiber-rich whole grains, ginger, garlic, onions, cruciferous vegetables (broccoli, kale), berries, green tea, and olive oil. Regular fatty fish consumption (2-3 servings/week) has one of the strongest anti-inflammatory effects in research. Conversely, the most pro-inflammatory foods are processed meats, refined sugar, fried foods, and trans fats.' },
  { question: 'Can diet really reduce CRP and inflammation markers?', answer: 'Yes — dietary pattern changes can meaningfully reduce blood CRP (C-reactive protein) within 6-12 weeks. A Mediterranean-style diet has been shown in multiple randomized trials to reduce CRP by 20-30%. The landmark PREDIMED trial demonstrated that a Mediterranean diet supplemented with olive oil or nuts reduced major cardiovascular events by 30% in high-risk individuals. CRP is a key marker because even modestly elevated CRP (> 3 mg/L) is associated with 2× higher heart disease risk independent of cholesterol.' },
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
          generateWebAppStructuredData({ name: 'Dietary Inflammatory Index Calculator', description: "Free Dietary Inflammatory Index calculator 2026. Score your diet's pro- or anti-inflammatory potenti", url: 'https://tooltrio.com/calculators/health/dietary-inflammatory-index-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch10DeepDive />
</>
  )
}
