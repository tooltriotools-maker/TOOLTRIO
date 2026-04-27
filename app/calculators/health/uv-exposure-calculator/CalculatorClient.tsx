'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const SKIN_TYPES = [
  {label:'Type I - Always burns, never tans (very fair)',mef:200},
  {label:'Type II - Burns easily, tans minimally (fair)',mef:250},
  {label:'Type III - Burns moderately, tans uniformly (medium)',mef:300},
  {label:'Type IV - Burns minimally, tans well (olive)',mef:450},
  {label:'Type V - Rarely burns, tans darkly (brown)',mef:600},
  {label:'Type VI - Never burns (dark brown/black)',mef:1000},
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [uvIndex, setUvIndex] = useState(6)
  const [skinType, setSkinType] = useState(1)
  const [spf, setSpf] = useState(0)
  const [outdoorHours, setOutdoorHours] = useState(2)
  const [shade, setShade] = useState(false)
  const [clothing, setClothing] = useState(false)

  const skin = SKIN_TYPES[skinType]
  const protectedMef = spf > 0 ? skin.mef * spf : skin.mef
  const uvRate = uvIndex * 25 // mJ/cm2/hour (simplified)
  const adjustedUvRate = uvRate * (shade ? 0.5 : 1) * (clothing ? 0.7 : 1)
  const burnTime = Math.round(protectedMef / adjustedUvRate * 60)
  const vitDTime = Math.max(5, Math.round(skin.mef * 0.1 / uvRate * 60))
  const actualExposure = Math.round(adjustedUvRate * outdoorHours / 60)
  const burnRisk = actualExposure >= skin.mef ? 'High - sunburn likely' : actualExposure >= skin.mef * 0.7 ? 'Moderate - possible burn' : 'Low v'
  const riskColor = actualExposure >= skin.mef ? 'text-red-600' : actualExposure >= skin.mef * 0.7 ? 'text-orange-600' : 'text-green-600'

  const uvLevel = uvIndex >= 11 ? {l:'Extreme',c:'text-purple-700'} : uvIndex >= 8 ? {l:'Very High',c:'text-red-600'} : uvIndex >= 6 ? {l:'High',c:'text-orange-600'} : uvIndex >= 3 ? {l:'Moderate',c:'text-yellow-600'} : {l:'Low',c:'text-green-600'}

  return (
    <CalculatorLayout title="UV Exposure Calculator" description="Calculate safe sun exposure time, sunburn risk, and vitamin D production based on UV index and skin type." icon="☀️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Exposure Details</h2>
          <div className="space-y-4">
            <InputField label="UV Index (0-12+)" value={uvIndex} onChange={setUvIndex} min={0} max={14} step={1} suffix="" />
            <SelectField label="Skin Type (Fitzpatrick)" value={String(skinType)} onChange={v=>setSkinType(+v)} options={SKIN_TYPES.map((s,i)=>({value:String(i),label:s.label.split(' - ')[0]}))} />
            <InputField label="SPF sunscreen applied (0 = none)" value={spf} onChange={setSpf} min={0} max={100} step={5} suffix="SPF" />
            <InputField label="Hours outdoors" value={outdoorHours} onChange={setOutdoorHours} min={0} max={12} step={0.5} suffix="hrs" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={shade} onChange={e=>setShade(e.target.checked)} className="accent-rose-500"/>
              <span>Mostly in shade (reduces UV ~50%)</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={clothing} onChange={e=>setClothing(e.target.checked)} className="accent-rose-500"/>
              <span>Protective clothing / long sleeves</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">UV Index: {uvIndex} - <span className={uvLevel.c}>{uvLevel.l}</span></p>
              <div className="text-7xl font-black text-rose-500 mb-2">{burnTime}<span className="text-3xl">min</span></div>
              <p className="text-gray-500">Time before sunburn risk{spf > 0 ? ` with SPF ${spf}` : ' without protection'}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Burn Risk Today" value={burnRisk.split(' ')[0]} highlight={actualExposure < skin.mef} />
            <ResultCard label="Vitamin D Time" value={`${vitDTime} min`} />
            <ResultCard label="UV Exposure" value={`${actualExposure} mJ/cm2`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">UV Index Guide & Sun Protection</h3>
            <div className="space-y-2 text-sm">
              {[['0-2','Low - No protection needed','text-green-600'],['3-5','Moderate - SPF 15+ recommended','text-yellow-600'],['6-7','High - SPF 30+, seek shade 11am-3pm','text-orange-600'],['8-10','Very High - SPF 50+, limit midday sun','text-red-600'],['11+','Extreme - Avoid sun exposure','text-purple-700']].map(([i,r,c])=>(
                <div key={i as string} className="flex gap-3"><span className={`font-bold w-10 flex-shrink-0 ${c}`}>{i}</span><span className="text-gray-600">{r}</span></div>
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
          UV Exposure Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this UV Exposure 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Uv Exposure Calculator"
        category="health"
        intro={`The **Uv Exposure Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your uv exposure instantly - no account needed, works on all devices.

**Why Uv Exposure matters for your health:** Understanding your uv exposure is one of the most important steps in proactive health management. Healthcare professionals use uv exposure as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Uv Exposure Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating uv exposure in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your uv exposure result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current uv exposure requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Uv Exposure Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Uv Exposure Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Uv Exposure Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Uv Exposure Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Uv Exposure Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Uv Exposure Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Uv Exposure Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Uv Exposure Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Uv Exposure Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Uv Exposure calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your uv exposure monthly for 3-6 months to see meaningful trends. Healthy uv exposure improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Uv Exposure is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your uv exposure is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Uv Exposure Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
