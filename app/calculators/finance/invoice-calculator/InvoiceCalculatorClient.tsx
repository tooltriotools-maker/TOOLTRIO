'use client'
import { useState, useMemo } from 'react'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { invoiceSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
interface LineItem { description: string; qty: number; rate: number }

const DEFAULT_ITEMS: LineItem[] = [
  { description: 'Web Design', qty: 1, rate: 2500 },
  { description: 'SEO Setup', qty: 1, rate: 800 },
  { description: 'Consulting Hours', qty: 4, rate: 150 },
]

export default function InvoiceCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt } = useCurrency()
  const m = currency.code === 'INR' ? 80 : 1

  const [items, setItems]         = useState<LineItem[]>(DEFAULT_ITEMS.map(i => ({ ...i, rate: Math.round(i.rate * m) })))
  const [taxRate, setTaxRate]     = useState(0)
  const [discount, setDiscount]   = useState(0)
  const [lateFeeRate, setLateFeeRate] = useState(1.5)
  const [paymentDays, setPaymentDays] = useState(30)
  const [daysLate, setDaysLate]   = useState(0)

  const subtotal      = items.reduce((s, i) => s + i.qty * i.rate, 0)
  const discountAmt   = Math.round(subtotal * discount / 100)
  const afterDiscount = subtotal - discountAmt
  const taxAmt        = Math.round(afterDiscount * taxRate / 100)
  const total         = afterDiscount + taxAmt
  const lateFee       = daysLate > 0 ? Math.round(total * lateFeeRate / 100 * daysLate / 30) : 0
  const totalWithLate = total + lateFee

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + paymentDays)

  const updateItem = (idx: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items]
    updated[idx] = { ...updated[idx], [field]: value }
    setItems(updated)
  }

  const addItem = () => setItems([...items, { description: 'New Service', qty: 1, rate: Math.round(100 * m) }])
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx))

  return (
    <CalculatorLayout title="Invoice Calculator USA 2026" description="Add line items, apply tax and discounts, and calculate invoice totals for freelancers and businesses." icon="🧾" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="invoice-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Line Items</h2>
              <button onClick={addItem} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-semibold">+ Add Item</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-200">
                    <th className="text-left pb-2 pr-3">Description</th>
                    <th className="text-right pb-2 px-2 w-16">Qty</th>
                    <th className="text-right pb-2 px-2 w-28">Unit Rate</th>
                    <th className="text-right pb-2 pl-2 w-28">Amount</th>
                    <th className="pb-2 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 pr-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={e => updateItem(idx, 'description', e.target.value)}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-green-500 focus:outline-none text-gray-900 text-sm py-0.5"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={e => updateItem(idx, 'qty', parseFloat(e.target.value) || 0)}
                          className="w-16 text-right bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-green-500"
                          min={0} step={0.5}
                        />
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-xs">{currency.symbol}</span>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={e => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-24 text-right bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-green-500"
                            min={0} step={1}
                          />
                        </div>
                      </td>
                      <td className="py-2 pl-2 text-right font-semibold text-gray-900">
                        {fmt(item.qty * item.rate)}
                      </td>
                      <td className="py-2 pl-2">
                        {items.length > 1 && (
                          <button onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 text-lg leading-none">x</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{fmt(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Discount ({discount}%)</span>
                  <span className="text-red-500 font-semibold">-{fmt(discountAmt)}</span>
                </div>
              )}
              {taxRate > 0 && (
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Tax ({taxRate}%)</span>
                  <span className="font-semibold">{fmt(taxAmt)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b-2 border-gray-300">
                <span className="font-bold text-gray-900 text-base">Total Due</span>
                <span className="font-black text-gray-900 text-xl">{fmt(total)}</span>
              </div>
              {daysLate > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-red-500">Late Fee ({daysLate} days @ {lateFeeRate}%/mo)</span>
                  <span className="text-red-500 font-semibold">+{fmt(lateFee)}</span>
                </div>
              )}
              {daysLate > 0 && (
                <div className="flex justify-between py-1 border-t border-gray-200 font-black text-red-700 text-lg">
                  <span>Total with Late Fee</span>
                  <span>{fmt(totalWithLate)}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Total Due" value={fmt(total)} subValue="Invoice total" highlight />
            <ResultCard label="Due Date" value={dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} subValue={`Net ${paymentDays}`} />
          </div>

          <Card>
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Invoice Settings</h2>
            <div className="space-y-4">
              <InputField label="Discount (%)" value={discount} onChange={setDiscount} min={0} max={100} step={1} suffix="%" />
              <InputField label="Tax Rate (%)" value={taxRate} onChange={setTaxRate} min={0} max={30} step={0.25} suffix="%" />
              <InputField label="Payment Terms (Days)" value={paymentDays} onChange={setPaymentDays} min={1} max={90} step={1} suffix="days" />
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-4">Late Payment Fees</h2>
            <div className="space-y-4">
              <InputField label="Days Overdue" value={daysLate} onChange={setDaysLate} min={0} max={365} step={1} suffix="days" />
              <InputField label="Late Fee Rate (%/month)" value={lateFeeRate} onChange={setLateFeeRate} min={0} max={5} step={0.25} suffix="%" />
            </div>
            {daysLate > 0 && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-700">
                Late fee accrued: <strong>{fmt(lateFee)}</strong> ({daysLate} days x {lateFeeRate}%/month)
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Invoice Summary</h3>
            <div className="space-y-1.5 text-xs">
              {[
                ['Line Items', items.length],
                ['Subtotal', fmt(subtotal)],
                ['Discount', discount > 0 ? `-${fmt(discountAmt)}` : 'None'],
                ['Tax', taxRate > 0 ? fmt(taxAmt) : 'None'],
                ['Total', fmt(total)],
                ['Payment Due', dueDate.toLocaleDateString()],
              ].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between">
                  <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">

        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Business Loan Calculator", href: "/calculators/finance/business-loan-calculator", icon: "🏢", desc: "Free calculator" },          { name: "Break Even Calculator", href: "/calculators/finance/break-even-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Invoice Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Invoice USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Invoice Calculator USA 2026 – Calculate Accurate Invoice Totals Instantly</h2>
        <p className="text-sm text-gray-600">Accurate invoicing is essential for every freelancer and small business. This invoice calculator USA 2026 handles multiple line items, discounts, and state-specific sales tax so you always get paid the right amount.</p>
      </Card>

        <SEOContent {...invoiceSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
