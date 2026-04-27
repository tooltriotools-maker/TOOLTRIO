import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Number Formatter — Locale Number Display and Separators Free',
  description: 'Format numbers with locale-appropriate separators — US commas, European periods, Indian lakh system. Convert between locales. Runs entirely in your browser.',
  slug: 'number-formatter',
  keywords: ['number formatter online free','format numbers with commas browser','number to words converter','large number formatter free','locale number format tool'],
})

const faqs = [
  { question: "What is the difference between locale number formats?", answer: `Different locales use different characters for decimal and thousands separators. US/UK (en-US, en-GB): 1,234,567.89 — comma as thousands, period as decimal. Germany (de-DE): 1.234.567,89 — period as thousands, comma as decimal. France (fr-FR): 1 234 567,89 — space as thousands, comma as decimal. Switzerland (de-CH): 1'234'567.89 — apostrophe as thousands. India (en-IN): 12,34,567.89 — lakh system two-digit grouping after first three. This variation is why hardcoded formatting breaks for international users.` },
  { question: "How do I format numbers in JavaScript with correct locale separators?", answer: `Use the Intl.NumberFormat API: new Intl.NumberFormat('en-US').format(1234567.89) → '1,234,567.89'. new Intl.NumberFormat('de-DE').format(1234567.89) → '1.234.567,89'. For currency: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.56) → '$1,234.56'. For percentages: new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(0.1234) → '12.3%'. The Intl API handles all locale variations automatically — never manually build number strings with regex.` },
  { question: "How many decimal places should financial calculations use?", answer: `Never use floating-point arithmetic for the actual calculation — only for display. 0.1 + 0.2 equals 0.30000000000004 in IEEE 754. For financial computation: work in the smallest currency unit (cents as integers): 100 cents + 200 cents = 300 cents = $3.00. Libraries: decimal.js, bignumber.js, currency.js handle arbitrary precision. Currency display: 2 decimal places (USD, EUR), 0 (JPY), 3 (KWD). Never round in the middle of a calculation — round only at the final display step.` },
  { question: "What is the difference between toFixed() and Intl.NumberFormat?", answer: `(1234567.891).toFixed(2) returns '1234567.89' — no thousands separators, just decimal rounding. Intl.NumberFormat formats with locale-appropriate separators. toFixed() is for simple decimal truncation in non-display contexts. For anything shown to users: always use Intl.NumberFormat. Common mistake: using toFixed() then manually adding commas with regex — this breaks for non-US locales.` },
  { question: "How do I format very large numbers compactly?", answer: `Compact notation: new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(1234567) → '1.2M'. For 'long': '1.2 million'. For scientific: new Intl.NumberFormat('en-US', { notation: 'scientific' }).format(1234567) → '1.235E6'. The Intl compact notation handles internationalization automatically — 1.2 million in Japanese becomes 120万.` },
  { question: "What is the difference between significant figures and decimal places?", answer: `Decimal places: fixed digits after the decimal point — 3.14159 to 2 decimal places = 3.14. Significant figures: total meaningful digits — 3.14159 to 4 sig figs = 3.142. Significant figures matter in scientific contexts where measurement precision is meaningful. In financial and most web contexts, decimal places are the right concept. Use Intl.NumberFormat maximumFractionDigits for decimal place control. Significant figures require: parseFloat(number.toPrecision(sigFigs)).` },
  { question: "What other math and conversion tools are on this site?", answer: `The Base Converter handles number system conversions (decimal to hex, binary). The Bit and Byte Converter converts data storage units. The Bitwise Calculator performs integer operations. The CSS Unit Converter handles CSS-specific px, rem, em conversions. The Aspect Ratio Calculator derives missing dimensions. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Number Formatter — Locale Number Display and Separators Free',
    description: 'Format numbers with locale-appropriate separators — US commas, European periods, Indian lakh system. Convert between locales. Runs entirely in your browser.',
    slug: 'number-formatter',
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
