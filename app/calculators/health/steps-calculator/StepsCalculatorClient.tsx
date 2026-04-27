'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'
import { stepsCalorieSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function StepsCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [steps, setSteps]         = useState(10000)
  const [weight, setWeight]       = useState(150)    // lbs
  const [height, setHeight]       = useState(67)     // inches (5'7")
  const [pace, setPace]           = useState<'slow' | 'moderate' | 'brisk' | 'fast'>('moderate')

  const paceData = { slow: { strideIn: 24, mph: 2.0, met: 2.8 }, moderate: { strideIn: 26, mph: 3.0, met: 3.5 }, brisk: { strideIn: 28, mph: 3.5, met: 4.3 }, fast: { strideIn: 30, mph: 4.0, met: 5.0 } }
  const { strideIn, mph, met } = paceData[pace]

  const weightKg     = weight * 0.453592
  const strideFeet   = strideIn / 12
  const distanceFeet = steps * strideFeet
  const distanceMiles = distanceFeet / 5280
  const distanceKm    = distanceMiles * 1.60934
  const durationMin   = distanceMiles / mph * 60
  const calories      = Math.round(met * weightKg * durationMin / 60)

  // Daily step goals
  const goalData = [2000, 4000, 6000, 8000, 10000, 12000, 15000].map(g => ({
    steps: `${g / 1000}K`,
    calories: Math.round(met * weightKg * (g * strideFeet / 5280 / mph)),
    miles: Math.round(g * strideFeet / 5280 * 10) / 10,
  }))

  return (
    <CalculatorLayout title="Steps to Calories Calculator" description="Convert steps to calories burned, miles, kilometers, and active minutes. See what 10,000 steps means for your weight and pace." icon="👣" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="steps-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-5">
            <InputField label="Daily Steps" value={steps} onChange={setSteps} min={100} max={50000} step={500} suffix="steps" />
            <InputField label="Weight (lbs)" value={weight} onChange={setWeight} min={80} max={400} step={1} suffix="lbs" />
            <InputField label="Height (inches)" value={height} onChange={setHeight} min={55} max={82} step={1} suffix="in" />
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Walking Pace</label>
              <div className="grid grid-cols-2 gap-2">
                {(['slow', 'moderate', 'brisk', 'fast'] as const).map(p => (
                  <button key={p} onClick={() => setPace(p)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${pace === p ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {p} ({paceData[p].mph} mph)
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 p-4 bg-blue-50 border border-blue-300 rounded-xl text-xs text-blue-700">
            <p className="font-bold mb-1">CDC Recommendation</p>
            <p className="leading-relaxed">150 min/week of moderate activity (~=7,000-8,000 steps/day) for substantial health benefits. 10,000 steps is a common goal but research supports benefits starting at 7,000-8,000 steps.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Calories Burned" value={`${calories} cal`} subValue={`${steps.toLocaleString()} steps`} highlight />
            <ResultCard label="Distance" value={`${distanceMiles.toFixed(2)} mi`} subValue={`${distanceKm.toFixed(2)} km`} />
            <ResultCard label="Active Minutes" value={`${Math.round(durationMin)} min`} subValue={`At ${mph} mph`} />
            <ResultCard label="Stride Length" value={`${strideIn}"`} subValue={`${(strideFeet).toFixed(2)} ft`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Conversions</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Steps', steps.toLocaleString()],
                  ['Miles', distanceMiles.toFixed(2)],
                  ['Kilometers', distanceKm.toFixed(2)],
                  ['Feet', distanceFeet.toFixed(0)],
                  ['Calories', `${calories} kcal`],
                  ['Active time', `${Math.round(durationMin)} min`],
                  ['Cal per 1,000 steps', `${Math.round(calories / steps * 1000)}`],
                  ['Steps per mile', Math.round(5280 / strideFeet).toLocaleString()],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Weight Loss from Steps</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Daily steps goal', steps.toLocaleString()],
                  ['Calories/day', calories],
                  ['Calories/week (5 days)', Math.round(calories * 5)],
                  ['lbs lost/month (5 days/wk)', ((calories * 5 * 4) / 3500).toFixed(2)],
                  ['Calories/week (7 days)', Math.round(calories * 7)],
                  ['lbs lost/month (daily)', ((calories * 7 * 4) / 3500).toFixed(2)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Calories by Daily Step Goal ({weight} lbs, {pace})</h3>
            <ChartWrapper height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={goalData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="steps" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip formatter={(v: number, name) => [name === 'calories' ? `${v} cal` : `${v} mi`, name === 'calories' ? 'Calories' : 'Miles']} />
                  <Line type="monotone" dataKey="calories" name="calories" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: '#16a34a' }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Steps Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Steps 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...stepsCalorieSEOContent} category="health" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
