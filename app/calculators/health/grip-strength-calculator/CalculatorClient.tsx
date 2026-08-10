'use client'
import { useState, useMemo, useCallback } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [strength, setStrength] = useState(40)
  const [age, setAge] = useState(40)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const NORMS: Record<string, Record<string, number[]>> = {
    male: {
      '20-29': [39, 46, 53], '30-39': [39, 46, 53], '40-49': [37, 44, 51],
      '50-59': [33, 40, 47], '60-69': [27, 34, 41], '70+': [21, 28, 35],
    },
    female: {
      '20-29': [22, 28, 34], '30-39': [22, 28, 34], '40-49': [21, 27, 33],
      '50-59': [18, 24, 30], '60-69': [15, 21, 27], '70+': [12, 17, 22],
    },
  }

  const result = useMemo(() => {
    const kg = unit === 'imperial' ? strength * 0.453592 : strength
    const band = age < 30 ? '20-29' : age < 40 ? '30-39' : age < 50 ? '40-49' : age < 60 ? '50-59' : age < 70 ? '60-69' : '70+'
    const norms = NORMS[gender][band]
    const [low, avg, high] = norms
    const pct = kg < low ? Math.round((kg / low) * 25) : kg < avg ? Math.round(25 + ((kg - low) / (avg - low)) * 25) : kg < high ? Math.round(50 + ((kg - avg) / (high - avg)) * 25) : Math.round(75 + ((kg - high) / high) * 25)
    const clampedPct = Math.max(1, Math.min(99, pct))
    const level = clampedPct >= 75 ? { l: 'Excellent 💪', c: 'text-green-700 bg-green-50 border-green-200' }
      : clampedPct >= 50 ? { l: 'Above Average ✅', c: 'text-blue-700 bg-blue-50 border-blue-200' }
      : clampedPct >= 25 ? { l: 'Average', c: 'text-yellow-700 bg-yellow-50 border-yellow-200' }
      : { l: 'Below Average - work on it', c: 'text-red-700 bg-red-50 border-red-200' }
    const weakness = (gender === 'male' && kg < 27) || (gender === 'female' && kg < 16)
    return { clampedPct, level, weakness, avg, band }
  }, [strength, age, gender, unit])

  return (
    <CalculatorLayout title="Grip Strength Calculator" description="Assess your grip strength health percentile - one of the strongest predictors of longevity and cardiovascular health." icon="✊" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="grip-strength-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Grip Strength</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v => setUnit(v as any)} options={[{value:'kg',label:'Kilograms (kg)'},{value:'lbs',label:'Pounds (lbs)'}]} />
            <SelectField label="Gender" value={gender} onChange={v => setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label={`Grip Strength (${unit}) - dominant hand`} value={strength} onChange={setStrength} min={5} max={100} step={1} suffix={unit} />
          </div>
          <div className={`mt-5 p-5 rounded-xl border-2 text-center ${result.level.c}`}>
            <p className="text-xs font-bold uppercase opacity-70">Your Percentile</p>
            <p className="text-5xl font-black my-2">{result.clampedPct}th</p>
            <p className="font-bold text-lg">{result.level.l}</p>
            <p className="text-xs mt-1 opacity-70">Age group average: {result.avg}{unit} | Band: {result.band}</p>
          </div>
          {result.weakness && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-700">
              <p className="font-bold">⚠️ Clinically low grip strength</p>
              <p>Below sarcopenia threshold. Consult your doctor.</p>
            </div>
          )}
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Health Implications of Your Score</h3>
            <div className="space-y-3">
              {[
                { metric: 'Cardiovascular risk', desc: result.clampedPct >= 50 ? 'Lower than average - good indicator' : 'Elevated - consider cardiovascular screening', good: result.clampedPct >= 50 },
                { metric: 'Longevity predictor', desc: result.clampedPct >= 60 ? 'Strong predictor of healthy ageing' : 'Improving grip may add healthy years', good: result.clampedPct >= 60 },
                { metric: 'Functional independence', desc: result.clampedPct >= 40 ? 'Good functional capacity predicted' : 'Risk of functional decline - start resistance training', good: result.clampedPct >= 40 },
                { metric: 'Muscle mass indicator', desc: result.clampedPct >= 50 ? 'Likely adequate muscle mass for age' : 'Consider body composition assessment', good: result.clampedPct >= 50 },
              ].map(r => (
                <div key={r.metric} className={`p-3 rounded-xl border-2 flex items-start gap-3 ${r.good ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                  <span className="text-lg mt-0.5">{r.good ? '✅' : '⚠️'}</span>
                  <div><p className="font-bold text-sm text-gray-900">{r.metric}</p><p className="text-xs text-gray-600 mt-0.5">{r.desc}</p></div>
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
          Grip Strength Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Grip Strength tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Grip Strength Calculator"
        category="health"
        intro={`The **Grip Strength Calculator** is a a health information tool using the method and reference data described for this calculator. Get your grip strength instantly - no account needed, works on all devices.

**Why Grip Strength matters for your health:** Understanding your grip strength is one of the most important steps in proactive health management. Healthcare professionals use grip strength as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Grip Strength Calculator:** This tool applies the calculation method described for grip strength in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your grip strength result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current grip strength requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Grip Strength Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Grip Strength Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Grip Strength Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Grip Strength Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Grip Strength Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Grip Strength Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Grip Strength Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Grip Strength Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Grip Strength calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your grip strength monthly for 3-6 months to see meaningful trends. Healthy grip strength improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Grip Strength is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your grip strength is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Grip Strength Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
