import { CalculatorBatch8DeepDive } from '@/components/ui/CalculatorBatch8DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ankle-Brachial Index (ABI) Calculator — PAD Risk | ToolTrio',
  description: 'Free ABI calculator 2026. Calculate your Ankle-Brachial Index to assess peripheral artery disease (PAD) risk. Enter ankle and arm systolic pressures to get your ABI score, category, and cardiovascular risk.',
  slug: 'ankle-brachial-index-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['ankle brachial index calculator', 'ABI calculator PAD risk', 'peripheral artery disease calculator', 'ABI score normal range', 'ankle brachial index test online'],
})

const relatedCalculators = [{'name': 'Heart Attack Risk', 'href': '/calculators/health/heart-attack-risk-calculator', 'icon': '❤️\u200d🔥', 'desc': '10-yr ASCVD risk'}, {'name': 'Blood Pressure', 'href': '/calculators/health/blood-pressure-calculator', 'icon': '🩺', 'desc': 'AHA categories'}, {'name': 'Stroke Risk', 'href': '/calculators/health/stroke-risk-calculator', 'icon': '🧠', 'desc': 'Framingham risk'}, {'name': 'Cholesterol', 'href': '/calculators/health/cholesterol-calculator', 'icon': '💊', 'desc': 'LDL/HDL ratio'}]

const faqs = [
  {"question": "What is the ankle-brachial index (ABI)?", "answer": "The ABI is a simple, non-invasive test that compares the blood pressure in your ankle to the blood pressure in your arm. A normal ABI is between 0.90 and 1.30. Values below 0.90 indicate narrowing of the arteries in the legs (peripheral artery disease, or PAD), which is caused by atherosclerosis — the same process that causes heart attacks and strokes. PAD affects about 8-10 million Americans and is often undetected because symptoms can be absent or attributed to aging."},
  {"question": "What ABI score indicates peripheral artery disease?", "answer": "An ABI below 0.90 is the standard diagnostic threshold for PAD. Mild PAD is 0.70-0.89, moderate PAD is 0.40-0.69, and critical limb ischemia (severe) is below 0.40. An ABI above 1.30 suggests arterial calcification (common in diabetes and kidney disease) — the arteries are too stiff to compress, which can falsely elevate the reading and requires additional testing like toe-brachial index."},
  {"question": "Why does PAD increase heart attack and stroke risk?", "answer": "PAD is a form of systemic atherosclerosis — if arteries in your legs are narrowed, the same process is almost certainly occurring in arteries throughout your body including coronary arteries and carotid arteries. People with PAD have a 2-4× higher risk of heart attack, stroke, and cardiovascular death compared to people without PAD, regardless of other risk factors. An ABI below 0.90 is an independent predictor of mortality that adds prognostic information beyond traditional Framingham risk factors."}
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
          generateWebAppStructuredData({ name: 'Ankle-Brachial Index (ABI) Calculator', description: 'Free ABI calculator 2026. Calculate your Ankle-Brachial Index to assess peripheral artery disease (P', url: 'https://tooltrio.com/calculators/health/ankle-brachial-index-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch8DeepDive slug="ankle-brachial-index-calculator" />
</>
  )
}
