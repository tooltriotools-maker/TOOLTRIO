import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'DEXA T-Score Calculator — Osteoporosis Risk 2026 | ToolTrio',
  description: 'Free DEXA T-score and Z-score calculator 2026. Interpret your bone density scan results, find your osteopenia or osteoporosis classification, and get 10-year fracture risk and treatment guidance.',
  slug: 'bone-mineral-density-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['DEXA T-score calculator', 'bone mineral density calculator', 'osteoporosis T-score interpretation', 'T-score -2.5 meaning', 'fracture risk bone density calculator'],
})

const relatedCalculators = [{'name': 'Bone Density Risk', 'href': '/calculators/health/bone-density-risk-calculator', 'icon': '🦴', 'desc': 'Osteoporosis risk factors'}, {'name': 'Vitamin D Status', 'href': '/calculators/health/vitamin-d-status-calculator', 'icon': '☀️', 'desc': 'Vitamin D level estimate'}, {'name': 'Calcium Calculator', 'href': '/calculators/health/calcium-calculator', 'icon': '🥛', 'desc': 'Daily calcium needs'}, {'name': 'Frailty Index', 'href': '/calculators/health/frailty-index-calculator', 'icon': '🧓', 'desc': 'Frailty assessment'}]
const faqs = [
  {"question": "What does my DEXA T-score mean?", "answer": "The T-score compares your bone density to a reference population of healthy young adults (30-year-old same sex). A T-score of 0 means your bone density is exactly average for a young adult. T-score of -1.0 means 1 standard deviation below peak bone mass. WHO classification: T-score ≥ -1.0 = Normal; -1.0 to -2.5 = Osteopenia (low bone mass); ≤ -2.5 = Osteoporosis; ≤ -2.5 with fragility fracture = Severe osteoporosis. Each standard deviation decrease in T-score approximately doubles fracture risk."},
  {"question": "What is the difference between T-score and Z-score?", "answer": "The T-score compares your bone density to peak young adult bone mass and is used for fracture risk prediction. The Z-score compares your bone density to people your own age and sex — it indicates whether your bone loss is faster or slower than expected for your age. A Z-score below -2.0 means your bone density is significantly below what is expected for your age, suggesting a secondary cause (medication, disease) rather than just age-related bone loss. Post-menopausal women and men over 50 are assessed with T-scores; younger adults use Z-scores."},
  {"question": "What is the 10-year fracture risk (FRAX)?", "answer": "FRAX (Fracture Risk Assessment Tool) calculates the 10-year probability of a major osteoporotic fracture (hip, spine, wrist, shoulder) based on T-score plus clinical risk factors. Treatment thresholds: US guidelines recommend pharmacological treatment when 10-year hip fracture risk ≥ 3% or major osteoporotic fracture risk ≥ 20%. First-line treatments are bisphosphonates (alendronate, risedronate), which reduce fracture risk by 30-50%. Weight-bearing exercise and calcium/vitamin D supplementation are foundational at all stages."}
]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} structuredData={[generateFAQStructuredData(faqs), generateWebAppStructuredData({ name: 'Bone Mineral Density T-Score Calculator', description: 'Free DEXA T-score and Z-score calculator 2026. Interpret your bone density scan results, find your o', url: 'https://tooltrio.com/calculators/health/bone-mineral-density-calculator', category: 'HealthApplication' })]} relatedCalculators={relatedCalculators} />
    </>
  )
}
