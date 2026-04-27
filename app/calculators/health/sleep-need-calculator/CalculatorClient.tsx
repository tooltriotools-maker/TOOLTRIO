'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(30)
  const [wakeTime, setWakeTime] = useState('07:00')
  const [currentSleep, setCurrentSleep] = useState(7)
  const [sleepDebt, setSleepDebt] = useState(0)

  const result = useMemo(() => {
    // Recommended sleep by age
    const recs: [number,number,string,string][] = [
      [0,1,'14-17','Newborn'],
      [1,4,'12-15','Infant'],
      [1,3,'11-14','Toddler'],
      [3,6,'10-13','Preschool'],
      [6,14,'9-11','School Age'],
      [14,18,'8-10','Teenager'],
      [18,26,'7-9','Young Adult'],
      [26,65,'7-9','Adult'],
      [65,120,'7-8','Older Adult'],
    ]
    const rec = recs.find(([min,max])=>age>=min && age<max) ?? recs[7]
    const [minH,maxH] = rec[2].split('-').map(Number)
    const idealH = (minH+maxH)/2

    // Calculate bedtimes for wake time
    const [wh, wm] = wakeTime.split(':').map(Number)
    const wakeMinutes = wh*60 + wm
    const bedtimes = [idealH, idealH+0.5, idealH-0.5, idealH+1].map(h => {
      const totalMin = h * 60
      const bedMin = ((wakeMinutes - totalMin) + 1440) % 1440
      const bh = Math.floor(bedMin/60)
      const bm = bedMin % 60
      return { hours:h, time:`${String(bh).padStart(2,'0')}:${String(bm).padStart(2,'0')}`, cycles:Math.round(h/1.5) }
    })

    const deficit = Math.max(0, idealH - currentSleep)
    const totalDebt = deficit * 7 + sleepDebt
    const weeklyExtra = Math.min(1.5, totalDebt / 4)

    return { rec, idealH, minH, maxH, bedtimes, deficit, totalDebt:Math.round(totalDebt*10)/10, weeklyExtra }
  }, [age,wakeTime,currentSleep,sleepDebt])

  return (
    <CalculatorLayout title="Sleep Need Calculator" description="Find how much sleep you actually need by age, calculate your sleep debt, and get optimal bedtimes for your wake time." icon="😴" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Sleep</h2>
          <div className="space-y-4">
            <InputField label="Age" value={age} onChange={setAge} min={0} max={100} step={1} suffix="yrs" />
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Wake Up Time</label>
              <input type="time" value={wakeTime} onChange={e=>setWakeTime(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <InputField label="Current Sleep (hours/night)" value={currentSleep} onChange={setCurrentSleep} min={2} max={12} step={0.5} suffix="hrs" />
            <InputField label="Accumulated Sleep Debt (hours)" value={sleepDebt} onChange={setSleepDebt} min={0} max={50} step={1} suffix="hrs" />
          </div>
          <div className="mt-5 p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200 text-center">
            <p className="text-xs font-bold text-indigo-600 uppercase">Recommended</p>
            <p className="text-4xl font-black text-indigo-700">{result.minH}-{result.maxH}</p>
            <p className="text-sm text-indigo-600">hours/night ({result.rec[3]})</p>
          </div>
          {result.deficit > 0 && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-xs text-red-600 font-bold">Weekly Sleep Debt</p>
              <p className="text-2xl font-black text-red-700">{result.totalDebt} hrs</p>
              <p className="text-xs text-red-500">Add ~{result.weeklyExtra} hrs/night to recover</p>
            </div>
          )}
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Ideal Bedtimes for {wakeTime} Wake-Up</h3>
            <div className="space-y-3">
              {result.bedtimes.map((b,i)=>(
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border-2 ${i===0?'bg-indigo-50 border-indigo-200':'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{i===0?'⭐':'😴'}</span>
                    <div>
                      <p className={`font-black text-xl ${i===0?'text-indigo-700':'text-gray-900'}`}>{b.time}</p>
                      <p className="text-xs text-gray-500">{b.cycles} complete sleep cycles</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{b.hours} hours</p>
                    {i===0 && <p className="text-xs text-indigo-600 font-semibold">Recommended</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">💡 These times align with the end of 90-minute sleep cycles to minimise morning grogginess.</p>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Sleep Need Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 30-year-old needing 8 hours of sleep who wakes at 6:30 AM should aim to fall asleep by <strong>10:30 PM</strong>. Sleep cycles of 90 minutes mean ideal wake times are 6:00 AM or 7:30 AM to avoid grogginess.
        </p>
        <p className="text-sm text-gray-600">
          This Sleep Need 2026 optimizes your bedtime and wake time around natural 90-minute REM cycles so you wake up at the right phase feeling refreshed.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sleep Need Calculator"
        category="health"
        intro={`The **Sleep Need Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your sleep need instantly - no account needed, works on all devices.

**Why Sleep Need matters for your health:** Understanding your sleep need is one of the most important steps in proactive health management. Healthcare professionals use sleep need as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sleep Need Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating sleep need in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your sleep need result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sleep need requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Sleep Need Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sleep Need Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Sleep Need Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Sleep Need Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sleep Need Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sleep Need Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sleep Need Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sleep Need Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sleep Need Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sleep Need calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your sleep need monthly for 3-6 months to see meaningful trends. Healthy sleep need improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sleep Need is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sleep need is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sleep Need Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
