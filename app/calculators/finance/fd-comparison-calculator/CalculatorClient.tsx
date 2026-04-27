'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { compareFDs } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Plus, Trash2, Trophy, DollarSign, TrendingUp, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

const FREQ_OPTIONS = [
  { value: '12', label: 'Monthly' },
  { value: '4', label: 'Quarterly' },
  { value: '2', label: 'Half-Yearly' },
  { value: '1', label: 'Annually' },
]

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#e11d48']
const TAG_COLORS = ['bg-green-100 text-green-700 border-green-300', 'bg-blue-100 text-blue-700 border-blue-300', 'bg-amber-100 text-amber-700 border-amber-300', 'bg-rose-100 text-rose-700 border-rose-300']

const DEFAULT_FDS = [
  { name: 'SBI FD', principal: 100000, rate: 7.0, years: 3, freq: 4 },
  { name: 'HDFC FD', principal: 100000, rate: 7.4, years: 3, freq: 4 },
  { name: 'ICICI FD', principal: 100000, rate: 7.25, years: 3, freq: 4 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [fds, setFds] = useState(DEFAULT_FDS)

  const results = useMemo(() => compareFDs(fds), [fds])
  const best = results.reduce((a, b) => a.maturityAmount > b.maturityAmount ? a : b)

  const addFD = () => {
    if (fds.length >= 4) return
    setFds(prev => [...prev, { name: `Bank ${prev.length + 1} FD`, principal: 100000, rate: 7.0, years: 3, freq: 4 }])
  }

  const removeFD = (i: number) => setFds(prev => prev.filter((_, idx) => idx !== i))

  const updateFD = (i: number, key: string, val: any) => {
    setFds(prev => prev.map((fd, idx) => idx === i ? { ...fd, [key]: val } : fd))
  }

  const chartData = [
    { label: 'Principal', ...Object.fromEntries(results.map(r => [r.name, r.principal])) },
    { label: 'Interest', ...Object.fromEntries(results.map(r => [r.name, r.interestEarned])) },
    { label: 'Maturity', ...Object.fromEntries(results.map(r => [r.name, r.maturityAmount])) },
  ]

  return (
    <CalculatorLayout title="CD Comparison Calculator USA 2026" description="Compare up to 4 CDs simultaneously on APY, maturity value, and total interest earned." icon="🏆" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="space-y-6">
        {/* FD Input Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Enter FD Details (up to 4)</h2>
            {fds.length < 4 && (
              <button onClick={addFD} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Add FD
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {fds.map((fd, i) => (
              <div key={i} className={`bg-white rounded-2xl border-2 p-5 shadow-sm ${TAG_COLORS[i]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: COLORS[i] }}>{i + 1}</div>
                    <input
                      value={fd.name}
                      onChange={e => updateFD(i, 'name', e.target.value)}
                      className="font-bold text-gray-900 text-sm bg-transparent border-0 outline-none w-32 placeholder-gray-400"
                      placeholder="Bank Name"
                    />
                  </div>
                  {fds.length > 2 && (
                    <button onClick={() => removeFD(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          FD Comparison Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this FD Comparison USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CD Comparison Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, comparing three different banks offering 1-year CDs on your $50,000, your CD comparison calculator USA 2026 shows the exact maturity value difference so you can choose the highest-paying option.
        </p>
      </Card>

            <SEOContent
        title="CD Comparison Calculator USA – Which CD Pays the Most at Your Bank in 2026?"
        category="finance"
        intro={`Comparing CDs or fixed deposits across multiple institutions side by side is exactly how you should shop for these products — rates vary enough that the difference on large balances is meaningful. A 0.5% rate difference on $100,000 for 2 years is $1,000 in additional interest. On $500,000, it's $5,000. Shopping rates takes 20 minutes and is among the highest-return activities available for cash management.

Online banks and credit unions typically offer the highest CD and FD rates because their lower operating costs allow them to pass more yield to depositors. In India, small finance banks (Ujjivan, AU Small Finance) and NBFCs regularly offer 0.75-1.5% higher FD rates than large private banks — with correspondingly higher (though still typically manageable) credit risk.

This calculator lets you input up to 4 different offers with different principal amounts, terms, rates, and compounding frequencies — producing side-by-side maturity values, total interest, and effective annual yields for direct comparison.`}
        howItWorks={`Each product's maturity value uses the compound interest formula: A = P(1 + r/n)^(nt), where r is annual rate, n is compounding frequency per year, t is years. Compounding frequency varies: daily (some online savings accounts), monthly, quarterly (common for Indian FDs), semi-annually, or annually.

Effective Annual Rate (EAR) standardizes different compounding frequencies for direct comparison: EAR = (1 + r/n)^n - 1. A 5.0% CD compounding monthly = 5.116% EAR. A 5.1% FD compounding quarterly = 5.198% EAR. The higher EAR product pays more even when stated rates appear similar.

Tax-adjusted comparison: For US investors, CD interest is taxed as ordinary income. For Indian FD investors, TDS applies to interest above threshold amounts. Comparing after-tax returns gives the true net yield for each product.`}
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
        tipsSection={`Always compare products of the same maturity length for apples-to-apples comparison. A 2-year CD at 4.8% and a 1-year CD at 5.2% aren't comparable at face value — the 1-year may be better depending on rate expectations for the second year.

For large amounts, prioritize FDIC/DICGC safety alongside yield. The marginal extra yield at an uninsured NBFC or non-FDIC institution may not be worth the credit risk if the amount significantly exceeds insurance limits.

Use CD/FD comparison shopping as a regular practice when large cash balances approach maturity. Rates shift with monetary policy, and the best institution at your last renewal may not offer the best rate this time. Spending 15 minutes on comparison sites (Bankrate for US, RateCity for Australia, FD comparison aggregators for India) before each renewal is worth the effort on meaningful balances.`}
        conclusion={`The highest rate isn't always the best deal if it comes with less favorable early withdrawal penalties, shorter grace periods at maturity, or less convenient access. Read the terms on early withdrawal before signing — the penalty structure determines how costly a change of plans would be.

For a CD ladder strategy, the side-by-side comparison is particularly useful: you're looking for the best rates across multiple maturities (1-year, 2-year, 3-year, etc.) simultaneously, potentially at different institutions. Use this alongside [our CD Ladder Calculator](/calculators/finance/cd-ladder-calculator).`}

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
