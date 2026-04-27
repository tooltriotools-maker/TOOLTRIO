import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Epoch Converter — Millisecond Timestamps, UTC & ISO 8601 Free',
  description: 'Convert Unix epoch timestamps with millisecond precision. Shows UTC, local time, and ISO 8601 simultaneously. Ideal for JavaScript debugging. Runs in your browser.',
  slug: 'epoch-converter',
  keywords: ['epoch converter online free','unix epoch to date browser','millisecond timestamp converter','epoch time calculator free','date to timestamp online'],
})

const faqs = [
  { question: 'Why does JavaScript use milliseconds instead of seconds for timestamps?', answer: "JavaScript's Date.now() returns milliseconds since the Unix epoch — a design choice for animation and UI precision. The downside is constant confusion when interfacing with Unix system timestamps (seconds), database TIMESTAMP columns (seconds), or REST APIs (usually seconds). The quick rule: 10-digit timestamp = seconds. 13-digit timestamp = milliseconds. If you divide a 13-digit value by 1000, you get the seconds version. Forgetting this conversion when constructing a JavaScript Date from a server timestamp is one of the most common datetime bugs in web development." },
  { question: 'What is the difference between this Epoch Converter and the Unix Timestamp tool?', answer: "Both convert timestamps to human-readable dates, but differently. The Unix Timestamp tool handles seconds-precision from system logs and databases — clean and simple. The Epoch Converter adds millisecond precision, shows UTC and local time side by side, and outputs ISO 8601 format. Use Unix Timestamp for Linux log files and PostgreSQL timestamps. Use this Epoch Converter when debugging JavaScript applications where Date.now() is your primary timestamp source." },
  { question: 'What is ISO 8601 and why is it the standard for APIs?', answer: "ISO 8601 represents dates as 2026-04-15T14:30:00.000Z. The T separates date and time; Z means UTC. Advantages: unambiguous (unlike 04/05/2026), sorts correctly as a string, includes timezone info, and is human-readable. JavaScript's JSON.stringify() automatically serializes Date objects to ISO 8601. When designing an API, always output ISO 8601 — it is the universal API date format." },
  { question: 'How do I convert between a JavaScript Date and a Unix timestamp?', answer: "Date to seconds: Math.floor(Date.now() / 1000). Date to milliseconds: Date.now(). Seconds to Date: new Date(timestamp * 1000) — the *1000 is critical. Milliseconds to Date: new Date(timestampMs). The most common bug: forgetting *1000 when constructing Date from a seconds value, making JavaScript interpret 1,700,000,000 as milliseconds and producing a date in January 1970." },
  { question: 'What does Z mean at the end of an ISO 8601 timestamp?', answer: "Z stands for Zulu time — NATO phonetic alphabet for zero UTC offset. 2026-04-15T14:30:00Z is exactly 14:30 UTC. A timestamp with +05:30 offset is in IST (India Standard Time). Always store timestamps as UTC (Z suffix) and convert to local time only for display. Storing in local time causes bugs during DST transitions and makes timezone-aware database queries unreliable." },
  { question: 'How do I measure JavaScript execution time accurately?', answer: "Use performance.now() rather than Date.now() for measuring code duration — it has sub-millisecond precision and is unaffected by system clock adjustments. const start = performance.now(); heavyOperation(); const ms = performance.now() - start. Use Date.now() for absolute timestamps (recording when something happened). For Node.js, process.hrtime.bigint() provides nanosecond precision." },
  { question: 'What other time and date tools are on this site?', answer: "The Unix Timestamp tool handles seconds-precision system timestamps. The Timezone Converter shows one UTC time in multiple local zones simultaneously — ideal for scheduling across regions. The Cron Expression Generator builds scheduled task schedules and previews the next 5 execution times. The JSON Formatter helps extract timestamp fields from API responses. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Epoch Converter — Millisecond Timestamps, UTC & ISO 8601 Free',
    description: 'Convert Unix epoch timestamps with millisecond precision. Shows UTC, local time, and ISO 8601 simultaneously. Ideal for JavaScript debugging. Runs in your browser.',
    slug: 'epoch-converter',
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
