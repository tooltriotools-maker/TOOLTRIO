'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { rothConversionSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
function calcFutureTaxes(balance: number, growthRate: number, years: number, taxRate: number) {
  const futureValue = balance * Math.pow(1 + growthRate / 100, years)
  return { futureValue: Math.round(futureValue), taxOwed: Math.round(futureValue * taxRate / 100), afterTax: Math.round(futureValue * (1 - taxRate / 100)) }
}

export default function RothConversionCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { fmt, fmtCompact } = useCurrency()

  const [conversionAmount, setConversion] = useState(20000)
  const [currentBalance, setBalance]      = useState(150000)
  const [currentAge, setCurrentAge]       = useState(45)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentRate, setCurrentRate]     = useState(22)
  const [retirementRate, setRetirementRate] = useState(24)
  const [growthRate, setGrowthRate]       = useState(7)

  const years = retirementAge - currentAge
  const conversionTax = Math.round(conversionAmount * currentRate / 100)

  // Traditional: no tax now, pay retirementRate on withdrawal
  const traditionalResult = useMemo(() => calcFutureTaxes(currentBalance, growthRate, years, retirementRate), [currentBalance, growthRate, years, retirementRate])

  // Roth: pay currentRate on conversion, tax-free growth
  const rothAfterConversion = currentBalance - conversionAmount
  const rothConverted       = conversionAmount // already paid tax
  const rothResult = useMemo(() => {
    const traditionalPart = calcFutureTaxes(rothAfterConversion, growthRate, years, retirementRate)
    const rothPart        = calcFutureTaxes(rothConverted, growthRate, years, 0)
    return {
      futureValue:   traditionalPart.futureValue + rothPart.futureValue,
      taxOwed:       traditionalPart.taxOwed,
      afterTax:      traditionalPart.afterTax + rothPart.futureValue,
      conversionTax,
    }
  }, [rothAfterConversion, rothConverted, growthRate, years, retirementRate, conversionTax])

  const netBenefit     = rothResult.afterTax - (traditionalResult.afterTax - conversionTax)
  const isRothBetter   = netBenefit > 0
  const breakEvenYears = Math.ceil(conversionTax / ((rothResult.afterTax - traditionalResult.afterTax) / years + 0.001))

  const chartData = Array.from({ length: Math.min(years, 30) }, (_, i) => {
    const y = i + 1
    const trad = calcFutureTaxes(currentBalance, growthRate, y, retirementRate)
    const roth = {
      afterTax: calcFutureTaxes(rothAfterConversion, growthRate, y, retirementRate).afterTax +
                calcFutureTaxes(rothConverted, growthRate, y, 0).futureValue - conversionTax
    }
    return { year: `Y${y}`, traditional: trad.afterTax, roth: Math.max(0, roth.afterTax) }
  }).filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0)

  return (
    <CalculatorLayout title="Roth Conversion Calculator USA 2026" description="Calculate the tax cost of converting Traditional IRA to Roth and the long-term wealth benefit." icon="🔄" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="roth-conversion-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Conversion Details</h2>
          <div className="space-y-5">
            <InputField label="Current IRA Balance ($)" value={currentBalance} onChange={setBalance} min={1000} max={5000000} step={5000} prefix="$" />
            <InputField label="Conversion Amount ($)" value={conversionAmount} onChange={setConversion} min={1000} max={currentBalance} step={1000} prefix="$" />
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={70} step={1} suffix="yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={80} step={1} suffix="yrs" />
            <InputField label="Current Tax Rate (%)" value={currentRate} onChange={setCurrentRate} min={10} max={37} step={1} suffix="%" />
            <InputField label="Expected Retirement Rate (%)" value={retirementRate} onChange={setRetirementRate} min={10} max={37} step={1} suffix="%" />
            <InputField label="Expected Annual Return (%)" value={growthRate} onChange={setGrowthRate} min={1} max={15} step={0.5} suffix="%" />
          </div>
          <div className={`mt-5 p-4 rounded-xl border ${isRothBetter ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
            <p className={`text-sm font-black mb-1 ${isRothBetter ? 'text-green-600' : 'text-amber-600'}`}>
              {isRothBetter ? 'v Roth Conversion Wins' : '⚠️ Keep Traditional'}
            </p>
            <p className="text-xs text-gray-500">
              {isRothBetter
                ? `Converting now saves ${fmt(Math.abs(netBenefit))} after-tax at retirement.`
                : `Keeping traditional saves ${fmt(Math.abs(netBenefit))} more after-tax at retirement.`}
            </p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Tax to Convert" value={fmt(conversionTax)} subValue={`${currentRate}% rate`} highlight />
            <ResultCard label="Traditional After-Tax" value={fmtCompact(traditionalResult.afterTax)} subValue="At retirement" />
            <ResultCard label="Roth After-Tax" value={fmtCompact(rothResult.afterTax)} subValue="At retirement" />
            <ResultCard label={isRothBetter ? 'Roth Advantage' : 'Traditional Advantage'} value={fmtCompact(Math.abs(netBenefit))} subValue="Net benefit" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">At Retirement Comparison</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Conversion tax now', fmt(conversionTax)],
                  ['Traditional future value', fmtCompact(traditionalResult.futureValue)],
                  ['Traditional taxes at withdrawal', fmt(traditionalResult.taxOwed)],
                  ['Traditional after-tax', fmtCompact(traditionalResult.afterTax)],
                  ['Roth future value', fmtCompact(rothResult.futureValue)],
                  ['Roth tax at withdrawal', fmt(rothResult.taxOwed)],
                  ['Roth after-tax', fmtCompact(rothResult.afterTax)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1 last:border-0">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Rule of Thumb</h3>
              <p className="text-xs text-gray-500 mb-4">Convert if retirement tax rate {'>'}= current rate</p>
              <div className="space-y-3">
                {[
                  { scenario: 'Current lower rate', current: 22, retire: 24, result: 'Convert v' },
                  { scenario: 'Same rates', current: 22, retire: 22, result: 'Neutral' },
                  { scenario: 'Current higher rate', current: 32, retire: 22, result: 'Keep traditional' },
                  { scenario: 'Young, low income', current: 12, retire: 22, result: 'Strongly convert v' },
                ].map(s => (
                  <div key={s.scenario} className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50">
                    <span className="text-gray-500">{s.scenario}</span>
                    <span className="text-gray-500">{s.current}% -{'>'} {s.retire}%</span>
                    <span className={`font-bold ${s.result.includes('v') ? 'text-green-600' : s.result === 'Neutral' ? 'text-yellow-400' : 'text-red-500'}`}>{s.result}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">After-Tax Balance Over Time: Traditional vs Roth</h3>
            <ChartWrapper height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="traditional" name="Traditional (after tax)" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="roth" name="Roth (tax-free)" fill="#16a34a" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>
        </div>
      </div>
      <div className="mt-8">

        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "HSA Calculator", href: "/calculators/finance/hsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Roth Conversion Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Contributing $7,000/year to a Roth IRA starting at age 25 at 7% return can grow to over <strong>$1.4M</strong> by age 65 — completely tax-free.
        </p>
        <p className="text-sm text-gray-600">
          This Roth Conversion USA 2026 calculator helps you compare Roth vs Traditional IRA tax advantages and project your retirement balance.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Roth Conversion Calculator USA 2026 – Calculate Whether Conversion Makes Sense</h2>
        <p className="text-sm text-gray-600">Roth conversions are most powerful during low-income years. This Roth conversion calculator USA 2026 shows the tax cost, break-even age, and long-term wealth benefit of any conversion amount.</p>
      </Card>

        <SEOContent {...rothConversionSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
