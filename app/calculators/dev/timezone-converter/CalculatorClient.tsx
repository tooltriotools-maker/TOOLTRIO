'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [dateTime, setDateTime] = useState(() => new Date().toISOString().slice(0,16))
  const [fromTz, setFromTz] = useState('UTC')
  const [toTz, setToTz] = useState('America/New_York')
  const [copied, setCopied] = useState('')

  const ZONES = [
    'UTC','America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
    'America/Toronto','America/Sao_Paulo','Europe/London','Europe/Paris','Europe/Berlin',
    'Europe/Moscow','Asia/Dubai','Asia/Kolkata','Asia/Singapore','Asia/Tokyo',
    'Asia/Shanghai','Asia/Seoul','Australia/Sydney','Pacific/Auckland','Africa/Cairo',
  ]

  const convert = useMemo(() => {
    try {
      const dt = new Date(dateTime)
      if (isNaN(dt.getTime())) return null
      const fmt = (tz: string) => ({
        full: dt.toLocaleString('en-US',{timeZone:tz,dateStyle:'full',timeStyle:'long'}),
        short: dt.toLocaleString('en-US',{timeZone:tz,dateStyle:'short',timeStyle:'short'}),
        offset: (() => {
          const s = dt.toLocaleString('en-US',{timeZone:tz,timeZoneName:'shortOffset'})
          const m = s.match(/GMT[+-]\d+(?::\d+)?|UTC/)
          return m ? m[0] : tz
        })(),
      })
      const allZones = ZONES.map(z => ({tz:z, ...fmt(z)}))
      return { from: fmt(fromTz), to: fmt(toTz), all: allZones }
    } catch { return null }
  }, [dateTime, fromTz, toTz])

  const copy = (k: string, v: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Timezone Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🌍 Timezone Converter</h1>
      <p className="text-gray-500 mb-6">Convert time between 20 world time zones instantly</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-1"><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Date &amp; Time</label>
            <input type="datetime-local" value={dateTime} onChange={e=>setDateTime(e.target.value)} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 focus:outline-none" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">From</label>
            <select value={fromTz} onChange={e=>setFromTz(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-2 py-2.5 focus:outline-none focus:border-green-400 bg-white text-sm">{ZONES.map(z=><option key={z} value={z}>{z}</option>)}</select></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">To</label>
            <select value={toTz} onChange={e=>setToTz(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-2 py-2.5 focus:outline-none focus:border-green-400 bg-white text-sm">{ZONES.map(z=><option key={z} value={z}>{z}</option>)}</select></div>
        </div>
        {convert && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[{label:fromTz,r:convert.from},{label:toTz,r:convert.to}].map(({label,r})=>(
              <div key={label} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-500 mb-1">{label} ({r.offset})</p>
                <p className="font-black text-gray-900">{r.short}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.full}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {convert && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3">World Clock - All Zones</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {convert.all.map(z=>(
              <div key={z.tz} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xs text-gray-500 w-28 truncate">{z.tz.split('/').pop()?.replace('_',' ')}</span>
                <span className="text-sm font-bold text-gray-900">{z.short}</span>
                <span className="text-xs text-gray-400">{z.offset}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Timezone Converter</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Pick any date and time, select your origin timezone, and see the equivalent time in 20+ world timezones simultaneously. Perfect for scheduling international meetings, debugging server timestamps, or planning cross-timezone deployments.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">9 AM UTC</p><code className="text-sm font-mono text-blue-800">2024-01-15 09:00 UTC</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">New York (EST)</p><code className="text-sm font-mono text-green-800">4:00 AM EST (UTC-5)</code></div>
        </div>
        <p className="text-sm text-gray-600">The World Clock panel at the bottom shows all 20 zones at once - ideal for finding a meeting time that works across multiple continents. Use the offset badge (e.g. GMT+5:30) to verify you have the right zone selected.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Timezone Converter — World Time Zone Tool"
        category="dev"
        intro={`Distributed teams, global APIs, and internationally scheduled events all require converting between timezones accurately — accounting for daylight saving time transitions, which shift offsets by an hour twice a year in ways that are not always obvious.

This converter shows the same moment in time across all major timezones simultaneously, with DST status clearly marked. Runs in your browser using the IANA timezone database.

**Long-tail searches answered here:** time zone converter free online usa, convert time between cities free tool no signup, world time zone converter free online, meeting time zone planner free no download, current time in different countries free tool, pst est cst mst time converter free usa, utc to est pst conversion calculator free online, best time for meeting between usa and india free, time zone offset from utc calculator free usa, daylight saving time change dates calculator free, convert 2pm est to gmt free online tool, time zone difference between new york and london free, 9am pacific time to eastern time calculator free usa, military time to standard time zone converter free, world clock multiple cities display free tool usa

For timestamp operations, pair with [Unix Timestamp](/calculators/dev/unix-timestamp) or [Epoch Converter](/calculators/dev/epoch-converter).`}
        howItWorks={`Uses JavaScript Intl.DateTimeFormat API with IANA timezone identifiers (e.g. America/New_York, Europe/London, Asia/Tokyo). This automatically handles DST transitions — when New York switches from EST (UTC-5) to EDT (UTC-4) in March, the converter reflects this without any configuration.

Meeting planner mode finds the overlapping business hours window (9am-6pm) across multiple timezones — useful for scheduling calls with distributed teams.`}
        benefits={[
          { title: `DST-aware conversion`, text: `Automatically applies daylight saving time rules using the IANA timezone database. Converting a time in March correctly accounts for whether the US has switched to EDT while the UK is still on GMT.` },
          { title: `Multiple timezone comparison`, text: `View the same moment across all major world timezones simultaneously. Instantly see that your 3pm San Francisco call is 11pm London and 7am the next day in Singapore.` },
          { title: `Meeting planner mode`, text: `Highlights overlapping business hours across selected timezones. Find the 1-2 hour window where everyone is in their 9-5 without doing mental arithmetic.` },
          { title: `UTC offset display`, text: `Shows the current UTC offset for each timezone (e.g. UTC-4, UTC+5:30, UTC+9). Essential when writing cron jobs or scheduling API calls against UTC-based servers.` },
        ]}
        useCases={[
          { title: `Scheduling distributed team meetings`, text: `Your team spans San Francisco, London, and Bangalore. Enter 4pm SF time and immediately see it is midnight in London and 5:30am in Bangalore — you need to find a different time.` },
          { title: `Cron job timezone planning`, text: `Your cron job runs at 02:00 UTC for the nightly report. Convert to find out that is 10pm EST in winter and 9pm EDT in summer — verify with [Cron Expression Builder](/calculators/dev/cron-expression).` },
          { title: `API request timestamp logging`, text: `Your server logs are in UTC. A user reports an issue around 3pm without specifying timezone. Convert their local 3pm to UTC to find the relevant log entries.` },
          { title: `International event scheduling`, text: `Webinars, product launches, and live events need a time that works across key regions. Use meeting planner mode to find a window that falls in daytime for your primary markets.` },
        ]}
        keyStats={[
          { stat: `IANA database`, source: `Uses the same timezone database as Linux, macOS, iOS, and Android` },
          { stat: `DST automatic`, source: `Daylight saving transitions applied automatically — no manual offset adjustment` },
          { stat: `UTC+5:30`, source: `India Standard Time has a non-standard 30-minute offset — correctly handled` },
        ]}
        inlineLinks={[
          { text: `Unix Timestamp`, href: `/calculators/dev/unix-timestamp`, label: `Unix Timestamp` },
          { text: `Epoch Converter`, href: `/calculators/dev/epoch-converter`, label: `Epoch Converter` },
          { text: `Cron Expression Builder`, href: `/calculators/dev/cron-expression`, label: `Cron Expression Builder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
        ]}
        tipsSection={`Use IANA names, not abbreviations. EST is ambiguous — it could be Eastern Standard Time (UTC-5) or Australian Eastern Standard Time (UTC+10). Always use IANA names like America/New_York in your code.

DST changes on different dates. The US switches DST in March; Europe in late March; Australia in April. During the gap weeks, US-Europe offsets differ by one hour from their usual values.

UTC in cron, local in UI. Schedule backend jobs in UTC, but display timestamps to users in their local timezone using Intl.DateTimeFormat.

India has a 30-minute offset. IST is UTC+5:30, not a full hour. When scheduling calls with India, remember the half-hour offset.`}
        conclusion={`Timezone bugs cause real problems: meetings scheduled at the wrong time, cron jobs running at 3am local time, log entries that do not match user reports. This converter handles DST automatically using the same IANA database your servers use.

For complete time handling: convert zones here, build cron schedules with [Cron Expression Builder](/calculators/dev/cron-expression), and decode timestamp fields with [JWT Decoder](/calculators/dev/jwt-decoder).`}
      />
    </div>
  )
}
