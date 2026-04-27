import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'JSON Formatter & Validator — Free Online, Runs in Browser',
  description: 'Format, validate, minify, and pretty-print JSON instantly. Catches syntax errors with line numbers. No data sent to any server — runs 100% in your browser.',
  slug: 'json-formatter',
  keywords: ['json formatter online free','json beautifier','pretty print json','json validator online','json lint free','format json browser','json minifier online','json syntax checker','json prettify no install','json formatter with syntax highlighting','how to format json online free','json parser browser no login'],
})

const faqs = [
  { question: 'Why does my JSON fail validation even though it looks correct?', answer: 'The three most common JSON syntax errors are: (1) trailing commas — JSON does not allow a comma after the last item in an object or array, even though JavaScript does; (2) single quotes instead of double quotes — JSON requires double quotes around all keys and string values; (3) unquoted keys — unlike JavaScript object literals, JSON keys must always be quoted. The formatter shows the exact line and character position of the error, which is the fastest way to pinpoint which issue applies.' },
  { question: 'What is the difference between formatting and validating JSON?', answer: 'Formatting rearranges whitespace to make valid JSON human-readable — adding indentation and line breaks without changing the data. Validating checks whether the JSON syntax is correct per RFC 8259. You must validate first, then format. If the JSON has a syntax error, formatting is impossible — which is why this tool shows the error location rather than producing broken output.' },
  { question: 'When would I use minified output instead of formatted output?', answer: "Minified JSON removes all unnecessary whitespace for the smallest possible size. Use it when checking the byte size of an API response, when storing JSON in a database or cookie where size matters, or when embedding JSON in a JavaScript bundle. Formatted JSON is for human reading — debugging, code review, documentation. The formatted version of a small payload can be 5-10x larger than the minified version." },
  { question: 'Does this tool handle JSONC (JSON with Comments)?', answer: 'Standard JSON (RFC 8259) does not support comments. Pasting JSON with // or /* */ comments will fail validation — that is correct behavior. JSONC is used by VS Code config files and some TypeScript configs. To use JSONC here, strip comments first. The Regex Tester on this site can remove single-line comments with the pattern //.*$ before you paste into this formatter.' },
  { question: 'Can I format deeply nested JSON with large arrays?', answer: "No size limit is imposed — processing happens on your device using the browser JavaScript engine. Very large JSON files (multiple MB) may take a moment to render because the browser parses and re-serializes the entire structure. For gigabyte-scale JSON, use jq in your terminal: jq '.' file.json. For typical API response debugging, this tool handles even large response payloads without issues." },
  { question: 'Is this the same as JSON.stringify in JavaScript?', answer: "Yes, under the hood this uses JSON.parse() to validate and parse, then JSON.stringify(parsed, null, 2) for 2-space indentation or JSON.stringify(parsed, null, 4) for 4-space. The minified output uses JSON.stringify(parsed) with no third argument. The formatted output is exactly what those JavaScript functions produce — the tool is a visual interface around standard browser APIs." },
  { question: 'What other JSON tools work well alongside this formatter?', answer: 'After formatting, the JSONPath Tester is the natural next step if you need to extract a specific value from a nested structure. The JSON Schema Generator can auto-generate a validation schema from your sample JSON. The JSON to CSV tool flattens JSON arrays to spreadsheet format. The XML to JSON tool handles converting legacy XML APIs. All are in the Dev Tools section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'JSON Formatter & Validator — Free Online, Runs in Browser',
    description: 'Format, validate, minify, and pretty-print JSON instantly. Catches syntax errors with line numbers. No data sent to any server — runs 100% in your browser.',
    slug: 'json-formatter',
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
