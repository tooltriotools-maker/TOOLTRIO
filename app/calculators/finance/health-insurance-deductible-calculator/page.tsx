import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'

import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Health Insurance Deductible & Out-of-Pocket Calculator USA 2026 | ToolTrio',
  description:
    'Calculate actual out-of-pocket costs for medical procedures after deductible, coinsurance, and out-of-pocket maximum. Compare insured vs uninsured costs.',
  slug: 'health-insurance-deductible-calculator',
  category: 'finance',
  region: 'usa',
  keywords: [
    'health insurance deductible calculator',
    'out of pocket maximum calculator USA',
    'medical cost calculator 2026',
    'health insurance cost calculator',
    'deductible vs out of pocket max USA',
  ],
})

const faqs = [
  {
    question: 'What is the difference between deductible and out-of-pocket maximum?',
    answer:
      'Deductible: amount you pay before insurance starts covering costs. Out-of-pocket maximum: the absolute cap on what you pay in a year — after hitting it, insurance covers 100%. Coinsurance: the percentage you pay after your deductible until you hit the OOP max. Example: $3,000 deductible, 20% coinsurance, $8,000 OOP max. On a $30,000 bill: pay $3,000 deductible + 20% of $27,000 until you hit $8,000 OOP max.',
  },
  {
    question: 'What are the 2026 out-of-pocket maximum limits?',
    answer:
      'ACA limits for 2026: $9,450 (self-only) and $18,900 (family). Plans cannot have OOP maximums above these amounts. This means even a catastrophic medical event caps your annual exposure. High-deductible health plans (HDHPs) eligible for HSA contributions have lower limits: $8,050 (individual) and $16,100 (family).',
  },
  {
    question: 'How do I compare health insurance plans?',
    answer:
      'Total annual cost = (12 × monthly premium) + expected out-of-pocket costs. Run this calculator with your expected medical usage — if healthy, a low-premium/high-deductible plan + HSA often wins. If you anticipate significant medical use, a higher-premium/lower-deductible plan may cost less overall. Also factor in network coverage and drug formulary if you take regular medications.',
  },
]

const relatedCalculators = [
  { name: 'HSA vs FSA Calculator',     href: '/calculators/finance/hsa-vs-fsa-calculator',     icon: '🏥', desc: 'HSA vs FSA Calculator' },
  { name: 'HSA Investment Calculator', href: '/calculators/finance/hsa-investment-calculator',  icon: '💊', desc: 'HSA Investment Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '🏛️', desc: 'Medicare Premium Calculator' },
  { name: 'Budget Calculator',         href: '/calculators/finance/budget-calculator',          icon: '📊', desc: 'Budget Calculator' },
]

// JSON-LD rendered server-side only — NOT passed as a client prop
const structuredData = generateFAQStructuredData(faqs)

export default function Page() {
  return (
    <>
      {/* Render JSON-LD directly in the server component — keeps it out of RSC payload */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
    </>
  )
}
