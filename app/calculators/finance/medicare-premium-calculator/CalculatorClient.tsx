'use client'
import { calculateMedicarePremium } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [income, setIncome] = useState(90000)

  const result = useMemo(() => {
    try {
      return calculateMedicarePremium(income, 'single', 2026)
    } catch(e) { return null }
  }, [income])

  return (
    <CalculatorLayout
      title="Medicare Premium Calculator USA 2026 — IRMAA Surcharge"
      description="Calculate your 2026 Medicare Part B and Part D premiums including IRMAA income-related surcharges based on your income."
      icon="🏥"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="medicare-premium-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Modified Adjusted Gross Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Part B Monthly Premium" value={result ? `${Number(result.partBPremium).toLocaleString()} /mo` : "—"} highlight />
                <ResultCard label="Part D Surcharge" value={result ? `${Number(result.partDSurcharge).toLocaleString()} /mo` : "—"} />
                <ResultCard label="Total Monthly Premium" value={result ? `${Number(result.monthlyTotal).toLocaleString()} /mo` : "—"} />
                <ResultCard label="Annual Medicare Cost" value={result ? `${Number(result.annualTotal).toLocaleString()} /yr` : "—"} />
                <ResultCard label="IRMAA Tier" value={result ? String(result.tier) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 Medicare Premium Calculator USA 2026 — IRMAA Surcharge — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Medicare premiums in 2026 are not a flat rate. The IRMAA surcharge can add up to $5,334 per year to your Part B premiums alone if your income exceeds certain thresholds. IRMAA is calculated on income from 2 years prior — meaning your 2024 income determines your 2026 Medicare premiums. Income planning before age 63 can save thousands annually in retirement.</p>
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
          title="Medicare Premium Calculator USA 2026 — IRMAA Surcharge"
          category="finance"
          intro="Medicare premiums in 2026 are not a flat rate. The IRMAA surcharge can add up to $5,334 per year to your Part B premiums alone if your income exceeds certain thresholds. IRMAA is calculated on income from 2 years prior — meaning your 2024 income determines your 2026 Medicare premiums. Income planning before age 63 can save thousands annually in retirement."
          howItWorks="Enter your values in the input panel. Results update in real-time using US-standard formulas. All calculations run locally in your browser — no data is sent to any server."
          tipsSection="Compare multiple scenarios by adjusting individual inputs. Small changes in rate or time period often produce dramatically different outcomes due to compounding."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            { title: "Real-Time USA Results", text: "Instant calculations using 2026 IRS limits and US-standard formulas." },
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
