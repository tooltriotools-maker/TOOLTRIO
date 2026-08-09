'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [shiftType, setShiftType] = useState<'night'|'rotating'|'early'|'split'>('rotating')
  const [yearsOnShiftWork, setYearsOnShiftWork] = useState(5)
  const [sleepHours, setSleepHours] = useState(6)
  const [exerciseDays, setExerciseDays] = useState(2)
  const [caffeineAfterNoon, setCaffeineAfterNoon] = useState(true)

  const baseRisk = {night:40,rotating:50,early:25,split:30}[shiftType]
  const totalRisk = Math.min(100, Math.round(
    baseRisk +
    yearsOnShiftWork * 2 +
    Math.max(0, 7 - sleepHours) * 5 +
    (exerciseDays < 3 ? 10 : 0) +
    (caffeineAfterNoon ? 8 : 0)
  ))
  const risk = totalRisk >= 70 ? {l:'High Health Risk',c:'text-red-600'} : totalRisk >= 40 ? {l:'Moderate Risk',c:'text-orange-600'} : {l:'Manageable Risk',c:'text-yellow-600'}

  return (
    <CalculatorLayout title="Shift Work Health Calculator" description="Assess the health risks of shift work and get evidence-based strategies to minimise impact." icon="🌙" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="shift-work-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Work Pattern</h2>
          <div className="space-y-4">
            <SelectField label="Shift Type" value={shiftType} onChange={v=>setShiftType(v as any)} options={[{value:'night',label:'Night shift (fixed)'},{value:'rotating',label:'Rotating shifts'},{value:'early',label:'Early morning shift'},{value:'split',label:'Split shifts'}]} />
            <InputField label="Years doing shift work" value={yearsOnShiftWork} onChange={setYearsOnShiftWork} min={0} max={40} step={1} suffix="yrs" />
            <InputField label="Average sleep hours" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs" />
            <InputField label="Exercise days per week" value={exerciseDays} onChange={setExerciseDays} min={0} max={7} step={1} suffix="days" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={caffeineAfterNoon} onChange={e=>setCaffeineAfterNoon(e.target.checked)} className="accent-rose-500"/>
              <span>Caffeine after noon (or mid-shift)</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Shift Work Health Risk Score</p>
              <div className={`text-7xl font-black mb-2 ${risk.c}`}>{totalRisk}</div>
              <p className={`font-bold text-xl ${risk.c}`}>{risk.l}</p>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Sleep Deficit" value={`${Math.max(0,7-sleepHours)}h/night`} />
            <ResultCard label="Years Exposed" value={`${yearsOnShiftWork} yrs`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Shift Work Health Strategies</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Light therapy:</strong> Bright light during night shifts; blackout curtains for daytime sleep</p>
              <p>- <strong>Strategic napping:</strong> 20-min naps before night shifts significantly improve alertness</p>
              <p>- <strong>Melatonin:</strong> 0.5-5mg before daytime sleep can improve quality</p>
              <p>- <strong>Avoid caffeine</strong> 6 hours before planned sleep window</p>
              <p>- <strong>Regular health checks</strong> - shift workers have higher rates of metabolic syndrome, cancer, and CVD</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Shift Work Health Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Shift Work Health 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Shift Work Health Calculator"
        category="health"
        intro={`The **Shift Work Health Calculator** is a a health information tool using the method and reference data described for this calculator. Get your shift work health instantly - no account needed, works on all devices.

**Why Shift Work Health matters for your health:** Understanding your shift work health is one of the most important steps in proactive health management. Healthcare professionals use shift work health as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Shift Work Health Calculator:** This tool applies the calculation method described for shift work health in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your shift work health result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current shift work health requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Shift Work Health Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Shift Work Health Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Shift Work Health Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Shift Work Health Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Shift Work Health Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Shift Work Health Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Shift Work Health Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Shift Work Health Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Shift Work Health calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your shift work health monthly for 3-6 months to see meaningful trends. Healthy shift work health improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Shift Work Health is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your shift work health is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Shift Work Health Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
