import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'cURL Builder — Generate curl Commands from Request Details Free',
  description: 'Build curl commands from method, URL, headers, and body. Convert API requests to curl for documentation and debugging. Runs entirely in your browser.',
  slug: 'curl-builder',
  keywords: ['curl builder online free','curl command generator browser','build curl request visual','curl syntax generator free','curl post request builder online'],
})

const faqs = [
  { question: 'What is curl and when do developers use it?', answer: "curl (Client URL) is a command-line tool for making HTTP requests from a terminal. Developers use it constantly for: testing API endpoints without writing code, quickly verifying that a server is responding, copying requests from browser DevTools to reproduce them in a terminal, sharing reproducible API calls in documentation and bug reports, and automating HTTP tasks in shell scripts. The output of this builder is a curl command you can paste directly into any terminal (Mac, Linux, Windows PowerShell with curl alias, or WSL)." },
  { question: 'How do I convert a browser network request to a curl command?', answer: "In Chrome or Firefox DevTools: open the Network tab, make the request, right-click on it in the network log, select Copy → Copy as cURL. This gives you the exact curl command that reproduces the request including all headers, cookies, and request body. This technique is invaluable for debugging — you can take a failing API call from a web app and run it directly in your terminal, then modify headers and body to isolate the issue without touching application code." },
  { question: 'What are the most important curl flags to know?', answer: `-X specifies the HTTP method: -X POST, -X PUT, -X DELETE (-X GET is the default and rarely specified). -H adds a header: -H 'Content-Type: application/json'. -d specifies the request body: -d '{"key":"value"}'. -u adds Basic Auth: -u username:password (base64-encodes automatically). -k skips SSL certificate verification (for self-signed certs in development — never use in production). -v enables verbose output showing request and response headers. -o saves output to a file: -o response.json. --compressed requests compressed responses. -L follows redirects.` },
  { question: 'How do I send JSON with curl?', answer: `curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_TOKEN' -d '{"name":"Alice","email":"alice@example.com"}'. The Content-Type: application/json header tells the server to parse the body as JSON. Without it, many APIs return a 400 or 415 error. For multiline JSON, use single quotes around the body on Mac/Linux or store the JSON in a file and use -d @body.json. On Windows CMD, use double quotes around the body and escape inner quotes.` },
  { question: 'How do I authenticate API requests with curl?', answer: "Basic Auth: -u username:password (curl base64-encodes automatically) or -H 'Authorization: Basic BASE64_OF_USER_PASS'. Bearer tokens: -H 'Authorization: Bearer YOUR_JWT_OR_API_KEY'. API keys in headers: -H 'X-API-Key: YOUR_KEY'. API keys in query strings: append ?api_key=YOUR_KEY to the URL. AWS Signature V4 authentication is too complex for manual curl — use the AWS CLI or a library. OAuth 2.0 access tokens are sent as Bearer tokens after the OAuth flow completes." },
  { question: 'How do I save a curl response to a file and check the status code?', answer: "Save response body: curl -o output.json https://api.example.com/data. Show HTTP status code only: curl -o /dev/null -s -w '%{http_code}' https://api.example.com/. Show headers and body: curl -i https://api.example.com/. Headers only: curl -I https://api.example.com/ (sends HEAD request). To check status code in a script and exit on failure: curl -f -o output.json https://api.example.com/ — the -f flag makes curl exit with status 22 on HTTP errors (4xx, 5xx), enabling if curl -f ...; then ... ; fi patterns in shell scripts." },
  { question: 'What other API and HTTP tools are on this site?', answer: "The HTTP Headers Analyzer decodes and explains response headers from API calls. The HTTP Status Codes reference covers every status code you might see in curl output. The JWT Decoder inspects Bearer tokens used in curl Authorization headers. The Base64 Encoder encodes credentials for Basic Auth headers. The JSON Formatter beautifies JSON responses from curl. The URL Encoder handles query string encoding for complex curl URLs. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'cURL Builder — Generate curl Commands from Request Details Free',
    description: 'Build curl commands from method, URL, headers, and body. Convert API requests to curl for documentation and debugging. Runs entirely in your browser.',
    slug: 'curl-builder',
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
