import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'XML to JSON Converter — Transform XML Data Free Online',
  description: 'Convert XML to JSON and JSON to XML. Handles attributes, namespaces, and nested elements. Runs entirely in your browser — data never leaves your device.',
  slug: 'xml-to-json',
  keywords: ['xml to json converter online free','convert xml to json browser','xml parser to json','soap xml to json free','xml attributes to json online','xslt to json converter browser'],
})

const faqs = [
  { question: "How does XML structure map to JSON?", answer: `XML to JSON conversion requires decisions about structure: XML elements become JSON object keys. XML text content becomes the value. XML attributes can become a special key (like @attributes) or be flattened alongside child elements. XML elements that repeat become JSON arrays. Empty elements become null, empty string, or an empty object depending on the converter. This tool uses a conventional mapping: attributes as @attr key, text content as #text key when mixed with child elements, and repeated elements as arrays automatically.` },
  { question: "What is lost when converting from XML to JSON?", answer: `XML features that have no JSON equivalent: XML comments (<!-- comment -->) are dropped. Processing instructions (<?xml-stylesheet?>) are dropped. XML namespaces are either dropped or encoded as key prefixes. The distinction between attributes and child elements is collapsed (both become keys). Mixed content (text interleaved with child elements) loses its structure. Document type declarations (DTD) are dropped. CDATA sections are converted to plain strings. If your application logic relies on any of these XML-specific features, conversion to JSON requires extra handling.` },
  { question: "What are common use cases for converting XML to JSON?", answer: `Legacy API migration: older SOAP or XML REST services returning XML need conversion for modern JavaScript clients. Configuration transformation: some CI/CD tools accept only JSON input but receive XML from legacy systems. Database import: XML data exports need JSON format for document databases (MongoDB) or JSON columns in PostgreSQL. Data pipeline processing: JSON is the standard format for most streaming and ETL tools. XSLT to JavaScript migration: replacing XML/XSLT pipelines with JSON-based JavaScript rendering.` },
  { question: "How do I convert SOAP XML responses to JSON in JavaScript?", answer: `SOAP responses are XML wrapped in a SOAP envelope. Parse with DOMParser: const parser = new DOMParser(); const doc = parser.parseFromString(soapXml, 'text/xml'). Then navigate with XPath or DOM methods to extract values. For systematic conversion: use the xml2js npm package (Node.js: xml2js.parseString(xml, callback)) or fast-xml-parser for high performance. The result is a JavaScript object that can be serialized to JSON. SOAP-specific wrappers (soap:Body, soap:Envelope) will appear as nested keys — strip them to get to the actual data.` },
  { question: "How do I handle XML with namespaces in the conversion?", answer: `XML namespaces appear as xmlns declarations and prefix:element notation. In converted JSON, namespace prefixes either appear as part of the key name (prefix:element → 'prefix:element' key) or are stripped. Stripping namespaces is simpler but loses type information when the same element name exists in multiple namespaces. Preserving prefixes maintains disambiguation but produces uglier JSON keys. For SOAP or XBRL XML where namespaces carry semantic meaning, preserve them. For simple data XML where namespaces are boilerplate, strip them.` },
  { question: "How do I convert JSON back to XML?", answer: `The reverse conversion (JSON to XML) requires decisions about root element name (JSON has no equivalent) and array handling (JSON arrays become repeated XML elements). This tool handles the reverse direction as well. Programmatically: most xml2js and fast-xml-parser equivalents support JSON-to-XML. The result is valid XML but may not match the original structure if the JSON was modified after the initial conversion — some information (comments, attribute vs element distinction) was lost in the XML-to-JSON direction and cannot be fully reconstructed.` },
  { question: "What other data format tools are on this site?", answer: `The XML Formatter validates and beautifies XML before conversion. The JSON Formatter validates the converted JSON output. The JSONPath Tester queries the converted JSON data. The CSV to JSON tool handles another common data format conversion. The YAML Formatter covers YAML which is another JSON-compatible format. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'XML to JSON Converter — Transform XML Data Free Online',
    description: 'Convert XML to JSON and JSON to XML. Handles attributes, namespaces, and nested elements. Runs entirely in your browser — data never leaves your device.',
    slug: 'xml-to-json',
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
