'use client'
import { useState, useMemo } from 'react'
import { useCommodityPrices, getGoldKaratPrices, GRAM_TO_TOLA, TROY_OZ_TO_GRAM } from '@/hooks/useCommodityPrices'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { RefreshCw, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const SYM: Record<string,string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€' }


function GoldLoanFAQ() {
  const [open, setOpen] = useState<number|null>(null)
  const faqs = [
    {q:'What is the maximum loan I can get against my gold in India?',a:'The Reserve Bank of India mandates a maximum Loan-to-Value (LTV) ratio of 75% for gold loans from banks and NBFCs. If your gold is valued at ₹4,00,000, the maximum loan is ₹3,00,000 (75%). Some rural cooperative banks or unlicensed lenders offer higher LTV, but these are riskier and not RBI-regulated. The gold value is assessed by the lender\'s in-house appraiser at the market rate on the day of the loan — not at your purchase price.'},
    {q:'Which is better — gold loan from bank or NBFC (Muthoot, Manappuram)?',a:'NBFCs like Muthoot Finance and Manappuram Gold Finance specialize in gold loans and typically offer: faster processing (same-day disbursal), higher LTV (up to 75%), and more branches in smaller towns. Banks typically offer: lower interest rates (8–12% vs NBFC 12–24%), longer tenure, and more trust for larger loan amounts. For emergency cash needs: NBFC. For planned, large-amount borrowing: bank. Always compare the total interest cost for your specific amount and tenure using our calculator.'},
    {q:'What happens if I cannot repay my gold loan?',a:'If you default on a gold loan, the lender has the right to auction your pledged gold after giving proper notice (legally required: 3 notices with 14-day intervals). The auction proceeds first repay the outstanding loan + interest + auction costs. Any surplus is returned to you. This makes gold loans relatively low-risk for borrowers vs unsecured loans — your liability is strictly limited to the gold pledged. However, rising gold prices at auction can mean you get meaningful surplus back; falling prices mean the auction may not fully cover the loan.'},
    {q:'Can I use gold jewellery (not coins) for a gold loan?',a:'Yes — gold jewellery is the most common collateral for gold loans in India. The lender assesses purity using touchstone testing or XRF analysis. Hallmarked BIS jewellery (with karat clearly stamped) gets assessed at declared purity. Unhallmarked jewellery may get assessed at a lower purity to be conservative. Making charges and gemstones are excluded from value calculation — only the metal value counts. 22K jewellery is ideal for gold loans: high purity, widely accepted, easy to assess.'},
    {q:'What is the interest rate on gold loans in 2026?',a:'Interest rates vary widely: Nationalized banks (SBI, BoB): 8–11% p.a. Private banks (HDFC, ICICI): 10–14% p.a. NBFCs (Muthoot, Manappuram): 12–24% p.a. Online NBFCs: sometimes 11–18% p.a. The rate depends on your credit score (for banks), loan amount, tenure, and current RBI repo rate. Gold loans are floating rate products — rates can change during your loan tenure. Our calculator lets you model different interest rates to compare total interest cost.'},
    {q:'Is a gold loan better than a personal loan?',a:'Gold loans have clear advantages over personal loans: lower interest rates (gold loan 10–14% vs personal loan 14–26%), no credit score required (secured by gold), instant disbursal (30 minutes vs 2–5 days for personal loan), and no end-use restriction. Disadvantages: you must physically surrender your gold to the lender (security risk), and you lose the inflation hedge benefit of your gold during the loan period. For short-term liquidity needs where you have idle gold, a gold loan is almost always better than a personal loan on economics.'},
  ]
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Gold Loan FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-yellow-300 shadow-md':'border-gray-100 hover:border-yellow-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-yellow-600 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-yellow-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function GoldLoanCalculatorPage() {
  const { data, loading, refresh, usdInr } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918 }
  const karats = getGoldKaratPrices(data.gold.price)
  const karatList = Object.entries(karats) as [string, ReturnType<typeof getGoldKaratPrices>['24K']][]

  const [fxKey,   setFxKey]   = useState('USD')
  const [weight,  setWeight]  = useState(50)
  const [wUnit,   setWUnit]   = useState<'gram'|'tola'|'oz'>('gram')
  const [karat,   setKarat]   = useState('22K')
  const [ltv,     setLtv]     = useState(75)
  const [rate,    setRate]    = useState(10.5)
  const [tenure,  setTenure]  = useState(12)
  const [loanType, setLoanType] = useState<'emi'|'bullet'>('emi')

  const fmt = (usd: number, dp = 0) => `${SYM[fxKey]}${(usd * FX[fxKey]).toLocaleString(undefined, { minimumFractionDigits:dp, maximumFractionDigits:dp })}`

  const grams = useMemo(() => {
    if (wUnit === 'gram') return weight
    if (wUnit === 'tola') return weight * GRAM_TO_TOLA
    return weight * TROY_OZ_TO_GRAM
  }, [weight, wUnit])

  const karatInfo = karats[karat as keyof typeof karats]
  const goldValue = useMemo(() => karatInfo ? karatInfo.perGram * grams : 0, [karatInfo, grams])
  const loanAmt   = goldValue * (ltv / 100)
  const monthlyR  = rate / 100 / 12

  const monthlyEMI = useMemo(() => {
    if (loanType === 'bullet') return 0
    return monthlyR > 0
      ? loanAmt * monthlyR * Math.pow(1 + monthlyR, tenure) / (Math.pow(1 + monthlyR, tenure) - 1)
      : loanAmt / tenure
  }, [loanAmt, monthlyR, tenure, loanType])

  const totalInterest = loanType === 'bullet'
    ? loanAmt * (rate / 100) * (tenure / 12)
    : monthlyEMI * tenure - loanAmt
  const totalPayment = loanAmt + totalInterest

  // EMI schedule for chart
  const schedule = useMemo(() => {
    if (loanType === 'bullet') return []
    let bal = loanAmt
    return Array.from({ length: Math.min(tenure, 24) }, (_, i) => {
      const interest = bal * monthlyR
      const principal = monthlyEMI - interest
      bal = Math.max(0, bal - principal)
      return { month: i + 1, balance: Math.round(bal * FX[fxKey]), interest: Math.round(interest * FX[fxKey]), principal: Math.round(principal * FX[fxKey]) }
    })
  }, [loanAmt, monthlyR, monthlyEMI, tenure, loanType, fxKey])

  const pieData = [
    { name: 'Principal', value: Math.round(loanAmt * FX[fxKey]), color: '#16a34a' },
    { name: 'Interest',  value: Math.round(totalInterest * FX[fxKey]), color: '#f59e0b' },
  ]

  const tips = [
    { icon: '💡', text: 'Always compare rates from 3+ lenders - range is 8-24% p.a. in India, 7-15% in USA/UK.' },
    { icon: '📋', text: 'LTV cap is 75% in India (RBI mandate for NBFCs). Banks may offer up to 85%.' },
    { icon: '⚡', text: 'Gold loans disburse in 15-60 mins - faster than personal loans. Great for emergencies.' },
    { icon: '🔒', text: 'Your gold is held in a secure vault by the lender. It is returned fully on loan repayment.' },
    { icon: '⚠️', text: 'Non-repayment triggers auction after a legal notice period. Protect your pledged gold.' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Gold Loan Calculator</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">🏦 Gold Loan Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate loan amount against your gold at live spot price - LTV, EMI, interest &amp; repayment schedule</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => (
              <button key={k} onClick={() => setFxKey(k)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey === k ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{k}</button>
            ))}
          </div>
          <button onClick={refresh} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl border border-yellow-200">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Live Price'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* -- INPUTS -- */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              🥇 Gold Details
              <span className="text-xs font-normal text-gray-400">Spot: ${data.gold.price.toLocaleString()}/oz</span>
            </h2>

            {/* Weight */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gold Weight</label>
              <div className="flex gap-2">
                <input type="number" step="0.5" min="1" value={weight} onChange={e => setWeight(+e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 font-bold" />
                <select value={wUnit} onChange={e => setWUnit(e.target.value as any)}
                  className="px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm">
                  <option value="gram">gram</option>
                  <option value="tola">tola</option>
                  <option value="oz">troy oz</option>
                </select>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">{grams.toFixed(3)}g total</p>
            </div>

            {/* Karat */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Karat - {karat} ({((karatInfo?.purity || 0) * 100).toFixed(1)}% pure)</label>
              <div className="grid grid-cols-5 gap-1">
                {karatList.map(([k]) => (
                  <button key={k} onClick={() => setKarat(k)}
                    className={`py-2 text-[11px] font-black rounded-xl transition-all ${karat === k ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'}`}>{k}</button>
                ))}
              </div>
            </div>

            {/* Gold value display */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Gold Value ({karat} - {grams.toFixed(1)}g)</span>
              <span className="font-black text-yellow-700 text-lg">{fmt(goldValue)}</span>
            </div>

            {/* LTV */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Loan-to-Value (LTV): <span className="text-blue-600 font-black">{ltv}%</span></label>
              <input type="range" min="50" max="90" step="5" value={ltv} onChange={e => setLtv(+e.target.value)} className="w-full accent-blue-600" />
              <div className="flex justify-between text-[11px] text-gray-400 mt-0.5"><span>50%</span><span>75% (RBI max)</span><span>90%</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-4">🏦 Loan Terms</h2>

            {/* Loan type */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Repayment Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[['emi','EMI (Monthly)'],['bullet','Bullet (End)']].map(([v,l]) => (
                  <button key={v} onClick={() => setLoanType(v as any)}
                    className={`py-2.5 text-xs font-black rounded-xl transition-all ${loanType === v ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}>{l}</button>
                ))}
              </div>
            </div>

            {/* Rate */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Interest Rate: <span className="text-red-500 font-black">{rate}%</span></label>
              <input type="range" min="7" max="26" step="0.5" value={rate} onChange={e => setRate(+e.target.value)} className="w-full accent-red-500" />
              <div className="flex justify-between text-[11px] text-gray-400 mt-0.5"><span>7% (bank)</span><span>~12% avg</span><span>26% (NBFC)</span></div>
            </div>

            {/* Tenure */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tenure: <span className="text-green-600 font-black">{tenure} months</span></label>
              <input type="range" min="3" max="48" step="3" value={tenure} onChange={e => setTenure(+e.target.value)} className="w-full accent-green-600" />
              <div className="flex justify-between text-[11px] text-gray-400 mt-0.5"><span>3m</span><span>12m</span><span>24m</span><span>48m</span></div>
            </div>
          </div>
        </div>

        {/* -- RESULTS -- */}
        <div className="xl:col-span-2 space-y-4">

          {/* Key numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Gold Value',    val: fmt(goldValue),              sub: `${karat} - ${grams.toFixed(1)}g`,     accent: 'bg-yellow-50 border-yellow-200' },
              { label: 'Loan Amount',   val: fmt(loanAmt),                sub: `${ltv}% LTV`,                          accent: 'bg-blue-50 border-blue-200' },
              { label: loanType === 'emi' ? 'Monthly EMI' : 'Lump Sum',
                val: loanType === 'emi' ? fmt(monthlyEMI) : fmt(totalPayment),
                sub: loanType === 'emi' ? `x ${tenure} months` : `Pay at end`,
                accent: 'bg-green-50 border-green-200' },
              { label: 'Total Interest', val: fmt(totalInterest),         sub: `${rate}% p.a. - ${tenure}m`,          accent: 'bg-red-50 border-red-200' },
            ].map(c => (
              <div key={c.label} className={`rounded-2xl border p-4 text-center ${c.accent}`}>
                <p className="text-[11px] text-gray-500 font-semibold mb-1">{c.label}</p>
                <p className="font-black text-gray-900 text-xl leading-none">{c.val}</p>
                <p className="text-[11px] text-gray-400 mt-1">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Pie + summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-black text-gray-900 mb-3">Payment Breakdown</h3>
              <div className="flex items-center gap-4">
                <div style={{ width: 120, height: 120, flexShrink: 0 }}>
                  <PieChart width={120} height={120}>
                    <Pie data={pieData} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </div>
                <div className="space-y-2 flex-1">
                  {pieData.map(p => (
                    <div key={p.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-gray-600">{p.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">{SYM[fxKey]}{p.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 flex justify-between text-sm">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="font-black text-gray-900">{fmt(totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-black text-gray-900 mb-3">Loan Summary</h3>
              <div className="space-y-2">
                {[
                  ['Loan Amount',      fmt(loanAmt)],
                  ['Annual Rate',      `${rate}%`],
                  ['Tenure',           `${tenure} months`],
                  ['Monthly EMI',      loanType === 'emi' ? fmt(monthlyEMI) : 'Bullet repayment'],
                  ['Total Interest',   fmt(totalInterest)],
                  ['Total Repayment',  fmt(totalPayment)],
                  ['Effective Cost',   `${((totalInterest / loanAmt) * 100).toFixed(1)}% on loan`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{l}</span>
                    <span className="font-bold text-gray-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EMI Schedule chart */}
          {loanType === 'emi' && schedule.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-black text-gray-900 mb-4">Loan Balance - Month by Month</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={schedule}>
                  <defs>
                    <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tickFormatter={v => `M${v}`} tick={{ fontSize:10 }} />
                  <YAxis tickFormatter={v => `${SYM[fxKey]}${(v/1000).toFixed(0)}k`} tick={{ fontSize:10 }} />
                  <Tooltip formatter={(v:number) => [`${SYM[fxKey]}${v.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="balance" stroke="#2563eb" fill="url(#balGrad)" strokeWidth={2} name="Balance" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Gold Loan Tips
            </h3>
            <div className="space-y-2">
              {tips.map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 text-base leading-tight">{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { n:'Gold Price', e:'🥇', h:'/commodities/gold-price-calculator'            },
              { n:'EMI Calc',   e:'🏦', h:'/calculators/finance/emi-calculator'           },
              { n:'Metals P&amp;L', e:'💰', h:'/commodities/precious-metals-profit-calculator' },
              { n:'Portfolio',  e:'🗂️', h:'/commodities/commodity-portfolio-tracker'       },
            ].map(l => (
              <Link key={l.h} href={l.h}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-yellow-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{l.e}</span>{l.n}
                <ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-yellow-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        <div className="rounded-2xl p-5 bg-yellow-50 border border-yellow-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-yellow-700">📊 Gold Loan Key Facts — India 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'75% LTV',n:'RBI maximum Loan-to-Value for gold loans (NBFCs & banks)'},{s:'8–24% p.a.',n:'Interest rate range: banks 8–11%, NBFCs 12–24%'},{s:'30 mins',n:'Typical NBFC gold loan disbursal time — same day'},{s:'₹25,000+',n:'Typical minimum gold loan amount at most lenders'},{s:'No CIBIL',n:'Gold loans do not require credit score check — fully secured'},{s:'3 months–3 yrs',n:'Typical gold loan tenure range in India'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-yellow-100"><p className="text-lg font-black text-yellow-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Gold Loan Calculator — Complete India Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>India has over 25,000 tonnes of household gold — the largest private gold holding in the world — and a thriving gold loan industry that has grown to ₹8+ lakh crore in outstanding loans. Gold loans allow any gold owner to access liquidity immediately without selling their gold, without a credit check, and often within 30 minutes of walking into a branch. For a country where gold is a primary savings vehicle and formal credit access is limited, gold loans are a critical financial tool.</p>
            <p>The mechanics are straightforward: you pledge gold jewellery or coins to a lender; they assess purity and weight; you receive up to 75% of the assessed value as a loan (the RBI LTV cap for regulated lenders). You pay interest monthly or at the end of tenure; at loan closure, you get your gold back. This calculator gives you the full picture: eligible loan amount based on your gold's current market value, EMI breakdown for different tenures, and total interest cost — so you can compare offers before walking into any branch.</p>
            <p>Critical comparison point: NBFC gold loan rates (12–24% p.a.) vs bank gold loan rates (8–11% p.a.). On a ₹2 lakh loan for 12 months, the difference between 10% and 18% interest is ₹8,000 in total interest paid. Banks are cheaper but slower; NBFCs are faster but costlier. Use this calculator to run both scenarios and decide which matches your need — emergency vs planned borrowing. Compare your gold loan against personal loan economics using our <Link href="/calculators/finance/personal-loan-calculator" className="text-yellow-700 font-semibold underline underline-offset-2">Personal Loan Calculator</Link>.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">📊 Gold Loan — Bank vs NBFC Comparison</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm"><thead><tr className="bg-yellow-50 border-b border-yellow-100">
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Factor</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Bank (SBI, HDFC)</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">NBFC (Muthoot, Manappuram)</th>
            </tr></thead><tbody className="divide-y divide-gray-100">
              {[['Interest Rate','8–12% p.a.','12–24% p.a.'],['Processing Time','1–3 business days','30 mins – same day'],['LTV Ratio','Up to 75% (RBI cap)','Up to 75% (RBI cap)'],['Minimum Loan','₹20,000+','₹1,500+'],['Branch Network','Limited to cities','Extensive (rural+urban)'],['Credit Score Required','Sometimes checked','Not required'],['Best For','Large amounts, planned','Emergencies, small amounts']].map(([f,b,n],i)=>(
                <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-3 font-semibold text-gray-700 text-xs">{f}</td><td className="px-4 py-3 text-gray-600 text-xs">{b}</td><td className="px-4 py-3 text-gray-600 text-xs">{n}</td></tr>
              ))}
            </tbody></table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Use Cases</h3>
          <div className="space-y-4">
            {[
              {t:'Emergency Medical or Education Expense',b:'Gold loans are India\'s fastest formal credit instrument for emergencies. Walk into a Muthoot or Manappuram branch with your gold, leave 30 minutes later with cash. No paperwork queue, no credit check, no guarantor. Calculate the total interest cost here first — for a 3-month emergency loan at 18% p.a., interest on ₹1 lakh is approximately ₹4,500 total. Compare against personal loan or credit card interest (36–42% p.a.) and the math is clear.'},
              {t:'Working Capital for Business',b:'Small business owners often use gold loans as working capital between inventory cycles. A saree shop owner pledges ₹5 lakh of family gold for 6 months to finance festival season inventory, repays from sales, and redeems gold. Interest at 15% p.a. for 6 months = ₹37,500. Compare against unsecured business loans at 18–24% p.a. — gold loans are significantly cheaper for those who have idle gold.'},
            ].map((u,i)=>(<div key={i} className="border-l-4 border-yellow-300 pl-5 py-3 bg-white rounded-r-2xl"><h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4><p className="text-gray-600 text-sm leading-relaxed">{u.b}</p></div>))}
          </div>
        </section>

        <GoldLoanFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Know your gold\'s exact market value before the lender appraises it'},{e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'Calculate gold ROI and whether selling beats a loan'},{e:'💳',n:'Personal Loan Calculator',h:'/calculators/finance/personal-loan-calculator',d:'Compare gold loan cost vs personal loan — which is cheaper?'},{e:'🏠',n:'Home Loan Calculator',h:'/calculators/finance/home-loan-calculator',d:'Planning a home loan? Calculate EMI and total cost'},{e:'📊',n:'EMI Calculator',h:'/calculators/finance/emi-calculator',d:'Calculate EMI for any loan amount, rate & tenure'},{e:'🏅',n:'All Commodities',h:'/commodities',d:'Live gold, silver, platinum & palladium prices'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-yellow-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-yellow-600 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
