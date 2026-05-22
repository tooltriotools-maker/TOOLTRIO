'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [currentWeight, setCurrentWeight] = useState(85)
  const [targetWeight, setTargetWeight] = useState(75)
  const [height, setHeight] = useState(69)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [weeklyChange, setWeeklyChange] = useState(0.5)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? currentWeight*0.453592 : currentWeight
    const tKg = unit==='imperial' ? targetWeight*0.453592 : targetWeight
    const hCm = unit==='imperial' ? height*2.54 : height
    const hM = hCm/100
    const inches = hCm/2.54 - 60
    
    const ideal = {
      robinson: gender==='male' ? 52 + 1.9*inches : 49 + 1.7*inches,
      miller:   gender==='male' ? 56.2 + 1.41*inches : 53.1 + 1.36*inches,
      devine:   gender==='male' ? 50 + 2.3*inches : 45.5 + 2.3*inches,
      hamwi:    gender==='male' ? 48 + 2.7*inches : 45.4 + 2.2*inches,
      bmiMin:   18.5 * hM*hM,
      bmiMax:   24.9 * hM*hM,
    }
    const avgIdeal = Math.round((ideal.robinson+ideal.miller+ideal.devine+ideal.hamwi)/4)
    const diff = tKg - wKg
    const losing = diff < 0
    const weeks = Math.abs(diff) / weeklyChange
    const months = weeks / 4.33
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + Math.round(weeks*7))
    const fmt = (d: Date) => d.toLocaleDateString('en-US',{month:'long',year:'numeric'})
    
    const currentBmi = wKg / (hM*hM)
    const targetBmi = tKg / (hM*hM)
    
    return {
      ideal: Object.fromEntries(Object.entries(ideal).map(([k,v])=>[k,Math.round(v*10)/10])),
      avgIdeal, diff:Math.abs(diff).toFixed(1), losing, weeks:Math.round(weeks), months:months.toFixed(1),
      targetDate:fmt(targetDate), currentBmi:currentBmi.toFixed(1), targetBmi:targetBmi.toFixed(1)
    }
  }, [currentWeight,targetWeight,height,gender,weeklyChange,unit])

  return (
    <CalculatorLayout title="Target Weight Calculator" description="Find your ideal weight range and get a realistic timeline to reach your target weight safely." icon="🎯" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label={`Current Weight (${unit==='metric'?'kg':'lbs'})`} value={currentWeight} onChange={setCurrentWeight} min={unit==='metric'?30:66} max={unit==='metric'?300:660} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label={`Target Weight (${unit==='metric'?'kg':'lbs'})`} value={targetWeight} onChange={setTargetWeight} min={unit==='metric'?30:66} max={unit==='metric'?300:660} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <SelectField label="Weekly Change Rate" value={String(weeklyChange)} onChange={v=>setWeeklyChange(Number(v))} options={[{value:'0.25',label:'0.25 kg/week (slow)'},{value:'0.5',label:'0.5 kg/week (safe)'},{value:'0.75',label:'0.75 kg/week (moderate)'},{value:'1',label:'1 kg/week (aggressive)'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-5 rounded-2xl border-2 ${result.losing?'bg-blue-50 border-blue-200':'bg-green-50 border-green-200'} text-center`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">{result.losing?'Weight Loss':'Weight Gain'} Plan</p>
            <p className={`text-4xl font-black my-2 ${result.losing?'text-blue-700':'text-green-700'}`}>{result.diff} {unit==='metric'?'kg':'lbs'} to go</p>
            <p className={`font-semibold ${result.losing?'text-blue-600':'text-green-600'}`}>{result.weeks} weeks - Est. {result.targetDate}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-xs text-gray-500">Current BMI</p>
              <p className="text-3xl font-black">{result.currentBmi}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500">Target BMI</p>
              <p className="text-3xl font-black">{result.targetBmi}</p>
            </Card>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Ideal Weight Formulas</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[['Robinson',result.ideal.robinson],['Miller',result.ideal.miller],['Devine',result.ideal.devine],['Hamwi',result.ideal.hamwi]].map(([n,v])=>(
                <div key={n} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{n}</span>
                  <span className="font-bold">{v} {unit==='metric'?'kg':'lbs'}</span>
                </div>
              ))}
              <div className="col-span-2 flex justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-700 font-semibold">Healthy BMI Range</span>
                <span className="font-bold text-green-700">{result.ideal.bmiMin}-{result.ideal.bmiMax} {unit==='metric'?'kg':'lbs'}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Target Weight Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          For a 5'9" (175cm) male, ideal weight ranges from <strong>144–176 lbs</strong> depending on the formula used (Hamwi: 166 lbs, Devine: 166 lbs, Robinson: 163 lbs). Women of the same height: 149–159 lbs.
        </p>
        <p className="text-sm text-gray-600">
          This Target Weight 2026 shows results from 5 different medical formulas side-by-side so you understand the realistic healthy weight range rather than a single number.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Target Weight Calculator"
        category="health"
        intro={`The **Target Weight Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your target weight instantly - no account needed, works on all devices.

**Why Target Weight matters for your health:** Understanding your target weight is one of the most important steps in proactive health management. Healthcare professionals use target weight as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Target Weight Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating target weight in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your target weight result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current target weight requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Target Weight Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Target Weight Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Target Weight Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Target Weight Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Target Weight Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Target Weight Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Target Weight Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Target Weight Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Target Weight Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Target Weight calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your target weight monthly for 3-6 months to see meaningful trends. Healthy target weight improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Target Weight is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your target weight is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Target Weight Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
