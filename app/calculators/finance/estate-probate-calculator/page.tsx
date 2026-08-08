import { CalculatorBatch24DeepDive } from '@/components/ui/CalculatorBatch24DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Estate Probate Cost Calculator USA 2026 — Avoid Probate | ToolTrio',
  description: 'Calculate estimated probate costs by state, time delays, and savings from a revocable living trust. See exactly what your estate would cost to settle.',
  slug: 'estate-probate-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['estate probate cost calculator USA', 'probate calculator by state 2026', 'how much does probate cost', 'avoid probate calculator', 'living trust vs probate savings'],
})
const faqs = [
  {
    question: 'How much does probate cost?',
    answer: 'Probate costs vary by state and estate complexity. California uses a statutory fee schedule: 4% of first $100K, 3% of next $100K, 2% of next $800K, 1% of next $9M — applied to both attorney AND executor. On an $850,000 estate: approximately $24,000 in attorney fees + $24,000 in executor fees = $48,000 total, plus 12-18 months of court process. Other states range from 2-5% of gross estate value.',
  },
  {
    question: 'What assets avoid probate automatically?',
    answer: 'Assets that pass outside probate: (1) Accounts with beneficiary designations (IRA, 401k, life insurance, annuities), (2) Joint tenancy with right of survivorship (JTWROS) property, (3) Payable-on-death (POD) bank accounts, (4) Transfer-on-death (TOD) brokerage accounts, (5) Assets held in a revocable living trust. Only assets in your individual name with no beneficiary designation go through probate.',
  },
  {
    question: 'Is a living trust worth the cost?',
    answer: "For estates above $200,000 or complex situations (multiple properties, minor children, blended families, business ownership), generally yes. A revocable living trust ($2,500-$5,000 attorney cost) eliminates probate fees ($10,000-$50,000+), saves 12-18 months of delay, maintains privacy (wills become public record; trusts don't), and avoids multi-state probate for property owned in multiple states.",
  }
]
const relatedCalculators = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax Calculator' },
  { name: 'Gift Tax Calculator', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', desc: 'Gift Tax Calculator' },
  { name: 'Wealth Transfer Calculator', href: '/calculators/finance/wealth-transfer-calculator', icon: '👨\u200d👩\u200d👧', desc: 'Wealth Transfer Calculator' },
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch24DeepDive slug="estate-probate-calculator" />
</>
}
