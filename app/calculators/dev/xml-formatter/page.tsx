import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'XML Formatter & Validator — Beautify XML Online Free',
  description: 'Format and validate XML with syntax highlighting. Catches malformed tags, unmatched brackets, and encoding issues. Runs entirely in your browser.',
  slug: 'xml-formatter',
  keywords: ['xml formatter online free','xml beautifier browser','xml to json converter free','xml lint validator online','xml pretty print browser','xml syntax checker online','xml prettify no install'],
})

const faqs = [
  { question: "What is the difference between well-formed and valid XML?", answer: `Well-formed XML meets the basic XML syntax rules: every opening tag has a matching closing tag, tags are properly nested (no overlapping), the document has exactly one root element, attribute values are quoted, and special characters are escaped. Valid XML goes further — it also conforms to a schema (DTD or XSD) that defines which elements and attributes are allowed and their structure. A well-formed XML file passes a basic XML parser. A valid XML file also passes schema validation. Most XML processing requires only well-formedness; schema validation is used for data exchange standards like SOAP, XBRL, or OpenDocument.` },
  { question: "What are the most common XML syntax errors?", answer: `Unmatched tags: <item><name>Alice</item></name> — name closes before item. Overlapping tags: <b><i>text</b></i> — tags must properly nest. Missing quotes: attr=value instead of attr='value'. Unescaped special characters in content: & must be &amp;, < must be &lt;, > should be &gt;, ' should be &apos;, " should be &quot; in attribute values. Multiple root elements: XML must have exactly one root. Missing XML declaration encoding: <?xml version='1.0' encoding='UTF-8'?> is recommended. Case sensitivity: <Item> and <item> are different elements in XML (unlike HTML).` },
  { question: "What is the difference between XML namespaces and prefixes?", answer: `XML namespaces prevent element name conflicts when combining XML from different sources. A namespace is a URI: xmlns:xsd='http://www.w3.org/2001/XMLSchema'. The xsd: prefix is just a shorthand — the actual namespace is the URI. Two elements with different prefixes but the same URI are in the same namespace. The default namespace (xmlns='http://example.com') applies to all unprefixed elements in scope. Common namespaces: SOAP envelope (xmlns:soap), XML Schema (xmlns:xs), SVG (xmlns='http://www.w3.org/2000/svg'), XHTML. Namespace URIs do not need to be real URLs — they are just unique identifiers.` },
  { question: "When should I use XML vs JSON for data exchange?", answer: `XML advantages: attributes (metadata separate from content), comments (JSON has none), mixed content (text and elements interleaved — common in documents), namespaces (combining vocabularies), XSLT transformation, XPath querying, and extensive tooling for enterprise integration (SOAP, XBRL, EDI). JSON advantages: more compact, natively parsed by JavaScript, simpler data model, human-readable for APIs. Modern preference: JSON for REST APIs and JavaScript applications. XML remains dominant in: enterprise B2B data exchange, document formats (DOCX, ODT, SVG), configuration in Java/enterprise ecosystems (Maven, Spring), and legacy system integration.` },
  { question: "How do I query XML data to extract specific values?", answer: `XPath is the query language for XML: //book[@category='fiction']/title extracts all fiction book titles. In JavaScript: const result = document.evaluate('//title', xmlDoc, null, XPathResult.ANY_TYPE, null). In Python: from lxml import etree; tree.xpath('//book/title/text()'). In Java: XPathFactory.newInstance().newXPath().evaluate(). The XML to JSON converter on this site transforms XML to JSON, after which you can use JSONPath expressions instead of XPath if you prefer that query syntax.` },
  { question: "How do I validate XML against an XSD schema?", answer: `XSD (XML Schema Definition) defines the allowed structure, data types, and constraints for an XML document. Validation tools: in a browser this is limited. For production validation: Java has built-in JAXP support; Python has lxml: from lxml import etree; schema = etree.XMLSchema(etree.parse('schema.xsd')); schema.validate(doc). The xmllint command-line tool validates against XSD: xmllint --schema schema.xsd data.xml. Online validators accept both the XML file and the XSD schema. This tool validates well-formedness only — not schema compliance.` },
  { question: "What other format conversion tools are on this site?", answer: `The XML to JSON converter transforms XML to JSON format. The JSON Formatter handles the JSON output from XML conversion. The YAML Formatter covers another major configuration format. The Diff Checker compares two XML file versions. The HTML Validator is related but specifically for HTML5 — XML and HTML have different rules. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'XML Formatter & Validator — Beautify XML Online Free',
    description: 'Format and validate XML with syntax highlighting. Catches malformed tags, unmatched brackets, and encoding issues. Runs entirely in your browser.',
    slug: 'xml-formatter',
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
