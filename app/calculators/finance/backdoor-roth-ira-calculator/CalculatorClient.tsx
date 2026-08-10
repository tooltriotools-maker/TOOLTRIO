'use client'
import { calculateBackdoorRoth } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [income, setIncome] = useState(200000)
  const [conversionAmount, setConversionAmount] = useState(7500)
  const [nonDeductibleBasis, setNonDeductibleBasis] = useState(7500)
  const [totalIRABalance, setTotalIRABalance] = useState(7500)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(() => {
    try {
      return calculateBackdoorRoth(income, 'single', conversionAmount, nonDeductibleBasis, totalIRABalance, taxRate)
    } catch(e) { return null }
  }, [income, conversionAmount, nonDeductibleBasis, totalIRABalance, taxRate])

  return (
    <CalculatorLayout
      title="Backdoor Roth IRA Calculator USA 2026"
      description="Estimate the taxable share of a backdoor Roth conversion under a simplified pro-rata calculation and see how existing IRA basis changes the result."
      icon="🚪"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="backdoor-roth-ira-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Conversion Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={conversionAmount} onChange={e => setConversionAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Non-Deductible IRA Basis ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={nonDeductibleBasis} onChange={e => setNonDeductibleBasis(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Pre-Tax IRA Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalIRABalance} onChange={e => setTotalIRABalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Tax Rate (%)</label>
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
                <ResultCard label="Pro-Rata Tax-Free %" value={result ? `${Number(result.proRataRatio * 100).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Taxable Conversion" value={result ? `${Number(result.taxableConversion).toLocaleString()}` : "—"} />
                <ResultCard label="Tax Owed Now" value={result ? `${Number(result.taxDue).toLocaleString()}` : "—"} />
                <ResultCard label="Strategy" value={result ? String(result.strategy) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🚪 Backdoor Roth IRA Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator focuses on the tax impact of converting a nondeductible Traditional IRA contribution when you also have other IRA money. It estimates the tax-free share under a simplified pro-rata calculation and the tax due on the taxable share.</p>
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
          title="Backdoor Roth IRA Calculator USA 2026"
          category="finance"
          intro="This calculator focuses on the tax impact of converting a nondeductible Traditional IRA contribution when you also have other IRA money. It estimates the tax-free share under a simplified pro-rata calculation and the tax due on the taxable share."
          howItWorks="Pro-rata ratio = nondeductible basis ÷ modeled total IRA balance. Taxable conversion = conversion amount × (1 − pro-rata ratio), and tax due = taxable conversion × entered tax rate. The model uses the 2026 direct Roth contribution phaseout ceiling only as a flag; income does not prohibit a Roth conversion. Actual Form 8606 aggregation generally considers Traditional, SEP, and SIMPLE IRA balances and year-end values, so this simplified input may not reproduce your tax return."
          tipsSection="For 2026 the direct Roth IRA contribution phaseout is $153,000–$168,000 for single/head-of-household filers and $242,000–$252,000 for married filing jointly. The IRA contribution limit is $7,500, or $8,600 if age 50+. A backdoor contribution does not bypass the annual IRA contribution limit."
          conclusion="Use this calculator to understand why existing pre-tax IRA balances can make a backdoor Roth conversion taxable. Confirm basis and year-end IRA balances before filing Form 8606."
          benefits={[
            { title: "Calculator results", text: "Results follow the calculation methodology and assumptions explained on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Available without a paid plan", text: "No account is required to run the calculation." },
          ]}
          useCases={[
            { title: "Personal Planning", text: "Use the calculator inputs to test a concrete planning scenario." },
            { title: "Scenario Comparison", text: "Compare the result after changing the input that matters to this calculation." },
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
