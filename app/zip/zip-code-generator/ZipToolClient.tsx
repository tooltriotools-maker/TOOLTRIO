'use client'
import { useState } from 'react'

const ALL_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const STATE_PREFIXES: Record<string, number[][]> = {
  'AL': [[350,369]], 'AK': [[995,999]], 'AZ': [[850,865]], 'AR': [[716,729]],
  'CA': [[900,961]], 'CO': [[800,816]], 'CT': [[60,69]], 'DC': [[200,205]],
  'DE': [[197,199]], 'FL': [[320,349]], 'GA': [[300,319],[398,399]],
  'HI': [[967,968]], 'ID': [[832,838]], 'IL': [[600,629]], 'IN': [[460,479]],
  'IA': [[500,528]], 'KS': [[660,679]], 'KY': [[400,427]], 'LA': [[700,714]],
  'ME': [[39,49]], 'MD': [[206,219]], 'MA': [[10,27]], 'MI': [[480,499]],
  'MN': [[550,567]], 'MS': [[386,397]], 'MO': [[630,658]], 'MT': [[590,599]],
  'NE': [[680,693]], 'NV': [[889,898]], 'NH': [[30,38]], 'NJ': [[70,89]],
  'NM': [[870,884]], 'NY': [[100,149]], 'NC': [[270,289]], 'ND': [[580,588]],
  'OH': [[430,458]], 'OK': [[730,749]], 'OR': [[970,979]], 'PA': [[150,196]],
  'RI': [[28,29]], 'SC': [[290,299]], 'SD': [[570,577]], 'TN': [[370,385]],
  'TX': [[750,799]], 'UT': [[840,847]], 'VT': [[50,59]], 'VA': [[220,246]],
  'WA': [[980,994]], 'WV': [[247,268]], 'WI': [[530,549]], 'WY': [[820,831]],
}

async function generateZipsForState(state: string, count: number): Promise<string[]> {
  const response = await fetch('/zip-data/index.json')
  if (!response.ok) throw new Error('Unable to load local ZIP dataset')
  const index = await response.json() as Record<string, [string, string]>
  const candidates = Object.entries(index)
    .filter(([, entry]) => state === 'ALL' || entry[1] === state)
    .map(([zip]) => zip)
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }
  return candidates.slice(0, count)
}

function shareResult(zips: string[], state: string) {
  const text = `📮 Generated ZIP Codes${state !== 'ALL' ? ` — ${state}` : ''}\n\n${zips.slice(0, 10).join(', ')}${zips.length > 10 ? `\n...and ${zips.length - 10} more` : ''}\n\nGenerate yours: tooltrio.com/zip/zip-code-generator`
  if (navigator.share) navigator.share({ title: 'Generated ZIPs', text })
  else navigator.clipboard.writeText(zips.join('\n')).then(() => alert('Copied to clipboard!'))
}

function downloadResult(zips: string[], format: string) {
  let content = '', ext = 'txt', mime = 'text/plain'
  if (format === 'csv') { content = 'ZIP\n' + zips.join('\n'); ext = 'csv'; mime = 'text/csv' }
  else if (format === 'json') { content = JSON.stringify(zips, null, 2); ext = 'json'; mime = 'application/json' }
  else { content = zips.join('\n') }
  const blob = new Blob([content], { type: mime })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `generated-zips.${ext}`; a.click()
}

export default function ZipToolClient() {
  const [state, setState] = useState('ALL')
  const [count, setCount] = useState(10)
  const [format, setFormat] = useState('list')
  const [generated, setGenerated] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  async function generate() {
    try {
      const zips = await generateZipsForState(state, count)
      setGenerated(zips)
    } catch {
      setGenerated([])
    }
  }

  function copyAll() {
    navigator.clipboard.writeText(generated.join('\n'))
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  const displayText = format === 'json'
    ? JSON.stringify(generated, null, 2)
    : format === 'csv'
    ? 'ZIP\n' + generated.join('\n')
    : generated.join('\n')

  return (
    <div>
      <div className="rounded-xl border p-4 mb-4 bg-amber-50 border-amber-200 text-xs text-amber-800">
        ⚠️ <strong>Testing purposes only.</strong> These are randomly selected from ToolTrio’s local US ZIP dataset, so every generated ZIP exists in the local data.
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">State</label>
          <select value={state} onChange={e => setState(e.target.value)}
            className="w-full border-2 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white" style={{ borderColor: '#e2e8f0' }}>
            <option value="ALL">All States (random)</option>
            {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Count: <span className="text-green-700 font-black">{count}</span></label>
          <input type="range" min={1} max={500} value={count} onChange={e => setCount(+e.target.value)}
            className="w-full mt-2 accent-green-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>250</span><span>500</span></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600 block mb-1">Output Format</label>
        <div className="flex rounded-xl overflow-hidden border-2 border-green-200">
          {[['list','📋 List'],['csv','📊 CSV'],['json','{ } JSON']].map(([v, l]) => (
            <button key={v} onClick={() => setFormat(v)}
              className={`flex-1 py-2 text-sm font-bold transition-all ${format === v ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-green-50'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate}
        className="w-full py-3 text-white font-black rounded-xl mb-4"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        🎲 Generate {count} ZIP Code{count !== 1 ? 's' : ''}{state !== 'ALL' ? ` — ${state}` : ''}
      </button>

      {generated.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{generated.length} ZIP codes generated</p>
            <button onClick={generate} className="text-xs text-green-600 font-bold hover:underline">↺ Regenerate</button>
          </div>
          <pre className="bg-gray-50 rounded-xl border p-4 text-sm font-mono text-gray-700 overflow-auto max-h-64 mb-3 whitespace-pre-wrap">
            {displayText}
          </pre>
          <div className="flex gap-2">
            <button onClick={copyAll}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              {copied ? '✅ Copied!' : '📋 Copy All'}
            </button>
            <button onClick={() => shareResult(generated, state)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(generated, format)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
