import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Unix Timestamp Converter — Epoch to Date & Time Free',
  description: 'Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, UTC and local time. Runs entirely in your browser.',
  slug: 'unix-timestamp',
  keywords: ['unix timestamp converter online free','epoch to date converter browser','timestamp to human readable free','current unix time online','convert unix timestamp free'],
})

const faqs = [
  { question: "What is a Unix timestamp and why does everything use it?", answer: `A Unix timestamp is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC. It is used universally because it represents a specific moment in time as a single unambiguous number, regardless of timezone or calendar system. All major databases, programming languages, operating systems, and APIs store and transmit times as Unix timestamps. 1970 was chosen as a recent, round date when Unix was being designed. The timestamp 0 represents midnight UTC on January 1, 1970 — the Unix epoch.` },
  { question: "What is the difference between seconds and milliseconds timestamps?", answer: `The original Unix timestamp is in seconds. JavaScript's Date.now() returns milliseconds (1000× the second value). A seconds timestamp in 2026 is a 10-digit number around 1,740,000,000. A milliseconds timestamp is a 13-digit number around 1,740,000,000,000. If you paste a 13-digit number and get a date in 1970, you put a milliseconds timestamp into a seconds field — divide by 1000. If you get a date 50 years in the future, you put seconds into a milliseconds field — multiply by 1000.` },
  { question: "What will happen in 2038 to Unix timestamps stored as 32-bit integers?", answer: `The Unix timestamp stored in a 32-bit signed integer overflows on January 19, 2038, at 03:14:07 UTC — wrapping to a large negative number interpreted by most systems as a date in 1901. This is the Y2K38 problem. Modern 64-bit systems are not affected — a 64-bit timestamp can represent dates 292 billion years in the future. The risk is legacy embedded systems, older databases with 32-bit timestamp columns (MySQL's TIMESTAMP type had this issue before 8.0.28), and code that explicitly casts to 32-bit integers.` },
  { question: "How do I convert a timestamp in a different timezone?", answer: `Unix timestamps are always UTC — they have no timezone. Timezone only comes into play when converting to a human-readable date for display. This tool shows both UTC and your local browser timezone. If you need a specific third timezone: add or subtract the UTC offset. JST (Japan Standard Time) is UTC+9, so a UTC timestamp at 10:00 UTC is 19:00 JST. The Timezone Converter on this site handles these calculations and shows a timestamp's equivalent time in multiple zones simultaneously.` },
  { question: "What is ISO 8601 and how is it different from a Unix timestamp?", answer: `ISO 8601 represents dates as human-readable strings: 2026-04-15T14:30:00Z (Z = UTC). Unlike Unix timestamps (a plain integer), ISO 8601 strings are readable, timezone-aware, and sort alphabetically in chronological order. Most APIs that deal with international users prefer ISO 8601 for response bodies while using Unix timestamps internally for storage and arithmetic. JavaScript's Date.toISOString() produces ISO 8601 format.` },
  { question: "How do I calculate the time difference between two timestamps?", answer: `Subtract the earlier timestamp from the later one. The result is a duration in seconds. To convert: divide by 60 for minutes, 3600 for hours, 86400 for days. Example: timestamp 1,700,000,000 minus 1,699,913,600 = 86,400 seconds = exactly 1 day. For complex duration math involving months or daylight saving transitions, use a date library rather than raw arithmetic — months have different lengths and DST transitions add or remove 1 hour.` },
  { question: "What other time and date tools are on this site?", answer: `The Epoch Converter shows millisecond-precision timestamps with UTC, local, and ISO 8601 formats simultaneously — ideal for JavaScript debugging. The Timezone Converter handles multi-timezone comparisons. The Cron Expression Generator builds scheduled task schedules and previews the next 5 execution times. The JSON Formatter and JSONPath Tester help extract timestamp fields from API response payloads. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Unix Timestamp Converter — Epoch to Date & Time Free',
    description: 'Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, UTC and local time. Runs entirely in your browser.',
    slug: 'unix-timestamp',
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
