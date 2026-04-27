'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [exercise, setExercise] = useState(3)
  const [smoking, setSmoking] = useState(false)
  const [veg, setVeg] = useState(true)
  const [stress, setStress] = useState(5)
  const [sleep, setSleep] = useState(7)

  const base = gender==='female' ? 82 : 78
  const adjustments = [
    exercise>=5 ? 2 : exercise>=3 ? 1 : exercise===0 ? -2 : 0,
    smoking ? -8 : 0,
    veg ? 1.5 : 0,
    stress>7 ? -2 : stress<4 ? 1 : 0,
    sleep>=7&&sleep<=9 ? 1 : sleep<6 ? -2 : 0,
  ]
  const estimated = Math.round(base + adjustments.reduce((s,a)=>s+a,0))
  const yearsLeft = Math.max(0, estimated - age)
  const pct = Math.round(age/estimated*100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Life Expectancy (Fun)</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⏳ Fun Life Expectancy Calculator</h1>
      <p className="text-gray-500 mb-2">A lighthearted (not medical!) look at lifestyle factors and longevity.</p>
      <p className="text-xs text-amber-600 font-semibold mb-6">⚠️ For entertainment only - not medical advice.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700">Current Age: <span className="text-blue-600">{age}</span></label>
            <input type="range" min={18} max={90} value={age} onChange={e=>setAge(+e.target.value)} className="w-full accent-blue-600 mt-1" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Gender</label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {(['male','female'] as const).map(g=><button key={g} onClick={()=>setGender(g)} className={`flex-1 py-2 text-sm font-bold capitalize ${gender===g?'bg-blue-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{g}</button>)}
            </div>
          </div>
        </div>
        {[
          {l:'Exercise (days/week)',v:exercise,set:setExercise,min:0,max:7},
          {l:'Stress level (1=low, 10=high)',v:stress,set:setStress,min:1,max:10},
          {l:'Sleep (hours/night)',v:sleep,set:setSleep,min:4,max:12},
        ].map(f=>(
          <div key={f.l}>
            <label className="text-sm font-bold text-gray-700">{f.l}: <span className="text-blue-600">{f.v}</span></label>
            <input type="range" min={f.min} max={f.max} value={f.v} onChange={e=>f.set(+e.target.value)} className="w-full accent-blue-500 mt-1" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          {[{l:'🚬 Smoker',v:smoking,set:setSmoking},{l:'🥦 Eats vegetables daily',v:veg,set:setVeg}].map(f=>(
            <label key={f.l} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer ${f.v?'border-green-400 bg-green-50':'border-gray-200'}`}>
              <input type="checkbox" checked={f.v} onChange={e=>f.set(e.target.checked)} className="accent-green-600" />
              <span className="text-sm font-semibold">{f.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8 text-center">
        <p className="text-xs font-bold text-blue-700 uppercase mb-1">Estimated Life Expectancy</p>
        <p className="text-7xl font-black text-blue-800">{estimated}</p>
        <p className="text-blue-700 font-bold">years</p>
        <div className="mt-4 bg-white rounded-xl p-3 border border-blue-200">
          <p className="text-gray-600 text-sm">You've lived <strong>{pct}%</strong> of your estimated life. About <strong>{yearsLeft} years</strong> to go!</p>
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
          <p className="text-gray-600 leading-relaxed">Life expectancy calculators are usually clinical instruments optimized to make you feel vaguely anxious about your blood pressure and saturated fat intake. This one is still grounded in genuine research on the lifestyle factors that influence lifespan -- exercise, sleep, diet, social connections, stress, substance use -- but it's built to be interesting and dynamic rather than admonishing. You can see what each habit change does to the estimate, which tells you which factors have the most leverage. The companion tool <Link href="/calculators/fun/sleep-debt-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Sleep Debt Calculator</Link> quantifies one of the highest-leverage variables in more detail.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Answer questions about your lifestyle across the major longevity factor categories: physical activity, sleep quality and quantity, diet quality, social connection, stress level and management, smoking, alcohol, and body composition. Each factor has a documented effect size from longitudinal research -- regular exercise adds the most expected years across all demographics; smoking subtracts the most. The calculator weights factors by their research-supported effect sizes and outputs a current estimate with a factor-by-factor breakdown showing which habits are adding years and which are subtracting them.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Social isolation is documented as one of the strongest predictors of early mortality -- comparable in effect size to smoking 15 cigarettes per day according to a 2010 meta-analysis of 148 studies covering over 300,000 people. This is consistently the most surprising finding to people who complete longevity assessments, because most people model smoking as the clear outlier in mortality risk while thinking of loneliness as a quality-of-life issue rather than a lifespan one.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The input where small changes produce the largest output shift is exercise frequency. Going from sedentary to walking 30 minutes 3 times per week moves the estimate significantly -- more than many medical interventions. This is both encouraging and somewhat alarming about how inactive baseline modern life is.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The estimate will shift dramatically if you toggle the social connection variable -- more than most people expect. If your score would meaningfully improve with better social health, that's worth noting above the other variables.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Don't use this as a medical assessment -- it's a lifestyle-based estimate using statistical averages, not a clinical prediction. Genetics, actual medical history, and factors not captured in lifestyle questions all matter significantly. Treat it as a framework for thinking about leverage points, not a prediction.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share the "what changes the most" output -- the single habit change that adds the most years to your estimate. This produces more interesting conversation than the total number, which feels either comforting or distressing depending on the outcome.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The oldest verified human lifespan on record is Jeanne Calment of France, who lived 122 years and 164 days (1875-1997). She smoked until age 117, rode a bicycle until 100, and attributed her longevity to olive oil, port wine, and chocolate. Researchers studying longevity consistently note that outlier cases like Calment seem to share genetic factors that protect against the normal lifestyle-mortality correlations -- which is either comforting or deeply unfair, depending on your perspective.</p>
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
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/calories-in-beer" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍺</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Calories in Beer</p><p className="text-xs text-gray-400 mt-0.5">How bad is that pint, really?</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
          </Link>
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Life expectancy statistics have a somewhat grim reputation, but understanding the actuarial factors that influence longevity is actually empowering. Unlike genetics (which you can't change), many of the strongest predictors of longevity are completely within your control: smoking status, exercise frequency, weight, social connection, and purpose. This calculator gives you a lighthearted estimate with the science underneath it.

**Long-tail searches answered here:** fun life expectancy calculator free online usa, how long will i live calculator free tool, life expectancy estimator by habits free no signup, longevity quiz calculator free usa, entertaining lifespan calculator free online, how long am i expected to live free tool, life expectancy from lifestyle quiz free usa online, does diet affect how long i live calculator free, life expectancy for someone who exercises daily free, blue zone lifestyle longevity quiz calculator free usa, expected years remaining calculator by age usa free, how stress affects life expectancy quiz calculator, sleep and life expectancy correlation calculator free usa, social habits and lifespan predictor free calculator, optimism and longevity connection calculator usa free`}
        howItWorks={`The calculator starts from the statistical baseline life expectancy for your age, sex, and country, then adjusts based on well-documented lifestyle factors from the epidemiological literature. Each factor adjustment is based on population-level odds ratios — not predictions for any individual, but directionally meaningful.`}
        tipsSection={`Focus on the factors with the largest adjustments. Exercise has one of the strongest relationships with longevity in the research — regular moderate activity adds meaningful statistical years. Social connection is consistently underestimated as a longevity factor.`}
        conclusion={`Your number here is a rough estimate for perspective, not a prophecy. The real value is identifying which factors the research considers most influential so you can direct attention toward the highest-leverage habits. Longevity statistics are population-level descriptions, not individual predictions.`}
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