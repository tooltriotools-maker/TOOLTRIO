'use client'
import { useState, useMemo } from 'react'
import { calculateCOBRAvsMarketplace } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Cobra Vs Marketplace Calculator?", "answer": "Check COBRA Monthly, Marketplace Net, Annual Subsidy, Annual Savings and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Cobra Vs Marketplace Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Cobra Vs Marketplace Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [cobraPremium, setCobraPremium] = useState(700)
  const [marketplacePremium, setMarketplacePremium] = useState(550)
  const [annualIncome, setAnnualIncome] = useState(55000)
  const [householdSize, setHouseholdSize] = useState(2)
  const [subsidyEligible, setSubsidyEligible] = useState(true)
  const result = useMemo(() => calculateCOBRAvsMarketplace(cobraPremium, marketplacePremium, annualIncome, householdSize, subsidyEligible), [cobraPremium, marketplacePremium, annualIncome, householdSize, subsidyEligible])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="COBRA vs ACA Marketplace Calculator USA 2026" description="Compare COBRA vs ACA Marketplace health insurance costs including subsidy eligibility." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="cobra-vs-marketplace-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Coverage Details</h2>
          {[
            { label: 'COBRA Monthly Premium', value: cobraPremium, set: setCobraPremium, step: 25, prefix: '$' },
            { label: 'Marketplace Monthly Premium', value: marketplacePremium, set: setMarketplacePremium, step: 25, prefix: '$' },
            { label: 'Annual Household Income', value: annualIncome, set: setAnnualIncome, step: 2500, prefix: '$' },
            { label: 'Household Size', value: householdSize, set: setHouseholdSize, step: 1, suffix: 'people' },
          ].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-600">Subsidy Eligible?</span>
            <button onClick={() => setSubsidyEligible(!subsidyEligible)} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${subsidyEligible ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{subsidyEligible ? 'Yes' : 'No'}</button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold">FPL Income: {result.fplPct}%</p>
            <p className="mt-1">Annual Subsidy: {fmt(result.annualSubsidy)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="COBRA Monthly" value={fmt(result.cobraMonthly)} />
            <ResultCard label="Marketplace Net" value={fmt(result.netMarketplaceMonthly)} subValue={subsidyEligible ? 'after subsidy' : 'no subsidy'} highlight />
            <ResultCard label="Annual Subsidy" value={fmt(result.annualSubsidy)} subValue="ACA credit" />
            <ResultCard label="Annual Savings" value={fmt(result.annualSavings)} subValue={result.annualSavings > 0 ? 'choosing marketplace' : 'choosing COBRA'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-red-600 mb-3">🔴 COBRA</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Monthly Premium</span><span className="font-bold">{fmt(result.cobraMonthly)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Annual Cost</span><span className="font-black text-red-600">{fmt(result.cobraAnnual)}</span></div>
                <div className="text-xs text-gray-400 mt-2">Same network as employer plan. Ends after 18 months.</div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">🟢 ACA Marketplace</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Full Premium</span><span className="font-bold">{fmt(result.marketplaceMonthly)}</span></div>
                <div className="flex justify-between text-green-600"><span>Subsidy</span><span className="font-semibold">-{fmt(result.annualSubsidy / 12)}/mo</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Net Monthly</span><span className="font-black text-green-700">{fmt(result.netMarketplaceMonthly)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Annual Cost</span><span className="font-bold">{fmt(result.marketplaceAnnual)}</span></div>
              </div>
            </Card>
          </div>
          <div className={`rounded-xl p-4 text-sm font-semibold text-center border-2 ${result.annualSavings > 0 ? 'bg-green-50 text-green-800 border-green-200' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>
            💡 {result.recommendation} — {result.annualSavings > 0 ? `Save ${fmt(result.annualSavings)}/year with Marketplace` : 'COBRA keeps your current network'}
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How This COBRA vs Marketplace Comparison Works</h2><p className="text-sm text-gray-600">The calculator compares the annual COBRA premium you enter with the Marketplace premium you enter. If subsidy modeling is enabled, it uses household income and household size to estimate a premium-tax-credit effect, then compares modeled annual premium costs.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">2026 Premium Tax Credit Context</h2><p className="text-sm text-gray-600">For 2026, federal Premium Tax Credit eligibility generally returns to the statutory household-income range of at least 100% and no more than 400% of the federal poverty line, subject to the other eligibility rules. This calculator's piecewise premium percentages are simplified and should not be treated as a Form 8962 calculation.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">With a $700 monthly COBRA premium and a $550 Marketplace benchmark entered, the gross annual premiums are $8,400 and $6,600 before any modeled credit. The meaningful comparison should also include deductibles, out-of-pocket maximums, provider networks, prescriptions and the exact Marketplace plan—not premiums alone.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Important Limitations</h2><p className="text-sm text-gray-600">The subsidy toggle does not establish eligibility. Employer coverage offers, immigration/tax status, benchmark-plan pricing, location and household composition matter. COBRA duration can also differ by qualifying event. Verify actual Marketplace eligibility and plan prices before making a coverage decision.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/affordable-care-act/individuals-and-families/questions-and-answers-on-the-premium-tax-credit" target="_blank" rel="noreferrer">IRS: Premium Tax Credit Q&amp;A</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
