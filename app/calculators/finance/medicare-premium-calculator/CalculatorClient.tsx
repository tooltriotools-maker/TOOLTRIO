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
          intro="This calculator estimates 2026 Medicare Part B premiums and the Part D income-related monthly adjustment amount (IRMAA) for the single-filer scenario shown in the UI. IRMAA is tiered: crossing an income threshold changes the surcharge. The result does not include your Part D plan's own premium, Medigap, Medicare Advantage premiums, deductibles or other out-of-pocket costs."
          howItWorks="The 2026 single-filer IRMAA thresholds used here are $109,000, $137,000, $171,000, $205,000 and $500,000 of modified adjusted gross income. Part B total premiums by tier are $202.90, $284.10, $405.80, $527.50, $649.20 and $689.90. Part D IRMAA amounts are $0, $14.50, $37.50, $60.40, $83.30 and $91.00 per month and are added to the beneficiary's separate plan premium."
          tipsSection="For 2026 IRMAA, Medicare generally uses tax-return information from two years earlier. Certain life-changing events can support an IRMAA reconsideration. The current UI models a single filer only even though the underlying function supports a joint-return threshold table."
          conclusion="Use the estimate to identify the relevant 2026 IRMAA tier, then confirm your actual premium notice and Part D plan premium with Medicare/Social Security."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "Single filer with $150,000 MAGI",
            scenario: "$150,000 falls above $137,000 but not above $171,000 in the 2026 single-filer table.",
            result: "The corrected model assigns a $405.80 Part B monthly premium and $37.50 monthly Part D IRMAA, for $443.30 before the person's separate Part D plan premium.",
            takeaway: "IRMAA is a surcharge calculation; it is not a complete estimate of annual Medicare health-care spending."
          }}
          commonMistakes="For 2026 IRMAA, Medicare generally uses tax-return information from two years earlier. Certain life-changing events can support an IRMAA reconsideration. The current UI models a single filer only even though the underlying function supports a joint-return threshold table."
          inlineLinks={[{ text: "Official 2026 Part B premium and Part D IRMAA tables.", href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles", label: "CMS 2026 Medicare premiums and IRMAA" }]}
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
