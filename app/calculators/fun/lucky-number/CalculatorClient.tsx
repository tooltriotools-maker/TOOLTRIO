'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [name, setName]         = useState('')
  const [dob, setDob]           = useState('1990-06-15')
  const [generated, setGenerated] = useState(false)

  const calc = useMemo(() => {
    const letterVal = (c: string) => ((c.toUpperCase().charCodeAt(0) - 64) % 9) || 9
    const reduce = (n: number): number => n < 10 ? n : reduce(String(n).split('').reduce((a,d)=>a+Number(d),0))
    const d = new Date(dob)
    if (isNaN(d.getTime())) return null
    const lifePath = reduce(d.getFullYear() + d.getMonth()+1 + d.getDate())
    const exprNum = name.trim() ? reduce(Array.from(name.replace(/[^a-z]/gi,'')).reduce((s,c)=>s+letterVal(c),0)) : 0
    const soulNum = name.trim() ? reduce(Array.from(name.replace(/[^aeiou]/gi,'')).reduce((s,c)=>s+letterVal(c),0)||1) : 0
    const day = d.getDate(); const month = d.getMonth()+1; const year = d.getFullYear()
    const today = new Date(); const todayNum = reduce(today.getFullYear()+today.getMonth()+1+today.getDate())
    const lucky = [lifePath, (lifePath*3)%9||9, (lifePath+todayNum)%9||9, (lifePath*2+day)%9||9]
    const MEANINGS: Record<number,string> = {1:'Leadership & independence',2:'Harmony & partnership',3:'Creativity & expression',4:'Stability & practicality',5:'Freedom & adventure',6:'Love & responsibility',7:'Wisdom & spirituality',8:'Ambition & success',9:'Compassion & completion'}
    return { lifePath, exprNum, soulNum, lucky:Array.from(new Set(lucky)).slice(0,4), meaning:MEANINGS[lifePath]||'Mystery & magic', year:year%100 }
  }, [name, dob])

  const COLORS = ['bg-yellow-400','bg-pink-500','bg-purple-500','bg-blue-500','bg-green-500','bg-orange-500','bg-red-500','bg-indigo-500','bg-teal-500']

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Lucky Number</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🍀 Lucky Number Calculator</h1>
      <p className="text-gray-500 mb-8">Discover your numerology lucky numbers based on your birth date &amp; name</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 space-y-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Your Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name..." className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 text-lg focus:outline-none" /></div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Date of Birth</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 focus:outline-none" /></div>
      </div>
      {calc && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-bold opacity-80 uppercase tracking-wide">Your Life Path Number</p>
            <p className="text-8xl font-black my-2">{calc.lifePath}</p>
            <p className="text-lg font-bold opacity-90">{calc.meaning}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {name && <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200 text-center"><p className="text-xs font-bold text-purple-600 uppercase">Expression Number</p><p className="text-4xl font-black text-purple-700 my-1">{calc.exprNum}</p><p className="text-xs text-purple-500">Based on your name</p></div>}
            {name && <div className="p-4 bg-pink-50 rounded-xl border-2 border-pink-200 text-center"><p className="text-xs font-bold text-pink-600 uppercase">Soul Urge Number</p><p className="text-4xl font-black text-pink-700 my-1">{calc.soulNum}</p><p className="text-xs text-pink-500">Vowels in your name</p></div>}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="font-bold text-gray-900 mb-3">✨ Your Lucky Numbers</p>
            <div className="flex gap-3 flex-wrap">
              {calc.lucky.map((n,i) => <span key={i} className={`w-14 h-14 rounded-full ${COLORS[n-1]} text-white text-2xl font-black flex items-center justify-center shadow-lg`}>{n}</span>)}
            </div>
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
          <p className="text-gray-600 leading-relaxed">Numerology assigns meaning to numbers derived from your birth date and name -- a practice with thousands of years of recorded history across dozens of independent cultures, all of which arrived at similar frameworks for which numbers carry which qualities. Whether or not you believe the numbers carry real significance, they produce a surprisingly coherent personality sketch. Your Life Path number comes from your birth date; your Expression number comes from your full name; your Soul Urge number from only the vowels. Three numbers, three different angles on who you are. The <Link href="/calculators/fun/zodiac-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Zodiac Calculator</Link> adds a fourth angle through astrology if you want the full picture.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your birth date and full name. Your Life Path number is calculated by reducing your birth date to a single digit (or 11, 22, 33 -- the "master numbers" which aren't reduced further). Your Expression number uses the Pythagorean letter-number chart to assign values to every letter in your name, which are then summed and reduced. Your Soul Urge number applies the same process only to vowels. The calculator outputs all three with interpretations and cross-references between them.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The number 13 is considered unlucky in Western cultures but lucky in Italian and Chinese ones. The number 4 is deeply unlucky in Japanese, Chinese, Korean, and Vietnamese cultures (因 the word for 4 sounds like the word for death). The number 8 is considered extremely lucky in China (八, the word for 8 sounds like 发, prosperity). Cultural numerology is not universal -- your lucky numbers are partly a function of which tradition you're drawing from.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most interesting reading comes from looking at where your three numbers agree and where they conflict. Aligned numbers (same digit across Life Path, Expression, and Soul Urge) suggest a focused, coherent personality. Conflicting numbers suggest a person who's navigating internal tension between who they are, how they express, and what they really want.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Master numbers (11, 22, 33) are not reduced to single digits because they're considered to carry amplified energy rather than standard qualities. If you calculate to a master number, read both the master number interpretation and the reduced single digit -- both apply.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For fun: compare your numerology with someone else's and then compare those results with the <Link href="/calculators/fun/love-compatibility" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Love Compatibility Calculator</Link>, which also uses numerological methods. Consistent patterns across both systems are more interesting than either alone.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Post your three numerology numbers (Life Path, Expression, Soul Urge) without interpretation and ask people to guess what each one means before you reveal it. Most people will attribute qualities correctly at above-chance rates, which is either meaningful or an interesting study in pattern recognition.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The Pythagorean numerology system -- the most commonly used in Western practice -- assigns numbers 1-9 to the letters A-Z in repeating sequence. This is a relatively recent (19th century) formalization of much older practices. The Chaldean system, which some practitioners consider older and more accurate, uses a different letter-number assignment that produces different results from the same name.</p>
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
          <Link href="/calculators/fun/fortune-cookie" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🥠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fortune Cookie</p><p className="text-xs text-gray-400 mt-0.5">Crack open your digital fortune</p></div>
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
        intro={`Lucky number calculation through numerology reduces your birth date or name to a single digit through repeated addition — a practice that has been part of human culture for millennia. From Pythagoras (who believed numbers had mystical properties) through Chinese culture (where 8 is considered extraordinarily lucky) to modern superstitions, numbers carry symbolic weight that transcends their mathematical utility.

**Long-tail searches answered here:** lucky number calculator free online usa, what is my lucky number by birthday free tool, numerology lucky number calculator no signup, life path number calculator free online usa, personal lucky number finder free tool, birthday lucky number calculator free online, numerology number meaning guide free usa, how to find life path number free calculator, destiny number vs expression number free calculator usa, soul urge number calculator from name free online, lucky numbers for gambling by birthday free, numerology master numbers 11 22 33 explained free, birthday compatibility with lucky numbers free usa, weekly lucky number calculator free online, numerology lucky color and number combined free usa`}
        howItWorks={`Life Path number: sum all digits of your birthdate (day + month + year) and reduce to a single digit by adding again. For example, born June 15, 1990: 0+6+1+5+1+9+9+0 = 31, 3+1 = 4. Life path number is 4. Each number 1-9 has traditional numerological associations.`}
        tipsSection={`If you're drawn to numerology as a reflective tool, the most insightful way to use it is as a prompt for self-reflection rather than predictive fact. 'Does the description of life path 4 resonate with how I experience my strengths and challenges?' is a useful question regardless of whether numerology is 'real.'`}
        conclusion={`Lucky numbers, like all forms of divination, tell us more about our pattern-seeking minds than about any external reality. But the stories we tell around numbers are culturally rich and psychologically interesting. Enjoy this as folklore and fun.`}
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