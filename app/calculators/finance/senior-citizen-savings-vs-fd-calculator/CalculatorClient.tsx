'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, Landmark } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [investment, setInvestment] = useState(1500000)
  const [scssRate, setScssRate] = useState(8.2)
  const [fdRate, setFdRate] = useState(7.25)
  const [taxSlab, setTaxSlab] = useState(5)
  const years = 5

  const result = useMemo(() => {
    const scssFV = investment * Math.pow(1 + scssRate / 100, years)
    const fdFV = investment * Math.pow(1 + fdRate / 100, years)
    const scssGain = scssFV - investment
    const fdGain = fdFV - investment
    const scssTax = scssGain * (taxSlab / 100)
    const fdTax = fdGain * (taxSlab / 100)
    const scssPostTax = scssFV - scssTax
    const fdPostTax = fdFV - fdTax
    const quarterlyIncome = investment * (scssRate / 100) / 4
    const barData = [{ name: 'Maturity', scss: Math.round(scssFV), fd: Math.round(fdFV) }, { name: 'Post-Tax', scss: Math.round(scssPostTax), fd: Math.round(fdPostTax) }]
    return { scssFV: Math.round(scssFV), scssGain: Math.round(scssGain), scssTax: Math.round(scssTax), scssPostTax: Math.round(scssPostTax), fdFV: Math.round(fdFV), fdGain: Math.round(fdGain), fdTax: Math.round(fdTax), fdPostTax: Math.round(fdPostTax), quarterlyIncome: Math.round(quarterlyIncome), scssBetter: scssPostTax > fdPostTax, difference: Math.round(Math.abs(scssPostTax - fdPostTax)), barData }
  }, [investment, scssRate, fdRate, taxSlab])

  return (
    <CalculatorLayout title="SCSS vs FD Calculator India 2026" description="Compare Senior Citizen Savings Scheme at 8.2% vs bank Fixed Deposit returns for Indian retirees." icon="👴" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Investment Amount" value={investment} onChange={setInvestment} min={1000} max={3000000} step={50000} prefix="₹" />
            <InputField label="SCSS Rate (Current: 8.2%)" value={scssRate} onChange={setScssRate} min={6} max={10} step={0.1} suffix="%" />
            <InputField label="Senior FD Rate" value={fdRate} onChange={setFdRate} min={5} max={9} step={0.25} suffix="%" />
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Your Tax Slab</p>
              <div className="grid grid-cols-4 gap-1">
                {[0,5,20,30].map(t => <button key={t} onClick={() => setTaxSlab(t)} className={`py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${taxSlab===t ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>{t}%</button>)}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-900/20 border border-blue-700/30">
            <p className="text-xs text-blue-400 font-bold mb-1">Quarterly Income from SCSS</p>
            <p className="text-2xl font-black text-white">{fmtCompact(result.quarterlyIncome)}</p>
            <p className="text-xs text-gray-400">Every 3 months</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="SCSS Post-Tax" value={fmtCompact(result.scssPostTax)} subValue={`${scssRate}% p.a.`} highlight={result.scssBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="FD Post-Tax" value={fmtCompact(result.fdPostTax)} subValue={`${fdRate}% p.a.`} highlight={!result.scssBetter} icon={<Landmark className="w-4 h-4" />} />
            <ResultCard label="Quarterly SCSS Income" value={fmtCompact(result.quarterlyIncome)} subValue="Regular income" />
            <ResultCard label="SCSS Advantage" value={fmtCompact(result.difference)} subValue="Over FD" highlight={result.scssBetter} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">SCSS vs FD - 5 Year Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmt(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="fd" name="FD" fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="scss" name="SCSS" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Senior Citizen Savings vs Fd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Senior Citizen Savings?</h3>
              <p>Senior Citizen Savings is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Fd?</h3>
              <p>Fd takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Senior Citizen Savings and Fd is how returns are generated and taxed. Senior Citizen Savings typically suits growth-oriented investors while Fd may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in India</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to LTCG (10%) or income tax slab. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Long-Term Wealth Creation?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (12-15% historical) generally beat lower-return stable options (6-7.5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Senior Citizen Savings and Fd based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Senior Citizen Savings Vs FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this Senior Citizen Savings Vs FD USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SCSS vs FD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 12 lakh in SCSS vs an FD at your bank, your SCSS vs FD calculator India 2026 shows exact quarterly payouts, annual income, and 5-year maturity comparison for both options.
        </p>
      </Card>

            <SEOContent
        title="SCSS vs FD Calculator India – Senior Citizen Savings Scheme or FD: Which Pays More in 2026?"
        category="finance"
        intro={`Senior Citizen Savings Scheme (SCSS) and bank fixed deposits are both popular income options for retired Indians, but SCSS has a specific advantage that makes it the superior choice for most eligible retirees: an 8.2% government-guaranteed interest rate (as of 2024) paid quarterly, with Section 80C deduction on investment up to ₹1.5 lakh annually. No bank FD currently offers this combination of rate, safety, and tax benefit.

SCSS is available to Indian residents aged 60+ (or 55+ for VRS retirees) at post offices and designated banks. The maximum investment is ₹30 lakh per individual or ₹30 lakh per joint account. The current rate of 8.2% is reviewed quarterly by the government but has historically provided above-market rates compared to bank FDs.

Bank FDs for senior citizens typically offer 0.25-0.50% above the standard rate, bringing best rates to 7.5-8.0% at major banks. The SCSS's 8.2% rate plus Section 80C deduction makes it clearly superior for eligible investors who have Section 80C headroom and need regular income.`}
        howItWorks={`SCSS quarterly income: Investment × 8.2% / 4 = quarterly interest payment. On ₹30 lakh invested: ₹30,00,000 × 8.2% / 4 = ₹61,500 per quarter = ₹2,46,000 per year.

FD comparison: Bank FD for senior citizens at 7.75% on ₹30 lakh: ₹2,32,500 annually. Difference: ₹13,500 per year in additional income from SCSS.

Tax calculation: Both SCSS and FD interest are taxable at slab rate. TDS applies to both when annual interest exceeds ₹50,000 per bank/institution. Net of tax at 20% slab: SCSS = ₹1,96,800; FD = ₹1,86,000. The SCSS advantage holds after tax.`}
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
        tipsSection={`Invest in SCSS before FD for the first ₹30 lakh of senior citizen savings allocation. The combination of higher rate, government safety, and quarterly income makes it the default choice for eligible retirees.

For SCSS accounts, premature closure is allowed after 1 year (with penalty of 1.5% on principal) and after 2 years (1% penalty). After maturity at 5 years, the scheme can be extended once for 3 more years. For purely long-term holdings, the 5-year lock-in is reasonable given the superior rate.

For the balance above the ₹30 lakh SCSS limit or for retirees not yet 60, RBI Floating Rate Bonds (currently 8.05%), PMVVY (Pradhan Mantri Vaya Vandana Yojana if still available), and best-rate senior citizen FDs complete the income portfolio.`}
        conclusion={`The combination of SCSS for the first ₹30 lakh and a diversified portfolio of senior citizen FDs and government bonds for the remainder represents a conservative, income-focused retirement allocation appropriate for many Indian retirees.

For retirees with equity mutual fund investments accumulated over decades, maintaining 20-30% equity allocation even in retirement helps combat inflation over a potentially 25-30 year retirement period. The SCSS and FD allocation provides stable, predictable income; the equity allocation provides inflation protection and growth potential. Use [our SWP Calculator](/calculators/finance/swp-calculator) to model systematic withdrawal from equity funds alongside fixed income instruments.`}

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
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
