'use client'
import { calculateMegaBackdoorRoth } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [salary, setSalary] = useState(120000)
  const [regularContrib, setRegularContrib] = useState(23500)
  const [employerMatch, setEmployerMatch] = useState(4)
  const [afterTaxContrib, setAfterTaxContrib] = useState(20000)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(() => {
    try {
      return calculateMegaBackdoorRoth(salary, regularContrib, employerMatch, afterTaxContrib, taxRate)
    } catch(e) { return null }
  }, [salary, regularContrib, employerMatch, afterTaxContrib, taxRate])

  return (
    <CalculatorLayout
      title="Mega Backdoor Roth Calculator USA 2026"
      description="Calculate how much extra after-tax you can contribute to your 401k and convert to Roth under the $70,000 2026 limit."
      icon="💪"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="mega-backdoor-roth-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Regular 401k Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={regularContrib} onChange={e => setRegularContrib(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Employer Match (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={employerMatch} onChange={e => setEmployerMatch(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">After-Tax Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={afterTaxContrib} onChange={e => setAfterTaxContrib(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
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
                <ResultCard label="Max After-Tax Allowed" value={result ? `${Number(result.afterTaxMax).toLocaleString()}` : "—"} highlight />
                <ResultCard label="In-Plan Conversion" value={result ? `${Number(result.inPlanConversion).toLocaleString()}` : "—"} />
                <ResultCard label="Tax-Free Growth (30yr)" value={result ? `${Number(result.taxFreeGrowth30yr).toLocaleString()}` : "—"} />
                <ResultCard label="Total 401k Contribution" value={result ? `${Number(result.totalContrib).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💪 Mega Backdoor Roth Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The mega backdoor Roth strategy allows high-income earners to contribute up to $70,000 total to their 401k in 2026 — far exceeding the standard $23,500 pre-tax limit — by making after-tax contributions that are immediately converted to Roth. This creates massive tax-free compounding potential unavailable through any other vehicle.</p>
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
          title="Mega Backdoor Roth Calculator USA 2026"
          category="finance"
          intro="Estimate how much after-tax 401(k) contribution room may remain for a mega backdoor Roth strategy after regular employee deferrals and employer contributions. This strategy is only possible when the employer plan permits the necessary after-tax contributions and Roth conversion or rollover mechanics."
          howItWorks="The model starts with the 2026 defined-contribution annual-additions limit, subtracts regular elective deferrals and the employer contribution, and caps the requested after-tax contribution at the remaining room. It then illustrates 30 years of 7% growth and applies your tax rate to the modeled growth to show a hypothetical tax-value comparison."
          tipsSection="Check your plan document before relying on the result. The annual-additions limit is not the same as the employee elective-deferral limit, and catch-up contributions can have separate treatment. Existing plan contributions from the same employer also count toward annual additions."
          conclusion="Use this as contribution-room planning, not as confirmation that your plan supports a mega backdoor Roth. For 2026, the IRS employee elective-deferral limit is $24,500 and the general annual-additions limit is $72,000."
          benefits={[{title:"Methodology",text:"Explains the calculation actually used on this page."},{title:"Scenario planning",text:"Change inputs to see which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Worked scenario",text:"Use realistic inputs and compare the output with the methodology."},{title:"Decision support",text:"Use the result as an estimate, then verify rules, rates or product terms that apply to you."}]}
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
