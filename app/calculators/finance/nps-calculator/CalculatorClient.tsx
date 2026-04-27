'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateNPS } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, TrendingUp, DollarSign, Briefcase } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [monthly, setMonthly] = useState(5000)
  const [years, setYears] = useState(30)
  const [returns, setReturns] = useState(10)
  const [annuityRate, setAnnuityRate] = useState(6)
  const [annuityPct, setAnnuityPct] = useState(40)

  const r = useMemo(() => calculateNPS(monthly, years, returns, annuityRate, annuityPct), [monthly, years, returns, annuityRate, annuityPct])

  const pie = [
    { name: 'Lump Sum (Tax-Free)', value: r.lumpsum, color: '#16a34a' },
    { name: 'Annuity Corpus', value: r.annuityCorpus, color: '#3b82f6' },
    { name: 'Total Contributed', value: r.totalContributed, color: '#e5e7eb' },
  ]

  return (
    <CalculatorLayout title="NPS Calculator India 2026" description="Calculate NPS retirement corpus, monthly pension, and lump sum withdrawal at 60." icon="👴" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">NPS Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix={currency.symbol} />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={5} max={40} step={1} suffix="Yr" />
            <InputField label="Expected Annual Return" value={returns} onChange={setReturns} min={6} max={16} step={0.5} suffix="%" />
            <InputField label="Annuity Rate" value={annuityRate} onChange={setAnnuityRate} min={4} max={9} step={0.5} suffix="%" />
            <InputField label="Annuity Purchase %" value={annuityPct} onChange={setAnnuityPct} min={40} max={100} step={5} suffix="%" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700">
            <p className="font-bold mb-1">📌 NPS Rules</p>
            <p>Min 40% must be used for annuity. Remaining 60% lump sum is tax-free.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Corpus" value={fmt(r.maturityAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Monthly Pension" value={fmt(r.monthlyPension)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Lump Sum (60%)" value={fmt(r.lumpsum)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Contributed" value={fmt(r.totalContributed)} icon={<Shield className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">NPS Corpus Growth</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="npsT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15}/><stop offset="95%" stopColor="#16a34a" stopOpacity={0}/></linearGradient>
                    <linearGradient id="npsC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Area type="monotone" dataKey="contributed" name="Contributed" stroke="#3b82f6" fill="url(#npsC)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#npsT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Corpus Split at Retirement</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: 'Lump Sum', value: r.lumpsum, color: '#16a34a' }, { name: 'Annuity', value: r.annuityCorpus, color: '#3b82f6' }]} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {[{ color: '#16a34a' }, { color: '#3b82f6' }].map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {[{ label: 'Lump Sum', color: '#16a34a' }, { label: 'Annuity', color: '#3b82f6' }].map(e => (
                  <div key={e.label} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.label}</span></div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Retirement Summary</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Total Maturity Corpus', value: fmt(r.maturityAmount), color: 'text-gray-900' },
                  { label: `Lump Sum (${100 - annuityPct}% tax-free)`, value: fmt(r.lumpsum), color: 'text-green-700' },
                  { label: `Annuity Corpus (${annuityPct}%)`, value: fmt(r.annuityCorpus), color: 'text-blue-700' },
                  { label: 'Monthly Pension', value: fmt(r.monthlyPension), color: 'text-purple-700' },
                  { label: 'Total Contributed', value: fmt(r.totalContributed), color: 'text-gray-600' },
                  { label: 'Total Returns', value: fmt(r.totalReturns), color: 'text-green-600' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">401(k) pension Calculator - Complete Guide to National Pension System 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">401(k) pension Investment Options - Equity, Corporate Bonds, Government Securities</h3>
              <p>401(k) pension offers subscribers choice of investment across three asset classes: Asset Class E (Equity): Maximum 75% allocation (reduces to 50% after age 50 under Auto choice). Historical return: 12-14% CAGR (equity-heavy portfolios). Asset Class C (Corporate Bonds): Invests in investment-grade bonds. Historical return: 9-11% CAGR. Asset Class G (Government Securities): Gilt bonds - safest, lowest return. Historical return: 8-10% CAGR. Investment modes: Active Choice (you decide allocation), Auto Choice (age-based reducing equity exposure: Life Cycle Fund). Fund managers: SBI Pension, LIC Pension, HDFC Pension, ICICI Pru Pension, Kotak Pension, Max Life Pension, Aditya Birla Sun Life Pension. Choose based on historical performance and fund management quality.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">401(k) pension Tax Benefits - Complete Picture</h3>
              <p>401(k) pension offers the most comprehensive tax benefits of any retirement instrument: (1) IRA deduction / 401k contributionCD(1): Employee contribution up to 10% of salary (Basic+DA) deductible within the $1.5L overall 80C limit. (2) IRA deduction / 401k contributionCD(1B): Additional deduction of $50,000 over and above 80C - exclusively for 401(k) pension. This is the real 401(k) pension tax advantage. (3) IRA deduction / 401k contributionCD(2): Employer contribution up to 10% of salary (14% for central government employees) is fully deductible from income with no monetary cap - this is over and above 80C and 80CCD(1B). (4) At maturity: 60% lump sum is completely tax-free. 40% annuity is taxable as regular income. Total maximum annual tax benefit from 401(k) pension: $1.5L + $50K + employer contribution - potentially saving $60,000-1,00,000+ in tax for high earners.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Annuity Options at 401(k) pension Maturity</h3>
              <p>At 401(k) pension retirement (age 60+), minimum 40% of corpus must be used to purchase an annuity from an IRDA-regulated life insurer. Available annuity options: (1) Life annuity: Pension till death - stops when you die. (2) Life annuity with return of purchase price: Family gets the annuity corpus back after your death. (3) Joint life annuity: Pension continues to spouse at same/reduced rate after subscriber's death. (4) Annuity for certain period (5/10/15/20 years): Pension guaranteed for fixed period whether you live or die. Annuity rates (indicative): 6-7% per year. $40 thousand annuity corpus -{'>'} $20,000-23,333/month pension. Compare with SWP (10% expected return) on same corpus: $30,000-35,000/month - SWP is potentially higher but carries market risk.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">401(k) pension vs 401(k) vs Roth IRA - Which is Best for Retirement?</h3>
              <p>Comprehensive comparison for a 30-year-old planning retirement at 60. 401(k) (mandatory for salaried): ~8.25% guaranteed, employer matches 12%, EEE tax status, most accessible at retirement. Best for: everyone (automatic). Roth IRA (voluntary): 7.1% guaranteed, max $1.5L/year, 15-year lock-in, EEE tax. Best for: conservative investors, 80C optimization. 401(k) pension (voluntary): 10-14% potential (equity allocation), additional $50K 80CCD(1B) deduction, 60% tax-free at maturity, 40% annuity mandatory. Best for: high-income earners needing additional tax deduction and long-term equity exposure. Optimal strategy: Max 401(k) -{'>'} Max Roth IRA ($1.5L/year) -{'>'} 401(k) pension ($50K for 80CCD benefit) -{'>'} equity mutual funds for additional wealth.</p>
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
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          NPS Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this NPS USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          NPS Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, contributing INR 15,000/month to NPS from age 35, your NPS calculator India 2026 shows projected corpus at 60, tax savings under 80CCD, and estimated monthly pension after retirement.
        </p>
      </Card>

            <SEOContent
        title="NPS Calculator India – How Much Retirement Corpus Will Your NPS Build in 2026?"
        category="finance"
        intro={`The National Pension System (NPS) is India's most tax-efficient retirement vehicle when used correctly — and one of the most misunderstood. The additional ₹50,000 deduction under Section 80CCD(1B) beyond the regular 80C limit is genuinely unique in Indian tax law: it's the only way to claim tax deduction above the ₹1.5 lakh 80C ceiling. For someone in the 30% tax bracket, this additional deduction alone saves ₹15,000 annually.

NPS Tier I returns depend entirely on your asset allocation across three options: E (equity — Nifty 50, Nifty Next 50 index funds), C (corporate bonds), and G (government securities). Over 10-year periods, NPS equity funds have delivered 10-13% CAGR, corporate bond funds 8-10%, and G-sec funds 7-9%. The maximum equity allocation under NPS is 75% up to age 50, declining by 2.5% annually thereafter under auto choice.

The mandatory 40% annuity at retirement is the aspect of NPS that most deters investors. At maturity, 60% can be withdrawn as a tax-free lump sum; 40% must be used to purchase an annuity from an NPS-empaneled insurer. Annuity rates in India have historically been modest (typically 5-7% per annum on the annuity corpus), making the return on the annuity portion lower than many expect.`}
        howItWorks={`NPS corpus calculation: PMT × [(1+r/12)^n - 1] / (r/12) for monthly contributions. Return r depends on asset allocation. For aggressive allocation (75% E, 25% C), blended return has historically been 10-12% CAGR. Conservative allocation (100% G) has returned 7-9%.

Tax savings calculation: Annual NPS contribution × tax slab rate = annual tax saving. For ₹50,000 contribution at 30% slab = ₹15,000 annual tax saving. Over 25 years, this compounding tax saving effect is substantial.

Maturity calculation: 60% lump sum (tax-free) + 40% annuity. Annuity return = annuity corpus × annuity rate (typically 5.5-7% from empaneled insurers). Monthly pension from annuity = corpus × rate / 12.`}
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
        tipsSection={`NPS is most valuable for the 80CCD(1B) additional deduction. Even investors who prefer equity mutual funds for their primary retirement savings should contribute at least ₹50,000 annually to NPS Tier I to capture the additional tax benefit — the equivalent guaranteed return of the immediate tax saving makes it compelling.

For NPS fund manager selection, compare performance across fund managers for the E (equity) tier: SBI, LIC, HDFC, ICICI Prudential, Kotak, and others manage NPS assets. Active fund manager selection within the equity tier has historically produced modest variation in returns — passive index management of the equity allocation limits the range.

NPS Tier II accounts have no tax benefit but no lock-in — they function as a flexible mutual fund alternative with access to NPS's low-cost passive fund management. The expense ratio in NPS is among the lowest available in India (0.01%), making Tier II an interesting vehicle for cost-conscious investors.`}
        conclusion={`The NPS lock-in until age 60 is its main limitation. Premature exits are possible with restrictions: after 3 years, up to 25% can be withdrawn for specific purposes (education, medical, home purchase). Full exit before 60 requires 80% annuitization (only 20% lump sum). Plan NPS as truly long-term retirement money.

For NPS vs EPF comparison: EPF offers guaranteed returns at 8.15% fully tax-free (up to ₹2.5 lakh contribution). NPS offers potentially higher equity-linked returns with tax savings. For most salaried employees, the optimal strategy is to maximize both: EPF contribution plus ₹50,000 NPS contribution for additional 80CCD(1B) benefit plus equity SIP for growth-oriented investments. Use [our EPF vs NPS Calculator](/calculators/finance/epf-vs-nps-calculator) for detailed comparison.`}

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
