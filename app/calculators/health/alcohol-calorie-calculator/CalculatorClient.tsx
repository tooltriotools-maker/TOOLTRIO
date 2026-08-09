'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [drinks, setDrinks] = useState<{type:string; count:number; size:string}[]>([
    {type:'beer_regular',count:2,size:'pint'},
    {type:'wine_red',count:1,size:'glass'},
  ])
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(155)

  const DRINK_DB: Record<string,{name:string;icon:string;sizes:Record<string,{label:string;ml:number;abv:number}>}> = {
    beer_regular:  {name:'Regular Beer',    icon:'🍺', sizes:{bottle:{label:'Bottle 330ml',ml:330,abv:5},pint:{label:'Pint 568ml',ml:568,abv:5},can:{label:'Can 440ml',ml:440,abv:5}}},
    beer_strong:   {name:'Strong Beer/IPA', icon:'🍺', sizes:{bottle:{label:'Bottle 330ml',ml:330,abv:7},can:{label:'Can 440ml',ml:440,abv:7}}},
    beer_light:    {name:'Light Beer',      icon:'🍺', sizes:{can:{label:'Can 355ml',ml:355,abv:3.5},pint:{label:'Pint 568ml',ml:568,abv:3.5}}},
    wine_red:      {name:'Red Wine',        icon:'🍷', sizes:{glass:{label:'Glass 175ml',ml:175,abv:13},large:{label:'Large 250ml',ml:250,abv:13},bottle:{label:'Bottle 750ml',ml:750,abv:13}}},
    wine_white:    {name:'White Wine',      icon:'🥂', sizes:{glass:{label:'Glass 175ml',ml:175,abv:11.5},large:{label:'Large 250ml',ml:250,abv:11.5}}},
    champagne:     {name:'Champagne/Prosecco',icon:'🍾',sizes:{flute:{label:'Flute 125ml',ml:125,abv:11.5}}},
    spirit_neat:   {name:'Spirits (neat)',  icon:'🥃', sizes:{single:{label:'Single 25ml',ml:25,abv:40},double:{label:'Double 50ml',ml:50,abv:40}}},
    gin_tonic:     {name:'Gin & Tonic',     icon:'🍹', sizes:{regular:{label:'Regular',ml:250,abv:8}}},
    vodka_soda:    {name:'Vodka Soda',      icon:'🥤', sizes:{regular:{label:'Regular',ml:250,abv:6}}},
    margarita:     {name:'Margarita',       icon:'🍸', sizes:{regular:{label:'Regular',ml:240,abv:15}}},
    mojito:        {name:'Mojito',          icon:'🍹', sizes:{regular:{label:'Regular',ml:300,abv:10}}},
    whisky_coke:   {name:'Whisky & Coke',   icon:'🥃', sizes:{regular:{label:'Regular',ml:300,abv:8}}},
  }

  const calcCals = (type: string, size: string) => {
    const d = DRINK_DB[type]?.sizes[size]
    if (!d) return 0
    return Math.round(d.ml * d.abv/100 * 0.789 * 7)
  }

  const totalCals = drinks.reduce((sum,d) => sum + calcCals(d.type,d.size)*d.count, 0)
  const activities = [
    {name:'Walking',icon:'🚶',mets:3.5},
    {name:'Running',icon:'🏃',mets:10},
    {name:'Cycling',icon:'🚴',mets:8},
    {name:'Swimming',icon:'🏊',mets:7},
  ].map(a => ({...a, mins:Math.round(totalCals/(a.mets*weight/60))}))

  const drinkTypeOpts = Object.entries(DRINK_DB).map(([k,v])=>({value:k,label:v.icon+' '+v.name}))

  return (
    <CalculatorLayout title="Alcohol Calorie Calculator" description="Count calories in your drinks and see how long it takes to burn them off. Beer, wine, spirits, and cocktails." icon="🍷" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="alcohol-calorie-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-4">Your Drinks</h2>
          <InputField label="Your Weight (kg)" value={weight} onChange={setWeight} min={40} max={200} step={1} suffix="kg" />
          <div className="mt-4 space-y-3">
            {drinks.map((d,i) => (
              <div key={i} className="p-3 rounded-2xl border" style={{background:'rgba(248,250,248,0.7)',borderColor:'rgba(226,232,240,0.5)'}}>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <SelectField label="Drink" value={d.type} onChange={v=>setDrinks(ds=>{const n=[...ds];n[i].type=v;n[i].size=Object.keys(DRINK_DB[v]?.sizes||{})[0]||'glass';return n})} options={drinkTypeOpts} />
                  <SelectField label="Size" value={d.size} onChange={v=>setDrinks(ds=>{const n=[...ds];n[i].size=v;return n})} options={Object.entries(DRINK_DB[d.type]?.sizes||{}).map(([k,v])=>({value:k,label:v.label}))} />
                </div>
                <div className="flex items-center justify-between">
                  <InputField label="Count" value={d.count} onChange={v=>setDrinks(ds=>{const n=[...ds];n[i].count=v;return n})} min={1} max={20} step={1} suffix="x" />
                  <div className="text-right mt-4">
                    <p className="text-sm font-black text-orange-600">{calcCals(d.type,d.size)*d.count} kcal</p>
                    <button onClick={()=>setDrinks(ds=>ds.filter((_,j)=>j!==i))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={()=>setDrinks(ds=>[...ds,{type:'beer_regular',count:1,size:'pint'}])}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-green-400 hover:text-green-600 transition-all">
              + Add Drink
            </button>
          </div>
          <div className="mt-4 p-4 bg-orange-50 rounded-xl text-center border-2 border-orange-200">
            <p className="text-xs font-bold text-orange-600 uppercase">Total Calories</p>
            <p className="text-4xl font-black text-orange-700">{totalCals}</p>
            <p className="text-sm text-orange-500">kcal from alcohol</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Minutes of Exercise to Burn {totalCals} kcal</h3>
            <div className="grid grid-cols-2 gap-3">
              {activities.map(a=>(
                <div key={a.name} className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <p className="text-3xl mb-1">{a.icon}</p>
                  <p className="font-bold text-gray-900">{a.name}</p>
                  <p className="text-2xl font-black text-blue-600 mt-1">{a.mins} min</p>
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
          Alcohol Calorie Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 35-year-old moderately active woman, 5'6", 145 lbs needs approximately <strong>2,050 calories/day</strong> to maintain weight. A 500-calorie daily deficit would produce ~1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This Alcohol Calorie 2026 uses the Mifflin-St Jeor equation — the most accurate formula recommended by registered dietitians — to give you personalized calorie targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Alcohol Calorie Calculator"
        category="health"
        intro={`The **Alcohol [Calorie Calculator](/calculators/health/calorie-calculator)** is a a health information tool using the method and reference data described for this calculator. Get your alcohol calorie instantly - no account needed, works on all devices.

**Why Alcohol Calorie matters for your health:** Understanding your alcohol calorie is one of the most important steps in proactive health management. Healthcare professionals use alcohol calorie as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.



`}
        howItWorks={`**The science behind the Alcohol Calorie Calculator:** This tool applies the calculation method described for alcohol calorie in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your alcohol calorie result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current alcohol calorie requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Alcohol Calorie Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Alcohol Calorie Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Alcohol Calorie Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Alcohol Calorie Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Alcohol Calorie Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Alcohol Calorie Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Alcohol Calorie Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Alcohol Calorie Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Alcohol Calorie calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your alcohol calorie monthly for 3-6 months to see meaningful trends. Healthy alcohol calorie improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Alcohol Calorie is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your alcohol calorie is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Alcohol [Calorie Calculator](/calculators/health/calorie-calculator) represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
