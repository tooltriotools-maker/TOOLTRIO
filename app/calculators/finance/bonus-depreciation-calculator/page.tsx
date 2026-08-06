import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Section 179 & Bonus Depreciation Calculator USA 2026 | ToolTrio', description: 'Calculate Section 179 and bonus depreciation deductions for business assets. Model Section 179 and current-law bonus depreciation for eligible business assets and compare the estimated first-year deduction with straight-line depreciation.', slug: 'bonus-depreciation-calculator', category: 'finance', keywords: ['bonus depreciation calculator 2026', 'section 179 calculator', 'business asset depreciation USA', '100% bonus depreciation eligible property 2026'] })
const faqs = [
  ('What is the 2026 bonus depreciation percentage?', 'Current federal law generally provides 100% additional first-year depreciation for eligible property acquired after January 19, 2025. Eligibility and acquisition/placed-in-service rules still matter.'),
  ('What is the 2026 Section 179 limit?', 'For tax years beginning in 2026, the general Section 179 dollar limit is $2,560,000 and begins phasing out when qualifying property placed in service exceeds $4,090,000.'),
  ('Does every business asset qualify for 100% first-year deduction?', 'No. Property type, acquisition date, business use and other rules determine eligibility. Section 179 also has a taxable-business-income limitation and special rules for some vehicles and property.'),
  ('Why can Section 179 and bonus depreciation both appear?', 'The model applies a Section 179 amount first and bonus depreciation to eligible basis remaining afterward. Actual elections and ordering should be determined on Form 4562 under the applicable rules.'),
  ('Is the MACRS amount on this page tax-return ready?', "No. It is a simplified remaining-basis estimate. Actual MACRS depends on the property's recovery period, depreciation method and convention.")
]
const relatedCalculators = [{'name': 'Business Valuation', 'href': '/calculators/finance/business-valuation-calculator', 'icon': '🏢', 'desc': 'Business value'}, {'name': 'Income Tax Calculator', 'href': '/calculators/finance/income-tax-calculator', 'icon': '📋', 'desc': 'Tax savings'}, {'name': 'Break-Even Calculator', 'href': '/calculators/finance/break-even-calculator', 'icon': '⚖️', 'desc': 'Break-even'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} /></> }
