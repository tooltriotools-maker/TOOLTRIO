import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'QSBS Section 1202 Calculator USA 2026 | ToolTrio',
  description: 'Calculate the potential federal capital gains tax exclusion on Qualified Small Business Stock under IRC Section 1202.',
  slug: 'qsbs-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['QSBS calculator','Section 1202 exclusion calculator','qualified small business stock tax','QSBS 5 year holding requirement'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What does Section 1202 potentially exclude?', answer: 'Section 1202 can exclude eligible gain from qualified small business stock when statutory requirements are satisfied. The percentage and dollar limitation can depend on acquisition date and other facts.' },
  { question: 'Is the company gross-asset test always $50 million?', answer: 'No. IRS Schedule D instructions for 2025 state a $75 million gross-asset threshold for stock issued after July 4, 2025, while stock issued on or before that date uses the earlier $50 million threshold. This calculator currently uses the older $50 million test.' },
  { question: 'Can this calculator determine whether my shares are QSBS?', answer: 'No. It does not know whether the shares were acquired at original issuance, whether the issuer was a qualifying domestic C corporation, whether the active-business rules were met, or the exact acquisition date.' },
  { question: 'Why does holding period matter?', answer: 'Section 1202 has holding-period requirements. The current ToolTrio model uses a five-year eligibility check, but newer-law rules and acquisition dates can require more detailed review than this four-input model provides.' },
  { question: 'What is the modeled exclusion cap?', answer: 'The current calculation uses the greater of $10 million or 10 times the entered investment basis. That is a simplified model and should be checked against the rules applicable to the actual shares and acquisition date.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Startup Equity Value', href: '/calculators/finance/startup-equity-value-calculator', icon: '🚀', desc: 'Startup Equity Value' },
  { name: 'Stock Option Tax', href: '/calculators/finance/stock-option-tax-calculator', icon: '💎', desc: 'Stock Option Tax' },
  { name: 'Opportunity Zone', href: '/calculators/finance/opportunity-zone-calculator', icon: '🏙️', desc: 'Opportunity Zone' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
