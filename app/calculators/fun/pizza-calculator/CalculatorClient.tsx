'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [people, setPeople] = useState(6)
  const [appetite, setAppetite] = useState<'light'|'normal'|'hungry'>('normal')
  const [size, setSize] = useState<'small'|'medium'|'large'|'xl'>('large')
  const [kids, setKids] = useState(0)

  const adultSlices = {light:2,normal:3,hungry:4}[appetite]
  const kidSlices = 2
  const slicesPerPizza = {small:6,medium:8,large:10,xl:12}[size]
  const totalSlices = (people - kids) * adultSlices + kids * kidSlices
  const pizzas = Math.ceil(totalSlices / slicesPerPizza)
  const leftover = pizzas * slicesPerPizza - totalSlices

  const SIZES = [{v:'small',d:'Small 10"',slices:6},{v:'medium',d:'Medium 12"',slices:8},{v:'large',d:'Large 14"',slices:10},{v:'xl',d:'XL 16"',slices:12}]

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Pizza Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🍕 Pizza Calculator</h1>
      <p className="text-gray-500 mb-6">Never under-order pizza again. Calculate exactly how many pizzas you need!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-5">
        <div>
          <label className="text-sm font-bold text-gray-700">People: <span className="text-orange-600 font-black">{people}</span></label>
          <input type="range" min={1} max={50} value={people} onChange={e=>setPeople(+e.target.value)} className="w-full accent-orange-500 mt-1" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Children (eat 2 slices): <span className="text-orange-600 font-black">{kids}</span></label>
          <input type="range" min={0} max={people} value={Math.min(kids,people)} onChange={e=>setKids(+e.target.value)} className="w-full accent-orange-400 mt-1" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Adult Appetite</label>
          <div className="grid grid-cols-3 gap-2">
            {([['light','🥗 Light','2 slices'],['normal','😊 Normal','3 slices'],['hungry','😤 Hungry','4 slices']] as const).map(([v,l,s])=>(
              <button key={v} onClick={()=>setAppetite(v)} className={`py-3 rounded-xl border-2 font-bold text-sm ${appetite===v?'bg-orange-500 border-orange-500 text-white':'border-gray-200 hover:border-orange-300'}`}>
                <div>{l}</div><div className="text-xs opacity-70">{s}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Pizza Size</label>
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map(s=>(
              <button key={s.v} onClick={()=>setSize(s.v as any)} className={`py-2 rounded-xl border-2 text-xs font-bold ${size===s.v?'bg-orange-500 border-orange-500 text-white':'border-gray-200 hover:border-orange-300'}`}>
                <div>{s.d}</div><div className="opacity-70">{s.slices} slices</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-8 text-center">
        <p className="text-xs font-bold text-orange-700 uppercase mb-2">You need</p>
        <p className="text-8xl font-black text-orange-800">{pizzas}</p>
        <p className="text-2xl font-bold text-orange-700">pizza{pizzas!==1?'s':''}</p>
        <div className="mt-3 flex justify-center gap-6 text-sm text-orange-700">
          <span>{totalSlices} total slices needed</span>
          {leftover>0&&<span>{leftover} slices leftover 🎉</span>}
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
          <p className="text-gray-600 leading-relaxed">Every group pizza order collapses into the same negotiation: someone confidently orders too few and is proven right by the carnage of empty boxes; someone orders too many and is eating cold pizza for three days. This calculator solves the arithmetic permanently. Enter your headcount, appetite level, the proportion of kids vs adults, and your pizza size preference, and it gives you a precise number with the slice math shown -- no more guessing, no more heroic pizza overcalculation. For other food-adjacent calculations, the <Link href="/calculators/fun/calories-in-beer" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Calories in Beer Calculator</Link> handles the drinks side of the same party.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Select group size using the slider, indicate how many children are in the group (they eat about half what adults do), choose appetite level (light, normal, hungry), and select your pizza size. The calculator outputs: total slices needed, number of pizzas to order, and estimated leftover slices. It also shows the per-pizza slice counts for each size so you can compare. The fundamental formula is (adult count × slices per adult appetite) + (child count × 2) ÷ slices per pizza, rounded up.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">A 14-inch large pizza has approximately 154 square inches of surface area. Two 10-inch medium pizzas together have about 157 square inches -- nearly identical -- but almost always cost significantly more. This is the pizza geometry principle: larger pizzas are almost always better value per unit of pizza than multiple smaller ones, because the cost of the crust edge and box are relatively fixed while the pizza area scales with the square of the radius.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Round up, not down. A single extra pizza creates a pleasant surplus; ordering one short creates a problem that can't be fixed mid-event. The asymmetry of outcomes strongly favors over-ordering.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For meetings and office events, order based on normal appetite level -- people eat conservatively in professional settings. For sports events, bachelor parties, and anything happening after 9pm, use hungry.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The <Link href="/calculators/fun/coffee-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Coffee Calculator</Link> is a useful follow-on if you're catering a long event -- the caffeine timeline tells you when people will start declining and when to introduce dessert.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run the calculator before your next group order, then post the result ("the algorithm says 4 larges") and watch how many people argue with it. The gap between what people think you need and what you actually need is consistently interesting data.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Americans eat approximately 3 billion pizzas per year -- about 40 pizza orders per household annually. October is the highest-volume month (NFL season), and Friday is the highest-volume day of the week. The most popular topping in the US is pepperoni, which appears on roughly 36% of all pizza orders.</p>
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
          <Link href="/calculators/fun/calories-in-beer" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍺</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Calories in Beer</p><p className="text-xs text-gray-400 mt-0.5">How bad is that pint, really?</p></div>
          </Link>
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
          </Link>
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
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
        intro={`Ordering pizza for a group is a social coordination problem disguised as a food decision. How many pizzas? What sizes? How many slices per person? These questions have real answers that prevent the twin disasters of running out of pizza (a social catastrophe) and having $80 worth of cold leftovers (a budgetary catastrophe, if a delicious one).

**Long-tail searches answered here:** pizza calculator for group ordering free online usa, how many pizzas to order calculator free tool, pizza slices per person calculator no signup, pizza order size calculator free usa, how many people does a large pizza feed calculator free, group pizza quantity calculator free online, how many pizzas for 10 people calculator usa free, pizza per person hungry vs snacking calculator free, kids party pizza quantity calculator usa free, office pizza order calculator per employee free, pizza for super bowl party calculator usa free, how many pizzas for a birthday party of 20 free, pizza ordering calculator by appetite size free, mixed pizza order calculator with different sizes free, leftover pizza prediction calculator free usa`}
        howItWorks={`The calculator uses average slice counts per pizza (8 for large, 6 for medium, 4 for small at most pizzerias), typical consumption rates (2-3 slices per adult in a meal context, 3-4 at a party where pizza is the main focus), and adjusts for appetite level and occasion type.`}
        tipsSection={`When in doubt, err toward one more pizza than you think you need. The asymmetry is clear: running out of pizza is a social problem; having extra pizza means tomorrow's lunch problem is already solved. Large pizzas always provide more area per dollar than small pizzas — the math consistently favors going bigger.`}
        conclusion={`Pizza ordering is a group decision with real stakes. The calculator gives you the math; the actual decisions about toppings, that one person's dietary restrictions, and whether to order garlic bread are social negotiations that remain outside the scope of any calculator.`}
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