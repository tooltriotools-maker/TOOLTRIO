'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateVAT } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const COUNTRIES = [
  { name: '🇬🇧 United Kingdom', std: 20, reduced: 5, symbol: '£' },
  { name: '🇩🇪 Germany', std: 19, reduced: 7, symbol: '€' },
  { name: '🇫🇷 France', std: 20, reduced: 5.5, symbol: '€' },
  { name: '🇳🇱 Netherlands', std: 21, reduced: 9, symbol: '€' },
  { name: '🇪🇸 Spain', std: 21, reduced: 10, symbol: '€' },
  { name: '🇮🇹 Italy', std: 22, reduced: 10, symbol: '€' },
  { name: '🇧🇪 Belgium', std: 21, reduced: 6, symbol: '€' },
  { name: '🇦🇹 Austria', std: 20, reduced: 10, symbol: '€' },
  { name: '🇸🇪 Sweden', std: 25, reduced: 12, symbol: 'kr' },
  { name: '🇩🇰 Denmark', std: 25, reduced: 0, symbol: 'kr' },
  { name: '🇵🇱 Poland', std: 23, reduced: 8, symbol: 'zl' },
  { name: '🇨🇭 Switzerland', std: 8.1, reduced: 2.6, symbol: 'CHF' },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [amount, setAmount] = useState(1000)
  const [countryIdx, setCountryIdx] = useState(0)
  const [useCustomRate, setUseCustomRate] = useState(false)
  const [customRate, setCustomRate] = useState(20)
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [useReduced, setUseReduced] = useState(false)

  const country = COUNTRIES[countryIdx]
  const vatRate = useCustomRate ? customRate : (useReduced ? country.reduced : country.std)
  const symbol = useCustomRate ? '€' : country.symbol

  const result = useMemo(() => calculateVAT(amount, vatRate, calcType), [amount, vatRate, calcType])

  const fmt = (v: number) => `${symbol}${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const rateComparison = COUNTRIES.slice(0, 8).map(c => ({
    name: c.name.split(' ')[1],
    stdRate: c.std,
    vatAmount: Math.round((calcType === 'exclusive' ? amount * c.std / 100 : amount - amount / (1 + c.std / 100))),
  }))

  return (
    <CalculatorLayout title="VAT Calculator Europe 2026" description="Add or remove VAT for UK, Germany, France, and all EU countries with forward and reverse calculation." icon="🏷️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">VAT Settings</h2>

          {/* Country selector */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Country</label>
            <select value={countryIdx} onChange={e => { setCountryIdx(Number(e.target.value)); setUseCustomRate(false) }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none">
              {COUNTRIES.map((c, i) => <option key={c.name} value={i}>{c.name} - {c.std}%</option>)}
            </select>
          </div>

          {/* Rate type */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">VAT Rate</label>
            <div className="grid grid-cols-3 gap-1.5">
              <button onClick={() => { setUseReduced(false); setUseCustomRate(false) }}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${!useReduced && !useCustomRate ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Standard<br /><span className="font-bold">{country.std}%</span>
              </button>
              {country.reduced > 0 && (
                <button onClick={() => { setUseReduced(true); setUseCustomRate(false) }}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${useReduced && !useCustomRate ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  Reduced<br /><span className="font-bold">{country.reduced}%</span>
                </button>
              )}
              <button onClick={() => setUseCustomRate(true)}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${useCustomRate ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Custom<br /><span className="font-bold">{customRate}%</span>
              </button>
            </div>
            {useCustomRate && (
              <div className="flex items-center gap-2 bg-gray-50 border border-green-300 rounded-xl px-3 py-2">
                <input type="number" value={customRate} onChange={e => setCustomRate(Number(e.target.value))} step={0.5} min={0} max={30}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            )}
          </div>

          {/* Calculation mode */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Calculation Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCalcType('exclusive')}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all text-center ${calcType === 'exclusive' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                ➕ Add VAT<br /><span className="opacity-75">Net -{'>'} Gross</span>
              </button>
              <button onClick={() => setCalcType('inclusive')}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all text-center ${calcType === 'inclusive' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                ➖ Remove VAT<br /><span className="opacity-75">Gross -{'>'} Net</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">{calcType === 'exclusive' ? 'Net Amount (exc. VAT)' : 'Gross Amount (inc. VAT)'}</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm font-bold">{symbol}</span>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} step={10}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-lg" />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Main result panel */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Net (exc. VAT)</p>
                <p className="text-2xl font-black text-gray-800">{fmt(result.netAmount)}</p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-600 mb-1">VAT @ {vatRate}%</p>
                <p className="text-2xl font-black text-amber-600">{fmt(result.vatAmount)}</p>
              </div>
              <div className="bg-green-600 rounded-xl p-4 text-white">
                <p className="text-xs text-green-100 mb-1">Gross (inc. VAT)</p>
                <p className="text-2xl font-black">{fmt(result.grossAmount)}</p>
              </div>
            </div>

            {/* Visual breakdown */}
            <div className="mt-4 bg-white rounded-xl p-3">
              <div className="flex rounded-full overflow-hidden h-6">
                <div className="bg-blue-400 flex items-center justify-center text-white text-xs font-bold transition-all"
                  style={{ width: `${(result.netAmount / result.grossAmount) * 100}%` }}>
                  {Math.round((result.netAmount / result.grossAmount) * 100)}%
                </div>
                <div className="bg-amber-400 flex items-center justify-center text-white text-xs font-bold transition-all"
                  style={{ width: `${(result.vatAmount / result.grossAmount) * 100}%` }}>
                  VAT {Math.round((result.vatAmount / result.grossAmount) * 100)}%
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Net: {fmt(result.netAmount)}</span>
                <span>VAT: {fmt(result.vatAmount)}</span>
                <span>Gross: {fmt(result.grossAmount)}</span>
              </div>
            </div>
          </div>

          {/* Quick calculations */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Multi-Amount Table</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Amount</th><th>Net (exc. VAT)</th><th>VAT @ {vatRate}%</th><th>Gross (inc. VAT)</th></tr></thead>
                <tbody>
                  {[0.5, 1, 2, 5, 10].map(mult => {
                    const a = amount * mult
                    const r = calculateVAT(a, vatRate, calcType)
                    return (
                      <tr key={mult} className={mult === 1 ? 'bg-green-50 font-bold' : ''}>
                        <td className="text-gray-500 text-xs">{mult === 1 ? '★ ' : ''}{mult}x</td>
                        <td>{fmt(r.netAmount)}</td>
                        <td className="text-amber-600">{fmt(r.vatAmount)}</td>
                        <td className="font-bold text-green-700">{fmt(r.grossAmount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Country comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">VAT Comparison Across Europe</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateComparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={35} tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [name === 'stdRate' ? `${v}%` : fmt(v), name === 'stdRate' ? 'VAT Rate' : 'VAT on Amount']} />
                  <Bar dataKey="stdRate" name="VAT Rate %" radius={[4, 4, 0, 0]}>
                    {rateComparison.map((e, i) => <Cell key={i} fill={i === countryIdx ? '#22c55e' : '#94a3b8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">VAT Calculator Europe - All EU &amp; UK VAT Rates Explained 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How VAT Works in Europe</h3>
              <p>Value Added Tax (VAT) is a consumption tax charged at each stage of the supply chain, but ultimately borne by the end consumer. Businesses collect VAT on sales and reclaim VAT on purchases, remitting only the difference to HMRC (UK) or the relevant national tax authority. For businesses, VAT is essentially a pass-through tax. For consumers, the price you pay at retail always includes VAT. The UK standard rate is 20%, reduced rate 5% (energy, children's car seats, some home renovations), and zero-rate for essential food, children\'s clothing, and books.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">EU VAT Rates by Country 2026</h3>
              <p>Standard VAT rates across Europe range from 17% (Luxembourg) to 27% (Hungary). The most common rates: Sweden, Denmark, and Norway at 25%; Italy at 22%; Netherlands, Spain, Belgium, and Poland at 21%; UK, France, Germany, and Austria at 19-20%. All EU countries must have a standard rate of at least 15% under EU directive. Reduced rates apply to necessities - Germany applies 7% to food, books, hotels, and public transport. UK applies 0% (not 5%) to most food and books since Brexit.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">VAT Registration Thresholds</h3>
              <p>UK VAT registration is mandatory when taxable turnover exceeds £90,000 in any 12-month period (2026). Voluntary registration is available for any business. Once registered, you charge VAT on sales and file quarterly VAT returns via HMRC Making Tax Digital. Germany requires registration for any business (no threshold for non-residents, €22,000 threshold for small businesses under Kleinunternehmerregelung). France threshold is €91,900 for goods, €36,800 for services. EU cross-border sales: the One Stop Shop (OSS) scheme allows single EU-wide VAT registration.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Reverse Charge VAT - B2B Cross-Border</h3>
              <p>When a UK or EU business purchases services from abroad (B2B), the reverse charge mechanism applies: the buyer accounts for the VAT rather than the seller. This is common for digital services, consulting, and software subscriptions purchased from non-UK/EU suppliers. Post-Brexit, UK businesses purchasing digital services from EU suppliers apply the UK reverse charge. The practical effect: no cash changes hands for VAT purposes, but the buyer records input and output VAT in the same amount, netting to zero on their VAT return.</p>
            </div>
          </div>
        </Card>
  

      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "European Mortgage Calculator", href: "/calculators/finance/european-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "Euro Auto Loan Calculator", href: "/calculators/finance/euro-auto-loan-calculator", icon: "📊", desc: "Free calculator" },          { name: "Euro Bonds vs ETF Calculator", href: "/calculators/finance/euro-bonds-vs-etf-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe ETF vs Property Calculator", href: "/calculators/finance/europe-etf-vs-property-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Growth vs Value ETF Calculator", href: "/calculators/finance/europe-growth-vs-value-etf-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Msci World vs S&P500 Calculator", href: "/calculators/finance/europe-msci-world-vs-sp500-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Property vs REIT Calculator", href: "/calculators/finance/europe-property-vs-reit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Netherlands AOW vs Private Pension Calculator", href: "/calculators/finance/netherlands-aow-vs-private-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Germany ETF vs Tagesgeld Calculator", href: "/calculators/finance/germany-etf-vs-tagesgeld-calculator", icon: "📊", desc: "Free calculator" },          { name: "France PEA vs Assurance Vie Calculator", href: "/calculators/finance/france-pea-vs-assurance-vie-calculator", icon: "📊", desc: "Free calculator" },          { name: "Spain Pension vs ETF Calculator", href: "/calculators/finance/spain-pension-vs-etf-calculator", icon: "📊", desc: "Free calculator" },          { name: "FIRE Europe Calculator", href: "/calculators/finance/fire-europe-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Vat Calculator Europe Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Vat Europe USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          VAT Calculator Europe Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, purchasing EUR 8,500 of goods in France including 20% VAT, your VAT calculator Europe 2026 shows the net amount (EUR 7,083), VAT amount (EUR 1,417), and the correct invoice breakdown for your accounts.
        </p>
      </Card>

            <SEOContent
        title="VAT Calculator Europe – Add or Remove VAT for UK, Germany, France and All EU Countries in 2026"
        category="finance"
        intro={`VAT (Value Added Tax) is the primary consumption tax across the European Union and UK, applied at every stage of the supply chain with businesses claiming credit for VAT paid on inputs. Understanding how to calculate VAT in both directions — adding VAT to a net price and extracting VAT from a gross price — is a daily business necessity for traders, freelancers, and consumers in VAT-registered economies.

VAT rates vary significantly across Europe and across product categories within each country. EU standard rates range from 17% (Luxembourg) to 27% (Hungary). The UK standard rate is 20% since the 2011 increase. Most countries have reduced rates (typically 5-12%) for food, medicine, and cultural goods, and zero rates for specific essential goods.

The most common VAT calculation error: applying the standard rate to the full price when the applicable category has a reduced rate. UK food sales are zero-rated; restaurant meals are standard-rated. German books at 7% vs electronics at 19%. Building your VAT calculation on the correct applicable rate for your specific product or service category is the foundational step.`}
        howItWorks={`Adding VAT to net price: Gross = Net × (1 + VAT rate). At 20% UK VAT: £500 net × 1.20 = £600 gross. VAT amount = £600 - £500 = £100.

Extracting VAT from gross price: Net = Gross / (1 + VAT rate). £600 gross / 1.20 = £500 net. VAT amount = £600 - £500 = £100. Common error: multiplying gross by VAT rate directly. £600 × 20% = £120 ≠ £100 actual VAT. The correct formula is Gross × (rate / (1 + rate)): £600 × (0.20/1.20) = £100.

B2B vs B2C: VAT-registered businesses can reclaim VAT on business purchases, making VAT-exclusive pricing the relevant comparison for B2B transactions. Non-VAT-registered businesses and consumers cannot reclaim VAT — gross inclusive price is their true cost.`}
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
        tipsSection={`For EU cross-border digital services: post-2021 OSS (One Stop Shop) rules require sellers to collect VAT at the buyer's country rate on digital services sold to EU consumers, regardless of seller location. A UK software company selling to German consumers charges German VAT (19%); selling to French consumers charges French VAT (20%). Register for OSS through your home EU country's portal.

For UK post-Brexit: the UK left the EU VAT area in January 2021. UK businesses selling to EU consumers above the €10,000 annual threshold must register for VAT in each EU country or use OSS. EU businesses selling to UK consumers must register for UK VAT if exceeding £85,000 annual sales to UK customers.

For price display compliance: EU regulations require B2C prices to be displayed inclusive of VAT. B2B prices are typically exclusive of VAT with VAT added separately. Getting this right in online store pricing and invoicing avoids compliance issues.`}
        conclusion={`VAT accounting errors are one of the most common causes of small business compliance problems. Common mistakes: applying the wrong rate for your product category, failing to account for reverse-charge VAT on cross-border B2B services, and forgetting that import VAT is due on goods brought into VAT areas.

For businesses approaching the UK VAT registration threshold (£85,000 in any 12-month rolling period in 2024): monitor turnover closely. Once registered, all sales become subject to VAT, which affects pricing strategy significantly — if your customers can't reclaim VAT (consumers or exempt businesses), registration effectively reduces your margin by the VAT rate unless you raise prices. Consider the threshold management implications before crossing it.`}

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
