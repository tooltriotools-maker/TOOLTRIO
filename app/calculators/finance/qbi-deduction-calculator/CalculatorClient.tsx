'use client'
import { calculateQBIDeduction } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [qbiIncome, setQbiIncome] = useState(180000)
  const [wagesAndProperty, setWagesAndProperty] = useState(0)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(() => {
    try {
      return calculateQBIDeduction(qbiIncome, 'single', 'non-sstb', wagesAndProperty, taxRate)
    } catch(e) { return null }
  }, [qbiIncome, wagesAndProperty, taxRate])

  return (
    <CalculatorLayout
      title="QBI Deduction Calculator USA 2026 — Section 199A"
      description="Calculate your Section 199A Qualified Business Income deduction for sole proprietors, S-corps, partnerships, and freelancers."
      icon="📋"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="qbi-deduction-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Qualified Business Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={qbiIncome} onChange={e => setQbiIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">W-2 Wages Paid + Property ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={wagesAndProperty} onChange={e => setWagesAndProperty(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Basic QBI Deduction (20%)" value={result ? `${Number(result.basicDeduction).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Final QBI Deduction" value={result ? `${Number(result.finalDeduction).toLocaleString()}` : "—"} />
                <ResultCard label="Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Tax Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📋 QBI Deduction Calculator USA 2026 — Section 199A — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator estimates the Section 199A qualified business income deduction for the single-filer, non-SSTB scenario currently implemented by the tool. It starts with 20% of QBI and then applies the calculator’s wage/property limitation when income is above the 2026 threshold.</p>
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
          title="QBI Deduction Calculator USA 2026 — Section 199A"
          category="finance"
          intro="This calculator estimates the Section 199A qualified business income deduction for the single-filer, non-SSTB scenario currently implemented by the tool. It starts with 20% of QBI and then applies the calculator’s wage/property limitation when income is above the 2026 threshold."
          howItWorks="Basic deduction = 20% × QBI. Above the modeled threshold, the tool compares a 50% wage limit with a second wage/property approximation and phases the limitation in. Important: the current UI hard-codes single filing status and non-SSTB treatment, and its W-2/property field combines concepts that the tax rules treat separately."
          tipsSection="Enter QBI rather than gross business revenue. The current Tax Rate field is informational only: the tax-rate field is used only for the displayed tax-savings estimate; the deduction itself is governed by the simplified Section 199A model. Treat the output as a screening estimate, especially near Section 199A thresholds."
          conclusion="Section 199A depends on taxable income, business type, W-2 wages, qualified property and other return-level limits. This simplified calculator is not a substitute for the Form 8995/8995-A computation."
          benefits={[
            { title: "Real-Time USA Results", text: "Instant calculations from the inputs and assumptions shown on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Free Forever", text: "No signup, no paywall, no hidden costs." },
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
