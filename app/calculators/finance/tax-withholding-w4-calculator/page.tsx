import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax Withholding W-4 Calculator USA 2026 — Adjust Your W-4 | ToolTrio',
  description: 'Calculate the correct W-4 withholding allowances to owe zero at tax time. Avoid big refunds (free loans to IRS) and underpayment penalties.',
  slug: 'tax-withholding-w4-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['W-4 calculator 2026', 'tax withholding calculator USA', 'how to fill out W-4 2026', 'W-4 allowances calculator', 'federal withholding adjustment calculator'],
})
const faqs = [
  { question: "Does this calculator reproduce IRS withholding tables?", answer: "No. It estimates annual income tax with progressive brackets but compares it with a simplified 22% salary-withholding assumption." },
  { question: "What are the 2026 standard deductions used?", answer: "The model uses $16,100 for a single-style case and $32,200 when spouse income is entered as its married-joint proxy." },
  { question: "Does changing my W-4 change my total tax?", answer: "A W-4 generally changes how much federal income tax is withheld during the year; it does not by itself change the tax imposed by law." },
  { question: "Why might my paycheck withholding differ greatly?", answer: "Payroll frequency, multiple jobs, bonuses, pre-tax benefits, dependents and the actual W-4 steps affect withholding." },
  { question: "Where can I get an official withholding estimate?", answer: "Use the IRS Tax Withholding Estimator and current Form W-4 instructions for an actual withholding decision." }
]
const relatedCalculators = [
  { name: 'Payroll Tax Calculator', href: '/calculators/finance/payroll-tax-calculator', icon: '💵', desc: 'Payroll Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
