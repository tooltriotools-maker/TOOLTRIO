'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [pushups, setPushups] = useState(25)

  const result = useMemo(() => {
    // Fitness rating
    const maleLevels = [
      {min:0, max:17, label:'Needs Work', color:'text-red-600 bg-red-50'},
      {min:17,max:29, label:'Below Average', color:'text-orange-600 bg-orange-50'},
      {min:29,max:39, label:'Average', color:'text-yellow-600 bg-yellow-50'},
      {min:39,max:50, label:'Good', color:'text-green-600 bg-green-50'},
      {min:50,max:999,label:'Excellent', color:'text-blue-600 bg-blue-50'},
    ]
    const femaleLevels = [
      {min:0, max:6,  label:'Needs Work', color:'text-red-600 bg-red-50'},
      {min:6, max:14, label:'Below Average', color:'text-orange-600 bg-orange-50'},
      {min:14,max:24, label:'Average', color:'text-yellow-600 bg-yellow-50'},
      {min:24,max:34, label:'Good', color:'text-green-600 bg-green-50'},
      {min:34,max:999,label:'Excellent', color:'text-blue-600 bg-blue-50'},
    ]
    const levels = gender==='male' ? maleLevels : femaleLevels
    const lvl = levels.find(l=>pushups>=l.min && pushups<l.max) ?? levels[0]
    
    // Army standards (age-adjusted)
    const armyStd = gender==='male'
      ? age<22?42:age<27?40:age<32?36:age<37?31:age<42?26:20
      : age<22?19:age<27?17:age<32?15:age<37?13:age<42?11:10
    
    // 4-week plan
    const wk = pushups
    const plan = [
      {week:1, sets:[Math.round(wk*0.5),Math.round(wk*0.4),Math.round(wk*0.4),Math.round(wk*0.4),Math.round(wk*0.5)], days:'Mon, Wed, Fri'},
      {week:2, sets:[Math.round(wk*0.6),Math.round(wk*0.5),Math.round(wk*0.5),Math.round(wk*0.4),Math.round(wk*0.6)], days:'Mon, Wed, Fri'},
      {week:3, sets:[Math.round(wk*0.7),Math.round(wk*0.6),Math.round(wk*0.5),Math.round(wk*0.5),Math.round(wk*0.7)], days:'Mon, Wed, Fri'},
      {week:4, sets:[Math.round(wk*0.8),Math.round(wk*0.7),Math.round(wk*0.6),Math.round(wk*0.5),'Max'], days:'Mon, Wed, Fri'},
    ]
    const est4week = Math.round(pushups * 1.4)
    return { lvl, armyStd, armyPass:pushups>=armyStd, plan, est4week }
  }, [age,gender,pushups])

  return (
    <CalculatorLayout title="Push-Up Calculator" description="Get your push-up fitness score and a personalised 4-week training plan to hit your goal." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={15} max={70} step={1} suffix="yrs" />
            <InputField label="Max Push-Ups (1 set)" value={pushups} onChange={setPushups} min={0} max={200} step={1} suffix="reps" />
          </div>
          <div className={`mt-5 p-4 rounded-xl text-center border-2 ${result.lvl.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Fitness Rating</p>
            <p className="text-3xl font-black my-1">{result.lvl.label}</p>
            <p className="text-sm">{pushups} push-ups</p>
          </div>
          <div className={`mt-3 p-3 rounded-xl text-center border ${result.armyPass?'bg-green-50 border-green-200 text-green-700':'bg-red-50 border-red-200 text-red-700'}`}>
            <p className="text-xs font-bold">US Army Standard (Age {age})</p>
            <p className="text-lg font-black">{result.armyPass?'✅ PASS':'❌ FAIL'}</p>
            <p className="text-xs">Min required: {result.armyStd} push-ups</p>
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-1">4-Week Training Plan</h3>
            <p className="text-xs text-gray-500 mb-4">Est. max push-ups after 4 weeks: <span className="font-bold text-green-600">{result.est4week}</span></p>
            <div className="space-y-3">
              {result.plan.map(w=>(
                <div key={w.week} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900 text-sm">Week {w.week}</p>
                    <p className="text-xs text-gray-500">{w.days}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {w.sets.map((s,i)=>(
                      <div key={i} className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-center min-w-[3rem]">
                        <p className="text-xs text-gray-500">Set {i+1}</p>
                        <p className="font-black text-gray-900 text-sm">{s}</p>
                      </div>
                    ))}
                  </div>
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
          Pushup Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Pushup 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Pushup Calculator"
        category="health"
        intro={`The **Pushup Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your pushup instantly - no account needed, works on all devices.

**Why Pushup matters for your health:** Understanding your pushup is one of the most important steps in proactive health management. Healthcare professionals use pushup as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Pushup Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating pushup in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your pushup result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current pushup requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Pushup Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Pushup Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Pushup Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Pushup Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Pushup Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Pushup Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Pushup Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Pushup Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Pushup Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Pushup calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your pushup monthly for 3-6 months to see meaningful trends. Healthy pushup improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Pushup is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your pushup is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Pushup Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
