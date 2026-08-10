'use client'
import { useState, useMemo } from 'react'
import { calculateStockOptionTax } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [optionType, setOptionType] = useState<'iso' | 'nso'>('nso')
  const [grantPrice, setGrantPrice] = useState(10)
  const [currentFMV, setCurrentFMV] = useState(45)
  const [shares, setShares] = useState(1000)
  const [ordinaryTaxRate, setOrdinaryTaxRate] = useState(32)
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState(15)
  const [heldOver1Year, setHeldOver1Year] = useState(true)
  const result = useMemo(() => calculateStockOptionTax(optionType, grantPrice, currentFMV, shares, ordinaryTaxRate, capitalGainsTaxRate, heldOver1Year), [optionType, grantPrice, currentFMV, shares, ordinaryTaxRate, capitalGainsTaxRate, heldOver1Year])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Stock Option Tax Calculator USA 2026 (ISO & NSO)" description="Calculate taxes on ISO and NSO stock options, including AMT exposure and net gain after taxes." icon="💎" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="stock-option-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Option Details</h2>
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Option Type</label>
            <div className="grid grid-cols-2 gap-2">
              {([['nso', 'NSO (Non-Qualified)'], ['iso', 'ISO (Incentive)']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setOptionType(id)} className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${optionType === id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{label}</button>
              ))}
            </div>
          </div>
          {[
            { label: 'Grant/Strike Price', value: grantPrice, set: setGrantPrice, step: 1, prefix: '$' },
            { label: 'Current FMV / Share', value: currentFMV, set: setCurrentFMV, step: 1, prefix: '$' },
            { label: 'Number of Shares', value: shares, set: setShares, step: 100, suffix: 'shares' },
            { label: 'Ordinary Income Tax Rate', value: ordinaryTaxRate, set: setOrdinaryTaxRate, step: 1, suffix: '%' },
            { label: 'Capital Gains Tax Rate', value: capitalGainsTaxRate, set: setCapitalGainsTaxRate, step: 1, suffix: '%' },
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
          {optionType === 'iso' && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-xs font-medium text-gray-600">Held 1+ Year After Exercise?</span>
              <button onClick={() => setHeldOver1Year(!heldOver1Year)} className={`px-3 py-1 rounded-full text-xs font-bold ${heldOver1Year ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{heldOver1Year ? 'Yes' : 'No'}</button>
            </div>
          )}
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Spread" value={fmt(result.spread)} highlight />
            <ResultCard label="Exercise Cost" value={fmt(result.exerciseCost)} subValue="to exercise" />
            <ResultCard label="Total Tax Due" value={fmt(result.totalTax)} subValue={optionType === 'nso' ? 'ordinary + FICA' : 'regular or AMT'} />
            <ResultCard label="Net Gain" value={fmt(result.netGain)} subValue={result.effectiveRate + '% eff. rate'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax Breakdown — {optionType.toUpperCase()}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Spread per Share</span><span className="font-bold">{fmt(currentFMV - grantPrice)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Total Spread ({shares} shares)</span><span className="font-bold">{fmt(result.spread)}</span></div>
              {optionType === 'nso' ? <>
                <div className="flex justify-between text-red-500"><span>Ordinary Income Tax ({ordinaryTaxRate}%)</span><span className="font-semibold">-{fmt(result.ordinaryIncomeTax)}</span></div>
                <div className="flex justify-between text-orange-500"><span>FICA Tax (7.65%)</span><span className="font-semibold">-{fmt('ficaTax' in result ? (result.ficaTax ?? 0) : 0)}</span></div>
              </> : <>
                {'amtExposure' in result && <div className="flex justify-between text-red-500"><span>AMT Exposure (28%)</span><span className="font-semibold">-{fmt((result as any).amtExposure)}</span></div>}
                {heldOver1Year && <div className="flex justify-between text-green-600"><span>LTCG Rate ({capitalGainsTaxRate}%)</span><span className="font-semibold">-{fmt(result.capitalGainsTax)}</span></div>}
              </>}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Tax</span><span className="text-red-600">-{fmt(result.totalTax)}</span>
              </div>
              <div className="flex justify-between font-black text-green-700">
                <span>Net Gain After Tax</span><span>{fmt(result.netGain)}</span>
              </div>
            </div>
          </Card>
          {optionType === 'iso' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-bold mb-1">⚠️ ISO AMT Risk</p>
              <p>Exercising ISOs triggers an AMT preference of {fmt(result.spread)}. If AMT applies, you owe {'amtExposure' in result ? fmt((result as any).amtExposure) : '$0'} — even if you don't sell the shares. Consider exercising in stages to manage AMT exposure.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this stock option tax calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Total Spread, Exercise Cost, Total Tax Due, Net Gain to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
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
