'use client'
import { useState, useEffect } from 'react'

export default function ZipToolClient() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load a sample of well-known populous ZIPs
    const popularZips = ['11368','10025','77433','60629','90011','11385','77084','60623','11208','90044','11211','10031','60651','77479','90650']
    Promise.all(popularZips.map(z => fetch(`/api/zip/lookup?zip=${z}`).then(r=>r.json()))).then(data => {
      const sorted = data.filter(d=>!d.error).sort((a:any,b:any)=>b.population-a.population)
      setResults(sorted); setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-center py-8 text-gray-400">Loading ZIP data...</div>

  return (
    <div>
      <div className="text-sm text-gray-500 mb-4">Top ZIP codes by population (sample from major metros)</div>
      <div className="space-y-2">
        {results.map((r,i)=>(
          <div key={r.zip} className="rounded-xl border p-3 flex items-center gap-3"
            style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
            <span className="text-sm text-gray-400 w-7 text-right font-bold">#{i+1}</span>
            <span className="font-black font-mono text-green-600 w-14">{r.zip}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{r.city}, {r.stateCode}</div>
              <div className="text-xs text-gray-400">{r.county}</div>
            </div>
            <div className="text-right">
              <div className="font-black text-gray-800">{r.population > 0 ? r.population.toLocaleString() : 'N/A'}</div>
              <div className="text-xs text-gray-400">residents</div>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
              target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">📍</a>
          </div>
        ))}
      </div>
    </div>
  )
}
