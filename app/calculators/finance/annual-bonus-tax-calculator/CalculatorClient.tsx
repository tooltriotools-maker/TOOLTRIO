'use client'
import { calculateAnnualBonus } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [baseSalary, setBaseSalary] = useState(95000)
  const [bonusPercent, setBonusPercent] = useState(15)
  const [ytdIncome, setYtdIncome] = useState(95000)

  const result = useMemo(() => {
    try {
      return calculateAnnualBonus(baseSalary, bonusPercent, 'single', ytdIncome, 'CA')
    } catch(e) { return null }
  }, [baseSalary, bonusPercent, ytdIncome])

  return (
    <CalculatorLayout
      title="Annual Bonus Tax Calculator USA 2026 — State by State"
      description="Calculate take-home pay after federal, state, and FICA taxes on your work bonus. Covers all 50 states with specific withholding rates."
      icon="💵"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="annual-bonus-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Base Annual Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={baseSalary} onChange={e => setBaseSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bonus Percentage (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={bonusPercent} onChange={e => setBonusPercent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">YTD Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ytdIncome} onChange={e => setYtdIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Gross Bonus" value={result ? `${Number(result.bonus).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Federal Withholding (22%)" value={result ? `${Number(result.federalWithholding).toLocaleString()}` : "—"} />
                <ResultCard label="State Withholding (CA est.)" value={result ? `${Number(result.stateWithholding).toLocaleString()}` : "—"} />
                <ResultCard label="FICA" value={result ? `${Number(result.fica).toLocaleString()}` : "—"} />
                <ResultCard label="Net Bonus (Take-Home)" value={result ? `${Number(result.netBonus).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💵 Annual Bonus Tax Calculator USA 2026 — State by State — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Estimate take-home bonus using the page’s supplemental-wage withholding model for its current single-filer, California scenario. The UI currently hard-codes single filing status and California. Withholding can differ from final tax, and Medicare Additional Tax, payroll history and employer withholding method can affect actual pay.</p>
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
          title="Annual Bonus Tax Calculator USA 2026 — State by State"
          category="finance"
          intro="Estimate take-home bonus using the page’s supplemental-wage withholding model for its current single-filer, California scenario."
          howItWorks="Bonus = salary × bonus percentage. Federal supplemental withholding is 22% up to $1 million of supplemental wages and 37% above that. The model also applies California’s embedded rate and FICA, with the 2026 Social Security wage base set to $184,500."
          tipsSection="Worked example: On a $100,000 salary with a 10% bonus, the gross bonus is $10,000. The result shows modeled withholding—not the final income tax ultimately due on the bonus."
          conclusion="Important assumptions and limitations: The UI currently hard-codes single filing status and California. Withholding can differ from final tax, and Medicare Additional Tax, payroll history and employer withholding method can affect actual pay. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[
            { title: "Real-Time USA Results", text: "Results update immediately from the inputs and methodology described on this page." },
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
