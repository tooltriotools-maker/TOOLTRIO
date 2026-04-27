import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Hash Generator — MD5, SHA-256, SHA-512 Free Online',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input. Uses the Web Crypto API. Runs entirely in your browser — your input is never transmitted.',
  slug: 'hash-generator',
  keywords: ['hash generator online free','md5 sha256 hash browser','sha512 hash calculator online','string hash tool free','generate hash from text','checksum generator online','hash any string browser'],
})

const faqs = [
  { question: "Which hash algorithm should I use?", answer: `For any security-sensitive application: SHA-256 or SHA-512. MD5 and SHA-1 are cryptographically broken — collision attacks have been demonstrated against both (MD5 collisions in seconds on modern hardware, SHA-1 in 2017 with SHAttered). Use MD5 only for non-security checksums where speed matters and collision resistance is not required. For modern security uses — password hashing foundation, digital signatures, data integrity — SHA-256 minimum.` },
  { question: "Is this suitable for hashing passwords for database storage?", answer: `No — SHA-256 and SHA-512 are too fast for password storage. A modern GPU computes billions of SHA-256 hashes per second, making brute-force attacks against leaked hash databases practical. Passwords must be hashed with a slow, memory-hard algorithm: bcrypt (cost factor 12+), scrypt, Argon2id, or PBKDF2 with 600,000+ iterations. These are intentionally slow. Use this Hash Generator for checksums, HMAC signing, data deduplication, and API request verification — not for storing user passwords.` },
  { question: "What is the practical difference between SHA-256 and SHA-512?", answer: `SHA-256: 256-bit output (64 hex characters). SHA-512: 512-bit output (128 hex characters). SHA-512 provides higher theoretical security margin but is practically overkill — no known attack against either is feasible. SHA-512 can be faster on 64-bit CPUs for large inputs because it operates on 64-bit words internally. SHA-256 is the de facto standard (used by TLS certificates, Git, Bitcoin, and most modern systems). Use SHA-512 when specifically required or for maximum long-term archival margin.` },
  { question: "What is an HMAC and how is it different from a plain hash?", answer: `A plain hash (SHA-256 of 'hello') is reproducible by anyone who knows the input. An HMAC mixes a secret key into the hash: HMAC = hash(key XOR opad || hash(key XOR ipad || message)). Only someone with the key can produce or verify it. HMACs are used for: signing API requests (AWS Signature Version 4 uses HMAC-SHA256), verifying webhook payloads (GitHub, Stripe include HMAC-SHA256 signatures), and JWT HS256 tokens.` },
  { question: "How do I verify a file checksum?", answer: `Generate the hash of your downloaded file using the same algorithm listed on the download page (usually MD5 or SHA-256). Compare to the published checksum character by character. If they match, the file arrived intact. If they differ, the file was corrupted in transit or tampered with. For large binary files, the terminal is faster: sha256sum filename on Linux/Mac, certutil -hashfile filename SHA256 on Windows.` },
  { question: "Why does the same input always produce the same hash output?", answer: `Hash functions are deterministic by design. This determinism is their primary utility: compute a hash of known-good data, store it, later hash the received data and compare. If hashes match, the data is identical. This is also why password storage requires salting: without a unique random salt per user, two users with the same password have the same hash, enabling precomputed rainbow table attacks against both simultaneously.` },
  { question: "What other tools work alongside the Hash Generator?", answer: `The Password Generator creates strong random secrets that are often used as HMAC keys. The Base64 Encoder converts binary hash output to Base64 strings for HTTP headers — many API signature schemes transmit HMAC-SHA256 results as Base64. The JWT Decoder shows the algorithm used in a JWT header (often HS256 = HMAC-SHA256). The String Hash Calculator provides additional algorithms and comparison features. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Hash Generator — MD5, SHA-256, SHA-512 Free Online',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input. Uses the Web Crypto API. Runs entirely in your browser — your input is never transmitted.',
    slug: 'hash-generator',
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
