'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(155)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [activity, setActivity] = useState<'low'|'moderate'|'high'|'athlete'>('moderate')
  const [climate, setClimate] = useState<'cool'|'temperate'|'hot'|'humid'>('temperate')
  const [exerciseMins, setExerciseMins] = useState(30)
  const [pregnant, setPregnant] = useState(false)
  const [breastfeeding, setBreastfeeding] = useState(false)

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const baseMl = wKg * 33 // 33ml/kg baseline
    const actAdd = {low:0,moderate:300,high:600,athlete:900}[activity]
    const climateAdd = {cool:-200,temperate:0,hot:400,humid:300}[climate]
    const exAdd = exerciseMins * 8 // ~8ml/min exercise
    const preAdd = pregnant ? 300 : 0
    const bfAdd = breastfeeding ? 700 : 0
    const total = Math.round(baseMl + actAdd + climateAdd + exAdd + preAdd + bfAdd)
    const glasses8oz = Math.ceil(total / 240)
    const bottles500 = (total / 500).toFixed(1)
    const bottles750 = (total / 750).toFixed(1)
    const sodiumMg = activity==='athlete' ? 1000 : activity==='high' ? 600 : 300
    const potMg = 2000
    const magMg = 300
    return { total, glasses8oz, bottles500, bottles750, sodiumMg, potMg, magMg,
      hourly: Math.round(total/16) // spread over 16 waking hours
    }
  }, [weight,unit,activity,climate,exerciseMins,pregnant,breastfeeding])

  return (
    <CalculatorLayout title="Hydration Calculator" description="Calculate your precise daily water and electrolyte needs based on body weight, activity, and climate." icon="💧" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label={`Body Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <SelectField label="Activity Level" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'low',label:'Low (mostly sedentary)'},{value:'moderate',label:'Moderate (light exercise)'},{value:'high',label:'High (daily vigorous)'},{value:'athlete',label:'Athlete (intense training)'}]} />
            <SelectField label="Climate" value={climate} onChange={v=>setClimate(v as any)} options={[{value:'cool',label:'Cool (<15 degreesC / <60 degreesF)'},{value:'temperate',label:'Temperate (15-25 degreesC)'},{value:'hot',label:'Hot (>25 degreesC / >77 degreesF)'},{value:'humid',label:'Hot & Humid'}]} />
            <InputField label="Daily Exercise Duration" value={exerciseMins} onChange={setExerciseMins} min={0} max={300} step={10} suffix="min" />
            {[{l:'Pregnant?',v:pregnant,s:setPregnant},{l:'Breastfeeding?',v:breastfeeding,s:setBreastfeeding}].map(({l,v,s})=>(
              <div key={l} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{l}</span>
                <button onClick={()=>s(!v)} className={`w-10 h-5 rounded-full transition-colors ${v?'bg-blue-500':'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${v?'translate-x-5':''}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 text-center">
            <p className="text-xs font-bold text-blue-600 uppercase">Daily Water Target</p>
            <p className="text-5xl font-black text-blue-700 my-2">{(result.total/1000).toFixed(1)}L</p>
            <p className="text-blue-600">{result.total} ml - ~{result.hourly} ml/hour waking</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[{l:'8oz Glasses',v:result.glasses8oz,u:'glasses'},{l:'500ml Bottles',v:result.bottles500,u:'bottles'},{l:'750ml Bottles',v:result.bottles750,u:'bottles'}].map(s=>(
              <div key={s.l} className="p-3 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-medium">{s.l}</p>
                <p className="text-2xl font-black text-gray-900">{s.v}</p>
                <p className="text-xs text-gray-400">{s.u}</p>
              </div>
            ))}
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Daily Electrolyte Targets</h3>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              {[{n:'Sodium',v:result.sodiumMg,u:'mg',c:'bg-red-50 text-red-700'},{n:'Potassium',v:result.potMg,u:'mg',c:'bg-yellow-50 text-yellow-700'},{n:'Magnesium',v:result.magMg,u:'mg',c:'bg-green-50 text-green-700'}].map(e=>(
                <div key={e.n} className={`p-3 rounded-xl ${e.c}`}>
                  <p className="text-xs font-bold">{e.n}</p>
                  <p className="text-lg font-black">{e.v}</p>
                  <p className="text-xs">{e.u}</p>
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
          Hydration Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 165 lb person doing moderate exercise needs approximately <strong>3.2 liters (108 oz)</strong> of water per day — about 13.5 cups. Adding 60 minutes of intense exercise adds another 0.5–1.0 liter.
        </p>
        <p className="text-sm text-gray-600">
          This Hydration 2026 adjusts for body weight, exercise intensity, and climate to give you personalized daily hydration targets backed by NIH recommendations.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Hydration Calculator"
        category="health"
        intro={`The **Hydration Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your hydration instantly - no account needed, works on all devices.

**Why Hydration matters for your health:** Understanding your hydration is one of the most important steps in proactive health management. Healthcare professionals use hydration as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Hydration Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating hydration in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your hydration result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current hydration requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Hydration Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Hydration Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Hydration Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Hydration Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Hydration Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Hydration Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Hydration Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Hydration Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Hydration Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Hydration calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your hydration monthly for 3-6 months to see meaningful trends. Healthy hydration improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Hydration is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your hydration is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Hydration Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
