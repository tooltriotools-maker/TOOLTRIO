'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { calculateCompoundInterest } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CompoundCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const [principal, setPrincipal] = useState(currency.defaultValues.mediumAmount)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [freq, setFreq] = useState('12')

  const result = useMemo(() => calculateCompoundInterest(principal, rate, years, Number(freq)), [principal, rate, years, freq])

  // Compare different frequencies
  const freqComparison = [1, 2, 4, 12, 365].map(f => {
    const r = calculateCompoundInterest(principal, rate, years, f)
    return { freq: { 1: 'Annual', 2: 'Semi-Annual', 4: 'Quarterly', 12: 'Monthly', 365: 'Daily' }[f]!, total: r.maturityAmount, interest: r.totalInterest }
  })

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Compound Interest Calculator USA 2026" description={`See the power of compounding in ${currency.name}. Compare daily, monthly, quarterly & annual compounding with interactive charts.`} icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label={`Principal Amount (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 10000000 : 1000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
            <SelectField label="Compounding Frequency" value={freq} onChange={setFreq}
              options={[{ value: '1', label: 'Annually (1x/year)' }, { value: '2', label: 'Semi-Annually (2x/year)' }, { value: '4', label: 'Quarterly (4x/year)' }, { value: '12', label: 'Monthly (12x/year)' }, { value: '365', label: 'Daily (365x/year)' }]}
            />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-green-200">
            <p className="text-xs text-gray-500 mb-2">Effective Annual Rate (EAR)</p>
            <p className="text-2xl font-bold font-display text-green-700">
              {((Math.pow(1 + rate / 100 / Number(freq), Number(freq)) - 1) * 100).toFixed(3)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">vs nominal {rate}% p.a.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Maturity Amount" value={fmtCompact(result.maturityAmount)} subValue={fmt(result.maturityAmount)} highlight />
            <ResultCard label="Principal" value={fmtCompact(result.principal)} />
            <ResultCard label="Interest Earned" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / result.principal) * 100).toFixed(1)}% gain`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Compound Growth Chart</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ciPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="ciTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="invested" name="Principal" stroke="#3b82f6" fill="url(#ciPrincipal)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#14b8a6" fill="url(#ciTotal)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Frequency comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Compounding Frequency Comparison ({years} years)</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={freqComparison} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="freq" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Bar dataKey="interest" name="Interest Earned" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-4">Compound Interest Formula</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
            A = P x (1 + r/n)^(nxt)
            <div className="mt-3 space-y-1 text-xs text-gray-400 font-sans">
              <p>P = {fmt(principal)}, r = {rate}%, n = {freq} (compounding/year), t = {years} years</p>
              <p className="text-white mt-2">→  A = <span className="text-green-700 font-bold">{fmt(result.maturityAmount)}</span></p>
            </div>
          </div>
        </Card>
        
      {/* 600-word SEO section */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Compound Interest Calculator - The Eighth Wonder of Wealth Building USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Compound Interest - How Money Grows Exponentially</h3>
              <p>Compound interest is interest calculated on both the initial principal AND the accumulated interest from previous periods. The formula: A = P x (1 + r/n)^(nxt), where P = principal, r = annual rate (decimal), n = compounding frequency per year, t = years. The critical difference from simple interest: compound interest causes exponential (not linear) growth. With simple interest, $1 thousand grows linearly: $1.7L after 7 years at 10%. With compound interest (annual): $1 thousand grows to $1.95L - $25,000 more. Over 20 years: SI gives $3L; compound gives $6.73L - more than double! The longer the period, the more dramatic the divergence.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Compounding Frequency - The Hidden Return Booster</h3>
              <p>For the same nominal rate, higher compounding frequency produces better returns. At 10% p.a. on $1 thousand for 10 years: Annual compounding: $2,59,374. Half-yearly: $2,65,330. Quarterly: $2,68,506. Monthly: $2,70,704. Daily: $2,71,791. Daily compounding earns $12,417 more than annual compounding - on the same 10%. Over $50 thousands for 20 years, this frequency difference translates to $6-8 thousands extra. Bank FDs in the US compound quarterly. Savings accounts compound daily. Mutual funds effectively compound continuously (mark-to-market daily NAV). When comparing financial products, always account for compounding frequency to make accurate comparisons.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The Rule of 72 - Compound Interest Made Intuitive</h3>
              <p>The Rule of 72 is the fastest way to estimate doubling time: Years to double = 72 / Annual Return Rate. At 6% (savings account): doubles in 12 years. At 8% (FD): doubles in 9 years. At 12% (equity MF): doubles in 6 years. At 18% (small-cap MF): doubles in 4 years. At 24% (credit card interest): your debt doubles in 3 years! This rule has two profound implications: (1) For investors: every percentage point increase in return reduces doubling time significantly. (2) For borrowers: high-interest debt compounds frighteningly fast. The same mathematics working for your investments works against you on credit card debt - which is why paying 36% credit card interest destroys wealth while 12% equity investing creates it.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Compound Interest - Start Age vs Start Amount</h3>
              <p>Starting age matters more than starting amount in compounding. Compare two investors: Riya invests $5,000/month from age 25 to 35 (10 years only), then stops. Total invested: $6 thousands. Rahul invests $5,000/month from age 35 to 60 (25 years). Total invested: $15 thousands. At 60, both earning 12% CAGR: Riya's corpus: $1.81 millions. Rahul\'s corpus: $94.88 thousands. Riya invested $9 thousands less but has $86 thousands MORE - because she started 10 years earlier! Those 10 early years compound for an extra 25 years while Rahul\'s money has less time to grow. This is the most powerful illustration of why 'start now, start small' beats 'start big, start later' in every financial planning scenario.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Compound Interest Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 invested at 7% compounded monthly grows to over <strong>$76,000</strong> in 30 years — without adding another dollar.
        </p>
        <p className="text-sm text-gray-600">
          Use this Compound Interest USA 2026 tool to see how starting earlier or increasing your rate makes an exponential difference.
        </p>
      </Card>
      <SEOContent
        title="Compound Interest Calculator \u2014 The Math Behind Every Investment USA 2026"
        category="finance"
        intro={`Albert Einstein reportedly called compound interest the \"eighth wonder of the world.\" Whether he said it or not, the math is undeniable: $10,000 at 10% for 40 years becomes $452,593. The same $10,000 earning only 7% becomes $149,745. That 3% difference in annual return produces a $302,000 gap \u2014 over 30 times your original investment \u2014 from the same starting amount.\n\nCompound interest works because interest earns interest. In year 1, $10,000 at 10% earns $1,000. In year 2, you earn 10% on $11,000 = $1,100. By year 40, you\'re earning $41,145 in a single year \u2014 4\u00d7 your original investment \u2014 annually. The longer the time horizon, the more dramatic the acceleration.\n\nBefore running scenarios here, understand your full financial context: use the [Net Worth Calculator](/calculators/finance/net-worth-calculator) to see what you\'re starting with, the [Savings Rate Calculator](/calculators/finance/savings-rate-calculator) to know how much you can invest monthly, and the [FIRE Calculator](/calculators/finance/fire-calculator) to connect compound growth to your retirement timeline.`}
        howItWorks={`The compound interest formula: A = P(1 + r/n)^(nt)\n\nWhere: P = principal (initial investment), r = annual interest rate (decimal), n = compounding frequency per year, t = time in years, A = final amount.\n\nFor monthly compounding (n=12) at 7% on $10,000 for 30 years:\nA = 10,000 \u00d7 (1 + 0.07/12)^(12\u00d730) = 10,000 \u00d7 (1.005833)^360 = $81,165\n\nCompare to annual compounding: A = 10,000 \u00d7 (1.07)^30 = $76,123\nMonthly compounding adds $5,042 from the same inputs \u2014 compounding frequency matters.\n\nWith monthly contributions (annuity formula added):\nTotal = P(1+r/n)^(nt) + PMT \u00d7 [((1+r/n)^(nt) \u2212 1) / (r/n)]\n$10,000 principal + $500/month at 7% for 30 years = $81,165 + $567,764 = $648,929\n\nUse the [Investment Calculator](/calculators/finance/roi-calculator) to compare this growth rate against your actual investment returns.`}
        benefits={[
          { title: "Rule of 72 \u2014 Your Mental Shortcut", text: "Divide 72 by your annual return to find doubling time: 72\u00f77% = 10.3 years. 72\u00f710% = 7.2 years. 72\u00f73% (inflation) = 24 years before inflation halves your purchasing power. This is why investment returns must significantly exceed inflation \u2014 at 5% return with 3% inflation, your real doubling time is 72\u00f72% = 36 years, not the nominal 14.4 years." },
          { title: "Monthly Contributions Dwarf Principal", text: "On a 30-year horizon, regular monthly contributions typically grow larger than the initial principal. $10,000 starting principal at 7% for 30 years = $76,123. Adding $300/month changes the outcome to $76,123 + $340,659 = $416,782 \u2014 the monthly contributions create 4.5\u00d7 more wealth than the initial lump sum. Use the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to reverse-engineer the monthly contribution needed for any target." },
          { title: "Compounding Frequency Impact", text: "Daily vs. annual compounding on $100,000 at 5% for 10 years: Annual = $162,889. Monthly = $164,701. Daily = $164,866. The difference is $1,977 \u2014 meaningful but not dramatic. Compounding frequency matters more at higher rates and longer timeframes. What matters infinitely more is your actual contribution rate and investment return \u2014 not whether your account compounds monthly vs. daily." },
          { title: "The Cost of Waiting", text: "The most powerful demonstration of compound interest is the cost of delay. Starting to invest at 25 vs. 35 with $500/month at 7% to age 65: Starting at 25 = $1,311,894. Starting at 35 = $566,764. Waiting 10 years costs $745,130 \u2014 more than you\'ll contribute in those 10 years ($60,000) by 12\u00d7. Each year you delay is compounded for 40 years. Use the [Retirement Calculator](/calculators/finance/retirement-calculator) to see your personal age-adjusted impact." },
          { title: "Inflation Is Negative Compound Interest", text: "At 3% annual inflation, $100,000 today is worth only $74,192 in 10 years and $54,379 in 20 years in purchasing power. This is compound interest working against you. Any investment with a return below 3% is losing real value. At 5% nominal return with 3% inflation: your real CAGR is just 1.94% \u2014 $100,000 becomes only $147,000 in real purchasing power after 20 years, not $265,000 nominally." },
          { title: "Tax-Advantaged Accounts Supercharge Compounding", text: "The S&P 500's 10.5% nominal return becomes 7.35% after 30% taxes in a taxable account. In a Roth IRA: the full 10.5% compounds tax-free. Over 30 years on $100,000: taxable (7.35%) = $819,000. Roth (10.5%) = $1,986,000. The tax-free compounding generates $1,167,000 more \u2014 11.7\u00d7 your original investment in additional wealth. Use the [Roth IRA Calculator](/calculators/finance/roth-ira-calculator) to model this for your situation." },
        ]}
        useCases={[
          { title: "Finding Your FIRE Number Timeline", text: "Use the compound interest calculator with your current investment portfolio as principal, expected annual return (7% real after inflation for a stock-heavy portfolio), and monthly savings contribution. The year your portfolio crosses your FIRE number (25\u00d7 annual expenses) is your retirement date. For $50,000 annual expenses: FIRE number = $1,250,000. Starting with $100,000 at $2,000/month at 7%, you reach $1,250,000 in approximately 17 years. The [FIRE Calculator](/calculators/finance/fire-calculator) automates this with more variables." },
          { title: "401k Employer Match: The 100% Instant Return", text: "An employer matching 50% of contributions up to 6% of salary on a $80,000 salary = $2,400 free money annually. Contributed $4,800 + received $2,400 match + invested in market = total going in: $7,200/year. At 7% for 30 years: $7,200/year grows to $726,000. The $2,400 match alone grows to $242,000. The compound interest on free employer money is one of the most powerful wealth-building tools available. See the [401k Calculator](/calculators/finance/401k-calculator)." },
          { title: "Debt vs. Investment: The Compound Interest Battle", text: "Compound interest fights for you (investments) and against you (debt) simultaneously. $10,000 in credit card debt at 22% APR and $10,000 invested at 7%: After 10 years, the debt compounds to $73,589 if unpaid; the investment grows to $19,672. Net position: \u2212$53,917. Paying off high-interest debt first is mathematically equivalent to earning the debt's interest rate risk-free on the amount paid off. Use the [Credit Card Payoff Calculator](/calculators/finance/credit-card-payoff-calculator) to find your exact payoff trajectory." },
          { title: "529 College Savings: Time Is Everything", text: "A child born today will start college in 18 years. Investing $300/month at 7% for 18 years grows to $123,218 \u2014 covering a significant portion of a 4-year public university education. Starting 5 years later (13 years of contributions): $78,623. The 5-year head start adds $44,595 \u2014 nearly 15 months of additional contributions in extra growth. Use the [Education Goal Calculator](/calculators/finance/education-goal-calculator) to model college savings scenarios." },
          { title: "The Latte Factor: Does Small Spending Really Matter?", text: "Skipping a $5 daily coffee: $5 \u00d7 365 = $1,825/year invested at 7% for 30 years = $175,000. The compound interest turns a small daily habit change into serious wealth. But the reverse is also true: $200/month in subscriptions and unnecessary expenses, invested instead at 7% for 30 years = $227,000. Behavioral finance meets compound math. Use the [Budget Planner Calculator](/calculators/finance/budget-planner-calculator) to find your investable surplus." },
          { title: "Interest Rate Comparison: CD vs HYSA vs Bonds vs Stocks", text: "Same $50,000 for 10 years at different rates: HYSA (5%) = $81,445. 10-yr Treasury (4.3%) = $75,389. S&P 500 (10.5%) = $135,673. The difference between HYSA and S&P 500: $54,228 over 10 years \u2014 more than the original investment. For long-term goals (10+ years), the compounding gap between safe rates and stock returns becomes enormous. Use the [CD vs HYSA Calculator](/calculators/finance/cd-vs-hysa-calculator) for short-term comparisons." },
        ]}
        tipsSection={`1. Use 7% as your real (inflation-adjusted) expected return for a US stock market portfolio \u2014 not 10%. At 3% average inflation, 10.5% nominal becomes 7.3% real. Planning with 10% nominal will overstate your real future purchasing power.\n\n2. Compound interest requires not touching the principal. The sequence of returns matters enormously: the same average return produces vastly different outcomes depending on whether losses come early (worst case) or late (best case). The [Savings Rate Calculator](/calculators/finance/savings-rate-calculator) models this across market scenarios.\n\n3. Reinvesting dividends is the most impactful compounding lever for stock investors. The S&P 500 adds 1.5\u20132% annual return from dividend reinvestment. Over 30 years, this accounts for 25\u201330% of total return. Never disable automatic dividend reinvestment in long-term accounts.\n\n4. Tax drag cuts compound growth significantly in taxable accounts. A 10% return with annual 15% LTCG tax = 8.5% effective rate. Over 30 years: $100,000 at 10% = $1,745,000 vs. 8.5% = $1,132,000. Maxing tax-advantaged accounts (401k, IRA, HSA) before taxable investing preserves the full compounding rate. See the [Roth IRA Calculator](/calculators/finance/roth-ira-calculator).\n\n5. Monthly contributions matter more than the initial principal for long time horizons. Don\'t delay investing because you don\'t have a large lump sum \u2014 $300/month started today beats $5,000 invested in 5 years by a wide margin over 30 years.`}
        conclusion={`Compound interest is not a concept \u2014 it\'s the engine of every retirement account, every investment portfolio, and every debt balance working against you. Understanding it mathematically transforms vague financial intentions (\"I should save more\") into precise, actionable goals (\"I need $700/month invested at 7% to reach $1M in 26 years\").\n\nUse this calculator to model your specific scenarios. Then connect the results to your broader financial plan using the [Retirement Calculator](/calculators/finance/retirement-calculator), the [FIRE Calculator](/calculators/finance/fire-calculator), and the [Net Worth Calculator](/calculators/finance/net-worth-calculator). The math is working every day \u2014 whether it\'s compounding your investments or your debt.`}
        comparisonTable={[
          { label: "$10,000 at 5% for 30 years", value: "$43,219", note: "Conservative: bonds/CDs" },
          { label: "$10,000 at 7% for 30 years", value: "$76,123", note: "Moderate: balanced portfolio" },
          { label: "$10,000 at 10.5% for 30 years", value: "$196,516", note: "Aggressive: S&P 500 historical" },
          { label: "$10,000 at 7% + $500/mo for 30 yrs", value: "$648,929", note: "Real-world investing scenario" },
          { label: "$10,000 at 7% + $1,000/mo for 30 yrs", value: "$1,221,736", note: "Max savings scenario" },
        ]}
        didYouKnow={[
          "$1 invested in the S&P 500 in 1957 is worth approximately $1,427 today (2026) with dividends reinvested \u2014 a 142,600% total return over 68 years.",
          "Warren Buffett made 99.7% of his total wealth after age 52 \u2014 a direct result of compound interest applied over 60+ years of consistent investing.",
          "The difference between 7% and 8% annual return on $100,000 over 40 years: $1,497,447 vs $2,172,452 \u2014 $675,005 more from a 1% improvement in annual return.",
        ]}
      />
      <InternalLinks
        title="Related Finance Calculators"
        variant="grid"
        links={[
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Your complete financial picture" },
            { name: "FIRE Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "When can you retire?" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "How much should you save?" },
            { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🔗", desc: "Tax-free compounding" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Retirement + employer match" },
            { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🔗", desc: "Work backwards from any goal" },
            { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "🔗", desc: "Debt compounding working against you" },
            { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "🔗", desc: "Find your monthly investment capacity" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Full retirement projection" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
