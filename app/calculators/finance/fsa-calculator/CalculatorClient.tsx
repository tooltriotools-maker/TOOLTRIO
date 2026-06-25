'use client'
import { calculateFSA } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [annualContrib, setAnnualContrib] = useState(2600)
  const [marginalRate, setMarginalRate] = useState(24)
  const [expectedMedical, setExpectedMedical] = useState(2000)

  const result = useMemo(() => {
    try {
      return calculateFSA(annualContrib, marginalRate, 7.65, expectedMedical, true)
    } catch(e) { return null }
  }, [annualContrib, marginalRate, expectedMedical])

  return (
    <CalculatorLayout
      title="FSA Calculator USA 2026 — Flexible Spending Account"
      description="Calculate FSA tax savings, effective discount on medical expenses, and optimal contribution to avoid forfeiture."
      icon="🏥"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="fsa-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual FSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e => setAnnualContrib(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={marginalRate} onChange={e => setMarginalRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Medical Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={expectedMedical} onChange={e => setExpectedMedical(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="FSA Contribution (capped)" value={result ? `${Number(result.contribCapped).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Discount" value={result ? `${Number(result.effectiveDiscount).toFixed(1)}%` : "—"} />
                <ResultCard label="Forfeiture Risk" value={result ? `${Number(result.forfeitRisk).toLocaleString()}` : "—"} />
                <ResultCard label="Recommended Contribution" value={result ? `${Number(result.recommended).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 FSA Calculator USA 2026 — Flexible Spending Account — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A Health FSA lets you pay for medical expenses with pre-tax dollars, saving 24–37% depending on your tax bracket. The $3,300 limit (2026) translates to $792–$1,221 in tax savings depending on your rate. The critical planning element: only contribute what you'll realistically spend — unused FSA funds are forfeited at year-end (beyond the grace period or rollover).</p>
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
          title="FSA Calculator USA 2026 — Flexible Spending Account"
          category="finance"
          intro="A Health FSA lets you pay for medical expenses with pre-tax dollars, saving 24–37% depending on your tax bracket. The $3,300 limit (2026) translates to $792–$1,221 in tax savings depending on your rate. The critical planning element: only contribute what you'll realistically spend — unused FSA funds are forfeited at year-end (beyond the grace period or rollover)."
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
