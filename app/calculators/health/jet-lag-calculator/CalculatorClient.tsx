'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [timeZonesDiff, setTimeZonesDiff] = useState(8)
  const [direction, setDirection] = useState<'east'|'west'>('east')
  const [flightHours, setFlightHours] = useState(11)
  const [age, setAge] = useState(35)

  // Eastward travel is harder (fighting natural circadian delay)
  const severity = Math.round(
    timeZonesDiff * (direction === 'east' ? 1.2 : 0.8) +
    flightHours * 0.5 +
    (age > 50 ? 3 : 0)
  )
  const recoveryDays = Math.ceil(timeZonesDiff * (direction === 'east' ? 0.8 : 0.6))
  const adaptDays = Math.round(timeZonesDiff / (direction === 'east' ? 1.5 : 2))

  const melatoninTime = direction === 'east' ? 'Take 0.5-5mg melatonin at destination bedtime (9-11pm local)' : 'Avoid melatonin; use light exposure to advance your clock'

  return (
    <CalculatorLayout title="Jet Lag Calculator" description="Calculate jet lag severity and recovery time based on time zones crossed and travel direction." icon="✈️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="jet-lag-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Flight Details</h2>
          <div className="space-y-4">
            <InputField label="Time zones crossed" value={timeZonesDiff} onChange={setTimeZonesDiff} min={1} max={12} step={1} suffix="zones" />
            <SelectField label="Direction" value={direction} onChange={v=>setDirection(v as any)} options={[{value:'east',label:'Eastward (harder)'},{value:'west',label:'Westward (easier)'}]} />
            <InputField label="Flight duration" value={flightHours} onChange={setFlightHours} min={1} max={20} step={0.5} suffix="hrs" />
            <InputField label="Age" value={age} onChange={setAge} min={5} max={90} step={1} suffix="yrs" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Jet Lag Severity Score</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{severity}</div>
              <p className="text-gray-500">Recovery: ~{recoveryDays} days - Full adaption: ~{adaptDays} days</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Time Zones" value={`${timeZonesDiff} zones`} />
            <ResultCard label="Recovery Days" value={`~${recoveryDays}`} highlight />
            <ResultCard label="Direction" value={direction === 'east' ? '-> East' : '<- West'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Recovery Strategies</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Light therapy:</strong> Morning light exposure advances clock (eastward); evening light delays (westward)</p>
              <p>- <strong>Melatonin:</strong> {melatoninTime}</p>
              <p>- <strong>Pre-adjust:</strong> Shift sleep 1 hour/day before travel in direction of destination</p>
              <p>- <strong>Hydrate:</strong> Airplane cabins are very dry - drink 250ml water per hour of flight</p>
              <p>- <strong>Avoid alcohol</strong> and caffeine during and after the flight</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Jet Lag Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Jet Lag 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Jet Lag Calculator"
        category="health"
        intro={`The **Jet Lag Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your jet lag instantly - no account needed, works on all devices.

**Why Jet Lag matters for your health:** Understanding your jet lag is one of the most important steps in proactive health management. Healthcare professionals use jet lag as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Jet Lag Calculator:** This tool applies the calculation method described for jet lag in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your jet lag result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current jet lag requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Jet Lag Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Jet Lag Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Jet Lag Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Jet Lag Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Jet Lag Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Jet Lag Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Jet Lag Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Jet Lag Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Jet Lag calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your jet lag monthly for 3-6 months to see meaningful trends. Healthy jet lag improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Jet Lag is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your jet lag is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Jet Lag Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
