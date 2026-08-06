'use client'
import { calculateSSBenefit } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [currentAge, setCurrentAge] = useState(55)
  const [claimAge, setClaimAge] = useState(67)
  const [estimatedBenefit, setEstimatedBenefit] = useState(2200)

  const result = useMemo(() => {
    try {
      return calculateSSBenefit(currentAge, claimAge, estimatedBenefit)
    } catch(e) { return null }
  }, [currentAge, claimAge, estimatedBenefit])

  return (
    <CalculatorLayout
      title="Social Security Breakeven Calculator USA 2026"
      description="Find the exact age to claim Social Security for maximum lifetime benefit. Compare claiming at 62, 67, or 70."
      icon="🏛️"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="social-security-breakeven-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Planned Claim Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={claimAge} onChange={e => setClaimAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Estimated Monthly Benefit at FRA ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={estimatedBenefit} onChange={e => setEstimatedBenefit(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Adjusted Monthly Benefit" value={result ? `${Number(result.adjustedBenefit).toLocaleString()} /mo` : "—"} highlight />
                <ResultCard label="Benefit at FRA (67)" value={result ? `${Number(result.monthlyAtFRA).toLocaleString()} /mo` : "—"} />
                <ResultCard label="Estimated Lifetime Benefit" value={result ? `${Number(result.lifetimeBenefit).toLocaleString()}` : "—"} />
                <ResultCard label="Break-Even Age" value={result ? String(result.breakEvenAge) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ Social Security Breakeven Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Social Security claiming age is one of the biggest financial decisions Americans make. Claiming at 62 gives you 8 more years of payments but at 70–77% of your full benefit. Claiming at 70 maximizes your monthly check but requires living to your mid-80s to break even. This calculator shows the exact crossover point for your specific benefit amount.</p>
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
          title="Social Security Breakeven Calculator" category="finance"
          intro="This calculator estimates how claiming before or after a full retirement age of 67 changes a user-entered monthly benefit and compares cumulative benefits through age 90."
          howItWorks="For claims before 67, the code applies the Social Security early-claim monthly reduction formula; after 67 it applies delayed credits at 8% per year. Lifetime benefits are then modeled through age 90. The displayed break-even age is a simplified heuristic, not a pairwise crossover solved from two claiming strategies."
          tipsSection="Worked example: Example: a $2,200 FRA benefit claimed at 62 is reduced under the early-claim formula, while delaying beyond FRA increases the monthly amount. Compare the higher monthly check against the years of payments forgone."
          conclusion="Important assumptions and limitations: This is not an SSA benefit estimate. It assumes FRA 67, ignores COLAs, taxes, survivor/spousal benefits and uses age 90 as a fixed longevity endpoint. Use your SSA statement for the underlying benefit estimate."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
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
