'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { calculateRetirement } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { retirementRichSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [monthlyExpense, setMonthlyExpense] = useState(d.monthlyExpense)
  const [currentSavings, setCurrentSavings] = useState(d.mediumAmount)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [inflation, setInflation] = useState(4)

  const result = useMemo(() => calculateRetirement(currentAge, retireAge, monthlyExpense, currentSavings, expectedReturn, inflation), [currentAge, retireAge, monthlyExpense, currentSavings, expectedReturn, inflation])

  const yearsToRetire = retireAge - currentAge
  const progressPct = Math.min(100, Math.round((result.currentSavingsGrown / result.corpusRequired) * 100))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Retirement Calculator USA 2026" description={`Plan your retirement corpus in ${currency.name}. Calculate exactly how much you need and how much to save monthly.`} icon="🌅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} suffix="yr" showSlider={false} />
              <InputField label="Retire At" value={retireAge} onChange={setRetireAge} min={45} max={75} step={1} suffix="yr" showSlider={false} />
            </div>
            <div className="p-3 rounded-xl bg-green-100 border border-green-200 text-center">
              <span className="text-2xl font-bold text-green-700">{yearsToRetire}</span>
              <span className="text-gray-500 text-sm ml-2">years to retirement</span>
            </div>
            <InputField label={`Monthly Expenses (${currency.symbol})`} value={monthlyExpense} onChange={setMonthlyExpense}
              min={currency.code === 'INR' ? 5000 : 500} max={currency.code === 'INR' ? 500000 : 50000}
              step={currency.code === 'INR' ? 5000 : 500} prefix={currency.symbol} />
            <InputField label={`Current Savings (${currency.symbol})`} value={currentSavings} onChange={setCurrentSavings}
              min={0} max={currency.code === 'INR' ? 50000000 : 5000000}
              step={currency.code === 'INR' ? 10000 : 1000} prefix={currency.symbol} />
            <InputField label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} min={4} max={20} step={0.5} suffix="%" />
            <InputField label="Inflation Rate" value={inflation} onChange={setInflation} min={1} max={12} step={0.5} suffix="%" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Corpus Required" value={fmtCompact(result.corpusRequired)} subValue={`At age ${retireAge}`} highlight />
            <ResultCard label="Monthly SIP Needed" value={fmt(result.monthlySIPRequired)} subValue={`For ${yearsToRetire} years`} />
            <ResultCard label="Current Savings at Retirement" value={fmtCompact(result.currentSavingsGrown)} />
            <ResultCard label="Additional Corpus Needed" value={fmtCompact(result.additionalRequired)} />
          </div>

          {/* Progress bar */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Retirement Readiness</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Current savings cover</span>
              <span className="text-lg font-bold font-display" style={{ color: progressPct >= 80 ? '#22c55e' : progressPct >= 40 ? '#f59e0b' : '#ef4444' }}>{progressPct}%</span>
            </div>
            <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: progressPct >= 80 ? 'linear-gradient(90deg,#22c55e,#86efac)' : progressPct >= 40 ? 'linear-gradient(90deg,#f59e0b,#fde68a)' : 'linear-gradient(90deg,#ef4444,#fca5a5)' }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {progressPct < 100 ? `You need ${fmtCompact(result.additionalRequired)} more to fully fund retirement. Start a SIP of ${fmt(result.monthlySIPRequired)}/month.` : `Great! Your savings are on track for retirement. Keep growing!`}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Wealth Projection to Retirement</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Age', fill: '#475569', fontSize: 11, position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Age ${y}`} />
                  <Area type="monotone" dataKey="total" name="Projected Wealth" stroke="#14b8a6" fill="url(#retGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Retirement Calculator - Plan Your Financial Freedom with Confidence USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Much Do You Need to Retire Comfortably?</h3>
              <p>The amount you need to retire depends on your expected monthly expenses, retirement age, life expectancy, and inflation. A widely used rule is the 25x Rule: multiply your annual expenses by 25 to get your retirement corpus. This is based on the 4% Safe Withdrawal Rate (SWR) - research shows you can withdraw 4% of your corpus annually without running out of money over 30 years. For India, given higher inflation (6-7% vs 2-3% in the US), many financial planners recommend the 30-33x Rule, implying a 3-3.3% withdrawal rate. Example: If you need $60,000/month ($7.2L/year), your retirement corpus should be $1.8-2.4 millions at a minimum, inflation-adjusted to retirement date.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Retirement Planning by Age - What You Should Have Saved</h3>
              <p>Rough benchmarks for retirement savings (as multiple of annual salary): Age 30: 1x salary saved. Age 35: 2x salary. Age 40: 3x salary. Age 45: 4-5x salary. Age 50: 6x salary. Age 55: 7-8x salary. Age 60 (retirement): 10-12x annual expenses as corpus. If you're behind these benchmarks, focus on: increasing income, reducing discretionary spending, maximizing tax-advantaged accounts (tax-advantaged mutual fund, 401(k) pension, Roth IRA), and delaying retirement even by 2-3 years (which dramatically improves your corpus).</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Inflation - The Silent Enemy of Retirement</h3>
              <p>Inflation is the biggest risk in retirement planning. At 6% inflation, $50,000/month today will need $90,305/month in 10 years, $1.62 thousands in 20 years, and $2.93 thousands in 30 years. Many retirees make the mistake of planning for today\'s expenses without accounting for this. Our retirement calculator factors in both pre-retirement inflation (adjusting your future expense need) and post-retirement investment returns to give you an accurate required corpus. The investment allocation at retirement matters too: keeping 40-50% in equity at retirement helps the corpus grow and outpace inflation.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">401(k) pension vs 401(k) vs Roth IRA - Best Retirement Instruments in the US</h3>
              <p>India offers three main government-backed retirement instruments. 401(k) (Employee 401(k)): Mandatory for salaried employees, 12% employee + 12% employer contribution, ~8.25% interest rate, most liquid at retirement. Roth IRA (Public 401(k)): Voluntary, max $1.5L/year, 7.1% guaranteed, 15-year lock-in, fully tax-free (EEE). 401(k) pension (National Pension System): Market-linked returns (10-14% for equity allocation), additional $50K tax deduction under 80CCD(1B), compulsory annuity for 40%. Best retirement strategy: Max 401(k) contributions + Roth IRA contributions + 401(k) pension for additional tax savings + equity mutual funds for additional wealth creation.</p>
            </div>
          </div>
        </Card>
      </div>

      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Retirement Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Saving $1,500/month at 7% annual return for 30 years can grow to over <strong>$1.8M</strong> in retirement.
        </p>
        <p className="text-sm text-gray-600">
          With Social Security and a 4% withdrawal rate, this Retirement USA 2026 estimate can cover $90,000+ per year in retirement income.
        </p>
      </Card>
      <SEOContent {...retirementRichSEOContent} category="finance" />
    
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "FIRE Calculator", href: "/calculators/finance/fire-calculator", icon: "🔥", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />
        <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
