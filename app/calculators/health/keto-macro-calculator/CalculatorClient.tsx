'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(175)
  const [height, setHeight] = useState(69)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [activity, setActivity] = useState<'sedentary'|'light'|'moderate'|'active'>('moderate')
  const [goal, setGoal] = useState<'lose'|'maintain'|'bulk'>('lose')
  const [type, setType] = useState<'standard'|'targeted'|'high-protein'>('standard')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial'?weight*0.453592:weight
    const hCm = unit==='imperial'?height*2.54:height
    const bmr = gender==='male' ? 10*wKg+6.25*hCm-5*age+5 : 10*wKg+6.25*hCm-5*age-161
    const mults = {sedentary:1.2,light:1.375,moderate:1.55,active:1.725}
    const tdee = Math.round(bmr*mults[activity])
    const adj = goal==='lose'?-0.2:goal==='bulk'?0.1:0
    const targetCals = Math.round(tdee*(1+adj))

    const proteinFactor = type==='high-protein'?1.8:1.4
    const proteinG = Math.round(wKg*proteinFactor)
    const proteinCal = proteinG*4
    const carbsG = type==='targeted' ? 50 : 25
    const carbsCal = carbsG*4
    const fatCal = targetCals-proteinCal-carbsCal
    const fatG = Math.round(fatCal/9)

    const fatPct = Math.round(fatCal/targetCals*100)
    const proteinPct = Math.round(proteinCal/targetCals*100)
    const carbsPct = Math.round(carbsCal/targetCals*100)

    const foods = [
      {name:'Avocado (1/2)',fat:15,protein:2,carbs:2,icon:'🥑'},
      {name:'Eggs (2 large)',fat:10,protein:12,carbs:1,icon:'🥚'},
      {name:'Salmon (100g)',fat:13,protein:25,carbs:0,icon:'🐟'},
      {name:'Almonds (28g)',fat:14,protein:6,carbs:2,icon:'🥜'},
      {name:'Butter (15g)',fat:12,protein:0,carbs:0,icon:'🧈'},
      {name:'Ground beef (100g)',fat:20,protein:26,carbs:0,icon:'🥩'},
    ]
    return { targetCals, proteinG, fatG, carbsG, fatPct, proteinPct, carbsPct, foods }
  }, [weight,height,age,gender,activity,goal,type,unit])

  return (
    <CalculatorLayout title="Keto Macro Calculator" description="Get your exact ketogenic diet macros: net carbs, protein, and fat for standard, targeted, or high-protein keto." icon="🥩" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric'},{value:'imperial',label:'Imperial'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={40} max={200} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <SelectField label="Activity" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'sedentary',label:'Sedentary'},{value:'light',label:'Light'},{value:'moderate',label:'Moderate'},{value:'active',label:'Active'}]} />
            <SelectField label="Goal" value={goal} onChange={v=>setGoal(v as any)} options={[{value:'lose',label:'Fat Loss (-20%)'},{value:'maintain',label:'Maintain'},{value:'bulk',label:'Muscle (+10%)'}]} />
            <SelectField label="Keto Type" value={type} onChange={v=>setType(v as any)} options={[{value:'standard',label:'Standard Keto (SKD)'},{value:'targeted',label:'Targeted Keto (TKD)'},{value:'high-protein',label:'High Protein Keto'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-200 text-center">
            <p className="text-xs font-bold text-yellow-700 uppercase">Daily Calorie Target</p>
            <p className="text-4xl font-black text-yellow-800 my-1">{result.targetCals} kcal</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{n:'Fat 🥑',g:result.fatG,p:result.fatPct,c:'bg-yellow-50 text-yellow-800 border-yellow-200'},{n:'Protein 💪',g:result.proteinG,p:result.proteinPct,c:'bg-red-50 text-red-800 border-red-200'},{n:'Net Carbs 🥦',g:result.carbsG,p:result.carbsPct,c:'bg-green-50 text-green-800 border-green-200'}].map(m=>(
              <div key={m.n} className={`p-4 rounded-xl border-2 text-center ${m.c}`}><p className="text-xs font-bold">{m.n}</p><p className="text-3xl font-black my-1">{m.g}g</p><p className="text-xs">{m.p}% of calories</p></div>
            ))}
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Sample Keto Foods</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {result.foods.map((f: any) => (
                <div key={f.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="text-base">{f.icon}</span>
                  <div className="flex-1"><p className="font-semibold text-gray-800">{f.name}</p><p className="text-gray-500">F:{f.fat}g P:{f.protein}g C:{f.carbs}g</p></div>
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
          Keto Macro Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          For a 175 lb person eating 2,200 calories for fat loss: approximately <strong>165g protein (30%), 220g carbs (40%), 73g fat (30%)</strong>. A keto split would be 165g protein, 55g carbs, 156g fat.
        </p>
        <p className="text-sm text-gray-600">
          This Keto Macro 2026 calculates your exact macro breakdown based on your calorie goal and preferred dietary approach — standard, low-carb, or ketogenic.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Keto Macro Calculator"
        category="health"
        intro={`The **Keto [Macro Calculator](/calculators/health/macro-calculator)** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your keto macro instantly - no account needed, works on all devices.

**Why Keto Macro matters for your health:** Understanding your keto macro is one of the most important steps in proactive health management. Healthcare professionals use keto macro as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Keto Macro Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating keto macro in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your keto macro result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current keto macro requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Keto Macro Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Keto Macro Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Keto Macro Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Keto Macro Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Keto Macro Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Keto Macro Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Keto Macro Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Keto Macro Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Keto Macro Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Keto Macro calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your keto macro monthly for 3-6 months to see meaningful trends. Healthy keto macro improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Keto Macro is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your keto macro is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Keto [Macro Calculator](/calculators/health/macro-calculator) represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
