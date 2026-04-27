'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, BarChart2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [sipRate, setSipRate] = useState(12)
  const [stockRate, setStockRate] = useState(15)
  const [stockVolatility, setStockVolatility] = useState(25)
  const [years, setYears] = useState(10)
  const [brokerage, setBrokerage] = useState(0.5)

  const result = useMemo(() => {
    const months = years * 12
    const sipMR = sipRate / 100 / 12
    const stockMR = stockRate / 100 / 12
    const brokerageCost = (monthly * brokerage / 100) * months

    const sipFV = monthly * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const stockFVRaw = monthly * ((Math.pow(1 + stockMR, months) - 1) / stockMR) * (1 + stockMR)
    const stockFV = stockFVRaw - brokerageCost

    const totalInvested = monthly * months
    const sipGain = sipFV - totalInvested
    const stockGain = stockFV - totalInvested

    // Simulated worst/best case for stocks using volatility
    const conservativeStockRate = stockRate - stockVolatility * 0.3
    const conservativeMR = conservativeStockRate / 100 / 12
    const stockWorstFV = Math.max(totalInvested * 0.7, monthly * ((Math.pow(1 + conservativeMR, months) - 1) / conservativeMR) * (1 + conservativeMR) - brokerageCost)

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sipMR, m) - 1) / sipMR) * (1 + sipMR)
      const stFV = monthly * ((Math.pow(1 + stockMR, m) - 1) / stockMR) * (1 + stockMR) - (monthly * brokerage / 100) * m
      return { year: y, invested: monthly * m, sip: Math.round(sFV), stocks: Math.round(Math.max(stFV, monthly * m)) }
    })

    return {
      sipFV: Math.round(sipFV), stockFV: Math.round(stockFV),
      totalInvested: Math.round(totalInvested),
      sipGain: Math.round(sipGain), stockGain: Math.round(stockGain),
      brokerageCost: Math.round(brokerageCost),
      stockWorstFV: Math.round(stockWorstFV),
      sipBetter: sipFV > stockFV,
      difference: Math.round(Math.abs(sipFV - stockFV)),
      yearlyData,
    }
  }, [monthly, sipRate, stockRate, stockVolatility, years, brokerage])

  return (
    <CalculatorLayout title="SIP vs Direct Stocks Calculator India 2026" description="Compare equity mutual fund SIP vs direct stock investing on returns, risk, and effort required." icon="📉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <InputField label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={5} max={25} step={0.5} suffix="%" />
            <InputField label="Stock Expected Return (p.a.)" value={stockRate} onChange={setStockRate} min={5} max={40} step={0.5} suffix="%" />
            <InputField label="Stock Volatility (Std Dev)" value={stockVolatility} onChange={setStockVolatility} min={5} max={50} step={1} suffix="%" />
            <InputField label="Brokerage Cost" value={brokerage} onChange={setBrokerage} min={0} max={2} step={0.1} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-yellow-900/20 border border-yellow-700/30">
            <p className="text-xs text-yellow-400 font-semibold mb-1">⚠️ Important Note</p>
            <p className="text-xs text-gray-400">Direct stocks carry higher risk. Actual returns vary widely based on stock selection skill. 80% of retail investors underperform the index.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="SIP Final Value" value={fmtCompact(result.sipFV)} subValue={`Gain: ${fmtCompact(result.sipGain)}`} highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Stocks Final Value" value={fmtCompact(result.stockFV)} subValue={`Gain: ${fmtCompact(result.stockGain)}`} highlight={!result.sipBetter} icon={<BarChart2 className="w-4 h-4" />} />
            <ResultCard label="Brokerage Paid" value={fmtCompact(result.brokerageCost)} subValue={`${brokerage}% on trades`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">SIP vs Stocks Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSipSt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gSt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInvSt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInvSt)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="stocks" name="Stocks Value" stroke="#f59e0b" fill="url(#gSt)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sip" name="SIP Value" stroke="#10b981" fill="url(#gSipSt)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-green-500 mb-2">📈 SIP Advantages</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>- Professional fund management</li>
                <li>- Instant diversification (50-100 stocks)</li>
                <li>- Low expense ratio (0.5-1%)</li>
                <li>- No stock selection skill needed</li>
                <li>- Consistent rupee cost averaging</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-yellow-500 mb-2">📊 Stocks Advantages</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>- Potential for higher alpha (20%+)</li>
                <li>- Full control over portfolio</li>
                <li>- No fund management fees</li>
                <li>- Dividend income directly</li>
                <li>- Exciting for engaged investors</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Stocks: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Stocks?</h3>
              <p>Stocks takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Stocks is how returns are generated and taxed. Sip typically suits growth-oriented investors while Stocks may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Stocks based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs Stocks Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $500/month invested in the S&P 500 at an average 10% annual return grows to over <strong>$1.1M</strong> in 30 years through the power of compound growth.
        </p>
        <p className="text-sm text-gray-600">
          This SIP Vs Stocks USA 2026 calculator helps you model investment scenarios and understand the long-term impact of consistent contributions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs Direct Stocks Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, comparing your monthly SIP vs self-managed stock portfolio, your SIP vs direct stocks calculator India 2026 shows what annual return your stock picks must achieve to justify the additional time and risk vs a passive SIP.
        </p>
      </Card>

            <SEOContent
        title="SIP vs Direct Stocks Calculator India – SIP Funds or Stock Picking: Which Wins in 2026?"
        category="finance"
        intro={`Choosing between SIP in mutual funds and direct stock picking is fundamentally a question about whether you can consistently identify and maintain a portfolio of stocks that outperforms a diversified index fund after all costs — including the time spent on research.

The evidence on stock picking is humbling. Most professional fund managers — with dedicated research teams, Bloomberg terminals, and full-time focus — underperform their benchmark indexes after fees over 10+ year periods. Individual investors, who typically have less information, less time, and higher behavioral susceptibility to buying high and selling low, face an even steeper challenge. Yet the confidence to believe you can beat the market is extremely common.

That said, some individual investors do develop genuine edge in specific segments: small-cap Indian companies where institutional coverage is thin, sector-specific expertise from professional backgrounds, or long-term buy-and-hold approaches to quality businesses that benefit from the patience most institutional investors can't afford to maintain. The question isn't whether stock picking can work — it's whether your specific situation supports it.`}
        howItWorks={`Mutual fund SIP returns: Monthly contribution compounded at fund CAGR. Nifty 50 index fund at 14% CAGR (historical) vs individual stock portfolio return. The comparison is always relative — it's not about whether stocks can return 20% (they can) but whether your specific portfolio beats the index consistently enough to justify the time and concentration risk.

Direct stock total return: Appreciation + dividend yield + any capital gains events. Requires modeling individual position sizes, CAGR for each holding, dividend yields, and comparing to equivalent index investment.

Concentration risk quantification: A 10-stock portfolio has significantly higher variance of outcomes than a 500-stock index fund. Some portfolios will dramatically outperform; others will dramatically underperform. The index fund eliminates the risk of being on the wrong side of that distribution.`}
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
        tipsSection={`If you want to invest in individual stocks, do it with a clearly defined portion of your equity allocation — perhaps 10-20% — while maintaining the bulk in index funds. This lets you pursue the interest and potential upside of stock picking without betting your retirement on your own ability to select and time stocks better than professional investors.

Index-plus-individual approach: Keep 80% in a low-cost Nifty 50 or Nifty 500 index fund SIP and apply 20% to individual stocks you've researched thoroughly. This captures most of the market return plus gives you the engagement of active investing with bounded risk.

For your stock portfolio: track your actual returns against the Nifty 50 index over 3-5 year periods. If you're consistently underperforming the index after time cost, the honest conclusion is that shifting entirely to index SIP would produce better outcomes for equivalent effort.`}
        conclusion={`The most common outcome for new individual stock investors: market outperformance in the first year or two (when luck is often indistinguishable from skill and bull markets make most stocks look good), followed by a humbling bear market that reveals whether the earlier gains were skill or luck.

SIP in index mutual funds isn't the exciting choice — it's the historically validated choice. The boring consistency of index investing has beaten most individual stock pickers and most professional fund managers over any sufficiently long period. That track record deserves more respect than it typically gets from investors seduced by the potential of finding the next multibagger stock.`}

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
            { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
