'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { wealthSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { wealthByAgeUSA } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function WealthCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 80 : 1

  // Assets
  const [home,           setHome]           = useState(400000 * m)
  const [homeEquity,     setHomeEquity]      = useState(80000 * m)
  const [investments,    setInvestments]    = useState(150000 * m)
  const [retirement,     setRetirement]     = useState(120000 * m)
  const [savings,        setSavings]        = useState(25000 * m)
  const [vehicles,       setVehicles]       = useState(30000 * m)
  const [otherAssets,    setOtherAssets]    = useState(10000 * m)

  // Liabilities
  const [mortgage,       setMortgage]       = useState(320000 * m)
  const [autoLoan,       setAutoLoan]       = useState(18000 * m)
  const [studentLoan,    setStudentLoan]    = useState(35000 * m)
  const [creditCards,    setCreditCards]    = useState(5000 * m)
  const [otherDebt,      setOtherDebt]      = useState(0)

  // Growth projections
  const [annualReturn,   setAnnualReturn]   = useState(7)
  const [projYears,      setProjYears]      = useState(10)
  const [monthlySavings, setMonthlySavings] = useState(1000 * m)

  const totalAssets      = home + investments + retirement + savings + vehicles + otherAssets
  const totalLiabilities = mortgage + autoLoan + studentLoan + creditCards + otherDebt
  const netWorth         = totalAssets - totalLiabilities

  // Project net worth growth
  const projData = useMemo(() => {
    const points = []
    let investAmt = investments + retirement + savings
    let debtAmt   = totalLiabilities
    for (let y = 0; y <= projYears; y++) {
      const grownInvest = investAmt * Math.pow(1 + annualReturn / 100, y) + monthlySavings * 12 * ((Math.pow(1 + annualReturn / 100, y) - 1) / (annualReturn / 100 || 1))
      const debtRemain  = Math.max(0, debtAmt - (debtAmt / projYears) * y)
      const realEstate  = home * Math.pow(1.04, y)
      const projNW      = grownInvest + realEstate + vehicles * Math.pow(0.85, y) - debtRemain
      points.push({ year: `Y${y}`, netWorth: Math.round(projNW), investments: Math.round(grownInvest), debt: Math.round(debtRemain) })
    }
    return points
  }, [investments, retirement, savings, totalLiabilities, home, vehicles, annualReturn, projYears, monthlySavings])

  const assetPie = [
    { name: 'Home', value: home, color: '#16a34a' },
    { name: 'Investments', value: investments, color: '#3b82f6' },
    { name: 'Retirement', value: retirement, color: '#8b5cf6' },
    { name: 'Savings', value: savings, color: '#14b8a6' },
    { name: 'Vehicles', value: vehicles, color: '#f59e0b' },
    { name: 'Other', value: otherAssets, color: '#64748b' },
  ].filter(a => a.value > 0)

  const tickFmt = (v: number) => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`

  const millennialBenchmarks: Record<number, number> = { 25: 9000, 30: 48000, 35: 122000, 40: 236000, 45: 436000, 50: 742000, 55: 1100000 }

  return (
    <CalculatorLayout title="Wealth Calculator USA 2026" description="Calculate your total net worth from all assets and liabilities with US wealth percentile comparison." icon="💎" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="wealth-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Assets</h2>
            <div className="space-y-3">
              {[
                ['Home Value', home, setHome, 5000000],
                ['Investments', investments, setInvestments, 10000000],
                ['Retirement Accounts', retirement, setRetirement, 10000000],
                ['Savings & Cash', savings, setSavings, 2000000],
                ['Vehicles', vehicles, setVehicles, 500000],
                ['Other Assets', otherAssets, setOtherAssets, 2000000],
              ].map(([label, val, setter, max]) => (
                <div key={String(label)}>
                  <label className="text-xs text-gray-500 block mb-0.5">{String(label)}</label>
                  <InputField label="" value={val as number} onChange={setter as (v: number) => void} min={0} max={max as number} step={1000} prefix={currency.symbol} showSlider={false} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4">Liabilities</h2>
            <div className="space-y-3">
              {[
                ['Mortgage Balance', mortgage, setMortgage, 5000000],
                ['Auto Loan', autoLoan, setAutoLoan, 200000],
                ['Student Loans', studentLoan, setStudentLoan, 500000],
                ['Credit Card Debt', creditCards, setCreditCards, 100000],
                ['Other Debt', otherDebt, setOtherDebt, 500000],
              ].map(([label, val, setter, max]) => (
                <div key={String(label)}>
                  <label className="text-xs text-gray-500 block mb-0.5">{String(label)}</label>
                  <InputField label="" value={val as number} onChange={setter as (v: number) => void} min={0} max={max as number} step={500} prefix={currency.symbol} showSlider={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Net Worth" value={fmtCompact(Math.abs(netWorth))} subValue={netWorth >= 0 ? 'Total wealth' : 'Negative NW'} highlight />
            <ResultCard label="Total Assets" value={fmtCompact(totalAssets)} subValue="Everything you own" />
            <ResultCard label="Total Debts" value={fmtCompact(totalLiabilities)} subValue="Everything you owe" />
            <ResultCard label="Asset/Debt Ratio" value={`${totalLiabilities > 0 ? (totalAssets / totalLiabilities).toFixed(1) : 'infinity'}x`} subValue={totalAssets > totalLiabilities ? 'Assets > Debts v' : 'Debts > Assets'} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Asset Breakdown</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={assetPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {assetPie.map((_, i) => <Cell key={i} fill={assetPie[i].color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmtCompact(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                {assetPie.map(a => (
                  <div key={a.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                    <span className="text-gray-500 truncate">{a.name}</span>
                    <span className="font-semibold ml-auto">{Math.round(a.value / totalAssets * 100)}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">US Net Worth Benchmarks</h3>
              <p className="text-xs text-gray-500 mb-3">Median net worth by age (Federal Reserve 2024)</p>
              <div className="space-y-2">
                {Object.entries(millennialBenchmarks).map(([age, nw]) => (
                  <div key={age} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 w-10">Age {age}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, nw / 1100000 * 100)}%` }} />
                    </div>
                    <span className="font-semibold text-gray-900 w-20 text-right">{fmtCompact(nw)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-300 text-xs text-green-700">
                Your NW: <strong>{fmtCompact(netWorth)}</strong>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Net Worth Growth Projection</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div><label className="text-xs text-gray-500 block mb-1">Annual Return</label><InputField label="" value={annualReturn} onChange={setAnnualReturn} min={1} max={15} step={0.5} suffix="%" showSlider={false} /></div>
              <div><label className="text-xs text-gray-500 block mb-1">Years</label><InputField label="" value={projYears} onChange={setProjYears} min={1} max={40} step={1} suffix="yrs" showSlider={false} /></div>
              <div><label className="text-xs text-gray-500 block mb-1">Monthly Add ({currency.symbol})</label><InputField label="" value={monthlySavings} onChange={setMonthlySavings} min={0} max={50000} step={100} prefix={currency.symbol} showSlider={false} /></div>
            </div>
            <ChartWrapper height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(projYears / 5)} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmtCompact(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="netWorth" name="Net Worth" fill="#16a34a" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
            <div className="mt-3 text-center text-sm">
              <span className="text-gray-500">Projected net worth in {projYears} years: </span>
              <span className="text-2xl font-black text-green-600">{fmtCompact(projData[projData.length - 1]?.netWorth ?? 0)}</span>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "FIRE Calculator", href: "/calculators/finance/fire-calculator", icon: "🔥", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="Net Worth by Age in America (Federal Reserve 2024)"
          description="How does your net worth compare to other Americans?"
          headers={['Age Group', 'Median Net Worth', 'Mean Net Worth', 'Top 25% Has', 'Savings Rate Needed']}
          rows={wealthByAgeUSA}
          searchKey="Age Group"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Wealth Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Wealth USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Wealth Calculator USA 2026 – Get Your Complete Net Worth Snapshot</h2>
        <p className="text-sm text-gray-600">Your net worth is the single most important financial number — a snapshot of your entire financial life. This wealth calculator USA 2026 adds up every asset and subtracts every liability to show your true wealth.</p>
      </Card>

        <SEOContent {...wealthSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
      
      
    </CalculatorLayout>
  )
}
