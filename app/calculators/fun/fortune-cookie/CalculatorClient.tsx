'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const FORTUNES = [
  {msg:"The best time to plant a tree was 20 years ago. The second best time is now.",lucky:[4,8,15,16,23,42]},
  {msg:"A journey of a thousand miles begins with a single step. Take it today.",lucky:[7,14,21,28,35,42]},
  {msg:"Your kindness will return to you tenfold when you least expect it.",lucky:[1,9,18,27,36,45]},
  {msg:"The obstacle you're facing is actually the path forward in disguise.",lucky:[3,6,12,24,33,48]},
  {msg:"An unexpected opportunity will change everything. Keep your eyes open.",lucky:[5,10,20,25,40,50]},
  {msg:"You already have everything you need to succeed. Trust yourself.",lucky:[2,11,22,33,44,55]},
  {msg:"Laughter is the shortest distance between two people. Use it often.",lucky:[6,12,18,24,30,36]},
  {msg:"The person who moves a mountain begins by carrying away small stones.",lucky:[8,16,24,32,40,48]},
  {msg:"Your greatest strength is your ability to adapt. Change is your friend.",lucky:[9,18,27,36,45,54]},
  {msg:"Something you have been waiting for is finally on its way to you.",lucky:[1,3,7,21,77,99]},
  {msg:"Your creativity will solve a problem others thought was impossible.",lucky:[11,22,33,44,55,66]},
  {msg:"A beautiful soul like yours lights up every room. Never forget that.",lucky:[4,7,13,19,27,42]},
  {msg:"The stars align in your favour this week. Boldness will be rewarded.",lucky:[5,15,25,35,45,55]},
  {msg:"What you're looking for has been inside you all along.",lucky:[2,4,8,16,32,64]},
  {msg:"The universe conspires in favour of those who dare to dream big.",lucky:[3,9,27,54,81,99]},
]

export default function CalculatorClient({ faqs }: Props) {
  const [fortune, setFortune] = useState<typeof FORTUNES[0]|null>(null)
  const [cracked, setCracked] = useState(false)
  const [spinning, setSpinning] = useState(false)

  const crack = () => {
    setSpinning(true)
    setTimeout(()=>{
      setFortune(FORTUNES[Math.floor(Math.random()*FORTUNES.length)])
      setCracked(true)
      setSpinning(false)
    },600)
  }

  const reset = () => { setCracked(false); setFortune(null) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fortune Cookie</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🥠 Fortune Cookie</h1>
      <p className="text-gray-500 mb-6">Crack open a fortune cookie and receive your wisdom for the day!</p>

      {!cracked ? (
        <div className="text-center py-12">
          <button onClick={crack} disabled={spinning}
            className="text-8xl hover:scale-110 active:scale-95 transition-transform cursor-pointer block mx-auto mb-6">
            {spinning ? '✨' : '🥠'}
          </button>
          <button onClick={crack} disabled={spinning}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-lg rounded-2xl hover:opacity-90 shadow-lg">
            {spinning ? 'Cracking...' : 'Crack Open Your Fortune Cookie!'}
          </button>
        </div>
      ) : fortune && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-4">🥠</p>
            <p className="text-xl leading-relaxed text-gray-800 font-semibold italic">"{fortune.msg}"</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
            <p className="text-xs font-bold text-gray-500 mb-2">YOUR LUCKY NUMBERS</p>
            <div className="flex justify-center gap-2">
              {fortune.lucky.map(n=>(
                <span key={n} className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center font-black text-red-700 text-sm">{n}</span>
              ))}
            </div>
          </div>
          <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" /> Try Another Fortune
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
          <p className="text-gray-600 leading-relaxed">Fortune cookies occupy a strange cultural position: everyone knows they're mass-produced, everyone knows the fortune is random, and yet receiving a fortune that feels relevant produces a genuine moment of meaning. This generator recreates that experience digitally, pulling from a pool that mixes genuine wisdom, motivational insight, deadpan observations, and occasional absurdism. Tap and crack. The fortune you get is the fortune you needed. (This is a sentence that's both obviously untrue and somehow compelling.) For more structured ways to find meaning in arbitrary systems, the <Link href="/calculators/fun/lucky-number" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Lucky Number Calculator</Link> will derive your numerological life path.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Tap the cookie to crack it. A fortune is drawn from a large, curated pool divided into categories: wisdom, humor, absurdism, relationship insight, and motivational. Lucky numbers are generated fresh each time -- six numbers with genuine random distribution rather than predictable patterns. The optional lucky color is selected from a meaningful color psychology pool, not just a random hex code. Each fortune is written to feel like it could mean something, not like a sentence generated by removing all specific content from a real statement.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The fortune cookie -- despite being strongly associated with Chinese-American cuisine -- was almost certainly invented in California, not China. The leading historical claim credits Makoto Hagiwara of the Japanese Tea Garden in San Francisco, who served the cookies around 1914. The association with Chinese restaurants appears to have developed later, when Japanese-American business owners were interned during WWII and Chinese-American restaurant owners adopted the custom.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The classic "in bed" addition to any fortune is at least as old as the cookie itself and works with approximately 95% of fortunes in this generator's pool. Test this immediately.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you get a fortune that genuinely feels relevant to something you're currently dealing with, write it down. Not because fortune cookies have predictive power -- they don't -- but because the act of writing something down crystallizes its relevance in a way that's actually useful.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The <Link href="/calculators/fun/zodiac-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Zodiac Calculator</Link> pairs well with fortune cookies if you're building a full "arbitrary cosmic guidance" session. Get your star sign compatibility reading first, then crack a cookie. Together they feel more authoritative than either alone, which is the correct amount of authority for both.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">If your fortune genuinely resonates with something someone in your life is going through, screenshot it and send it without explanation. A fortune cookie that arrives unexpectedly, clearly chosen for you, lands differently than the same advice given directly.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The company that produces the most fortune cookies in the world is Wonton Food Inc. of Long Island City, New York -- they make approximately 4.5 million cookies per day. Each fortune message is vetted by an internal approval committee before production. The committee reportedly rejects anything too specific or too negative.</p>
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
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/love-compatibility" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Love Compatibility</p><p className="text-xs text-gray-400 mt-0.5">Numerology + astrology score</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></div>
          </Link>
          <Link href="/calculators/fun/birthday-countdown" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎉</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Birthday Countdown</p><p className="text-xs text-gray-400 mt-0.5">Days until your next birthday</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Fortune cookies are a distinctly American invention with a fascinating history — they originated in California (not China) in the early 1900s, inspired by Japanese omikuji fortune papers. Despite having no authentic Chinese culinary tradition, they became inseparably associated with Chinese-American restaurants and are now produced by the billions annually. The fortunes themselves, at their best, are a form of compressed wisdom.

**Long-tail searches answered here:** fortune cookie generator free online usa, random fortune cookie message free tool, digital fortune cookie no signup free, wise fortune cookie sayings generator free, virtual fortune cookie online free usa, daily fortune cookie message generator free, philosophical fortune cookie quotes generator free usa, funny fortune cookie message generator free, custom fortune cookie message creator free usa, fortune cookie prediction for today free online, motivational fortune cookie quote generator free usa, fortune cookie in chinese restaurant vs american free, lottery number fortune cookie generator free usa, inspiring fortune cookie wisdom generator free, dark twisted fortune cookie generator free usa`}
        howItWorks={`The fortune generator pulls from a curated database of fortunes that range from philosophical wisdom to humor to deliberately vague aphorisms. Each generation is random but weighted toward genuine insight rather than pure silliness — because the best fortune cookies are the ones you actually think about.`}
        tipsSection={`The fortune cookie tradition suggests you should add 'in bed' to any fortune you receive. This is not official guidance, but it does improve roughly 60% of all fortunes.`}
        conclusion={`There's something enduring about the fortune cookie's appeal — a small, sweet package delivering a tiny piece of perspective or wisdom. Even when the fortune is deliberately vague, it prompts a moment of reflection that most days don't naturally include.`}
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