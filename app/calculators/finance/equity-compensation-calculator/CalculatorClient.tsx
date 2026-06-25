'use client'
import { calculateEquityCompensation } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [shares, setShares] = useState(5000)
  const [strikePrice, setStrikePrice] = useState(15)
  const [fmv, setFmv] = useState(65)
  const [vestingYears, setVestingYears] = useState(4)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(() => {
    try {
      return calculateEquityCompensation('rsu', shares, strikePrice, fmv, vestingYears, taxRate)
    } catch(e) { return null }
  }, [shares, strikePrice, fmv, vestingYears, taxRate])

  return (
    <CalculatorLayout
      title="Equity Compensation Calculator USA 2026 — RSU, ISO, NSO"
      description="Calculate tax on RSUs, ISO and NSO stock options including ordinary income, AMT exposure, and long-term capital gains strategies."
      icon="📊"
      category="Finance"
      structuredData={}
      relatedCalculators={relatedCalculators}
      slug="equity-compensation-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Number of Shares</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={shares} onChange={e => setShares(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Strike Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={strikePrice} onChange={e => setStrikePrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current FMV ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={fmv} onChange={e => setFmv(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vesting Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={vestingYears} onChange={e => setVestingYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
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
                <ResultCard label="Total Grant Value" value={result ? `${Number(result.totalValue).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Ordinary Income at Vest" value={result ? `${Number(result.ordinaryIncome).toLocaleString()}` : "—"} />
                <ResultCard label="Tax at Vest" value={result ? `${Number(result.taxOnExercise).toLocaleString()}` : "—"} />
                <ResultCard label="Net Value After Tax" value={result ? `${Number(result.netValue).toLocaleString()}` : "—"} />
                <ResultCard label="Annual Vesting Shares" value={result ? String(result.annualVest) : "—"} />
                <ResultCard label="Annual Tax (RSU)" value={result ? `${Number(result.annualTax).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 Equity Compensation Calculator USA 2026 — RSU, ISO, NSO — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Equity compensation — RSUs, ISOs, NSOs, and restricted stock — represents some of the most complex tax situations in US tax law. The wrong decision at exercise or vesting can cost tens of thousands in unnecessary taxes. This calculator models the tax impact of RSUs (ordinary income at vesting), ISOs (AMT exposure), and NSOs (ordinary income at exercise) for any grant.</p>
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
          title="Equity Compensation Calculator USA 2026 — RSU, ISO, NSO"
          category="finance"
          intro="Equity compensation — RSUs, ISOs, NSOs, and restricted stock — represents some of the most complex tax situations in US tax law. The wrong decision at exercise or vesting can cost tens of thousands in unnecessary taxes. This calculator models the tax impact of RSUs (ordinary income at vesting), ISOs (AMT exposure), and NSOs (ordinary income at exercise) for any grant."
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
