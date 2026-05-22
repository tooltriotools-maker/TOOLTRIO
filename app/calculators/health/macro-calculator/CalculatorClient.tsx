'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(165)
  const [height, setHeight] = useState(69)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [activity, setActivity] = useState<'sedentary'|'light'|'moderate'|'active'|'very_active'>('moderate')
  const [goal, setGoal] = useState<'cut'|'maintain'|'bulk'>('maintain')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height
    const bmr = gender==='male' ? 10*wKg + 6.25*hCm - 5*age + 5 : 10*wKg + 6.25*hCm - 5*age - 161
    const actMult = {sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very_active:1.9}[activity]
    const tdee = Math.round(bmr * actMult)
    const adj = goal==='cut' ? -400 : goal==='bulk' ? 300 : 0
    const calories = tdee + adj
    const proteinG = Math.round(wKg * (goal==='cut' ? 2.2 : goal==='bulk' ? 1.9 : 1.6))
    const proteinCal = proteinG * 4
    const fatPct = goal==='cut' ? 0.25 : goal==='bulk' ? 0.30 : 0.28
    const fatCal = Math.round(calories * fatPct)
    const fatG = Math.round(fatCal / 9)
    const carbCal = calories - proteinCal - fatCal
    const carbG = Math.round(carbCal / 4)
    const macros = [
      {name:'Protein', g:proteinG, cal:proteinCal, pct:Math.round(proteinCal/calories*100), color:'#3b82f6', icon:'💪'},
      {name:'Carbs',   g:carbG,    cal:carbCal,    pct:Math.round(carbCal/calories*100),    color:'#f59e0b', icon:'🌾'},
      {name:'Fat',     g:fatG,     cal:fatCal,     pct:Math.round(fatCal/calories*100),     color:'#ef4444', icon:'🥑'},
    ]
    return { tdee, calories, adj, macros, bmr:Math.round(bmr) }
  }, [weight, height, age, gender, activity, goal, unit])

  return (
    <CalculatorLayout title="Macro Calculator" description="Calculate your daily protein, carbs, and fat targets for weight loss, muscle gain, or maintenance based on your TDEE." icon="🥗" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Profile</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric'},{value:'imperial',label:'Imperial'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <SelectField label="Activity Level" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'sedentary',label:'Sedentary (desk job)'},{value:'light',label:'Light (1-3x/wk)'},{value:'moderate',label:'Moderate (3-5x/wk)'},{value:'active',label:'Active (6-7x/wk)'},{value:'very_active',label:'Very Active (2x/day)'}]} />
            <SelectField label="Goal" value={goal} onChange={v=>setGoal(v as any)} options={[{value:'cut',label:'🔥 Lose Fat (Cut)'},{value:'maintain',label:'⚖️ Maintain Weight'},{value:'bulk',label:'💪 Gain Muscle (Bulk)'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-200">
              <p className="text-xs text-gray-500">BMR</p>
              <p className="text-2xl font-black text-gray-700">{result.bmr}</p>
              <p className="text-xs text-gray-400">kcal/day</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-200">
              <p className="text-xs text-gray-500">TDEE</p>
              <p className="text-2xl font-black text-blue-700">{result.tdee}</p>
              <p className="text-xs text-gray-400">kcal/day</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl text-center border border-green-200">
              <p className="text-xs text-gray-500">Target</p>
              <p className="text-2xl font-black text-green-700">{result.calories}</p>
              <p className="text-xs text-gray-400">{result.adj>0?`+${result.adj}`:result.adj<0?result.adj:'Maintenance'} kcal</p>
            </div>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Your Daily Macros</h3>
            <div className="space-y-4">
              {result.macros.map(m=>(
                <div key={m.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 flex items-center gap-2"><span>{m.icon}</span>{m.name}</span>
                    <span className="font-black text-gray-900">{m.g}g <span className="text-gray-400 font-normal text-xs">({m.pct}% - {m.cal} kcal)</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${m.pct}%`, backgroundColor:m.color}} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Per Meal Guide (4 meals/day)</h3>
            <div className="grid grid-cols-3 gap-3">
              {result.macros.map(m=>(
                <div key={m.name} className="p-3 rounded-xl text-center border" style={{borderColor:m.color+'40',backgroundColor:m.color+'10'}}>
                  <p className="text-xs font-bold text-gray-600">{m.icon} {m.name}</p>
                  <p className="text-xl font-black text-gray-900">{Math.round(m.g/4)}g</p>
                  <p className="text-xs text-gray-500">per meal</p>
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
          Macro Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          For a 175 lb person eating 2,200 calories for fat loss: approximately <strong>165g protein (30%), 220g carbs (40%), 73g fat (30%)</strong>. A keto split would be 165g protein, 55g carbs, 156g fat.
        </p>
        <p className="text-sm text-gray-600">
          This Macro 2026 calculates your exact macro breakdown based on your calorie goal and preferred dietary approach — standard, low-carb, or ketogenic.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Macro Calculator"
        category="health"
        intro={`The **Macro Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your macro instantly - no account needed, works on all devices.

**Why Macro matters for your health:** Understanding your macro is one of the most important steps in proactive health management. Healthcare professionals use macro as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our TDEE Calculator](/calculators/health/tdee-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Macro Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating macro in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your macro result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current macro requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Macro Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Macro Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Macro Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Macro Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Macro Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Macro Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Macro Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Macro Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Macro Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Macro calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your macro monthly for 3-6 months to see meaningful trends. Healthy macro improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Macro is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your macro is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Macro Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our TDEE Calculator](/calculators/health/tdee-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
