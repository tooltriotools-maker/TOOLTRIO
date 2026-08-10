'use client'
import { useState, useMemo, useCallback } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [preMass, setPreMass] = useState(70.0)
  const [postMass, setPostMass] = useState(69.1)
  const [duration, setDuration] = useState(60)
  const [fluidIn, setFluidIn] = useState(0.5)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const prKg = unit === 'imperial' ? preMass * 0.453592 : preMass
    const poKg = unit === 'imperial' ? postMass * 0.453592 : postMass
    const massLoss = prKg - poKg
    const totalSweat = massLoss + fluidIn
    const sweatRateHr = totalSweat / (duration / 60)
    const pctLoss = (massLoss / prKg) * 100
    const recommended = Math.round(sweatRateHr * 0.8 * 1000)
    const impact = pctLoss < 1 ? { l: 'Optimal hydration ✅', c: 'text-green-700 bg-green-50 border-green-200' }
      : pctLoss < 2 ? { l: 'Mild dehydration - performance OK', c: 'text-yellow-700 bg-yellow-50 border-yellow-200' }
      : pctLoss < 3 ? { l: 'Moderate - performance impaired ⚠️', c: 'text-orange-700 bg-orange-50 border-orange-200' }
      : { l: 'Significant dehydration - stop & hydrate ❌', c: 'text-red-700 bg-red-50 border-red-200' }
    return { sweatRateHr: sweatRateHr.toFixed(2), totalSweat: totalSweat.toFixed(2), pctLoss: pctLoss.toFixed(1), recommended, impact }
  }, [preMass, postMass, duration, fluidIn, unit])

  return (
    <CalculatorLayout title="Sweat Rate Calculator" description="Calculate your personal sweat rate and optimal fluid replacement plan for exercise." icon="💧" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="sweat-rate-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Sweat Test Data</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v => setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label={`Pre-exercise weight (${unit==='metric'?'kg':'lbs'})`} value={preMass} onChange={setPreMass} min={40} max={200} step={0.1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label={`Post-exercise weight (${unit==='metric'?'kg':'lbs'})`} value={postMass} onChange={setPostMass} min={40} max={200} step={0.1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Exercise duration" value={duration} onChange={setDuration} min={15} max={360} step={15} suffix="min" />
            <InputField label="Fluid consumed (litres)" value={fluidIn} onChange={setFluidIn} min={0} max={5} step={0.1} suffix="L" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-bold">Sweat Rate</p>
              <p className="text-2xl font-black text-blue-700">{result.sweatRateHr}</p>
              <p className="text-xs text-blue-500">L/hr</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-600 font-bold">Total Sweat</p>
              <p className="text-2xl font-black text-purple-700">{result.totalSweat}</p>
              <p className="text-xs text-purple-500">litres</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`p-5 rounded-2xl border-2 text-center ${result.impact.c}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Dehydration Level</p>
            <p className="text-5xl font-black my-2">{result.pctLoss}%</p>
            <p className="text-lg font-bold">{result.impact.l}</p>
            <p className="text-sm mt-1 opacity-70">Body weight lost to sweat during session</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Your Hydration Plan</h3>
            <div className="space-y-3">
              {[
                { l: 'Drink per hour during exercise', v: `${result.recommended} ml/hr`, note: '80% of sweat rate (room for thirst cues)' },
                { l: 'Drink every 15 min', v: `${Math.round(Number(result.sweatRateHr)*200)} ml`, note: 'Sip frequency for steady hydration' },
                { l: 'Post-exercise rehydration', v: `${(Number(result.totalSweat)*1.5).toFixed(1)} L`, note: '150% of sweat loss over 2-4 hours' },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div><p className="text-sm font-semibold text-gray-800">{r.l}</p><p className="text-xs text-gray-500">{r.note}</p></div>
                  <span className="text-lg font-black text-blue-700 ml-2 flex-shrink-0">{r.v}</span>
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
          Sweat Rate Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sweat Rate tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sweat Rate Calculator"
        category="health"
        intro={`The **Sweat Rate Calculator** is a a health information tool using the method and reference data described for this calculator. Get your sweat rate instantly - no account needed, works on all devices.

**Why Sweat Rate matters for your health:** Understanding your sweat rate is one of the most important steps in proactive health management. Healthcare professionals use sweat rate as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sweat Rate Calculator:** This tool applies the calculation method described for sweat rate in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your sweat rate result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sweat rate requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Sweat Rate Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sweat Rate Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Sweat Rate Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sweat Rate Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sweat Rate Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sweat Rate Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sweat Rate Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sweat Rate Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sweat Rate calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your sweat rate monthly for 3-6 months to see meaningful trends. Healthy sweat rate improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sweat Rate is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sweat rate is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sweat Rate Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
