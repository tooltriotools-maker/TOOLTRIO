'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const EXCUSES = [
  "My gym clothes are in the wash. Both pairs. Even the emergency ones.","Mercury is in retrograde and my horoscope said to rest.","I read that overtraining is a real thing and I'm being responsible.","My muscles need a full week to recover from thinking about working out.","I'm saving my energy for when the apocalypse comes and I need to run.","My cat looked at me with those eyes and I had to stay home.","I did five squats getting out of bed - that counts.","The gym has mirrors everywhere and that's a whole thing for me.","I'm letting my body surprise me. Today it chose the sofa.","Scientifically speaking, rest IS part of training. I'm doing science.","My fitness tracker is charging and I refuse to exercise without credit.","I sneezed earlier. Clearly my body is fighting something. Doctor's orders: rest.","The stars, the moon, and my bones all say tomorrow is better.","I mentally prepared my workout for 45 minutes - same hormonal response, apparently.","Technically I'm doing negative reps right now. Advanced stuff.","Working out increases appetite and I just cleaned the kitchen.",
]

export default function CalculatorClient({ faqs }: Props) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random()*EXCUSES.length))
  const [copied, setCopied] = useState(false)
  const next = () => setIdx(i=>(i+1+Math.floor(Math.random()*(EXCUSES.length-1)))%EXCUSES.length)
  const copy = () => { navigator.clipboard.writeText(EXCUSES[idx]); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Workout Excuse Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🏋️ Workout Excuse Generator</h1>
      <p className="text-gray-500 mb-2">Skip the gym with style! Generate a perfectly crafted excuse for your laziness.</p>
      <p className="text-xs text-amber-600 font-semibold mb-6">⚠️ For laughs only. Please actually exercise sometimes!</p>

      <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 text-center mb-6">
        <p className="text-5xl mb-4">🛋️</p>
        <p className="text-xl leading-relaxed text-gray-800 font-semibold min-h-16 flex items-center justify-center">"{EXCUSES[idx]}"</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={next} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-black rounded-xl hover:opacity-90 shadow-lg">
            <RefreshCw className="w-4 h-4" /> New Excuse
          </button>
          <button onClick={copy} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-green-200 text-green-600 font-bold rounded-xl hover:bg-green-50">
            {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>} {copied?'Copied!':'Copy'}
          </button>
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
          <p className="text-gray-600 leading-relaxed">The gym will always be there. The specific, articulate excuse for not going today -- that takes creativity. This generator produces a fresh excuse every time: plausible, detailed, and delivered with enough conviction that you might actually believe it yourself. For genuinely tracking the time reclaimed from gym avoidance, the <Link href="/calculators/fun/screen-time-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Screen Time Calculator</Link> will show you exactly what you spent those hours on instead. And if you want to understand the behavioral mechanics of why you're avoiding exercise, your <Link href="/calculators/fun/procrastination-score" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Procrastination Score</Link> probably has the answer.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Select your excuse category: health-adjacent (you're protecting your body), weather-related (it's too something outside), scheduling (something genuinely came up), equipment-related (the machines are definitely broken), and philosophical (a deeper reason that suggests exercise is itself suspect). The generator combines a core excuse with supporting detail and a convincing closing statement. The more specific the excuse, the more plausible it sounds -- this is calibrated to produce excuses that feel airtight rather than obviously thin.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Exercise motivation research consistently finds that people who exercise for intrinsic reasons (they actually enjoy it or feel better afterward) maintain habits far longer than people who exercise for extrinsic reasons (appearance, weight, others' approval). The irony is that most exercise motivation content focuses entirely on extrinsic goals. People who run because they like running outperform people who run to lose weight at almost every metric over a 2-year period.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>A good excuse has three components: a reason, a consequence if you ignored it, and a resolution (you'll definitely go tomorrow, or next week, or after this thing resolves). The three-part structure makes it feel like a real decision rather than avoidance.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Weather excuses are most convincing when specific: "too hot" is weak; "it's 34°C and the air quality index is at a level my doctor specifically mentioned as problematic for cardio" is hard to argue with.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Use this generator before a conversation where you need to decline an invitation to exercise with someone else. Having an excuse prepared produces more confident delivery than improvising, which paradoxically makes it more convincing -- and more likely to be accepted without follow-up questions.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Post your best generated excuse before skipping a workout and ask people to rate how convincing it is on a scale of 1-10. Excuses rated 8 or above are worth saving for future use. The community will help you quality-control your avoidance strategies.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The concept of "rest days" was originally developed to give athletes recovery time but has since been adopted by recreational gym-goers as a catch-all justification for any unplanned rest. Interestingly, rest days are genuinely important -- muscles rebuild during rest, not during exercise. The challenge is distinguishing a planned recovery day from procrastination wearing athletic wear.</p>
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
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
          </Link>
          <Link href="/calculators/fun/calories-in-beer" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍺</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Calories in Beer</p><p className="text-xs text-gray-400 mt-0.5">How bad is that pint, really?</p></div>
          </Link>
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/pizza-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pizza Calculator</p><p className="text-xs text-gray-400 mt-0.5">Never under-order again</p></div>
          </Link>
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Everyone who exercises regularly has missed workouts. The difference between consistent exercisers and inconsistent ones isn't that consistent exercisers never feel like skipping — research shows they feel the same resistance. The difference is that they've developed systems and self-talk that make showing up the default even on low-energy days. This generator celebrates the creativity of excuse-making while poking fun at it.

**Long-tail searches answered here:** funny workout excuse generator free online usa, random gym excuse creator free no signup, hilarious reasons to skip gym generator free, funny exercise avoidance excuse free tool usa, creative gym skip excuse generator free online, workout skip excuse randomizer free tool, most relatable workout excuses list free usa, gym motivation vs excuse battle generator free, workout excuse for when its raining free usa, post holiday workout excuse generator free, monday gym dread excuse generator free usa, injury excuse for skipping gym generator free, funny but valid workout excuse generator free usa, classic gym excuses ranked free guide online, workout excuse generator for social media post free`}
        howItWorks={`The generator produces creative, specific, absurd workout excuses that reflect the actual repertoire of reasons people give themselves for not exercising. They're intended to be recognized — 'yes, that's exactly the kind of thing I tell myself' — and thereby defused through recognition.`}
        tipsSection={`The most effective antidote to workout excuses isn't willpower — it's reducing friction. Laying out workout clothes the night before, having a 10-minute minimum workout you'll do no matter what, and habit-stacking exercise with an existing daily habit eliminate most excuse-worthy resistance before it starts.`}
        conclusion={`If you recognized yourself in some of these excuses, good — that was the point. The first step in changing any automatic behavior is noticing it. Your workout excuses are a perfectly normal part of human motivation psychology; they're also completely defeatable with the right systems.`}
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