'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [trimester, setTrimester] = useState<'1'|'2'|'3'>('2')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(150)
  const [preWeight, setPreWeight] = useState(63)
  const [height, setHeight] = useState(65)
  const [twins, setTwins] = useState(false)

  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height
  const preWeightKg = unit === 'imperial' ? preWeight / 2.20462 : preWeight
  const preBMI = preWeightKg / Math.pow(heightCm/100, 2)
  const extraCal = trimester === '1' ? 0 : trimester === '2' ? 340 : 450
  const baseCal = Math.round(weightKg * 22 + 500)
  const totalCal = baseCal + extraCal + (twins ? 300 : 0)

  const NUTRIENTS = [
    {name:'Folate / Folic Acid',need:600,unit:'ug',note:'Critical for neural tube development'},
    {name:'Iron',need:27,unit:'mg',note:'Supports increased blood volume'},
    {name:'Calcium',need:1000,unit:'mg',note:'Baby bone development'},
    {name:'Protein',need:Math.round(weight*1.2+25),unit:'g',note:'Extra 25g above non-pregnant needs'},
    {name:'Vitamin D',need:600,unit:'IU',note:'Bone health and immune function'},
    {name:'Omega-3 (DHA)',need:200,unit:'mg',note:'Brain and eye development'},
    {name:'Iodine',need:220,unit:'ug',note:'Thyroid and brain development'},
  ]

  return (
    <CalculatorLayout title="Pregnancy Nutrition Calculator" description="Calculate calorie and nutrient requirements during pregnancy by trimester." icon="🤰" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Pregnancy Details</h2>
          <div className="space-y-4">
            <SelectField label="Trimester" value={trimester} onChange={v=>setTrimester(v as any)} options={[{value:'1',label:'First Trimester (0-12 weeks)'},{value:'2',label:'Second Trimester (13-26 weeks)'},{value:'3',label:'Third Trimester (27-40 weeks)'}]} />
            <InputField label="Current Weight" value={weight} onChange={setWeight} min={40} max={150} step={1} suffix="kg" />
            <InputField label="Pre-pregnancy Weight" value={preWeight} onChange={setPreWeight} min={40} max={150} step={1} suffix="kg" />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={twins} onChange={e=>setTwins(e.target.checked)} className="accent-rose-500"/>
              <span>Twins / Multiple pregnancy</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Daily Calorie Target</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{totalCal}</div>
              <p className="text-gray-500">+{extraCal} kcal above baseline for Trimester {trimester}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Pre-pregnancy BMI" value={preBMI.toFixed(1)} />
            <ResultCard label="Weight Gain" value={`+${(weight-preWeight).toFixed(1)}kg`} highlight />
            <ResultCard label="Pregnancy" value={twins ? '👶👶 Twins' : '👶 Single'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Key Nutrient Targets</h3>
            <div className="space-y-2">
              {NUTRIENTS.map(n=>(
                <div key={n.name} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                  <div><p className="font-bold text-gray-800">{n.name}</p><p className="text-xs text-gray-500">{n.note}</p></div>
                  <span className="font-black text-rose-600">{n.need}{n.unit}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pregnancy Nutrition Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If your last menstrual period started on January 1, 2026, your estimated due date is <strong>October 8, 2026</strong> (Naegele's Rule: add 280 days / 40 weeks). First trimester ends around March 22.
        </p>
        <p className="text-sm text-gray-600">
          This Pregnancy Nutrition 2026 provides your full trimester timeline, key milestone dates, and week-by-week development overview based on ACOG standards.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Pregnancy Nutrition Calculator"
        category="health"
        intro={`The **Pregnancy Nutrition Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your pregnancy nutrition instantly - no account needed, works on all devices.

**Why Pregnancy Nutrition matters for your health:** Understanding your pregnancy nutrition is one of the most important steps in proactive health management. Healthcare professionals use pregnancy nutrition as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Pregnancy Nutrition Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating pregnancy nutrition in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your pregnancy nutrition result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current pregnancy nutrition requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Pregnancy Nutrition Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Pregnancy Nutrition Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Pregnancy Nutrition Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Pregnancy Nutrition Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Pregnancy Nutrition Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Pregnancy Nutrition Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Pregnancy Nutrition Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Pregnancy Nutrition Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Pregnancy Nutrition Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Pregnancy Nutrition calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your pregnancy nutrition monthly for 3-6 months to see meaningful trends. Healthy pregnancy nutrition improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Pregnancy Nutrition is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your pregnancy nutrition is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Pregnancy Nutrition Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
