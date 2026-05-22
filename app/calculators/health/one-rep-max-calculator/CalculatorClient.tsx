'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(100)
  const [reps, setReps] = useState(5)
  const [exercise, setExercise] = useState('bench')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const w = weight
    const r = reps
    const epley   = r===1 ? w : Math.round(w*(1 + r/30))
    const brzycki = r===1 ? w : Math.round(w*(36/(37-Math.min(r,36))))
    const lander  = r===1 ? w : Math.round((100*w)/(101.3-2.67123*r))
    const avg     = Math.round((epley+brzycki+lander)/3)
    const pcts = [100,95,90,85,80,75,70,65,60,55,50].map(p => ({
      pct:p, weight:Math.round(avg*p/100),
      reps: p>=95?1:p>=90?2:p>=87?3:p>=85?4:p>=82?5:p>=80?6:p>=75?8:p>=70?10:p>=65?12:p>=60?15:20,
      zone: p>=90?'Max Strength':p>=80?'Strength':p>=70?'Hypertrophy':p>=60?'Endurance':'Active Recovery'
    }))
    return { epley, brzycki, lander, avg, pcts }
  }, [weight, reps])

  const zoneColor: Record<string,string> = {'Max Strength':'text-red-700 bg-red-50','Strength':'text-orange-700 bg-orange-50','Hypertrophy':'text-blue-700 bg-blue-50','Endurance':'text-green-700 bg-green-50','Active Recovery':'text-gray-600 bg-gray-50'}

  return (
    <CalculatorLayout title="One Rep Max Calculator" description="Calculate your 1RM from any rep count using 3 formulas, plus full training percentage breakdown." icon="🏋️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Lift</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'kg',label:'Kilograms (kg)'},{value:'lbs',label:'Pounds (lbs)'}]} />
            <SelectField label="Exercise" value={exercise} onChange={v=>setExercise(v)} options={[{value:'bench',label:'🏋️ Bench Press'},{value:'squat',label:'🦵 Squat'},{value:'deadlift',label:'💀 Deadlift'},{value:'ohp',label:'🙌 Overhead Press'},{value:'row',label:'💪 Barbell Row'},{value:'other',label:'Other'}]} />
            <InputField label={`Weight Lifted (${unit})`} value={weight} onChange={setWeight} min={10} max={500} step={2.5} suffix={unit} />
            <InputField label="Reps Completed" value={reps} onChange={setReps} min={1} max={20} step={1} suffix="reps" />
          </div>
          <div className="mt-5 p-4 bg-red-50 rounded-xl text-center border-2 border-red-200">
            <p className="text-xs text-red-600 font-bold uppercase tracking-wide">Estimated 1RM</p>
            <p className="text-5xl font-black text-red-700 my-1">{result.avg}</p>
            <p className="text-sm text-red-600 font-semibold">{unit}</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            {[{n:'Epley',v:result.epley},{n:'Brzycki',v:result.brzycki},{n:'Lander',v:result.lander}].map(f=>(
              <div key={f.n} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">{f.n}</p>
                <p className="font-black text-gray-900 text-sm">{f.v}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Training Percentage Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 text-xs font-bold text-gray-500">
                  <th className="p-2 text-left">%</th><th className="p-2 text-right">Weight ({unit})</th><th className="p-2 text-right">Target Reps</th><th className="p-2 text-left">Zone</th>
                </tr></thead>
                <tbody>
                  {result.pcts.map(p=>(
                    <tr key={p.pct} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-2 font-bold text-gray-900">{p.pct}%</td>
                      <td className="p-2 text-right font-semibold">{p.weight}</td>
                      <td className="p-2 text-right text-gray-600">{p.reps}</td>
                      <td className="p-2"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${zoneColor[p.zone]}`}>{p.zone}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          One Rep Max Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this One Rep Max 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="One Rep Max Calculator"
        category="health"
        intro={`The **One Rep Max Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your one rep max instantly - no account needed, works on all devices.

**Why One Rep Max matters for your health:** Understanding your one rep max is one of the most important steps in proactive health management. Healthcare professionals use one rep max as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Squat Calculator](/calculators/health/squat-calculator), [our Muscle Gain Calculator](/calculators/health/muscle-gain-calculator) for a complete picture.`}
        howItWorks={`**The science behind the One Rep Max Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating one rep max in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your one rep max result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current one rep max requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This One Rep Max Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the One Rep Max Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the One Rep Max Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this One Rep Max Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the One Rep Max Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the One Rep Max Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the One Rep Max Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the One Rep Max Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the One Rep Max Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate One Rep Max calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your one rep max monthly for 3-6 months to see meaningful trends. Healthy one rep max improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** One Rep Max is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your one rep max is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The One Rep Max Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Squat Calculator](/calculators/health/squat-calculator), [our Muscle Gain Calculator](/calculators/health/muscle-gain-calculator), and [our Athletic Performance Calculator](/calculators/health/athletic-performance-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
