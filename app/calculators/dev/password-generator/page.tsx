import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Password Generator — Cryptographically Secure, Free',
  description: 'Generate strong random passwords with configurable length and character sets. Uses crypto.getRandomValues() for true cryptographic randomness. Runs in your browser.',
  slug: 'password-generator',
  keywords: ['password generator online free','secure random password browser','strong password maker free','cryptographically secure password generator','generate password no tracking','random password 20 characters free','password generator no signup no server'],
})

const faqs = [
  { question: "Is this generator actually cryptographically secure?", answer: `Yes. This tool uses window.crypto.getRandomValues() — the browser's cryptographically secure pseudorandom number generator (CSPRNG), which draws entropy from the operating system's random number source (equivalent to /dev/urandom on Linux). This is fundamentally different from Math.random(), which is a deterministic pseudorandom generator unsuitable for security. The same API powers TLS session key generation in your browser.` },
  { question: "How long should a password be for different use cases?", answer: `Personal account passwords stored in a password manager: 20+ characters with mixed character sets. At 20 characters from a 94-character set, brute-force at 100 billion attempts per second would take longer than the age of the universe. API keys and secrets: 32-64 characters of URL-safe characters. Database passwords: 20+ characters. Wi-Fi passwords typed manually: 12-16 characters with mixed case and digits only — symbols cause issues on some devices.` },
  { question: "Should I include symbols in generated passwords?", answer: `Symbols significantly increase entropy: a 16-character password from a 94-character set (with symbols) has 94^16 combinations vs 62^16 without — about 200x more. Include symbols when: the password is stored in a password manager (you never type it). Avoid symbols when: the password will be typed frequently, the system restricts certain symbols, or the password goes into a URL or command-line argument where symbols need escaping.` },
  { question: "What makes a password weak even if it is long?", answer: `Length alone is insufficient if the character space is small. A 30-character lowercase-only password has 26^30 combinations — sounds large, but an attacker who knows you used only lowercase letters has a dramatically reduced search space. Dictionary words, keyboard walks (qwerty123), and patterns (Password1!) are weak regardless of length because they appear in breach dictionaries. The strongest passwords are long, use the full character set, and are genuinely random.` },
  { question: "Why is the generated password different every time I click generate?", answer: `Each click calls crypto.getRandomValues() with a fresh request for random bytes from the OS entropy pool. The OS gathers entropy from hardware events — mouse movements, keyboard timing, network packet timing, CPU temperature variations. Each call produces an independent, unpredictable sequence. If the same password appeared repeatedly, that would indicate a broken random source — a serious security flaw.` },
  { question: "What is the difference between a password and an API key?", answer: `Functionally similar — both are random strings for authentication. The differences are practical: passwords are typed by humans, so readability matters somewhat. API keys are read by code, so they can be longer, use any characters, and should never be memorized. For API secrets: use 32-64 characters of cryptographic randomness. Never use a memorized password as an API key — treat them as separate credentials with different requirements.` },
  { question: "What security tools pair well with the password generator?", answer: `The Hash Generator produces SHA-256 or SHA-512 hashes of generated secrets for storage. The Base64 Encoder converts generated secrets for HTTP headers or JWTs. The JWT Decoder helps inspect authentication tokens that use your generated secret as the signing key. The RSA Key Inspector analyzes asymmetric key pairs that complement symmetric secrets. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Password Generator — Cryptographically Secure, Free',
    description: 'Generate strong random passwords with configurable length and character sets. Uses crypto.getRandomValues() for true cryptographic randomness. Runs in your browser.',
    slug: 'password-generator',
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
