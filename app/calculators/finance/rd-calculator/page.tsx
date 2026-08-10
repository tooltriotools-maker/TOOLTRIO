import { CalculatorBatch53DeepDive } from '@/components/ui/CalculatorBatch53DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Recurring Deposit Calculator India 2026 | ToolTrio',
 description: 'Free recurring deposit calculator India 2026. Calculate RD maturity value, total interest earned, and month-by-month growth for any monthly deposit amount.',
 slug: 'rd-calculator',
 category: 'finance',
 region: 'india',
 keywords: [
    'rd calculator 2026',
    'rd calculator',
    'free rd calculator',
    'rd calculator online',
    'best rd calculator 2026',
    'rd calculator ',
    'accurate rd calculator',
    'how to calculate rd',
    'tooltrio.com',
  ],
})

const relatedCalculators = [
 { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
 { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment returns' },
 { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', icon: '🏛️', desc: 'PPF maturity calculator' },
 { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏦', desc: 'Fixed deposit returns' },
 { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', icon: '🎯', desc: 'NPS pension corpus' },
 { name: 'ELSS vs PPF', href: '/calculators/finance/elss-vs-ppf-calculator', icon: '⚖️', desc: 'ELSS vs PPF comparison' },
]

const faqs = [
 { question: 'What is an RD?', answer: 'A recurring deposit lets you make scheduled deposits for a fixed tenure at a rate offered by the bank or institution. This calculator estimates maturity value from the contribution, rate and tenure you enter.' },
 { question: 'Is the RD rate fixed?', answer: 'The rate is product- and institution-specific. Use the rate shown in your actual RD offer rather than treating a generic market rate as current.' },
 { question: 'Does this calculate Indian RD tax?', answer: 'No. The calculator focuses on the maturity-value scenario. Interest taxation and TDS depend on applicable Indian rules and your circumstances.' },
 { question: 'How accurate is the maturity calculation?', answer: 'The mathematical result is an estimate based on the compounding convention used by the calculator. Banks can use product-specific compounding and deposit-date conventions, so compare the result with the institution\'s disclosure.' },
 { question: 'Can I compare RD with FD or PPF?', answer: 'Yes. Compare after-tax returns, tenure, liquidity and rate assumptions rather than headline interest alone.' }
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
 return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
       <CalculatorClient
 faqs={faqs}
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
 />
          <CalculatorBatch53DeepDive slug="rd-calculator" />
</>
}
