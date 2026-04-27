import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Regex Tester & Debugger — Live Match Highlighting Free',
  description: 'Test regular expressions with real-time match highlighting, capture group display, and flag toggles. Runs in your browser — no server, no login.',
  slug: 'regex-tester',
  keywords: ['regex tester online free','regular expression tester browser','javascript regex tester','python regex tester online','pcre regex tester free','live regex match highlighter','regex with named groups tester','regex flags tester browser'],
})

const faqs = [
  { question: "What regex flags does this tool support?", answer: `Five standard JavaScript flags: g (global — find all matches, not just the first), i (case insensitive — abc matches ABC), m (multiline — ^ and $ match line start/end), s (dotAll — makes . match newlines), u (unicode — proper Unicode support for emoji and international characters). Toggle flags with the buttons above the test string. Combining gi is the most common combination for case-insensitive find-all operations.` },
  { question: "What is the difference between a capture group and a non-capturing group?", answer: `A capture group (pattern) stores the matched text for reference in replacements or code extraction. A non-capturing group (?:pattern) groups for quantifier application without storing — faster and cleaner when you do not need the value. A named capture group (?<name>pattern) gives the group a label accessible as match.groups.name. Use non-capturing groups for grouping with | alternation: (?:cat|dog)s matches cats or dogs. Use capture groups when extracting the matched content.` },
  { question: "Why does my regex match too much — how do I make it less greedy?", answer: `Quantifiers *, +, and {n,} are greedy by default — they match as many characters as possible. On <b>Hello</b>, the pattern <.*> greedily matches the entire string from first < to last >. Adding ? makes it lazy: <.*?> matches only <b>, then </b> separately. Use lazy quantifiers when extracting content between delimiters like HTML tags, quoted strings, or parentheses where you want the shortest possible match.` },
  { question: "How do I write a regex to match an email address?", answer: `A practical pattern handling most real-world addresses: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$. This matches the local part, the @ symbol, the domain, a literal dot, and a TLD of 2+ letters. True RFC 5321 email validation via regex is extremely complex — most applications use this simplified pattern or validate by sending a confirmation email. Paste it into the tester above to verify against your sample addresses.` },
  { question: "What is the difference between ^ and $ with and without the multiline flag?", answer: `Without the m flag, ^ matches only the start of the entire string and $ matches only the end. With m enabled, ^ matches the start of each line (after a newline) and $ matches the end of each line (before a newline). This matters when matching patterns at the beginning of each line in a multiline input — for example, ^\\s+ with flag gm finds leading whitespace on every line.` },
  { question: "How do lookaheads and lookbehinds work?", answer: `A lookahead (?=pattern) asserts that what follows matches pattern without consuming those characters. \\d+(?= dollars) matches a number only if followed by ' dollars', but the matched text is just the number. Negative lookahead (?!pattern) matches only if what follows does NOT match. Lookbehinds check what precedes: (?<=\\$)\\d+ matches numbers preceded by a dollar sign. Use them to assert context without including it in the match.` },
  { question: "What tools pair well with the Regex Tester?", answer: `The Text Case Converter handles camelCase and snake_case transformations that often involve regex. The Duplicate Remover uses regex to identify repeated lines. The Diff Checker verifies that a regex-based replacement produced the expected result by comparing before and after. The Word Counter is useful after validating input format with regex. All are in the Dev Tools Text section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Regex Tester & Debugger — Live Match Highlighting Free',
    description: 'Test regular expressions with real-time match highlighting, capture group display, and flag toggles. Runs in your browser — no server, no login.',
    slug: 'regex-tester',
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
