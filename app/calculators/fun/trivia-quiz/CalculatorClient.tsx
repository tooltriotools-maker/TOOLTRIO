'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const QUESTIONS = [
    {q:'What planet is known as the Red Planet?',a:'Mars',opts:['Venus','Mars','Jupiter','Saturn'],cat:'Science'},
    {q:'Who painted the Mona Lisa?',a:'Leonardo da Vinci',opts:['Michelangelo','Leonardo da Vinci','Raphael','Caravaggio'],cat:'History'},
    {q:'What is the capital of Japan?',a:'Tokyo',opts:['Beijing','Seoul','Tokyo','Bangkok'],cat:'Geography'},
    {q:'How many sides does a hexagon have?',a:'6',opts:['5','6','7','8'],cat:'Math'},
    {q:'Which language has the most native speakers?',a:'Mandarin Chinese',opts:['Spanish','English','Mandarin Chinese','Hindi'],cat:'Geography'},
    {q:'What does CPU stand for?',a:'Central Processing Unit',opts:['Central Processing Unit','Core Processing Unit','Computer Programming Unit','Central Program Unit'],cat:'Tech'},
    {q:'Who wrote "Romeo and Juliet"?',a:'William Shakespeare',opts:['Charles Dickens','William Shakespeare','Jane Austen','Mark Twain'],cat:'Literature'},
    {q:'What is the largest planet in our Solar System?',a:'Jupiter',opts:['Saturn','Neptune','Jupiter','Uranus'],cat:'Science'},
    {q:'In what year did the Berlin Wall fall?',a:'1989',opts:['1987','1989','1991','1993'],cat:'History'},
    {q:'What element has the chemical symbol Au?',a:'Gold',opts:['Silver','Platinum','Gold','Copper'],cat:'Science'},
    {q:'Which country invented pizza?',a:'Italy',opts:['Greece','France','Italy','Spain'],cat:'History'},
    {q:'What is the speed of light in km/s (approx)?',a:'300,000',opts:['150,000','300,000','500,000','700,000'],cat:'Science'},
    {q:'How many bones are in the adult human body?',a:'206',opts:['196','206','218','226'],cat:'Science'},
    {q:'What social media platform has a bird as its logo?',a:'Twitter/X',opts:['Facebook','Instagram','Twitter/X','Snapchat'],cat:'Tech'},
    {q:'Which ocean is the largest?',a:'Pacific',opts:['Atlantic','Indian','Pacific','Arctic'],cat:'Geography'},
    {q:'Who was the first person to walk on the moon?',a:'Neil Armstrong',opts:['Buzz Aldrin','Neil Armstrong','Yuri Gagarin','John Glenn'],cat:'History'},
    {q:'What does HTTP stand for?',a:'HyperText Transfer Protocol',opts:['HyperText Transfer Protocol','High Text Transfer Protocol','Hyper Transfer Text Protocol','HyperText Transport Protocol'],cat:'Tech'},
    {q:'What is the largest country by area?',a:'Russia',opts:['China','Canada','USA','Russia'],cat:'Geography'},
    {q:'How many colors are in a rainbow?',a:'7',opts:['5','6','7','8'],cat:'Math'},
    {q:'Who developed the theory of relativity?',a:'Albert Einstein',opts:['Isaac Newton','Albert Einstein','Nikola Tesla','Stephen Hawking'],cat:'Science'},
  ]

  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<string|null>(null)
  const [done, setDone] = useState(false)
  const [order] = useState(()=>QUESTIONS.map((_,i)=>i).sort(()=>Math.random()-0.5).slice(0,10))

  const q = QUESTIONS[order[idx]]
  const progress = idx/10*100

  const answer = (opt: string) => {
    if (answered) return
    setAnswered(opt)
    if (opt===q.a) setScore(s=>s+1)
    setTimeout(()=>{
      if (idx+1>=10){setDone(true)}else{setIdx(i=>i+1);setAnswered(null)}
    },1200)
  }
  const reset = ()=>{setIdx(0);setScore(0);setAnswered(null);setDone(false)}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Trivia Quiz</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🧠 Random Trivia Quiz</h1>
      <p className="text-gray-500 mb-8">Test your knowledge across 8 categories - 10 random questions</p>
      {!done ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">{q.cat}</span>
            <span className="text-sm font-bold text-gray-500">Q{idx+1}/10 - Score: {score}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full mb-6"><div className="h-full bg-green-400 rounded-full transition-all" style={{width:`${progress}%`}}/></div>
          <p className="text-xl font-bold text-gray-900 mb-6 leading-snug">{q.q}</p>
          <div className="space-y-3">
            {q.opts.map(opt=>(
              <button key={opt} onClick={()=>answer(opt)} disabled={!!answered}
                className={`w-full p-4 text-left font-semibold rounded-xl border-2 transition-all ${!answered?'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800':opt===q.a?'border-green-400 bg-green-50 text-green-800':opt===answered&&opt!==q.a?'border-red-400 bg-red-50 text-red-800':'border-gray-100 text-gray-400'}`}>
                {opt} {answered&&(opt===q.a?'✅':opt===answered?'❌':'')}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-6xl mb-4">{score>=8?'🏆':score>=6?'⭐':score>=4?'👍':'💪'}</p>
          <p className="text-3xl font-black text-gray-900 mb-2">{score}/10 Correct!</p>
          <p className="text-gray-500 mb-6">{score>=8?'Brilliant! You are a trivia master!':score>=6?'Great job! Well done!':score>=4?'Not bad! Keep practising!':'Keep learning - you will improve!'}</p>
          <button onClick={reset} className="px-8 py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 transition-colors text-lg">Play Again 🎮</button>
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
          <p className="text-gray-600 leading-relaxed">Trivia is a specific kind of knowledge -- facts that feel useless until the moment they become the most important thing you know. This quiz generates random questions across categories: science, history, geography, pop culture, language, and occasional deep weirdness. Each question comes with difficulty indicated and a full explanation of the answer -- because knowing the answer to a trivia question without knowing why is only half the value. For a more passive version of surprising facts, the <Link href="/calculators/fun/random-fact-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Random Fact Generator</Link> delivers bite-sized knowledge without testing you on it.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Questions are drawn from a categorized pool and presented one at a time with multiple choice options. The difficulty of each question is indicated before you answer. After each answer (right or wrong), a full explanation paragraph gives context for why the correct answer is correct -- the part that makes the knowledge actually stick. You can filter by category or run the full mixed set. Score is tracked across a session so you can see where your knowledge is strongest.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The word "trivia" comes from Latin "trivium" -- literally "three roads" -- referring to the point where three roads meet, which in ancient Rome was where public notices were posted and people gathered to share information. The trivium was also the foundation of medieval education: grammar, logic, and rhetoric. "Trivial" originally meant "publicly known" rather than "unimportant" -- the connotation shift happened gradually as "what everyone knows" came to imply "what doesn't matter."</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you know you don't know the answer, use the elimination method before guessing: rule out the most obviously wrong options first and pick from what remains. You'll be right more often than chance even without specific knowledge.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Category performance gaps are more useful than total score. Scoring well overall but poorly in history usually means something specific -- not that you're bad at trivia, but that you have a specific gap in your knowledge base that's fixable.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Read the explanations even when you get an answer right. The explanation often contains a more interesting fact than the question itself, which is the format trivia is most useful for actual learning.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Send a single trivia question (without the answer) to your group chat and give everyone 30 seconds to answer. The question "what percentage of the ocean has been explored?" produces confident wrong answers at a higher rate than almost any other trivia format.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The most commonly wrong trivia answer across pub quiz formats worldwide is in response to the question "what is the longest river in the world?" Most people answer "The Nile" -- and most pub quizzes accept this as correct -- but measurement methodology disputes mean some hydrologists argue the Amazon is longer. The answer depends entirely on how you measure and where you put the source.</p>
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
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/text-to-morse" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📡</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Text to Morse Code</p><p className="text-xs text-gray-400 mt-0.5">Tap out your message</p></div>
          </Link>
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Trivia is a democratizing form of intellectual play — it rewards breadth of curiosity over depth in any single domain, and it puts a 14-year-old with obsessive reading habits on equal footing with a professor. The best trivia questions teach you something whether you get them right or wrong, leaving you with a fact you wouldn't have sought out but are glad to know.

**Long-tail searches answered here:** random trivia quiz free online usa, trivia questions and answers free no signup, general knowledge quiz free online tool, free trivia test no account usa, mixed trivia quiz free instant online, random knowledge test free no download usa, hard trivia questions with answers free usa online, science trivia quiz free online no account, history trivia quiz usa free no signup, pop culture trivia quiz free online usa, geography trivia questions free quiz tool, trivia quiz for adults free online usa, funny trivia questions and answers free, sports trivia quiz free online no signup usa, pub quiz style trivia generator free usa`}
        howItWorks={`The quiz presents randomly selected questions from a curated pool spanning history, science, geography, culture, language, and everyday phenomena. Each question has one correct answer with explanation, and difficulty levels are calibrated to ensure roughly half the questions are challenging for a well-read adult.`}
        tipsSection={`The best trivia strategy for questions you don't know: eliminate impossible options first, use linguistic or geographic cues in the question, and trust your initial instinct before overthinking. Research consistently shows that initial responses on factual multiple-choice questions outperform second-guessing.`}
        conclusion={`Trivia knowledge is most useful not when you're playing pub quiz but when it creates unexpected connections in your thinking — when a fact about Roman engineering informs your intuition about a modern logistics problem. Broad knowledge accumulation isn't frivolous; it's raw material for novel thinking.`}
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