import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'RSA Key Inspector — Parse and Analyze RSA Keys Free',
  description: 'Inspect RSA public and private keys. Shows key size, exponent, modulus, and certificate information from PEM format. Runs entirely in your browser.',
  slug: 'rsa-key-info',
  keywords: ['rsa key info online free','rsa public key decoder browser','ssl certificate key parser free','rsa key bit length checker','pem key info tool online','analyze rsa private key free'],
})

const faqs = [
  { question: "What information can I extract from an RSA public key?", answer: `An RSA public key contains two values: the modulus (n) — a large number that is the product of two secret primes; and the public exponent (e) — almost always 65537 (0x10001). The key size (1024, 2048, 4096 bits) is determined by the bit length of the modulus. This tool parses PEM-format keys (the -----BEGIN PUBLIC KEY----- block) and displays: key size in bits, public exponent, modulus in hex, and algorithm (RSA, RSA-PSS). You cannot derive the private key from a public key — that is the foundation of RSA security.` },
  { question: "What RSA key size should I use in 2026?", answer: `NIST recommendation: 2048-bit minimum for general use, 3072-bit for data that must remain secure past 2030, 4096-bit for highest assurance. 1024-bit RSA is considered broken and must not be used — factoring attacks make it feasible to recover the private key. 2048-bit RSA provides approximately 112 bits of security (equivalent to AES-112). 4096-bit provides ~140 bits. For most applications: 2048-bit RSA or EC alternatives (ECDSA P-256, Ed25519) which provide equivalent security with much shorter keys and faster operations.` },
  { question: "What is the difference between RSA-PKCS1 and RSA-PSS?", answer: `RSA-PKCS1 v1.5 is the older signature scheme — still widely used but has known vulnerabilities (Bleichenbacher's attack, padding oracle attacks). RSA-PSS (Probabilistic Signature Scheme) is the modern replacement recommended by NIST — it is probabilistic (signing the same message twice gives different signatures) and provably secure under standard cryptographic assumptions. For new systems: always use RSA-PSS over PKCS1 v1.5. TLS 1.3 requires RSA-PSS. For encryption, RSA-OAEP over RSA-PKCS1 v1.5 for the same reasons.` },
  { question: "What is a PEM file and how do I read it?", answer: `PEM (Privacy Enhanced Mail) is a Base64-encoded format for cryptographic keys and certificates, wrapped in -----BEGIN TYPE----- and -----END TYPE----- headers. Common types: PRIVATE KEY (PKCS#8 unencrypted private key), RSA PRIVATE KEY (PKCS#1 format), PUBLIC KEY (PKCS#8 public key), CERTIFICATE (X.509 certificate), CERTIFICATE REQUEST (CSR). The content between the headers is Base64-encoded DER (Distinguished Encoding Rules) binary format. This tool parses the PEM, decodes the Base64, parses the DER structure, and displays the human-readable fields.` },
  { question: "How do I generate an RSA key pair on the command line?", answer: `OpenSSL: openssl genrsa -out private.pem 2048 generates a 2048-bit private key. openssl rsa -in private.pem -pubout -out public.pem extracts the public key. For PKCS#8 format (recommended): openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem. In Node.js: const { generateKeyPairSync } = require('crypto'); generateKeyPairSync('rsa', { modulusLength: 2048 }). In Python: from cryptography.hazmat.primitives.asymmetric import rsa; rsa.generate_private_key(public_exponent=65537, key_size=2048).` },
  { question: "Is it safe to paste private keys into this tool?", answer: `This tool runs entirely in your browser — no data is transmitted to any server. You can verify this by opening DevTools > Network while using the tool and observing zero outbound requests. That said, you should treat private key paste operations with caution regardless of the tool: ensure you are on the correct site URL, not a phishing imitation; consider using only the public key for inspection when private key details are not needed; and after inspection, ensure the private key is not left in browser history or clipboard longer than necessary.` },
  { question: "What other security and encoding tools are on this site?", answer: `The Hash Generator produces SHA-256 and other cryptographic hashes. The Password Generator creates cryptographically secure random strings for use as secrets. The JWT Decoder inspects tokens that are often signed with RSA keys. The Base64 Encoder decodes PEM file content manually. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'RSA Key Inspector — Parse and Analyze RSA Keys Free',
    description: 'Inspect RSA public and private keys. Shows key size, exponent, modulus, and certificate information from PEM format. Runs entirely in your browser.',
    slug: 'rsa-key-info',
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
