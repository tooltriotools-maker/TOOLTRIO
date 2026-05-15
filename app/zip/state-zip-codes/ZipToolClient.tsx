'use client'
import { useState } from 'react'

const STATES: Record<string,string> = {
  'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
  'CO':'Colorado','CT':'Connecticut','DC':'Washington DC','DE':'Delaware','FL':'Florida',
  'GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa',
  'KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland',
  'MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri',
  'MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey',
  'NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio',
  'OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
  'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
  'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming',
}

export default function ZipToolClient() {
  const [state, setState] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(sc: string) {
    setState(sc); if(!sc) { setResults([]); return }
    setLoading(true)
    const res = await fetch(`/api/zip/state?code=${sc}`)
    const data = await res.json()
    setLoading(false)
    setResults(res.ok ? data.results : [])
  }

  return (
    <div>
      <div className="mb-6">
        <select value={state} onChange={e=>load(e.target.value)}
          className="w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}}>
          <option value="">-- Choose a state --</option>
          {Object.entries(STATES).map(([k,v])=><option key={k} value={k}>{v} ({k})</option>)}
        </select>
      </div>
      {loading&&<div className="text-center text-gray-400 py-4">Loading ZIP codes...</div>}
      {!loading&&results.length>0&&(
        <div>
          <div className="text-sm text-gray-500 mb-3">{results.length} ZIP codes in {STATES[state]||state}</div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {results.map((r:any)=>(
              <div key={r.zip} className="rounded-xl border p-3 flex items-center justify-between"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div>
                  <span className="font-black font-mono text-green-600 mr-3">{r.zip}</span>
                  <span className="font-semibold text-gray-800">{r.city}</span>
                  <span className="text-sm text-gray-400 ml-2">{r.county}</span>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                  target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">📍</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
