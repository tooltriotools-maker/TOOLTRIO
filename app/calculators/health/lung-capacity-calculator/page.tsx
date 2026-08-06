import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Lung Capacity Calculator — FVC, FEV1 & Spirometry 2026 | ToolTrio',
  description: 'Free lung capacity calculator 2026. Calculate your predicted FVC and FEV1 vs measured values, detect obstructive or restrictive patterns, and assess COPD risk from smoking pack-years.',
  slug: 'lung-capacity-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['lung capacity calculator', 'FVC FEV1 calculator', 'spirometry normal values calculator', 'COPD risk calculator', 'predicted vs measured FVC calculator'],
})

const relatedCalculators = [{'name': 'BMI Calculator', 'href': '/calculators/health/bmi-calculator', 'icon': '⚖️', 'desc': 'Body mass index'}, {'name': 'VO2 Max', 'href': '/calculators/health/vo2-max-calculator', 'icon': '🏃', 'desc': 'Aerobic fitness'}, {'name': 'Stroke Risk', 'href': '/calculators/health/stroke-risk-calculator', 'icon': '🧠', 'desc': 'Cardiovascular risk'}, {'name': 'Nicotine Withdrawal', 'href': '/calculators/health/nicotine-withdrawal-calculator', 'icon': '🚭', 'desc': 'Quit smoking timeline'}]

const faqs = [
  {"question": "What is FVC and FEV1?", "answer": "FVC (Forced Vital Capacity) is the total amount of air you can forcibly exhale after a full breath — measured in liters. FEV1 (Forced Expiratory Volume in 1 second) is how much of that total you can exhale in the first second. The FEV1/FVC ratio is the key diagnostic number: below 70% indicates an obstructive pattern (airways are narrowed, as in COPD or asthma). A normal FVC with an FEV1/FVC ratio above 70% but a low FVC suggests a restrictive pattern (lungs cannot fully inflate). Your predicted values are based on your height, age, and sex using regression equations from the Global Lung Function Initiative (GLI)."},
  {"question": "What are pack-years and how do they affect lung function?", "answer": "Pack-years = (cigarettes per day / 20) × years of smoking. A pack-year represents smoking one pack per day for one year. 10 pack-years means smoking 20/day for 10 years. The Global Initiative for COPD (GOLD) recommends spirometry screening for adults over 40 with ≥ 10 pack-years and at least one symptom (cough, sputum, dyspnea). Lung function declines at about 30-40 mL/year in non-smokers, but 60-90 mL/year in susceptible smokers — a rate that, if continued, leads to COPD within 10-20 years."},
  {"question": "Can lung capacity be improved?", "answer": "For healthy adults, aerobic exercise consistently improves respiratory muscle endurance and efficiency but does not meaningfully increase lung volume beyond genetic limits. However, for people with COPD or asthma, pulmonary rehabilitation programs (supervised exercise plus breathing techniques) produce clinically significant improvements in exercise tolerance, quality of life, and hospitalization rates. Inspiratory Muscle Training (IMT) devices, used 30 minutes/day, improve inspiratory muscle strength by 30-40% in patients with respiratory muscle weakness. Quitting smoking is the only intervention proven to slow the rate of FEV1 decline."}
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
          generateWebAppStructuredData({ name: 'Lung Capacity Calculator', description: 'Free lung capacity calculator 2026. Calculate your predicted FVC and FEV1 vs measured values, detect', url: 'https://tooltrio.com/calculators/health/lung-capacity-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
