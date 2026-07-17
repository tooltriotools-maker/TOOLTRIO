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
  title: 'Mental Fatigue Calculator — Burnout & Cognitive Load Score | ToolTrio',
  description: 'Free mental fatigue and burnout risk calculator 2026. Score your cognitive load from work hours, sleep debt, stress, screen time, and recovery habits. Get your mental fatigue level and recovery tips.',
  slug: 'mental-fatigue-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['mental fatigue calculator', 'burnout risk calculator', 'cognitive load calculator', 'mental exhaustion score', 'work fatigue calculator free'],
})

const relatedCalculators = [{'name': 'Stress Level', 'href': '/calculators/health/stress-level-calculator', 'icon': '🧘', 'desc': 'PSS-10 stress score'}, {'name': 'Sleep Debt', 'href': '/calculators/health/sleep-debt-calculator', 'icon': '😴', 'desc': 'Sleep deprivation score'}, {'name': 'Cortisol Stress', 'href': '/calculators/health/cortisol-stress-calculator', 'icon': '🧠', 'desc': 'Stress hormone impact'}, {'name': 'Mental Health Score', 'href': '/calculators/health/mental-health-score-calculator', 'icon': '💆', 'desc': 'PHQ-9 & GAD-7'}]

const faqs = [('What is mental fatigue and how does it differ from physical fatigue?', 'Mental fatigue is a psychobiological state caused by prolonged demands on cognitive resources — sustained attention, decision-making, emotional regulation, and executive function. Unlike physical fatigue (depleted muscle glycogen, acidosis), mental fatigue is primarily driven by accumulation of adenosine and other neuromodulators, and changes in prefrontal cortex activity. It impairs reaction time, decision quality, creativity, and emotional regulation while feeling distinct from sleepiness. High-demand cognitive work for 6+ consecutive hours produces measurable performance decrements equivalent to mild alcohol intoxication.'), ('What is the difference between mental fatigue and burnout?', 'Mental fatigue is acute and reversible — it builds up during a demanding day and largely resolves with rest, sleep, and recovery activities. Burnout is a chronic syndrome defined by three dimensions: emotional exhaustion, depersonalization (detachment from work and people), and reduced sense of personal accomplishment. Burnout develops from sustained, unresolved mental fatigue over months and involves neurobiological changes including HPA axis dysregulation, structural brain changes, and immune dysfunction. This calculator assesses acute mental fatigue — persistent high scores over weeks may indicate burnout requiring professional support.'), ('What are the most effective ways to recover from mental fatigue?', 'Recovery research identifies several highly effective strategies: (1) Ultradian breaks — taking 5-minute breaks every 90 minutes (matching natural brain rest cycles) reduces fatigue accumulation by up to 25%; (2) Nature exposure — even 10 minutes in a natural environment restores directed attention better than rest in an urban environment; (3) Exercise — 20-30 minutes of moderate aerobic exercise acutely reverses mental fatigue and improves subsequent cognitive performance by 10-15%; (4) Sleep — the most powerful recovery tool; each hour of sleep debt accumulates measurable cognitive deficits; (5) Mindfulness — 10 minutes of focused breathing activates parasympathetic recovery.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Mental Fatigue Calculator', description: 'Free mental fatigue and burnout risk calculator 2026. Score your cognitive load from work hours, sle', url: 'https://tooltrio.com/calculators/health/mental-fatigue-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
