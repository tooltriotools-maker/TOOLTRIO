'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

// Inlined calculation — avoids importing the entire 234 KB finance.ts bundle
function calculateHospitalCosts(
  uninsuredCost: number,
  deductible: number,
  oopMax: number,
  coinsurance: number,
  premium: number,
) {
  const deductiblePaid   = Math.min(uninsuredCost, deductible)
  const afterDeductible  = Math.max(0, uninsuredCost - deductible)
  const coinsurancePaid  = Math.min(afterDeductible * (coinsurance / 100), oopMax - deductiblePaid)
  const totalOOP         = deductiblePaid + coinsurancePaid
  const annualPremium    = premium * 12
  const totalCostWithInsurance = totalOOP + annualPremium
  const savings          = uninsuredCost - totalCostWithInsurance
  return {
    deductiblePaid:        Math.round(deductiblePaid),
    coinsurancePaid:       Math.round(coinsurancePaid),
    totalOOP:              Math.round(totalOOP),
    annualPremium:         Math.round(annualPremium),
    totalCostWithInsurance:Math.round(totalCostWithInsurance),
    savings:               Math.round(savings),
    oopMaxReached:         totalOOP >= oopMax,
  }
}

interface Props {
  faqs: { question: string; answer: string }[]
  relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]
}

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [uninsuredCost, setUninsuredCost] = useState(25000)
  const [deductible,    setDeductible]    = useState(3000)
  const [oopMax,        setOopMax]        = useState(8000)
  const [coinsurance,   setCoinsurance]   = useState(20)
  const [premium,       setPremium]       = useState(450)

  const result = useMemo(
    () => calculateHospitalCosts(uninsuredCost, deductible, oopMax, coinsurance, premium),
    [uninsuredCost, deductible, oopMax, coinsurance, premium],
  )

  return (
    <CalculatorLayout
      title="Health Insurance Deductible & Out-of-Pocket Calculator USA 2026"
      description="Calculate actual out-of-pocket costs for medical procedures after deductible, coinsurance, and out-of-pocket maximum. Compare insured vs uninsured costs."
      icon="💊"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="health-insurance-deductible-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>

          {[
            { label: 'Procedure Cost (Uninsured) ($)', value: uninsuredCost, set: setUninsuredCost, step: 500,  prefix: '$' },
            { label: 'Annual Deductible ($)',           value: deductible,    set: setDeductible,    step: 100,  prefix: '$' },
            { label: 'Out-of-Pocket Maximum ($)',       value: oopMax,        set: setOopMax,        step: 100,  prefix: '$' },
            { label: 'Monthly Premium ($)',             value: premium,        set: setPremium,       step: 25,   prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2"
                style={{ background: 'rgba(248,250,248,0.8)', borderColor: 'rgba(226,232,240,0.7)', backdropFilter: 'blur(6px)' }}>
                <span className="text-green-600 text-sm">{prefix}</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                  step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Coinsurance After Deductible (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2"
              style={{ background: 'rgba(248,250,248,0.8)', borderColor: 'rgba(226,232,240,0.7)', backdropFilter: 'blur(6px)' }}>
              <input type="number" value={coinsurance} onChange={e => setCoinsurance(Number(e.target.value))}
                step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Deductible Paid"     value={`$${result.deductiblePaid.toLocaleString()}`}    highlight />
            <ResultCard label="Coinsurance Paid"    value={`$${result.coinsurancePaid.toLocaleString()}`} />
            <ResultCard label="Total Out-of-Pocket" value={`$${result.totalOOP.toLocaleString()}`} />
            <ResultCard label="Annual Premium"      value={`$${result.annualPremium.toLocaleString()}`} />
            <ResultCard label="Insurance Savings"   value={`$${result.savings.toLocaleString()}`} />
          </div>

          <Card>
            <h2 className="text-lg font-black text-gray-900 mb-3">
              💊 Health Insurance Deductible &amp; Out-of-Pocket Calculator USA 2026 — How to Use
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Understanding your true out-of-pocket exposure requires calculating all three layers: deductible,
              coinsurance, and out-of-pocket maximum. Add in annual premiums and you get the real cost of your
              health insurance plan for any given medical scenario.
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <SEOContent
          title="Health Insurance Deductible & Out-of-Pocket Calculator USA 2026"
          category="finance"
          intro="Understanding your true out-of-pocket exposure requires calculating all three layers: deductible, coinsurance, and out-of-pocket maximum."
          howItWorks="Enter your values in the input panel. Results update in real-time using US-standard formulas. All calculations run locally in your browser — no data is sent to any server."
          tipsSection="Compare multiple scenarios by adjusting individual inputs. Small changes in deductible or coinsurance rate often produce dramatically different outcomes."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            { title: 'Real-Time USA Results', text: 'Instant calculations using 2026 IRS limits and US-standard formulas.' },
            { title: '100% Private',          text: 'Everything runs in your browser. No data stored or transmitted.' },
            { title: 'Free Forever',          text: 'No signup, no paywall, no hidden costs.' },
          ]}
          useCases={[
            { title: 'Personal Planning',    text: 'Model your specific situation with real numbers before making decisions.' },
            { title: 'Scenario Comparison',  text: 'Change one variable at a time to understand the impact of each factor.' },
          ]}
        />
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={relatedCalculators?.map(r => ({ name: r.name, href: r.href, icon: r.icon, desc: r.desc })) ?? []}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
