import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Muscle Recovery Time Calculator — How Long to Rest After Workout? | ToolTrio',
  description: 'Free muscle recovery time calculator 2026. Calculate personalized recovery time after training by muscle group, exercise intensity, volume, age, sleep quality, and protein intake.',
  slug: 'muscle-recovery-time-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['muscle recovery time calculator', 'how long to rest between workouts', 'muscle recovery calculator by age', 'workout recovery calculator', 'how many days rest after leg day calculator'],
})

const relatedCalculators = [{'name': 'HIIT Calculator', 'href': '/calculators/health/hiit-calculator', 'icon': '⚡', 'desc': 'HIIT training zones'}, {'name': 'Protein Intake', 'href': '/calculators/health/protein-intake-calculator', 'icon': '🥩', 'desc': 'Daily protein target'}, {'name': 'Injury Recovery', 'href': '/calculators/health/injury-recovery-calculator', 'icon': '🩹', 'desc': 'Return-to-sport timeline'}, {'name': 'Workout Volume', 'href': '/calculators/health/workout-volume-calculator', 'icon': '📊', 'desc': 'Training volume load'}]

const faqs = [
  {"question": "How long does muscle recovery actually take?", "answer": "Muscle recovery varies widely by muscle group and training stimulus. Type I (slow-twitch) muscles used in endurance work recover within 24 hours. Large, type II dominant muscles like legs (quadriceps, hamstrings, glutes) trained with high intensity and volume can require 48-72+ hours. The chest, back, and shoulders typically need 48 hours. Arms and calves, with their smaller volume, often recover in 24-36 hours. These are population averages — individual recovery is modified by training age, nutrition, sleep quality, age, and stress. This calculator personalizes these estimates to your specific factors."},
  {"question": "Does sleep affect muscle recovery?", "answer": "Sleep is the single most important recovery variable — more impactful than any supplement or recovery modality. During slow-wave sleep (stages 3-4), the pituitary releases 60-70% of daily growth hormone, which drives muscle protein synthesis and tissue repair. A night of <6 hours of sleep reduces protein synthesis rates and elevates cortisol, a catabolic hormone that breaks down muscle tissue. Research shows that athletes sleeping 10 hours per night versus 6 hours improve reaction time by 3%, sprint times by 5%, and mood by 17%. Prioritize sleep above any recovery supplement."},
  {"question": "Does protein timing affect recovery?", "answer": "Post-workout protein timing matters significantly within the 'anabolic window.' Consuming 20-40 grams of rapidly-digesting protein (whey, eggs, chicken) within 30-60 minutes after training maximally stimulates muscle protein synthesis (MPS). However, total daily protein intake (1.6-2.2 g/kg/day) is more important than timing. Spreading protein across 4-5 meals of 30-40g each is superior to consuming the same amount in 1-2 large meals, because each feeding maximally stimulates MPS for about 4-5 hours before becoming refractory. Pre-sleep casein protein (30-40g) has been shown to increase overnight MPS by 22%."}
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
          generateWebAppStructuredData({ name: 'Muscle Recovery Time Calculator', description: 'Free muscle recovery time calculator 2026. Calculate personalized recovery time after training by mu', url: 'https://tooltrio.com/calculators/health/muscle-recovery-time-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch45DeepDive slug="muscle-recovery-time-calculator" />
</>
  )
}
