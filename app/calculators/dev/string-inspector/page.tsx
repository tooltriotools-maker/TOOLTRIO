import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'String Inspector — Character Analysis and Code Points Free',
  description: 'Inspect strings character by character. Shows Unicode code points, UTF-8 byte sequences, ASCII codes, and string statistics. Runs in your browser.',
  slug: 'string-inspector',
  keywords: ['string inspector online free','string analyzer browser','string length byte count tool','unicode code points viewer','string character details free'],
})

const faqs = [
  { question: "What information does the string inspector show for each character?", answer: `For each character in the input, this tool shows: the character itself, its Unicode code point (U+XXXX notation), the character name (from the Unicode database), the UTF-8 byte sequence (how many bytes this character occupies in UTF-8), the UTF-16 code unit(s), the decimal ASCII value (for ASCII characters), and the character category (letter, digit, punctuation, symbol, whitespace, control). This is invaluable for debugging encoding issues, invisible characters, and unexpected whitespace that causes string comparison failures.` },
  { question: "Why does JavaScript report different string lengths for emoji?", answer: `JavaScript strings use UTF-16 internally. Characters in the Basic Multilingual Plane (U+0000 to U+FFFF) use one UTF-16 code unit — string.length counts 1. Characters above U+FFFF (most emoji: rocket U+1F680, face U+1F600) use two UTF-16 code units (a surrogate pair) — string.length counts 2. So '🚀'.length === 2 in JavaScript, not 1. For accurate character counting: use Array.from(str).length or [...str].length which counts Unicode code points rather than UTF-16 code units. Some combined emoji (family, skin tone variations) consist of multiple code points joined by ZWJ (Zero Width Joiner) and count even higher.` },
  { question: "How do I find invisible characters causing string comparison failures?", answer: `Common invisible characters that cause === comparisons to fail despite strings looking identical: U+200B (Zero Width Space), U+00A0 (Non-Breaking Space — looks like a space but is different), U+FEFF (BOM — Byte Order Mark, often at start of files), U+200D (Zero Width Joiner — used in emoji sequences), U+200C (Zero Width Non-Joiner). Paste your string into this inspector and examine each position — invisible characters show their code point even though they display as blank. Removal: str.replace(/[\\u200B\\u00A0\\uFEFF]/g, '') or more broadly str.replace(/[^\\x20-\\x7E]/g, '') for ASCII-only cleanup.` },
  { question: "What is the difference between Unicode code points and UTF-8 encoding?", answer: `A Unicode code point is a number identifying a character (U+0041 = Latin letter A, U+1F680 = Rocket). It is abstract — not yet stored bytes. UTF-8 is an encoding scheme that converts code points to actual bytes for storage and transmission. ASCII characters (U+0000 to U+007F) use 1 byte in UTF-8. Latin extended, Greek, Cyrillic (U+0080 to U+07FF) use 2 bytes. Most East Asian characters (U+0800 to U+FFFF) use 3 bytes. Emoji and less common symbols (U+10000+) use 4 bytes. The string inspector shows both the code point (abstract) and UTF-8 bytes (concrete storage representation).` },
  { question: "What are control characters and why do they appear in strings?", answer: `Control characters are non-printable characters in the ASCII range 0-31 and 127. Common ones: 0 = NUL (C string terminator), 7 = BEL (terminal bell), 8 = BS (backspace), 9 = TAB (horizontal tab), 10 = LF (line feed / Unix newline), 13 = CR (carriage return / Windows CRLF pair), 27 = ESC (terminal escape sequences). They appear in strings from: copy-pasting from terminal output (ANSI escape codes), reading files with mixed line endings (CRLF showing \\r at end of lines in Unix), data from legacy systems, and user input from certain mobile keyboards.` },
  { question: "How do I detect and remove all whitespace-like characters?", answer: `Standard whitespace: \\s in regex matches space (0x20), tab (0x09), newline (0x0A), carriage return (0x0D), form feed (0x0C), vertical tab (0x0B). Unicode whitespace (not matched by \\s by default): U+00A0 non-breaking space, U+2002-U+200A various width spaces, U+2028 line separator, U+2029 paragraph separator, U+3000 ideographic space. For comprehensive removal: use Unicode-aware regex with the \\p{Z} property in languages that support it (Python, Java, PCRE), or explicitly list the code points to remove. The Regex Tester on this site can test whitespace detection patterns.` },
  { question: "What other text and encoding tools are on this site?", answer: `The Character Encoder looks up entity references and encoding values for specific characters. The Binary to Text Converter shows the binary representation of text. The HTML Encoder escapes characters for safe HTML insertion. The Regex Tester finds specific Unicode characters or character ranges in text. The Duplicate Remover and Line Sorter work with text that has been cleaned using the inspector's findings. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'String Inspector — Character Analysis and Code Points Free',
    description: 'Inspect strings character by character. Shows Unicode code points, UTF-8 byte sequences, ASCII codes, and string statistics. Runs in your browser.',
    slug: 'string-inspector',
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
