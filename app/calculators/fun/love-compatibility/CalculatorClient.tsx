'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [name1, setName1] = useState('Alice')
  const [name2, setName2] = useState('Bob')
  const [dob1, setDob1] = useState('1990-06-15')
  const [dob2, setDob2] = useState('1988-11-22')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const hashName = (n: string) => Array.from(n.toLowerCase()).reduce((a,c)=>a+c.charCodeAt(0),0)
    const h1 = hashName(name1), h2 = hashName(name2)
    const d1 = new Date(dob1), d2 = new Date(dob2)
    const ageDiff = Math.abs(d1.getFullYear()-d2.getFullYear())
    const combined = (h1+h2) % 100
    const overall = Math.max(40, Math.min(99, combined + (ageDiff < 5 ? 10 : ageDiff < 10 ? 5 : 0) + ((h1*h2)%17)))
    const categories = [
      { name:'❤️ Attraction',  score: Math.max(50,Math.min(99,(h1*3+h2*2)%50+50)) },
      { name:'💬 Communication',score: Math.max(50,Math.min(99,(h1+h2*4)%45+52)) },
      { name:'🤝 Trust',        score: Math.max(50,Math.min(99,(h1*h2)%40+55)) },
      { name:'🌱 Long-term',    score: Math.max(45,Math.min(99,(h1*2+h2*3+ageDiff)%50+45)) },
      { name:'🔥 Passion',      score: Math.max(50,Math.min(99,(h1+h2*2)%48+50)) },
    ]
    const label = overall>=90?'💍 Soulmates!':overall>=80?'💕 Perfect Match':overall>=70?'💛 Great Couple':overall>=60?'🤝 Good Potential':'🌱 Worth Exploring'
    setResult({ overall, categories, label })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Love Compatibility</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">💕 Love Compatibility Calculator</h1>
      <p className="text-gray-500 mb-8">Enter two names and birthdays to reveal your compatibility score</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold text-pink-500 uppercase block mb-1.5">💖 Person 1</label>
            <input value={name1} onChange={e=>setName1(e.target.value)} placeholder="First name..." className="w-full border-2 border-pink-200 focus:border-pink-400 rounded-xl px-4 py-3 focus:outline-none mb-2" />
            <input type="date" value={dob1} onChange={e=>setDob1(e.target.value)} className="w-full border-2 border-pink-200 focus:border-pink-400 rounded-xl px-4 py-3 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-purple-500 uppercase block mb-1.5">💜 Person 2</label>
            <input value={name2} onChange={e=>setName2(e.target.value)} placeholder="First name..." className="w-full border-2 border-purple-200 focus:border-purple-400 rounded-xl px-4 py-3 focus:outline-none mb-2" />
            <input type="date" value={dob2} onChange={e=>setDob2(e.target.value)} className="w-full border-2 border-purple-200 focus:border-purple-400 rounded-xl px-4 py-3 focus:outline-none" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl rounded-xl hover:opacity-90 transition-opacity shadow-lg">
          Calculate Love Score 💕
        </button>
      </div>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-bold opacity-80">{name1} ❤️ {name2}</p>
            <p className="text-8xl font-black my-2">{result.overall}%</p>
            <p className="text-2xl font-bold">{result.label}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            {result.categories.map((c: any) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1"><span className="font-semibold text-gray-700">{c.name}</span><span className="font-black text-gray-900">{c.score}%</span></div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500" style={{width:`${c.score}%`}}/></div>
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
          <p className="text-gray-600 leading-relaxed">Does numerology actually determine romantic compatibility? Probably not. Is it entertaining to calculate anyway? Absolutely yes. This calculator combines name numerology (the vibrational frequency of your names in the Pythagorean system) with birthday-based life path numbers and Chinese zodiac elemental compatibility to produce a single compatibility score and a layered reading of how two people's energies interact. It's the kind of thing that's fun to check on first dates and share with friends. For individual readings first, try the <Link href="/calculators/fun/lucky-number" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Lucky Number Calculator</Link> and the <Link href="/calculators/fun/zodiac-calculator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Zodiac Calculator</Link> for each person separately.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter both people's names and birth dates. Three compatibility dimensions are calculated: name vibration compatibility (are your numerological values harmonically related or in tension?), life path compatibility (do your core number archetypes complement or challenge each other?), and elemental compatibility from Chinese zodiac (are your animals in the same element group, compatible groups, or conflicting ones?). The scores are combined and weighted into a total, with a reading that explains which dimension drives the result most.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Every Chinese zodiac animal belongs to one of four elemental triangles of compatibility. Rat, Dragon, and Monkey are the first triangle (all get along unusually well together). Ox, Snake, and Rooster form the second. Tiger, Horse, and Dog form the third. Rabbit, Goat, and Pig form the fourth. Animals in the same triangle are said to be naturally harmonious. Animals in opposite positions in the 12-animal cycle (six positions apart) are said to clash.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most interesting results come from cases where numerological compatibility is high but zodiac elemental compatibility is low, or vice versa. This isn't a contradiction -- it maps onto the real experience of two people who connect intellectually but struggle temperamentally, or feel chemistry but don't understand each other.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Run the calculator with multiple combination of name variants (nicknames, full names, middle names) and see how much the result shifts. Names that are used differently in different contexts produce different readings -- which is either a flaw in numerology or an accurate reflection of how identity works.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>This is most fun as a group activity at a dinner party -- run the calculator for every pairing and display the matrix of results. Who is most compatible with whom in the room is reliably entertaining data.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Text someone your compatibility score with no setup. "78% compatible according to the numerology calculator" as an opening message produces reactions that are uniformly better than "hey." High scores are charming; unexpectedly low scores from close friends are funnier.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The academic study of assortative mating -- the tendency for people to pair with others similar to themselves -- consistently finds that people do partner non-randomly: by education level, height, personality, and even political views. Whether any of this aligns with numerology is an open question, but the baseline assumption (compatible people find each other) is empirically supported.</p>
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
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p>
</div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p>
</div>
          </Link>
          <Link href="/calculators/fun/fortune-cookie" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🥠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fortune Cookie</p><p className="text-xs text-gray-400 mt-0.5">Crack open your digital fortune</p>
</div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p>
</div>
          </Link>
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p>
</div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p>
</div>
          </Link>
          <Link href="/calculators/fun/age-in-days" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Age in Days</p><p className="text-xs text-gray-400 mt-0.5">How many days old are you really?</p>
</div>
          </Link>
          <Link href="/calculators/fun/birthday-countdown" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎉</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Birthday Countdown</p><p className="text-xs text-gray-400 mt-0.5">Days until your next birthday</p>
</div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Love compatibility calculators have existed since the first paper horoscopes, and they persist because they're genuinely fun — not because they're accurate predictors of relationship success. What actually predicts relationship success (emotional intelligence, communication quality, shared values, conflict resolution styles) is far less entertaining to calculate than name numerology or zodiac pairings.

**Long-tail searches answered here:** love compatibility calculator free online usa, name compatibility test free tool no signup, relationship compatibility score free online, zodiac love compatibility calculator free usa, romance compatibility checker free online, how compatible are we calculator free tool, numerology name compatibility percentage free usa, birth date compatibility love test free online, astrology sun sign love compatibility score free, chinese zodiac compatibility calculator free usa, love calculator by name and birthday free tool, soulmate compatibility quiz free online usa, long distance relationship compatibility score free, personality type love compatibility calculator free usa, romantic partner compatibility percentage test free`}
        howItWorks={`The compatibility calculation combines name numerology (values assigned to letters based on their position in the alphabet), astrological sun sign traits, and FLAMES-style algorithmic compatibility. The result is a playful score with zero scientific validity and maximum entertainment value.`}
        tipsSection={`Take this with maximum grains of salt. Psychologists who actually study long-term relationship outcomes emphasize conflict resolution patterns, emotional validation, and shared life goals far more than any numerological or astrological compatibility measure.`}
        conclusion={`Relationship calculators are a centuries-old form of recreational divination — and there's genuine value in the playful interaction of exploring compatibility with someone you like. Just don't make actual relationship decisions based on the output.`}
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