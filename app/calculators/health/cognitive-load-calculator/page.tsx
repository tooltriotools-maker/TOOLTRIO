import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cognitive Load Calculator — Mental Bandwidth Score 2026 | ToolTrio',
  description: "Free cognitive load calculator 2026. Measure your total cognitive load from task complexity, interruptions, noise, multitasking, and time pressure. Know when you're in cognitive overload.",
  slug: 'cognitive-load-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['cognitive load calculator', 'mental bandwidth calculator', 'cognitive overload test', 'working memory load calculator', 'task complexity score calculator'],
})

const relatedCalculators = [{'name': 'Mental Fatigue', 'href': '/calculators/health/mental-fatigue-calculator', 'icon': '🧠', 'desc': 'Cognitive fatigue score'}, {'name': 'Stress Level', 'href': '/calculators/health/stress-level-calculator', 'icon': '🧘', 'desc': 'PSS-10 stress'}, {'name': 'Sleep Debt', 'href': '/calculators/health/sleep-debt-calculator', 'icon': '😴', 'desc': 'Sleep deprivation'}, {'name': 'Ergonomics Score', 'href': '/calculators/health/ergonomics-score-calculator', 'icon': '🖥️', 'desc': 'Workstation health'}]
const faqs = [
  { question: 'What is cognitive load theory?', answer: 'Cognitive Load Theory (CLT), developed by John Sweller in 1988, proposes that human working memory has a limited capacity — about 4 ± 1 chunks of information simultaneously. CLT identifies three types: intrinsic load (inherent task complexity), extraneous load (unnecessary cognitive demands from environment or poor design — noise, interruptions), and germane load (mental effort used for learning and schema formation). When total cognitive load exceeds working memory capacity, performance degrades, error rates climb, and learning stops. Modern applications span workplace design, UX, medical protocols, and education.' },
  { question: 'How do interruptions affect cognitive performance?', answer: "Research by Gloria Mark at UC Irvine found the average office worker is interrupted every 11 minutes and requires 23 minutes to fully regain focus after each interruption. The cost goes beyond lost time — context switching depletes cognitive resources, increases error rates by 25–50% on complex tasks, and impairs creative problem-solving. Each interruption resets working memory, causing the 'where was I?' effect. Deep work (Cal Newport) requires uninterrupted 90-minute blocks aligned with ultradian rhythms — the same cycle that governs sleep stages governs daytime cognitive performance." },
  { question: 'What is the optimal cognitive load for peak performance?', answer: "The Yerkes-Dodson law describes an inverted-U relationship between arousal/load and performance: too little stimulation produces boredom and inattention; too much produces anxiety and cognitive overload. The 'sweet spot' is moderate challenge — approximately 40–60% of cognitive capacity — which produces flow states, optimal learning, and peak performance. This is why expert performers can work at intensities that would overwhelm novices: their accumulated schemas (automated knowledge chunks) dramatically reduce intrinsic cognitive load for the same task." },
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} structuredData={[generateFAQStructuredData(faqs), generateWebAppStructuredData({ name: 'Cognitive Load Calculator', description: "Free cognitive load calculator 2026. Measure your total cognitive load from task complexity, interru", url: 'https://tooltrio.com/calculators/health/cognitive-load-calculator', category: 'HealthApplication' })]} relatedCalculators={relatedCalculators} />
          <CalculatorBatch44DeepDive slug="cognitive-load-calculator" />
</>
  )
}
