'use client'
import { calculateAMT } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [regularTaxIncome, setRegularTaxIncome] = useState(200000)
  const [isoOptions, setIsoOptions] = useState(150000)
  const [preferenceItems, setPreferenceItems] = useState(0)

  const result = useMemo(() => {
    try {
      return calculateAMT(regularTaxIncome, isoOptions, preferenceItems, 'single')
    } catch(e) { return null }
  }, [regularTaxIncome, isoOptions, preferenceItems])

  return (
    <CalculatorLayout
      title="Alternative Minimum Tax (AMT) Calculator USA 2026"
      description="Calculate your AMT exposure from ISO stock options, preference items, and high income. Find strategies to minimize AMT liability."
      icon="⚠️"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="alternative-minimum-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Regular Taxable Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={regularTaxIncome} onChange={e => setRegularTaxIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">ISO Stock Option Spread ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={isoOptions} onChange={e => setIsoOptions(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Preference Items ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={preferenceItems} onChange={e => setPreferenceItems(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="AMT Income" value={result ? `${Number(result.amtIncome).toLocaleString()}` : "—"} highlight />
                <ResultCard label="AMT Exemption" value={result ? `${Number(result.effectiveExemption).toLocaleString()}` : "—"} />
                <ResultCard label="Tentative Minimum Tax" value={result ? `${Number(result.tentativeMinTax).toLocaleString()}` : "—"} />
                <ResultCard label="AMT Owed" value={result ? `${Number(result.amtOwed).toLocaleString()}` : "—"} />
                <ResultCard label="ISO Threshold Before AMT" value={result ? `${Number(result.isoThreshold).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚠️ Alternative Minimum Tax (AMT) Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The Alternative Minimum Tax is a parallel tax system designed to ensure high-income earners pay a minimum rate. For most people, AMT is invisible — but for those exercising ISO stock options or in specific high-income situations, it can trigger unexpected tax bills of tens of thousands of dollars. Knowing your AMT threshold before exercising ISOs is essential.</p>
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
          title="Alternative Minimum Tax (AMT) Calculator USA 2026"
          category="finance"
          intro="The Alternative Minimum Tax is a parallel tax system designed to ensure high-income earners pay a minimum rate. For most people, AMT is invisible — but for those exercising ISO stock options or in specific high-income situations, it can trigger unexpected tax bills of tens of thousands of dollars. Knowing your AMT threshold before exercising ISOs is essential."
          howItWorks="The AMT model adds entered ISO preference income and other preference items to regular-tax income, subtracts the applicable modeled exemption after phaseout, then applies the AMT rates before comparing tentative minimum tax with a simplified regular-tax estimate. For 2026 the calculator uses a $90,100 single exemption, $140,200 joint exemption, phaseout starting at $500,000 single/$1,000,000 joint, and the 28% rate threshold of $244,500 for taxpayers other than married filing separately. The page UI currently calculates single filing status and approximates regular tax as 24% of entered regular-tax income, so Form 6251 can differ materially."
          tipsSection="Compare multiple scenarios by adjusting individual inputs. Small changes in rate or time period often produce dramatically different outcomes due to compounding."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[{title:"ISO preference exposure",text:"Add the bargain element entered for exercised incentive stock options to modeled AMTI."},{title:"2026 exemption phaseout",text:"Apply the 2026 AMT exemption and 25%-of-excess phaseout before computing tentative minimum tax."},{title:"AMT estimate",text:"Compare tentative minimum tax with the calculator's simplified regular-tax estimate; use Form 6251 for filing."}]}
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
