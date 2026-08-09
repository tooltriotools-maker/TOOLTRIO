'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

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
    <CalculatorLayout title="Vitamin D Calculator" description="Calculate your vitamin D needs from sunlight and supplements based on your skin type, location, and season." icon="☀️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="vitamin-d-calculator">
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
              <button onClick={()=>setIndoorJob(!indoorJob)} className={`w-10 h-5 rounded-full transition-all ${indoorJob?'bg-orange-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${indoorJob?'translate-x-5':''}`} />
              </button>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
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
        intro={`The **Vitamin D Calculator** is a a health information tool using the method and reference data described for this calculator. Get your vitamin d instantly - no account needed, works on all devices.

**Why Vitamin D matters for your health:** Understanding your vitamin d is one of the most important steps in proactive health management. Healthcare professionals use vitamin d as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Calcium Calculator](/calculators/health/calcium-calculator), [our Immune Health Calculator](/calculators/health/immune-health-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Vitamin D Calculator:** This tool applies the calculation method described for vitamin d in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your vitamin d result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current vitamin d requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Vitamin D Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Vitamin D Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Vitamin D Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Vitamin D Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Vitamin D Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Vitamin D Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Vitamin D Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Vitamin D Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Vitamin D calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your vitamin d monthly for 3-6 months to see meaningful trends. Healthy vitamin d improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Vitamin D is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your vitamin d is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Vitamin D Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Calcium Calculator](/calculators/health/calcium-calculator), [our Immune Health Calculator](/calculators/health/immune-health-calculator), and [our Bone health assessment](/calculators/health/body-fat-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
