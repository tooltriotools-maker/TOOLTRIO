import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Workout Volume Calculator — Sets, Reps, Tonnage & MEV/MRV 2026 | ToolTrio',
  description: 'Free workout volume load calculator 2026. Calculate total volume load, weekly tonnage, sets per muscle group vs MEV and MRV thresholds, and progression tips based on your training goal.',
  slug: 'workout-volume-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['workout volume calculator', 'training volume load calculator', 'MEV MRV calculator', 'weekly tonnage calculator', 'how many sets per muscle group calculator'],
})

const relatedCalculators = [{'name': 'One-Rep Max', 'href': '/calculators/health/one-rep-max-calculator', 'icon': '🏋️', 'desc': 'Strength standards'}, {'name': 'Muscle Recovery Time', 'href': '/calculators/health/muscle-recovery-time-calculator', 'icon': '💪', 'desc': 'Recovery timeline'}, {'name': 'HIIT Calculator', 'href': '/calculators/health/hiit-calculator', 'icon': '⚡', 'desc': 'HIIT training zones'}, {'name': 'Protein Intake', 'href': '/calculators/health/protein-intake-calculator', 'icon': '🥩', 'desc': 'Daily protein target'}]

const faqs = [
  {"question": "What is training volume and why does it matter?", "answer": "Training volume is the total amount of work performed in a training session or week, typically measured as sets × reps × weight (volume load), or simply the number of sets per muscle group per week. Volume is the primary driver of hypertrophy (muscle growth) — research by Dr. Mike Israetel and the Renaissance Periodization team identified the Minimum Effective Volume (MEV) as the minimum sets per muscle group needed to stimulate growth, and Maximum Recoverable Volume (MRV) as the maximum the body can recover from without overtraining. For hypertrophy, most muscles require 15-25 sets per week, spread across 2-4 sessions."},
  {"question": "What is the difference between MEV, MAV, and MRV?", "answer": "MEV (Minimum Effective Volume) is the least amount of training stimulus that produces measurable growth — typically 10-12 sets per muscle group per week for most muscles. MAV (Maximum Adaptive Volume) is the sweet spot where maximum growth occurs — roughly 15-25 sets per week. MRV (Maximum Recoverable Volume) is the ceiling above which recovery is compromised and performance declines — typically 25-35 sets/week for most muscles. These numbers vary significantly by muscle group, training history, recovery capacity, and individual genetics. Volume should be periodized — gradually increasing over a mesocycle then deloading."},
  {"question": "Is it better to do more sets or more weight for muscle growth?", "answer": "Both volume (sets × reps) and intensity (weight relative to 1RM) contribute to muscle growth, but they stimulate different hypertrophic mechanisms. High-volume, moderate-load training (70-85% 1RM, 6-12 reps) predominantly stimulates metabolic and mechanical hypertrophy — generally producing more muscular size. High-intensity, low-rep training (>85% 1RM, 1-5 reps) primarily develops neuromuscular strength and myofibrillar hypertrophy. Most effective programs periodize both: a hypertrophy phase (8-12 weeks of moderate load/high volume) followed by a strength phase (4-6 weeks of high load/moderate volume) produces superior long-term results to either approach alone."}
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
          generateWebAppStructuredData({ name: 'Workout Volume Load Calculator', description: 'Free workout volume load calculator 2026. Calculate total volume load, weekly tonnage, sets per musc', url: 'https://tooltrio.com/calculators/health/workout-volume-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
