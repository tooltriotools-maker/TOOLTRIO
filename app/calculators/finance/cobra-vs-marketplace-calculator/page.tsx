import { CalculatorBatch47DeepDive } from '@/components/ui/CalculatorBatch47DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'COBRA vs ACA Marketplace Calculator USA 2026 | ToolTrio', description: 'Compare COBRA health insurance cost vs ACA Marketplace plan with subsidy eligibility. Calculate net monthly premiums and annual savings for USA 2026.', slug: 'cobra-vs-marketplace-calculator', category: 'finance', keywords: ['COBRA vs marketplace calculator', 'ACA subsidy calculator 2026', 'health insurance comparison COBRA', 'marketplace premium calculator USA'] })
const faqs = [
  { question: 'How does this calculator estimate Marketplace assistance?', answer: 'It uses household income, household size, the entered Marketplace premium and a simplified contribution-percentage schedule. It is not the official Form 8962 Premium Tax Credit calculation.' },
  { question: 'Who can qualify for the Premium Tax Credit in 2026?', answer: 'In general, 2026 eligibility returns to household income of at least 100% and no more than 400% of the federal poverty line, subject to the other Premium Tax Credit requirements.' },
  { question: 'Is COBRA always available for 18 months?', answer: 'Eighteen months is common for certain qualifying events, but duration can vary and extensions may apply. Confirm the election notice and plan rules for your event.' },
  { question: 'Should I compare only monthly premiums?', answer: 'No. Compare deductibles, out-of-pocket maximums, provider networks, drug formularies, expected care and any employer or Marketplace eligibility rules.' },
  { question: 'Does turning on “subsidy eligible” prove eligibility?', answer: 'No. It only tells the ToolTrio model to apply its estimated credit. Actual eligibility depends on tax household, income, access to qualifying employer coverage and other federal rules.' }
]
const relatedCalculators = [{'name': 'Medicare vs Private Insurance', 'href': '/calculators/finance/medicare-vs-private-insurance-calculator', 'icon': '🏥', 'desc': 'Medicare vs private'}, {'name': 'HSA vs FSA', 'href': '/calculators/finance/hsa-vs-fsa-calculator', 'icon': '💊', 'desc': 'HSA vs FSA'}, {'name': 'Health Insurance Deductible', 'href': '/calculators/finance/health-insurance-deductible-calculator', 'icon': '🏥', 'desc': 'Deductible calculator'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch47DeepDive slug="cobra-vs-marketplace-calculator" />
</> }
