'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [dob, setDob] = useState('1990-06-15')
  const [now, setNow] = useState(new Date())

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  const getBirthday = () => {
    if (!dob) return null
    const d = new Date(dob)
    const next = new Date(now.getFullYear(), d.getMonth(), d.getDate())
    if (next <= now) next.setFullYear(now.getFullYear() + 1)
    const diff = next.getTime() - now.getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    const secs = Math.floor((diff % 60000) / 1000)
    const age = now.getFullYear() - d.getFullYear() - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0)
    const isToday = next.getTime() - now.getTime() < 86400000 && next.getDate() === now.getDate()
    const ZODIAC = [{s:'Capricorn',m:1,d:20},{s:'Aquarius',m:2,d:19},{s:'Pisces',m:3,d:20},{s:'Aries',m:4,d:20},{s:'Taurus',m:5,d:21},{s:'Gemini',m:6,d:21},{s:'Cancer',m:7,d:23},{s:'Leo',m:8,d:23},{s:'Virgo',m:9,d:23},{s:'Libra',m:10,d:23},{s:'Scorpio',m:11,d:22},{s:'Sagittarius',m:12,d:22}]
    const mo = d.getMonth()+1, da = d.getDate()
    const zodiac = ZODIAC.find(z=>mo===z.m&&da<=z.d) || ZODIAC.find(z=>mo===((z.m%12)+1)) || ZODIAC[0]
    return { days, hours, mins, secs, age, isToday, nextDate: next.toDateString(), zodiac: zodiac.s }
  }

  const info = getBirthday()

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Birthday Countdown</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎂 Birthday Countdown</h1>
      <p className="text-gray-500 mb-6">See exactly how long until your next birthday - down to the second!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-sm font-bold text-gray-700 block mb-2">Your Birthday</label>
        <input type="date" value={dob} onChange={e=>setDob(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-bold focus:border-pink-400 focus:outline-none" />
      </div>

      {info && (
        info.isToday ? (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-300 rounded-2xl p-8 text-center">
            <p className="text-6xl mb-3">🎉🎂🎉</p>
            <p className="text-3xl font-black text-pink-700">Happy Birthday!</p>
            <p className="text-gray-600 mt-2">You are {info.age} years old today!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[['Days',info.days,'pink'],['Hours',info.hours,'purple'],['Minutes',info.mins,'blue'],['Seconds',info.secs,'green']].map(([l,v,c])=>(
                <div key={l as string} className={`bg-${c}-50 border-2 border-${c}-200 rounded-2xl p-4 text-center`}>
                  <p className={`text-3xl font-black text-${c}-700`}>{String(v).padStart(2,'0')}</p>
                  <p className={`text-xs font-bold text-${c}-500 mt-1`}>{l}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Current Age</p>
                <p className="text-2xl font-black text-gray-900">{info.age} yrs</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Zodiac Sign</p>
                <p className="text-2xl font-black text-gray-900">{info.zodiac}</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="text-xs text-gray-500 mb-1">Next Birthday</p>
                <p className="font-bold text-gray-800">{info.nextDate}</p>
              </div>
            </div>
          </div>
        )
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
          <p className="text-gray-600 leading-relaxed">Your birthday is the one day a year when everyone is contractually obligated to acknowledge you exist. This countdown tells you exactly how many days, hours, and minutes remain until that moment arrives -- so you can plan appropriately, drop strategic hints, and maintain a calibrated sense of anticipation. It also tells you which day of the week your birthday falls on, because a Saturday birthday and a Tuesday birthday are genuinely different events requiring different logistics. For the full lifetime-in-numbers view, the <Link href="/calculators/fun/age-in-days" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Age in Days Calculator</Link> gives you the complete picture.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your birth month and day. The calculator determines how far away your next birthday is from today, broken down into days, hours, and minutes. It identifies the day of the week it falls on, and notes any interesting things about the date -- historical events, what star sign it falls in, whether it's a public holiday in major countries. For extra celebration context, it shows which famous people share your birthday.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The most common birthday in the United States (and several other countries) is September 9th. The least common is February 29th (leap day). The September clustering reflects a conception peak around the winter holidays -- December specifically produces the most September birthdays. The months with the lowest average birthday frequency are January and February, which also makes them the months most likely to feel statistically underserved in the "sharing a birthday" category.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>A Saturday or Sunday birthday in your next cycle is worth planning for significantly further in advance than a weekday one -- the logistics of gathering people on weekends are easier but the competition for those weekend slots from other events is real.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If your birthday falls within two weeks of Christmas or another major holiday, your celebration window is compressed in a way that requires earlier planning than most. You know this. The countdown tool helps you see how many usable weekends you have before the date.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Use the countdown to your own birthday as a deadline anchor for something you've been meaning to do before you turn the next year older. "I want to have done X before I'm 34" is a better motivational frame than a vague future intention.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share your exact countdown (days, hours, minutes) exactly 100 days before your birthday. It's early enough to be charming rather than pressuring, and "100 days until my birthday" is a much more interesting social post than "birthday is coming up!"</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">In a room of 23 people, there is a greater than 50% probability that at least two share a birthday. This is called the Birthday Problem (or Birthday Paradox), and the probability reaches 99.9% in a room of 70 people. It consistently surprises people because human intuition tends to think about personal birthday matches rather than any two people matching, which is a much smaller probability space.</p>
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
          <Link href="/calculators/fun/age-in-days" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Age in Days</p><p className="text-xs text-gray-400 mt-0.5">How many days old are you really?</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
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
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`The countdown to your next birthday is one of the most personal clocks there is. Whether you're marking the days until a big milestone birthday, setting up a fun birthday reminder, or just curious how long until you can eat birthday cake — this is the clock that actually matters to you.

**Long-tail searches answered here:** birthday countdown timer free online usa, how many days until my birthday free tool, days until birthday calculator no signup, birthday countdown clock free online usa, next birthday days remaining calculator free, how long until my birthday calculator free, exactly how many seconds until my birthday free, birthday countdown to the minute free online usa, friends birthday countdown tracker free no account, birthday countdown widget free online no app, how many days until birthday 2026 free calculator, countdown to 30th birthday calculator free usa, birthday countdown months weeks days hours free, shared birthday countdown link free online usa, days until kids birthday calculator free no signup`}
        howItWorks={`The calculator finds the next occurrence of your birthday after today's date. If your birthday has already passed this year, it looks ahead to next year. It then calculates days, hours, minutes, and seconds until midnight of that date.`}
        tipsSection={`For milestone birthdays (30, 40, 50, 60), the countdown timer is a fun motivational tool: 'I have 400 days to do the thing I've been putting off before I turn 40.' Set the countdown as a calendar reminder and check back periodically.`}
        conclusion={`Every birthday is a personal New Year — a fixed point to mark growth, change, and what you want the next year to look like. The countdown just tells you how many days of runway you have left before the next one.`}
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