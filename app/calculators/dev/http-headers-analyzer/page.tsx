import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTTP Headers Analyzer — Decode Response Headers Free',
  description: 'Paste HTTP response headers to decode security headers, caching directives, CORS settings, and cookies. Runs in your browser.',
  slug: 'http-headers-analyzer',
  keywords: ['http headers analyzer online free','response headers checker browser','http header viewer free','analyze http response headers','cors headers checker online'],
})


const faqs = [
  { question: 'How do I get HTTP response headers to analyze?', answer: "Three ways: (1) Browser DevTools: open Network tab, click any request, click the Headers tab — paste the Response Headers section here. (2) curl: curl -I https://example.com returns only headers. curl -D - https://example.com dumps headers before the body. (3) Online tools: httpbin.org/headers shows your request headers. response-headers.com shows what headers a server returns. For inspecting your own server: curl -v https://yoursite.com shows both request and response headers with the TLS handshake details." },
  { question: 'What security headers should every website have?', answer: "The most important: Strict-Transport-Security (HSTS) — forces HTTPS for the max-age duration; start with max-age=300 and work up to max-age=31536000 (1 year) after confirming HTTPS works correctly. Content-Security-Policy (CSP) — restricts which scripts, styles, and resources the browser will load; prevents XSS. X-Frame-Options: DENY or SAMEORIGIN — prevents clickjacking by blocking iframe embedding. X-Content-Type-Options: nosniff — prevents MIME type sniffing. Referrer-Policy — controls how much referrer information is sent. Permissions-Policy — restricts access to browser APIs (camera, microphone, geolocation)." },
  { question: 'What does Cache-Control: no-store vs no-cache mean?', answer: "no-store: the response is never stored in any cache — it must be fetched fresh from the server every time. Use for responses containing sensitive data (banking, health records). no-cache: the response can be stored, but must be revalidated with the server before being served from cache (using ETag or Last-Modified). max-age=0: same effect as no-cache — cached but always revalidated. The common confusion: no-cache does not mean 'do not cache' — it means 'cache but always check'. no-store truly prevents caching. For HTML pages: no-cache (always revalidate) is usually correct. For sensitive API responses: no-store." },
  { question: 'What is CORS and how do I read the CORS headers?', answer: "CORS (Cross-Origin Resource Sharing) is the browser security mechanism that restricts which origins can make requests to an API. Key response headers: Access-Control-Allow-Origin: * allows any origin; Access-Control-Allow-Origin: https://app.example.com allows only that origin. Access-Control-Allow-Methods lists allowed HTTP methods. Access-Control-Allow-Headers lists allowed request headers. Access-Control-Allow-Credentials: true allows cookies/auth in cross-origin requests (requires a specific origin in Allow-Origin, not *). Access-Control-Max-Age caches the preflight response. If CORS headers are missing or incorrect, the browser blocks the request even if the server returns 200." },
  { question: 'What does the Vary header do and why does it affect caching?', answer: "Vary tells caches which request headers affect the response content. Vary: Accept-Encoding means the server may return gzip or identity (uncompressed) responses — caches must store separate copies for each encoding. Vary: Accept-Language means content varies by language. Vary: Cookie is problematic — it means cached responses differ per cookie value, which effectively disables CDN caching for that endpoint since every user has different cookies. Vary: Origin (used for CORS responses) means CDNs cache one response per requesting origin. For public API responses, minimize Vary headers to maximize CDN cache hit rates." },
  { question: 'How do I check if my site has an A+ rating on security headers?', answer: "securityheaders.com grades your site A+ through F based on which security headers are present and correctly configured. An A+ requires at minimum: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Content-Security-Policy is the hardest to configure correctly — start with report-only mode (Content-Security-Policy-Report-Only) to see what would be blocked without actually blocking anything, then tighten the policy iteratively." },
  { question: 'What other web and API tools are on this site?', answer: "The HTTP Status Codes reference explains every status code you might see in headers (301, 401, 429, 503). The curl Builder generates commands to retrieve and inspect headers from any URL. The JWT Decoder analyzes Authorization Bearer tokens found in request headers. The MIME Type Lookup identifies Content-Type header values. The Meta Tag Generator creates the HTML meta tags that complement HTTP headers for browser behavior. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTTP Headers Analyzer — Decode Response Headers Free',
    description: 'Paste HTTP response headers to decode security headers, caching directives, CORS settings, and cookies. Runs in your browser.',
    slug: 'http-headers-analyzer',
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
