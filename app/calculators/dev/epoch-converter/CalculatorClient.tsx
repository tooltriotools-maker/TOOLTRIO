'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [ts, setTs] = useState(String(Math.floor(Date.now()/1000)))
  const [dateStr, setDateStr] = useState('')
  const [mode, setMode] = useState<'ts-to-date'|'date-to-ts'>('ts-to-date')
  const [copied, setCopied] = useState('')

  const tsResult = useMemo(() => {
    const n = Number(ts)
    if (isNaN(n)) return null
    const ms = ts.length >= 13 ? n : n * 1000
    const d = new Date(ms)
    if (isNaN(d.getTime())) return null
    const now = Date.now()
    const diff = ms - now
    const rel = Math.abs(diff) < 60000 ? 'just now'
      : Math.abs(diff) < 3600000 ? `${Math.round(diff/60000)} min ${diff>0?'from now':'ago'}`
      : Math.abs(diff) < 86400000 ? `${Math.round(diff/3600000)} hrs ${diff>0?'from now':'ago'}`
      : `${Math.round(diff/86400000)} days ${diff>0?'from now':'ago'}`
    return {
      utc: d.toUTCString(),
      iso: d.toISOString(),
      local: d.toLocaleString(),
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      ms: ms,
      sec: Math.floor(ms/1000),
      relative: rel,
    }
  }, [ts])

  const dateResult = useMemo(() => {
    if (!dateStr) return null
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return null
    return { sec: Math.floor(d.getTime()/1000), ms: d.getTime() }
  }, [dateStr])

  const copy = (k: string, v: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Epoch Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⏰ Epoch / Unix Timestamp Converter</h1>
      <p className="text-gray-500 mb-6">Convert Unix timestamps to human dates and back - seconds and milliseconds supported</p>
      <div className="flex gap-2 mb-6">
        {(['ts-to-date','date-to-ts'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode===m?'bg-green-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {m==='ts-to-date' ? 'Timestamp -> Date' : 'Date -> Timestamp'}
          </button>
        ))}
        <button onClick={()=>setTs(String(Math.floor(Date.now()/1000)))} className="ml-auto flex items-center gap-1 px-3 py-2 text-xs font-bold bg-gray-100 rounded-xl hover:bg-gray-200">
          <RefreshCw className="w-3.5 h-3.5" /> Now
        </button>
      </div>
      {mode==='ts-to-date' ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Unix Timestamp (seconds or milliseconds)</label>
          <input value={ts} onChange={e=>setTs(e.target.value)} placeholder="e.g. 1700000000 or 1700000000000"
            className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-xl font-mono font-bold focus:outline-none mb-4" />
          {tsResult && (
            <div className="space-y-2">
              {[{l:'UTC',v:tsResult.utc},{l:'ISO 8601',v:tsResult.iso},{l:'Local',v:tsResult.local},{l:'Relative',v:tsResult.relative},{l:'Milliseconds',v:String(tsResult.ms)},{l:'Seconds',v:String(tsResult.sec)}].map(r=>(
                <div key={r.l} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 w-24">{r.l}</span>
                  <code className="flex-1 text-sm font-mono text-gray-800 text-right mr-3">{r.v}</code>
                  <button onClick={()=>copy(r.l,r.v)} className="text-gray-400 hover:text-green-600 flex-shrink-0">{copied===r.l?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>}</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Date &amp; Time</label>
          <input type="datetime-local" value={dateStr} onChange={e=>setDateStr(e.target.value)}
            className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-lg focus:outline-none mb-4" />
          {dateResult && (
            <div className="space-y-2">
              {[{l:'Unix (seconds)',v:String(dateResult.sec)},{l:'Unix (milliseconds)',v:String(dateResult.ms)}].map(r=>(
                <div key={r.l} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <span className="text-sm font-bold text-gray-700">{r.l}</span>
                  <div className="flex items-center gap-3"><code className="text-xl font-black font-mono text-gray-900">{r.v}</code>
                  <button onClick={()=>copy(r.l,r.v)} className="text-gray-400 hover:text-green-600">{copied===r.l?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>}</button></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Epoch Converter</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Unix timestamps count seconds (or milliseconds) since January 1, 1970 UTC - the Unix Epoch. This tool converts between timestamps and human-readable dates instantly. Use it when debugging API responses, database records, log files, or JWT expiry times.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">Input</p><code className="text-sm font-mono text-blue-800">1700000000</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">UTC Output</p><code className="text-sm font-mono text-green-800">Thu, 14 Nov 2023 22:13:20 GMT</code></div>
        </div>
        <p className="text-sm text-gray-600">The tool auto-detects whether your input is in seconds (10 digits) or milliseconds (13 digits). Click <strong>Now</strong> to get the current timestamp. Switch to Date → Timestamp to convert any date into its Unix equivalent - useful for building API queries with date filters.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Epoch Converter — Unix Timestamp"
        category="dev"
        intro={`Unix epoch timestamps appear everywhere in software: database columns, API responses, JWT tokens, log files, and event tracking. But raw timestamps like 1735689600 or 1735689600000 are meaningless to humans — you cannot tell whether it is in the past or future without converting.

This converter handles both second-precision and millisecond-precision timestamps, converts to local time in any timezone. Runs in your browser.

**Long-tail searches answered here:** unix epoch timestamp converter free online usa, epoch time to human readable date converter free, current unix timestamp free tool no signup, milliseconds to date converter free online tool, epoch timestamp to local time converter free, how to convert epoch time free tool usa, what is unix epoch time simple explanation free, epoch time in javascript vs python difference free, epoch milliseconds vs seconds converter free usa, future date to epoch timestamp calculator free, how many seconds since 1970 epoch calculator usa, negative epoch timestamp meaning converter free, epoch time for different time zones converter usa free, iso 8601 to epoch timestamp converter free, unix epoch and dst daylight saving time handling free

For more timestamp operations, see [Unix Timestamp](/calculators/dev/unix-timestamp) and [Timezone Converter](/calculators/dev/timezone-converter).`}
        howItWorks={`Uses JavaScript Date object to convert between Unix timestamps and human-readable dates. Auto-detects seconds vs milliseconds: values greater than 9,999,999,999 are treated as milliseconds.

Date-to-timestamp converts using Date.prototype.getTime() / 1000 (seconds) or Date.prototype.getTime() (milliseconds). The current timestamp updates live every second using Date.now().

All conversions respect your browser local timezone for display, while also showing the UTC equivalent.`}
        benefits={[
          { title: `Auto-detects seconds vs milliseconds`, text: `Automatically distinguishes between 10-digit second timestamps and 13-digit millisecond timestamps — no need to divide by 1000 manually before pasting.` },
          { title: `Current timestamp live display`, text: `Shows the current Unix timestamp updating in real time — instantly copy the current second or millisecond value for use in API calls or database queries.` },
          { title: `Date to timestamp conversion`, text: `Enter a human-readable date and get the Unix timestamp back — useful for building date range queries with WHERE created_at > 1735689600.` },
          { title: `Relative time display`, text: `Shows how long ago or until a timestamp — 3 days ago, in 2 hours. Makes it immediately clear whether a timestamp refers to a past event or a future one.` },
        ]}
        useCases={[
          { title: `Debugging JWT expiry`, text: `Your JWT token has an exp field with a timestamp value. Paste here to see whether the token has expired or is still valid — without writing a Node.js script.` },
          { title: `Database timestamp queries`, text: `You need to query rows created after a specific date. Convert your target date to a Unix timestamp here and paste it directly into your WHERE clause.` },
          { title: `Log file timestamp parsing`, text: `Application logs often use Unix timestamps. Convert individual log timestamps here to understand when events occurred relative to each other.` },
          { title: `API response timestamp reading`, text: `API responses return created_at and updated_at as Unix timestamps. Convert them here to see whether your cache invalidation window is correctly set.` },
        ]}
        keyStats={[
          { stat: `1970-01-01`, source: `Unix epoch origin — all Unix timestamps are seconds (or ms) since this UTC moment` },
          { stat: `2038 problem`, source: `32-bit Unix timestamps overflow on 19 Jan 2038 — 64-bit timestamps avoid this` },
          { stat: `13 digits`, source: `Millisecond timestamps have 13 digits; second timestamps have 10 — auto-detected` },
        ]}
        inlineLinks={[
          { text: `Unix Timestamp`, href: `/calculators/dev/unix-timestamp`, label: `Unix Timestamp` },
          { text: `Timezone Converter`, href: `/calculators/dev/timezone-converter`, label: `Timezone Converter` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Cron Expression Builder`, href: `/calculators/dev/cron-expression`, label: `Cron Expression Builder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
        ]}
        tipsSection={`Check your JWT exp field. Use [JWT Decoder](/calculators/dev/jwt-decoder) to extract the exp value, then paste it here to see the exact expiry time.

10 digits = seconds, 13 digits = milliseconds. When in doubt, check the digit count before dividing by 1000.

Milliseconds for high-frequency events. Log systems, metrics, and event tracking typically use millisecond timestamps.

Database NOW(). PostgreSQL EXTRACT(EPOCH FROM NOW()) and MySQL UNIX_TIMESTAMP() return second-precision. For milliseconds in PostgreSQL, use (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT.`}
        conclusion={`Unix timestamps appear in virtually every layer of a web application — databases, APIs, tokens, logs, and analytics. Being able to convert them instantly without opening a Node.js REPL saves time daily.

For the full time-handling toolkit: convert timestamps here, decode JWT time fields with [JWT Decoder](/calculators/dev/jwt-decoder), and plan scheduled tasks with [Cron Expression Builder](/calculators/dev/cron-expression).`}
      />
    </div>
  )
}
