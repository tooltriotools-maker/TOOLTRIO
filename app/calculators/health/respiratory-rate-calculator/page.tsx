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
  title: 'Respiratory Rate Calculator — Normal vs Abnormal Breathing Rate | ToolTrio',
  description: 'Free respiratory rate calculator 2026. Check if your breathing rate (breaths per minute) is normal for your age, detect tachypnea or bradypnea, and understand altitude effects on respiration.',
  slug: 'respiratory-rate-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['respiratory rate calculator', 'normal breathing rate calculator', 'tachypnea calculator', 'breaths per minute normal range', 'respiratory rate by age calculator'],
})

const relatedCalculators = [{'name': 'Blood Pressure', 'href': '/calculators/health/blood-pressure-calculator', 'icon': '🩺', 'desc': 'AHA categories'}, {'name': 'SpO2 Risk', 'href': '/calculators/health/spo2-risk-calculator', 'icon': '💨', 'desc': 'Oxygen saturation'}, {'name': 'Lung Capacity', 'href': '/calculators/health/lung-capacity-calculator', 'icon': '🫁', 'desc': 'FVC & FEV1'}, {'name': 'Heart Rate', 'href': '/calculators/health/heart-rate-calculator', 'icon': '❤️', 'desc': 'Target heart rate zones'}]

const faqs = [
  {"question": "What is a normal respiratory rate?", "answer": "Normal resting respiratory rate ranges: infants 0-1 yr: 30-60 breaths/min; children 1-12: 18-30; adolescents 12-18: 12-20; adults: 12-20; elderly (65+): 12-28. The normal adult resting rate of 12-20 breaths per minute is maintained by the respiratory control center in the brainstem, which adjusts rate and depth to maintain blood CO2 levels within a narrow range (35-45 mmHg PaCO2). Respiratory rate is the most underused vital sign — research shows it is the earliest and most sensitive indicator of patient deterioration, often changing 12-24 hours before other vital signs in deteriorating hospital patients."},
  {"question": "What causes a fast breathing rate (tachypnea)?", "answer": "Tachypnea (>20 breaths/min at rest) is caused by: fever (rate increases 4 breaths/min per 1°C rise), pneumonia, pulmonary embolism, heart failure, asthma or COPD exacerbation, anxiety and panic attacks, metabolic acidosis (e.g., diabetic ketoacidosis — rapid deep breathing called Kussmaul respiration), and anemia. Post-exercise elevation is normal and not tachypnea. Resting rates above 25 breaths/min require prompt medical evaluation as they indicate significant physiological compromise. In hospitalized patients, a respiratory rate above 30/min is a key criteria for critical care escalation."},
  {"question": "How does altitude affect breathing rate?", "answer": "At altitude, lower atmospheric pressure reduces the partial pressure of oxygen available to inhale. The body compensates by increasing respiratory rate and depth to take in more air per minute. At 8,000 feet (2,400 m) — the altitude of Mexico City or Denver — resting breathing rate increases by 1-2 breaths/min. At 14,000 feet (4,270 m) — similar to high Himalayan trekking base camps — resting rate may increase 4-6 breaths/min. Acclimatization over 3-7 days allows the kidneys to excrete bicarbonate, normalizing blood pH and partially resolving the respiratory compensation. Acetazolamide (Diamox) speeds acclimatization by stimulating deeper breathing."}
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
          generateWebAppStructuredData({ name: 'Respiratory Rate Calculator', description: 'Free respiratory rate calculator 2026. Check if your breathing rate (breaths per minute) is normal f', url: 'https://tooltrio.com/calculators/health/respiratory-rate-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch48DeepDive slug="respiratory-rate-calculator" />
</>
  )
}
