import { CalculatorBatch57DeepDive } from '@/components/ui/CalculatorBatch57DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'HRA Calculator India & USA 2026 | ToolTrio',
 description: 'Free HRA and housing allowance calculator USA 2026. Calculate tax exemption on house rent allowance, tax savings on rent paid, and net taxable salary.',
 slug: 'hra-calculator',
 category: 'finance',
 region: 'india',
 keywords: [
    'hra calculator 2026',
    'hra calculator',
    'free hra calculator',
    'hra calculator online',
    'best hra calculator 2026',
    'hra calculator ',
    'accurate hra calculator',
    'how to calculate hra',
    'tooltrio.com',
  ],
})

const faqs = [
 { question: 'How accurate are the calculations?', answer: 'This Housing Allowance Calculator uses the documented calculation method and assumptions described for this calculator. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), considering advice from a qualified financial professional (CFP) or CPA is strongly recommended. This Housing Allowance Calculator provides a calculation based on the inputs and assumptions shown, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this Housing Allowance Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation varies by country and period; use an assumption appropriate to your planning horizon. To get inflation-adjusted (real) returns, account for inflation only when an inflation assumption is explicitly provided from the nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are these calculations based on local tax rules?', answer: 'Tax treatment depends on the country, tax year, filing status, and individual circumstances. This calculator uses the assumptions shown in its inputs and is intended for planning and education. Verify current rules with the relevant tax authority or a qualified local professional before making a tax decision.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this Housing Allowance Calculator, assume consistent contribution rates, steady returns, and tax assumptions shown on this page - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
]

const relatedCalculators = [
 { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
 { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment returns' },
 { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', icon: '🏛️', desc: 'PPF maturity calculator' },
 { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏦', desc: 'Fixed deposit returns' },
 { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', icon: '🎯', desc: 'NPS pension corpus' },
 { name: 'ELSS vs PPF', href: '/calculators/finance/elss-vs-ppf-calculator', icon: '⚖️', desc: 'ELSS vs PPF comparison' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return (
 <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient
 faqs={faqs}
 relatedCalculators={relatedCalculators}
 blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
 />
          <CalculatorBatch57DeepDive slug="hra-calculator" />
</>)
}
