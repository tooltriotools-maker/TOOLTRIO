'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const Qs = [
  {q:'How many times do you check your phone per hour?',opts:['0-2','3-5','6-10','10+ (it\'s basically attached to me)'],s:[0,2,5,10]},
  {q:'You sit down for dinner. What happens?',opts:['Phone stays away','Phone nearby but ignored','Quick check at start','Phone on table, constant checks'],s:[0,2,5,10]},
  {q:'How long after waking do you check social media?',opts:['Never in first hour','1 hour+','30 min','First thing'],s:[0,2,5,10]},
  {q:'You feel anxious if you leave your phone at home?',opts:['Not at all','Slightly','Quite nervous','Full panic'],s:[0,2,6,10]},
  {q:'How many platforms do you post on regularly?',opts:['0-1','2-3','4-5','6+ (I lose count)'],s:[0,2,5,10]},
]

export default function CalculatorClient({ faqs }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(Qs.length).fill(-1))
  const [done, setDone] = useState(false)

  const answered = answers.filter(a=>a>=0).length
  const score = answers.reduce((s,a,i)=>s+(a>=0?Qs[i].s[a]:0),0)
  const max = Qs.reduce((s,q)=>s+Math.max(...q.s),0)
  const pct = Math.round(score/max*100)

  const grade = pct>=80?{l:'Extreme Digital Dependency 🚨',c:'text-red-600',d:'Social media has become a core part of your nervous system. A digital detox is overdue.'}:pct>=60?{l:'Heavy User ⚠️',c:'text-orange-600',d:'Social media significantly shapes your daily routine. Consider scheduled phone-free time.'}:pct>=40?{l:'Moderate User 🟡',c:'text-yellow-600',d:'You use social media frequently but have some healthy boundaries. Keep working on them!'}:{l:'Healthy Relationship 🌿',c:'text-green-600',d:'You use social media mindfully. Your attention span is probably still intact - good work!'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Social Media Addiction Score</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📱 Social Media Addiction Test</h1>
      <p className="text-gray-500 mb-6">How dependent are you on social media? Answer honestly - your screen time already knows the truth.</p>

      {!done ? (
        <div className="space-y-4">
          {Qs.map((q,qi)=>(
            <div key={qi} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3">{qi+1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt,oi)=>(
                  <label key={oi} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${answers[qi]===oi?'border-pink-500 bg-pink-50':'border-gray-100 hover:border-pink-300'}`}>
                    <input type="radio" name={`q${qi}`} onChange={()=>setAnswers(a=>{const n=[...a];n[qi]=oi;return n})} checked={answers[qi]===oi} className="accent-pink-600" />
                    <span className="text-sm font-semibold text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={()=>setDone(true)} disabled={answered<Qs.length}
            className={`w-full py-4 font-black rounded-2xl text-lg ${answered===Qs.length?'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90':'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            {answered<Qs.length?`${Qs.length-answered} more to go...`:'See My Score!'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 text-center">
            <p className="text-7xl font-black text-gray-800">{pct}<span className="text-3xl">%</span></p>
            <p className={`text-xl font-black mt-2 ${grade.c}`}>{grade.l}</p>
            <p className="text-gray-600 text-sm mt-3">{grade.d}</p>
          </div>
          <button onClick={()=>{setAnswers(Array(Qs.length).fill(-1));setDone(false)}} className="w-full py-3 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">Retake Quiz</button>
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
          <p className="text-gray-600 leading-relaxed">Social media companies employ entire teams of behavioral engineers whose job is to make their apps as engaging as possible. This isn't a conspiracy -- it's in every quarterly report. The Bergen Social Media Addiction Scale, used in academic research, provides a clinical framework for measuring where heavy use tips into problematic use. This quiz scores you across the six Bergen dimensions and identifies which platforms and drivers are contributing most to your score. The companion tool <Link href="/calculators/fun/screen-time-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Screen Time Calculator</Link> gives the raw time numbers; this one gives you the behavioral pattern underneath them.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Answer 18 questions across six dimensions: salience (does social media dominate your thinking?), mood modification (do you use it to change how you feel?), tolerance (do you need more time to get the same effect?), withdrawal (do you feel bad when you can't access it?), conflict (does it cause problems in other parts of your life?), and relapse (do you keep returning despite attempts to cut back?). High scores on three or more dimensions meet the clinical research threshold for problematic use. The output includes which platforms contribute most and specific, non-generic recommendations.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">TikTok's recommendation algorithm is widely studied as the most effective engagement-maximizing system ever built for a mass consumer app. Unlike Facebook or Instagram, which initially showed content from accounts you follow, TikTok's algorithm starts with zero social graph and builds a preference model purely from behavior -- it knows what you're interested in before you do, because it watches what percentage of each video you watch and how quickly you scroll away. This "cold start" capability is what makes it significantly more sticky than previous platforms.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Identify your top scoring dimension before attempting to change behavior. Salience (constant thinking about social media) responds to different interventions than tolerance (needing increasing time). The fix for each dimension is genuinely different.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most effective behavioral intervention for problematic social media use is not willpower but friction: remove apps from your home screen, require two-step authentication, turn off all notifications, and charge your phone in a different room. Each friction point reduces usage by 5-15%.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your <Link href="/calculators/fun/procrastination-score" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Procrastination Score</Link> and social media addiction score are often correlated -- social media serves as a primary avoidance tool for many people. Fixing one usually requires addressing the other.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Take the quiz and share your dominant dimension type (not necessarily your score -- the label is more interesting than the number). "My primary driver is mood modification" says something specific about why you use social media that total hours per day doesn't.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The engineers who build recommendation systems at major tech companies are, statistically, significantly less likely to use social media heavily themselves than the average user. Studies of tech company employees show above-average rates of app deletion, time limits, and phone-free periods. The people who build the engagement systems tend not to use them the way the systems want them to.</p>
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
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
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
        intro={`Social media addiction shares neurological mechanisms with other behavioral addictions: variable reward schedules (sometimes a post gets lots of engagement, sometimes nothing), social validation loops, and FOMO-driven compulsive checking. Platforms are explicitly designed to maximize time-on-app using these psychological mechanisms. Recognizing that the design is working on you is different from blaming yourself for using it.

**Long-tail searches answered here:** social media addiction test free online usa, am i addicted to social media quiz free, social media dependency score calculator free no signup, how addicted to my phone am i quiz free usa, social media overuse test free online tool, smartphone addiction quiz free no account, instagram addiction score free online test usa, tiktok addiction level calculator free no signup, how many hours on social media is too much free, social media detox readiness quiz free usa, digital addiction quiz all apps combined free, social media use vs average american comparison free, doomscrolling habit severity quiz free online usa, fomo and social media addiction connection quiz free, social media anxiety and addiction combined test free usa`}
        howItWorks={`The assessment evaluates behavioral indicators associated with problematic social media use: frequency and compulsivity of checking, mood effects when unable to access, impact on sleep and real-world relationships, and tolerance (needing more time online to get the same satisfaction). It's based on behavioral addiction screening criteria adapted for social media use.`}
        tipsSection={`Practical interventions that reduce habitual social media use: turn off all notifications except direct messages, remove apps from your phone home screen (this small friction meaningfully reduces impulsive opening), designate phone-free times and places, and use screen time limits to create awareness.`}
        conclusion={`Social media use exists on a spectrum from healthy and intentional to genuinely compulsive and harmful. The assessment helps you identify where on that spectrum your use falls. If it's interfering with sleep, real-world relationships, or work, the interference is worth addressing — regardless of how normalized the behavior feels because everyone around you does it too.`}
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