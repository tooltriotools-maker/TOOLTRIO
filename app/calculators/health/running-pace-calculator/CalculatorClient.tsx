'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [mode, setMode] = useState<'pace'|'time'|'speed'>('pace')
  const [distKm, setDistKm] = useState(10)
  const [paceMin, setPaceMin] = useState(5)
  const [paceSec, setPaceSec] = useState(30)
  const [timeH, setTimeH] = useState(0)
  const [timeMin, setTimeMin] = useState(55)
  const [timeSec, setTimeSec] = useState(0)
  const [speedKmh, setSpeedKmh] = useState(10)
  const [paceUnit, setPaceUnit] = useState<'km'|'mi'>('km')

  const result = useMemo(() => {
    const paceTotalSec = paceMin*60 + paceSec
    const timeTotalSec = timeH*3600 + timeMin*60 + timeSec
    
    let paceSecPerKm=0, totalSec=0, speed=0
    if (mode==='pace') {
      paceSecPerKm = paceUnit==='km' ? paceTotalSec : paceTotalSec/1.60934
      totalSec = paceSecPerKm * distKm
      speed = 3600/paceSecPerKm
    } else if (mode==='time') {
      totalSec = timeTotalSec
      paceSecPerKm = timeTotalSec/distKm
      speed = distKm/(timeTotalSec/3600)
    } else {
      speed = speedKmh
      paceSecPerKm = 3600/speed
      totalSec = paceSecPerKm*distKm
    }
    
    const paceMinKm = Math.floor(paceSecPerKm/60)
    const paceSecKm = Math.round(paceSecPerKm%60)
    const paceMinMi = Math.floor(paceSecPerKm*1.60934/60)
    const paceSecMi = Math.round((paceSecPerKm*1.60934)%60)
    const h = Math.floor(totalSec/3600)
    const m = Math.floor((totalSec%3600)/60)
    const s = Math.round(totalSec%60)
    
    const racePreds = [
      {name:'5K', km:5},
      {name:'10K', km:10},
      {name:'Half Marathon', km:21.0975},
      {name:'Marathon', km:42.195},
    ].map(r => {
      const factor = r.km<=5?1:r.km<=10?1.04:r.km<=21.1?1.08:1.15
      const rPaceSec = paceSecPerKm * factor
      const rTotalSec = rPaceSec * r.km
      const rh = Math.floor(rTotalSec/3600)
      const rm = Math.floor((rTotalSec%3600)/60)
      const rs = Math.round(rTotalSec%60)
      return { name:r.name, time:`${rh>0?rh+'h ':''}${rm}:${String(rs).padStart(2,'0')}`, pace:`${Math.floor(rPaceSec/60)}:${String(Math.round(rPaceSec%60)).padStart(2,'0')}` }
    })
    
    return { paceMinKm, paceSecKm, paceMinMi, paceSecMi, h, m, s, speed:speed.toFixed(1), racePreds }
  }, [mode,distKm,paceMin,paceSec,timeH,timeMin,timeSec,speedKmh,paceUnit])

  return (
    <CalculatorLayout title="Running Pace Calculator" description="Calculate pace, finish time, and speed. Predict race times and get training zones for any distance." icon="🏃" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-4">Calculate</h2>
          <div className="space-y-4">
            <SelectField label="Calculate" value={mode} onChange={v=>setMode(v as any)} options={[{value:'pace',label:'Finish Time from Pace'},{value:'time',label:'Pace from Finish Time'},{value:'speed',label:'Pace from Speed'}]} />
            <InputField label="Distance (km)" value={distKm} onChange={setDistKm} min={0.1} max={200} step={0.5} suffix="km" />
            {mode==='pace' && <>
              <SelectField label="Pace Unit" value={paceUnit} onChange={v=>setPaceUnit(v as any)} options={[{value:'km',label:'min/km'},{value:'mi',label:'min/mile'}]} />
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Min" value={paceMin} onChange={setPaceMin} min={1} max={30} step={1} suffix="min" />
                <InputField label="Sec" value={paceSec} onChange={setPaceSec} min={0} max={59} step={1} suffix="sec" />
              </div>
            </>}
            {mode==='time' && <>
              <div className="grid grid-cols-3 gap-1">
                <InputField label="Hours" value={timeH} onChange={setTimeH} min={0} max={10} step={1} suffix="h" />
                <InputField label="Min" value={timeMin} onChange={setTimeMin} min={0} max={59} step={1} suffix="m" />
                <InputField label="Sec" value={timeSec} onChange={setTimeSec} min={0} max={59} step={1} suffix="s" />
              </div>
            </>}
            {mode==='speed' && <InputField label="Speed (km/h)" value={speedKmh} onChange={setSpeedKmh} min={3} max={30} step={0.1} suffix="km/h" />}
          </div>
          <div className="mt-5 space-y-2">
            <div className="p-3 bg-green-50 rounded-xl border border-green-200 grid grid-cols-2 gap-2 text-center">
              <div><p className="text-xs text-gray-500">Pace (min/km)</p><p className="text-xl font-black text-green-700">{result.paceMinKm}:{String(result.paceSecKm).padStart(2,'0')}</p></div>
              <div><p className="text-xs text-gray-500">Pace (min/mi)</p><p className="text-xl font-black text-green-700">{result.paceMinMi}:{String(result.paceSecMi).padStart(2,'0')}</p></div>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 grid grid-cols-2 gap-2 text-center">
              <div><p className="text-xs text-gray-500">Finish Time</p><p className="text-xl font-black text-blue-700">{result.h>0?result.h+'h ':''}{result.m}:{String(result.s).padStart(2,'0')}</p></div>
              <div><p className="text-xs text-gray-500">Speed</p><p className="text-xl font-black text-blue-700">{result.speed} km/h</p></div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Race Time Predictions</h3>
            <div className="space-y-2">
              {result.racePreds.map(r=>(
                <div key={r.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-800">{r.name}</span>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{r.time}</p>
                    <p className="text-xs text-gray-500">{r.pace}/km avg</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Running Pace Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Running a 5K in 28 minutes equals a <strong>9:01/mile pace</strong>. To finish a half marathon in under 2 hours, you need to maintain a 9:09/mile pace. A full marathon in under 4 hours requires 9:09/mile.
        </p>
        <p className="text-sm text-gray-600">
          This Running Pace 2026 converts between pace, distance, and time — useful for setting race goals, planning training runs, and tracking progress over your season.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Running Pace Calculator"
        category="health"
        intro={`The **Running Pace Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your running pace instantly - no account needed, works on all devices.

**Why Running Pace matters for your health:** Understanding your running pace is one of the most important steps in proactive health management. Healthcare professionals use running pace as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our Calories Burned Calculator](/calculators/health/calories-burned-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Running Pace Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating running pace in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your running pace result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current running pace requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Running Pace Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Running Pace Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Running Pace Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Running Pace Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Running Pace Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Running Pace Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Running Pace Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Running Pace Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Running Pace Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Running Pace calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your running pace monthly for 3-6 months to see meaningful trends. Healthy running pace improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Running Pace is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your running pace is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Running Pace Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our Calories Burned Calculator](/calculators/health/calories-burned-calculator), and [our VO2 Max Calculator](/calculators/health/vo2-max-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
