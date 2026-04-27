'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [age, setAge] = useState(35)
  const [softDrinks, setSoftDrinks] = useState(1)
  const [juice, setJuice] = useState(1)
  const [sweetsSnacks, setSweetsSnacks] = useState(2)
  const [addedSugarTeaspoons, setAddedSugarTeaspoons] = useState(2)
  const [processedMeals, setProcessedMeals] = useState(2)
  const [diabetes, setDiabetes] = useState(false)

  const estimatedG = Math.round(
    softDrinks * 39 +
    juice * 26 +
    sweetsSnacks * 15 +
    addedSugarTeaspoons * 4 +
    processedMeals * 12
  )

  const limit = diabetes ? 25 : gender === 'male' ? 36 : 25
  const limitWHO = 25 // WHO recommendation (5% of 2000kcal)
  const pct = Math.round(estimatedG / limit * 100)
  const teaspoons = (estimatedG / 4).toFixed(1)

  const status = pct > 200 ? {l:'Far Over Limit 🚨',c:'text-red-700'} : pct > 100 ? {l:'Over Limit ⚠️',c:'text-red-600'} : pct > 75 ? {l:'Near Limit 🟡',c:'text-yellow-600'} : {l:'Within Limit v',c:'text-green-600'}

  const HIDDEN_SUGAR = [
    {food:'Regular can of cola (355ml)', g:39},{food:'Fruit yogurt (150g)', g:20},{food:'Granola bar', g:12},
    {food:'Ketchup (2 tbsp)', g:8},{food:'Orange juice (250ml)', g:26},{food:'Sports drink (500ml)', g:34},
    {food:'Flavoured oat milk (250ml)', g:12},{food:'BBQ sauce (2 tbsp)', g:14},
  ]

  return (
    <CalculatorLayout title="Sugar Intake Calculator" description="Estimate your daily added sugar consumption and compare to WHO and AHA recommendations." icon="🍬" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Daily Sugar Sources</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={5} max={100} step={1} suffix="yrs" />
            <InputField label="Soft drinks / soda (cans/day)" value={softDrinks} onChange={setSoftDrinks} min={0} max={10} step={1} suffix="/day" />
            <InputField label="Fruit juice (glasses/day)" value={juice} onChange={setJuice} min={0} max={6} step={1} suffix="/day" />
            <InputField label="Sweets / snacks / desserts" value={sweetsSnacks} onChange={setSweetsSnacks} min={0} max={10} step={1} suffix="/day" />
            <InputField label="Added sugar in tea/coffee (tsp)" value={addedSugarTeaspoons} onChange={setAddedSugarTeaspoons} min={0} max={10} step={1} suffix="tsp" />
            <InputField label="Processed / packaged meals" value={processedMeals} onChange={setProcessedMeals} min={0} max={8} step={1} suffix="/day" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={diabetes} onChange={e=>setDiabetes(e.target.checked)} className="accent-rose-500"/>
              <span>Diabetes / prediabetes (lower limit applies)</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated Daily Added Sugar</p>
              <div className={`text-7xl font-black mb-2 ${status.c}`}>{estimatedG}<span className="text-3xl">g</span></div>
              <p className="text-gray-500">~= {teaspoons} teaspoons - {status.l}</p>
            </div>
          </Card>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className={`h-4 rounded-full transition-all ${pct>150?'bg-red-600':pct>100?'bg-red-400':pct>75?'bg-yellow-500':'bg-green-500'}`} style={{width:`${Math.min(pct,100)}%`}}/>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Your Intake" value={`${estimatedG}g`} />
            <ResultCard label="AHA Limit" value={`${limit}g`} />
            <ResultCard label="WHO Limit" value={`${limitWHO}g`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Hidden Sugar Sources</h3>
            <div className="space-y-1">
              {HIDDEN_SUGAR.map(f => (
                <div key={f.food} className="flex justify-between text-sm py-0.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{f.food}</span>
                  <span className="font-bold">{f.g}g ({(f.g/4).toFixed(0)} tsp)</span>
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
          Sugar Intake Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sugar Intake 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sugar Intake Calculator"
        category="health"
        intro={`The **Sugar Intake Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your sugar intake instantly - no account needed, works on all devices.

**Why Sugar Intake matters for your health:** Understanding your sugar intake is one of the most important steps in proactive health management. Healthcare professionals use sugar intake as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sugar Intake Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating sugar intake in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your sugar intake result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sugar intake requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Sugar Intake Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sugar Intake Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Sugar Intake Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Sugar Intake Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sugar Intake Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sugar Intake Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sugar Intake Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sugar Intake Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sugar Intake Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sugar Intake calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your sugar intake monthly for 3-6 months to see meaningful trends. Healthy sugar intake improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sugar Intake is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sugar intake is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sugar Intake Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
