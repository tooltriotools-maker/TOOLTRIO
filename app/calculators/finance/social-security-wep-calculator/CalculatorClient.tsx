'use client'
import { useState, useMemo } from 'react'
import { calculateSocialSecurityWEP } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [regularBenefit, setRegularBenefit] = useState(1800)
  const [nonCoveredPension, setNonCoveredPension] = useState(2000)
  const [yearsSubstantial, setYearsSubstantial] = useState(15)
  const result = useMemo(() => calculateSocialSecurityWEP(regularBenefit, nonCoveredPension, yearsSubstantial), [regularBenefit, nonCoveredPension, yearsSubstantial])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Social Security WEP Calculator USA 2026" description="Calculate the Windfall Elimination Provision (WEP) reduction to your Social Security benefit." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="social-security-wep-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your Benefits</h2>
          {[
            { label: 'Regular SS Benefit (before WEP)', value: regularBenefit, set: setRegularBenefit, step: 50, prefix: '$', suffix: '/mo' },
            { label: 'Non-Covered Pension (monthly)', value: nonCoveredPension, set: setNonCoveredPension, step: 50, prefix: '$', suffix: '/mo' },
            { label: 'Years of Substantial SS Earnings', value: yearsSubstantial, set: setYearsSubstantial, step: 1, suffix: 'yrs' },
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
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold">WEP Factor: {result.wepFactor}%</p>
            <p className="mt-1">Max 2026 Reduction: ${result.maxReduction}/mo</p>
            <p className="mt-1">30+ substantial earning years = no WEP</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Without WEP" value={fmt(result.regularBenefit) + '/mo'} />
            <ResultCard label="WEP Reduction" value={'-' + fmt(result.wepReduction) + '/mo'} subValue="monthly cut" />
            <ResultCard label="Your SS Benefit" value={fmt(result.reducedBenefit) + '/mo'} highlight />
            <ResultCard label="Lifetime Impact" value={'-' + fmt(result.lifetimeImpact)} subValue="age 67–85" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Benefit Impact</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Regular SS Benefit</span>
                  <span className="font-bold">{fmt(result.regularBenefit)}/mo</span>
                </div>
                <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">After WEP Reduction</span>
                  <span className="font-bold text-green-600">{fmt(result.reducedBenefit)}/mo</span>
                </div>
                <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(result.reducedBenefit / result.regularBenefit) * 100}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">WEP Monthly Reduction</span><span className="font-bold text-red-500">-{fmt(result.wepReduction)}/mo</span></div>
              <div className="flex justify-between"><span className="text-gray-500">GPO Reduction (spousal)</span><span className="font-bold text-orange-500">-{fmt(result.gpoReduction)}/mo</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Years of Substantial Earnings</span><span className="font-bold">{result.yearsSubstantialEarnings} / 30</span></div>
            </div>
          </Card>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-bold mb-1">💡 How to Reduce WEP Impact</p>
            <p>Each additional year of substantial Social Security earnings (wages above ~$31,275 in 2026) reduces the WEP factor. At 30+ years, WEP is eliminated entirely. Consider this when planning your final working years.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this social security wep calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Without WEP, WEP Reduction, Your SS Benefit, Lifetime Impact to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
            <p>The result is an estimate produced from the calculator&apos;s implemented formula and the values you enter. Review the units, time period, and assumptions before using the output for a decision; a calculated result does not add information that is not represented by the inputs.</p>
            <p>Use the worked output as a planning or comparison aid. Real-world results can differ when taxes, fees, eligibility rules, measurement error, market conditions, or other factors not represented by this calculator apply.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section describes the calculator implementation on this page and does not change its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
