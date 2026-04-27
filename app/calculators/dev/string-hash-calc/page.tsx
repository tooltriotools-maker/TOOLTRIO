import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'String Hash Calculator — Hash Text with Multiple Algorithms Free',
  description: 'Calculate MD5, SHA-1, SHA-256, SHA-512, and other hashes from text input. Compare strings using hash equality. Runs entirely in your browser.',
  slug: 'string-hash-calc',
  keywords: ['string hash calculator online free','md5 hash string browser','sha256 of string free','compute hash value online','hash function calculator','string to md5 sha1 sha256 free'],
})

const faqs = [
  { question: "What is the difference between this and the Hash Generator?", answer: `The Hash Generator on this site is a general-purpose hashing tool focused on MD5, SHA-256, and SHA-512 with file support. The String Hash Calculator focuses specifically on text input with multiple algorithm comparisons — useful when you need to verify the same string hashes to the same value across multiple algorithms simultaneously, or when you want to test which algorithm produces the shortest or longest output for your use case. Both tools run client-side with no data transmission.` },
  { question: "What hashing algorithms are available and which should I choose?", answer: `MD5 (128-bit, 32 hex chars): fast, broken cryptographically — use only for non-security checksums. SHA-1 (160-bit, 40 hex chars): deprecated, collision attacks known — avoid for new work. SHA-256 (256-bit, 64 hex chars): the modern standard for digital signatures, data integrity, and most cryptographic uses. SHA-512 (512-bit, 128 hex chars): higher security margin, faster on 64-bit systems for large inputs. SHA-3/Keccak: alternative design to SHA-2 family, used in Ethereum. CRC32: not cryptographic — fast checksum for file integrity in non-adversarial contexts only.` },
  { question: "Why does hashing the same string always produce the same result?", answer: `Hash functions are deterministic by design — same input always produces same output. This determinism is their primary utility: compute the hash of known-good data, store it, then later hash the received data and compare. If hashes match, the data is identical. This is used for: password verification (hash password at registration, hash login attempt and compare), file integrity checks (hash a file before and after transfer), deduplication (hash file content to find duplicates without comparing byte-by-byte), and digital signatures (hash the message, then sign the hash).` },
  { question: "How does a salt prevent rainbow table attacks on password hashes?", answer: `A rainbow table is a precomputed lookup table mapping common passwords to their hashes. Without a salt, two users with the same password have the same hash — one lookup reveals both. A salt is a random value prepended or appended to the password before hashing: hash = SHA256(salt + password). Each user gets a unique random salt stored alongside the hash. Now rainbow tables are useless — they would need to be regenerated for every possible salt. Even with salt, use a slow algorithm (bcrypt, scrypt, Argon2id) not SHA-256 — the salt prevents precomputation but not GPU brute-force.` },
  { question: "What is the avalanche effect in hash functions?", answer: `The avalanche effect means a small change in input produces a drastically different output — changing one bit causes approximately half the output bits to flip. 'hello' and 'Hello' have completely different SHA-256 hashes despite differing by only one bit (capitalization). This property is essential for cryptographic security: if similar inputs produced similar outputs, an attacker could learn information about the input from the hash. Good hash functions (SHA-256, SHA-3) have a near-perfect avalanche effect. Poor non-cryptographic hashes (djb2, FNV) have weaker avalanche and should never be used for security.` },
  { question: "What is HMAC and how is it different from a plain hash?", answer: `HMAC (Hash-based Message Authentication Code) = hash(key XOR opad || hash(key XOR ipad || message)). A plain hash is reproducible by anyone who knows the input. HMAC requires a secret key — only someone with the key can produce or verify the MAC. Uses: signing webhook payloads (GitHub, Stripe compute HMAC-SHA256 of the payload and include it in a header — you verify by computing the same HMAC with your secret), JWT HS256 tokens, API request signing (AWS Signature Version 4 uses HMAC-SHA256 in a chain).` },
  { question: "What other security tools are on this site?", answer: `The Hash Generator handles file hashing and the most common MD5/SHA-256/SHA-512 cases. The Password Generator creates cryptographically secure random secrets. The JWT Decoder inspects tokens that use HMAC or RSA signatures. The RSA Key Inspector analyzes asymmetric keys used in digital signatures. The Base64 Encoder encodes binary hash output for transmission in HTTP headers. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'String Hash Calculator — Hash Text with Multiple Algorithms Free',
    description: 'Calculate MD5, SHA-1, SHA-256, SHA-512, and other hashes from text input. Compare strings using hash equality. Runs entirely in your browser.',
    slug: 'string-hash-calc',
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
