import { CalculatorBatch46DeepDive } from '@/components/ui/CalculatorBatch46DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Alimony Tax Calculator USA 2026 | ToolTrio', description: 'Calculate the tax impact of alimony payments for both payer and recipient. Covers pre-2019 (deductible) and post-2018 TCJA (not deductible) divorce agreements.', slug: 'alimony-tax-calculator', category: 'finance', keywords: ['alimony tax calculator USA', 'alimony deduction 2026', 'TCJA alimony tax rule', 'divorce tax implications calculator USA'] })
const faqs = [
  { question: 'Are alimony payments deductible under current federal law?', answer: "For divorce or separation instruments executed after 2018, qualifying alimony generally is not deductible by the payer and is not included in the recipient's federal gross income." },
  { question: 'What about an agreement executed before 2019?', answer: 'Qualifying payments under a pre-2019 instrument generally remain deductible by the payer and taxable to the recipient unless a later modification expressly applies the post-2018 treatment.' },
  { question: 'Does child support use the same tax rules?', answer: 'No. Child support is not deductible by the payer and is not taxable income to the recipient. This calculator is for payments that legally qualify as alimony or separate maintenance.' },
  { question: 'Why does the calculator ask for both tax rates?', answer: "For a qualifying pre-2019 instrument, it uses the payer's entered marginal rate to illustrate the deduction effect and the recipient's rate to illustrate income tax on the payment." },
  { question: 'Does this calculate state alimony tax treatment?', answer: 'No. It illustrates federal treatment only. State tax rules and the legal classification of payments can differ.' }
]
const relatedCalculators = [{'name': 'Income Tax Calculator', 'href': '/calculators/finance/income-tax-calculator', 'icon': '📋', 'desc': 'Income tax'}, {'name': 'Child Tax Credit', 'href': '/calculators/finance/child-tax-credit-calculator', 'icon': '👶', 'desc': 'Child tax credits'}, {'name': 'Tax Bracket Calculator', 'href': '/calculators/finance/tax-bracket-calculator', 'icon': '🧾', 'desc': 'Tax brackets'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch46DeepDive slug="alimony-tax-calculator" />
</> }
