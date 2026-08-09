import { CalculatorBatch8DeepDive } from '@/components/ui/CalculatorBatch8DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cardiac Output Calculator — Heart Function 2026 | ToolTrio',
  description: 'Free cardiac output calculator 2026. Estimate cardiac output, cardiac index, mean arterial pressure, and systemic vascular resistance from heart rate, stroke volume, and blood pressure.',
  slug: 'cardiac-output-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['cardiac output calculator', 'cardiac index calculator', 'mean arterial pressure calculator', 'stroke volume heart rate calculator', 'heart function calculator'],
})

const relatedCalculators = [{'name': 'Blood Pressure', 'href': '/calculators/health/blood-pressure-calculator', 'icon': '🩺', 'desc': 'AHA categories'}, {'name': 'Heart Age', 'href': '/calculators/health/heart-age-calculator', 'icon': '❤️', 'desc': 'Cardiovascular age'}, {'name': 'Heart Attack Risk', 'href': '/calculators/health/heart-attack-risk-calculator', 'icon': '❤️\u200d🔥', 'desc': '10-yr ASCVD risk'}, {'name': 'ABI Calculator', 'href': '/calculators/health/ankle-brachial-index-calculator', 'icon': '🦵', 'desc': 'Peripheral artery disease'}]
const faqs = [
  {"question": "What is a normal cardiac output?", "answer": "Cardiac output (CO) = Heart Rate × Stroke Volume, expressed in litres per minute (L/min). Normal resting CO is 4–8 L/min for adults. More meaningful is cardiac index (CI = CO ÷ Body Surface Area), with normal range 2.5–4.0 L/min/m². The heart pumps approximately 5 litres of blood per minute at rest — your entire blood volume — and can increase 4-6× during maximal exercise in trained athletes. CO below 4 L/min at rest may indicate reduced cardiac function; above 8 L/min at rest may indicate high-output states like anaemia, sepsis, or hyperthyroidism."},
  {"question": "What is mean arterial pressure (MAP)?", "answer": "MAP = Diastolic BP + (Pulse Pressure ÷ 3). It represents the average pressure driving blood to organs throughout the cardiac cycle. Normal MAP is 70–100 mmHg. A MAP below 65 mmHg is used as the threshold for organ perfusion failure in critical care (septic shock protocol). MAP is more physiologically meaningful than systolic BP alone because it accounts for the entire cardiac cycle — organs experience MAP continuously, not just peak systolic pressure."},
  {"question": "What is the Rate-Pressure Product (RPP)?", "answer": "The Rate-Pressure Product = Heart Rate × Systolic BP, and estimates myocardial oxygen consumption. RPP above 20,000–25,000 mm Hg/min typically marks the ischaemic threshold in people with coronary artery disease — the point where myocardial oxygen demand exceeds supply and angina may occur. This is why both tachycardia and hypertension individually increase cardiac workload, and why their combination is particularly dangerous for people with coronary disease."}
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} structuredData={[generateFAQStructuredData(faqs), generateWebAppStructuredData({ name: 'Cardiac Output Estimate Calculator', description: 'Free cardiac output calculator 2026. Estimate cardiac output, cardiac index, mean arterial pressure,', url: 'https://tooltrio.com/calculators/health/cardiac-output-calculator', category: 'HealthApplication' })]} relatedCalculators={relatedCalculators} />
          <CalculatorBatch8DeepDive slug="cardiac-output-calculator" />
</>
  )
}
