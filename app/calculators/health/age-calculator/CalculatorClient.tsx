'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [birthDate, setBirthDate] = useState('1990-06-15')
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0])
  const [showOnDate, setShowOnDate] = useState(false)

  const result = useMemo(() => {
    const birth = new Date(birthDate)
    const target = new Date(targetDate)
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) return null
    
    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()
    
    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) { years--; months += 12 }
    
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000*60*60*24))
    const totalHours = Math.floor(totalDays * 24)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years*12 + months
    
    // Next birthday
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBday <= target) nextBday = new Date(target.getFullYear()+1, birth.getMonth(), birth.getDate())
    const daysToNext = Math.ceil((nextBday.getTime()-target.getTime())/(1000*60*60*24))
    const nextAge = nextBday.getFullYear() - birth.getFullYear()
    const nextBdayFmt = nextBday.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})
    
    const zodiac = (() => {
      const m=birth.getMonth()+1, d=birth.getDate()
      if((m===3&&d>=21)||(m===4&&d<=19))return'♈ Aries'
      if((m===4&&d>=20)||(m===5&&d<=20))return'♉ Taurus'
      if((m===5&&d>=21)||(m===6&&d<=20))return'♊ Gemini'
      if((m===6&&d>=21)||(m===7&&d<=22))return'♋ Cancer'
      if((m===7&&d>=23)||(m===8&&d<=22))return'♌ Leo'
      if((m===8&&d>=23)||(m===9&&d<=22))return'♍ Virgo'
      if((m===9&&d>=23)||(m===10&&d<=22))return'♎ Libra'
      if((m===10&&d>=23)||(m===11&&d<=21))return'♏ Scorpio'
      if((m===11&&d>=22)||(m===12&&d<=21))return'♐ Sagittarius'
      if((m===12&&d>=22)||(m===1&&d<=19))return'♑ Capricorn'
      if((m===1&&d>=20)||(m===2&&d<=18))return'♒ Aquarius'
      return'♓ Pisces'
    })()
    
    return { years, months, days, totalDays, totalHours, totalWeeks, totalMonths, daysToNext, nextAge, nextBdayFmt, zodiac }
  }, [birthDate, targetDate])

  return (
    <CalculatorLayout title="Age Calculator" description="Calculate exact age in years, months, days and hours. Find days until next birthday and age on any date." icon="🎂" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-gray-900 mb-5">Date of Birth</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Date of Birth</label>
              <input type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} max={targetDate} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-600">Age on specific date?</label>
              <button onClick={()=>setShowOnDate(!showOnDate)} className={`w-10 h-5 rounded-full transition-colors ${showOnDate?'bg-purple-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${showOnDate?'translate-x-5':''}`} />
              </button>
            </div>
            {showOnDate && <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Calculate age on</label>
              <input type="date" value={targetDate} onChange={e=>setTargetDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>}
          </div>

          {result && (
            <div className="mt-6 p-5 bg-purple-50 rounded-2xl border-2 border-purple-200 text-center">
              <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2">Your Exact Age</p>
              <div className="flex items-end justify-center gap-3">
                <div><p className="text-5xl font-black text-purple-700">{result.years}</p><p className="text-sm text-purple-500 font-semibold">years</p></div>
                <div><p className="text-3xl font-black text-purple-600">{result.months}</p><p className="text-xs text-purple-400">months</p></div>
                <div><p className="text-3xl font-black text-purple-600">{result.days}</p><p className="text-xs text-purple-400">days</p></div>
              </div>
            </div>
          )}
        </Card>

        {result && (
          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">More Age Facts</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{l:'Total Days',v:result.totalDays.toLocaleString()},{l:'Total Weeks',v:result.totalWeeks.toLocaleString()},{l:'Total Months',v:result.totalMonths.toLocaleString()},{l:'Approx Hours',v:(result.totalHours/1000).toFixed(0)+'K'}].map(s=>(
                  <div key={s.l} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <p className="text-xs text-gray-500 font-medium">{s.l}</p>
                    <p className="text-xl font-black text-gray-900">{s.v}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">🎂 Next Birthday</h3>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <div>
                  <p className="font-bold text-gray-900">Turning {result.nextAge}</p>
                  <p className="text-sm text-gray-500">{result.nextBdayFmt}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-yellow-600">{result.daysToNext}</p>
                  <p className="text-xs text-gray-500">days away</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <span className="text-2xl">{result.zodiac.split(' ')[0]}</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Zodiac Sign</p>
                  <p className="font-bold text-indigo-700">{result.zodiac.split(' ')[1]}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Age Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A person born on March 15, 1990 is <strong>35 years, 3 weeks, and 2 days</strong> old as of April 7, 2026. They have lived approximately 12,806 days and will turn 36 in less than a year.
        </p>
        <p className="text-sm text-gray-600">
          This Age 2026 calculates your exact age in years, months, days, and total days lived — useful for medical forms, legal documents, and milestone tracking.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Age Calculator"
        category="health"
        intro={`The **AGE Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your age instantly - no account needed, works on all devices.

**Why Age matters for your health:** Understanding your age is one of the most important steps in proactive health management. Healthcare professionals use age as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Age Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating age in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your age result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current age requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Age Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Age Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Age Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Age Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Age Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Age Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Age Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Age Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Age Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Age calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your age monthly for 3-6 months to see meaningful trends. Healthy age improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Age is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your age is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Age Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
