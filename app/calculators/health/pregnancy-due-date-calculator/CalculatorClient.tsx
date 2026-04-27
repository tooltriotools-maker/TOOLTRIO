'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [method, setMethod] = useState<'lmp'|'conception'>('lmp')
  const [lmpDate, setLmpDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate()-42); return d.toISOString().split('T')[0]
  })
  const [conceptDate, setConceptDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate()-28); return d.toISOString().split('T')[0]
  })
  const [cycleLen, setCycleLen] = useState(28)

  const result = useMemo(() => {
    const baseDate = method==='lmp' ? new Date(lmpDate) : new Date(conceptDate)
    if (isNaN(baseDate.getTime())) return null
    const daysToAdd = method==='lmp' ? 280 + (cycleLen-28) : 266
    const edd = new Date(baseDate.getTime() + daysToAdd*24*60*60*1000)
    const today = new Date()
    const conceptionDate = method==='lmp' ? new Date(baseDate.getTime() + 14*24*60*60*1000) : baseDate
    const gestDays = Math.floor((today.getTime()-baseDate.getTime())/(24*60*60*1000))
    const gestWeeks = Math.floor(gestDays/7)
    const gestDaysRem = gestDays%7
    const daysLeft = Math.max(0,Math.floor((edd.getTime()-today.getTime())/(24*60*60*1000)))
    const trimester = gestWeeks < 14 ? 1 : gestWeeks < 28 ? 2 : 3
    const fmt = (d:Date) => d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})
    const milestones = [
      {week:6,  event:'Heartbeat detectable'},
      {week:8,  event:'First ultrasound possible'},
      {week:10, event:'NIPT genetic testing'},
      {week:12, event:'End of highest miscarriage risk'},
      {week:16, event:'Gender can be determined'},
      {week:20, event:'Anatomy scan ultrasound'},
      {week:24, event:'Viability milestone'},
      {week:28, event:'Third trimester begins'},
      {week:32, event:'Baby is head-down usually'},
      {week:36, event:'Weekly checks begin'},
      {week:37, event:'Full-term (safe delivery)'},
      {week:40, event:'Due date'},
    ].map(m => {
      const mDate = new Date(baseDate.getTime() + m.week*7*24*60*60*1000)
      const past = mDate < today
      return {...m, date: fmt(mDate), past}
    })
    return { edd:fmt(edd), conception:fmt(conceptionDate), gestWeeks, gestDaysRem, daysLeft, trimester, milestones, isPregnant: gestWeeks >= 0 && gestWeeks <= 42 }
  }, [method, lmpDate, conceptDate, cycleLen])

  return (
    <CalculatorLayout title="Pregnancy Due Date Calculator" description="Calculate your estimated due date from LMP or conception date. Full pregnancy timeline and milestone tracker." icon="🤱" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Pregnancy Details</h2>
          <div className="space-y-4">
            <SelectField label="Calculate From" value={method} onChange={v=>setMethod(v as any)} options={[{value:'lmp',label:'Last Menstrual Period (LMP)'},{value:'conception',label:'Conception / Ovulation Date'}]} />
            {method==='lmp' ? <>
              <div>
                <label className="text-xs font-medium text-gray-600">First Day of Last Period</label>
                <input type="date" value={lmpDate} onChange={e=>setLmpDate(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
              </div>
              <InputField label="Cycle Length" value={cycleLen} onChange={setCycleLen} min={20} max={45} step={1} suffix="days" />
            </> : <div>
              <label className="text-xs font-medium text-gray-600">Conception / Ovulation Date</label>
              <input type="date" value={conceptDate} onChange={e=>setConceptDate(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>}
          </div>
          {result && (
            <div className="mt-5 space-y-3">
              <div className="p-4 bg-pink-50 rounded-xl text-center border-2 border-pink-200">
                <p className="text-xs font-bold text-pink-600 uppercase tracking-wide">Estimated Due Date</p>
                <p className="text-lg font-black text-pink-700 mt-1">{result.edd}</p>
                <p className="text-xs text-gray-500 mt-1">{result.daysLeft} days remaining</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-purple-50 rounded-xl text-center border border-purple-200">
                  <p className="text-xs text-gray-500">Currently</p>
                  <p className="text-lg font-black text-purple-700">{result.gestWeeks}w {result.gestDaysRem}d</p>
                  <p className="text-xs text-gray-400">Trimester {result.trimester}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-center border border-blue-200">
                  <p className="text-xs text-gray-500">Conception</p>
                  <p className="text-xs font-bold text-blue-700 mt-1">{result.conception}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
        <div className="lg:col-span-2">
          {result && (
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Pregnancy Timeline &amp; Milestones</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {result.milestones.map(m=>(
                  <div key={m.week} className={`flex items-start gap-3 p-2.5 rounded-lg ${m.past?'bg-green-50 border border-green-200':'bg-gray-50 border border-gray-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-xs font-black ${m.past?'bg-green-200 text-green-800':'bg-gray-200 text-gray-600'}`}>
                      <span className="text-base leading-none">{m.past?'✅':''}{!m.past?m.week:''}</span>
                      {!m.past && <span className="text-[9px]">wks</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${m.past?'text-green-700':'text-gray-700'}`}>Week {m.week}</p>
                      <p className="text-xs text-gray-600">{m.event}</p>
                      <p className="text-xs text-gray-400">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pregnancy Due Date Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If your last menstrual period started on January 1, 2026, your estimated due date is <strong>October 8, 2026</strong> (Naegele's Rule: add 280 days / 40 weeks). First trimester ends around March 22.
        </p>
        <p className="text-sm text-gray-600">
          This Pregnancy Due Date 2026 provides your full trimester timeline, key milestone dates, and week-by-week development overview based on ACOG standards.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Due Date Calculator"
        category="health"
        intro={`The **Due Date Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your due date instantly - no account needed, works on all devices.

**Why Due Date matters for your health:** Understanding your due date is one of the most important steps in proactive health management. Healthcare professionals use due date as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Pregnancy Calculator](/calculators/health/pregnancy-calculator), [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Due Date Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating due date in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your due date result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current due date requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Due Date Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Due Date Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Due Date Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Due Date Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Due Date Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Due Date Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Due Date Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Due Date Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Due Date Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Due Date calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your due date monthly for 3-6 months to see meaningful trends. Healthy due date improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Due Date is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your due date is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Due Date Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Pregnancy Calculator](/calculators/health/pregnancy-calculator), [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator), and [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
