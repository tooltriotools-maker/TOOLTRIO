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
      title="RSU Equity Compensation Calculator USA 2026"
      description="Estimate RSU grant value, vesting shares, modeled ordinary income, and tax using fair market value and a flat tax-rate scenario."
      icon="📊"
      category="Finance"
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
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 RSU Equity Compensation Calculator USA 2026 — How to Use This Calculator</h2>
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
          title={"RSU Equity Compensation Calculator"}
          category="finance"
          intro={'This equity compensation page currently models an RSU grant: share count × fair market value, annual vesting, and ordinary-income tax at vest. The strike-price field is retained by the shared calculator but does not create an exercise cost for RSUs.'}
          howItWorks={'The client calls calculateEquityCompensation with type “rsu”. Total value = shares × FMV. Ordinary income equals that value, modeled tax = ordinary income × entered tax rate, annual vest = shares ÷ vesting years, and net value = total value − modeled tax. It does not currently switch between ISO, NSO and RSU tax rules.'}
          tipsSection={'Use the fair market value as a scenario input, not a forecast. A 4,000-share RSU grant at $25 has $100,000 modeled gross value; over four years the model vests 1,000 shares per year. At a 30% entered tax rate, modeled tax on the full grant is $30,000. Actual withholding, vest dates, stock-price changes and later capital gains are outside this estimate.'}
          conclusion={'RSUs are generally compensation when they vest; later sale can create a separate capital gain or loss. This page is a planning estimate, not tax advice. The current UI should not be treated as an ISO/NSO exercise calculator.'}
          benefits={[
            {title:"Calculator-specific methodology",text:"The explanation above follows the formulas and assumptions used by this ToolTrio calculator."},
            {title:"Scenario planning",text:"Change inputs to see how the modeled result responds; do not treat scenario outputs as guaranteed outcomes."},
          ]}
          useCases={[
            {title:"Check assumptions",text:"Use the methodology and limitations to understand what is included before relying on an output."},
            {title:"Compare scenarios",text:"Test realistic alternatives using the same calculation model."},
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
