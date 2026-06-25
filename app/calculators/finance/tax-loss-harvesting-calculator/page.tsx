import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Loss Harvesting Calculator USA 2026 | ToolTrio',
  description: 'Calculate immediate tax savings from harvesting investment losses, reinvestment growth, and net long-term benefit vs deferred tax bill.',
  slug: 'tax-loss-harvesting-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax loss harvesting calculator 2026', 'harvest investment losses tax', 'capital loss tax savings calculator', 'TLH calculator USA', 'tax alpha calculator'],
})
const faqs = [
  {
    question: 'What is tax-loss harvesting?',
    answer: 'Tax-loss harvesting (TLH) involves selling investments at a loss to offset capital gains taxes, then immediately reinvesting in a similar (but not substantially identical) investment. The tax savings compound as a larger investment base for future years. Robo-advisors like Betterment and Wealthfront automate this daily; investors in individual accounts can do it manually.',
  },
  {
    question: 'What is the wash-sale rule?',
    answer: "The wash-sale rule prevents claiming a tax loss if you buy a 'substantially identical' security within 30 days before or after the sale. You can sell SPY (S&P 500 ETF) at a loss and immediately buy VOO (also S&P 500 ETF) — the IRS hasn't ruled these as substantially identical. You cannot sell SPY and rebuy SPY within 30 days.",
  },
  {
    question: 'How much does TLH save long-term?',
    answer: 'Studies suggest tax-loss harvesting adds 0.5-1.5% in annual after-tax returns depending on market volatility, tax rates, and holding periods. In a volatile market year (2022-type), TLH opportunities can yield 2-3% in alpha. For a $500,000 portfolio at 15% capital gains rate, $50,000 in losses harvested saves $7,500 immediately — which compounds for decades.',
  }
]
const relatedCalculators = [
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Net Investment Income Tax', href: '/calculators/finance/net-investment-income-tax-calculator', icon: '💹', desc: 'Net Investment Income Tax' },
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
