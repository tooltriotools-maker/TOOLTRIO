'use client'
import { calculateGiftTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [giftAmount, setGiftAmount] = useState(50000)
  const [gifteeCount, setGifteeCount] = useState(2)
  const [priorTaxableGifts, setPriorTaxableGifts] = useState(0)

  const result = useMemo(() => {
    try {
      return calculateGiftTax(giftAmount, gifteeCount, priorTaxableGifts, 'single')
    } catch(e) { return null }
  }, [giftAmount, gifteeCount, priorTaxableGifts])

  return (
    <CalculatorLayout
      title="Gift Tax Calculator USA 2026 — Annual Exclusion & Lifetime Exemption"
      description="Calculate taxable gifts, annual exclusion used, remaining lifetime exemption, and Form 709 filing requirements."
      icon="🎁"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="gift-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Gift Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={giftAmount} onChange={e => setGiftAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Number of Recipients</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={gifteeCount} onChange={e => setGifteeCount(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Prior Taxable Gifts ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={priorTaxableGifts} onChange={e => setPriorTaxableGifts(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Exclusion Total" value={result ? `${Number(result.annualExclusion).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Taxable Gift" value={result ? `${Number(result.taxableGift).toLocaleString()}` : "—"} />
                <ResultCard label="Gift Tax Owed" value={result ? `${Number(result.giftTaxOwed).toLocaleString()}` : "—"} />
                <ResultCard label="Remaining Lifetime Exemption" value={result ? `${Number(result.newRemainingLifetime).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎁 Gift Tax Calculator USA 2026 — Annual Exclusion & Lifetime Exemption — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Estimate how 2026 annual exclusions reduce a gift and how taxable gifts use the federal lifetime basic exclusion. Form 709 rules have exceptions and special elections. Gift splitting, future interests, direct tuition/medical payments, marital deductions, valuation discounts and GST tax require separate analysis.</p>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-gray-500 text-center py-8">Fill in your details to see results →</p>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SEOContent
          title="Gift Tax Calculator USA 2026 — Annual Exclusion & Lifetime Exemption"
          category="finance"
          intro="Estimate how 2026 annual exclusions reduce a gift and how taxable gifts use the federal lifetime basic exclusion."
          howItWorks="For 2026 the model applies $19,000 per recipient and a $15 million lifetime basic exclusion. Taxable gift = total gifts − available annual exclusions. Tax is modeled at 40% only after remaining lifetime exclusion is exhausted."
          tipsSection="Worked example: A donor giving $50,000 split equally between two recipients has $38,000 of annual exclusions in the single-donor scenario, leaving $12,000 to use against the lifetime exclusion."
          conclusion="Important assumptions and limitations: Form 709 rules have exceptions and special elections. Gift splitting, future interests, direct tuition/medical payments, marital deductions, valuation discounts and GST tax require separate analysis. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[
            { title: "Calculator results", text: "Results update immediately from the inputs and methodology described on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Available without a paid plan", text: "No account is required to run the calculation." },
          ]}
          useCases={[
            { title: "Personal Planning", text: "Model your specific situation with real numbers before making decisions." },
            { title: "Scenario Comparison", text: "Change one variable at a time to understand the impact of each factor." },
          ]}
        />
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={relatedCalculators?.map(r => ({ name: r.name, href: r.href, icon: r.icon, desc: r.desc })) || []}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
