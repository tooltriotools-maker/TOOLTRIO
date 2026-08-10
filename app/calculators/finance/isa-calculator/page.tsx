import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'ISA Calculator UK 2026 | ToolTrio',
 description: 'Free ISA calculator UK 2026. Calculate tax-free growth in Stocks and Shares ISA, Cash ISA, and Lifetime ISA. Includes 2026 ISA allowance of GBP 20,000 and.',
 slug: 'isa-calculator',
 category: 'finance',
 region: 'uk',
 keywords: [
    'isa calculator 2026',
    'isa calculator',
    'free isa calculator',
    'isa calculator online',
    'best isa calculator 2026',
    'isa calculator ',
    'accurate isa calculator',
    'how to calculate isa',
    'tooltrio.com',
  ],
})

const faqs = [
 { question: 'How accurate are the calculations?', answer: 'This ISA Calculator UK uses the documented calculation method and assumptions described for this calculator. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), considering advice from a qualified financial professional (CFP) or CPA is strongly recommended. This ISA Calculator UK provides a calculation based on the inputs and assumptions shown, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this ISA Calculator UK uses nominal values (current dollars) by default. For long-term projections, always consider that inflation varies by country and period; use an assumption appropriate to your planning horizon. To get inflation-adjusted (real) returns, account for inflation only when an inflation assumption is explicitly provided from the nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are these calculations based on local tax rules?', answer: 'Tax treatment depends on the country, tax year, filing status, and individual circumstances. This calculator uses the assumptions shown in its inputs and is intended for planning and education. Verify current rules with the relevant tax authority or a qualified local professional before making a tax decision.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this ISA Calculator UK, assume consistent contribution rates, steady returns, and tax assumptions shown on this page - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
]

const relatedCalculators = [
 { name: 'UK Pension Calculator', href: '/calculators/finance/uk-pension-calculator', icon: '🏦', desc: 'UK pension' },
 { name: 'UK Income Tax', href: '/calculators/finance/uk-income-tax-calculator', icon: '📋', desc: 'PAYE calculator' },
 { name: 'UK Stamp Duty', href: '/calculators/finance/uk-stamp-duty-calculator', icon: '🏡', desc: 'SDLT calculator' },
 { name: 'FIRE Europe', href: '/calculators/finance/fire-europe-calculator', icon: '🔥', desc: 'European FIRE' },
 { name: 'UK Pension Drawdown', href: '/calculators/finance/uk-pension-drawdown-vs-annuity-calculator', icon: '🎯', desc: 'Pension drawdown' },
 { name: 'UK Buy-to-Let', href: '/calculators/finance/uk-buy-to-let-vs-stocks-calculator', icon: '🏘️', desc: 'Property vs stocks' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() { return <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} blogSlug="isa-guide-uk-stocks-shares-cash-lifetime-isa-2026" />
    </> }
