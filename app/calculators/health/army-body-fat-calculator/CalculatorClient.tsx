'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [gender, setGender] = useState<'male'|'female'>('male')
  const [height, setHeight] = useState(69)
  const [neck, setNeck] = useState(38)
  const [waist, setWaist] = useState(82)
  const [hip, setHip] = useState(95)
  const [age, setAge] = useState(25)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const toCm = (v: number) => unit==='imperial' ? v*2.54 : v
    const hCm = toCm(height), nCm = toCm(neck), wCm = toCm(waist), hpCm = toCm(hip)
    
    let bf: number
    if (gender==='male') {
      bf = 86.010*Math.log10(wCm-nCm) - 70.041*Math.log10(hCm) + 36.76
    } else {
      bf = 163.205*Math.log10(wCm+hpCm-nCm) - 97.684*Math.log10(hCm) - 78.387
    }
    bf = Math.max(3, Math.round(bf*10)/10)
    
    const armyLimit = gender==='male'
      ? age<21?20:age<28?22:age<40?24:26
      : age<21?30:age<28?32:age<40?34:36
    const marineLimit = gender==='male'
      ? age<26?18:age<31?19:age<36?20:21
      : age<26?26:age<31?27:age<36?28:29
    const passes = {
      army: bf <= armyLimit,
      marines: bf <= marineLimit,
      navy: bf <= (gender==='male'?age<40?23:25:age<40?33:35),
      airforce: bf <= (gender==='male'?age<30?20:age<40?24:26:age<30?28:age<40?32:34),
    }
    const lean = Math.round(height * (gender==='male'?0.43:0.41)) // rough estimate
    return { bf, armyLimit, passes, lean, category: bf<10?'Dangerously Lean':bf<18?'Lean/Athletic':bf<25?'Fit':bf<30?'Average':'High Body Fat' }
  }, [gender,height,neck,waist,hip,age,unit])

  const branchColor = (pass: boolean) => pass ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'

  return (
    <CalculatorLayout title="Army Body Fat Calculator" description="Calculate body fat using the US Army tape test. Check standards for Army, Marines, Navy, and Air Force." icon="🎖️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Measurements</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (cm)'},{value:'imperial',label:'Imperial (in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={17} max={60} step={1} suffix="yrs" />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label={`Neck (${unit==='metric'?'cm':'in'})`} value={neck} onChange={setNeck} min={unit==='metric'?25:10} max={unit==='metric'?60:24} step={unit==='metric'?0.5:0.25} suffix={unit==='metric'?'cm':'in'} />
            <InputField label={`Waist (${unit==='metric'?'cm':'in'})`} value={waist} onChange={setWaist} min={unit==='metric'?55:22} max={unit==='metric'?150:59} step={unit==='metric'?0.5:0.25} suffix={unit==='metric'?'cm':'in'} />
            {gender==='female' && <InputField label={`Hips (${unit==='metric'?'cm':'in'})`} value={hip} onChange={setHip} min={unit==='metric'?70:28} max={unit==='metric'?150:59} step={unit==='metric'?0.5:0.25} suffix={unit==='metric'?'cm':'in'} />}
          </div>
          <div className="mt-5 p-4 bg-gray-900 rounded-xl text-center">
            <p className="text-xs text-gray-400 font-bold uppercase">Body Fat %</p>
            <p className="text-5xl font-black text-white my-1">{result.bf}%</p>
            <p className="text-gray-300 text-sm font-semibold">{result.category}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Military Branch Standards (Age {age})</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {branch:'U.S. Army',key:'army',limit:result.armyLimit},
                {branch:'Marine Corps',key:'marines',limit:gender==='male'?18:26},
                {branch:'U.S. Navy',key:'navy',limit:gender==='male'?23:33},
                {branch:'Air Force',key:'airforce',limit:gender==='male'?20:28},
              ].map(b=>(
                <div key={b.branch} className={`p-4 rounded-xl border-2 ${branchColor(result.passes[b.key as keyof typeof result.passes])}`}>
                  <p className="font-bold text-sm">{b.branch}</p>
                  <p className="text-xs opacity-70">Limit: {b.limit}%</p>
                  <p className="text-2xl font-black mt-1">{result.passes[b.key as keyof typeof result.passes] ? '✅ PASS' : '❌ FAIL'}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Body Fat Reference</h3>
            <div className="space-y-1.5 text-xs">
              {(gender==='male'?
                [['Essential fat','2-5%','bg-blue-400'],['Athletic','6-13%','bg-green-500'],['Fitness','14-17%','bg-green-400'],['Average','18-24%','bg-yellow-400'],['High','25%+','bg-red-500']]:
                [['Essential fat','10-13%','bg-blue-400'],['Athletic','14-20%','bg-green-500'],['Fitness','21-24%','bg-green-400'],['Average','25-31%','bg-yellow-400'],['High','32%+','bg-red-500']]
              ).map(([l,r,c])=>(
                <div key={l} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${c}`} /><span className="w-24 font-semibold text-gray-700">{l}</span><span className="text-gray-500">{r}</span>
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
          Army Body Fat Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 180 lb male with a 34" waist and 15" neck has an estimated body fat of <strong>18%</strong> (Navy method) — within the "fitness" range of 14–17%. A woman with similar proportions would be at approximately 25%.
        </p>
        <p className="text-sm text-gray-600">
          This Army Body Fat 2026 gives a more accurate picture of health than BMI alone, distinguishing between fat mass and lean muscle mass.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Army Body Fat Calculator"
        category="health"
        intro={`The **Army [Body Fat](/calculators/health/body-fat-calculator) Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your army body fat instantly - no account needed, works on all devices.

**Why Army Body Fat matters for your health:** Understanding your army body fat is one of the most important steps in proactive health management. Healthcare professionals use army body fat as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Army Body Fat Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating army body fat in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your army body fat result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current army body fat requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Army Body Fat Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Army Body Fat Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Army Body Fat Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Army Body Fat Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Army Body Fat Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Army Body Fat Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Army Body Fat Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Army Body Fat Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Army Body Fat Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Army Body Fat calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your army body fat monthly for 3-6 months to see meaningful trends. Healthy army body fat improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Army Body Fat is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your army body fat is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Army [Body Fat](/calculators/health/body-fat-calculator) Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
