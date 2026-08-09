import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'UK Stamp Duty Calculator 2026 | ToolTrio',
 description: 'Free UK stamp duty (SDLT) calculator 2026. Calculate stamp duty land tax for first-time buyers, standard purchases, and additional properties in England.',
 slug: 'uk-stamp-duty-calculator',
 category: 'finance',
 region: 'uk',
 keywords: [
    'uk stamp duty calculator 2026',
    'uk stamp duty calculator',
    'free uk stamp duty calculator',
    'uk stamp duty calculator online',
    'best uk stamp duty calculator 2026',
    'uk stamp duty calculator no signup',
    'accurate uk stamp duty calculator',
    'how to calculate uk stamp duty',
    'tooltrio.com',
  ],
})

const faqs = [
 { question: 'How accurate are the calculations?', answer: 'This UK Stamp Duty Calculator uses the documented calculation method and assumptions described for this calculator. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), consulting a Certified Financial Planner (CFP) or CPA is strongly recommended. This UK Stamp Duty Calculator provides solid educational estimates and planning scenarios, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this UK Stamp Duty Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation varies by country and period; use an assumption appropriate to your planning horizon. To get inflation-adjusted (real) returns, subtract your expected inflation rate from your nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are these calculations based on local tax rules?', answer: 'Tax treatment depends on the country, tax year, filing status, and individual circumstances. This calculator uses the assumptions shown in its inputs and is intended for planning and education. Verify current rules with the relevant tax authority or a qualified local professional before making a tax decision.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this UK Stamp Duty Calculator, assume consistent contribution rates, steady returns, and static tax rates - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
]

const relatedCalculators = [
 { name: 'ISA Calculator', href: '/calculators/finance/isa-calculator', icon: '💷', desc: 'UK ISA calculator' },
 { name: 'UK Pension Calculator', href: '/calculators/finance/uk-pension-calculator', icon: '🏦', desc: 'UK pension' },
 { name: 'ISA vs SIPP', href: '/calculators/finance/isa-vs-sipp-uk-calculator', icon: '🇬🇧', desc: 'ISA vs SIPP' },
 { name: 'UK Income Tax', href: '/calculators/finance/uk-income-tax-calculator', icon: '📋', desc: 'PAYE calculator' },
 { name: 'FIRE Europe', href: '/calculators/finance/fire-europe-calculator', icon: '🔥', desc: 'European FIRE' },
 { name: 'Stocks ISA vs Cash ISA', href: '/calculators/finance/stocks-shares-isa-vs-cash-isa-calculator', icon: '📈', desc: 'ISA comparison' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() { return <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} blogSlug="uk-stamp-duty-guide-sdlt-first-time-buyer-buy-to-let-2026" />
    </> }
