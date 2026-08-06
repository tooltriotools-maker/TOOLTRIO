import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Equity Indexed Annuity Calculator USA 2026 — EIA Returns | ToolTrio',
  description: 'Calculate how an equity-indexed annuity performs with participation rate, cap rate, and floor protection vs a CD, stock market, or straightforward fixed annuity.',
  slug: 'equity-indexed-annuity-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['equity indexed annuity calculator USA 2026', 'EIA calculator', 'fixed indexed annuity calculator', 'participation rate cap rate annuity', 'indexed annuity vs CD vs stocks calculator'],
})
const faqs = [
 {question:'How is the credited rate calculated?',answer:'The model multiplies the assumed index return by the participation rate, then applies the contract cap and floor: credited rate = min(cap, max(floor, index return × participation rate)). The same assumed index return is repeated each modeled year.'},
 {question:'Does a 0% floor mean the contract cannot lose value?',answer:'Not necessarily. This calculator applies the floor only to index crediting. Real contracts can include surrender charges, rider charges, withdrawal limits, insurer credit risk and contract-specific adjustments that are not modeled here.'},
 {question:'Does the calculator include dividends from the index?',answer:'No. It uses the index-return input only. Many indexed annuity crediting methods reference a price index rather than giving the owner the dividends paid by index constituents.'},
 {question:'What are the CD and stock comparison values?',answer:'They are fixed ToolTrio scenarios compounded at 5% and 10% annually. They are not current quoted CD rates or forecasts of stock-market returns.'},
 {question:'Why can the annuity trail the index in a strong year?',answer:'Participation rates and caps can reduce the credited return. For example, a 12% index return with 80% participation produces 9.6% before a 9% cap, so the model credits 9%.'}
]
const relatedCalculators = [
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' },
  { name: 'Pension vs Lump Sum', href: '/calculators/finance/pension-vs-lump-sum-calculator', icon: '📅', desc: 'Pension vs Lump Sum' },
  { name: 'Retirement Withdrawal', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal' },
  { name: 'CD vs HYSA vs Money Market', href: '/calculators/finance/cd-vs-hysa-vs-money-market-calculator', icon: '🏦', desc: 'CD vs HYSA vs Money Market' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
