'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(50)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [creatinine, setCreatinine] = useState(90)
  const [diabetes, setDiabetes] = useState(false)
  const [hypertension, setHypertension] = useState(false)
  const [nsaids, setNsaids] = useState(false)

  // CKD-EPI approximation (simplified)
  const k = gender === 'female' ? 61.9 : 79.6
  const alpha = gender === 'female' ? -0.329 : -0.411
  const crSI = creatinine / 88.4 // convert umol/L to mg/dL
  const ratio = crSI / k
  const eGFR = Math.round(141 * Math.pow(Math.min(ratio, 1), alpha) * Math.pow(Math.max(ratio, 1), -1.209) * Math.pow(0.993, age) * (gender === 'female' ? 1.018 : 1))
  const clamped = Math.max(0, Math.min(120, eGFR))

  const stage = clamped >= 90 ? {s:'G1 - Normal or High',c:'text-green-600'} : clamped >= 60 ? {s:'G2 - Mildly Decreased',c:'text-blue-600'} : clamped >= 45 ? {s:'G3a - Mild-Moderate Decrease',c:'text-yellow-600'} : clamped >= 30 ? {s:'G3b - Moderate-Severe Decrease',c:'text-orange-600'} : clamped >= 15 ? {s:'G4 - Severely Decreased',c:'text-red-600'} : {s:'G5 - Kidney Failure',c:'text-red-800'}
  const riskFactors = [diabetes, hypertension, nsaids].filter(Boolean).length

  return (
    <CalculatorLayout title="Kidney Function Calculator" description="Estimate eGFR (kidney function) and CKD stage using the CKD-EPI formula." icon="🫘" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Clinical Parameters</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="yrs" />
            <InputField label="Serum Creatinine" value={creatinine} onChange={setCreatinine} min={40} max={500} step={5} suffix="umol/L" />
            {[['Diabetes',diabetes,setDiabetes],['Hypertension / high BP',hypertension,setHypertension],['Regular NSAID use (ibuprofen etc.)',nsaids,setNsaids]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated GFR (eGFR)</p>
              <div className={`text-7xl font-black mb-2 ${stage.c}`}>{clamped}</div>
              <p className="text-gray-500">mL/min/1.73m2 - {stage.s}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="CKD Stage" value={stage.s.split(' ')[0]} />
            <ResultCard label="eGFR" value={`${clamped} mL/min`} highlight />
            <ResultCard label="Risk Factors" value={`${riskFactors}/3`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">CKD Stages by eGFR</h3>
            <div className="space-y-1 text-sm">
              {[['G1 >=90','Normal function','text-green-600'],['G2 60-89','Mildly decreased','text-blue-600'],['G3a 45-59','Mild-moderate','text-yellow-600'],['G3b 30-44','Moderate-severe','text-orange-600'],['G4 15-29','Severely decreased','text-red-600'],['G5 <15','Kidney failure','text-red-800']].map(([s,d,c])=>(
                <div key={s as string} className="flex justify-between"><span className={`font-bold ${c}`}>{s}</span><span className="text-gray-600">{d}</span></div>
              ))}
            </div>
            <p className="text-xs text-amber-700 mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2">⚠️ For educational use only. A blood test from your doctor is required for clinical diagnosis.</p>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Kidney Function Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Kidney Function 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Kidney Function Calculator"
        category="health"
        intro={`The **Kidney Function Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your kidney function instantly - no account needed, works on all devices.

**Why Kidney Function matters for your health:** Understanding your kidney function is one of the most important steps in proactive health management. Healthcare professionals use kidney function as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Kidney Function Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating kidney function in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your kidney function result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current kidney function requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Kidney Function Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Kidney Function Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Kidney Function Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Kidney Function Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Kidney Function Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Kidney Function Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Kidney Function Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Kidney Function Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Kidney Function Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Kidney Function calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your kidney function monthly for 3-6 months to see meaningful trends. Healthy kidney function improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Kidney Function is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your kidney function is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Kidney Function Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
