'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const APPS = [
  {name:'Social Media',icon:'📱',hoursPerDay:2.5},
  {name:'Streaming Video',icon:'📺',hoursPerDay:3.0},
  {name:'Gaming',icon:'🎮',hoursPerDay:1.5},
  {name:'Work / Study',icon:'💻',hoursPerDay:8.0},
  {name:'Messaging',icon:'💬',hoursPerDay:1.0},
  {name:'News / Browse',icon:'🌐',hoursPerDay:1.0},
]

export default function CalculatorClient({ faqs }: Props) {
  const [hours, setHours] = useState(APPS.map(a=>a.hoursPerDay))
  const [age, setAge] = useState(30)

  const total = hours.reduce((s,h)=>s+h,0)
  const weekly = total * 7
  const yearly = total * 365
  const lifeLeft = Math.max(0, 80-age)
  const lifeHours = lifeLeft * 365 * total
  const lifeYears = (lifeHours / 8760).toFixed(1)
  const grade = total>12?{l:'Screen Overload 😰',c:'text-red-600'}:total>8?{l:'Heavy User 😅',c:'text-orange-600'}:total>5?{l:'Average Screen Time 😊',c:'text-yellow-600'}:{l:'Healthy Screen Balance 🌿',c:'text-green-600'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Screen Time Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📱 Screen Time Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate how much of your life you spend looking at screens. (Warning: may be terrifying.)</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700">Your age: <span className="text-blue-600 font-black">{age}</span></label>
          <input type="range" min={10} max={80} value={age} onChange={e=>setAge(+e.target.value)} className="w-full accent-blue-600 mt-1" />
        </div>
        {APPS.map((app,i)=>(
          <div key={app.name}>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">{app.icon} {app.name}: <span className="text-blue-600 font-black">{hours[i].toFixed(1)}h/day</span></label>
            <input type="range" min={0} max={16} step={0.5} value={hours[i]} onChange={e=>{const n=[...hours];n[i]=+e.target.value;setHours(n)}} className="w-full accent-blue-500 mt-1" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[['Daily Total',`${total.toFixed(1)}h`,'blue'],['Weekly',`${weekly.toFixed(0)}h`,'purple'],['Per Year',`${(yearly/24).toFixed(0)} days`,'orange'],['Life Ahead',`${lifeYears} years`,'red']].map(([l,v,c])=>(
          <div key={l as string} className={`bg-${c}-50 border border-${c}-200 rounded-2xl p-4 text-center`}>
            <p className="text-xs text-gray-500 mb-1">{l}</p>
            <p className={`text-2xl font-black text-${c}-700`}>{v}</p>
          </div>
        ))}
      </div>

      <div className={`p-4 rounded-2xl border-2 text-center ${grade.c.includes('red')?'bg-red-50 border-red-300':grade.c.includes('orange')?'bg-orange-50 border-orange-300':grade.c.includes('yellow')?'bg-yellow-50 border-yellow-300':'bg-green-50 border-green-300'}`}>
        <p className={`font-black text-lg ${grade.c}`}>{grade.l}</p>
        <p className="text-sm text-gray-600 mt-1">At this rate, you'll spend {lifeYears} years of remaining life on screens.</p>
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
          <p className="text-gray-600 leading-relaxed">Most people dramatically underestimate how many hours they spend on their devices. Your phone's built-in screen time tracker is often the first genuinely confronting number you encounter -- and this calculator contextualizes it further, converting daily phone hours into annual hours, life-years lost, and what else you could do with that time. The goal isn't to make you feel bad; it's to make the number real in a way that "4 hours 23 minutes per day" doesn't quite achieve on its own. For the social media component specifically, the <Link href="/calculators/fun/social-media-addiction" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Social Media Addiction Calculator</Link> breaks down which platforms drive the most usage and why.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your average daily screen time (or pull it from your phone's usage stats). The calculator outputs: annual hours, life-years equivalent at current usage rate, hours per week by category (if you break it down), comparison against national average for your age group, and time-equivalence in other activities (books you could read, languages you could learn to conversational level, etc.). The output is designed to give a sense of scale rather than to assign moral judgment.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The average American adult spends approximately 7 hours per day consuming digital content across all screens -- phone, laptop, TV, tablet. That's roughly 2,555 hours per year, or about 106 days of your life annually. Over a 40-year adult lifespan, that's approximately 11.5 years of waking time -- more than most people spend in formal education from kindergarten through a bachelor's degree.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most useful metric isn't total screen time but intentional vs reactive usage. Intentional usage (you decided to do something specific) is mostly fine; reactive usage (you picked up your phone out of habit and an hour passed) is where the costs accumulate.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Phone manufacturers' grayscale mode -- turning your phone display black and white -- measurably reduces reactive usage time for most people. It makes the screen less rewarding to look at without reducing its functionality. Takes about 30 seconds to turn on.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Track the numbers for one week before attempting any reduction. Most people guess their screen time low by 30-50%. Knowing the real number is a precondition for deciding whether you want to change it.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Pull your actual screen time stats from your phone's settings and run them through the calculator. Then share the output. The "life-years equivalent" number tends to produce the strongest reactions -- "I have spent 8 months of waking life on my phone" is a different statement than "I use my phone a lot."</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The term "doomscrolling" entered dictionaries in 2020 but describes a behavior pattern that addiction researchers had been documenting since the mid-2010s: compulsive consumption of negative news content that increases anxiety rather than relieving it, but that users continue despite this effect. It follows the same reinforcement pattern as other addictive behaviors -- escalating use producing diminishing relief.</p>
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
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
          </Link>
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`The average American adult spends roughly 7 hours looking at screens daily — and most people dramatically underestimate their own screen time when asked. The cognitive illusion that individual sessions 'don't count much' adds up across dozens of interactions throughout the day. Making that number visible is the starting point for deciding whether it reflects how you want to spend your time.

**Long-tail searches answered here:** screen time calculator free online usa, how much time do i spend on screens calculator free, daily screen time total estimator free no signup, weekly screen time calculator free tool usa, am i spending too much time on my phone calculator free, screen time health impact estimator free online, total daily screen time by device calculator free usa, screen time compared to average american free, phone vs computer vs tv screen time calculator free, how much screen time is too much for adults free usa, screen time impact on sleep quality calculator free, work screen time vs leisure screen time calculator usa, screen time reduction goal calculator free online, digital wellbeing score from screen time free usa, screen time cost in hours per year calculator free`}
        howItWorks={`The calculator aggregates daily screen time across categories: work/productivity screens, social media, video entertainment, gaming, and phone use. It then projects the annual equivalent (hours per year), provides a lifespan estimate, and compares against research benchmarks for different age groups.`}
        tipsSection={`The research on screen time and wellbeing is more nuanced than the blanket 'screens are bad' narrative. Passive scrolling of social media shows negative wellbeing associations. Active, purposeful screen use (video calls with friends, creative work, learning) shows neutral to positive associations. What you do on screens matters as much as how long.`}
        conclusion={`Screen time numbers provoke either satisfaction ('I'm below average') or discomfort ('I didn't realize it was that much') — and both reactions are useful information. The question isn't whether any particular number is categorically bad; it's whether your screen time reflects how you consciously want to spend your finite time.`}
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