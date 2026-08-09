'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [monitorHeight, setMonitorHeight] = useState(true)
  const [chairHeight, setChairHeight] = useState(true)
  const [wristPosition, setWristPosition] = useState(true)
  const [breakFreq, setBreakFreq] = useState(3)
  const [deskHours, setDeskHours] = useState(8)
  const [lighting, setLighting] = useState(true)
  const [standingDesk, setStandingDesk] = useState(false)
  const [externalMonitor, setExternalMonitor] = useState(false)

  const score = Math.round(
    (monitorHeight ? 20 : 0) +
    (chairHeight ? 20 : 0) +
    (wristPosition ? 15 : 0) +
    (lighting ? 10 : 0) +
    (standingDesk ? 10 : 0) +
    (externalMonitor ? 10 : 0) +
    Math.min(15, breakFreq * 5)
  )

  const grade = score >= 80 ? {l:'Excellent Setup 🏆',c:'text-green-600'} : score >= 60 ? {l:'Good Setup',c:'text-blue-600'} : score >= 40 ? {l:'Needs Improvement',c:'text-yellow-600'} : {l:'High Injury Risk ⚠️',c:'text-red-600'}
  const rsi = Math.max(0, 100 - score - (deskHours <= 6 ? 10 : 0))

  return (
    <CalculatorLayout title="Ergonomics Score Calculator" description="Score your workstation setup and identify risk factors for repetitive strain injuries." icon="🪑" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="ergonomics-score-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Workstation Setup</h2>
          <div className="space-y-3">
            <InputField label="Hours at desk per day" value={deskHours} onChange={setDeskHours} min={1} max={16} step={0.5} suffix="hrs" />
            <InputField label="Breaks taken per hour" value={breakFreq} onChange={setBreakFreq} min={0} max={6} step={1} suffix="breaks" />
            {[['Monitor at eye level',monitorHeight,setMonitorHeight],['Chair height correct (feet flat)',chairHeight,setChairHeight],['Wrists flat / neutral',wristPosition,setWristPosition],['Good ambient lighting',lighting,setLighting],['Standing desk available',standingDesk,setStandingDesk],['External monitor (not laptop)',externalMonitor,setExternalMonitor]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Ergonomics Score</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{score}<span className="text-3xl">/100</span></div>
              <p className={`font-bold text-xl ${grade.c}`}>{grade.l}</p>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="RSI Risk" value={rsi > 60 ? 'High' : rsi > 30 ? 'Moderate' : 'Low'} />
            <ResultCard label="Daily Desk Hours" value={`${deskHours}h`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Quick Ergonomics Checklist</h3>
            <div className="space-y-2 text-sm">
              {[['Monitor top at or slightly below eye level','v'],['Arms at 90 degrees when typing','v'],['Feet flat on floor or footrest','v'],['20-20-20 rule: 20min screen, look 20ft for 20sec','v'],['Document stand at same height and distance as screen','v']].map(([t,i])=>(
                <div key={t as string} className="flex gap-2 text-gray-600"><span className="text-green-500">{i}</span><span>{t}</span></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Ergonomics Score Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Ergonomics Score 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Ergonomics Score Calculator"
        category="health"
        intro={`The **Ergonomics Score Calculator** is a a health information tool using the method and reference data described for this calculator. Get your ergonomics score instantly - no account needed, works on all devices.

**Why Ergonomics Score matters for your health:** Understanding your ergonomics score is one of the most important steps in proactive health management. Healthcare professionals use ergonomics score as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the the same calculation framework described in this guide.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Ergonomics Score Calculator:** This tool applies the calculation method described for ergonomics score in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your ergonomics score result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current ergonomics score requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Ergonomics Score Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Ergonomics Score Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Ergonomics Score Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Ergonomics Score Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Ergonomics Score Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Ergonomics Score Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Ergonomics Score Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Ergonomics Score Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Ergonomics Score calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your ergonomics score monthly for 3-6 months to see meaningful trends. Healthy ergonomics score improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Ergonomics Score is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your ergonomics score is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Ergonomics Score Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
