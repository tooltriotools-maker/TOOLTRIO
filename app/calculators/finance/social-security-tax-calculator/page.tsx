import { CalculatorBatch18DeepDive } from '@/components/ui/CalculatorBatch18DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Benefits Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much of your Social Security is taxable based on combined income. Find the income thresholds and strategies to reduce SS taxation.',
  slug: 'social-security-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security tax calculator', 'is social security taxable 2026', 'social security provisional income calculator', 'how much SS is taxable USA', 'social security combined income calculator'],
})
const faqs = [
  { question: 'What does combined income mean for Social Security taxation?', answer: 'For a quick federal screen, start with one-half of Social Security benefits and add other income. The IRS worksheet also accounts for items such as tax-exempt interest and certain adjustments, so this calculator is intentionally simplified.' },
  { question: 'Does crossing $34,000 mean exactly 85% of my benefits are taxable?', answer: 'No. For a single filer, income above $34,000 can make up to 85% of benefits taxable, but the exact taxable amount comes from the IRS worksheet. This calculator uses a simplified band classification.' },
  { question: 'What thresholds does this calculator use?', answer: 'The current UI is hard-coded for single filing status: $25,000 as the first base threshold and $34,000 as the upper threshold. Married filing jointly uses different IRS thresholds and is not currently selectable here.' },
  { question: 'Does tax-exempt municipal bond interest matter?', answer: 'It can. Tax-exempt interest is included in the IRS Social Security benefits calculation even though the interest itself may be exempt from federal income tax. The current other-income input does not separately model that adjustment.' },
  { question: 'Why is the estimated tax only an approximation?', answer: 'The calculator multiplies its simplified taxable-benefit amount by a flat 22% rate. Your actual marginal rate and the IRS worksheet can produce a different result.' },
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Social Security Spousal', href: '/calculators/finance/social-security-spousal-calculator', icon: '👫', desc: 'Social Security Spousal' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch18DeepDive slug="social-security-tax-calculator" />
</>
}
