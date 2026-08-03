'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { zipFetch } from '@/lib/data/zip-client'

function shareResults(center: any, results: any[], radius: number) {
  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const text = `🎯 ZIP Code Radius Search\n📍 Center: ${center.zip} — ${center.city}, ${center.stateCode}\n📏 Radius: ${radius} miles\n📮 ${results.length} ZIP codes found\n👥 Total population: ${totalPop.toLocaleString()}\nSearch yours: tooltrio.com/zip/zips-within-radius`
  if (navigator.share) navigator.share({ title: 'ZIP Radius Results', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResults(center: any, results: any[], radius: number) {
  const header = 'ZIP,City,State,County,Population,Distance_mi,Type\n'
  const rows = results.map(r => `${r.zip},"${r.city}","${r.stateCode}","${r.county}",${r.population || 0},${r.distance?.toFixed(2) || ''},${r.type}`)
  const blob = new Blob([`# ZIP Code Radius Search\n# Center: ${center.zip} (${center.city}, ${center.stateCode})\n# Radius: ${radius} miles\n\n` + header + rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `radius-${center.zip}-${radius}mi.csv`; a.click()
}

const COLORS = ['#22c55e','#16a34a','#4ade80','#86efac','#15803d','#166534']

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [radius, setRadius] = useState(25)
  const [results, setResults] = useState<any[]>([])
  const [center, setCenter] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); return }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/nearby?zip=${val}&radius=${radius}&limit=500`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResults([]); return }
    setCenter(data.center)
    setResults(data.nearby || [])
    if (!data.nearby?.length) setError(`No ZIP codes found within ${radius} miles of ${val}`)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const avgPop = results.length ? Math.round(totalPop / results.length) : 0

  // Distance distribution chart
  const distBuckets = [
    { range: '0-10mi', count: 0 },
    { range: '10-25mi', count: 0 },
    { range: '25-50mi', count: 0 },
    { range: '50-75mi', count: 0 },
    { range: '75-100mi', count: 0 },
    { range: '100+mi', count: 0 },
  ]
  results.forEach(r => {
    const d = r.distance || 0
    if (d < 10) distBuckets[0].count++
    else if (d < 25) distBuckets[1].count++
    else if (d < 50) distBuckets[2].count++
    else if (d < 75) distBuckets[3].count++
    else if (d < 100) distBuckets[4].count++
    else distBuckets[5].count++
  })
  const chartData = distBuckets.filter(b => b.count > 0)

  return (
    <div>
      <ZipQuickFill onSelect={z => setZip(z)} />
      <div className="flex gap-2 mb-3">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Center ZIP (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <div className="flex items-center gap-2 border-2 rounded-xl px-4 py-2" style={{ borderColor: '#e2e8f0' }}>
          <label className="text-xs text-gray-500 whitespace-nowrap">Radius:</label>
          <select value={radius} onChange={e => setRadius(+e.target.value)} className="font-bold text-green-700 bg-transparent focus:outline-none">
            {[5,10,15,25,50,75,100,150,200,300,500].map(r => <option key={r} value={r}>{r} mi</option>)}
          </select>
        </div>
      </div>
      <button onClick={() => lookup()} disabled={loading} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Searching…' : `🎯 Find ZIPs Within ${radius} Miles`}
      </button>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {center && (
        <div className="rounded-2xl border p-3 mb-4 text-sm" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
          <span className="font-bold text-green-700">📍 Center: </span>
          <span className="font-mono font-black">{center.zip}</span>
          <span className="text-gray-600 ml-2">{center.city}, {center.stateCode}</span>
          <span className="text-gray-400 ml-2">· 👥 {center.population > 0 ? center.population.toLocaleString() : 'N/A'}</span>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'ZIP Codes', value: results.length.toLocaleString(), icon: '📮' },
              { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A', icon: '👥' },
              { label: 'Avg Pop/ZIP', value: avgPop > 0 ? avgPop.toLocaleString() : 'N/A', icon: '📊' },
              { label: 'States', value: [...new Set(results.map(r => r.stateCode))].length, icon: '🗺️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Distance distribution chart */}
          {chartData.length > 1 && (
            <div className="rounded-xl border p-4 mb-4 bg-white">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">📊 ZIP Distribution by Distance</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData}>
                  <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[4,4,0,0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex gap-2 mb-3">
            <button onClick={() => center && shareResults(center, results, radius)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share Results
            </button>
            <button onClick={() => center && downloadResults(center, results, radius)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download CSV
            </button>
          </div>

          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'State', 'County', '👥 Population', 'Distance'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-bold text-gray-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-3 py-2 font-mono font-bold text-green-700">{r.zip}</td>
                    <td className="px-3 py-2">{r.city}</td>
                    <td className="px-3 py-2 font-bold">{r.stateCode}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{r.county}</td>
                    <td className="px-3 py-2 font-bold">{r.population > 0 ? r.population.toLocaleString() : '—'}</td>
                    <td className="px-3 py-2 text-green-700 font-bold">{r.distance ? `${r.distance.toFixed(1)} mi` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
