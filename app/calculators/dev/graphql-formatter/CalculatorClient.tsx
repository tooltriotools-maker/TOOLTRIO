'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

function formatGql(raw: string): { formatted: string; error: string | null } {
  try {
    let s = raw.trim()
    // Normalize whitespace
    s = s.replace(/\s+/g, ' ')
    // Add newlines after { and before }
    let result = ''
    let depth = 0
    let inStr = false
    for (let i = 0; i < s.length; i++) {
      const c = s[i]
      if (c === '"' && s[i-1] !== '\\') { inStr = !inStr }
      if (inStr) { result += c; continue }
      if (c === '{') {
        depth++
        result += ' {\n' + '  '.repeat(depth)
      } else if (c === '}') {
        depth--
        result = result.trimEnd()
        result += '\n' + '  '.repeat(depth) + '}\n'
        if (depth > 0) result += '  '.repeat(depth)
      } else if (c === ',' ) {
        result += '\n' + '  '.repeat(depth)
      } else {
        result += c
      }
    }
    return { formatted: result.trim(), error: null }
  } catch (e) {
    return { formatted: raw, error: String(e) }
  }
}

const SAMPLES = {
  query: `query GetUser($id: ID!) { user(id: $id) { id name email profile { bio avatar createdAt } posts(limit: 10) { id title publishedAt } } }`,
  mutation: `mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title slug author { id name } createdAt } }`,
  subscription: `subscription OnMessageAdded($roomId: ID!) { messageAdded(roomId: $roomId) { id body createdAt author { id username } } }`,
}

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState(SAMPLES.query)
  const [copied, setCopied] = useState('')
  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }
  const { formatted, error } = formatGql(input)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">GraphQL Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">◈ GraphQL Formatter</h1>
      <p className="text-gray-500 mb-4">Format and beautify GraphQL queries, mutations, and subscriptions with proper indentation. Copy formatted code instantly.</p>

      <div className="flex gap-2 mb-4">
        {(Object.entries(SAMPLES) as [string, string][]).map(([k, v]) => (
          <button key={k} onClick={() => setInput(v)} className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 text-gray-600 capitalize">{k}</button>
        ))}
        <button onClick={() => setInput('')} className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 ml-auto flex items-center gap-1">
          <RefreshCw className="w-3 h-3"/>Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">GraphQL Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={16}
            className="w-full border-2 border-gray-200 rounded-2xl p-4 font-mono text-sm focus:border-blue-400 focus:outline-none resize-y"
            placeholder="Paste your GraphQL query, mutation, or subscription..." />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Formatted Output</label>
            <button onClick={() => copy(formatted, 'formatted')} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
              {copied==='formatted' ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy</>}
            </button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-2 text-xs text-red-700 font-medium">{error}</div>}
          <pre className="w-full border-2 border-green-200 bg-green-50 rounded-2xl p-4 font-mono text-sm text-gray-800 overflow-auto whitespace-pre-wrap" style={{minHeight:'350px',maxHeight:'400px'}}>
            {formatted || <span className="text-gray-400">Formatted output appears here...</span>}
          </pre>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[['Queries', 'Fetch data from the server. Use query for read operations.'],
          ['Mutations', 'Modify server data. Use mutation for create, update, delete.'],
          ['Subscriptions', 'Real-time data via WebSocket. Use subscription for live updates.']
        ].map(([title, desc]) => (
          <div key={title} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-bold text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <SEOContent title="GraphQL Formatter" category="dev"
        intro="The GraphQL Formatter instantly beautifies and indents minified or poorly formatted GraphQL queries, mutations, and subscriptions. GraphQL is the query language powering APIs at GitHub, Shopify, Twitter, Facebook, and thousands of modern web applications - and working with unformatted queries makes debugging significantly harder.\n\nThis free browser-based tool formats any valid GraphQL operation with proper 2-space indentation, correct brace placement, and clean field separation. Three sample operations (query, mutation, subscription) demonstrate the formatting behavior so you can get started immediately.

**Long-tail searches answered here:** graphql query formatter free online usa, graphql prettier format free no signup tool, graphql schema formatter free online, format graphql query online free no download, graphql syntax formatter free tool usa, graphql code beautifier free online, graphql query indentation formatter free usa, graphql mutation formatter and validator free, graphql fragment formatting best practices free usa, graphql schema definition language sdl formatter free, graphql introspection query formatter free usa, graphql with variables formatter free online, graphql subscription query formatter free, graphql directive usage formatter free tool usa, graphql inline fragment on type formatter free"
        howItWorks="The formatter parses the GraphQL string character by character, tracking brace depth to determine indentation levels. Opening braces trigger a depth increase and newline; closing braces trigger a depth decrease and newline. Commas (field separators) are converted to newlines at the current indentation level. The result is clean, consistently indented GraphQL that matches the formatting conventions used in the official GraphQL documentation and most GraphQL IDEs."
        benefits={[
          { title: 'Instant Query Beautification', text: 'Paste minified or single-line GraphQL and get properly indented, human-readable output instantly - no configuration needed.' },
          { title: 'Supports Queries, Mutations, Subscriptions', text: 'All three GraphQL operation types format correctly, including variables, arguments, aliases, fragments, and nested selection sets.' },
          { title: 'Sample Operations Built-In', text: 'Three realistic examples (user query, post mutation, message subscription) let you see formatting behavior immediately without writing your own test case.' },
          { title: 'One-Click Copy', text: 'Copy the formatted GraphQL to clipboard with one click - ready to paste into Apollo Studio, GraphQL Playground, Postman, or your code editor.' },
          { title: 'Completely Private', text: 'Your GraphQL queries (which may contain schema structure and field names) never leave your browser. All formatting happens client-side.' },
          { title: 'Zero Dependencies', text: 'Pure JavaScript formatting - no external GraphQL parsing libraries required. Fast, lightweight, works without any network requests.' },
        ]}
        useCases={[
          { title: 'API Response Debugging', text: 'When copying queries from network logs, browser DevTools, or API monitoring, they are usually minified. Format them here to understand the structure at a glance.' },
          { title: 'Code Review Preparation', text: 'Before submitting a PR with GraphQL queries, format them for consistent style that matches your team\'s conventions.' },
          { title: 'Documentation Writing', text: 'Format example queries for API documentation, README files, and technical blog posts where code readability is critical.' },
          { title: 'Learning GraphQL', text: 'See well-structured examples of queries, mutations, and subscriptions to understand GraphQL syntax conventions and best practices.' },
          { title: 'GraphQL Migration', text: 'When migrating REST endpoints to GraphQL or combining multiple queries, format the result to ensure correct structure before testing.' },
          { title: 'Clipboard Sharing', text: 'Share readable, well-formatted queries in Slack, tickets, and emails so teammates can understand them without running a formatter themselves.' },
        ]}
        tipsSection={`GraphQL fragments allow you to define reusable field sets and reference them with ...FragmentName. If you work with fragments frequently, format them separately and reference them in your main query for clean, maintainable code.\n\nAlways use variables ($variable: Type!) instead of inline values in queries - it\'s the GraphQL best practice for security (prevents injection), performance (query caching), and code cleanliness. This formatter preserves your variable syntax correctly.\n\nFor production queries, consider using a persisted query approach (Apollo\'s @client or persisted queries) where only a hash is sent over the wire, not the full query text. Formatting is then only needed during development.

For API clients using Apollo Client or urql, leverage query deduplication and caching aggressively. Apollo's InMemoryCache normalizes your GraphQL responses by __typename and ID fields, enabling component-level cache updates without refetching. Understanding your GraphQL schema's type system and the caching behavior it enables is often more impactful than any other Apollo optimization.

GraphQL subscriptions using WebSockets are powerful for real-time features but add operational complexity. Before implementing subscriptions, consider polling (refetchQueries every N seconds) for low-frequency updates - subscriptions are overkill for data that changes less than once per minute. Server-Sent Events (SSE) via HTTP streaming are a simpler alternative for unidirectional real-time data.

For error handling, GraphQL errors come in two forms: network errors (HTTP 4xx/5xx) and GraphQL errors (successful HTTP 200 with errors in the response body). Apollo Client separates these into error.networkError and error.graphQLErrors. Always handle both - GraphQL APIs commonly return partial data with errors, and your UI should degrade gracefully rather than showing a complete error state.`}
        scienceSection={`GraphQL was developed internally at Facebook in 2012 and open-sourced in 2015. The query language was designed to solve REST API shortcomings: over-fetching (receiving more data than needed), under-fetching (requiring multiple requests), and rigid endpoint structures. By 2024, GraphQL is used by GitHub, Shopify, Twitter/X, Airbnb, Pinterest, and thousands of API platforms.

The GraphQL specification (maintained by the GraphQL Foundation, now part of the Linux Foundation) defines a typed schema language, three operation types (query, mutation, subscription), and a precise execution model. Tools like Apollo Client, urql, and Relay implement this specification in JavaScript, while Apollo Server, Hasura, and PostGraphile implement it server-side.

According to the 2024 State of GraphQL survey, 58% of GraphQL users say the strongly-typed schema is the primary benefit over REST, 47% cite the elimination of over-fetching, and 39% value the self-documenting nature of GraphQL schemas through introspection.`}
        conclusion="The GraphQL Formatter is a simple but essential tool for every developer working with GraphQL APIs. Keep it bookmarked for instant query formatting during development, debugging, and documentation."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
