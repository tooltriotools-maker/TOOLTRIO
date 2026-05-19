import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Format Guide — US ZIP Code Rules and Formats 2026 | TOOLTRIO',
  description: 'Complete guide to US ZIP code formats: 5-digit, ZIP+4, military, PO Box, and special codes. Learn ZIP code structure and rules. Free reference.',
  keywords: ['zip code format', 'us zip code format guide', 'zip code format rules', 'zip+4 format', 'zip code structure', '5 digit zip code format', 'how to format zip code', 'zip code format usa', 'zip code formatting rules'],
}
const relatedTools = [
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP Code Generator',href:'/zip/zip-code-generator',icon:'⚡'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'📬'},
]
const tips = ['Always store ZIP codes as text (VARCHAR), never as integers — leading zeros will be lost.', 'ZIP+4 format is NNNNN-NNNN — include the hyphen when storing or displaying.', 'Military APO/FPO/DPO ZIPs are valid US ZIP codes and follow standard formatting rules.']
const seoContent = {
  heading: 'ZIP Code Format Guide — Complete Reference for US ZIP Code Formats and Rules',
  body: 'US ZIP codes follow specific formatting rules that determine how they are written, stored in databases, and processed by postal systems. This comprehensive guide covers the structure of 5-digit ZIP codes, ZIP+4 codes, military ZIP codes, PO Box ZIP codes, and common formatting pitfalls to avoid in software and database applications.\n\n**Standard 5-Digit ZIP Code Format**\n\nThe standard US ZIP code is a 5-digit numeric string: NNNNN. Examples: 90210, 10001, 02134 (note the leading zero). Critical formatting rule: ZIP codes must always be stored and displayed as 5-character strings, never as integers. ZIP codes that begin with 0 (Connecticut, Maine, Massachusetts, New Hampshire, New Jersey, Rhode Island, Vermont, parts of New York, Puerto Rico) will lose their leading zero if stored as an integer, becoming a 4-digit number that fails postal validation. In SQL: use VARCHAR(5) or CHAR(5) — never INT or NUMERIC. In spreadsheets: format the ZIP column as Text before entering data.\n\n**ZIP+4 Format**\n\nThe extended ZIP+4 code format is NNNNN-NNNN — five digits, a hyphen, four digits. Example: 90210-1234. The 4-digit extension identifies digits 1–2 as the sector (a block of streets or group of P.O. Boxes) and digits 3–4 as the segment (one side of a block, specific floors, etc.). When storing ZIP+4: use VARCHAR(10) in databases. Never strip the hyphen — it is part of the standardized format.\n\n**Military ZIP Code Formats**\n\nMilitary ZIP codes serve overseas US military installations through APO (Army/Air Force Post Office), FPO (Fleet Post Office), and DPO (Diplomatic Post Office) addresses. They use standard 5-digit ZIP codes in specific ranges: APO AA (Americas) 340xx, APO AE (Europe/Middle East/Africa) 090xx–098xx, and APO AP (Pacific) 962xx–966xx.\n\n**Regex Validation**\n\nFor software validation of US ZIP codes: 5-digit only: /^\\d{5}$/ and 5-digit or ZIP+4: /^\\d{5}(-\\d{4})?$/. Always validate after ensuring the input is zero-padded to 5 digits.',
  faqs: [
    {q:'Why do some ZIP codes have only 4 digits when I look them up?',a:'A ZIP code stored as an integer loses its leading zero. ZIP codes 01000–09999 require the leading zero. Always store ZIP codes as text/string, not as a number.'},
    {q:'What does the hyphen in a ZIP+4 code mean?',a:'The hyphen separates the 5-digit base ZIP from the 4-digit sector-segment extension. It is part of the standardized ZIP+4 format and should not be stripped.'},
    {q:'Are there any letters in a US ZIP code?',a:'No. US ZIP codes are entirely numeric. Do not confuse with Canadian postal codes, which use the format A1A 1A1 (alternating letters and numbers).'},
    {q:'What ZIP codes does Puerto Rico use?',a:'Puerto Rico uses ZIP codes in the 00600–00988 range, all beginning with 006, 007, or 009.'},
    {q:'How should I format a ZIP code in a SQL database?',a:'Use VARCHAR(5) for 5-digit ZIPs or VARCHAR(10) for ZIP+4 format. Never use INT — you will lose leading zeros and corrupt data for New England and Puerto Rico ZIPs.'},
    {q:'What is the 9-digit ZIP code called?',a:'The 9-digit ZIP code (NNNNN-NNNN) is called ZIP+4. It was introduced by USPS in 1983 to enable finer sorting and carrier route identification.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP Code Format Guide'} description={'Complete reference guide to US ZIP code formats, types, and formatting rules.'} icon={'📖'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
