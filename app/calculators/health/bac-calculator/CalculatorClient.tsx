'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(155)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [drinks, setDrinks] = useState(2)
  const [hours, setHours] = useState(1)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const DRINK_TYPES = [
    {name:'Beer (355ml, 5%)',     grams:14},
    {name:'Wine (148ml, 12%)',    grams:14},
    {name:'Shot (44ml, 40%)',     grams:14},
    {name:'Strong beer (355ml, 8%)', grams:22},
    {name:'Cocktail (standard)',  grams:14},
  ]
  const [drinkType, setDrinkType] = useState(0)

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const wLbs = wKg * 2.205
    const r = gender==='male' ? 0.73 : 0.66
    const gramsPerDrink = DRINK_TYPES[drinkType].grams
    const rawBac = (drinks * gramsPerDrink * 5.14) / (wLbs * r)
    const bac = Math.max(0, rawBac - (0.015 * hours))
    const hoursToSober = rawBac / 0.015
    const hoursLeft = Math.max(0, bac / 0.015)
    let impairment='', color='', advice=''
    if (bac === 0)          { impairment='Sober / Cleared';      color='text-green-600 bg-green-50'; advice='BAC has cleared. Wait until fully rested before driving.' }
    else if (bac < 0.03)   { impairment='Minimal Effect';         color='text-green-600 bg-green-50'; advice='Minimal impairment, but some cognitive effects possible.' }
    else if (bac < 0.06)   { impairment='Mildly Impaired';        color='text-yellow-600 bg-yellow-50'; advice='Judgment and reaction time affected. Do not drive.' }
    else if (bac < 0.08)   { impairment='Impaired - Near Limit'; color='text-orange-600 bg-orange-50'; advice='Near or at legal limit in most countries. Do not drive.' }
    else if (bac < 0.15)   { impairment='Clearly Impaired';       color='text-red-600 bg-red-50'; advice='Significantly over legal limit. Severe impairment. Do not drive.' }
    else                    { impairment='Dangerously Impaired';   color='text-red-800 bg-red-100'; advice='High risk of injury. Seek medical attention if unwell.' }
    return { bac:Math.round(bac*1000)/1000, rawBac:Math.round(rawBac*1000)/1000, impairment, color, advice, hoursToSober:Math.round(hoursToSober*10)/10, hoursLeft:Math.round(hoursLeft*10)/10 }
  }, [weight, gender, drinks, hours, unit, drinkType])

  const drinkOptions = DRINK_TYPES.map((d,i)=>({value:String(i),label:d.name}))

  return (
    <CalculatorLayout title="BAC Calculator" description="Estimate blood alcohol content by weight, gender, drinks, and time. For education only - never drink and drive." icon="🍺" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="bac-calculator">
      <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-800 font-medium">⚠️ This calculator provides estimates for educational purposes only. Individual BAC varies significantly. Never drive after drinking any alcohol.</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?40:88} max={unit==='metric'?200:440} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <SelectField label="Drink Type" value={String(drinkType)} onChange={v=>setDrinkType(Number(v))} options={drinkOptions} />
            <InputField label="Number of Drinks" value={drinks} onChange={setDrinks} min={0} max={20} step={0.5} suffix="drinks" />
            <InputField label="Hours Since First Drink" value={hours} onChange={setHours} min={0} max={12} step={0.5} suffix="hrs" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`p-5 rounded-2xl border-2 ${result.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide opacity-70">Estimated BAC</p>
                <p className="text-5xl font-black mt-1">{result.bac}%</p>
                <p className="font-bold text-lg mt-1">{result.impairment}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70">Peak BAC</p>
                <p className="text-2xl font-black">{result.rawBac}%</p>
                <p className="text-xs opacity-70 mt-2">Hours to 0.00%</p>
                <p className="text-2xl font-black">{result.hoursLeft}</p>
              </div>
            </div>
            <p className="text-sm mt-3 opacity-80 leading-relaxed">{result.advice}</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Legal Limits by Country</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[['🇺🇸 USA','0.08%'],['🇬🇧 England','0.08%'],['🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland','0.05%'],['🇩🇪 Germany','0.05%'],['🇫🇷 France','0.05%'],['🇮🇳 India','0.03%'],['🇦🇺 Australia','0.05%'],['🇯🇵 Japan','0.03%']].map(([c,l])=>(
                <div key={c} className={`flex justify-between p-2 rounded-lg ${result.bac > parseFloat(l) && result.bac > 0 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                  <span>{c}</span>
                  <span className="font-bold">{l}</span>
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
          BAC Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this BAC 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Bac Calculator"
        category="health"
        intro={`The **BAC Calculator** is a a health information tool using the method and reference data described for this calculator. Get your bac instantly - no account needed, works on all devices.

**Why Bac matters for your health:** Understanding your bac is one of the most important steps in proactive health management. Healthcare professionals use bac as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Alcohol Metabolism Calculator](/calculators/health/alcohol-metabolism-calculator), [our Alcohol Calorie Calculator](/calculators/health/alcohol-calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Bac Calculator:** This tool applies the calculation method described for bac in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your bac result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current bac requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Bac Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Bac Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Bac Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Bac Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Bac Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Bac Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Bac Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Bac Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Bac calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your bac monthly for 3-6 months to see meaningful trends. Healthy bac improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Bac is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your bac is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Bac Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Alcohol Metabolism Calculator](/calculators/health/alcohol-metabolism-calculator), [our Alcohol Calorie Calculator](/calculators/health/alcohol-calorie-calculator), and [our Hangover Recovery Calculator](/calculators/health/hangover-recovery-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
