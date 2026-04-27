import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'GraphQL Formatter & Validator — Format GraphQL Queries Free',
  description: 'Format and validate GraphQL queries, mutations, and schema definitions. Proper indentation and syntax validation. Runs entirely in your browser.',
  slug: 'graphql-formatter',
  keywords: ['graphql formatter online free','graphql query beautifier','graphql schema formatter','graphql prettier browser','graphql syntax highlighter online','format graphql query free'],
})

const faqs = [
  { question: 'What is the difference between a GraphQL query, mutation, and subscription?', answer: "GraphQL has three operation types. query: read-only data fetching — equivalent to HTTP GET. Multiple query fields can be fetched in one request. mutation: write operations — create, update, delete — equivalent to POST/PUT/PATCH/DELETE. Mutations execute sequentially (unlike queries which may be parallel) to ensure write order. subscription: long-lived real-time connection — the server pushes data when it changes. Subscriptions typically use WebSocket transport. The operation type is declared at the start: query GetUser { user(id: 1) { name } } or can be omitted (shorthand) for single anonymous queries." },
  { question: 'How do GraphQL variables work and why use them instead of inline values?', answer: `Variables allow you to pass dynamic values separately from the query string: query GetUser($id: ID!) { user(id: $id) { name } } with variables: {"id": "123"}. Advantages: the query string is constant (enables query plan caching on the server), variables are typed (the server validates them against the schema), variables prevent injection attacks (user input never interpolated into query syntax), and the same prepared query with different variables is efficient. Inline values (user(id: "123")) should only appear in static example queries — production code should always use variables.` },
  { question: 'What are GraphQL fragments and when should I use them?', answer: "Fragments are reusable pieces of query fields: fragment UserFields on User { id name email avatar }. Use in queries: query { currentUser { ...UserFields } post { author { ...UserFields } } }. Benefits: avoid repeating the same field list in multiple places, keep queries DRY, and enable component-based query composition (each UI component defines a fragment for its data needs, parent components spread them in the full query). Fragments must specify the type they apply to (on User), and can be spread with ... syntax. Fragment names must be unique per operation." },
  { question: 'How do I debug a GraphQL query that returns null or missing data?', answer: "GraphQL rarely returns HTTP errors for data issues — it returns HTTP 200 with an errors array in the response. Always check response.errors even on 200 responses. Common causes of null fields: the resolver returned null (check server logs), the field name is wrong (typos in field names silently return null, not an error — verify against the schema), the field requires authentication you are not providing, or the field has an argument you are not passing. Use __typename in your query to verify you are querying the correct type: { user { __typename id name } }." },
  { question: 'What is the N+1 query problem in GraphQL and how is it solved?', answer: "The N+1 problem: fetching a list of 100 posts, then resolving each post\'s author field — the author resolver runs 100 times, making 100 database queries instead of 1. GraphQL resolvers by default execute independently for each object. The solution is DataLoader: it batches and deduplicates resolver calls. Instead of 100 separate SELECT * FROM users WHERE id = X queries, DataLoader collects all IDs, then makes one SELECT * FROM users WHERE id IN (...) query per request. Every production GraphQL server using a database should use DataLoader or equivalent batching." },
  { question: 'How does GraphQL compare to REST for API design?', answer: "REST: multiple endpoints (/users, /posts, /comments), fixed response shapes defined by the server, easy to cache with HTTP (GET /users/123 is cacheable). GraphQL: single endpoint, clients specify exactly which fields they need (no over-fetching), multiple resources in one request (no under-fetching), but HTTP caching is harder (all requests are POST). GraphQL excels when: clients have diverse data needs (mobile vs web need different fields), rapid frontend iteration without backend changes, and complex nested relationships. REST excels when: simple CRUD operations, CDN caching is important, and public APIs with external consumers who prefer standard HTTP semantics." },
  { question: 'What other API and data tools are on this site?', answer: "The JSON Formatter structures GraphQL JSON responses for reading. The curl Builder generates curl commands for GraphQL endpoint testing. The JWT Decoder inspects authentication tokens used in GraphQL Authorization headers. The JSON Schema Generator can validate GraphQL response shapes. The Diff Checker compares GraphQL schema versions before deploying migrations. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'GraphQL Formatter & Validator — Format GraphQL Queries Free',
    description: 'Format and validate GraphQL queries, mutations, and schema definitions. Proper indentation and syntax validation. Runs entirely in your browser.',
    slug: 'graphql-formatter',
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
