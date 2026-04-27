import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSV to JSON Converter — Free Online, Runs in Browser',
  description: 'Convert CSV data to JSON arrays or objects. Handles headers, custom delimiters, and quoted fields. Runs entirely in your browser — data never leaves your device.',
  slug: 'csv-to-json',
  keywords: ['csv to json converter online free','convert csv to json browser','csv parser to json','csv to json array online','csv columns to json keys free','import csv as json browser'],
})

const faqs = [
  { question: 'What is the difference between JSON array of arrays and array of objects output?', answer: `Array of arrays: [["Alice",30],["Bob",25]] — each row becomes an inner array of values. Compact but column names are lost. Array of objects: [{"name":"Alice","age":30},{"name":"Bob","age":25}] — each row becomes an object with column headers as keys. More verbose but self-documenting and directly usable in most API contexts. Array of objects is the correct output when the CSV has a header row and the JSON will be consumed by application code. Array of arrays makes sense for numeric data grids or when you need to specify column types separately.` },
  { question: 'How are quoted fields handled in CSV parsing?', answer: `RFC 4180 (the closest thing to a CSV standard) specifies that fields containing commas, newlines, or double quotes must be enclosed in double quotes. A literal double quote within a field is escaped by doubling it: "He said ""hello""" becomes He said "hello". This parser handles all RFC 4180 cases: quoted fields with commas, quoted fields with newlines (producing JSON with embedded newlines in string values), and escaped double quotes. Common issues: CSV exported from Excel uses CRLF line endings and may have a BOM (byte order mark) at the start — both are handled correctly.` },
  { question: 'My CSV uses semicolons or tabs instead of commas — can the tool handle that?', answer: "Yes. European Excel and many database export tools use semicolons as the delimiter because commas appear in numbers formatted with the decimal comma convention (1.234,56 in German locale vs 1,234.56 in US locale). Tab-separated values (TSV) are common for database dumps and data interchange formats where fields may contain commas. This tool accepts a custom delimiter character. For tab-separated data: specify a tab as the delimiter. For pipe-separated: use |. The parsing logic handles quoted fields correctly regardless of the delimiter character." },
  { question: 'How should I handle CSV data with missing values?', answer: `A missing value in CSV (two consecutive delimiters: a,,b or a trailing delimiter: a,b,) produces an empty string in the parsed output. In JSON, this becomes an empty string "". Depending on your use case, you may want to convert empty strings to null (more semantically correct for missing data), to a default value, or to omit the key entirely for sparse objects. This tool outputs empty strings by default — use the JSON Formatter or a processing step to transform empty strings to null if needed for your downstream system.` },
  { question: 'How do I convert a large CSV file (millions of rows) to JSON?', answer: "Browser-based tools load the entire file into memory, which limits practical size to a few MB to tens of MB depending on available RAM. For large files: use command-line tools — jq with csvkit (pip install csvkit then csvjson large_file.csv > output.json), Python (pandas: df = pd.read_csv('file.csv'); df.to_json('file.json', orient='records')), or Node.js with the csv-parse library for streaming. For files that need to stay on-device, this browser tool handles typical API response sizes and spreadsheet exports well." },
  { question: 'How do I convert a database query result to JSON?', answer: `Most databases support JSON export directly: PostgreSQL: SELECT row_to_json(t) FROM (SELECT * FROM users) t or COPY (SELECT...) TO STDOUT WITH (FORMAT CSV, HEADER). MySQL: SELECT * FROM users INTO OUTFILE '/tmp/users.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'. Then convert the CSV output here. Alternatively, use your ORM\'s built-in JSON serialization — most frameworks can serialize query results to JSON without intermediate CSV. The CSV-to-JSON route is most useful when you have a spreadsheet file (from a business user or data export) that needs to become API data.` },
  { question: 'What other data format tools are on this site?', answer: "The JSON to CSV tool converts in the reverse direction — flattening JSON arrays to spreadsheet format. The JSON Formatter validates and beautifies the output from this converter. The JSON Schema Generator creates a validation schema from the converted JSON. The XML to JSON tool handles XML data sources. The YAML Formatter handles YAML configuration files. The Diff Checker verifies that converted data matches expected output. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSV to JSON Converter — Free Online, Runs in Browser',
    description: 'Convert CSV data to JSON arrays or objects. Handles headers, custom delimiters, and quoted fields. Runs entirely in your browser — data never leaves your device.',
    slug: 'csv-to-json',
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
