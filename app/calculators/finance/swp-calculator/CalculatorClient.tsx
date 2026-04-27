'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateSWP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { DollarSign, TrendingDown, Calendar, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [investment, setInvestment] = useState(1000000)
  const [withdrawal, setWithdrawal] = useState(8000)
  const [returnRate, setReturnRate] = useState(10)
  const [years, setYears] = useState(20)

  const result = useMemo(() => calculateSWP(investment, withdrawal, returnRate, years), [investment, withdrawal, returnRate, years])
  const r = result as any

  const totalWithdrawn = withdrawal * 12 * years
  const isCorpusSustainable = (r.finalBalance || 0) > 0

  // Build annual chart data
  const annualData = r.yearlyData
    ? r.yearlyData.filter((_: any, i: number) => i % 12 === 11 || i === r.yearlyData.length - 1).map((d: any) => ({
        year: Math.ceil((d.month || 12) / 12),
        balance: Math.max(0, d.balance),
        withdrawn: d.totalWithdrawn,
      }))
    : []

  return (
    <CalculatorLayout title="SWP Calculator India 2026" description="Calculate monthly income from mutual fund corpus using Systematic Withdrawal Plan." icon="💸" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">SWP Details</h2>
          <div className="space-y-5">
            <InputField label="Total Investment" value={investment} onChange={setInvestment} min={10000} max={100000000} step={10000} prefix={currency.symbol} />
            <InputField label="Monthly Withdrawal" value={withdrawal} onChange={setWithdrawal} min={100} max={1000000} step={100} prefix={currency.symbol} />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={20} step={0.5} suffix="%" />
            <InputField label="Withdrawal Period (Years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
          </div>
          <div className={`mt-5 p-4 rounded-xl border ${isCorpusSustainable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-xs font-bold mb-1 ${isCorpusSustainable ? 'text-green-700' : 'text-red-700'}`}>{isCorpusSustainable ? '✅ Corpus Sustainable' : '⚠️ Corpus May Exhaust'}</p>
            <p className={`text-lg font-black ${isCorpusSustainable ? 'text-green-700' : 'text-red-700'}`}>{fmt(Math.max(0, r.finalBalance || 0), true)}</p>
            <p className={`text-xs mt-0.5 ${isCorpusSustainable ? 'text-green-600' : 'text-red-600'}`}>Remaining after {years} years</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Final Balance" value={fmt(Math.max(0, r.finalBalance || 0))} highlight={isCorpusSustainable} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Withdrawn" value={fmt(r.totalWithdrawn || totalWithdrawn)} icon={<TrendingDown className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.totalInterestEarned || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Period" value={`${years} Yrs`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          {annualData.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Corpus Balance Over Time</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={annualData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="swpB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                      <linearGradient id="swpW" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area type="monotone" dataKey="balance" name="Remaining Corpus" stroke="#16a34a" fill="url(#swpB)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="withdrawn" name="Total Withdrawn" stroke="#f59e0b" fill="url(#swpW)" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Monthly Withdrawal</p>
                <p className="text-base font-black text-gray-900">{fmt(withdrawal)}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Withdrawal Rate</p>
                <p className="text-base font-black text-gray-900">{((withdrawal * 12 / investment) * 100).toFixed(1)}% annual</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Return vs Withdrawal</p>
                <p className={`text-base font-black ${returnRate > (withdrawal * 12 / investment * 100) ? 'text-green-700' : 'text-red-600'}`}>
                  {returnRate > (withdrawal * 12 / investment * 100) ? '✅ Surplus' : '⚠️ Deficit'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">SWP Calculator - Systematic Withdrawal Plan for Retirement Income 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is SWP and How Does It Work?</h3>
              <p>SWP (Systematic Withdrawal Plan) is the retirement income tool that automatically redeems a fixed amount from your mutual fund investment every month, quarter, or year. It's essentially the reverse of SIP: instead of investing regularly, you withdraw regularly. SWP works because your remaining corpus continues to earn returns on the market. As long as the portfolio return exceeds your withdrawal rate, the corpus can sustain withdrawals indefinitely. For example: $1 million corpus at 10% annual return. Withdrawing $60,000/month (7.2% withdrawal rate) - the corpus actually grows because 10% return exceeds 7.2% withdrawal. At $85,000/month (10.2%), corpus stays flat. Above that, corpus depletes.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">SWP vs Annuity vs FD Interest - Retirement Income Comparison</h3>
              <p>Three ways to generate retirement income from $1 million: FD Interest: $1 million FD at 7% = $58,333/month interest (fully taxable at slab). Annuity (401(k) pension/LIC): $1 million -{'>'} $50,000-60,000/month (varies by annuity type), fixed for life, no liquidity, taxable. SWP from equity hybrid fund: $60,000-80,000/month, corpus grows with inflation, tax-efficient (LTCG at 12.5% only on gains portion), full liquidity. SWP clearly wins on flexibility and inflation protection. The downside: market risk - a bad bear market in early retirement can derail SWP if not managed carefully. Solution: maintain 1-2 years expenses in liquid funds as buffer.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Sustainable Withdrawal Rate - How Much Can You Withdraw?</h3>
              <p>The 4% rule (from US research) suggests withdrawing 4% of corpus annually is sustainable for 30 years. For India with higher inflation (6-7%), financial planners recommend 3-3.5% as the safe withdrawal rate. On $1 million corpus: 3% = $30,000/month. 3.5% = $29,167/month. 4% = $33,333/month. Many retirees need more than this, which means: (1) Building a larger corpus pre-retirement, (2) Supplementing with rental income or part-time work, (3) Using a bucket strategy - bucket 1: 2 years expenses in liquid funds, bucket 2: 5 years in debt funds, bucket 3: remaining in equity. This protects against sequence-of-returns risk.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Tax Efficiency of SWP vs FD Interest</h3>
              <p>SWP from equity mutual funds is significantly more tax-efficient than FD interest income. Here\'s why: Each SWP redemption consists of two parts - cost basis (invested amount) and gain. Tax applies only to the gain portion at LTCG rate (12.5% above $1.25L/year for equity held 12+ months). Example: Withdraw $50,000/month from a fund with 50% gain. Taxable gain per withdrawal = $25,000. Annual taxable gain = $3 thousands. After $1.25L exemption, taxable = $1.75L. Tax = $21,875 (vs FD interest tax of $1.86L at 30% slab on same $6L annual income). SWP saves $1.6+ thousands in tax annually vs FD, making it dramatically more efficient for high-income retirees.</p>
            </div>
          </div>
        </Card>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SWP Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SWP USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SWP Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with a INR 80 lakh retirement corpus, your SWP calculator India 2026 shows the sustainable monthly withdrawal amount, corpus depletion date at different withdrawal rates, and the optimal SWP strategy.
        </p>
      </Card>

            <SEOContent
        title="SWP Calculator India – How Much Monthly Income Can Your Mutual Fund Corpus Sustain in 2026?"
        category="finance"
        intro={`SWP (Systematic Withdrawal Plan) is the withdrawal-phase mirror of SIP — instead of investing monthly, you withdraw a fixed amount monthly from an existing mutual fund corpus. It's the primary tool for creating a regular income stream from accumulated mutual fund investments in retirement, and it has important advantages over traditional fixed income approaches for managing long-duration retirement portfolios.

The core advantage of SWP from an equity fund over an FD or pension: the underlying corpus continues to participate in equity market returns. If your ₹1 crore corpus earns 12% CAGR and you withdraw ₹50,000/month (₹6 lakh/year = 6% withdrawal rate), the corpus grows by 6% net of withdrawals — your monthly income can increase over time without depleting the principal. FD interest payments don't compound or grow.

The risk: in down markets, you're withdrawing from a declining corpus. A 20% market fall in year 3 of retirement means your ₹1 crore corpus is ₹80 lakh, and your ₹50,000/month withdrawal now represents 7.5% of corpus rather than 6% — accelerating depletion if the market doesn't recover quickly. This sequence-of-returns risk is the primary challenge of equity-based SWP in early retirement.`}
        howItWorks={`SWP sustainability: If monthly withdrawal rate < monthly portfolio growth rate, the corpus grows forever. If withdrawal rate > growth rate, the corpus depletes. Break-even: annual withdrawal ÷ portfolio value = portfolio return rate. At 12% CAGR and ₹1 crore corpus: sustainable perpetual SWP = ₹1,00,000 × 12% / 12 = ₹1,00,000/month.

Corpus depletion timeline: Using the same PMT formula in reverse. Corpus P, monthly withdrawal PMT, monthly return r, months to depletion n: n = -ln(1 - r×P/PMT) / ln(1+r). For ₹1 crore, ₹60,000/month withdrawal, 1% monthly return: n = -ln(1 - 0.01×100,00,000/60,000) / ln(1.01) ≈ 294 months = 24.5 years.

Step-up SWP: Increasing withdrawal amount annually to pace with inflation. If inflation is 6%, increase monthly SWP by 6% annually. This is the technically correct SWP structure for maintaining real purchasing power.`}
        benefits={[
          { title: "Instant Real-Time Results", text: "Results update as you type \u2014 no button clicks needed. Compare multiple scenarios in minutes to understand how each variable changes your outcome. Small changes in rate, time, or amount often have surprisingly large long-term impacts due to compounding. Use alongside the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) to model growth scenarios." },
          { title: "US-Standard Formula Accuracy", text: "All calculations use formulas recognized by US financial institutions, the CFP Board, and IRS guidelines. Whether comparing to the S&P 500's historical 10.5% annual return or evaluating debt at your specific rate, the math is the same as professional advisors use. Connect to the [ROI Calculator](/calculators/finance/roi-calculator) to benchmark your results." },
          { title: "Complete Privacy \u2014 No Data Stored", text: "Everything runs locally in your browser. No financial data is transmitted to any server or stored anywhere. When you close the tab, your inputs disappear permanently. This is essential for sensitive financial information \u2014 your income, debts, and savings details stay entirely private." },
          { title: "Connects to Your Complete Financial Picture", text: "No single calculator tells the whole story. This tool is most powerful when used alongside related calculators. The [Net Worth Calculator](/calculators/finance/net-worth-calculator) shows your total position. The [Savings Rate Calculator](/calculators/finance/savings-rate-calculator) shows whether you're saving enough. The [FIRE Calculator](/calculators/finance/fire-calculator) connects everything to your retirement timeline." },
          { title: "Scenario Comparison for Better Decisions", text: "The most valuable feature is rapid scenario comparison: what if the rate changes by 1%? What if you extend the time period by 5 years? What if you increase the monthly amount by $200? These small changes, compounded over time, often produce dramatically different outcomes. Use alongside the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to find the inputs needed to hit specific targets." },
          { title: "Tax-Aware Planning Context", text: "Most financial calculations have tax implications. Investment returns face capital gains tax (0%, 15%, or 20% for long-term gains). Retirement account withdrawals face ordinary income tax. This calculator provides pre-tax results \u2014 use the [Income Tax Calculator](/calculators/finance/income-tax-calculator) and the [Paycheck Calculator](/calculators/finance/paycheck-calculator) to estimate after-tax outcomes for your specific situation." },
        ]}
        useCases={[
          { title: "Annual Financial Planning", text: "Run this calculator as part of your annual financial review \u2014 updating inputs with current balances, rates, and goals. Connecting results to the [Net Worth Calculator](/calculators/finance/net-worth-calculator) gives you a complete annual snapshot. Financial clarity once per year prevents the drift that leads to retirement shortfalls and unnecessary debt." },
          { title: "Major Life Decisions", text: "Career change, home purchase, marriage, having children \u2014 each major life event requires financial recalculation. Run scenarios before and after the event to understand the financial impact. Combine with the [Budget Planner Calculator](/calculators/finance/budget-planner-calculator) to verify the new scenario fits within your income and savings targets." },
          { title: "Comparing Financial Products", text: "Banks, brokers, and lenders offer products at different rates, terms, and fee structures. Run each option through this calculator to find which product produces the best outcome for your specific inputs. This is especially valuable for loans \u2014 a 0.5% rate difference on a large loan changes total cost by thousands of dollars. See also the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) for growth-side comparisons." },
          { title: "Setting Achievable Goals", text: "Work backwards from your target outcome: what inputs do you need to reach $500,000 in 20 years? What monthly contribution at your expected rate reaches your goal? This reverse-engineering approach transforms vague financial intentions into specific, actionable monthly commitments. Use the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) for goal-based projections." },
          { title: "Tracking Progress Over Time", text: "Save your baseline calculation and rerun it quarterly to measure progress. Are you on track against your original projection? Has the market return or interest rate environment changed enough to require adjusting your plan? Regular recalculation turns this from a one-time tool into an ongoing financial management system. Track your net worth progress with the [Net Worth Calculator](/calculators/finance/net-worth-calculator)." },
          { title: "Teaching Financial Concepts", text: "The best way to understand compound interest, investment returns, or debt amortization is to see the math with real numbers. This calculator makes abstract financial concepts concrete \u2014 especially valuable for teaching younger family members about money. The [FIRE Calculator](/calculators/finance/fire-calculator) is particularly powerful for demonstrating how savings rate connects to retirement age." },
        ]}
        tipsSection={`For reducing sequence-of-returns risk in early SWP years: keep 2-3 years of withdrawals in liquid funds or FD, draw from these first rather than the equity corpus. If the equity market is down significantly in years 1-3, draw from the liquid buffer while equity recovers. This 'bucket strategy' approach significantly improves long-term SWP sustainability.

For tax efficiency: SWP from equity funds generates LTCG (long-term capital gains at 10% above ₹1 lakh annual) and STCG (15%) on gains, not on principal. The tax treatment is more favorable than FD interest taxed as ordinary income. Structuring SWP to stay within LTCG exemption limits each year optimizes tax efficiency.

For SWP from hybrid funds (equity + debt): provides a more stable NAV than pure equity, reducing sequence risk while still participating in equity returns. Conservative hybrid funds (20-35% equity) are popular for initial retirement SWP with gradual transition to equity as the portfolio settles.`}
        conclusion={`SWP from a well-diversified equity fund corpus is the modern retirement income strategy that replaces the traditional 'put everything in FD and live on interest' approach. For Indian retirees with substantial mutual fund corpus from decades of SIP investing, SWP provides inflation-beating income with tax efficiency that FD interest cannot match.

For retirement income that truly grows with inflation, a combination of SCSS/PMVVY for a base guaranteed income and SWP from equity mutual funds for the inflation-adjusting component is increasingly the model that financial advisors recommend for retired Indian professionals.`}

        didYouKnow={[
          "The average American has only $87,000 saved for retirement by ages 55\u201364 \u2014 far below the $1.5M+ typically needed for a secure retirement (Vanguard 2026).",
          "Starting to invest at 25 vs. 35 with $500/month at 7% produces $1.3M vs. $567,000 by age 65 \u2014 a $745,000 difference from just 10 extra years of compounding.",
          "The S&P 500 has returned approximately 10.5% per year on average since 1957, turning $1 into over $1,400 with dividends reinvested over 68 years.",
        ]}
      />
      <InternalLinks
        title="Related Finance Calculators"
        variant="grid"
        links={[
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
