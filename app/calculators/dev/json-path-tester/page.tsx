import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'JSONPath Tester — Query JSON with Path Expressions Free',
  description: 'Test JSONPath expressions against JSON data with live results. Supports dot notation, bracket notation, wildcards, filters, and recursive descent. Runs in your browser.',
  slug: 'json-path-tester',
  keywords: ['jsonpath tester online free','jsonpath evaluator browser','test jsonpath expression online','jsonpath query tester','jsonpath filter online','json path selector free','$.store.book jsonpath tester','how to write jsonpath query online'],
})

const faqs = [
  { question: 'What is JSONPath and how is it used?', answer: "JSONPath is a query language for JSON, analogous to XPath for XML. It lets you extract specific values from a JSON document using a path expression. $.store.book[0].title extracts the title of the first book. $.store.book[*].author extracts all authors. $..price extracts all price values recursively. JSONPath is used in: API testing tools (Postman, Insomnia assertions), AWS Step Functions and EventBridge rule patterns, Kubernetes JSON patch operations, log processing pipelines (Logstash, jq), and backend code that processes API responses." },
  { question: 'What is the difference between dot notation and bracket notation in JSONPath?', answer: "Both access object properties: $.store.book is identical to $['store']['book']. Bracket notation is required when property names contain spaces, special characters, or start with digits: $['property name with spaces']['0invalid-start']. Bracket notation also supports expressions: $[(@.length-1)] accesses the last element. Dot notation is cleaner and more readable for simple paths. The root $ must always be present. .. is recursive descent (searches all levels). * is wildcard (matches any property or array element). [start:end] is array slice notation." },
  { question: 'How do I filter array elements by a property value in JSONPath?', answer: "Use filter expressions with the ? operator: $.store.book[?(@.price < 10)] returns books where price is less than 10. @.price refers to the current node\'s price property. Common filter operators: == (equals), != (not equals), < (less than), > (greater than), <= (at most), >= (at least). String matching: $.users[?(@.role == 'admin')] returns admin users. Multiple conditions: [?(@.price < 10 && @.category == 'fiction')]. Filter expressions are the most powerful JSONPath feature for querying arrays of objects." },
  { question: 'How does $.. (recursive descent) differ from $ (root)?', answer: "$ refers to the root of the document. $.. searches recursively through all levels. If your JSON has nested objects at unknown depth and you want all price values regardless of nesting level: $..price matches every price field anywhere in the document tree. This is powerful for querying deeply nested structures without knowing the exact path. Potential issue: recursive descent can match more than expected if the property name appears at multiple levels with different meanings. Use specific paths when structure is known; use $.. when structure varies." },
  { question: 'What is the difference between JSONPath and JMESPath?', answer: "Both query JSON but are different specifications. JSONPath is older and more widely referenced in documentation. JMESPath is used by the AWS CLI (aws --query flag) and has a more formal grammar. Differences: JMESPath uses pipes (|) for function application; JSONPath uses filter expressions. JMESPath has built-in functions (length, sort, min_by, max_by); JSONPath functions vary by implementation. JMESPath is stricter — invalid expressions fail clearly; JSONPath behavior on edge cases varies between implementations. If you are using the AWS CLI, learn JMESPath. For general JSON querying, JSONPath is more universally recognized." },
  { question: 'How do I use JSONPath in JavaScript?', answer: "No built-in JSONPath support exists in JavaScript. Use the jsonpath npm package: const jp = require('jsonpath'); jp.query(data, '$.store.book[*].author'). Or jsonpath-plus: import { JSONPath } from 'jsonpath-plus'; JSONPath({ path: '$.store.book[*]', json: data }). For Node.js scripts processing large JSON: jq (command-line tool) is faster than JavaScript solutions for large data processing. Many API testing frameworks include JSONPath support — Postman uses pm.response.json() with standard JavaScript property access rather than JSONPath expressions." },
  { question: 'What other JSON tools are on this site?', answer: "The JSON Formatter validates and beautifies JSON before querying with JSONPath. The JSON Schema Generator creates a validation schema from your JSON structure. The JSON to CSV tool flattens arrays found via JSONPath to tabular format. The Diff Checker compares JSONPath query results from two versions of a document. The curl Builder generates the API calls that produce the JSON you are querying. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'JSONPath Tester — Query JSON with Path Expressions Free',
    description: 'Test JSONPath expressions against JSON data with live results. Supports dot notation, bracket notation, wildcards, filters, and recursive descent. Runs in your browser.',
    slug: 'json-path-tester',
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
