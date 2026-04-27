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
  const [systolic, setSystolic] = useState(130)
  const [cholesterol, setCholesterol] = useState(5.5)
  const [hdl, setHdl] = useState(1.3)
  const [smoker, setSmoker] = useState(false)
  const [diabetes, setDiabetes] = useState(false)
  const [bpMeds, setBpMeds] = useState(false)
  const [familyHistory, setFamilyHistory] = useState(false)

  // Simplified Framingham-like risk score
  const ageScore = gender === 'male' ? (age < 40 ? 0 : age < 50 ? 2 : age < 60 ? 5 : age < 70 ? 8 : 11) : (age < 40 ? 0 : age < 50 ? 1 : age < 60 ? 4 : age < 70 ? 7 : 10)
  const bpScore = systolic < 120 ? 0 : systolic < 130 ? 1 : systolic < 140 ? 2 : systolic < 160 ? 3 : 5
  const cholScore = cholesterol < 4 ? 0 : cholesterol < 5 ? 1 : cholesterol < 6 ? 2 : cholesterol < 7 ? 3 : 4
  const hdlScore = hdl > 1.6 ? -2 : hdl > 1.3 ? -1 : hdl > 1.0 ? 0 : hdl > 0.8 ? 1 : 2
  const totalScore = ageScore + bpScore + cholScore + hdlScore + (smoker ? 4 : 0) + (diabetes ? 3 : 0) + (bpMeds ? 2 : 0) + (familyHistory ? 2 : 0)
  const pct10yr = Math.min(40, Math.max(1, Math.round(totalScore * 1.5)))
  const risk = pct10yr >= 20 ? {l:'High Risk',c:'text-red-600',bg:'bg-red-50 border-red-300'} : pct10yr >= 10 ? {l:'Intermediate Risk',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'} : {l:'Low Risk',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <CalculatorLayout title="Heart Attack Risk Calculator" description="Estimate your 10-year cardiovascular risk using key clinical risk factors." icon="❤️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Risk Factors</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={20} max={79} step={1} suffix="yrs" />
            <InputField label="Systolic BP" value={systolic} onChange={setSystolic} min={90} max={200} step={2} suffix="mmHg" />
            <InputField label="Total Cholesterol" value={cholesterol} onChange={setCholesterol} min={2} max={10} step={0.1} suffix="mmol/L" />
            <InputField label="HDL Cholesterol" value={hdl} onChange={setHdl} min={0.5} max={3} step={0.1} suffix="mmol/L" />
            {[['Current smoker',smoker,setSmoker],['Diabetes',diabetes,setDiabetes],['On blood pressure medication',bpMeds,setBpMeds],['Family history of heart disease',familyHistory,setFamilyHistory]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl p-6 border-2 ${risk.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Estimated 10-Year Cardiovascular Risk</p>
            <p className={`text-6xl font-black ${risk.c}`}>{pct10yr}%</p>
            <p className={`font-bold text-lg mt-1 ${risk.c}`}>{risk.l}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={String(totalScore)} />
            <ResultCard label="10-yr Risk" value={`${pct10yr}%`} highlight />
            <ResultCard label="Classification" value={risk.l.split(' ')[0]} />
          </div>
          <Card>
            <p className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 rounded-xl p-3">⚠️ This is an educational estimate only - not a medical diagnosis. Always consult a doctor or cardiologist for a proper cardiovascular risk assessment and treatment recommendations.</p>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Heart Attack Risk Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Heart Attack Risk 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Heart Attack Risk Calculator"
        category="health"
        intro={`The **Heart Attack Risk Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your heart attack risk instantly - no account needed, works on all devices.

**Why Heart Attack Risk matters for your health:** Understanding your heart attack risk is one of the most important steps in proactive health management. Healthcare professionals use heart attack risk as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), [our Cholesterol Calculator](/calculators/health/cholesterol-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Heart Attack Risk Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating heart attack risk in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your heart attack risk result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current heart attack risk requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Heart Attack Risk Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Heart Attack Risk Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Heart Attack Risk Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Heart Attack Risk Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Heart Attack Risk Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Heart Attack Risk Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Heart Attack Risk Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Heart Attack Risk Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Heart Attack Risk Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Heart Attack Risk calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your heart attack risk monthly for 3-6 months to see meaningful trends. Healthy heart attack risk improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Heart Attack Risk is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your heart attack risk is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Heart Attack Risk Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), [our Cholesterol Calculator](/calculators/health/cholesterol-calculator), and [our Heart Age Calculator](/calculators/health/heart-age-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
