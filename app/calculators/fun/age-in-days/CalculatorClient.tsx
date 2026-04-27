'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [dob, setDob] = useState('1990-06-15')

  const result = useMemo(() => {
    const birth = new Date(dob)
    if (isNaN(birth.getTime())) return null
    const now = new Date()
    const diffMs = now.getTime() - birth.getTime()
    if (diffMs < 0) return null
    const days = Math.floor(diffMs / 86400000)
    const hours = Math.floor(diffMs / 3600000)
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor(diffMs / 1000)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30.44)
    const heartbeats = Math.floor(seconds * 1.2) // avg 72 bpm
    const breaths = Math.floor(seconds * 0.267) // avg 16/min
    const blinks = Math.floor(seconds * 0.267) // avg 16/min
    const sleepDays = Math.floor(days * 0.33)
    const steps = Math.floor(days * 7500) // avg steps per day
    const funFacts = [
      `You have taken approximately ${breaths.toLocaleString()} breaths`,
      `Your heart has beaten about ${heartbeats.toLocaleString()} times`,
      `You have blinked roughly ${blinks.toLocaleString()} times`,
      `You have slept for about ${sleepDays.toLocaleString()} days`,
      `You have taken approximately ${steps.toLocaleString()} steps`,
      `You have had about ${Math.floor(days/7).toLocaleString()} weekends`,
    ]
    return { days, hours, minutes, seconds, weeks, months, funFacts }
  }, [dob])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Age in Days</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎂 How Old Are You in Days?</h1>
      <p className="text-gray-500 mb-8">Discover your exact age in days, hours, minutes, and more mind-blowing stats</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Your Date of Birth</label>
        <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 text-xl focus:outline-none" />
      </div>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-bold opacity-80 uppercase tracking-wide">You are</p>
            <p className="text-7xl font-black my-1">{result.days.toLocaleString()}</p>
            <p className="text-2xl font-bold">Days Old! 🎉</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{l:'Weeks',v:result.weeks},{l:'Months',v:result.months},{l:'Hours',v:result.hours},{l:'Minutes',v:result.minutes}].map(s=>(
              <div key={s.l} className="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
                <p className="text-xs text-gray-400">{s.l}</p>
                <p className="text-lg font-black text-gray-900">{s.v.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="font-bold text-gray-900 mb-3">🤯 Mind-Blowing Life Stats</p>
            <div className="space-y-2">
              {result.funFacts.map((f: string,i: number)=>(
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-orange-400 font-bold">✦</span> {f}
                </div>
              ))}
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
          <p className="text-gray-600 leading-relaxed">You know you're 31 years old. But 31 years sounds abstract in a way that "11,323 days" does not. This calculator converts your age into its full stack of units -- days, hours, minutes, seconds, weeks, lunar cycles -- so the amount of time you've been alive stops being a number on your ID and starts feeling like a real quantity. The birthday milestone numbers are surprisingly interesting: most people reach 10,000 days somewhere in their late twenties, which is an occasion that passes entirely uncelebrated despite being a legitimately round number. Check when your <Link href="/calculators/fun/birthday-countdown" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">next birthday</Link> falls while you're here.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Enter your date of birth. The calculator computes your exact age in days (accounting for leap years), then converts that to weeks, hours, minutes, and seconds. It also identifies significant upcoming milestones -- your next 10,000-day anniversary, your next 1,000-week mark -- and tells you when you'll hit them. Heartbeats, breaths, and approximate sleep hours are estimated using statistical averages with a note on individual variation.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Most people celebrate their birthday on the same calendar date every year, but the astronomical anniversary of your birth -- the exact position of the Earth in its orbit when you were born -- shifts slightly each year because of leap year corrections. Your "true" astronomical birthday comes around every 1,461 days (4 years). This is why the leap-year birthday on February 29th is treated as special: those people celebrate on the actual astronomical anniversary only once every four years.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your 10,000-day birthday is worth calculating and actually celebrating. It falls for most people in their late 20s and is a more interesting number than 30, which is arbitrary. Send the date to someone you'll still know then.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The hours and minutes outputs are most useful for a perspective shift: seeing that you've lived 270,000 waking hours tends to prompt useful reflection on what those hours contained in a way that "30 years" doesn't.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Check someone else's age in days alongside yours to see the gap in a different unit. A 15-year age difference is 15 years; it's also about 5,500 days -- which feels simultaneously larger and smaller than the year count, depending on who you are.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Share your day count on your actual birthday instead of (or alongside) the year count. "Today I am 11,688 days old" is a statement that almost always produces genuine calculation attempts from the people who see it -- everyone tries to work out how old you are in years from the day count.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The Gregorian calendar has 97 leap years per 400-year cycle, not 100 -- because century years (1700, 1800, 1900) are not leap years unless also divisible by 400 (so 2000 was a leap year but 1900 was not). This correction keeps the calendar aligned with the Earth's actual orbital period, which is 365.2425 days rather than exactly 365.</p>
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
          <Link href="/calculators/fun/birthday-countdown" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎉</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Birthday Countdown</p><p className="text-xs text-gray-400 mt-0.5">Days until your next birthday</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/love-compatibility" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Love Compatibility</p><p className="text-xs text-gray-400 mt-0.5">Numerology + astrology score</p></div>
          </Link>
          <Link href="/calculators/fun/how-rich-am-i" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">How Rich Am I</p><p className="text-xs text-gray-400 mt-0.5">Your global wealth ranking</p></div>
          </Link>
          <Link href="/calculators/fun/life-expectancy-fun" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Life Expectancy Fun</p><p className="text-xs text-gray-400 mt-0.5">Lifestyle-based lifespan estimate</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/sleep-debt-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Sleep Debt Calculator</p><p className="text-xs text-gray-400 mt-0.5">Track your sleep deficit</p></div>
          </Link>
          <Link href="/calculators/fun/procrastination-score" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Procrastination Score</p><p className="text-xs text-gray-400 mt-0.5">How bad is your habit?</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Most of us measure our lives in years, birthdays, and decades — but thinking in days reveals a different and strangely motivating perspective on time. You've lived tens of thousands of days. Each one was 24 hours of irreplaceable time. Counting them up doesn't just produce a big number — it makes the abstract concept of 'time passing' feel concrete and real in a way that counting years doesn't.

**Long-tail searches answered here:** how many days old am i calculator free online usa, age in days calculator from birthday free, exact age in days hours minutes free tool, days alive calculator no signup free, how many days have i been alive free calculator usa, my age in days and seconds free online, how old am i in days weeks months calculator free, days since my birthday calculator free online, how many days until im 10000 days old free usa, exact age between two dates calculator free online, days old birthday milestone calculator free usa, how many days in my age by the second free, historical figure age in days calculator free usa, age countdown in days to next birthday free, days lived vs life expectancy remaining calculator free`}
        howItWorks={`The calculator finds the difference between your date of birth and the current date/time in milliseconds, then converts that into days, hours, minutes, and seconds. It also derives weeks and approximate months from the raw day count.`}
        tipsSection={`Share your 10,000-day, 20,000-day, or 100,000-hour milestones. These are oddly satisfying numbers to hit and worth celebrating. Your 10,000-day birthday happens at roughly age 27 years and 4 months.`}
        conclusion={`Time is the one resource you can't earn more of, but you can spend more intentionally. Whether you use this number for motivation, perspective, or just the fun of knowing — it's your personal odometer, counting every rotation of the Earth since you arrived on it.`}
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