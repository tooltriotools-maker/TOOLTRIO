'use client'
import { useState, useEffect } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [r1, setR1] = useState<any>(null)
  const [r2, setR2] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  async function compare() {
    if (!/^\d{5}$/.test(zip1) || !/^\d{5}$/.test(zip2)) { setError('Enter two valid 5-digit ZIP codes'); return }
    setLoading(true); setError('')
    const [a, b] = await Promise.all([zipFetch(`/api/zip/lookup?zip=${zip1}`), zipFetch(`/api/zip/lookup?zip=${zip2}`)])
    const [da, db] = await Promise.all([a.json(), b.json()])
    setLoading(false)
    if (!a.ok || !b.ok) { setError((da.error || db.error)); return }
    setR1(da); setR2(db)
  }

  function localTime(tz: string) {
    try { return now.toLocaleTimeString('en-US', { timeZone: tz, hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }) }
    catch { return '--' }
  }
  function localDate(tz: string) {
    try { return now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }) }
    catch { return '--' }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">FROM ZIP</label>
          <ZipQuickFill onSelect={z => setZip1(z)} />
          <input value={zip1} onChange={e => setZip1(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 10001" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">TO ZIP</label>
          <ZipQuickFill onSelect={z => setZip2(z)} />
          <input value={zip2} onChange={e => setZip2(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 90210" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        </div>
      </div>
      <button onClick={compare} disabled={loading} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Looking up…' : '🕐 Compare Time Zones'}
      </button>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {r1 && r2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[r1, r2].map((r, i) => (
            <div key={i} className="rounded-2xl border p-5 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-sm font-bold text-gray-500 mb-1">{r.city}, {r.stateCode} {r.zip}</div>
              <div className="text-3xl font-black text-green-600 font-mono mb-1">{localTime(r.timezone)}</div>
              <div className="text-sm text-gray-500 mb-3">{localDate(r.timezone)}</div>
              <div className="text-xs font-semibold text-gray-600 bg-white/70 rounded-lg px-3 py-1.5 inline-block mb-3">{r.tzLabel}</div>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="rounded-lg border p-2 bg-white/60">
                  <div className="text-xs text-gray-400">👥 Population</div>
                  <div className="font-bold text-sm">{r.population > 0 ? r.population.toLocaleString() : 'N/A'}</div>
                </div>
                <div className="rounded-lg border p-2 bg-white/60">
                  <div className="text-xs text-gray-400">📞 Area Code</div>
                  <div className="font-bold text-sm">({r.areaCode})</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
