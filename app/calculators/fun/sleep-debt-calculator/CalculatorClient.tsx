'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const IDEAL = 8

export default function CalculatorClient({ faqs }: Props) {
  const [sleepHours, setSleepHours] = useState([6,6,7,6,5,8,9])
  const [targetHours, setTargetHours] = useState(8)

  const totalSlept = sleepHours.reduce((s,h)=>s+h,0)
  const totalTarget = targetHours * 7
  const debt = Math.max(0, totalTarget - totalSlept)
  const surplus = Math.max(0, totalSlept - totalTarget)
  const avg = (totalSlept / 7).toFixed(1)

  const grade = debt>10?{l:'Severe Sleep Debt 😴',c:'text-red-600',bg:'bg-red-50 border-red-300'}:debt>5?{l:'Moderate Sleep Debt 😪',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'}:debt>0?{l:'Mild Sleep Debt 😊',c:'text-yellow-600',bg:'bg-yellow-50 border-yellow-300'}:{l:'Well Rested! 🌟',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Sleep Debt Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">😴 Sleep Debt Calculator</h1>
      <p className="text-gray-500 mb-6">Track how much sleep you owe your body this week. Your bed thanks you for caring.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700">Sleep goal per night: <span className="text-blue-600 font-black">{targetHours}h</span></label>
          <input type="range" min={6} max={10} step={0.5} value={targetHours} onChange={e=>setTargetHours(+e.target.value)} className="w-full accent-blue-600 mt-1" />
        </div>
        <div className="space-y-2">
          {DAYS.map((day,i)=>(
            <div key={day} className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 w-12">{day.slice(0,3)}</span>
              <input type="range" min={0} max={12} step={0.5} value={sleepHours[i]}
                onChange={e=>{const n=[...sleepHours];n[i]=+e.target.value;setSleepHours(n)}} className="flex-1 accent-blue-500" />
              <span className={`text-sm font-black w-10 text-right ${sleepHours[i]<targetHours?'text-red-600':sleepHours[i]>targetHours?'text-green-600':'text-gray-700'}`}>{sleepHours[i]}h</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl p-6 border-2 mb-4 ${grade.bg}`}>
        <div className="flex items-center justify-between mb-2">
          <p className={`font-black text-xl ${grade.c}`}>{grade.l}</p>
          <p className="text-xs text-gray-500">Avg: {avg}h/night</p>
        </div>
        {debt>0
          ? <p className="text-gray-700">You owe your body <strong>{debt.toFixed(1)} hours</strong> of sleep this week. That's {(debt/8).toFixed(1)} full nights!</p>
          : <p className="text-gray-700">Excellent! You have a <strong>{surplus.toFixed(1)} hour</strong> sleep surplus. Keep it up! 🎉</p>
        }
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[['Total Slept',`${totalSlept.toFixed(1)}h`],['Target',`${totalTarget}h`],['Sleep Debt',debt>0?`${debt.toFixed(1)}h`:'None! v']].map(([l,v])=>(
          <div key={l as string} className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{l}</p>
            <p className="font-black text-gray-900">{v}</p>
          </div>
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
          <p className="text-gray-600 leading-relaxed">Sleep debt is cumulative and real -- it accumulates the way credit card debt does, and the cognitive consequences compound similarly. This calculator takes your actual sleep log for the past week and shows you exactly how many hours of debt you've built, what that level of deficit does to your cognitive performance, and how long recovery actually takes (the answer is longer than most people hope). The connection between sleep and productivity is direct enough that your <Link href="/calculators/fun/procrastination-score" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Procrastination Score</Link> often improves meaningfully after a week of adequate sleep -- worth checking both.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your estimated sleep need (most adults need 7-9 hours; the calculator helps you estimate yours if you're not sure) and your actual nightly sleep hours for the past 7 days. It calculates your weekly deficit, the performance impairment equivalent, and a recovery timeline. It also assesses whether your weekend sleep pattern (sleeping significantly longer on weekends) is actually clearing debt or just masking it through "social jet lag."</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">A landmark study from the University of Pennsylvania had participants sleep 6 hours per night for two weeks. Their cognitive performance declined to the level equivalent of going 24 hours without sleep. Critically -- and this is the part people find hardest to believe -- the participants rated themselves as "only slightly sleepy." The sleep-deprived subjects had lost the ability to accurately assess their own impairment. You can't tell when you're cognitively impaired by sleep debt because the impairment affects the assessment itself.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Consistent wake time matters more than consistent bedtime for sleep quality and debt management. Your body clock anchors primarily to light and wake time. Go to bed earlier when you need more sleep; keep the alarm consistent.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The "weekend recovery" strategy works to a degree -- you can recover modest amounts of sleep debt on weekends. But it doesn't work if the debt is large (more than 10+ hours), and it introduces social jet lag (your body clock shifts to the later sleep schedule) that impairs Monday performance.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Caffeine masks sleep debt without addressing it. The coffee you're using to function is not fixing the underlying impairment -- it's blocking the adenosine receptors that make you feel sleepy while the impairment remains. The <Link href="/calculators/fun/coffee-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Coffee Calculator</Link> is worth running alongside your sleep debt score if caffeine is a significant part of your daily pattern.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Track your actual sleep for one week (not your intended sleep, your actual sleep -- get the times from your phone's usage history if you're not sure when you fell asleep) and run the real numbers. The gap between what you think you sleep and what you actually sleep is the most useful output of this tool.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Sleep debt cannot be fully repaid after extended periods of deprivation. Research shows that while some cognitive recovery occurs after catch-up sleep, reaction time and working memory do not fully return to baseline in individuals who sustained weeks of mild sleep restriction. This is the argument against "I'll sleep when I'm dead" as a productivity philosophy -- the evidence suggests you'll just be progressively worse at everything in the meantime.</p>
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
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
          </Link>
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
          </Link>
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/calories-in-beer" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍺</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Calories in Beer</p><p className="text-xs text-gray-400 mt-0.5">How bad is that pint, really?</p></div>
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
        intro={`Sleep debt is real — it accumulates when you sleep less than your body needs, and it carries real physiological and cognitive costs. Unlike financial debt, you can't repay sleep debt dollar-for-dollar over one weekend: chronic sleep restriction creates changes in immune function, metabolism, and cognitive performance that take weeks of adequate sleep to fully reverse, not a single long Saturday morning.

**Long-tail searches answered here:** sleep debt calculator free online usa, how much sleep debt do i have calculator free, accumulated sleep deficit calculator no signup, am i sleep deprived calculator free tool usa, total sleep debt estimator free online, how many hours of sleep debt do i owe calculator free, weekly sleep debt accumulation calculator free usa, how long to pay back sleep debt calculator free, sleep debt impact on performance calculator free, microsleep risk from sleep debt calculator usa free, cognitive impairment level from sleep debt free, sleep debt and weight gain risk calculator usa free, how to reduce sleep debt fastest calculator free, nap effectiveness for sleep debt calculator free usa, chronic sleep debt health effects score free online`}
        howItWorks={`The calculator estimates your cumulative sleep debt based on your typical nightly sleep versus your estimated need (7-9 hours for most adults, determined by the age-stratified recommendations), across your chosen timeframe. It then describes the cognitive and physiological implications of that debt level.`}
        tipsSection={`The most effective way to address accumulated sleep debt is gradual improvement in baseline sleep time rather than weekend recovery binges. Adding 30-45 minutes of sleep per night consistently is more effective than sleeping 12 hours on Saturday.`}
        conclusion={`Sleep debt is one of the few health deficits where the fix is completely free and you'll feel better almost immediately. The awareness of an accumulated deficit — made visible by the calculator — is sometimes the nudge that people need to prioritize sleep over other competing demands for their evening hours.`}
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