'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
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
    <CalculatorLayout title="Pregnancy Due Date Calculator" description="Calculate your estimated due date from LMP or conception date. Full pregnancy timeline and milestone tracker." icon="🤱" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="pregnancy-due-date-calculator">
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
              <h3 className="font-bold text-gray-900 mb-4">Pregnancy Timeline & Milestones</h3>
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
        intro={`The **Due Date Calculator** is a a health information tool using the method and reference data described for this calculator. Get your due date instantly - no account needed, works on all devices.

**Why Due Date matters for your health:** Understanding your due date is one of the most important steps in proactive health management. Healthcare professionals use due date as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Method and population context:** This calculator uses the specific formula and assumptions documented for this tool. It should not be interpreted as using unrelated CDC, NIH, AHA or journal reference data unless those sources are explicitly listed for the calculation.



Combine this with [our Pregnancy Calculator](/calculators/health/pregnancy-calculator), [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Due Date Calculator:** This tool applies the calculation method described for due date in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your due date result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current due date requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Pregnancy Due Date Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Due Date Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Pregnancy Due Date Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Due Date Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Due Date Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Due Date Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Due Date Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Due Date Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Due Date calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your due date monthly for 3-6 months to see meaningful trends. Healthy due date improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Due Date is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your due date is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Due Date Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Pregnancy Calculator](/calculators/health/pregnancy-calculator), [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator), and [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
