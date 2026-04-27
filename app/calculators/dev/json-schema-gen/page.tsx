import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'JSON Schema Generator — Auto-Generate from JSON Free',
  description: 'Auto-generate a JSON Schema (draft-07) from any JSON sample. Infers types, required fields, and nested structure. Runs in your browser.',
  slug: 'json-schema-gen',
  keywords: ['json schema generator online free','generate json schema from example','json schema from sample data','json schema draft 7 generator','auto generate json schema browser','json schema validator generator free'],
})

const faqs = [
  { question: "What is JSON Schema and what is it used for?", answer: `JSON Schema validates, annotates, and documents JSON documents. It defines which properties exist, their types, which are required, min/max values, string patterns, and nested object schemas. Used in: API request/response validation (Fastify, Express-validator, OpenAPI spec), form validation, MongoDB schema validation, and auto-generated documentation. The auto-generated schema from this tool is a starting point — refine by adding descriptions, examples, and additional constraints.` },
  { question: "What is the difference between JSON Schema draft-07, 2019-09, and 2020-12?", answer: `Draft-07 (2018) is the most widely supported — added if/then/else conditionals. Draft-2019-09 added $anchor, $recursiveRef, and unevaluatedProperties. Draft-2020-12 changed $ref behavior and added prefixItems for arrays. For maximum compatibility, use draft-07. For modern validators (ajv 8+): draft-2020-12 is current. The $schema keyword declares which version a schema uses.` },
  { question: "How do I add validation constraints to an auto-generated schema?", answer: `The generator infers basic types. Refine with: strings — minLength, maxLength, pattern (regex), format (email, uri, date-time). Numbers — minimum, maximum, multipleOf. Arrays — minItems, maxItems, uniqueItems: true. Objects — additionalProperties: false (reject unknown keys). Enums — replace type with enum: [allowed, values]. The generated schema marks observed required fields — adjust based on actual business logic.` },
  { question: "How do I validate API requests with JSON Schema in Node.js?", answer: `Most popular validator is ajv: const ajv = new Ajv(); const validate = ajv.compile(schema); const valid = validate(data); if (!valid) console.log(validate.errors). For Express: use express-ajv-swagger-validation. For Fastify: natively uses ajv for route schema validation — define schema in route options and Fastify validates body, params, and query automatically. For Python: jsonschema library.` },
  { question: "What is the difference between additionalProperties: false and unevaluatedProperties: false?", answer: `additionalProperties: false rejects any property not listed in properties or patternProperties at the same schema level. It does not account for properties defined in allOf/anyOf/oneOf. unevaluatedProperties: false (draft-2019-09+) is stricter — also considers properties defined in all applicator keywords. For most schemas without complex combiners, additionalProperties: false is sufficient and more widely supported.` },
  { question: "How do I represent a field that can be string or null?", answer: `Draft-07: { "type": ["string", "null"] } as an array of types. Or use oneOf: [{"type": "string"}, {"type": "null"}]. In OpenAPI 3.1 (aligned with JSON Schema 2020-12): { "type": ["string", "null"] } is the correct form — nullable: true is an OpenAPI 3.0 extension not standard JSON Schema. The auto-generated schema infers nullable if your sample data contains null values.` },
  { question: "What other JSON tools pair with the Schema Generator?", answer: `The JSON Formatter validates and formats JSON before feeding it to the schema generator. The JSONPath Tester queries JSON documents against the schema structure. The JSON to CSV tool exports validated data. The Diff Checker compares two schema versions when you update your data model. The curl Builder tests API endpoints that should conform to your schema. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'JSON Schema Generator — Auto-Generate from JSON Free',
    description: 'Auto-generate a JSON Schema (draft-07) from any JSON sample. Infers types, required fields, and nested structure. Runs in your browser.',
    slug: 'json-schema-gen',
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
