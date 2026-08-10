'use client'
import { calculateSelfEmploymentTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [netSelfEmploymentIncome, setNetSelfEmploymentIncome] = useState(100000)
  const [hasW2Income, setHasW2Income] = useState(0)
  const [taxRate, setTaxRate] = useState(24)

  const result = useMemo(() => {
    try {
      return calculateSelfEmploymentTax(netSelfEmploymentIncome, hasW2Income)
    } catch(e) { return null }
  }, [netSelfEmploymentIncome, hasW2Income, taxRate])

  return (
    <CalculatorLayout
      title="Self-Employment Tax Calculator USA 2026 — SE Tax + QBI"
      description="Calculate self-employment tax (Social Security + Medicare), deductible half, QBI deduction, and quarterly estimated tax payments."
      icon="💼"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="self-employment-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Net Self-Employment Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={netSelfEmploymentIncome} onChange={e => setNetSelfEmploymentIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">W-2 Income (if any) ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hasW2Income} onChange={e => setHasW2Income(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate (%)</label>
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
                <ResultCard label="SE Tax (SS + Medicare)" value={result ? `${Number(result.totalSETax).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Deductible Half" value={result ? `${Number(result.deduction).toLocaleString()}` : "—"} />
                <ResultCard label="QBI Deduction (20%)" value={result ? `${Number(result.qbiDeduction).toLocaleString()}` : "—"} />
                <ResultCard label="Quarterly Payment" value={result ? `${Number(result.quarterlyEstimate).toLocaleString()}` : "—"} />
                <ResultCard label="Effective SE Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💼 Self-Employment Tax Calculator USA 2026 — SE Tax + QBI — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Self-employed individuals pay both employee and employer portions of Social Security and Medicare — 15.3% on the first $184,500 of net income in 2026. On $100,000 net self-employment income, SE tax is approximately $14,129. The good news: half is deductible, and the QBI deduction can eliminate 20% of remaining taxable income.</p>
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
          title="Self-Employment Tax Calculator USA 2026 — SE Tax + QBI"
          category="finance"
          intro="Self-employed individuals pay both employee and employer portions of Social Security and Medicare — 15.3% on the first $184,500 of net income in 2026. On $100,000 net self-employment income, SE tax is approximately $14,129. The good news: half is deductible, and the QBI deduction can eliminate 20% of remaining taxable income."
          howItWorks="The calculation multiplies net self-employment income by 92.35%, then applies 12.4% Social Security tax up to the remaining annual wage base and 2.9% Medicare tax. The code also models the 0.9% Additional Medicare Tax above $200,000 as a simplified threshold."
          tipsSection="For 2026 the Social Security wage base used by this calculator is $184,500. W-2 Social Security wages entered by the user reduce the remaining wage base available to self-employment earnings."
          conclusion="The Additional Medicare Tax threshold depends on filing status, while this simplified calculator uses $200,000. Its QBI figure is also only 20% of modeled SE earnings and does not apply the full Section 199A rules."
          benefits={[
            { title: "Calculator results", text: "Calculator-specific scenario outputs based on the inputs and assumptions described above." },
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
