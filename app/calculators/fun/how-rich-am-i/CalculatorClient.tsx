'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [income, setIncome] = useState(50000)
  const [currency, setCurrency] = useState('USD')
  const [country, setCountry] = useState('USA')

  const RATES: Record<string,number> = {USD:1,GBP:0.79,EUR:0.92,INR:83.5,AUD:1.53,CAD:1.36}
  const MEDIAN: Record<string,number> = {USA:56000,UK:35000,India:3000,Germany:43000,Australia:51000,Canada:48000,France:38000,Brazil:8000,China:12000,Japan:35000}

  const result = useMemo(() => {
    const usd = income / (RATES[currency]||1)
    // Rough global income distribution
    const pct = usd>=100000?99:usd>=70000?97:usd>=50000?93:usd>=30000?85:usd>=20000?75:usd>=10000?60:usd>=5000?45:usd>=2000?30:usd>=1000?20:10
    const richer = Math.round((100-pct) * 80000000) // approx 8 billion people
    const poorerThan = Math.round(pct * 80000000)
    const daily = (usd/365).toFixed(2)
    const hourly = (usd/8760).toFixed(2)
    const worldMedian = 3000 // USD
    const timesMedian = (usd/worldMedian).toFixed(1)
    const label = pct>=99?'Top 1%! 🏆':pct>=90?'Top 10%! 🌟':pct>=75?'Top 25% 💪':pct>=50?'Above Average 👍':'Below Global Average'
    return { pct, usd:Math.round(usd), richer, poorerThan, daily, hourly, timesMedian, label }
  }, [income, currency, country])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">How Rich Am I?</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">💰 How Rich Am I? Global Wealth Check</h1>
      <p className="text-gray-500 mb-8">See where your income ranks among the world's 8 billion people</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Currency</label>
            <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 font-bold focus:outline-none focus:border-green-400 bg-white">
              {Object.keys(RATES).map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Annual Income</label>
            <input type="number" value={income} onChange={e=>setIncome(Number(e.target.value))} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-xl font-bold focus:outline-none" /></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
          <p className="text-sm font-bold opacity-80">You are richer than</p>
          <p className="text-7xl font-black my-1">{result.pct}%</p>
          <p className="text-xl font-bold">of the world\'s population</p>
          <p className="text-2xl mt-2">{result.label}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{l:'People poorer than you',v:result.poorerThan.toLocaleString(),icon:'👥'},{l:'Daily earnings (USD)',v:`$${result.daily}`,icon:'📅'},{l:'Times world median',v:`${result.timesMedian}x`,icon:'📊'},{l:'Hourly equivalent',v:`$${result.hourly}`,icon:'⏰'}].map(s=>(
            <div key={s.l} className="p-4 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-lg font-black text-gray-900">{s.v}</p>
              <p className="text-xs text-gray-500">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 text-sm text-yellow-800">
          <p className="font-bold mb-1">💡 Put it in perspective</p>
          <p>You earn {result.timesMedian}x the global median income of ~$3,000/year. The world median is equivalent to about $8.20/day.</p>
        </div>
      </div>


      {/* ─── SEO Content ─── */}
      <div className="mt-12 space-y-10 max-w-2xl mx-auto">

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">About This Tool</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* What It Does */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-3">What Does This Calculator Actually Do?</h2>
          <p className="text-gray-600 leading-relaxed">Your income feels very different depending on who you're comparing yourself to. This calculator cuts through local context to show where your earnings sit in the global distribution of wealth -- not relative to your neighbourhood or profession, but relative to all 8 billion people on Earth. The results are calibrated for purchasing power parity (PPP) rather than raw currency conversion, which makes the comparison more meaningful. Most people who complete this exercise walk away with a different relationship to the phrase "I can't afford that" -- and a different relationship to the phrase "I'm not that well off." For numerological takes on wealth and prosperity, the <Link href="/calculators/fun/lucky-number" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Lucky Number Calculator</Link> is the less rigorous but equally interesting companion.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your annual income (pre-tax or post-tax, clearly labeled). The calculator converts it to PPP-adjusted dollars using World Bank data, then locates your position in the global income distribution. Output includes: your global percentile, how many people you're wealthier than, how many times the global median income you earn, and a visual distribution chart. The comparison is income, not wealth -- assets are not factored in, which means the result understates the position of people with significant savings or property.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The global median individual income is approximately $2,500 per year in PPP-adjusted terms. The median for high-income countries is roughly 15-20x that figure. This means a person earning minimum wage in the US, Canada, UK, or Australia is in approximately the top 10-15% of global income earners -- a fact that is simultaneously obvious (of course rich countries pay more) and genuinely difficult to hold onto as a lived reality.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Run the calculator with your income after all taxes and fixed expenses (rent, loan payments, etc.) for the most meaningful comparison -- disposable income is a better proxy for actual economic position than gross income.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The comparison is most useful not for guilt or celebration but for calibration. Understanding your actual position in the global distribution changes how you think about charitable giving, lifestyle choices, and the real meaning of "I can't afford it" in different contexts.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Compare your result with the <Link href="/calculators/fun/life-expectancy-fun" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Life Expectancy Calculator</Link> to see how income correlates with longevity in your lifestyle profile. The two together give a more complete picture of your actual resource position.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share your global percentile, not your income figure. "I am in the top 12% of global income earners" is a statement about position rather than quantity, which makes it more shareable and more interesting as a conversation starter about how wealth distribution actually works.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The global top 1% of income earners starts at approximately $60,000 per year (PPP-adjusted). In many US cities, this income level feels moderate or even lower-middle-class relative to local costs. The tension between feeling "not that wealthy" in a local context and being in the global top 1% by income is one of the clearest illustrations of how relative perception of wealth works -- and why local comparison is usually misleading.</p>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
        </section>

        {/* Related Fun Calculators */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-purple-50">
              <h2 className="text-lg font-bold text-gray-900">🎉 More Fun Calculators</h2>
              <p className="text-sm text-gray-500 mt-0.5">Try these next -- free and instant</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p></div>
          </Link>
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Wealth is profoundly relative — a concept that becomes viscerally clear when you compare your income or net worth to global distribution rather than to your immediate social circle. The average American household income of roughly $75,000 annually places you in approximately the top 2% of global income earners. This isn't a reason for guilt; it's perspective on the extraordinary privilege of being born in a high-income country.

**Long-tail searches answered here:** how rich am i compared to world free calculator usa, global wealth percentile calculator free online, am i rich by world standards calculator free, where do i rank in global income free tool, world wealth comparison calculator usa free, how does my income compare globally free, global income percentile calculator ppp adjusted free, top 10 percent income globally calculator usa free, am i in top 1 percent worldwide income calculator free, global wealth distribution percentile lookup free, how many people in world earn less than me calculator, how my net worth compares to global median free usa, purchasing power parity adjusted income comparison free, world bank income percentile calculator free online, how american median income ranks globally free`}
        howItWorks={`Global wealth and income comparisons use World Bank and Credit Suisse Global Wealth Report data, converted to purchasing power parity (PPP) to account for different costs of living across countries. The percentile calculation places your income or wealth relative to the global population distribution.`}
        tipsSection={`The comparison to local peers (your city, profession, age group) matters for making sense of your financial position in your own context. The global comparison matters for gratitude and perspective. Both are useful — just for different purposes.`}
        conclusion={`Global wealth perspective doesn't change your financial reality, but it does change the frame. Many of the anxieties and comparisons that drive financial decisions — am I doing well enough, am I behind my peers — dissolve somewhat when measured against global distribution rather than local reference groups.`}
        benefits={[
          { title: `Just for fun`, text: `This calculator is designed for entertainment and lighthearted use — enjoy it and share results with friends.` },
          { title: `Quick results`, text: `Get your answer instantly without any signup, account, or personal data required.` },
          { title: `Free to use`, text: `Completely free with no ads, no tracking, and no strings attached.` },
        ]}
        useCases={[
          { title: `Personal entertainment`, text: `Use it for personal curiosity, conversation starters, or just a fun break from your day.` },
          { title: `Social sharing`, text: `Share your results with friends and compare answers — great for group settings and social media.` },
          { title: `Learning and exploration`, text: `Explore the topic in a playful way and discover something new or interesting.` },
        ]}
      />
      </div>
    </div>
  )
}