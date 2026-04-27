import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Timezone Converter — Convert Time Between Zones Free Online',
  description: 'Convert times between any two time zones. Shows UTC offset, DST status, and overlapping business hours. Runs entirely in your browser.',
  slug: 'timezone-converter',
  keywords: ['timezone converter online free','world time zone converter browser','convert between timezones','dst timezone calculator free','international time converter'],
})

const faqs = [
  { question: "How do time zones and UTC offsets work?", answer: `UTC (Coordinated Universal Time) is the global time standard — all other time zones are expressed as UTC offsets. UTC+5:30 is 5 hours and 30 minutes ahead of UTC (India Standard Time). UTC-5:00 is 5 hours behind (US Eastern Standard Time in winter). The current moment is the same everywhere — 1700000000 Unix timestamp is identical globally. Time zones only affect how that moment is displayed in local time. UTC has no daylight saving time — it is always constant, which is why servers should always store and transmit times in UTC.` },
  { question: "What is daylight saving time (DST) and how does it affect time zone conversions?", answer: `Most countries in North America and Europe shift clocks forward 1 hour in spring and back in autumn — DST. This changes the UTC offset: US Eastern is UTC-5 in winter (EST) and UTC-4 in summer (EDT). Countries near the equator do not observe DST. This makes time zone conversion complex: 'New York time' is not a constant offset — it depends on the time of year. DST transition dates also differ between regions (US transitions differ from EU). Always convert using a time zone library that knows DST rules, not a hardcoded UTC offset.` },
  { question: "What is the IANA time zone database?", answer: `The IANA Time Zone Database (also called tz database or zoneinfo) is the authoritative source for time zone rules — it records every time zone's UTC offset and DST rules historically and going forward. Names like America/New_York, Europe/London, Asia/Tokyo are IANA identifiers. These are more reliable than abbreviations (EST, GMT, IST) which are ambiguous: IST is India Standard Time, Irish Standard Time, and Israel Standard Time. Always use IANA identifiers for unambiguous time zone specification. JavaScript Intl.DateTimeFormat() and most modern libraries use IANA identifiers.` },
  { question: "How do I schedule a meeting across multiple time zones?", answer: `Use UTC as the reference and convert to each attendee's local time. A 15:00 UTC meeting is: 10:00 EST (UTC-5), 16:00 CET (UTC+1), 23:00 JST (UTC+9). Tools like World Time Buddy and Calendly handle this automatically. For recurring meetings, always specify in UTC or use a time zone converter, not local time — the conversion changes twice a year with DST transitions. For international teams, establishing a 'team time zone' (usually UTC or a midpoint between team locations) for all scheduling communication reduces confusion.` },
  { question: "What is the difference between a time zone and a UTC offset?", answer: `A UTC offset (like UTC+5:30) is a fixed number — it does not change. A time zone (like Asia/Kolkata) is a location-based rule that defines which offset applies at any given moment, including historical offset changes and DST rules. India Standard Time (IST) is always UTC+5:30 — India does not observe DST. But US/Eastern switches between UTC-5 and UTC-4 with DST. 'UTC+5:30' and 'Asia/Kolkata' are equivalent for current conversion but differ historically. Always use time zone names for scheduling and IANA identifiers in code.` },
  { question: "How do I handle time zones in JavaScript correctly?", answer: `JavaScript's Date object stores time as milliseconds UTC internally — time zone only affects string representation. Pitfalls: new Date('2026-04-15') is parsed as UTC midnight, but new Date('2026-04-15T00:00:00') is parsed as local time in some implementations. Always use ISO 8601 with explicit Z suffix for UTC: new Date('2026-04-15T12:00:00Z'). For time zone-aware formatting: new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }).format(date). For complex time zone operations (DST-aware addition, business hours calculation): use the Temporal API (stage 3) or the date-fns-tz or luxon libraries.` },
  { question: "What other time and date tools are on this site?", answer: `The Unix Timestamp tool converts between epoch seconds and human-readable dates. The Epoch Converter adds millisecond precision and ISO 8601 output. The Cron Expression Generator builds scheduled task syntax and shows next execution times in context of timezones. The API Response Time Calculator helps model latency for distributed systems across time zones. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Timezone Converter — Convert Time Between Zones Free Online',
    description: 'Convert times between any two time zones. Shows UTC offset, DST status, and overlapping business hours. Runs entirely in your browser.',
    slug: 'timezone-converter',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
