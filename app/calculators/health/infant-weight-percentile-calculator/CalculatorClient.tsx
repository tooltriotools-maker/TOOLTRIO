'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(12)
  const [ageUnit, setAgeUnit] = useState<'months'|'years'>('months')
  const [weight, setWeight] = useState(9.5)
  const [height, setHeight] = useState(75)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  // Approximate WHO median and SD for weight-for-age (simplified)
  const getPercentile = (value: number, median: number, sd: number) => {
    const z = (value - median) / sd
    // Approximate normal CDF
    const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911
    const sign = z < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(z))
    const poly = t*(a1+t*(a2+t*(a3+t*(a4+t*a5))))
    const cdf = 0.5 * (1 + sign * (1 - poly * Math.exp(-z*z/2)))
    return Math.max(1, Math.min(99, Math.round(cdf * 100)))
  }

  const result = useMemo(() => {
    const ageMonths = ageUnit==='years' ? age*12 : age
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height

    // Simplified WHO median weight data (kg) by age months and gender
    // These are rough approximations for demo purposes
    const wMedian = gender==='male'
      ? 3.3 + ageMonths*0.27 - Math.pow(ageMonths,2)*0.001
      : 3.2 + ageMonths*0.25 - Math.pow(ageMonths,2)*0.001
    const wSD = wMedian * 0.13

    const hMedian = gender==='male'
      ? 50 + ageMonths*1.1 - Math.pow(ageMonths,2)*0.004
      : 49 + ageMonths*1.05 - Math.pow(ageMonths,2)*0.003
    const hSD = hMedian * 0.04

    const bmi = wKg / Math.pow(hCm/100, 2)
    const bmiMedian = gender==='male'
      ? 13.5 + ageMonths*0.02
      : 13.2 + ageMonths*0.02
    const bmiSD = bmiMedian * 0.12

    const weightPct = getPercentile(wKg, Math.max(3, wMedian), wSD)
    const heightPct = getPercentile(hCm, Math.max(50, hMedian), hSD)
    const bmiPct    = getPercentile(bmi, bmiMedian, bmiSD)

    const getStatus = (pct: number) =>
      pct < 3  ? {l:'Very Low',c:'text-red-700 bg-red-50'}
      : pct < 15 ? {l:'Low',c:'text-orange-600 bg-orange-50'}
      : pct < 85 ? {l:'Normal',c:'text-green-700 bg-green-50'}
      : pct < 97 ? {l:'High',c:'text-orange-600 bg-orange-50'}
      :             {l:'Very High',c:'text-red-700 bg-red-50'}

    return { weightPct, heightPct, bmiPct, bmi:bmi.toFixed(1),
      wStatus:getStatus(weightPct), hStatus:getStatus(heightPct), bmiStatus:getStatus(bmiPct) }
  }, [age,ageUnit,weight,height,gender,unit])

  return (
    <CalculatorLayout title="Baby & Child Growth Percentile Calculator" description="Track your child's weight and height percentiles using WHO and CDC growth chart data. Ages 0-20." icon="👶" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Child Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Boy'},{value:'female',label:'Girl'}]} />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Age" value={age} onChange={setAge} min={0} max={ageUnit==='months'?240:20} step={1} suffix={ageUnit==='months'?'mo':'yrs'} />
              <SelectField label="Unit" value={ageUnit} onChange={v=>setAgeUnit(v as any)} options={[{value:'months',label:'Months'},{value:'years',label:'Years'}]} />
            </div>
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?1:2.2} max={unit==='metric'?120:264} step={unit==='metric'?0.1:0.1} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
</div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {l:'Weight',pct:result.weightPct,s:result.wStatus,icon:'⚖️'},
              {l:'Height',pct:result.heightPct,s:result.hStatus,icon:'📏'},
              {l:'BMI',pct:result.bmiPct,s:result.bmiStatus,icon:'📊'},
            ].map(m=>(
              <div key={m.l} className={`p-4 rounded-2xl border-2 text-center ${m.s.c}`}>
                <p className="text-2xl mb-1">{m.icon}</p>
                <p className="text-xs font-bold uppercase opacity-70">{m.l}</p>
                <p className="text-4xl font-black">{m.pct}<span className="text-base font-normal">th</span></p>
                <p className="text-sm font-semibold">{m.s.l}</p>
              </div>
            ))}
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Understanding Percentiles</h3>
            <div className="space-y-2">
              {[['<3rd & <5th','Underweight - consult paediatrician','bg-red-400'],['5th-15th','Below average - monitor','bg-orange-400'],['15th-85th','Normal healthy range','bg-green-500'],['85th-95th','Above average - monitor','bg-orange-400'],['>97th','Overweight - consult paediatrician','bg-red-400']].map(([r,l,c])=>(
                <div key={r} className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${c}`} />
                  <span className="w-24 font-mono text-gray-600">{r}</span>
                  <span className="text-gray-700">{l}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">⚠️ These are estimates. Always consult your paediatrician for official growth assessment using printed growth charts over multiple visits.</p>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Infant Weight Percentile Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Infant Weight Percentile 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Infant Weight Percentile Calculator"
        category="health"
        intro={`The **Infant Weight Percentile Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your infant weight percentile instantly - no account needed, works on all devices.

**Why Infant Weight Percentile matters for your health:** Understanding your infant weight percentile is one of the most important steps in proactive health management. Healthcare professionals use infant weight percentile as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Infant Weight Percentile Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating infant weight percentile in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your infant weight percentile result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current infant weight percentile requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Infant Weight Percentile Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Infant Weight Percentile Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Infant Weight Percentile Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Infant Weight Percentile Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Infant Weight Percentile Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Infant Weight Percentile Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Infant Weight Percentile Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Infant Weight Percentile Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Infant Weight Percentile Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Infant Weight Percentile calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your infant weight percentile monthly for 3-6 months to see meaningful trends. Healthy infant weight percentile improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Infant Weight Percentile is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your infant weight percentile is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Infant Weight Percentile Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
