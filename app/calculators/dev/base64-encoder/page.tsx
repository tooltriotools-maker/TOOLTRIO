import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Base64 Encoder & Decoder — Free, Runs in Browser',
  description: 'Encode and decode Base64 strings instantly. Handles text, URLs, and binary data. Runs entirely in your browser — nothing is sent to any server.',
  slug: 'base64-encoder',
  keywords: ['base64 encoder decoder online free','encode decode base64 browser','base64url encoder free','image to base64 converter','file to base64 online','base64 encode string browser','jwt base64 decoder free','base64 no server upload'],
})

const faqs = [
  { question: "What is Base64 actually used for in web development?", answer: `Base64 appears constantly in web development: HTTP Basic Authentication sends credentials as Base64 of 'username:password' in the Authorization header — decode any 'Authorization: Basic ...' header and you find the credentials in plain text. JWTs are three Base64URL-encoded sections separated by dots. Data URIs embed images directly in CSS or HTML as base64-encoded strings. Email attachments are Base64-encoded when sent over SMTP. OAuth tokens and webhook signatures are frequently Base64-encoded.` },
  { question: "What is the difference between Base64 and Base64URL?", answer: `Standard Base64 uses characters A-Z, a-z, 0-9, +, and /. The + and / characters are not URL-safe. Base64URL replaces + with - and / with _ to produce output safe for URLs without percent-encoding. JWTs always use Base64URL for this reason. When decoding a JWT header or payload manually, use Base64URL decoding. This tool auto-detects: if the input contains - or _ characters, it applies Base64URL decoding.` },
  { question: "Does Base64 encoding make data secure?", answer: `No — Base64 is encoding, not encryption. It is trivially reversible. If you see 'Authorization: Basic dXNlcjpwYXNzd29yZA==' in an HTTP header, decoding it gives 'user:password' instantly. Base64 exists to safely transmit binary data over text-based protocols, not to protect sensitive data. For protection, use proper encryption: AES-256-GCM for symmetric, RSA or ECDH for asymmetric.` },
  { question: "Why does Base64 output sometimes end with = or ==?", answer: `Base64 encodes 3 bytes into 4 characters. When input length is not a multiple of 3, padding characters (=) are added. One = means the last group had 2 bytes; == means it had 1 byte. Some Base64 variants omit padding (JWTs do this). If a Base64 string without padding fails to decode, try adding = or == to the end. This decoder handles both padded and unpadded input automatically.` },
  { question: "How do I decode a JWT token payload using Base64?", answer: `A JWT looks like xxxxx.yyyyy.zzzzz. Take the middle section (between the first and second dots), paste it here, and decode. The result is a JSON object with the token's claims. Note: JWT uses Base64URL encoding (- instead of + and _ instead of /) and usually omits = padding — this tool handles both. For a dedicated JWT experience showing automatic claim parsing and expiration display, use the JWT Decoder tool on this site.` },
  { question: "Can I use this to encode images for data URIs in CSS?", answer: `Yes, though for image files specifically the Image to Base64 tool is more convenient — it accepts a file upload and produces the complete data:image/png;base64,... URI ready to paste into CSS. For text or arbitrary data, this encoder handles it. Data URIs are useful for small icons under 5KB. Larger images should remain as separate files — a 100KB image as a data URI adds 133KB to your HTML/CSS due to the ~33% size increase from Base64 encoding.` },
  { question: "What other encoding tools are on this site?", answer: `The URL Encoder handles percent-encoding for query strings. The HTML Encoder handles character entity escaping for HTML contexts. The Binary to Text Converter converts characters to 0s and 1s. The Base Converter converts between decimal, hex, octal, and binary number systems. The Image to Base64 tool converts image files to data URIs. All are in the Dev Tools Encoders section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Base64 Encoder & Decoder — Free, Runs in Browser',
    description: 'Encode and decode Base64 strings instantly. Handles text, URLs, and binary data. Runs entirely in your browser — nothing is sent to any server.',
    slug: 'base64-encoder',
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
