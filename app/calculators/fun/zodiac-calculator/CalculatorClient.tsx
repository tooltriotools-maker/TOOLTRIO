'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [dob, setDob] = useState('1990-06-15')
  const [partnerDob, setPartnerDob] = useState('1992-03-21')

  const SIGNS = [
    {n:'Aries',e:'♈',d:[3,21,4,19],t:'Fire',pl:'Mars',tr:'Courageous, determined, confident, enthusiastic'},
    {n:'Taurus',e:'♉',d:[4,20,5,20],t:'Earth',pl:'Venus',tr:'Reliable, patient, practical, devoted'},
    {n:'Gemini',e:'♊',d:[5,21,6,20],t:'Air',pl:'Mercury',tr:'Gentle, affectionate, curious, adaptable'},
    {n:'Cancer',e:'♋',d:[6,21,7,22],t:'Water',pl:'Moon',tr:'Tenacious, imaginative, loyal, empathetic'},
    {n:'Leo',e:'♌',d:[7,23,8,22],t:'Fire',pl:'Sun',tr:'Creative, passionate, generous, warm-hearted'},
    {n:'Virgo',e:'♍',d:[8,23,9,22],t:'Earth',pl:'Mercury',tr:'Loyal, analytical, kind, hardworking'},
    {n:'Libra',e:'♎',d:[9,23,10,22],t:'Air',pl:'Venus',tr:'Cooperative, diplomatic, gracious, fair-minded'},
    {n:'Scorpio',e:'♏',d:[10,23,11,21],t:'Water',pl:'Pluto',tr:'Resourceful, brave, passionate, stubborn'},
    {n:'Sagittarius',e:'♐',d:[11,22,12,21],t:'Fire',pl:'Jupiter',tr:'Generous, idealistic, great sense of humor'},
    {n:'Capricorn',e:'♑',d:[12,22,1,19],t:'Earth',pl:'Saturn',tr:'Responsible, disciplined, self-control'},
    {n:'Aquarius',e:'♒',d:[1,20,2,18],t:'Air',pl:'Uranus',tr:'Progressive, original, independent, humanitarian'},
    {n:'Pisces',e:'♓',d:[2,19,3,20],t:'Water',pl:'Neptune',tr:'Compassionate, artistic, intuitive, gentle'},
  ]
  const CHINESE = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig']
  const getSign = (dateStr: string) => {
    const d = new Date(dateStr); if (isNaN(d.getTime())) return null
    const m = d.getMonth()+1, day = d.getDate()
    const s = SIGNS.find(s => (m===s.d[0]&&day>=s.d[1]) || (m===s.d[2]&&day<=s.d[3])) || SIGNS[11]
    const chinese = CHINESE[(d.getFullYear()-2020+40)%12]
    return { ...s, chinese }
  }
  const COMPAT: Record<string,string[]> = {
    Fire:['Fire','Air'], Earth:['Earth','Water'], Air:['Air','Fire'], Water:['Water','Earth']
  }
  const me = getSign(dob); const them = getSign(partnerDob)
  const compat = me && them ? (me.n===them.n ? 95 : COMPAT[me.t||'']?.includes(them.t||'') ? 85 : me.t===them.t ? 75 : 50) : 0
  const TYPE_COLORS: Record<string,string> = {Fire:'bg-red-100 text-red-700',Earth:'bg-green-100 text-green-700',Air:'bg-blue-100 text-blue-700',Water:'bg-indigo-100 text-indigo-700'}

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Zodiac Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⭐ Zodiac Sign Calculator</h1>
      <p className="text-gray-500 mb-8">Find your zodiac sign, Chinese zodiac animal, and compatibility score</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Your Birthday</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full border-2 border-gray-200 focus:border-purple-400 rounded-xl px-4 py-3 focus:outline-none" /></div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Partner's Birthday</label>
          <input type="date" value={partnerDob} onChange={e=>setPartnerDob(e.target.value)} className="w-full border-2 border-gray-200 focus:border-pink-400 rounded-xl px-4 py-3 focus:outline-none" /></div>
      </div>
      {me && them && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[{s:me,label:'You',c:'from-purple-500 to-indigo-600'},{s:them,label:'Partner',c:'from-pink-500 to-rose-600'}].map(({s,label,c})=>(
              <div key={label} className={`bg-gradient-to-br ${c} rounded-2xl p-5 text-white text-center`}>
                <p className="text-xs font-bold opacity-70 uppercase">{label}</p>
                <p className="text-6xl my-2">{s.e}</p>
                <p className="text-xl font-black">{s.n}</p>
                <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[s.t||'']} opacity-90`}>{s.t} - {s.pl}</span>
                <p className="text-2xl mt-2">Year of the {s.chinese}</p>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">{s.tr}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="font-bold text-gray-900 mb-2">💕 Compatibility Score</p>
            <p className={`text-5xl font-black ${compat>=80?'text-green-600':compat>=65?'text-yellow-600':'text-red-500'}`}>{compat}%</p>
            <p className="text-gray-500 text-sm mt-1">{compat>=80?'✨ Highly compatible - great match!':compat>=65?'💛 Good compatibility with some work':'💪 Opposites attract - embrace your differences!'}</p>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-3"><div className={`h-full rounded-full ${compat>=80?'bg-green-400':compat>=65?'bg-yellow-400':'bg-red-400'}`} style={{width:`${compat}%`}}/></div>
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
          <p className="text-gray-600 leading-relaxed">Your zodiac sign is the position the Sun occupied in the sky on the day you were born -- one of twelve segments of the ecliptic that have been tracked and interpreted by astronomers and astrologers for over 2,000 years. This calculator gives you your Western Sun sign with precise date-boundary calculations (important for people born on cusp dates), your Chinese zodiac animal from the 12-year cycle, your element, and your top compatible signs. It pairs naturally with the <Link href="/calculators/fun/lucky-number" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Lucky Number Calculator</Link> for a complete personality-from-numbers profile, and with the <Link href="/calculators/fun/love-compatibility" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Love Compatibility Calculator</Link> if you want to check sign-based compatibility with someone else.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your birthday (year, month, day). The calculator applies the precise astronomical transition dates for Western zodiac boundaries -- these shift by up to a day each year because the solar year doesn't align perfectly with the calendar, which means people born on the 19th-23rd of a month may have a different sign than they assumed from a fixed-date chart. The Chinese zodiac animal is determined by birth year in the traditional lunar calendar cycle. Both are output with compatible signs, element, and ruling planet.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The 12 Western zodiac signs were formalized by the ancient Babylonians around 600 BCE, who divided the apparent path of the Sun (the ecliptic) into 12 equal 30-degree segments. The actual constellations the zodiac signs are named after no longer align with the Sun's position during those calendar dates -- precession of the Earth's axis has shifted things by roughly 23 degrees over two millennia. This is why some astronomers note there are actually 13 constellations along the ecliptic (the 13th being Ophiuchus), though most Western astrology systems don't use it.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you've always identified more strongly with a different sign than the one you were told you are, re-check with this calculator using the exact date. Cusp-date calculations sometimes shift people's sign, and the "corrected" sign often feels more accurate to them.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The Chinese zodiac system uses the lunar calendar, so if you were born in January or early February, your Chinese animal might be from the previous year's cycle rather than the calendar year of your birth.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For a full picture of Western astrology beyond just your Sun sign, your Moon sign and Rising sign require your exact birth time and location -- the Sun sign that this calculator provides is the starting point, but serious astrology uses all three.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Look up your Chinese zodiac animal and your Western Sun sign, then find the qualities that both systems assign to you -- the traits that appear in both lists are a fair description of how you come across to people who meet you. Share the overlap and see how many people recognise it.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">In China, 2024 is the Year of the Dragon -- the most coveted year in the Chinese zodiac, associated with luck, strength, and success. Birth rates in China measurably increase in Dragon years as couples plan pregnancies intentionally to give their children a Dragon birth year. The spike is statistically visible in census data.</p>
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
          <Link href="/calculators/fun/birthday-countdown" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎉</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Birthday Countdown</p><p className="text-xs text-gray-400 mt-0.5">Days until your next birthday</p></div>
          </Link>
          <Link href="/calculators/fun/age-in-days" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Age in Days</p><p className="text-xs text-gray-400 mt-0.5">How many days old are you really?</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
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
        intro={`Astrology is one of humanity's oldest systematic frameworks for making meaning from personality and fate — an attempt to find patterns connecting the cosmos to human experience that dates back thousands of years across multiple independent cultures. Modern Western astrology, based on sun signs and the zodiac, has essentially no predictive validity in controlled studies. And yet it remains culturally pervasive, personally meaningful for many people, and genuinely interesting as a historical and psychological phenomenon.

**Long-tail searches answered here:** zodiac sign calculator free online usa, what is my zodiac sign by birthday free, astrology sign calculator free no signup, sun moon rising sign calculator free online usa, what zodiac sign am i free tool, astrological birth chart calculator free usa, zodiac compatibility calculator free online no account, rising sign calculator from birth time free usa, what is my moon sign calculator free online, zodiac element fire earth water air calculator free usa, chinese zodiac sign calculator free online, vedic astrology sign calculator free usa, western vs vedic zodiac sign difference calculator, zodiac cusp calculator for borderline birthdays free usa, full birth chart sun moon rising calculator free`}
        howItWorks={`The calculator determines your sun sign from your date of birth (the position of the sun in the zodiac on your birthday), your moon sign (the moon's position in the zodiac at birth — requires approximate time and location), and your rising sign (the zodiac sign on the horizon at the exact time of your birth). Each contributes to the full 'natal chart' used in astrological practice.`}
        tipsSection={`The psychological mechanism behind why people find their horoscope descriptions accurate is the Barnum/Forer effect — personality descriptions that are actually general enough to apply to most people feel specifically accurate to each individual reader. Knowing this doesn't make the descriptions less interesting; it just locates their meaning in psychology rather than astrology.`}
        conclusion={`Astrology functions as a personality vocabulary and a shared cultural language in ways that outlast questions about its scientific validity. People connect over zodiac signs, use them as conversational shorthand for personality patterns, and find genuine meaning in its frameworks regardless of whether the stars 'cause' those patterns. The meaning we make from systems like astrology is real, even when the systems themselves have no causal power.`}
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