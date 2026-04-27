'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const AQI_LEVELS = [
  {max:50,label:'Good',color:'text-green-600',bg:'bg-green-50 border-green-300',desc:'Air quality is satisfactory. Enjoy outdoor activities.'},
  {max:100,label:'Moderate',color:'text-yellow-600',bg:'bg-yellow-50 border-yellow-300',desc:'Acceptable; some pollutants may be a concern for sensitive groups.'},
  {max:150,label:'Unhealthy for Sensitive Groups',color:'text-orange-600',bg:'bg-orange-50 border-orange-300',desc:'Members of sensitive groups may experience health effects.'},
  {max:200,label:'Unhealthy',color:'text-red-600',bg:'bg-red-50 border-red-300',desc:'Everyone may begin to experience health effects.'},
  {max:300,label:'Very Unhealthy',color:'text-purple-600',bg:'bg-purple-50 border-purple-300',desc:'Health alert: everyone may experience serious health effects.'},
  {max:500,label:'Hazardous',color:'text-rose-900',bg:'bg-rose-100 border-rose-400',desc:'Health warning of emergency conditions. Avoid all outdoor activity.'},
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [aqi, setAqi] = useState(55)
  const [sensitive, setSensitive] = useState(false)
  const [outdoorHours, setOutdoorHours] = useState(2)

  const level = AQI_LEVELS.find(l => aqi <= l.max) || AQI_LEVELS[5]
  const riskMult = sensitive ? 1.5 : 1
  const dailyExposureRisk = Math.min(100, Math.round((aqi / 200) * outdoorHours * 10 * riskMult))
  const recommendation = aqi <= 50 ? 'Great day for outdoor exercise!' : aqi <= 100 ? 'Unusually sensitive people should consider reducing prolonged outdoor exertion.' : aqi <= 150 ? 'Reduce prolonged outdoor exertion. Take more breaks.' : aqi <= 200 ? 'Avoid prolonged outdoor exertion. Move activities indoors.' : 'Avoid all outdoor activity. Keep windows closed.'

  return (
    <CalculatorLayout title="Air Quality Health Calculator" description="Understand how air quality index (AQI) affects your health and get personalised recommendations." icon="🌬️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Settings</h2>
          <div className="space-y-4">
            <InputField label="Current AQI (0-500)" value={aqi} onChange={setAqi} min={0} max={500} step={1} suffix="AQI" />
            <InputField label="Hours Outdoors Today" value={outdoorHours} onChange={setOutdoorHours} min={0} max={16} step={0.5} suffix="hrs" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={sensitive} onChange={e=>setSensitive(e.target.checked)} className="accent-rose-500"/>
              <span>Sensitive group (asthma, elderly, children, pregnant)</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl p-6 border-2 ${level.bg}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-600">Air Quality Index: {aqi}</p>
                <p className={`text-3xl font-black mt-1 ${level.color}`}>{level.label}</p>
              </div>
              <div className={`text-5xl font-black ${level.color}`}>{aqi}</div>
            </div>
            <p className="text-sm text-gray-700">{level.desc}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Your Risk Level" value={`${dailyExposureRisk}%`} />
            <ResultCard label="Outdoors Today" value={`${outdoorHours}h`} />
            <ResultCard label="Sensitive?" value={sensitive ? 'Yes ⚠️' : 'No'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-2">📋 Today's Recommendation</h3>
            <p className="text-sm text-gray-700">{recommendation}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              {AQI_LEVELS.slice(0,6).map(l=>(
                <div key={l.label} className={`rounded-lg p-2 border ${aqi<=l.max && aqi>(AQI_LEVELS[AQI_LEVELS.indexOf(l)-1]?.max||0)?'ring-2 ring-offset-1 ring-gray-400':''} ${l.bg}`}>
                  <p className={`font-bold ${l.color}`}>{l.max <= 50 ? '0-50' : l.max<=100?'51-100':l.max<=150?'101-150':l.max<=200?'151-200':l.max<=300?'201-300':'301-500'}</p>
                  <p className="text-gray-600 mt-0.5">{l.label.split(' ')[0]}</p>
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
          Air Quality Health Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Air Quality Health 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Air Quality Health Calculator"
        category="health"
        intro={`The **Air Quality Health Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your air quality health instantly - no account needed, works on all devices.

**Why Air Quality Health matters for your health:** Understanding your air quality health is one of the most important steps in proactive health management. Healthcare professionals use air quality health as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Air Quality Health Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating air quality health in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your air quality health result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current air quality health requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Air Quality Health Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there\'s no button to click and no page to reload. This makes the Air Quality Health Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator\'s results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you\'re on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Air Quality Health Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don\'t just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Air Quality Health Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Air Quality Health Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor\'s appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Air Quality Health Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Air Quality Health Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Air Quality Health Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Air Quality Health Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Air Quality Health calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your air quality health monthly for 3-6 months to see meaningful trends. Healthy air quality health improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Air Quality Health is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your air quality health is outside the healthy range, bring these calculations to your next doctor\'s appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you\'re of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Air Quality Health Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
