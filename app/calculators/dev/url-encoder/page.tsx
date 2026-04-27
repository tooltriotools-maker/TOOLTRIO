import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'URL Encoder & Decoder — Percent Encoding Free Online',
  description: 'Encode and decode URLs with percent encoding. Handles query strings, path segments, and full URLs. Distinguishes encodeURI vs encodeURIComponent. Runs in your browser.',
  slug: 'url-encoder',
  keywords: ['url encoder decoder online free','percent encode url browser','url encode special characters','urlencode javascript online','decode percent encoded url free','url percent encoding tool','encodeURIComponent online free'],
})

const faqs = [
  { question: "What characters need to be percent-encoded in a URL?", answer: `URLs can only contain letters (A-Z, a-z), digits (0-9), and a few special characters (-, _, ., ~). All other characters must be percent-encoded as %XX where XX is the hexadecimal byte value. Common encodings: space = %20, & = %26, = = %3D, + = %2B, / = %2F, ? = %3F, # = %23, @ = %40. Non-ASCII characters (accented letters, Chinese characters, emoji) are first encoded as UTF-8 bytes, then each byte is percent-encoded. The Japanese character 東 becomes %E6%9D%B1 (three bytes encoded).` },
  { question: "What is the difference between encodeURI and encodeURIComponent in JavaScript?", answer: `encodeURI encodes a complete URL and preserves characters with URL-structural meaning: /, :, ?, #, &, =, +, @. Use for encoding a full URL like https://example.com/path?q=hello world (only the space becomes %20). encodeURIComponent encodes a URL component (a query parameter value or path segment) and encodes ALL special characters including /, ?, #, &, and =. Use for individual parameter values: encodeURIComponent('hello & world') = 'hello%20%26%20world'. The common mistake: using encodeURI on a query parameter value — the & and = are left unencoded, breaking URL structure.` },
  { question: "Why does a space sometimes encode as + and sometimes as %20?", answer: `Both represent a space, but in different contexts. %20 is the standard percent-encoding for a space in any URL component per RFC 3986. The + sign as a space comes from the application/x-www-form-urlencoded format (HTML form submissions) — only valid in query strings, not path segments. Most servers and query string parsers accept both. For new code: use %20 in programmatically constructed URLs (unambiguous). encodeURIComponent() in JavaScript produces %20 — the correct choice.` },
  { question: "How do I encode a URL that contains another URL as a query parameter?", answer: `The inner URL must be fully encoded as a component — every character with URL meaning (/, ?, #, &, =, :) must be percent-encoded so the outer URL parser does not interpret them. Example: the redirect URL parameter in OAuth: https://auth.example.com/login?redirect=https%3A%2F%2Fapp.example.com%2Fcallback%3Fstate%3Dabc. In JavaScript: const redirectUrl = encodeURIComponent('https://app.example.com/callback?state=abc'). Using encodeURI on the inner URL instead leaves :, /, ?, and = unencoded, breaking the outer URL's query string parsing.` },
  { question: "What characters are safe in a URL path segment without encoding?", answer: `Unreserved characters are always safe: A-Z, a-z, 0-9, -, _, ., ~. Sub-delimiters often safe in path segments: !, $, &, ', (, ), *, +, ,, ;, =. The @ character is safe in path segments. The / character delimits path segments — encode as %2F if it appears within a segment. For SEO-friendly URLs: use only lowercase a-z, 0-9, and hyphens. Hyphens are preferred over underscores because Google treats hyphens as word separators in slugs.` },
  { question: "How do I decode a mangled URL that has been double-encoded?", answer: `Double-encoding happens when a URL is encoded twice: space → %20 → %2520 (the % gets encoded to %25). Decoded once: %2520 gives %20 (literal percent-twenty). Decoded twice: you get the space. This tool decodes one layer at a time. If the decoded output still contains %XX sequences, paste it back and decode again. To prevent double-encoding in code: encode once at the point of string construction, never encode an already-encoded string, and store URLs in decoded form internally.` },
  { question: "What other encoding tools complement the URL encoder?", answer: `The Base64 Encoder handles base64-encoding often used for OAuth tokens and Basic Auth credentials in URLs. The HTML Encoder handles escaping < > & characters for HTML attribute contexts. The JWT Decoder is useful when a URL contains a JWT as a query parameter (JWTs use Base64URL encoding). All are in the Dev Tools Encoders section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'URL Encoder & Decoder — Percent Encoding Free Online',
    description: 'Encode and decode URLs with percent encoding. Handles query strings, path segments, and full URLs. Distinguishes encodeURI vs encodeURIComponent. Runs in your browser.',
    slug: 'url-encoder',
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
