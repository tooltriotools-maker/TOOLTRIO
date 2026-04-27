'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const QUESTIONS = [
  {q:'How many browser tabs do you have open right now?',opts:['0-5 (I am organised)','6-20 (healthy chaos)','21-50 (this is fine)','50+ (I cannot close them)'],scores:[0,2,5,10]},
  {q:'You have an important deadline tomorrow. You are currently...',opts:['Working on it','Taking a "quick" break','Watching "one more" video','Reading this (lol)'],scores:[0,3,7,10]},
  {q:'How often do you say "I\'ll do it later" per day?',opts:['Rarely','2-5 times','5-10 times','It\'s my motto'],scores:[0,2,6,10]},
  {q:'Your email inbox has...',opts:['Under 10 unread','Under 100','Hundreds','I stopped counting'],scores:[0,2,6,10]},
  {q:'When you start a task, you typically...',opts:['Finish it in one sitting','Take breaks but finish','Half-finish and revisit it','Start 3 new tasks instead'],scores:[0,2,5,10]},
]

export default function CalculatorClient({ faqs }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1))
  const [submitted, setSubmitted] = useState(false)

  const answered = answers.filter(a=>a>=0).length
  const score = answers.reduce((sum,a,i)=>sum+(a>=0?QUESTIONS[i].scores[a]:0),0)
  const maxScore = QUESTIONS.reduce((s,q)=>s+Math.max(...q.scores),0)
  const pct = Math.round(score/maxScore*100)

  const grade = pct>=80?{l:'Champion Procrastinator 🏆',c:'text-red-600',d:'You are a master of the art. Deadlines fear you - but not enough to motivate you.'}:pct>=60?{l:'Advanced Procrastinator 😅',c:'text-orange-600',d:'You put the "pro" in procrastination. Impressive dedication to delay.'}:pct>=40?{l:'Casual Procrastinator 😊',c:'text-yellow-600',d:'You procrastinate situationally. Not a problem... probably.'}:{l:'Productivity Unicorn 🦄',c:'text-green-600',d:'Are you even human? Nobody gets things done this efficiently.'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Procrastination Score</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⏳ Procrastination Score Calculator</h1>
      <p className="text-gray-500 mb-6">Find out your procrastination level. (You can do it later... or now, I guess.)</p>

      {!submitted ? (
        <div className="space-y-4">
          {QUESTIONS.map((q,qi)=>(
            <div key={qi} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3">{qi+1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt,oi)=>(
                  <label key={oi} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${answers[qi]===oi?'border-purple-500 bg-purple-50':'border-gray-100 hover:border-purple-300'}`}>
                    <input type="radio" name={`q${qi}`} onChange={()=>setAnswers(a=>{const n=[...a];n[qi]=oi;return n})} checked={answers[qi]===oi} className="accent-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={()=>setSubmitted(true)} disabled={answered<QUESTIONS.length}
            className={`w-full py-4 font-black rounded-2xl text-lg transition-all ${answered===QUESTIONS.length?'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90':'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            {answered<QUESTIONS.length?`Answer ${QUESTIONS.length-answered} more question${QUESTIONS.length-answered!==1?'s':''}...`:'See My Score!'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 text-center">
            <p className="text-xs font-bold text-purple-700 uppercase mb-2">Your Procrastination Score</p>
            <p className="text-7xl font-black text-purple-800">{pct}<span className="text-3xl">%</span></p>
            <p className={`text-xl font-black mt-2 ${grade.c}`}>{grade.l}</p>
            <p className="text-gray-600 text-sm mt-3">{grade.d}</p>
          </div>
          <button onClick={()=>{setAnswers(Array(QUESTIONS.length).fill(-1));setSubmitted(false)}}
            className="w-full py-3 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">
            Retake Quiz
          </button>
        </div>
      )}



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
          <p className="text-gray-600 leading-relaxed">Procrastination is not laziness -- that's the most important thing researchers in this area want people to understand. It's an emotion regulation strategy: you avoid the task because starting it produces anxiety, boredom, self-doubt, or some combination, and avoidance provides temporary relief. The problem is that the relief compounds the avoidance next time. This calculator scores your procrastination patterns across six clinical dimensions and identifies the specific type driving your behavior -- because "start earlier" is useless advice if the problem is anxiety, not time management. For a related measurement of screen-based avoidance, the <Link href="/calculators/fun/screen-time-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Screen Time Calculator</Link> often reveals where the time actually goes.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Answer questions across six dimensions drawn from validated procrastination research: task aversion (how much you dislike the task itself), temporal discounting (how heavily you weight immediate comfort over future benefit), self-efficacy (how confident you are you'll succeed), decisional avoidance (difficulty committing to approach), stimulus control (how well you've organised your environment to support work), and social comparison (how much others' apparent productivity affects you). Each dimension gets a score; the highest-scoring one is your primary driver.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Research by Dr. Timothy Pychyl at Carleton University (one of the leading procrastination researchers) found that students who procrastinated reported lower stress in the first weeks of a semester but significantly higher stress, illness, and lower grades by the end. The short-term stress relief of procrastination reliably produces long-term costs that are larger than the avoided short-term discomfort. The math doesn't work in procrastination's favour even when it feels like it does.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If your primary driver is task aversion, implementation intentions help most: "I will start the tax return at 9am on Saturday at the kitchen table" reduces avoidance more than "I should do my taxes soon." The specificity removes the decision-making that avoidance hides inside.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If your primary driver is temporal discounting (future reward feels unreal), work backward from the deadline and set visible intermediate milestones. Making future consequences feel concrete and close reduces discounting.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The <Link href="/calculators/fun/sleep-debt-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Sleep Debt Calculator</Link> is worth checking alongside your procrastination score -- sleep deprivation consistently amplifies all procrastination dimensions, particularly temporal discounting and self-efficacy. Fixing sleep sometimes fixes procrastination as a side effect.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share your score and your primary procrastination driver type with friends and compare. The driver-type distribution across a group is almost always surprising -- most people assume their friends procrastinate the same way they do, but the types vary considerably.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Academic procrastination is measured on validated scales in hundreds of peer-reviewed studies, which makes it one of the most thoroughly researched productivity problems in psychology. The irony of researchers spending decades studying procrastination is not lost on the field -- there are papers specifically about whether the field has procrastinated in translating findings into practical interventions.</p>
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
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
          </Link>
          <Link href="/calculators/fun/workout-excuse-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🏃</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Workout Excuse Generator</p><p className="text-xs text-gray-400 mt-0.5">Skip gym, guilt-free</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
          <Link href="/calculators/fun/coffee-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">☕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Coffee Calculator</p><p className="text-xs text-gray-400 mt-0.5">Caffeine cost & habit tracker</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Procrastination is not laziness — that's the most important thing the research on it has established. Procrastination is an emotion regulation strategy: people delay tasks primarily to avoid negative emotions associated with those tasks (anxiety, boredom, frustration, self-doubt) rather than because they can't be bothered. Understanding this reframes the solution. The problem isn't motivation; it's the emotional relationship with the task.

**Long-tail searches answered here:** procrastination test free online usa, am i a procrastinator quiz free no signup, procrastination score calculator free tool, how bad is my procrastination free quiz usa, procrastination assessment free online, procrastination tendency test free no account, academic procrastination score calculator free usa, chronic procrastinator vs occasional procrastinator quiz, work procrastination vs personal task procrastination free, procrastination triggers identification quiz free usa, why do i procrastinate personality quiz free, procrastination and anxiety connection quiz usa free, perfectionism based procrastination quiz free online, procrastination costing me calculator time money free usa, how to stop procrastinating quiz starter guide free`}
        howItWorks={`The procrastination assessment measures frequency, severity, and pattern across different task types. It distinguishes between active procrastination (deliberately delaying to work better under pressure — which some people do effectively) and passive procrastination (delaying due to indecision or avoidance — which is harmful). Your score reflects which type and severity applies to you.`}
        tipsSection={`The most evidence-based intervention for procrastination is implementation intentions: decide specifically when, where, and how you'll start a task ('I will start the report at 9am at my desk by opening the document') rather than just resolving to do it. The specificity significantly improves follow-through.`}
        conclusion={`Knowing your procrastination pattern is useful precisely because different patterns benefit from different interventions. Task-switching procrastinators need different strategies than perfectionist procrastinators. If this score resonates and procrastination is causing real problems in your life, Fuschia Sirois and Timothy Pychyl have written extensively on evidence-based interventions.`}
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