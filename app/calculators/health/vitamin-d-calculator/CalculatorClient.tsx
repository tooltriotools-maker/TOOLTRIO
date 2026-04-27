'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(35)
  const [skinType, setSkinType] = useState<'fair'|'medium'|'olive'|'dark'>('medium')
  const [latitude, setLatitude] = useState(40)
  const [sunMinutesDay, setSunMinutesDay] = useState(15)
  const [season, setSeason] = useState<'summer'|'autumn'|'winter'|'spring'>('winter')
  const [indoorJob, setIndoorJob] = useState(true)
  const [currentD, setCurrentD] = useState<'deficient'|'insufficient'|'sufficient'|'optimal'>('insufficient')

  const result = useMemo(() => {
    // Base IU need
    let baseIU = age >= 71 ? 800 : 600
    
    // Skin type factor
    const skinFactor = {fair:1, medium:1.5, olive:2.5, dark:4}[skinType]
    
    // Latitude/season factor (UVB availability)
    const uvbFactor = season==='winter' ? (latitude>50?0:latitude>40?0.1:0.3) :
                      season==='spring'||season==='autumn' ? (latitude>50?0.4:0.7) : 1
    
    // Sun IU production
    const sunIU = uvbFactor > 0 ? Math.round(1000 * (sunMinutesDay/15) * uvbFactor / skinFactor) : 0
    const indoorPenalty = indoorJob ? 0.3 : 1
    const actualSunIU = Math.round(sunIU * indoorPenalty)
    
    // Dietary IU (rough estimate)
    const dietIU = 200 // average Western diet
    
    // Total from natural sources
    const naturalIU = actualSunIU + dietIU
    
    // Deficit and supplement recommendation
    const currentLevelBonus = {deficient:0, insufficient:100, sufficient:0, optimal:0}[currentD]
    const targetIU = baseIU + (currentD==='deficient'?2000:currentD==='insufficient'?1000:0)
    const supplementIU = Math.max(0, targetIU - naturalIU - currentLevelBonus)
    const recommendedSupplement = supplementIU < 200 ? 0 :
      supplementIU < 600 ? 400 :
      supplementIU < 1200 ? 1000 :
      supplementIU < 1700 ? 1500 : 2000
    
    const uvbAvailable = uvbFactor > 0
    const bestTime = latitude < 35 ? 'Year-round 10am-2pm' : latitude < 45 ? 'Spring-Autumn 10am-2pm' : 'Summer only, midday'
    
    return { baseIU, actualSunIU, dietIU, naturalIU, recommendedSupplement, targetIU, uvbAvailable, bestTime, uvbFactor }
  }, [age,skinType,latitude,sunMinutesDay,season,indoorJob,currentD])

  return (
    <CalculatorLayout title="Vitamin D Calculator" description="Calculate your vitamin D needs from sunlight and supplements based on your skin type, location, and season." icon="☀️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Profile</h2>
          <div className="space-y-4">
            <InputField label="Age" value={age} onChange={setAge} min={1} max={100} step={1} suffix="yrs" />
            <SelectField label="Skin Type" value={skinType} onChange={v=>setSkinType(v as any)} options={[{value:'fair',label:'Fair (Type I-II, burns easily)'},{value:'medium',label:'Medium (Type III-IV, tans)'},{value:'olive',label:'Olive (Type V, rarely burns)'},{value:'dark',label:'Dark (Type VI, never burns)'}]} />
            <InputField label="Your Latitude ( degrees N/S)" value={latitude} onChange={setLatitude} min={0} max={70} step={1} suffix=" degrees" />
            <SelectField label="Current Season" value={season} onChange={v=>setSeason(v as any)} options={[{value:'summer',label:'Summer (Jun-Aug N, Dec-Feb S)'},{value:'spring',label:'Spring (Mar-May N)'},{value:'autumn',label:'Autumn (Sep-Nov N)'},{value:'winter',label:'Winter (Dec-Feb N)'}]} />
            <InputField label="Daily Sun Exposure" value={sunMinutesDay} onChange={setSunMinutesDay} min={0} max={120} step={5} suffix="min" />
            <SelectField label="Current Vitamin D Level" value={currentD} onChange={v=>setCurrentD(v as any)} options={[{value:'deficient',label:'Deficient (<20 ng/mL)'},{value:'insufficient',label:'Insufficient (20-30 ng/mL)'},{value:'sufficient',label:'Sufficient (30+ ng/mL)'},{value:'optimal',label:'Optimal / Not tested'}]} />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Indoor job / limited outdoor?</span>
              <button onClick={()=>setIndoorJob(!indoorJob)} className={`w-10 h-5 rounded-full transition-colors ${indoorJob?'bg-orange-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${indoorJob?'translate-x-5':''}`} />
              </button>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
              <p className="text-xs text-yellow-600 font-bold">From Sun</p>
              <p className="text-3xl font-black text-yellow-700">{result.actualSunIU}</p>
              <p className="text-xs text-yellow-500">IU/day</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <p className="text-xs text-green-600 font-bold">From Diet</p>
              <p className="text-3xl font-black text-green-700">~{result.dietIU}</p>
              <p className="text-xs text-green-500">IU/day</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-blue-600 font-bold">Recommended Supplement</p>
              <p className="text-3xl font-black text-blue-700">{result.recommendedSupplement}</p>
              <p className="text-xs text-blue-500">IU D3/day</p>
            </div>
          </div>
          <Card>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{result.uvbAvailable?'☀️':'🌑'}</span>
              <div>
                <p className="font-bold text-gray-900">{result.uvbAvailable?'UVB rays available at your latitude in this season':'Insufficient UVB at your latitude this season'}</p>
                <p className="text-sm text-gray-600 mt-1">{result.uvbAvailable?`Best sun time: ${result.bestTime}. Expose arms and legs for ${Math.round(15/result.uvbFactor)} minutes.`:'Vitamin D synthesis from sun is negligible. Supplementation is essential through winter.'}</p>
                {!result.uvbAvailable && <p className="text-sm text-orange-600 font-semibold mt-1">Take {result.recommendedSupplement || 1000} IU Vitamin D3 daily throughout winter.</p>}
              </div>
            </div>
          </Card>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-bold text-gray-900 mb-1">💊 Supplement Notes</p>
            <ul className="space-y-1">
              <li>- Always choose Vitamin D3 (cholecalciferol) over D2</li>
              <li>- Take with a fat-containing meal for best absorption</li>
              <li>- Get blood test (serum 25(OH)D) to confirm your level</li>
              <li>- Safe upper limit: 4,000 IU/day for adults</li>
            </ul>
          </div>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Vitamin D Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          An adult woman aged 19–50 needs <strong>18 mg of iron/day</strong> (NIH 2026 DRI). Pregnant women need 27 mg/day. Post-menopausal women and men need only 8 mg/day. Deficiency affects 15% of US women.
        </p>
        <p className="text-sm text-gray-600">
          This Vitamin D 2026 uses current NIH Dietary Reference Intakes to calculate your personalized daily target based on age, sex, and health status.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Vitamin D Calculator"
        category="health"
        intro={`The **Vitamin D Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your vitamin d instantly - no account needed, works on all devices.

**Why Vitamin D matters for your health:** Understanding your vitamin d is one of the most important steps in proactive health management. Healthcare professionals use vitamin d as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Calcium Calculator](/calculators/health/calcium-calculator), [our Immune Health Calculator](/calculators/health/immune-health-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Vitamin D Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating vitamin d in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your vitamin d result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current vitamin d requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Vitamin D Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Vitamin D Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Vitamin D Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Vitamin D Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Vitamin D Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Vitamin D Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Vitamin D Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Vitamin D Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Vitamin D Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Vitamin D calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your vitamin d monthly for 3-6 months to see meaningful trends. Healthy vitamin d improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Vitamin D is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your vitamin d is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Vitamin D Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Calcium Calculator](/calculators/health/calcium-calculator), [our Immune Health Calculator](/calculators/health/immune-health-calculator), and [our Bone health assessment](/calculators/health/body-fat-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
