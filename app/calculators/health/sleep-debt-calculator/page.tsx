import { CalculatorBatch47DeepDive } from '@/components/ui/CalculatorBatch47DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Sleep Debt Calculator — How Much Sleep Are You Owed? | ToolTrio',
  description: 'Free sleep debt calculator 2026. Track your cumulative sleep deficit over the week, calculate cognitive impairment equivalent, and find out how many recovery nights you need.',
  slug: 'sleep-debt-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['sleep debt calculator', 'cumulative sleep deficit calculator', 'how much sleep debt do I have', 'sleep deprivation impact calculator', 'weekly sleep deficit tracker free'],
})

const relatedCalculators = [{'name': 'Sleep Cycle', 'href': '/calculators/health/sleep-cycle-calculator', 'icon': '🌙', 'desc': 'Sleep cycle timing'}, {'name': 'Sleep Need', 'href': '/calculators/health/sleep-need-calculator', 'icon': '💤', 'desc': 'Hours needed by age'}, {'name': 'Mental Fatigue', 'href': '/calculators/health/mental-fatigue-calculator', 'icon': '🧠', 'desc': 'Cognitive fatigue'}, {'name': 'Caffeine Half-Life', 'href': '/calculators/health/caffeine-half-life-calculator', 'icon': '☕', 'desc': 'Caffeine & sleep cutoff'}]

const faqs = [
  {"question": "What is sleep debt and can you fully repay it?", "answer": "Sleep debt is the cumulative deficit between the sleep you need and the sleep you get. Losing 90 minutes per night accumulates a 10.5-hour debt over one week. Research from Penn Sleep Center shows that after 2 weeks of sleeping 6 hours per night, subjects showed cognitive impairment equivalent to 2 full nights of total sleep deprivation — yet subjectively felt only 'slightly sleepy,' demonstrating dangerous unawareness of true impairment. Short-term sleep debt can be largely recovered with extra sleep over subsequent nights. However, chronic multi-year sleep deprivation may have persistent effects on metabolism, immune function, and cardiovascular health that extra sleep does not fully reverse."},
  {"question": "How does sleep deprivation affect cognitive performance?", "answer": "Sleep research from the US Army and DARPA quantifies cognitive performance decrements with precision. After 17 hours awake, cognitive performance equals blood alcohol of 0.05% (legal limit for driving in many countries is 0.08%). After 24 hours, performance equals 0.10% BAC. Each hour of sleep below 8 hours reduces reaction time, working memory, decision quality, and emotional regulation measurably. Most people underestimate their impairment because chronic tiredness feels 'normal.' Even one week of 7 hours per night (vs. 9) produces measurable cognitive deficits in laboratory testing."},
  {"question": "What is the most effective way to repay sleep debt?", "answer": "Research suggests sleep debt can be repaid at approximately 1 hour recovered for every 1.5-2 hours of extra sleep, not 1:1. This means a 10-hour debt might require 2-3 weekends of extra sleep to fully repay. Napping is effective for acute performance recovery — a 90-minute afternoon nap (completing one full sleep cycle) restores most cognitive metrics to baseline. For chronic sleep debt, gradually increasing sleep time by 15-20 minutes per night is more sustainable than dramatic weekend catch-up. The best long-term solution is protecting sleep time as a non-negotiable health investment."}
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
          generateWebAppStructuredData({ name: 'Sleep Debt Accumulation Calculator', description: 'Free sleep debt calculator 2026. Track your cumulative sleep deficit over the week, calculate cognit', url: 'https://tooltrio.com/calculators/health/sleep-debt-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch47DeepDive slug="sleep-debt-calculator" />
</>
  )
}
