'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [now, setNow] = useState(Math.floor(Date.now()/1000))
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [copied, setCopied] = useState('')
  const [live, setLive] = useState(true)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setNow(Math.floor(Date.now()/1000)), 1000)
    return () => clearInterval(id)
  }, [live])

  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  // Convert timestamp to human readable
  const tsToDate = (ts: string) => {
    const n = parseInt(ts)
    if (isNaN(n)) return null
    const d = new Date(n * 1000)
    return {
      utc: d.toUTCString(),
      iso: d.toISOString(),
      local: d.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      relative: (() => {
        const diff = Math.floor(Date.now()/1000) - n
        if (Math.abs(diff) < 60) return `${diff >= 0 ? diff : -diff} seconds ${diff >= 0 ? 'ago' : 'from now'}`
        if (Math.abs(diff) < 3600) return `${Math.floor(Math.abs(diff)/60)} minutes ${diff >= 0 ? 'ago' : 'from now'}`
        if (Math.abs(diff) < 86400) return `${Math.floor(Math.abs(diff)/3600)} hours ${diff >= 0 ? 'ago' : 'from now'}`
        return `${Math.floor(Math.abs(diff)/86400)} days ${diff >= 0 ? 'ago' : 'from now'}`
      })()
    }
  }

  // Convert date to timestamp
  const dateToTs = (dateStr: string) => {
    if (!dateStr) return null
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return null
    return Math.floor(d.getTime() / 1000)
  }

  const parsedTs = tsInput ? tsToDate(tsInput) : null
  const parsedDate = dateInput ? dateToTs(dateInput) : null

  const COMMON = [
    { label: 'Unix Epoch (0)', ts: 0 },
    { label: 'Y2K (2000-01-01)', ts: 946684800 },
    { label: '1 hour ago', ts: now - 3600 },
    { label: '1 day ago', ts: now - 86400 },
    { label: '1 week ago', ts: now - 604800 },
    { label: '1 year ago', ts: now - 31536000 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Unix Timestamp</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⏱️ Unix Timestamp Converter</h1>
      <p className="text-gray-500 mb-6">Convert between Unix timestamps and human-readable dates. Live current timestamp.</p>

      {/* Live timestamp */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-blue-200 text-sm font-bold uppercase tracking-wider">Current Unix Timestamp</p>
          <div className="flex gap-2">
            <button onClick={() => setLive(!live)} className={`text-xs px-3 py-1 rounded-full font-bold border ${live ? 'bg-green-400 border-green-300 text-green-900' : 'bg-white/20 border-white/30'}`}>
              {live ? '🟢 LIVE' : '⏸ PAUSED'}
            </button>
            <button onClick={() => copy(String(now), 'live')} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30">
              {copied==='live' ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <p className="text-5xl font-black font-mono tracking-tight">{now}</p>
        <p className="text-blue-200 text-sm mt-2">{new Date(now*1000).toUTCString()}</p>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          {[['Seconds', now], ['Milliseconds', now*1000], ['Microseconds', now*1000000]].map(([label, val]) => (
            <button key={label} onClick={() => copy(String(val), label as string)} className="bg-white/10 rounded-xl p-2 hover:bg-white/20 transition-colors">
              <p className="text-xs text-blue-200 font-semibold">{label}</p>
              <p className="font-mono font-bold text-sm truncate">{String(val)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Timestamp -> Date */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Timestamp → Human Date</h2>
          <input
            type="text" inputMode="numeric" value={tsInput}
            onChange={e => setTsInput(e.target.value)}
            placeholder={String(now)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-mono text-lg focus:border-blue-400 focus:outline-none mb-4"
          />
          {parsedTs ? (
            <div className="space-y-2">
              {Object.entries(parsedTs).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl group">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">{k}</p>
                    <p className="font-mono text-sm text-gray-900">{v}</p>
                  </div>
                  <button onClick={() => copy(v, k)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg">
                    {copied===k ? <Check className="w-3.5 h-3.5 text-green-600"/> : <Copy className="w-3.5 h-3.5 text-gray-400"/>}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Enter a Unix timestamp above</p>
          )}
          <button onClick={() => setTsInput(String(now))} className="mt-3 text-xs text-blue-600 font-bold hover:text-blue-700">
            Use current timestamp →
          </button>
        </div>

        {/* Date -> Timestamp */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Human Date → Timestamp</h2>
          <input
            type="datetime-local" value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-400 focus:outline-none mb-4"
          />
          {parsedDate !== null ? (
            <div className="space-y-2">
              {[
                ['Unix (seconds)', String(parsedDate)],
                ['Unix (ms)', String(parsedDate * 1000)],
                ['ISO 8601', new Date(parsedDate*1000).toISOString()],
                ['UTC String', new Date(parsedDate*1000).toUTCString()],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl group">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">{label}</p>
                    <p className="font-mono text-sm text-gray-900">{val}</p>
                  </div>
                  <button onClick={() => copy(val, label)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg">
                    {copied===label ? <Check className="w-3.5 h-3.5 text-green-600"/> : <Copy className="w-3.5 h-3.5 text-gray-400"/>}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Select a date and time above</p>
          )}
        </div>
      </div>

      {/* Common timestamps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Common Reference Timestamps</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMMON.map(c => (
            <button key={c.label} onClick={() => { setTsInput(String(c.ts)); setLive(false) }}
              className="p-3 bg-gray-50 rounded-xl text-left hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all">
              <p className="text-xs font-bold text-gray-600">{c.label}</p>
              <p className="font-mono text-sm text-gray-900">{c.ts}</p>
            </button>
          ))}
        </div>
      </div>

      <SEOContent title="Unix Timestamp Converter" category="dev"
        intro="The Unix Timestamp Converter is the go-to tool for every web developer, backend engineer, and database administrator who works with time-based data. Unix timestamps (also called POSIX time or Epoch time) represent the number of seconds elapsed since January 1, 1970, 00:00:00 UTC - the foundation of how virtually every computer system, database, and API handles time internally.\n\nThis free tool provides a live, ticking current Unix timestamp with one-click copy, bidirectional conversion between timestamps and human-readable dates, and quick-reference common timestamps. All processing happens in your browser with zero data transmission - no server calls, no logging, complete privacy.\n\nFrom JavaScript's Date.now() to Python's time.time(), from MySQL's UNIX_TIMESTAMP() to Redis TTLs - Unix timestamps are everywhere in modern software development. This converter makes working with them fast, accurate, and free.

**Long-tail searches answered here:** unix timestamp converter free online usa, current unix timestamp free tool, epoch to date time converter free no signup, date to unix timestamp free online, how to convert unix time free tool, timestamp to readable date converter free usa, unix timestamp in milliseconds vs seconds free, get unix timestamp from any date free online usa, javascript date to unix timestamp calculator free, python datetime to unix timestamp converter free usa, unix timestamp for 30 days from now calculator, how to store timestamps in database guide free usa, negative unix timestamp pre 1970 converter free, unix timestamp overflow 2038 problem explained free, cron job unix timestamp trigger calculator free usa"
        howItWorks="Unix time counts seconds from the Unix Epoch: midnight UTC on January 1, 1970. The current timestamp is generated using JavaScript's Date.now() / 1000, updated every second in live mode. Converting a timestamp to a date uses the JavaScript Date constructor: new Date(timestamp * 1000), then formatted using toUTCString(), toISOString(), and toLocaleString() with the browser's local timezone.\n\nReverse conversion (date to timestamp) parses your datetime-local input using new Date(dateString).getTime() / 1000. All conversions are done in your browser's JavaScript engine - the same engine that powers millions of Node.js servers and web applications worldwide."
        benefits={[
          { title: 'Live Ticking Current Timestamp', text: 'See the exact current Unix timestamp updating every second in real time. Toggle live/paused mode to freeze the value for copying or reference.' },
          { title: 'Bidirectional Conversion', text: 'Convert any timestamp to UTC, ISO 8601, and local time - or convert any date/time back to a Unix timestamp. Both directions supported instantly.' },
          { title: 'Multiple Format Outputs', text: 'Get your timestamp in seconds, milliseconds, and microseconds with one-click copy for each format - covering JavaScript, Python, Go, Java, and database timestamp formats.' },
          { title: 'Common Reference Timestamps', text: 'Quick-load the Unix Epoch, Y2K, 1 hour/day/week/year ago - useful for testing, SQL queries, and API debugging without manual calculation.' },
          { title: 'Relative Time Display', text: 'See how far in the past or future a timestamp is relative to right now - "3 days ago" or "2 hours from now" - for quick sanity checking.' },
          { title: 'Privacy-First Browser Tool', text: 'No API calls, no server requests. All conversions run client-side. Timestamps you work with (especially for user data or logs) never leave your device.' },
        ]}
        useCases={[
          { title: 'API Development & Debugging', text: 'REST APIs commonly return Unix timestamps in responses. Paste any timestamp from an API response to instantly see what date/time it represents without mental math.' },
          { title: 'Database Queries', text: 'MySQL, PostgreSQL, and MongoDB all use Unix timestamps internally. Generate precise timestamps for WHERE clauses, index ranges, and TTL calculations.' },
          { title: 'Log Analysis', text: 'Server logs and monitoring tools often show Unix timestamps. Convert them instantly to understand when events occurred without using command-line tools.' },
          { title: 'JavaScript & Node.js Development', text: 'Date.now() returns milliseconds, time() functions return seconds - this tool handles both and clarifies the difference to prevent off-by-1000x bugs.' },
          { title: 'Cron Job & Scheduler Setup', text: 'Set accurate start times, expiration dates, and TTL values for scheduled tasks, cache expiries, and rate limiting by converting target dates to exact timestamps.' },
          { title: 'Cross-Timezone Date Debugging', text: 'See UTC, ISO, and local time simultaneously for any timestamp - essential for debugging timezone issues in multi-region applications.' },
        ]}
        tipsSection={`Always store timestamps in UTC in your databases - never in local time. Local time creates timezone bugs when servers are in different regions or daylight saving time changes occur. UTC timestamps are unambiguous.\n\nJavaScript's Date.now() returns milliseconds, not seconds. Divide by 1000 before storing in Unix timestamp fields: Math.floor(Date.now() / 1000). Forgetting this multiplication by 1000 is one of the most common bugs in JavaScript date handling.\n\nFor human display, always convert timestamps to the user's local timezone at display time - not at storage time. This makes your app work correctly for users worldwide without storing timezone-specific data.

For PostgreSQL, timestamp handling has important nuances: TIMESTAMP WITHOUT TIME ZONE stores values without timezone info (naive timestamps), while TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ) stores values in UTC and converts to the session's timezone on retrieval. Best practice: always use TIMESTAMPTZ for any timestamp column representing a real-world moment in time. Use TIMESTAMP only for values where timezone doesn't apply (like "9am every day" appointment times).

In distributed systems, clock synchronization between servers is critical for timestamp-based operations. NTP (Network Time Protocol) keeps server clocks synchronized but can drift by milliseconds. For operations requiring precise global ordering (distributed databases, event sourcing, financial transactions), use logical clocks (Lamport timestamps) or hybrid logical clocks (HLC) rather than wall clock Unix timestamps, which can go backward due to NTP corrections.

For Unix timestamps in URLs and query parameters, prefer 10-digit second timestamps (e.g., 1704067200) over 13-digit millisecond timestamps. Second precision is sufficient for most date filtering, is more human-readable, and is universally supported. Only use millisecond precision when sub-second granularity is genuinely needed.`}
        scienceSection={`The Unix timestamp system was formally defined in POSIX.1 (1988) and has become the universal standard for computer timekeeping. Every major programming language - JavaScript, Python, Go, Java, Ruby, PHP, Rust - has built-in functions that produce and consume Unix timestamps. The format's simplicity (a single integer) makes it ideal for database storage, API responses, log files, and distributed systems.

The 32-bit Unix timestamp signed integer will overflow on January 19, 2038, at 03:14:07 UTC - the Y2K38 problem. Most modern systems have migrated to 64-bit timestamps that won't overflow for 292 billion years. JavaScript's Date.now() already uses 64-bit millisecond timestamps, making it safe for modern applications.

Major databases store time as Unix timestamps internally: MySQL's UNIX_TIMESTAMP() and FROM_UNIXTIME() functions, PostgreSQL's EXTRACT(EPOCH FROM timestamp), MongoDB's Date objects (milliseconds), Redis TTL values (seconds), and DynamoDB's TTL attribute all use Unix time under the hood.`}
        conclusion="The Unix Timestamp Converter eliminates the mental overhead of working with epoch time in daily development. Bookmark it alongside your browser developer tools for instant timestamp lookups during API debugging, log analysis, and database work. Fast, free, private - everything a working developer needs."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
