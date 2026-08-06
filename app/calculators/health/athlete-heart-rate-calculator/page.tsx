import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Heart Rate Zone Calculator — Karvonen Method 2026 | ToolTrio',
  description: 'Free heart rate zone calculator 2026. Uses the Karvonen formula with heart rate reserve to calculate all 5 training zones. Includes VO2max, lactate threshold, and recovery zones.',
  slug: 'athlete-heart-rate-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['heart rate zone calculator', 'karvonen formula calculator', 'training heart rate calculator', 'heart rate reserve calculator', '5 zone training calculator'],
})

const relatedCalculators = [{'name': 'VO2 Max', 'href': '/calculators/health/vo2-max-calculator', 'icon': '🏃', 'desc': 'Aerobic capacity'}, {'name': 'HIIT Calculator', 'href': '/calculators/health/hiit-calculator', 'icon': '⚡', 'desc': 'High intensity intervals'}, {'name': 'Heart Rate Variability', 'href': '/calculators/health/heart-rate-variability-calculator', 'icon': '💓', 'desc': 'HRV readiness'}, {'name': 'Running Pace', 'href': '/calculators/health/running-pace-calculator', 'icon': '🏃', 'desc': 'Pace and speed'}]
const faqs = [
  {"question": "What is the Karvonen formula and why is it better?", "answer": "The Karvonen formula calculates target heart rate as: Target HR = Resting HR + (Heart Rate Reserve × Intensity%). Heart Rate Reserve = Max HR − Resting HR. This accounts for your individual fitness level — two people of the same age but different resting heart rates (one 45 bpm, one 75 bpm) have very different true training zones. The basic %MaxHR method treats them identically, making it systematically wrong. Research shows Karvonen zones align more closely with actual metabolic and lactate thresholds, especially for trained athletes."},
  {"question": "What is Zone 2 training and why is it so popular?", "answer": "Zone 2 (60–70% HRR) is the low-intensity aerobic base zone where you can maintain a full conversation. It primarily burns fat, builds mitochondrial density, improves lactate clearance, and is the foundation of endurance performance. Dr. Iñigo San Millán's research at the CU Boulder Sports Medicine Center shows elite endurance athletes spend 80% of total training volume in Zone 2, with high-intensity work comprising only 20%. Popularised by Peter Attia and others, Zone 2 training is now embraced by longevity researchers as one of the highest-value exercise prescriptions."},
  {"question": "How do I find my true maximum heart rate?", "answer": "The 220 − age formula is a statistical population average with a standard deviation of ±10-12 bpm, meaning a large percentage of individuals' true max HRs fall well outside the formula's prediction. The most accurate method is a supervised graded exercise test (GXT) or an all-out field test (e.g., a 1-mile run finishing at maximal effort). For practical purposes without testing: 208 − (0.7 × age) (Tanaka formula) is more accurate than 220 − age for adults over 40. Wearable devices measuring optical HR are often accurate at submaximal intensities but can undercount at maximal effort."}
]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} structuredData={[generateFAQStructuredData(faqs), generateWebAppStructuredData({ name: 'Athlete Heart Rate Zone Calculator', description: 'Free heart rate zone calculator 2026. Uses the Karvonen formula with heart rate reserve to calculate', url: 'https://tooltrio.com/calculators/health/athlete-heart-rate-calculator', category: 'HealthApplication' })]} relatedCalculators={relatedCalculators} />
    </>
  )
}
