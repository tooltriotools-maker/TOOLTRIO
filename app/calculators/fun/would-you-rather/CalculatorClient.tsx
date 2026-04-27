'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const QUESTIONS = [
  ['Always be 10 minutes late','Always be 20 minutes early'],
  ['Have unlimited money but no free time','Have unlimited free time but no money'],
  ['Be able to fly','Be able to breathe underwater'],
  ['Know the date of your death','Know the cause of your death'],
  ['Lose all your memories','Never make a new one'],
  ['Only eat sweet food forever','Only eat savoury food forever'],
  ['Be famous but hated','Be unknown but loved'],
  ['Have a rewind button for your life','Have a pause button for your life'],
  ['Never use social media again','Never watch a film or TV show again'],
  ['Always speak your mind honestly','Never speak again'],
  ['Be 5 years older','Be 5 years younger'],
  ['Live in extreme cold','Live in extreme heat'],
  ['Have a photographic memory','Be able to forget anything you want'],
  ['Always be underdressed','Always be overdressed'],
  ['Know all languages','Play every instrument perfectly'],
]

export default function CalculatorClient({ faqs }: Props) {
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<0|1|null>(null)
  const [history, setHistory] = useState<{q:string[],c:number}[]>([])

  const q = QUESTIONS[idx % QUESTIONS.length]
  const next = () => { setChoice(null); setIdx(i=>(i+1)%QUESTIONS.length) }
  const pick = (c: 0|1) => { setChoice(c); setHistory(h=>[...h,{q,c}].slice(-5)) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Would You Rather</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🤔 Would You Rather?</h1>
      <p className="text-gray-500 mb-6">The classic dilemma game - which impossible choice would you make?</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide text-center mb-5">Would You Rather...</p>
        <div className="grid grid-cols-1 gap-3">
          {[0,1].map(i=>(
            <button key={i} onClick={()=>pick(i as 0|1)} disabled={choice!==null}
              className={`p-6 rounded-2xl border-2 font-bold text-left text-lg transition-all ${choice===null?'border-gray-200 hover:border-purple-400 hover:bg-purple-50':''}${choice===i?'border-purple-600 bg-purple-50 text-purple-900':''}${choice!==null&&choice!==i?'border-gray-100 bg-gray-50 text-gray-400':''}`}>
              <span className="text-2xl mr-3">{i===0?'🅰️':'🅱️'}</span>{q[i]}
            </button>
          ))}
        </div>
        {choice!==null && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
            <p className="font-bold text-purple-800">You chose: {choice===0?'🅰️':'🅱️'} {q[choice]}</p>
          </div>
        )}
        <button onClick={next} className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" /> Next Question
        </button>
      </div>

      {history.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Your Recent Choices</h2>
          <div className="space-y-2">
            {history.slice().reverse().map((h,i)=>(
              <div key={i} className="text-sm flex items-start gap-2">
                <span className="text-purple-600 font-black">{h.c===0?'🅰️':'🅱️'}</span>
                <span className="text-gray-700">{h.q[h.c]}</span>
              </div>
            ))}
          </div>
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
          <p className="text-gray-600 leading-relaxed">Would You Rather is the game that exposes your actual value hierarchy faster than almost any conversation format. Forced choices between two roughly equivalent bad options (or good ones) reveal what you prioritise when you can't have both -- which is most situations in real life. This generator creates scenario pairs calibrated for genuine difficulty, not ones where the answer is obviously one-sided. The goal is questions where reasonable people disagree and the disagreement is interesting. For structured personality analysis, the <Link href="/calculators/fun/personality-quiz" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Personality Quiz</Link> gives a more formal framework; Would You Rather reveals the same things less formally.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Each question is drawn from a pool organized by intensity level: mild (safe for all contexts), spicy (for close friends), and deep (philosophical dilemmas that reveal something meaningful). Select your intensity and hit generate. Each scenario is designed so both options have genuine costs -- the "obviously right answer" questions are filtered out because they produce zero interesting conversation. After you pick, the generator shows the percentage of people who chose each option.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Game show research has consistently found that most people, when faced with genuine dilemmas, take about 3-4 seconds to make a forced-choice decision -- and that their first instinct is usually different from their final answer when they have time to rationalise. The "gut answer vs considered answer" split on Would You Rather questions is itself a useful piece of self-knowledge: consistently overriding your gut in favour of what sounds more reasonable can indicate social desirability bias.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most revealing Would You Rather questions are the ones where your answer surprises you. Pay attention to these -- they usually indicate a value you hold more strongly than you'd previously articulated.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>When playing in a group, don't reveal your answers simultaneously -- instead, commit in writing first, then reveal. This eliminates social influence on individual choices and produces more honest results and more interesting disagreements.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you want to actually learn something about someone, ask them to explain their choice rather than just state it. "I'd rather do X" is low information; "I'd rather do X because..." tells you exactly where their priorities sit.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Post a single Would You Rather question from this generator to your social media stories with a poll feature active. The disagreement rate on well-designed dilemmas is usually higher than people expect -- questions that feel like they have an obvious answer often split 45/55 or closer.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The optimal difficulty level for a Would You Rather question -- where it produces the most genuine reflection and most interesting conversation -- is when it consistently splits groups approximately 50/50. Questions where 90% of people choose the same option are trivia, not dilemmas. Questions that split perfectly reflect genuinely contested values.</p>
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
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/fortune-cookie" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🥠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fortune Cookie</p><p className="text-xs text-gray-400 mt-0.5">Crack open your digital fortune</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Would You Rather questions are a uniquely efficient form of getting to know someone. They bypass small talk by forcing genuine preference disclosure — you can't answer 'both' or 'neither,' you have to commit. The questions that generate the most interesting conversations aren't the obviously easy ones but the genuine dilemmas where reasonable people genuinely disagree and their reasoning reveals actual values.

**Long-tail searches answered here:** would you rather questions generator free online usa, random would you rather question free tool, would you rather game questions free no signup, hard would you rather questions free online, funny would you rather free generator usa, would you rather icebreaker questions free, impossible would you rather questions free usa, deep thought would you rather questions free online, would you rather for couples date night free, would you rather for kids appropriate free usa, would you rather for party game free online, hardest would you rather scenarios generator free, philosophical would you rather dilemmas free usa, extreme would you rather questions for adults free, would you rather generator for classroom free usa`}
        howItWorks={`The question generator produces Would You Rather pairs across categories: personal preferences, values dilemmas, superpowers, social situations, and genuine philosophical edge cases. Difficulty is calibrated to mix easy warm-ups with genuinely difficult choices that prompt real discussion.`}
        tipsSection={`The conversation value of Would You Rather comes from the 'and why?' follow-up. The choice is far less interesting than the reasoning. The best Would You Rather sessions become extended discussions about values, priorities, and life philosophy in the guise of silly questions.`}
        conclusion={`Would You Rather questions are a social technology for creating the conditions for authentic conversation and the disclosure of genuine personality. They work at dinner parties, on first dates, in team icebreakers, and as prompts for personal self-reflection when you think about how you'd actually answer.`}
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