import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'JSON to CSV Converter — Flatten JSON to Spreadsheet Free',
  description: 'Convert JSON arrays to CSV format for spreadsheets and databases. Flattens nested objects and handles arrays. Runs entirely in your browser.',
  slug: 'json-to-csv',
  keywords: ['json to csv converter online free','convert json array to csv','json to spreadsheet online','export json to csv browser','json to csv download free','json array csv converter no install'],
})

const faqs = [
  { question: "What JSON structures convert cleanly to CSV?", answer: `CSV is tabular — flat arrays of uniform objects convert perfectly. [{"name":"Alice","age":30},{"name":"Bob","age":25}] becomes a clean two-column CSV. Problems arise with: nested objects (how to represent {"address":{"city":"London"}} in flat CSV?), arrays of arrays (no natural column mapping), mixed schemas (objects with different key sets), and values containing commas or newlines. For nested data, the converter flattens with dot notation: address.city becomes a column header.` },
  { question: "How are arrays within JSON objects handled in CSV conversion?", answer: `Arrays within objects cannot be represented in standard CSV. Options: serialize the array as a JSON string in one cell, expand each array element to its own row (duplicates parent data), or use a delimiter within a cell (pipe-separated). This converter defaults to serializing nested arrays as JSON strings. For arrays of primitives, this produces readable output. For arrays of objects, the JSON string in the cell is dense but preservable.` },
  { question: "What encoding is used for CSV output and why does it matter?", answer: `This converter outputs UTF-8 encoded CSV. For Excel compatibility: UTF-8 CSV without BOM is sometimes not recognized by older Excel on Windows, causing non-ASCII characters to appear garbled. Adding a UTF-8 BOM (0xEF 0xBB 0xBF) signals UTF-8 to Excel. This tool generates CSV with BOM for Excel compatibility. If you see three strange characters at the start of your CSV in a text editor, that is the BOM — intentional for Excel.` },
  { question: "How do I handle null values in JSON when converting to CSV?", answer: `JSON null maps to an empty cell in CSV. The distinction between null and empty string is lost in standard CSV — both appear as empty cells. If preserving null/empty distinction matters, output a sentinel string like NULL or \\N (MySQL convention) and handle it in your database import. When importing into PostgreSQL with COPY, the default null string is empty — use COPY ... WITH (NULL 'NULL') if you used a sentinel value.` },
  { question: "How do I import JSON-to-CSV output into PostgreSQL?", answer: `Save the CSV, then: COPY tablename (column1, column2) FROM '/path/file.csv' WITH (FORMAT CSV, HEADER true, DELIMITER ',', ENCODING 'UTF8'). For UTF-8 with BOM: PostgreSQL 16+ handles BOM automatically. For large files (millions of rows), COPY is orders of magnitude faster than individual INSERT statements. Map JSON field names to PostgreSQL column names in the column list — order must match CSV column order.` },
  { question: "What other data conversion tools are on this site?", answer: `The CSV to JSON tool converts in the reverse direction. The JSON Formatter validates JSON before conversion. The JSON Schema Generator creates a validation schema for your source JSON. The XML to JSON tool handles XML data sources that need to become CSV via JSON. The Diff Checker verifies CSV output matches expected structure. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'JSON to CSV Converter — Flatten JSON to Spreadsheet Free',
    description: 'Convert JSON arrays to CSV format for spreadsheets and databases. Flattens nested objects and handles arrays. Runs entirely in your browser.',
    slug: 'json-to-csv',
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
