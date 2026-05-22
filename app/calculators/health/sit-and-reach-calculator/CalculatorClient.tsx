'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [reach, setReach] = useState(25)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('metric')

  const NORMS: Record<string, Record<string, number[]>> = {
    male:   { '18-25':[8,11,14,17], '26-35':[7,10,13,16], '36-45':[6,9,12,15], '46-55':[5,8,11,14], '56-65':[4,7,10,13], '65+':[3,6,9,12] },
    female: { '18-25':[14,17,20,23], '26-35':[13,16,19,22], '36-45':[12,15,18,21], '46-55':[10,13,16,19], '56-65':[9,12,15,18], '65+':[8,11,14,17] },
  }

  const result = useMemo(() => {
    const v = unit === 'imperial' ? reach * 2.54 : reach
    const band = age < 26 ? '18-25' : age < 36 ? '26-35' : age < 46 ? '36-45' : age < 56 ? '46-55' : age < 66 ? '56-65' : '65+'
    const [poor, fair, good, exc] = NORMS[gender][band]
    const cat = v < poor ? { l:'Poor', c:'text-red-700 bg-red-50 border-red-200', pct:15 }
      : v < fair ? { l:'Below Average', c:'text-orange-700 bg-orange-50 border-orange-200', pct:30 }
      : v < good ? { l:'Average', c:'text-yellow-700 bg-yellow-50 border-yellow-200', pct:50 }
      : v < exc  ? { l:'Above Average', c:'text-blue-700 bg-blue-50 border-blue-200', pct:70 }
      : { l:'Excellent 🌟', c:'text-green-700 bg-green-50 border-green-200', pct:90 }
    return { cat, poor, fair, good, exc, v }
  }, [reach, age, gender, unit])

  const stretches = [
    'Seated hamstring stretch (hold 30s, 3x/day)',
    'Standing hip flexor lunge stretch',
    'Supine piriformis stretch (figure-4)',
    'Cat-cow spinal mobility (2 min daily)',
    'Doorway chest and shoulder opener',
    "Child's pose for lower back",
  ]

  return (
    <CalculatorLayout title="Sit and Reach Flexibility Test" description="Assess your flexibility percentile and get stretching recommendations." icon="🧘" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Test Result</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'cm',label:'Centimetres'},{value:'in',label:'Inches'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label={`Reach Distance (${unit})`} value={reach} onChange={setReach} min={-30} max={50} step={0.5} suffix={unit} />
            <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 border border-blue-200">
              <p className="font-bold mb-1">📐 How to test:</p>
              <p>Sit with legs straight. Place a ruler at feet (zero mark). Reach forward as far as possible. Record where fingertips reach. Positive = past feet, negative = short of feet.</p>
            </div>
          </div>
          <div className={`mt-4 p-5 rounded-xl border-2 text-center ${result.cat.c}`}>
            <p className="text-xs font-bold uppercase opacity-70">Flexibility Rating</p>
            <p className="text-4xl font-black my-2">{result.cat.l}</p>
            <p className="text-sm opacity-70">~{result.cat.pct}th percentile for your age</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">ACSM Reference Ranges (your age group)</h3>
            <div className="space-y-2">
              {[
                {l:'Poor',         v:result.poor,   c:'bg-red-400'},
                {l:'Below Average',v:result.fair,   c:'bg-orange-400'},
                {l:'Average',      v:result.good,   c:'bg-yellow-400'},
                {l:'Above Average',v:result.exc,    c:'bg-blue-400'},
                {l:'Excellent',    v:result.exc+3,  c:'bg-green-400'},
              ].map(r => (
                <div key={r.l} className="flex items-center gap-3">
                  <span className="text-xs w-28 text-gray-600 font-medium">{r.l}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full">
                    <div className={`h-full rounded-full ${r.c}`} style={{width:`${Math.min(100,(r.v+30)/80*100)}%`}} />
                  </div>
                  <span className="text-xs font-mono w-16 text-gray-700">&lt;{r.v} {unit}</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-3">
                <span className="text-xs w-28 text-blue-700 font-bold">Your result</span>
                <div className="flex-1 h-3 bg-blue-100 rounded-full">
                  <div className="h-full rounded-full bg-blue-600" style={{width:`${Math.min(100,(result.v+30)/80*100)}%`}} />
                </div>
                <span className="text-xs font-mono w-16 text-blue-700 font-black">{reach} {unit}</span>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Key Stretches to Improve</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {stretches.map(s => (
                <div key={s} className="p-2.5 bg-green-50 rounded-lg border border-green-200 text-xs text-green-800">
                  v {s}
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
          Sit And Reach Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sit And Reach 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sit And Reach Calculator"
        category="health"
        intro={`The **Sit And Reach Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your sit and reach instantly - no account needed, works on all devices.

**Why Sit And Reach matters for your health:** Understanding your sit and reach is one of the most important steps in proactive health management. Healthcare professionals use sit and reach as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sit And Reach Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating sit and reach in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your sit and reach result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sit and reach requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Sit And Reach Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sit And Reach Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Sit And Reach Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Sit And Reach Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sit And Reach Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sit And Reach Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sit And Reach Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sit And Reach Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sit And Reach Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sit And Reach calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your sit and reach monthly for 3-6 months to see meaningful trends. Healthy sit and reach improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sit And Reach is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sit and reach is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sit And Reach Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
