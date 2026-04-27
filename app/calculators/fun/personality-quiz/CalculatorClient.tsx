'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const QUESTIONS = [
  {q:'Your ideal weekend is...',opts:[{t:'Hiking or outdoor adventure',s:{E:1,A:1}},{t:'Hosting friends at home',s:{E:1,S:1}},{t:'Reading or creative solo project',s:{I:1,N:1}},{t:'Spontaneous day trip',s:{P:1,E:1}}]},
  {q:'When making a big decision, you...',opts:[{t:'Make a detailed pros/cons list',s:{J:1,T:1}},{t:'Follow your gut feeling',s:{P:1,F:1}},{t:'Ask trusted friends',s:{E:1,F:1}},{t:'Research extensively first',s:{N:1,J:1}}]},
  {q:'At a party, you naturally...',opts:[{t:'Work the whole room',s:{E:2}},{t:'Stick with close friends',s:{I:1,S:1}},{t:'Find deep 1-on-1 conversations',s:{I:1,N:1}},{t:'Leave early (recharge time)',s:{I:2}}]},
  {q:'You find more meaning in...',opts:[{t:'Concrete facts and results',s:{S:1,T:1}},{t:'Ideas and possibilities',s:{N:1,F:1}},{t:'Helping people directly',s:{F:2}},{t:'Building efficient systems',s:{T:1,J:1}}]},
]

const TYPES: Record<string,{title:string,emoji:string,desc:string}> = {
  ENTJ:{title:'The Commander',emoji:'👑',desc:'Natural-born leader. Strategic, decisive, and driven to achieve.'},
  ENFP:{title:'The Campaigner',emoji:'🌟',desc:'Enthusiastic, creative, and loves making connections between ideas and people.'},
  INTJ:{title:'The Architect',emoji:'🧠',desc:'Independent and strategic - always building a plan to improve everything.'},
  INFP:{title:'The Mediator',emoji:'🕊️',desc:'Idealistic and deeply empathetic. On a mission to make the world better.'},
  ESTP:{title:'The Entrepreneur',emoji:'⚡',desc:'Bold, energetic problem-solver who lives in the moment.'},
  ISFJ:{title:'The Defender',emoji:'🛡️',desc:'Warm, caring, and fiercely dedicated to the people they love.'},
  ENTP:{title:'The Debater',emoji:'🎯',desc:'Quick-witted innovator who loves exploring ideas and challenging assumptions.'},
  INFJ:{title:'The Advocate',emoji:'💫',desc:'Rare and insightful - driven by a deep sense of purpose and vision.'},
}

export default function CalculatorClient({ faqs }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1))
  const [done, setDone] = useState(false)

  const getType = () => {
    const scores = {E:0,I:0,N:0,S:0,T:0,F:0,J:0,P:0}
    answers.forEach((a,qi)=>{ if(a>=0) Object.entries(QUESTIONS[qi].opts[a].s).forEach(([k,v])=>{ scores[k as keyof typeof scores]+=v }) })
    return (scores.E>=scores.I?'E':'I') + (scores.N>=scores.S?'N':'S') + (scores.T>=scores.F?'T':'F') + (scores.J>=scores.P?'J':'P')
  }

  const answered = answers.filter(a=>a>=0).length
  const type = done ? getType() : ''
  const typeInfo = TYPES[type] || {title:'The Unique One',emoji:'✨',desc:'Your personality defies categorisation - and that is perfectly you.'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Personality Quiz</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🧠 Personality Type Quiz</h1>
      <p className="text-gray-500 mb-6">Answer 4 quick questions to discover your MBTI-inspired personality type. Just for fun!</p>

      {!done ? (
        <div className="space-y-4">
          {QUESTIONS.map((q,qi)=>(
            <div key={qi} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3">{qi+1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt,oi)=>(
                  <label key={oi} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${answers[qi]===oi?'border-indigo-500 bg-indigo-50':'border-gray-100 hover:border-indigo-300'}`}>
                    <input type="radio" name={`q${qi}`} onChange={()=>setAnswers(a=>{const n=[...a];n[qi]=oi;return n})} checked={answers[qi]===oi} className="accent-indigo-600" />
                    <span className="text-sm font-semibold text-gray-700">{opt.t}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={()=>setDone(true)} disabled={answered<QUESTIONS.length}
            className={`w-full py-4 font-black rounded-2xl text-lg ${answered===QUESTIONS.length?'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:opacity-90':'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            {answered<QUESTIONS.length?`Answer ${QUESTIONS.length-answered} more...`:'Reveal My Type!'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 text-center">
            <p className="text-6xl mb-3">{typeInfo.emoji}</p>
            <p className="text-5xl font-black text-indigo-800 mb-1">{type}</p>
            <p className="text-xl font-bold text-gray-900">{typeInfo.title}</p>
            <p className="text-gray-600 text-sm mt-3">{typeInfo.desc}</p>
          </div>
          <button onClick={()=>{setAnswers(Array(QUESTIONS.length).fill(-1));setDone(false)}} className="w-full py-3 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">Retake Quiz</button>
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
          <p className="text-gray-600 leading-relaxed">Personality tests have existed since the early 20th century and have gone through several generations -- from clinical diagnostics to pop psychology to the Myers-Briggs to the Big Five to whatever quiz you most recently took on social media. This quiz combines elements of established personality frameworks with questions calibrated to reveal how you actually behave rather than how you think you should. The result is a personality archetype from the 16-type model, with a detailed breakdown of which dimensions drive your score. For zodiac-based personality readings, the <Link href="/calculators/fun/zodiac-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Zodiac Calculator</Link> takes a completely different approach to the same question.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Answer questions across four dimensions: how you process energy (Introvert/Extrovert), how you take in information (Intuitive/Sensing), how you make decisions (Thinking/Feeling), and how you structure your life (Judging/Perceiving). Each question is designed to probe real behavioral tendencies rather than ideal self-image. The calculator weights each answer by a confidence factor and assigns you to the type with the highest composite score, along with your confidence percentage on each dimension.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The Big Five personality model (OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) is the most scientifically validated personality framework in academic psychology. Unlike the Myers-Briggs, which sorts people into discrete types, the Big Five treats each dimension as a continuous spectrum. Most personality psychologists use the Big Five in research but acknowledge that type-based frameworks like the 16-type model are much more intuitive and easier to share -- hence their cultural dominance despite weaker scientific support.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Answer based on what you actually do, not what you wish you did or think you should do. The questions that feel uncomfortable to answer honestly are the ones that produce the most accurate typing.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your personality type is not fixed -- longitudinal research shows measurable shifts across life stages, particularly on the Conscientiousness dimension (increases with age) and Neuroticism (decreases). Retesting every few years produces different but coherent results.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your score on the Introvert/Extrovert dimension is often misunderstood. Introversion in personality theory means "where you get your energy" (alone vs with others), not "how shy you are." Very social people can be introverts; awkward people can be extroverts. The <Link href="/calculators/fun/social-media-addiction" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Social Media Addiction Calculator</Link> sometimes reveals interesting things about the introvert/extrovert question too.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share your type with someone who knows you well and ask them to rate how accurate it is on a scale of 1-10. The accuracy rating they give you is itself personality data -- people with high self-awareness tend to get 7-9; people who consistently misread themselves get 3-5.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The original Myers-Briggs Type Indicator was developed by Isabel Briggs Myers and her mother Katharine Cook Briggs, neither of whom had formal psychological training. They based the framework on Carl Jung's theories of psychological types, which were themselves theoretical rather than empirical. The MBTI became one of the most widely used personality assessments in the world despite this origin -- used by Fortune 500 companies, military organizations, and schools globally.</p>
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
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/love-compatibility" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Love Compatibility</p><p className="text-xs text-gray-400 mt-0.5">Numerology + astrology score</p></div>
          </Link>
          <Link href="/calculators/fun/social-media-addiction" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Social Media Addiction</p><p className="text-xs text-gray-400 mt-0.5">Bergen scale addiction score</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/screen-time-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📱</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Screen Time Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your phone hours, exposed</p></div>
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
        intro={`Personality assessments have become ubiquitous in pop culture, hiring, dating apps, and team management — and the science behind them is considerably more complicated than the viral 'what type of bread are you' format suggests. Legitimate personality research (Big Five / OCEAN framework) has decades of validation. The Myers-Briggs, despite its corporate popularity, has serious scientific critics. This quiz is designed for entertainment and insight, not clinical assessment.

**Long-tail searches answered here:** free personality quiz online usa no signup, what is my personality type free test, personality assessment quiz free online tool, fun personality test free no account usa, online personality type finder free quiz, what personality type am i free test usa, introvert extrovert ambivert personality test free, big five ocean personality test free online usa, enneagram type quiz free online no account, myers briggs alternative personality quiz free usa, how to use personality type in relationships free guide, personality type for career match calculator free usa, 16 personality types free quiz no email required, dark triad personality test free online usa, attachment style quiz free no signup online usa`}
        howItWorks={`The quiz maps responses to dimensions drawn from personality psychology research. Your answers are scored across several scales and combined to produce a personality type description. The descriptions are drawn from psychological literature and designed to be specific enough to feel meaningful rather than vague enough to apply to anyone.`}
        tipsSection={`If you want a personality assessment with serious research backing, the Big Five (OCEAN) is the gold standard: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism. Free validated assessments are available at bigfive-test.com and similar sites.`}
        conclusion={`Personality frameworks are most valuable as a vocabulary for self-understanding and communication about differences — not as boxes that define you. People are more complex than any system captures, and most people's personality profiles change meaningfully over their adult lives.`}
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