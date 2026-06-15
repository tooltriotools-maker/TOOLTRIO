'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'

const TOP_ZIPS = [
  '11368','10025','77433','60629','90011','11385','77084','60623','11208','90044',
  '11211','10031','60651','77479','90650','10001','77494','90001','30301','77002',
  '77007','60609','11373','10002','90057','11377','10032','77036','60618','60607',
]

function downloadResults(results: any[]) {
  const header = 'Rank,ZIP,City,State,County,Population,Lat,Lng\n'
  const rows = results.map((r, i) => `${i+1},${r.zip},"${r.city}","${r.stateCode}","${r.county}",${r.population},${r.lat},${r.lng}`)
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'largest-zip-codes.csv'; a.click()
}

function shareResults(results: any[]) {
  const top5 = results.slice(0, 5).map((r, i) => `#${i+1} ${r.zip} — ${r.city}, ${r.stateCode} (${r.population.toLocaleString()})`).join('\n')
  const text = `🏙️ Largest US ZIP Codes by Population\n\n${top5}\n\nSee all at tooltrio.com/zip/largest-zip-codes`
  if (navigator.share) navigator.share({ title: 'Largest ZIP Codes', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

const COLORS = ['#22c55e','#16a34a','#4ade80','#86efac','#15803d','#166534','#bbf7d0','#dcfce7','#a3e635','#65a30d']

export default function ZipToolClient() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'list'|'bar'|'pie'>('list')

  useEffect(() => {
    Promise.all(TOP_ZIPS.map(z => fetch(`/api/zip/lookup?zip=${z}`).then(r => r.json())))
      .then(data => {
        const sorted = data.filter(d => !d.error && d.population > 0).sort((a: any, b: any) => b.population - a.population)
        setResults(sorted); setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="space-y-3">
      {[1,2,3,4,5].map(i => <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />)}
    </div>
  )

  const totalPop = results.reduce((s, r) => s + r.population, 0)
  const chartData = results.slice(0, 10).map(r => ({ name: r.zip, pop: r.population, city: r.city }))

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'ZIPs Tracked', value: results.length, icon: '📮' },
          { label: 'Total Population', value: totalPop.toLocaleString(), icon: '👥' },
          { label: 'Avg Pop/ZIP', value: Math.round(totalPop / results.length).toLocaleString(), icon: '📊' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
            <div className="text-lg font-black text-green-600">{s.value}</div>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex rounded-xl overflow-hidden border-2 border-green-200 mb-4">
        {(['list','bar','pie'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`flex-1 py-2 text-sm font-bold transition-all ${view === v ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-green-50'}`}>
            {v === 'list' ? '📋 List' : v === 'bar' ? '📊 Bar Chart' : '🥧 Pie Chart'}
          </button>
        ))}
      </div>

      {view === 'bar' && (
        <div className="rounded-xl border p-4 mb-4 bg-white">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Top 10 ZIP Codes by Population</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ bottom: 40 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number, _, props: any) => [`${v.toLocaleString()} residents`, props.payload.city]} />
              <Bar dataKey="pop" radius={[4,4,0,0]}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === 'pie' && (
        <div className="rounded-xl border p-4 mb-4 bg-white">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Population Share — Top 10 ZIPs</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={chartData} dataKey="pop" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name }) => name}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-2 mb-4">
          {results.map((r, i) => (
            <div key={r.zip} className="rounded-xl border p-3 flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(226,232,240,0.7)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                style={{ background: i < 3 ? '#22c55e' : '#86efac', color: i < 3 ? 'white' : '#166534' }}>
                #{i+1}
              </div>
              <span className="font-black font-mono text-green-600 w-14 text-base">{r.zip}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 text-sm truncate">{r.city}, {r.stateCode}</div>
                <div className="text-xs text-gray-400">{r.county} · {r.type}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-black text-gray-800 text-sm">{r.population.toLocaleString()}</div>
                <div className="text-xs text-gray-400">residents</div>
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                target="_blank" rel="noopener noreferrer"
                className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm flex-shrink-0">📍</a>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => shareResults(results)}
          className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
          📤 Share Results
        </button>
        <button onClick={() => downloadResults(results)}
          className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
          ⬇️ Download CSV
        </button>
      </div>
    </div>
  )
}
