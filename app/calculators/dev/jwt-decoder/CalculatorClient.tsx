'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Shield, ShieldAlert } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function decodeJWT(token: string) {
  const parts = token.trim().split('.')
  if (parts.length !== 3) return { error: 'Invalid JWT: must have exactly 3 parts (header.payload.signature)' }
  try {
    const decode = (s: string) => JSON.parse(atob(s.replace(/-/g,'+').replace(/_/g,'/')))
    const header = decode(parts[0])
    const payload = decode(parts[1])
    const sig = parts[2]
    return { header, payload, sig, raw: parts }
  } catch(e: any) { return { error: `Decode error: ${e.message}` } }
}

const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MjQ5OTUyMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export default function CalculatorClient({ faqs }: Props) {
  const [token, setToken] = useState(SAMPLE)
  const [copied, setCopied] = useState<string|null>(null)

  const result = token.trim() ? decodeJWT(token) : null
  const copy = (val: string, key: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(()=>setCopied(null),1500) }

  const expStatus = result && !('error' in result) && result.payload.exp
    ? result.payload.exp * 1000 > Date.now() ? 'valid' : 'expired'
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">JWT Decoder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔍 JWT Decoder</h1>
      <p className="text-gray-500 mb-6">Decode and inspect JSON Web Tokens. Header, payload, and signature - all decoded instantly in your browser.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800 font-semibold">
        🔐 This tool only DECODES the JWT - it does not verify the signature. Never paste production secrets here.
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">JWT Token</label>
          <button onClick={()=>setToken(SAMPLE)} className="text-xs font-bold text-green-600 hover:underline">Load sample</button>
        </div>
        <textarea value={token} onChange={e=>setToken(e.target.value)} rows={4}
          placeholder="Paste your JWT token here..."
          className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
      </div>

      {result && ('error' in result) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 font-semibold mb-4">{result.error}</div>
      )}

      {result && !('error' in result) && (
        <div className="space-y-4">
          {expStatus && (
            <div className={`flex items-center gap-2 p-3 rounded-xl border ${expStatus==='valid'?'bg-green-50 border-green-300 text-green-800':'bg-red-50 border-red-300 text-red-800'}`}>
              {expStatus==='valid'?<Shield className="w-4 h-4"/>:<ShieldAlert className="w-4 h-4"/>}
              <span className="text-sm font-bold">Token is {expStatus}. Expires: {new Date(result.payload.exp*1000).toUTCString()}</span>
            </div>
          )}

          {([['Header','header',result.header,'blue'],['Payload','payload',result.payload,'green']] as const).map(([title, key, data, color])=>(
            <div key={key} className={`bg-${color}-50 border border-${color}-200 rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-black text-${color}-800`}>{title}</span>
                <button onClick={()=>copy(JSON.stringify(data, null, 2), key)} className="flex items-center gap-1 text-xs font-bold text-green-600">
                  {copied===key?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
                </button>
              </div>
              <pre className="font-mono text-xs bg-white rounded-xl p-4 border border-gray-100 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
            </div>
          ))}

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-black text-gray-700">Signature</span>
              <button onClick={()=>copy(result.sig,'sig')} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied==='sig'?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
              </button>
            </div>
            <code className="font-mono text-xs text-gray-600 break-all">{result.sig}</code>
            <p className="text-xs text-gray-400 mt-2">Signature cannot be verified without the secret key. Algorithm: <strong>{result.header.alg}</strong></p>
          </div>
        </div>
      )}


      <SEOContent
        title="JWT Decoder — Decode and Inspect JSON Web Tokens"
        category="dev"
        intro={`JWT tokens are Base64URL-encoded strings that contain claims about a user or session. When authentication breaks, understanding the exact contents of a JWT — the algorithm used, the expiry time, the issuer, and the custom claims — is the first debugging step.

This decoder decodes any JWT token and shows the header, payload, and signature details. Runs entirely in your browser — your tokens are never transmitted.

**Long-tail searches answered here:** jwt decoder free online usa, decode jwt token payload free no signup, jwt token inspector free tool online, json web token decoder free no download, jwt claims viewer free online tool, how to decode jwt without library free usa, jwt header payload signature explained free guide, jwt expiration time decoder calculator free usa, jwt algorithm hs256 rs256 checker free online, how to verify jwt signature free tool usa, jwt decode for debugging auth issues free online, base64url decode jwt payload free tool usa, jwt nbf iat exp claims meaning decoder free, jwt iss sub aud claims decoder free usa, oauth2 jwt access token decoder free online tool

For timestamp fields, pair with [Epoch Converter](/calculators/dev/epoch-converter).`}
        howItWorks={`Splits the JWT into its three parts (header, payload, signature) and Base64URL-decodes the header and payload. Displays all claims with human-readable formatting: exp and iat timestamps are converted to readable dates, algorithm names are explained, and custom claims are formatted as JSON.

Verification is not performed (requires the secret key), but the decoded payload shows all the information needed to debug authentication issues.`}
        benefits={[
          { title: `Header and payload decoding`, text: `Decodes the Base64URL-encoded header and payload to JSON. Shows algorithm (alg), token type (typ), expiry (exp), issued-at (iat), issuer (iss), subject (sub), and all custom claims.` },
          { title: `Timestamp conversion`, text: `exp and iat Unix timestamps are converted to human-readable dates. Instantly see whether the token has expired or how long it is valid.` },
          { title: `Algorithm display`, text: `Shows which JWT algorithm was used (HS256, RS256, ES256) and explains what each means for security and verification.` },
          { title: `Signature note`, text: `Notes that the signature is present but not verified (verification requires the secret key or public key). Prevents false confidence from an unverified signature.` },
        ]}
        useCases={[
          { title: `Debugging authentication failures`, text: `Your API is returning 401 Unauthorized. Decode the JWT being sent to see whether it has expired, is missing required claims, or was issued by the wrong service.` },
          { title: `OAuth and OIDC token inspection`, text: `Access tokens, refresh tokens, and ID tokens from OAuth and OIDC flows are all JWTs. Decode them here to inspect the claims and debug integration issues.` },
          { title: `Understanding JWT structure`, text: `Learning about JWT for the first time. See the three-part structure (header.payload.signature) and how each part is Base64URL-encoded and dot-separated.` },
          { title: `Verifying token contents in tests`, text: `Your test is failing because a JWT claim is wrong. Decode the token your test generates here to see the exact payload rather than printing it in your test runner.` },
        ]}
        keyStats={[
          { stat: `HS256 vs RS256`, source: `HMAC (HS256) uses a shared secret. RSA (RS256) uses public/private key pair — required for multi-service architectures` },
          { stat: `exp claim`, source: `Token expiry as Unix timestamp — decoded to human-readable date by this tool` },
          { stat: `Base64URL encoding`, source: `JWT uses Base64URL (- and _ instead of + and /) — different from standard Base64` },
        ]}
        inlineLinks={[
          { text: `Epoch Converter`, href: `/calculators/dev/epoch-converter`, label: `Epoch Converter` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
        ]}
        tipsSection={`Never paste production JWTs into online tools — except this one runs entirely in your browser. But as a general rule, treat JWTs like passwords: they grant access to your system for their lifetime.

Check exp first when debugging. The most common JWT authentication failure is a token that has expired. The exp claim decoded here tells you immediately if that is the issue.

RS256 requires public key verification. HS256 tokens can be verified with the shared secret. RS256 tokens require the public key from the JWKS endpoint. This tool decodes but does not verify — use a library for verification.

iat (issued at) vs nbf (not before). iat is when the token was issued. nbf is when it becomes valid (useful for tokens issued in advance). Both are Unix timestamps — decoded to readable dates here.`}
        conclusion={`JWT debugging is the first step when authentication breaks in a microservice or OAuth flow. This decoder shows exactly what claims are in your token and whether it has expired — without transmitting the token anywhere. For timestamp fields: [Epoch Converter](/calculators/dev/epoch-converter). For key information: [RSA Key Info](/calculators/dev/rsa-key-info).`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
