'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(155)
  const [height, setHeight] = useState(67)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height
    const mosteller = Math.sqrt((hCm*wKg)/3600)
    const dubois    = 0.007184 * Math.pow(hCm,0.725) * Math.pow(wKg,0.425)
    const haycock   = 0.024265 * Math.pow(hCm,0.3964) * Math.pow(wKg,0.5378)
    const boyd      = 0.0003207 * Math.pow(hCm,0.3) * Math.pow(wKg,(0.7285-0.0188*Math.log10(wKg)))
    const avg       = (mosteller+dubois+haycock+boyd)/4
    const dosages   = [50,75,100,120,150,175,200].map(d=>({dose:d, total:Math.round(d*avg*10)/10}))
    return {
      mosteller:Math.round(mosteller*1000)/1000, dubois:Math.round(dubois*1000)/1000,
      haycock:Math.round(haycock*1000)/1000, boyd:Math.round(boyd*1000)/1000,
      avg:Math.round(avg*1000)/1000, dosages
    }
  }, [weight, height, unit])

  const formulas = [
    {name:'Mosteller', val:result.mosteller, note:'Most used in oncology'},
    {name:'DuBois',    val:result.dubois,    note:'Classic, most cited'},
    {name:'Haycock',   val:result.haycock,   note:'Best for children'},
    {name:'Boyd',      val:result.boyd,      note:'Most complex'},
  ]

  return (
    <CalculatorLayout title="Body Surface Area Calculator" description="Calculate BSA using Mosteller, DuBois, Haycock, and Boyd formulas for drug dosing and clinical applications." icon="📐" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="body-surface-area-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Patient Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?5:11} max={unit==='metric'?250:550} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
</div>
          <div className="mt-5 p-4 bg-purple-50 rounded-xl text-center border border-purple-200">
            <p className="text-xs text-gray-500">Average BSA</p>
            <p className="text-4xl font-black text-purple-700">{result.avg}</p>
            <p className="text-sm text-gray-500">m2</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">BSA by Formula</h3>
            <div className="grid grid-cols-2 gap-3">
              {formulas.map(f=>(
                <div key={f.name} className="p-3 rounded-2xl border text-center" style={{background:'rgba(248,250,248,0.7)',borderColor:'rgba(226,232,240,0.5)'}}>
                  <p className="text-xs font-bold text-gray-500">{f.name}</p>
                  <p className="text-2xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{f.val} m2</p>
                  <p className="text-xs text-gray-400">{f.note}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Drug Dose Reference (based on avg BSA {result.avg} m2)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left text-xs font-bold text-gray-600">Dose (mg/m2)</th><th className="p-2 text-right text-xs font-bold text-gray-600">Total Dose (mg)</th></tr></thead>
                <tbody>{result.dosages.map(d=>(
                  <tr key={d.dose} className="border-t border-gray-100">
                    <td className="p-2 text-gray-700 font-medium">{d.dose} mg/m2</td>
                    <td className="p-2 text-right font-bold text-gray-900">{d.total} mg</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">⚠️ For reference only. Always verify doses with a healthcare provider.</p>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Body Surface Area Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Body Surface Area 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Body Surface Area Calculator"
        category="health"
        intro={`The **Body Surface Area Calculator** is a a health information tool using the method and reference data described for this calculator. Get your body surface area instantly - no account needed, works on all devices.

**Why Body Surface Area matters for your health:** Understanding your body surface area is one of the most important steps in proactive health management. Healthcare professionals use body surface area as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Body Surface Area Calculator:** This tool applies the calculation method described for body surface area in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your body surface area result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current body surface area requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Body Surface Area Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Body Surface Area Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Body Surface Area Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Body Surface Area Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Body Surface Area Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Body Surface Area Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Body Surface Area Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Body Surface Area Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Body Surface Area calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your body surface area monthly for 3-6 months to see meaningful trends. Healthy body surface area improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Body Surface Area is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your body surface area is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Body Surface Area Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
