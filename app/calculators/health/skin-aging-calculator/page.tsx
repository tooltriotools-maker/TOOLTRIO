import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Skin Aging Calculator — Photoaging & Biological Skin Age 2026 | ToolTrio',
  description: "Free skin aging risk calculator 2026. Calculate your skin's biological age based on UV exposure, sunscreen use, smoking, diet, sleep, hydration, and skincare routine. Get your top aging factors and essential routine.",
  slug: 'skin-aging-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['skin aging calculator', 'biological skin age calculator', 'photoaging risk calculator', 'skin age test online free', 'premature skin aging calculator'],
})

const relatedCalculators = [{'name': 'UV Exposure', 'href': '/calculators/health/uv-exposure-calculator', 'icon': '☀️', 'desc': 'Safe sun time'}, {'name': 'Hydration', 'href': '/calculators/health/hydration-calculator', 'icon': '💧', 'desc': 'Daily water needs'}, {'name': 'Sleep Cycle', 'href': '/calculators/health/sleep-cycle-calculator', 'icon': '😴', 'desc': 'Sleep optimization'}, {'name': 'Dietary Inflammatory Index', 'href': '/calculators/health/dietary-inflammatory-index-calculator', 'icon': '🔬', 'desc': 'Diet inflammation score'}]

const faqs = [
  { question: 'What causes premature skin aging?', answer: "UV radiation (photoaging) is responsible for approximately 80-90% of visible skin aging — wrinkles, sunspots, textural changes, and loss of elasticity. UV radiation generates reactive oxygen species that degrade collagen and elastin fibers (causing wrinkles), damage keratinocyte DNA (leading to pigmentation and cancer risk), and suppress local immune function. Other major contributors include smoking (reduces collagen synthesis by 40%, causes unique 'smoker's lines' around the mouth), high sugar intake (glycation cross-links collagen making it rigid and discolored), chronic sleep deprivation (impairs cellular repair and growth hormone release), and repeated facial expressions without adequate collagen support." },
  { question: 'Does sunscreen actually prevent skin aging?', answer: 'Yes — daily sunscreen is the most evidence-backed anti-aging intervention available. The landmark QSKIN Australian study showed that people who used SPF 15 daily for 4.5 years had 24% less skin aging at the 4.5-year point compared to those using it at-will, as assessed by a dermatologist. SPF 30 blocks 97% of UVB rays; SPF 50 blocks 98%. Broad-spectrum SPF also protects against UVA (which penetrates glass and causes deeper dermis damage). For daily use, dermatologists recommend applying SPF 30-50 every morning as the last step of skincare, reapplying every 2 hours during outdoor activity.' },
  { question: 'Is retinol actually effective for anti-aging?', answer: 'Retinol (vitamin A derivative) is the most extensively studied topical anti-aging ingredient. Randomized controlled trials demonstrate that prescription tretinoin (0.1%) reduces fine lines by 20-30%, improves skin texture, increases epidermal thickness, and stimulates new collagen synthesis. OTC retinol is 10-20× weaker than tretinoin but produces meaningful benefits at 0.1-0.3% concentrations with consistent use over 6-12 months. The mechanism is direct retinoid receptor binding in keratinocytes, normalizing cell turnover, stimulating fibroblast activity, and inhibiting the MMP enzymes that break down collagen. Sun sensitivity is a key side effect — retinol must be used at night with daily SPF.' },
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
          generateWebAppStructuredData({ name: 'Skin Aging Risk Calculator', description: "Free skin aging risk calculator 2026. Calculate your skin's biological age based on UV exposure, sun", url: 'https://tooltrio.com/calculators/health/skin-aging-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
