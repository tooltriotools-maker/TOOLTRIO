import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Startup Equity Value Calculator USA 2026 | ToolTrio',
  description: 'Estimate the potential exit value of your startup equity grant, accounting for dilution across future funding rounds and exit probability.',
  slug: 'startup-equity-value-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['startup equity value calculator','startup stock options value calculator','equity dilution calculator startup','startup exit value estimator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does dilution reduce my startup equity value?', answer: 'Each new funding round typically issues new shares to investors, reducing (diluting) the percentage ownership of existing shareholders including employees — even if the company\'s total valuation rises, your percentage ownership shrinks with each round unless you\'re granted additional shares to offset it.' },
  { question: 'Why should I factor in \'exit probability\' when valuing startup equity?', answer: 'The vast majority of startups don\'t reach a successful exit (acquisition or IPO) that would make equity valuable — applying a realistic probability of a successful outcome to your equity\'s potential value gives a far more honest expected value than assuming the best-case scenario is guaranteed.' },
  { question: 'Is startup equity value the same as what I\'ll actually receive?', answer: 'No — the paper value based on the latest funding round valuation doesn\'t account for dilution in future rounds, liquidation preferences that pay investors first in an exit, vesting requirements, or the possibility of the company failing entirely — all of which typically reduce what employees actually realize compared to the headline valuation.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Stock Option Vesting', href: '/calculators/finance/stock-option-vesting-calculator', icon: '📈', desc: 'Stock Option Vesting' },
  { name: 'QSBS Calculator', href: '/calculators/finance/qsbs-calculator', icon: '🚀', desc: 'QSBS' },
  { name: 'ESOP Value Calculator', href: '/calculators/finance/esop-value-calculator', icon: '📈', desc: 'ESOP Value' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
