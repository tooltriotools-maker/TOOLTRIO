'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function validate() {
    const zips = input.split(/[\s,\n]+/).map(z => z.trim()).filter(z => z.length > 0)
    if (!zips.length) return
    setLoading(true)
    const rows = await Promise.all(zips.map(async z => {
      if (!/^\d{5}$/.test(z)) return { zip: z, valid: false, reason: 'Not 5 digits' }
      const res = await fetch(`/api/zip/lookup?zip=${z}`)
      const data = await res.json()
      if (!res.ok) return { zip: z, valid: false, reason: 'Not found in USPS database' }
      return { zip: z, valid: true, city: data.city, state: data.stateCode, county: data.county, population: data.population, type: data.type, areaCode: data.areaCode }
    }))
    setResults(rows)
    setLoading(false)
  }

  const validCount = results.filter(r => r.valid).length

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder="Enter one or more ZIP codes, separated by commas, spaces, or new lines&#10;&#10;Example:&#10;10001, 90210, 60601&#10;99999&#10;00000"
        rows={5}
        className="w-full border-2 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-green-500 mb-3 resize-none"
        style={{ borderColor: '#e2e8f0' }} />
      <button onClick={validate} disabled={loading || !input.trim()} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Validating…' : '✅ Validate ZIP Codes'}
      </button>
      {results.length > 0 && (
        <div>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">Valid</div>
              <div className="text-3xl font-black text-green-600">{validCount}</div>
            </div>
            <div className="flex-1 rounded-xl border p-3 text-center" style={{ background: 'rgba(254,242,242,0.7)', borderColor: 'rgba(254,202,202,0.6)' }}>
              <div className="text-xs text-gray-500">Invalid</div>
              <div className="text-3xl font-black text-red-500">{results.length - validCount}</div>
            </div>
            <div className="flex-1 rounded-xl border p-3 text-center bg-white/70">
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-3xl font-black text-gray-700">{results.length}</div>
            </div>
          </div>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className={`rounded-xl border p-3 ${r.valid ? 'border-green-200 bg-green-50/60' : 'border-red-200 bg-red-50/60'}`}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-lg">{r.zip}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {r.valid ? '✓ Valid' : '✗ Invalid'}
                    </span>
                  </div>
                  {r.valid && <span className="text-sm text-gray-600">{r.city}, {r.state} · {r.county}</span>}
                  {!r.valid && <span className="text-sm text-red-500">{r.reason}</span>}
                </div>
                {r.valid && (
                  <div className="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                    <span>👥 {r.population > 0 ? r.population.toLocaleString() : 'N/A'}</span>
                    <span>📬 {r.type}</span>
                    <span>📞 ({r.areaCode})</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
