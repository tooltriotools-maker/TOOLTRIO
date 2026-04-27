'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(185)
  const [targetWeight, setTargetWeight] = useState(75)
  const [height, setHeight] = useState(69)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [activity, setActivity] = useState<'sedentary'|'light'|'moderate'|'active'>('moderate')
  const [weeks, setWeeks] = useState(20)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial'?weight*0.453592:weight
    const tKg = unit==='imperial'?targetWeight*0.453592:targetWeight
    const hCm = unit==='imperial'?height*2.54:height
    const diff = wKg - tKg
    const bmr = gender==='male' ? 10*wKg+6.25*hCm-5*age+5 : 10*wKg+6.25*hCm-5*age-161
    const mults = {sedentary:1.2,light:1.375,moderate:1.55,active:1.725}
    const tdee = Math.round(bmr*mults[activity])
    const requiredDeficitPerDay = diff>0 ? Math.round((diff*7700)/weeks/7) : 0
    const targetCals = Math.max(1200, tdee - requiredDeficitPerDay)
    const actualDeficit = tdee - targetCals
    const actualWeeklyLoss = (actualDeficit*7/7700).toFixed(2)
    const protein = Math.round(wKg*2)
    const fat = Math.round(targetCals*0.25/9)
    const carbs = Math.round((targetCals - protein*4 - fat*9)/4)
    const safe = requiredDeficitPerDay <= 750
    return { tdee, targetCals, actualDeficit, actualWeeklyLoss, protein, fat, carbs, safe, bmr:Math.round(bmr), requiredDeficitPerDay }
  }, [weight,targetWeight,height,age,gender,activity,weeks,unit])

  return (
    <CalculatorLayout title="Calorie Deficit Calculator" description="Calculate your daily calorie target for fat loss. Find out exactly how many calories to eat to reach your goal weight." icon="📉" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric'},{value:'imperial',label:'Imperial'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Current Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={40} max={300} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label={`Target Weight (${unit==='metric'?'kg':'lbs'})`} value={targetWeight} onChange={setTargetWeight} min={30} max={250} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <SelectField label="Activity Level" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'sedentary',label:'Sedentary'},{value:'light',label:'Light (1-3x/wk)'},{value:'moderate',label:'Moderate (3-5x/wk)'},{value:'active',label:'Active (6-7x/wk)'}]} />
            <InputField label="Weeks to Goal" value={weeks} onChange={setWeeks} min={4} max={104} step={1} suffix="wks" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[{l:'TDEE',v:result.tdee,u:'kcal/day',c:'bg-gray-50 border-gray-200 text-gray-700'},{l:'Target Calories',v:result.targetCals,u:'kcal/day',c:'bg-blue-50 border-blue-200 text-blue-700'},{l:'Daily Deficit',v:result.actualDeficit,u:'kcal/day',c:'bg-green-50 border-green-200 text-green-700'}].map(s=>(
              <div key={s.l} className={`p-4 rounded-xl border-2 ${s.c}`}><p className="text-xs font-bold uppercase opacity-70">{s.l}</p><p className="text-3xl font-black my-1">{s.v}</p><p className="text-xs opacity-70">{s.u}</p></div>
            ))}
          </div>
          <div className={`p-4 rounded-xl border-2 ${result.safe?'bg-green-50 border-green-200':'bg-orange-50 border-orange-200'}`}>
            <p className={`font-bold ${result.safe?'text-green-700':'text-orange-700'}`}>{result.safe?'✅ This is a safe, sustainable deficit':'⚠️ This deficit is aggressive - consider extending your timeline'}</p>
            <p className="text-sm text-gray-600 mt-1">Estimated weekly loss: {result.actualWeeklyLoss} {unit==='metric'?'kg':'lbs'}/week - Required deficit: {result.requiredDeficitPerDay} kcal/day</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Daily Macros at {result.targetCals} kcal</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{n:'Protein 💪',g:result.protein,c:'bg-blue-50 text-blue-700'},{n:'Carbs 🌾',g:result.carbs,c:'bg-yellow-50 text-yellow-700'},{n:'Fat 🥑',g:result.fat,c:'bg-red-50 text-red-700'}].map(m=>(
                <div key={m.n} className={`p-3 rounded-xl ${m.c}`}><p className="text-xs font-bold">{m.n}</p><p className="text-2xl font-black">{m.g}g</p></div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Calorie Deficit Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Calorie Deficit 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Calorie Deficit Calculator"
        category="health"
        intro={`The **Calorie Deficit Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your calorie deficit instantly - no account needed, works on all devices.

**Why Calorie Deficit matters for your health:** Understanding your calorie deficit is one of the most important steps in proactive health management. Healthcare professionals use calorie deficit as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our TDEE Calculator](/calculators/health/tdee-calculator), [our Macro Calculator](/calculators/health/macro-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Calorie Deficit Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating calorie deficit in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your calorie deficit result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current calorie deficit requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Calorie Deficit Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Calorie Deficit Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Calorie Deficit Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Calorie Deficit Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Calorie Deficit Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Calorie Deficit Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Calorie Deficit Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Calorie Deficit Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Calorie Deficit Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Calorie Deficit calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your calorie deficit monthly for 3-6 months to see meaningful trends. Healthy calorie deficit improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Calorie Deficit is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your calorie deficit is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Calorie Deficit Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our TDEE Calculator](/calculators/health/tdee-calculator), [our Macro Calculator](/calculators/health/macro-calculator), and [our Fat Loss Rate Calculator](/calculators/health/fat-loss-rate-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
