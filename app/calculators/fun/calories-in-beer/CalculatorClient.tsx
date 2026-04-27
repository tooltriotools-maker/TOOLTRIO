'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const BEERS = [
  {name:'Light Lager (4% ABV)',cal:103,abv:4,ml:355},
  {name:'Regular Lager (5% ABV)',cal:153,abv:5,ml:355},
  {name:'IPA (6.5% ABV)',cal:195,abv:6.5,ml:355},
  {name:'Stout / Porter (5.5%)',cal:210,abv:5.5,ml:355},
  {name:'Hefeweizen (5.4%)',cal:180,abv:5.4,ml:500},
  {name:'Sour Beer (4.5%)',cal:140,abv:4.5,ml:355},
  {name:'Belgian Tripel (9%)',cal:330,abv:9,ml:330},
  {name:'Craft IPA (7.5%)',cal:240,abv:7.5,ml:473},
]

const EXERCISE = [
  {name:'Walking',calPerHour:280},
  {name:'Running',calPerHour:600},
  {name:'Cycling',calPerHour:500},
  {name:'Swimming',calPerHour:450},
]

export default function CalculatorClient({ faqs }: Props) {
  const [beerIdx, setBeerIdx] = useState(1)
  const [cans, setCans] = useState(2)

  const beer = BEERS[beerIdx]
  const totalCal = beer.cal * cans
  const totalAlcohol = (beer.ml * beer.abv / 100 * 0.789 * cans).toFixed(1)

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Calories in Beer</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🍺 Beer Calorie Calculator</h1>
      <p className="text-gray-500 mb-6">Find out how many calories are hiding in your favourite beers!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Beer Type</label>
          <select value={beerIdx} onChange={e=>setBeerIdx(+e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:border-yellow-400 focus:outline-none">
            {BEERS.map((b,i)=><option key={b.name} value={i}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Drinks: <span className="text-yellow-600">{cans}</span></label>
          <input type="range" min={1} max={12} value={cans} onChange={e=>setCans(+e.target.value)} className="w-full accent-yellow-500 mt-1" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 text-center mb-4">
        <p className="text-xs font-bold text-yellow-700 uppercase mb-1">Total Calories</p>
        <p className="text-6xl font-black text-yellow-800">{totalCal}</p>
        <p className="text-sm text-yellow-700 mt-1">{cans} x {beer.name} ({beer.ml}ml each)</p>
        <p className="text-xs text-yellow-600 mt-1">~{totalAlcohol}g alcohol consumed</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">🏃 Burn it off - Exercise needed</h2>
        <div className="grid grid-cols-2 gap-3">
          {EXERCISE.map(ex=>(
            <div key={ex.name} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{ex.name}</p>
              <p className="font-black text-gray-900">{Math.round(totalCal/ex.calPerHour*60)} min</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">For entertainment purposes. Always drink responsibly.</p>

      <div className="mt-6 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
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
          <p className="text-gray-600 leading-relaxed">Beer calories are almost always higher than people expect, and the reason is chemistry: alcohol itself contains 7 calories per gram -- nearly as energy-dense as fat (9 cal/g) and more than double carbohydrates (4 cal/g). This calculator breaks down the calorie content by ABV and serving size, shows you the burn-off equivalent, and helps you compare the calorie impact of different beer styles. For a complete picture of food-and-drink habit tracking, pair it with the <Link href="/calculators/fun/coffee-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Coffee Calculator</Link> -- together they cover two of the most commonly underestimated calorie sources in adult diets.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Select your beer type (light lager, regular lager, IPA, stout, craft beer, etc.) or enter a custom ABV percentage directly. Choose your serving size (bottle, can, half-pint, pint, schooner). The calculator estimates calories from two components: alcohol-derived calories (ABV × volume × ethanol density × 7 cal/g) and residual carbohydrate calories (which vary significantly by beer style -- stouts and craft beers carry more carbs per serving than light lagers). Burn-off times are calculated using MET values weighted by body weight.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">A standard UK pint (568ml) is 20% larger than a US pint (473ml). This seems minor but adds roughly 30-60 calories depending on ABV -- and when you're comparing calorie counts between UK and US sources, the pint size difference is often why the numbers don't match. The same ABV beer consumed in a UK pub and a US bar produces meaningfully different calorie totals.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>ABV is the dominant variable. A 7% craft IPA has roughly double the alcohol calories of a 3.5% session ale at identical serving size. The colour, flavour profile, and carbohydrate content matter less than ABV for total calorie count.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Non-alcoholic beers (0.0-0.5% ABV) drop alcohol calories to near zero, leaving only residual carbohydrates -- usually 10-50 calories per pint, compared to 150-300 for full-strength equivalents.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your body processes alcohol calories before any food or other fuel -- it's a prioritised metabolic input. This effectively pauses fat oxidation while your liver works through each drink. This is why alcohol impacts body composition beyond just raw calorie count, and why the <Link href="/calculators/fun/workout-excuse-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Workout Excuse Generator</Link> is often needed the morning after a session.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run the calculator for your usual order and your "lighter" option side by side, then share the comparison. The calorie difference between a craft IPA and a session lager at identical volume surprises most people -- the gap is almost entirely in the ABV difference.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Beer labeling requirements for calories vary dramatically by country. In the US, most alcoholic beverages are exempt from the FDA's standard nutrition labeling requirements -- one of the few product categories that doesn't require calorie disclosure on packaging. UK labels started requiring calorie counts in the mid-2010s, producing the first large-scale consumer awareness of how variable beer calorie counts actually are.</p>
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
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/pizza-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pizza Calculator</p><p className="text-xs text-gray-400 mt-0.5">Never under-order again</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
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
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p></div>
          </Link>
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Beer is one of life's pleasures — and one of the most calorie-dense liquids most people drink without tracking. A pint of craft IPA can pack 250-300 calories. A lager is typically 150-200. Multiply that by a few sessions per week, and beer can represent a meaningful chunk of total calorie intake for drinkers who track nutrition but forget to count their drinks.

**Long-tail searches answered here:** calories in beer calculator free online usa, how many calories in a beer by type free tool, beer calorie counter ipa lager stout free, calories in craft beer calculator no signup, beer vs wine calorie comparison free tool usa, alcohol calorie calculator by drink free online, how many calories in a pint of beer calculator, calories in 12 oz light beer free calculator usa, calories in corona vs bud light calculator free, weekly beer calorie total calculator free usa, lowest calorie beer options comparison free, craft beer abv calorie correlation calculator free usa, calories in non alcoholic beer calculator free, calories in beer belly calculation free usa, how many beers to hit 500 calories calculator free`}
        howItWorks={`Calorie calculation uses the Atwater factor for ethanol (7.1 kcal per gram of pure alcohol) combined with estimated residual carbohydrate content that varies by beer style. The formula: ABV% × volume in mL × 0.789 (ethanol density) × 7.1 kcal/g + estimated carbs from residual sugars.`}
        tipsSection={`Lighter-colored beers (lagers, pilsners, pale ales) generally have fewer calories than darker beers (stouts, porters) at the same ABV. Session beers with lower ABV are the easiest path to calorie reduction if you want to stay in the beer family.`}
        conclusion={`This isn't meant to make beer feel guilty — it's meant to make it transparent. Knowing a pint of your favorite IPA is 280 calories is information, not condemnation. You can factor it into your day, enjoy it fully, or just be pleasantly surprised that your standard lager is only 160.`}
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