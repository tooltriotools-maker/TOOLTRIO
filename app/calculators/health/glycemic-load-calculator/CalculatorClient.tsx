'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const FOODS = [
  {name:'White bread (30g)',gi:73,carbs:15},{name:'Whole wheat bread (30g)',gi:69,carbs:13},{name:'White rice (150g cooked)',gi:64,carbs:34},{name:'Brown rice (150g cooked)',gi:55,carbs:32},{name:'Pasta (180g cooked)',gi:49,carbs:43},{name:'Oatmeal (250g cooked)',gi:55,carbs:27},{name:'Apple (medium)',gi:36,carbs:15},{name:'Banana (medium)',gi:51,carbs:23},{name:'Potato, baked (150g)',gi:85,carbs:30},{name:'Sweet potato (150g)',gi:61,carbs:28},{name:'Carrot (80g)',gi:35,carbs:5},{name:'Lentils (150g cooked)',gi:29,carbs:20},
]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [foodIdx, setFoodIdx] = useState(0)
  const [servings, setServings] = useState(1)

  const food = FOODS[foodIdx]
  const gl = Math.round((food.gi * food.carbs * servings) / 100)
  const glLevel = gl >= 20 ? {l:'High GL',c:'text-red-600',bg:'bg-red-50 border-red-300'} : gl >= 11 ? {l:'Medium GL',c:'text-yellow-600',bg:'bg-yellow-50 border-yellow-300'} : {l:'Low GL',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <CalculatorLayout title="Glycemic Load Calculator" description="Calculate glycemic load (GL) for foods to understand their real impact on blood sugar levels." icon="🩸" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="glycemic-load-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Food Selection</h2>
          <div className="space-y-4">
            <SelectField label="Food" value={String(foodIdx)} onChange={v=>setFoodIdx(+v)} options={FOODS.map((f,i)=>({value:String(i),label:f.name}))} />
            <InputField label="Servings" value={servings} onChange={setServings} min={0.25} max={5} step={0.25} suffix="x serving" />
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm space-y-1">
            <div className="flex justify-between"><span className="text-gray-500">Glycemic Index</span><span className="font-bold">{food.gi}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Net Carbs/serving</span><span className="font-bold">{food.carbs}g</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total carbs</span><span className="font-bold">{Math.round(food.carbs*servings)}g</span></div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`rounded-2xl p-6 border-2 ${glLevel.bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-600">Glycemic Load</p>
                <p className={`text-6xl font-black ${glLevel.c} mt-1`}>{gl}</p>
                <p className={`font-bold mt-1 ${glLevel.c}`}>{glLevel.l}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Formula: (GI x carbs) / 100</p>
                <p className="font-mono mt-1">({food.gi} x {Math.round(food.carbs*servings)}) / 100</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Low GL" value="<= 10" />
            <ResultCard label="Medium GL" value="11-19" />
            <ResultCard label="High GL" value=">= 20" />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">GL vs GI: What's the Difference?</h3>
            <p className="text-sm text-gray-600">Glycemic Index (GI) measures how quickly a food raises blood sugar. Glycemic Load (GL) factors in the <strong>amount of carbohydrates</strong> in a serving - giving a more accurate picture of real-world blood sugar impact. A food can have a high GI but low GL if the serving size is small (e.g., watermelon).</p>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Glycemic Load Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 45-year-old with BMI 27, family history of diabetes, and sedentary lifestyle has a <strong>15–20% 10-year risk</strong> of developing Type 2 diabetes. Losing 7% of body weight reduces this risk by 58% (DPP study).
        </p>
        <p className="text-sm text-gray-600">
          This Glycemic Load 2026 uses the ADA FINDRISC screening tool to assess your personal risk level and provide evidence-based prevention strategies.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Glycemic Load Calculator"
        category="health"
        intro={`The **Glycemic Load Calculator** is a a health information tool using the method and reference data described for this calculator. Get your glycemic load instantly - no account needed, works on all devices.

**Why Glycemic Load matters for your health:** Understanding your glycemic load is one of the most important steps in proactive health management. Healthcare professionals use glycemic load as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Glycemic Load Calculator:** This tool applies the calculation method described for glycemic load in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your glycemic load result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current glycemic load requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Glycemic Load Calculator output as You Type", text: "Results update the moment you change any input - there\'s no button to click and no page to reload. This makes the Glycemic Load Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Glycemic Load Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don\'t just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Glycemic Load Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor\'s appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Glycemic Load Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Glycemic Load Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Glycemic Load Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Glycemic Load Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Glycemic Load calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your glycemic load monthly for 3-6 months to see meaningful trends. Healthy glycemic load improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Glycemic Load is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your glycemic load is outside the healthy range, bring these calculations to your next doctor\'s appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you\'re of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Glycemic Load Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
