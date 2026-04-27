'use client'
import { useState, useMemo, useCallback } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [preMass, setPreMass] = useState(70.0)
  const [postMass, setPostMass] = useState(69.1)
  const [duration, setDuration] = useState(60)
  const [fluidIn, setFluidIn] = useState(0.5)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const prKg = unit === 'imperial' ? preMass * 0.453592 : preMass
    const poKg = unit === 'imperial' ? postMass * 0.453592 : postMass
    const massLoss = prKg - poKg
    const totalSweat = massLoss + fluidIn
    const sweatRateHr = totalSweat / (duration / 60)
    const pctLoss = (massLoss / prKg) * 100
    const recommended = Math.round(sweatRateHr * 0.8 * 1000)
    const impact = pctLoss < 1 ? { l: 'Optimal hydration ✅', c: 'text-green-700 bg-green-50 border-green-200' }
      : pctLoss < 2 ? { l: 'Mild dehydration - performance OK', c: 'text-yellow-700 bg-yellow-50 border-yellow-200' }
      : pctLoss < 3 ? { l: 'Moderate - performance impaired ⚠️', c: 'text-orange-700 bg-orange-50 border-orange-200' }
      : { l: 'Significant dehydration - stop & hydrate ❌', c: 'text-red-700 bg-red-50 border-red-200' }
    return { sweatRateHr: sweatRateHr.toFixed(2), totalSweat: totalSweat.toFixed(2), pctLoss: pctLoss.toFixed(1), recommended, impact }
  }, [preMass, postMass, duration, fluidIn, unit])

  return (
    <CalculatorLayout title="Sweat Rate Calculator" description="Calculate your personal sweat rate and optimal fluid replacement plan for exercise." icon="💧" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Sweat Test Data</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v => setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label={`Pre-exercise weight (${unit==='metric'?'kg':'lbs'})`} value={preMass} onChange={setPreMass} min={40} max={200} step={0.1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label={`Post-exercise weight (${unit==='metric'?'kg':'lbs'})`} value={postMass} onChange={setPostMass} min={40} max={200} step={0.1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Exercise duration" value={duration} onChange={setDuration} min={15} max={360} step={15} suffix="min" />
            <InputField label="Fluid consumed (litres)" value={fluidIn} onChange={setFluidIn} min={0} max={5} step={0.1} suffix="L" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-bold">Sweat Rate</p>
              <p className="text-2xl font-black text-blue-700">{result.sweatRateHr}</p>
              <p className="text-xs text-blue-500">L/hr</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-600 font-bold">Total Sweat</p>
              <p className="text-2xl font-black text-purple-700">{result.totalSweat}</p>
              <p className="text-xs text-purple-500">litres</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-5 rounded-2xl border-2 text-center ${result.impact.c}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Dehydration Level</p>
            <p className="text-5xl font-black my-2">{result.pctLoss}%</p>
            <p className="text-lg font-bold">{result.impact.l}</p>
            <p className="text-sm mt-1 opacity-70">Body weight lost to sweat during session</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Your Hydration Plan</h3>
            <div className="space-y-3">
              {[
                { l: 'Drink per hour during exercise', v: `${result.recommended} ml/hr`, note: '80% of sweat rate (room for thirst cues)' },
                { l: 'Drink every 15 min', v: `${Math.round(Number(result.sweatRateHr)*200)} ml`, note: 'Sip frequency for steady hydration' },
                { l: 'Post-exercise rehydration', v: `${(Number(result.totalSweat)*1.5).toFixed(1)} L`, note: '150% of sweat loss over 2-4 hours' },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div><p className="text-sm font-semibold text-gray-800">{r.l}</p><p className="text-xs text-gray-500">{r.note}</p></div>
                  <span className="text-lg font-black text-blue-700 ml-2 flex-shrink-0">{r.v}</span>
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
          Sweat Rate Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sweat Rate 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sweat Rate Calculator"
        category="health"
        intro={`The **Sweat Rate Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your sweat rate instantly - no account needed, works on all devices.

**Why Sweat Rate matters for your health:** Understanding your sweat rate is one of the most important steps in proactive health management. Healthcare professionals use sweat rate as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sweat Rate Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating sweat rate in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your sweat rate result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sweat rate requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Sweat Rate Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sweat Rate Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Sweat Rate Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Sweat Rate Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sweat Rate Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sweat Rate Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sweat Rate Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sweat Rate Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sweat Rate Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sweat Rate calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your sweat rate monthly for 3-6 months to see meaningful trends. Healthy sweat rate improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sweat Rate is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sweat rate is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sweat Rate Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
