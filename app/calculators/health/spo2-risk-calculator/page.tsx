import { CalculatorBatch48DeepDive } from '@/components/ui/CalculatorBatch48DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'SpO2 Calculator — Oxygen Saturation Risk Level 2026 | ToolTrio',
  description: 'Free SpO2 (blood oxygen saturation) risk calculator 2026. Enter your pulse oximeter reading to assess hypoxemia risk, understand altitude effects, and know when to seek medical attention.',
  slug: 'spo2-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['SpO2 calculator', 'oxygen saturation risk calculator', 'pulse oximeter reading calculator', 'hypoxemia risk calculator', 'blood oxygen level calculator free'],
})

const relatedCalculators = [{'name': 'Respiratory Rate', 'href': '/calculators/health/respiratory-rate-calculator', 'icon': '🌬️', 'desc': 'Breathing rate check'}, {'name': 'Heart Rate', 'href': '/calculators/health/heart-rate-calculator', 'icon': '❤️', 'desc': 'Target heart rate'}, {'name': 'Altitude Sickness', 'href': '/calculators/health/altitude-sickness-calculator', 'icon': '🏔️', 'desc': 'AMS risk'}, {'name': 'Lung Capacity', 'href': '/calculators/health/lung-capacity-calculator', 'icon': '🫁', 'desc': 'Spirometry'}]

const faqs = [
  {"question": "What is a normal SpO2 reading?", "answer": "Normal blood oxygen saturation (SpO2) measured by pulse oximetry is 95-100% for healthy adults at sea level. Values of 95-97% are common and healthy. Below 95% warrants monitoring; below 92% is generally considered low enough to warrant medical evaluation (hypoxemia). For people with chronic lung disease (COPD), stable SpO2 values of 88-92% may be their baseline and are managed differently. COVID-19 brought widespread awareness of pulse oximetry — 'happy hypoxia' (low SpO2 without apparent distress) was identified as a dangerous warning sign."},
  {"question": "How accurate are home pulse oximeters?", "answer": "FDA-cleared pulse oximeters have accuracy of ±2-3% at SpO2 levels above 90% in clinical studies. However, real-world accuracy is affected by: skin pigmentation (darker skin tones may be overestimated by 1-3%, though newer devices are improving), nail polish (especially dark colors), poor circulation to fingertips (cold, Raynaud's), movement, and bright ambient light. In clinical practice, a reading of 92% might be anywhere from 89-95%. The trend over time is often more informative than any single reading. If concerned, seek professional oximetry with a reliable medical device."},
  {"question": "When should I go to the ER for low SpO2?", "answer": "Seek immediate emergency care if SpO2 is below 90% persistently (especially with shortness of breath or confusion), falls below 88% at any reading, or any SpO2 reading accompanied by chest pain, severe shortness of breath, confusion, cyanosis (blue lips/fingernails), or rapid deterioration. Do not wait and watch if SpO2 is below 90% with symptoms — oxygen delivery to vital organs becomes inadequate below approximately 90% saturation due to the sigmoid shape of the oxygen-hemoglobin dissociation curve, meaning small further drops cause disproportionate tissue hypoxia."}
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
          generateWebAppStructuredData({ name: 'SpO₂ Oxygen Saturation Risk Calculator', description: 'Free SpO2 (blood oxygen saturation) risk calculator 2026. Enter your pulse oximeter reading to asses', url: 'https://tooltrio.com/calculators/health/spo2-risk-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch48DeepDive slug="spo2-risk-calculator" />
</>
  )
}
