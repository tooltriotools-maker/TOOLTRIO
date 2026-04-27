import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTTP Status Codes Reference — All 5xx 4xx 3xx Free',
  description: 'Complete HTTP status code reference with explanations. 1xx informational, 2xx success, 3xx redirects, 4xx client errors, 5xx server errors.',
  slug: 'http-status-codes',
  keywords: ['http status codes reference online free','http 404 200 500 codes browser','rest api status codes guide','http response codes lookup','http status code meaning tool'],
})


const faqs = [
  { question: 'What is the difference between 401 Unauthorized and 403 Forbidden?', answer: "Despite the name, 401 Unauthorized actually means 'unauthenticated' — the request lacks valid credentials. The server is saying 'tell me who you are.' The response should include a WWW-Authenticate header indicating how to authenticate. 403 Forbidden means 'I know who you are, but you do not have permission to access this.' Authentication would not help — the resource is forbidden for this user. Common mistake: using 403 when you should use 401. If the user is not logged in, return 401. If they are logged in but lack the required role or permissions, return 403. Returning 404 instead of 403 for private resources is also common — hiding existence is a security choice, not an error classification." },
  { question: 'When should I use 200 vs 201 vs 204 for API responses?', answer: "200 OK: the request succeeded and the response body contains the result. Use for GET, PUT, PATCH responses that return the updated resource. 201 Created: a new resource was successfully created. Use for successful POST requests that create new records. The response should include a Location header pointing to the new resource URL. 204 No Content: the request succeeded but there is nothing to return. Use for DELETE requests (resource deleted, nothing to return) and some PUT/PATCH operations where the client does not need the updated resource back. Returning 200 with an empty body is functionally equivalent to 204 but semantically less precise." },
  { question: 'What is the difference between 301 and 302 redirects?', answer: "301 Moved Permanently: the resource has permanently moved. Browsers cache this — after the first visit, the browser goes directly to the new URL. Search engines transfer link equity and update their index. 302 Found: temporary redirect. Browsers do not cache it — every request hits the original URL first. Search engines keep the original URL indexed. 307 Temporary Redirect: like 302, but explicitly preserves the HTTP method (a POST to a 307-redirected URL is re-POSTed, not converted to GET). 308 Permanent Redirect: like 301, but preserves the method. Use 301 for permanent URL changes and HTTPS upgrades. Use 302 for temporary maintenance pages." },
  { question: 'What does a 429 Too Many Requests response mean and how should I handle it?', answer: "429 means you have exceeded the API\'s rate limit. The response should include a Retry-After header indicating when you can try again (either a seconds delay or a specific timestamp). Proper handling: implement exponential backoff — wait for Retry-After seconds if provided, or double your wait time on each consecutive 429 (start at 1s, then 2s, 4s, 8s, up to a maximum). Add jitter (random delay) to prevent synchronized retries from multiple clients all hitting the API at the same moment (thundering herd). Track your request rate and stay under the documented limit rather than reacting to 429s." },
  { question: 'What is the difference between 500, 502, 503, and 504?', answer: "500 Internal Server Error: the server encountered an unexpected error — a bug, unhandled exception, or misconfiguration in the application code. 502 Bad Gateway: the gateway/proxy received an invalid response from the upstream server — typically means the upstream server is down or returning garbage. 503 Service Unavailable: the server is temporarily unable to handle the request — usually during maintenance, overload, or startup. Should include Retry-After. 504 Gateway Timeout: the gateway/proxy did not receive a timely response from upstream — the upstream server is too slow or unresponsive. 502 and 504 appear at the load balancer/CDN level when backend services fail." },
  { question: 'What does 418 I\'m a Teapot mean?', answer: "418 is an April Fools\' joke from RFC 2324 (1998) — the Hyper Text Coffee Pot Control Protocol. The spec defines 418 as the response when a teapot is asked to brew coffee. It was never a serious HTTP status code and was not supposed to be implemented. It survived as an Easter egg and is used by some APIs for humorous responses. Despite being a joke, 418 is listed in the IANA HTTP Status Code Registry (marked as unused) and Node.js, Go, and Python all include it in their HTTP status code constants. It occasionally appears in API error responses for 'this request makes no sense' situations, where the developer wanted to signal an absurd request without implying a real error." },
  { question: 'What other HTTP and API tools are on this site?', answer: "The HTTP Headers Analyzer decodes response headers including the status code context. The curl Builder generates commands that reveal status codes when testing endpoints. The API Response Time Calculator models timeout values relative to expected response times. The JWT Decoder inspects auth tokens that affect which status code an API returns (valid token vs expired = 200 vs 401). The Meta Tag Generator includes HTTP-equiv tags that can influence browser behavior for certain status codes. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTTP Status Codes Reference — All 5xx 4xx 3xx Free',
    description: 'Complete HTTP status code reference with explanations. 1xx informational, 2xx success, 3xx redirects, 4xx client errors, 5xx server errors.',
    slug: 'http-status-codes',
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
