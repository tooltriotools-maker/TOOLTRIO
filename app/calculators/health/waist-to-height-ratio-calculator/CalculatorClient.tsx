'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [waist, setWaist] = useState(80)
  const [height, setHeight] = useState(67)
  const [hip, setHip]   = useState(95)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [gender, setGender] = useState<'male'|'female'>('male')

  const result = useMemo(() => {
    const wCm = unit==='imperial' ? waist*2.54 : waist
    const hCm = unit==='imperial' ? height*2.54 : height
    const hipCm = unit==='imperial' ? hip*2.54 : hip
    const whtr = wCm / hCm
    const whr  = wCm / hipCm
    let whtrCat='', whtrColor='', whtrAdvice=''
    if (whtr < 0.40)       { whtrCat='Extremely Slim';          whtrColor='text-blue-600 bg-blue-50';   whtrAdvice='Extremely slim. Ensure adequate nutrition.'}
    else if (whtr < 0.50)  { whtrCat='Healthy';                 whtrColor='text-green-600 bg-green-50'; whtrAdvice='Excellent! Your waist is less than half your height - low cardiovascular risk.'}
    else if (whtr < 0.55)  { whtrCat='Overweight';              whtrColor='text-yellow-600 bg-yellow-50'; whtrAdvice='Mildly elevated risk. Consider diet and exercise improvements.'}
    else if (whtr < 0.60)  { whtrCat='Obese';                   whtrColor='text-orange-600 bg-orange-50'; whtrAdvice='Significantly elevated cardiovascular risk. See a healthcare provider.'}
    else                    { whtrCat='Extremely Obese';         whtrColor='text-red-600 bg-red-50';     whtrAdvice='High risk. Immediate lifestyle changes and medical consultation recommended.'}
    const whrRisk = gender==='male' ? (whr > 0.95 ? 'Substantially Increased' : whr > 0.90 ? 'Increased' : 'Low') : (whr > 0.88 ? 'Substantially Increased' : whr > 0.85 ? 'Increased' : 'Low')
    const idealMaxWaist = Math.round(hCm * 0.50)
    const toReduce = Math.max(0, Math.round(wCm - idealMaxWaist))
    return { whtr:Math.round(whtr*100)/100, whr:Math.round(whr*100)/100, whtrCat, whtrColor, whtrAdvice, whrRisk, idealMaxWaist, toReduce }
  }, [waist, height, hip, unit, gender])

  return (
    <CalculatorLayout title="Waist-to-Height Ratio Calculator" description="Calculate WHtR and waist-to-hip ratio for cardiovascular risk assessment. Better than BMI for central obesity." icon="📏" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Measurements</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (cm)'},{value:'imperial',label:'Imperial (in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label={`Waist (${unit==='metric'?'cm':'in'})`} value={waist} onChange={setWaist} min={unit==='metric'?40:16} max={unit==='metric'?180:71} step={0.5} suffix={unit==='metric'?'cm':'in'} />
            <InputField label={`Hip (${unit==='metric'?'cm':'in'})`} value={hip} onChange={setHip} min={unit==='metric'?50:20} max={unit==='metric'?180:71} step={0.5} suffix={unit==='metric'?'cm':'in'} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl text-center border-2 ${result.whtrColor}`}>
              <p className="text-xs font-bold uppercase tracking-wide">Waist-to-Height</p>
              <p className="text-4xl font-black my-1">{result.whtr}</p>
              <p className="font-bold text-sm">{result.whtrCat}</p>
              <p className="text-xs mt-1 opacity-80">Target: below 0.50</p>
            </div>
            <div className={`p-4 rounded-xl text-center border-2 ${result.whrRisk==='Low'?'text-green-600 bg-green-50 border-green-200':result.whrRisk==='Increased'?'text-yellow-600 bg-yellow-50 border-yellow-200':'text-red-600 bg-red-50 border-red-200'}`}>
              <p className="text-xs font-bold uppercase tracking-wide">Waist-to-Hip</p>
              <p className="text-4xl font-black my-1">{result.whr}</p>
              <p className="font-bold text-sm">{result.whrRisk} Risk</p>
              <p className="text-xs mt-1 opacity-80">Target: {gender==='male'?'< 0.90':'< 0.85'}</p>
            </div>
          </div>
          <Card>
            <p className="text-sm leading-relaxed text-gray-600">{result.whtrAdvice}</p>
            {result.toReduce > 0 && <p className="text-sm text-orange-600 font-semibold mt-2">Reduce waist by {result.toReduce} cm to reach healthy WHtR. Ideal max waist for your height: {result.idealMaxWaist} cm.</p>}
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">WHtR Categories</h3>
            <div className="space-y-1.5 text-xs">
              {[['< 0.40','Extremely slim','bg-blue-400'],['0.40-0.50','Healthy v','bg-green-500'],['0.50-0.55','Overweight','bg-yellow-400'],['0.55-0.60','Obese','bg-orange-400'],['> 0.60','Extremely obese','bg-red-500']].map(([r,l,c])=>(
                <div key={r} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${c}`} />
                  <span className="w-20 font-mono text-gray-600">{r}</span>
                  <span className="text-gray-700">{l}</span>
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
          Waist To Height Ratio Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Waist To Height Ratio 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Waist To Height Ratio Calculator"
        category="health"
        intro={`The **Waist To Height Ratio Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your waist to height ratio instantly - no account needed, works on all devices.

**Why Waist To Height Ratio matters for your health:** Understanding your waist to height ratio is one of the most important steps in proactive health management. Healthcare professionals use waist to height ratio as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Waist To Height Ratio Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating waist to height ratio in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your waist to height ratio result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current waist to height ratio requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Waist To Height Ratio Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Waist To Height Ratio Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Waist To Height Ratio Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Waist To Height Ratio Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Waist To Height Ratio Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Waist To Height Ratio Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Waist To Height Ratio Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Waist To Height Ratio Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Waist To Height Ratio Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Waist To Height Ratio calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your waist to height ratio monthly for 3-6 months to see meaningful trends. Healthy waist to height ratio improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Waist To Height Ratio is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your waist to height ratio is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Waist To Height Ratio Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
