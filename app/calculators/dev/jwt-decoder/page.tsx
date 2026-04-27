import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'JWT Decoder — Decode and Inspect JSON Web Tokens Free',
  description: 'Decode JWT tokens and inspect header, payload, and claims. Shows expiration, issued-at, and algorithm. Runs 100% in your browser — your token never leaves your device.',
  slug: 'jwt-decoder',
  keywords: ['jwt decoder online free','decode jwt token browser','json web token decoder','jwt payload viewer free','jwt claims parser online','verify jwt structure browser','jwt expiry checker free','decode jwt without server'],
})

const faqs = [
  { question: "Is it safe to paste a production JWT token into this decoder?", answer: `Yes — this tool runs entirely in your browser. The token is decoded using JavaScript's atob() function on your device; nothing is transmitted to any server. Verify this yourself: open DevTools > Network while decoding a token and observe zero outbound requests. This is the key reason to use a browser-based JWT decoder rather than server-based tools when working with production tokens, which contain real user identity, permissions, and session data.` },
  { question: "What are the three parts of a JWT token?", answer: `A JWT has three Base64URL-encoded parts separated by dots: [header].[payload].[signature]. The header specifies the token type (typ: JWT) and signing algorithm (alg: HS256, RS256, ES256). The payload contains claims — sub (subject/user ID), iat (issued at), exp (expiration), aud (audience), iss (issuer), plus any custom claims. The signature proves the token was issued by someone holding the signing key and has not been modified. This tool decodes the header and payload; verifying the signature requires the signing key.` },
  { question: "Why does the decoder show the token as expired?", answer: `The exp claim is a Unix timestamp (seconds since January 1, 1970). If the current time is past that timestamp, the token is expired. The decoder compares exp against your local browser time. If exp is a 13-digit number instead of 10-digit, it may be in milliseconds instead of seconds — divide by 1000 to check. A token that expires in 1970 has this problem.` },
  { question: "What signing algorithms do JWTs support and which should I use?", answer: `HMAC-based (symmetric): HS256, HS384, HS512 — same secret to sign and verify. RSA-based (asymmetric): RS256, RS384, RS512 — private key signs, public key verifies. EC-based: ES256, ES384, ES512 — faster and shorter signatures than RSA with equivalent security. For server-to-server with shared secret: HS256 is simpler. For APIs where clients need to verify tokens without the signing secret (public JWKS endpoint): RS256 or ES256. ES256 is preferred over RS256 for new systems.` },
  { question: "What is the nbf claim and why does it matter?", answer: `nbf stands for 'not before' — a Unix timestamp before which the token must not be accepted. Less common than exp but important when pre-generating tokens for future actions (scheduled password reset emails), ensuring tokens from a rotation are not usable until the rotation takes effect, or coordinating token usage across distributed systems with clock skew. A token with a future nbf is not yet valid even if structurally correct and not expired.` },
  { question: "How do I check if a JWT is valid without the signing key?", answer: `Without the signing key, you can only check structural validity and claims — not cryptographic integrity. This tool verifies: three Base64URL-encoded sections, valid JSON in header and payload, and exp claim not in the past. It cannot verify the signature, which is the only way to confirm the token was issued by your expected authority. To verify signature, you need the HMAC secret or RSA/EC public key from the issuer's JWKS endpoint.` },
  { question: "What other tools on this site work with JWTs and authentication?", answer: `The Base64 Encoder can manually decode individual JWT parts (each section is Base64URL encoded). The Hash Generator produces HMAC-SHA256 digests used in HS256 token signatures. The Password Generator creates cryptographically secure HMAC secrets for JWT signing. The JSON Formatter helps read the surrounding API response structure that contains JWTs. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'JWT Decoder — Decode and Inspect JSON Web Tokens Free',
    description: 'Decode JWT tokens and inspect header, payload, and claims. Shows expiration, issued-at, and algorithm. Runs 100% in your browser — your token never leaves your device.',
    slug: 'jwt-decoder',
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
