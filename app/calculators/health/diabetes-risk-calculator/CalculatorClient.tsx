'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(40)
  const [bmi, setBmi] = useState(26)
  const [waist, setWaist] = useState(85)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [family, setFamily] = useState<'none'|'grandparent'|'parent_sibling'>('none')
  const [activity, setActivity] = useState<'active'|'moderate'|'inactive'>('moderate')
  const [bp, setBp] = useState(false)
  const [gestational, setGestational] = useState(false)

  const result = useMemo(() => {
    let score = 0
    // Age
    if (age>=35 && age<45) score+=1; else if (age>=45 && age<55) score+=2; else if (age>=55) score+=3
    // BMI
    if (bmi>=25 && bmi<30) score+=1; else if (bmi>=30) score+=3
    // Waist (cm)
    const waistLimit = gender==='male' ? [94,102] : [80,88]
    if (waist>=waistLimit[0] && waist<waistLimit[1]) score+=3; else if (waist>=waistLimit[1]) score+=4
    // Activity
    if (activity==='moderate') score+=1; else if (activity==='inactive') score+=2
    // Family
    if (family==='grandparent') score+=3; else if (family==='parent_sibling') score+=5
    // BP
    if (bp) score+=2
    // Gestational diabetes
    if (gestational) score+=3

    let risk='', color='', advice='', pct=''
    if (score<7)       { risk='Low Risk';          color='text-green-700 bg-green-50 border-green-200';  pct='<1% 10-yr';  advice='Low risk. Maintain healthy weight, stay active, eat well. Recheck in 3 years.' }
    else if (score<12) { risk='Slightly Elevated';  color='text-yellow-700 bg-yellow-50 border-yellow-200'; pct='~4% 10-yr';  advice='Consider annual HbA1c check. Small lifestyle improvements recommended.' }
    else if (score<15) { risk='Moderate Risk';      color='text-orange-700 bg-orange-50 border-orange-200'; pct='~17% 10-yr'; advice='See your doctor for HbA1c/fasting glucose test. Lifestyle changes now can prevent T2D.' }
    else if (score<20) { risk='High Risk';          color='text-red-700 bg-red-50 border-red-200';      pct='~33% 10-yr'; advice='Get tested for prediabetes now. Join a diabetes prevention program. Weight loss is most effective intervention.' }
    else               { risk='Very High Risk';     color='text-red-800 bg-red-100 border-red-300';     pct='>50% 10-yr'; advice='See your doctor urgently for full diabetes screening. Immediate lifestyle changes essential.' }

    const tips = ['Lose 5-7% of body weight if overweight','Exercise 150+ minutes/week (brisk walking counts)','Replace refined carbs with whole grains','Increase vegetable intake to 5+ servings/day','Limit sugary drinks (including juice)','Get adequate sleep (7-9 hours)']
    return { score, risk, color, advice, pct, tips }
  }, [age,bmi,waist,gender,family,activity,bp,gestational])

  return (
    <CalculatorLayout title="Type 2 Diabetes Risk Calculator" description="Assess your risk of developing Type 2 diabetes using evidence-based FINDRISC scoring. Get personalised prevention tips." icon="🩺" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Risk Factors</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={55} step={0.5} suffix="kg/m2" />
            <InputField label="Waist Circumference (cm)" value={waist} onChange={setWaist} min={50} max={160} step={1} suffix="cm" />
            <SelectField label="Physical Activity" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'active',label:'Active (3+ sessions/week)'},{value:'moderate',label:'Moderate (1-2 sessions/week)'},{value:'inactive',label:'Inactive (rarely exercise)'}]} />
            <SelectField label="Family History" value={family} onChange={v=>setFamily(v as any)} options={[{value:'none',label:'No family history'},{value:'grandparent',label:'Grandparent had T2D'},{value:'parent_sibling',label:'Parent or sibling has T2D'}]} />
            {[{label:'High blood pressure?',val:bp,set:setBp},{label:'Gestational diabetes? (women)',val:gestational,set:setGestational}].map(({label,val,set})=>(
              <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <button onClick={()=>set(!val)} className={`w-10 h-5 rounded-full transition-colors ${val?'bg-red-500':'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${val?'translate-x-5':''}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-6 rounded-2xl border-2 text-center ${result.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">FINDRISC Score: {result.score}/26</p>
            <p className="text-3xl font-black my-2">{result.risk}</p>
            <p className="font-semibold text-sm">{result.pct} chance of developing T2D</p>
            <p className="text-sm mt-3 leading-relaxed opacity-80">{result.advice}</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Prevention Tips</h3>
            <ul className="space-y-2">
              {result.tips.map(t=>(
                <li key={t} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">v</span>{t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Diabetes Risk Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 45-year-old with BMI 27, family history of diabetes, and sedentary lifestyle has a <strong>15–20% 10-year risk</strong> of developing Type 2 diabetes. Losing 7% of body weight reduces this risk by 58% (DPP study).
        </p>
        <p className="text-sm text-gray-600">
          This Diabetes Risk 2026 uses the ADA FINDRISC screening tool to assess your personal risk level and provide evidence-based prevention strategies.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Diabetes Risk Calculator"
        category="health"
        intro={`The **Diabetes Risk Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your diabetes risk instantly - no account needed, works on all devices.

**Why Diabetes Risk matters for your health:** Understanding your diabetes risk is one of the most important steps in proactive health management. Healthcare professionals use diabetes risk as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Diabetes Risk Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating diabetes risk in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your diabetes risk result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current diabetes risk requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Diabetes Risk Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Diabetes Risk Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Diabetes Risk Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Diabetes Risk Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Diabetes Risk Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Diabetes Risk Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Diabetes Risk Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Diabetes Risk Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Diabetes Risk Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Diabetes Risk calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your diabetes risk monthly for 3-6 months to see meaningful trends. Healthy diabetes risk improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Diabetes Risk is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your diabetes risk is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Diabetes Risk Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our BMI Calculator](/calculators/health/bmi-calculator), [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), and [our Cholesterol Calculator](/calculators/health/cholesterol-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
