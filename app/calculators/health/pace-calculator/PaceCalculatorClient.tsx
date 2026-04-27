'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'
import { paceSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

const RACES = [
  { name: '1 Mile', distanceMi: 1 },
  { name: '5K', distanceMi: 3.10686 },
  { name: '10K', distanceMi: 6.21371 },
  { name: 'Half Marathon', distanceMi: 13.1094 },
  { name: 'Marathon', distanceMi: 26.2188 },
]

function formatTime(totalSeconds: number) {
  if (!isFinite(totalSeconds) || totalSeconds <= 0) return '--'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PaceCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [mode, setMode]       = useState<'pace' | 'time' | 'distance'>('pace')
  const [paceMin, setPaceMin] = useState(9)
  const [paceSec, setPaceSec] = useState(30)
  const [hours, setHours]     = useState(0)
  const [mins, setMins]       = useState(50)
  const [secs, setSecs]       = useState(0)
  const [distance, setDistance] = useState(5.0)
  const [unit, setUnit]       = useState<'mi' | 'km'>('mi')

  const paceSecTotal = paceMin * 60 + paceSec
  const timeSecTotal = hours * 3600 + mins * 60 + secs

  const results = useMemo(() => {
    if (mode === 'pace') {
      // Given pace, calc finish times for all races
      return RACES.map(r => ({
        name: r.name,
        distance: r.distanceMi,
        time: formatTime(paceSecTotal * r.distanceMi),
        speed: paceSecTotal > 0 ? (3600 / paceSecTotal).toFixed(2) : '0',
      }))
    } else if (mode === 'time') {
      // Given time and distance, calc pace
      const dist = unit === 'km' ? distance * 0.621371 : distance
      const paceS = timeSecTotal / dist
      return [{ name: `${distance} ${unit}`, distance: dist, time: formatTime(timeSecTotal), speed: (dist / timeSecTotal * 3600).toFixed(2), pace: formatTime(paceS) }]
    } else {
      return []
    }
  }, [mode, paceSecTotal, timeSecTotal, distance, unit])

  const calcPaceFromTime = () => timeSecTotal > 0 ? formatTime(timeSecTotal / (unit === 'km' ? distance * 0.621371 : distance)) : '--'
  const calcSpeedFromPace = () => paceSecTotal > 0 ? (3600 / paceSecTotal).toFixed(2) : '--'

  return (
    <CalculatorLayout title="Pace Calculator" description="Calculate your running pace, finish time, or race distance for 5K, 10K, half marathon, and marathon." icon="🏃" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="pace-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Calculate</h2>
          <div className="space-y-2 mb-5">
            {[
              { k: 'pace', label: 'Finish times from pace' },
              { k: 'time', label: 'Pace from time & distance' },
            ].map(opt => (
              <button key={opt.k} onClick={() => setMode(opt.k as typeof mode)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${mode === opt.k ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {opt.label}
              </button>
            ))}
          </div>

          {mode === 'pace' && (
            <div>
              <p className="text-xs text-gray-500 mb-3">Enter your pace (per mile)</p>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Minutes" value={paceMin} onChange={setPaceMin} min={3} max={30} step={1} suffix="min" />
                <InputField label="Seconds" value={paceSec} onChange={setPaceSec} min={0} max={59} step={1} suffix="sec" />
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-center">
                <p className="text-gray-500">Your pace</p>
                <p className="text-2xl font-black text-gray-900">{paceMin}:{paceSec.toString().padStart(2, '0')} /mi</p>
                <p className="text-gray-500">{calcSpeedFromPace()} mph</p>
              </div>
            </div>
          )}

          {mode === 'time' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-2 block">Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['mi', 'km'] as const).map(u => (
                    <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-sm font-semibold transition-colors ${unit === u ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{u.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <InputField label={`Distance (${unit})`} value={distance} onChange={setDistance} min={0.1} max={100} step={0.1} suffix={unit} />
              <p className="text-xs text-gray-500 mt-2 mb-2">Your finish time</p>
              <div className="grid grid-cols-3 gap-2">
                <InputField label="Hours" value={hours} onChange={setHours} min={0} max={23} step={1} suffix="h" />
                <InputField label="Minutes" value={mins} onChange={setMins} min={0} max={59} step={1} suffix="m" />
                <InputField label="Seconds" value={secs} onChange={setSecs} min={0} max={59} step={1} suffix="s" />
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-xl text-xs text-center">
                <p className="text-gray-500">Your pace</p>
                <p className="text-2xl font-black text-gray-900">{calcPaceFromTime()} /{unit}</p>
              </div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {mode === 'pace' && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Pace" value={`${paceMin}:${paceSec.toString().padStart(2, '0')}`} subValue="per mile" highlight />
                <ResultCard label="Speed" value={`${calcSpeedFromPace()} mph`} subValue="Miles per hour" />
                <ResultCard label="Speed (km/h)" value={`${(parseFloat(calcSpeedFromPace()) * 1.60934).toFixed(2)} km/h`} subValue="Kilometers/hour" />
              </div>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Race Finish Times at Your Pace</h3>
                <div className="overflow-x-auto">
                  <table className="calc-table">
                    <thead><tr><th>Race</th><th>Distance</th><th>Finish Time</th></tr></thead>
                    <tbody>
                      {results.map(r => (
                        <tr key={r.name}>
                          <td className="font-semibold">{r.name}</td>
                          <td>{r.distance.toFixed(2)} mi / {(r.distance * 1.60934).toFixed(2)} km</td>
                          <td className="font-bold text-gray-900 text-lg">{r.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Pace Benchmarks</h3>
                <div className="overflow-x-auto">
                  <table className="calc-table">
                    <thead><tr><th>Runner Level</th><th>Pace/mile</th><th>5K Time</th><th>Half Marathon</th><th>Marathon</th></tr></thead>
                    <tbody>
                      {[
                        ['Beginner', '12:00', '37:15', '2:37:00', '5:15:00'],
                        ['Recreational', '10:00', '31:03', '2:11:00', '4:22:00'],
                        ['Intermediate', '9:00', '27:57', '1:57:00', '3:56:00'],
                        ['Advanced', '7:30', '23:18', '1:38:00', '3:16:00'],
                        ['Competitive', '6:30', '20:11', '1:25:00', '2:50:00'],
                        ['Elite amateur', '5:30', '17:04', '1:12:00', '2:24:00'],
                      ].map(row => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => <td key={i} className={i === 0 ? 'font-medium' : ''}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}

          {mode === 'time' && results.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Pace Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ['Distance', `${distance} ${unit}`],
                  ['Finish Time', formatTime(timeSecTotal)],
                  ['Pace per mile', calcPaceFromTime()],
                  ['Speed (mph)', `${(unit === 'km' ? distance * 0.621371 : distance) / timeSecTotal * 3600 > 0 ? ((unit === 'km' ? distance * 0.621371 : distance) / timeSecTotal * 3600).toFixed(2) : '--'}`],
                  ['5K projected', formatTime(timeSecTotal / (unit === 'km' ? distance * 0.621371 : distance) * 3.10686)],
                  ['10K projected', formatTime(timeSecTotal / (unit === 'km' ? distance * 0.621371 : distance) * 6.21371)],
                ].map(([l, v]) => (
                  <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{l}</p>
                    <p className="font-black text-gray-900">{v}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pace Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Running a 5K in 28 minutes equals a <strong>9:01/mile pace</strong>. To finish a half marathon in under 2 hours, you need to maintain a 9:09/mile pace. A full marathon in under 4 hours requires 9:09/mile.
        </p>
        <p className="text-sm text-gray-600">
          This Pace 2026 converts between pace, distance, and time — useful for setting race goals, planning training runs, and tracking progress over your season.
        </p>
      </Card>
      <SEOContent {...paceSEOContent} category="health" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
