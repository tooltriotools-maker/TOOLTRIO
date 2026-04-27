import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import InvoiceCalculatorClient from './InvoiceCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Invoice Calculator USA 2026 – Create and Calculate Invoice Totals with Tax',
 description: 'Free invoice calculator USA 2026. Add line items, apply sales tax, discounts, and calculate invoice totals instantly. Perfect for freelancers and small businesses. Real examples for $500-$50,000 invoices.',
 slug: 'invoice-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'invoice calculator 2026',
 
 'invoice calculator', 'invoice total calculator', 'freelance invoice calculator',
 'invoice with tax calculator', 'invoice discount calculator', 'late fee calculator',
 'invoice amount calculator', 'contractor invoice calculator', 'billing calculator',
 'how to calculate invoice total', 'invoice tax calculator', 'simple invoice calculator',
 'net 30 invoice calculator', 'invoice late payment calculator', 'service invoice calculator',
 ],
})

const faqs = [
 { question: 'How do I calculate an invoice total?', answer: 'Invoice total = (Sum of all line items) - Discount + Tax. Example: 3 services totaling $4,000, 10% discount = -$400, 8.5% sales tax on $3,600 = +$306. Total due = $3,906. Our invoice calculator does this automatically -- add your line items, set your tax rate and discount percentage, and the total updates instantly.' },
 { question: 'How do I calculate a late payment fee?', answer: 'Late fee = (Invoice total x Monthly rate %) x (Days late / 30). Example: $5,000 invoice, 1.5%/month late fee, 45 days late: $5,000 x 1.5% x (45/30) = $112.50. Common practice: 1.5%/month or 18%/year. US states regulate maximum late fees -- most allow 1.5-2% per month. Always include your late fee policy on the original invoice.' },
 { question: 'What payment terms should I put on my invoice?', answer: 'Common payment terms: Net 30 (most common for B2B -- payment due 30 days after invoice date). Net 15 (faster, better for cash flow). Due on receipt (immediate). 2/10 Net 30 (2% discount if paid within 10 days, full amount due in 30). For new clients or projects over $5,000, consider requiring 50% upfront. Include your late fee policy (e.g., "1.5% per month on overdue balances") on every invoice.' },
 { question: 'How do I calculate sales tax on an invoice?', answer: 'Sales tax = Taxable subtotal x Tax rate. Important: not all services are taxable in all states. Physical goods are almost always taxable. Services vary -- some states tax services, some don\'t. Digital services have varying rules. For freelancers: if you\'re selling a digital product (software, stock photos), check your state\'s rules. If providing a pure service (consulting, coaching), often not taxable. When in doubt, consult a CPA.' },
]

const relatedCalculators = [
 { name: 'Tip Calculator', href: '/calculators/finance/tip-calculator', icon: '🍽️', desc: 'Tip & bill split' },
 { name: 'Business Loan', href: '/calculators/finance/business-loan-calculator', icon: '🏢', desc: 'Business financing' },
 { name: 'Break Even', href: '/calculators/finance/break-even-calculator', icon: '📊', desc: 'Business break-even' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', desc: 'Return on investment' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Invoice Calculator -- Line Items, Tax, Discount & Late Fees', description: 'Calculate invoice totals with tax, discounts, and late payment fees instantly.', url: 'https://tooltrio.com/calculators/finance/invoice-calculator' }),
]

export default function InvoicePage() {
 return <InvoiceCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="small-business-finance-guide-usa-2026" />
}
