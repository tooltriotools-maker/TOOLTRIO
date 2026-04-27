import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTML Encoder — Escape HTML Entities Free Online',
  description: 'Escape HTML special characters to entities and unescape back. Prevents XSS by converting < > & and quotes. Runs in your browser.',
  slug: 'html-encoder',
  keywords: ['html encoder decoder online free','html entity encoder browser','html special characters encoder','html escape tool online','convert html entities free','&amp; &lt; &gt; encoder free'],
})


const faqs = [
  { question: 'Which characters must be encoded in HTML?', answer: `Five characters have special meaning in HTML and must be escaped: < (becomes &lt;) to prevent browsers from interpreting it as a tag opening. > (becomes &gt;) closes tags. & (becomes &amp;) starts entities — an unescaped & that is not part of a valid entity may cause rendering issues. " (becomes &quot;) inside attribute values wrapped in double quotes. ' (becomes &#39; or &apos;) inside attribute values wrapped in single quotes. In practice, always escape all five when inserting user-generated content into HTML. Only < and & are strictly required in HTML body content, but escaping all five is safer.` },
  { question: 'How does HTML encoding prevent XSS (Cross-Site Scripting) attacks?', answer: "XSS attacks inject malicious JavaScript into a page by inserting HTML that the browser executes. If a user submits <script>alert('hacked')</script> as their name and you display it unescaped, the browser executes the script. After HTML encoding, the same input displays as &lt;script&gt;alert(&#39;hacked&#39;)&lt;/script&gt; — the browser shows it as literal text without executing anything. This encoding must happen at the point of rendering, not at the point of storage. Store the raw input; encode when displaying. Context matters: HTML encoding is correct for HTML body; URL encoding is needed for href attributes; JavaScript encoding for inline JS." },
  { question: 'What is the difference between named and numeric HTML entities?', answer: `Named entities use a descriptive name: &amp; &lt; &copy; &euro; &mdash;. Numeric entities use the Unicode code point in decimal (&#8212; for em dash) or hexadecimal (&#x2014; for em dash). Named entities are only available for characters that have been given names in the HTML specification — common symbols are named, but most Unicode characters are not. Numeric entities work for any Unicode character. For the required < > & " characters, use the named entities (&lt; &gt; &amp; &quot;) for readability. For obscure symbols, use numeric entities.` },
  { question: 'When should I use &nbsp; (non-breaking space)?', answer: `&nbsp; (non-breaking space, character U+00A0) prevents a line break between two words: "50&nbsp;kg" ensures 50 and kg always appear on the same line. Use it for: unit values (50 kg, 25 mph), titles with initials (J.&nbsp;K.&nbsp;Rowling), phone numbers with country code (+1&nbsp;555), and any pair of words that should never be separated at a line break. Do not use &nbsp; for visual spacing — use CSS margin, padding, or a proper layout system. Consecutive &nbsp; entities for indentation is an anti-pattern that breaks accessibility and is unmaintainable.` },
  { question: 'Should I encode HTML entities in JavaScript strings?', answer: "HTML entities are parsed by the HTML parser — they have no meaning in JavaScript context. If you are building an HTML string in JavaScript (template literals, innerHTML), encode the HTML characters. If you are setting textContent instead of innerHTML, the browser automatically treats the value as plain text and no encoding is needed: element.textContent = userInput is always XSS-safe. element.innerHTML = userInput is dangerous unless userInput is HTML-encoded. For React and most modern frameworks, JSX automatically escapes values in JSX expressions — {userInput} is safe, dangerouslySetInnerHTML is not." },
  { question: 'What is the HTML character encoding declaration and is it still needed?', answer: "The <meta charset='UTF-8'> tag in the HTML <head> tells the browser which character encoding to use. Without it, the browser may guess wrong — older browsers defaulted to Latin-1 (ISO-8859-1), which causes mojibake (garbled text) for non-ASCII characters. Always include <meta charset='UTF-8'> as the first element in <head> (before any content, especially before any content that might reference external resources). In UTF-8 HTML5, you can safely use actual Unicode characters directly (é, ü, 中文, 🚀) without encoding them as entities." },
  { question: 'What other encoding tools are on this site?', answer: "The URL Encoder handles percent-encoding for URL-safe transmission. The Base64 Encoder encodes binary data for HTTP and data URIs. The Character Encoder looks up Unicode code points and entity references for any character. The HTML Entity Reference tool is a searchable complete list of all named HTML entities. The HTML Validator checks that your HTML is structurally correct after encoding. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTML Encoder — Escape HTML Entities Free Online',
    description: 'Escape HTML special characters to entities and unescape back. Prevents XSS by converting < > & and quotes. Runs in your browser.',
    slug: 'html-encoder',
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
