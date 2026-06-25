import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage vs Rent Calculator USA 2026 — True Cost Comparison | ToolTrio',
  description: 'Calculate the true total cost of buying vs renting over any time horizon including appreciation, equity buildup, taxes, maintenance, and opportunity cost.',
  slug: 'mortgage-vs-rent-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage vs rent calculator 2026', 'buy vs rent calculator USA', 'is it better to buy or rent 2026', 'true cost of buying a home', 'rent vs own calculator USA'],
})
const faqs = [
  {
    question: 'How long do you need to stay to make buying worth it?',
    answer: 'The break-even period depends on price-to-rent ratio and transaction costs. With 6% agent commission + 2% closing costs on a $450,000 home = $36,000 in transaction costs. At moderate appreciation (3.5%) and your mortgage vs rent payment difference, break-even is typically 4-7 years. Areas with high price-to-rent ratios (SF, NYC, Boston) have longer break-evens; lower-ratio markets (Midwest, South) break even in 2-4 years.',
  },
  {
    question: 'What does the price-to-rent ratio tell me?',
    answer: 'Price-to-rent ratio = Home price / Annual rent. Below 15: generally favor buying. 15-20: neutral, depends on financial situation. Above 20: generally favor renting. A $450,000 home with $2,400/month rent = $28,800/year rent; ratio = 15.6 — in the neutral zone. San Francisco homes often have ratios of 40+; many Midwest cities are below 12.',
  },
  {
    question: 'What costs do most buy vs rent calculators miss?',
    answer: "Often excluded from buy calculations: property tax (1-1.5% annually), homeowner's insurance (0.5-1%), maintenance and repairs (1-2% annually), PMI (if <20% down), HOA fees (where applicable), opportunity cost of down payment (could be invested). On a $450,000 home at 1.5% maintenance/tax/insurance, that's $6,750/year in non-mortgage costs often forgotten in simplified comparisons.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Affordability', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', desc: 'Mortgage Affordability' },
  { name: 'Rent Increase Calculator', href: '/calculators/finance/rent-increase-calculator', icon: '🏠', desc: 'Rent Increase Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
