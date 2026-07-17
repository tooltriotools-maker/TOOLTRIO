import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Crypto Staking Rewards Calculator USA 2026 | ToolTrio',
  description: 'Calculate crypto staking rewards with compounding, effective APY vs nominal APR, and ordinary income tax owed on rewards when received.',
  slug: 'crypto-staking-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['crypto staking calculator','staking rewards APY calculator','crypto staking tax 2026','staking compound interest calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How are crypto staking rewards taxed?', answer: 'Per IRS guidance (Rev. Rul. 2023-14), staking rewards are taxed as ordinary income at their fair market value on the date you gain control of them — not when you eventually sell. A second capital gains tax applies later if the coins appreciate before you sell them.' },
  { question: 'What\'s the difference between staking APR and APY?', answer: 'APR (annual percentage rate) is the simple, non-compounded reward rate. APY (annual percentage yield) reflects the effect of compounding when rewards are automatically restaked — the more frequently rewards compound, the more APY exceeds the stated APR over a year.' },
  { question: 'Do I owe tax on staking rewards I haven\'t sold?', answer: 'Yes — under current IRS guidance, staking rewards are taxable income at the moment you receive them and can transfer or sell them, regardless of whether you\'ve converted them to cash. This creates a tax liability even if the token\'s price later falls.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Crypto Profit/Loss Tracker', href: '/calculators/finance/crypto-profit-loss-tracker', icon: '₿', desc: 'Crypto Profit/Loss Tracker' },
  { name: 'Wash Sale Calculator', href: '/calculators/finance/wash-sale-calculator', icon: '🔄', desc: 'Wash Sale' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
