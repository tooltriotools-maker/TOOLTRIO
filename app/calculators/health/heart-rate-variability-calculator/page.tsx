import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HRV Calculator — Heart Rate Variability Score & Recovery | ToolTrio',
  description: 'Free HRV calculator 2026. Calculate your heart rate variability readiness score, compare to age-adjusted norms, and assess autonomic nervous system balance and training recovery status.',
  slug: 'heart-rate-variability-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['HRV calculator', 'heart rate variability calculator', 'RMSSD calculator', 'HRV readiness score', 'heart rate variability age norms calculator'],
})

const relatedCalculators = [{'name': 'Heart Rate Calculator', 'href': '/calculators/health/heart-rate-calculator', 'icon': '❤️', 'desc': 'Target heart rate zones'}, {'name': 'BMR Calculator', 'href': '/calculators/health/bmr-calculator', 'icon': '🔥', 'desc': 'Resting metabolism'}, {'name': 'Stress Level', 'href': '/calculators/health/stress-level-calculator', 'icon': '🧘', 'desc': 'PSS-10 stress score'}, {'name': 'Sleep Cycle', 'href': '/calculators/health/sleep-cycle-calculator', 'icon': '😴', 'desc': 'Sleep timing'}]

const faqs = [('What is HRV and why does it matter?', 'Heart rate variability (HRV) measures the variation in time between consecutive heartbeats, expressed in milliseconds. Unlike heart rate (beats per minute), HRV reflects the activity of your autonomic nervous system — the balance between the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) systems. Higher HRV indicates better autonomic balance, more physiological resilience, and greater cardiovascular fitness. Lower HRV signals stress, poor recovery, overtraining, or underlying health issues. RMSSD (root mean square of successive differences) is the most commonly used HRV metric because it specifically reflects parasympathetic activity.'), ('What is a good HRV score for my age?', 'HRV declines with age — a 20-year-old typically has an RMSSD around 55-65 ms, while a 60-year-old averages 25-35 ms. However, individual variation is enormous (often ±50%), so your own trend over time is more meaningful than any population average. Athletes typically show HRV 10-30% higher than age-matched non-athletes. Wearable devices (Whoop, Oura, Apple Watch) measure HRV automatically overnight. For practical readiness assessment, a day-to-day drop of 20%+ below your 7-day baseline is a meaningful signal to reduce training intensity or prioritize recovery.'), ('What lowers HRV?', 'The strongest suppressors of HRV are alcohol (even 1-2 drinks can reduce HRV by 20-30% overnight), poor sleep quality, illness, psychological stress, intense training without adequate recovery, dehydration, and high ambient heat. Conversely, HRV is improved by consistent aerobic exercise, meditation and slow-paced breathing (6 breaths/minute stimulates the vagus nerve), good sleep hygiene, and cold exposure. Endurance athletes often show high HRV from years of aerobic conditioning, which directly strengthens vagal tone.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Heart Rate Variability (HRV) Calculator', description: 'Free HRV calculator 2026. Calculate your heart rate variability readiness score, compare to age-adju', url: 'https://tooltrio.com/calculators/health/heart-rate-variability-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
