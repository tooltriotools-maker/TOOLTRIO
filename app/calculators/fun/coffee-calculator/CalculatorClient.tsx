'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const DRINKS = [
  {name:'Espresso (single)',mg:63,cal:5,ml:30},
  {name:'Espresso (double)',mg:126,cal:10,ml:60},
  {name:'Drip Coffee (8oz)',mg:95,cal:2,ml:240},
  {name:'Latte (12oz)',mg:75,cal:120,ml:360},
  {name:'Cappuccino (12oz)',mg:75,cal:80,ml:360},
  {name:'Americano (12oz)',mg:150,cal:15,ml:360},
  {name:'Cold Brew (12oz)',mg:200,cal:5,ml:360},
  {name:'Energy Drink (250ml)',mg:80,cal:110,ml:250},
  {name:'Green Tea',mg:28,cal:3,ml:240},
]

export default function CalculatorClient({ faqs }: Props) {
  const [drinkIdx, setDrinkIdx] = useState(2)
  const [cups, setCups] = useState(3)
  const [weight, setWeight] = useState(70)

  const drink = DRINKS[drinkIdx]
  const totalMg = drink.mg * cups
  const totalCal = drink.cal * cups
  const maxSafe = 400
  const perKg = (totalMg / weight).toFixed(1)
  const pct = Math.min(totalMg / maxSafe * 100, 100)
  const status = totalMg > maxSafe ? {l:'Over limit',c:'text-red-600'} : totalMg > 300 ? {l:'Moderate',c:'text-yellow-600'} : {l:'Safe',c:'text-green-600'}
  const halfLife = new Date(); halfLife.setHours(halfLife.getHours() + 5 * cups)

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Coffee Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">☕ Coffee Caffeine Calculator</h1>
      <p className="text-gray-500 mb-6">Find out how much caffeine you're drinking and whether you\'re in the safe zone.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Drink Type</label>
          <select value={drinkIdx} onChange={e=>setDrinkIdx(+e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:border-amber-400 focus:outline-none">
            {DRINKS.map((d,i)=><option key={d.name} value={i}>{d.name} ({d.mg}mg caffeine)</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Cups today: <span className="text-amber-600 font-black">{cups}</span></label>
          <input type="range" min={1} max={10} value={cups} onChange={e=>setCups(+e.target.value)} className="w-full accent-amber-500 mt-1" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Body weight: <span className="text-amber-600 font-black">{weight}kg</span></label>
          <input type="range" min={40} max={150} value={weight} onChange={e=>setWeight(+e.target.value)} className="w-full accent-amber-500 mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-center">
          <p className="text-xs font-bold text-amber-700 mb-1">Total Caffeine</p>
          <p className="text-4xl font-black text-amber-800">{totalMg}<span className="text-xl">mg</span></p>
          <p className={`text-sm font-bold mt-1 ${status.c}`}>{status.l}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Calories</span><span className="font-bold">{totalCal} kcal</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Per kg body weight</span><span className="font-bold">{perKg}mg/kg</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Safe daily max</span><span className="font-bold">{maxSafe}mg</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">% of safe limit</span><span className="font-bold">{Math.round(pct)}%</span></div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
          <div className={`h-full rounded-full transition-all ${pct>100?'bg-red-500':pct>75?'bg-yellow-500':'bg-green-500'}`} style={{width:`${Math.min(pct,100)}%`}} />
        </div>
        <p className="text-xs text-gray-500 text-center">{totalMg}mg of {maxSafe}mg recommended daily maximum (FDA guideline)</p>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">For entertainment. Consult a doctor for personal health advice.</p>

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
          <p className="text-gray-600 leading-relaxed">Coffee is the world's most widely used psychoactive substance -- consumed daily by over 2 billion people, with a global industry worth hundreds of billions of dollars. This calculator quantifies your relationship with it: daily caffeine intake, annual cost, monthly spend, the point at which your afternoon coffee is still affecting your 11pm sleep, and the lifetime projection at current consumption. If sleep disruption shows up in your results, the <Link href="/calculators/fun/sleep-debt-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Sleep Debt Calculator</Link> can give you a fuller picture of what that costs cognitively.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your typical daily coffee order (type, quantity, whether home-brewed or café), and the calculator outputs: caffeine mg per day, total annual spend, equivalent cost comparison (home brew vs café over 10 years is usually a notable number), the time at which your last coffee's caffeine will have dropped to 25% (the practical "safe" threshold for sleep), and a weekly caffeine graph showing your intake pattern. The half-life calculation accounts for individual variation with a slider for fast vs slow caffeine metabolizers.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Decaf coffee is not caffeine-free. A standard 8oz decaf contains approximately 2-15mg of caffeine, compared to a regular coffee's 80-100mg. However, the decaffeination process is imperfect, and some decafs test significantly higher. Heavy decaf drinkers (4-5 cups per day) can consume enough residual caffeine to produce measurable effects and disrupt sleep -- which is why "I only drink decaf" doesn't always explain intact sleep quality.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Caffeine has a half-life of approximately 5-6 hours for most people (up to 9 hours for slow metabolizers, 3 hours for fast ones, which you can roughly determine by whether caffeine sensitivity runs in your family). A 3pm coffee still has 50% of its caffeine active at 9pm.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The cost difference between home brewing and café drinks seems small per day but substantial per year. A daily $5.50 flat white is roughly $2,000 per year; a home-brewed equivalent is under $300. The 10-year delta funds a decent holiday.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Caffeine tolerance develops quickly -- within a week of consistent daily use, the alertness benefit diminishes significantly while the dependence (withdrawal headaches on missed days) remains. The "I need coffee to function" sensation is mostly describing dependence rather than genuine benefit over baseline. The <Link href="/calculators/fun/calories-in-beer" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Calories in Beer Calculator</Link> has a parallel caffeine/alcohol calorie section if you're tracking both habits.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run the lifetime cost projection at your current café spending rate and share the number. The 20-year projection for a daily $6 café habit is usually high enough to generate genuine pause even in people who consider themselves aware of the cost.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The smell of coffee activates pleasure responses in the human brain even before consumption -- the anticipatory reward reaction is real and measurable by brain scan. This is one reason why the café experience is difficult to replicate at home with equivalent coffee: the smell, the ritual, the ambient noise, and the anticipation are a significant portion of the perceived quality of the drink itself.</p>
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
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p>
</span>
          </Link>
          <Link href="/calculators/fun/calories-in-beer" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍺</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Calories in Beer</p><p className="text-xs text-gray-400 mt-0.5">How bad is that pint, really?</p>
</span>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p>
</span>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p>
</span>
          </Link>
          <Link href="/calculators/fun/pizza-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pizza Calculator</p><p className="text-xs text-gray-400 mt-0.5">Never under-order again</p>
</span>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p>
</span>
          </Link>
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p>
</span>
          </Link>
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p>
</span>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Coffee is the world's most popular psychoactive substance by daily user count, and most people have absolutely no idea how much caffeine they're actually consuming or what it's doing to their body at different times of day. This calculator brings some clarity to that.

**Long-tail searches answered here:** daily caffeine calculator free online usa, how much caffeine am i drinking calculator free, coffee caffeine total calculator no signup, is my coffee intake too high calculator free, caffeine from multiple drinks calculator usa free, daily coffee dose calculator free online tool, caffeine equivalent cups of coffee calculator free usa, how many espresso shots are too many calculator, how much caffeine before harmful effects calculator, caffeine crash timing calculator free online usa, morning coffee optimal timing calculator free, caffeine for night shift workers calculator usa free, how caffeine tolerance affects daily intake calculator, caffeine half life multiple cups accumulation free usa, total daily caffeine budget remaining calculator free`}
        howItWorks={`Caffeine content varies by coffee type, preparation method, and quantity. Espresso: ~63mg per shot. Drip coffee: ~95mg per 8oz. Cold brew: ~200mg per 8oz (higher extraction). Energy drinks: varies widely by brand. The calculator combines your inputs with standard caffeine content and timing to estimate your total daily caffeine load.`}
        tipsSection={`For most adults, 400mg of caffeine per day is the generally accepted safe upper limit. That's approximately 4 standard coffees. Timing matters as much as amount — caffeine's 5-6 hour half-life means afternoon coffee is still 25-50% active at midnight.`}
        conclusion={`Coffee is a performance-enhancing substance, a ritual, and a small pleasure all at once. Understanding how much you're consuming — and when — lets you optimize for the alertness benefits while minimizing the sleep disruption and tolerance buildup that comes from unintentional overconsumption.`}
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