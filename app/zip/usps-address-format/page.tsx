import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'USPS Address Format — Correct US Address Formatting Guide 2026 | TOOLTRIO',
  description: 'Format any US mailing address to USPS standards. Get the correct address format with ZIP+4, city, state, and delivery point. Free USPS address formatter.',
  keywords: ['usps address format', 'correct address format usa', 'usps mailing address format', 'address formatting tool usps', 'how to format a us address', 'usps standard address format', 'address standardization usa', 'correct us postal address format', 'zip code address format'],
}
const relatedTools = [
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'ZIP Code Generator',href:'/zip/zip-code-generator',icon:'⚡'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
  {name:'Area Code by ZIP',href:'/zip/area-code-by-zip',icon:'📱'},
]
const tips = ['Use all-caps and USPS abbreviations (ST, AVE, BLVD) for best automated processing.', 'Always put apartment numbers on the same line as the street address.', 'Add ZIP+4 whenever possible — it speeds delivery and qualifies bulk mail for postage discounts.']
const seoContent = {
  heading: 'USPS Address Format — Complete Guide to Correct US Mailing Address Formatting',
  body: "Properly formatted mailing addresses are the foundation of successful US mail delivery. The United States Postal Service (USPS) has specific formatting standards that, when followed, ensure mail is processed automatically by optical character recognition (OCR) equipment, sorted to the correct carrier route, and delivered without delay.\n\n**The USPS Standard Address Format**\n\nA properly formatted US mailing address consists of three lines. Line 1 is the recipient name or company. Line 2 is the delivery address (123 MAIN ST APT 4B or PO BOX 456). Line 3 is city, state, and ZIP (SPRINGFIELD IL 62701-1234).\n\nKey formatting rules: USPS prefers all-uppercase addresses for automated sorting equipment. Eliminate periods after abbreviations (ST not ST., APT not APT.) for OCR compatibility. Use USPS-standard directional (N, S, E, W, NE, SW) and street suffix (ST, AVE, BLVD, DR, LN, RD, CT, PL) abbreviations. The last line must contain city, 2-letter state, and 5-digit or ZIP+4 on the same line.\n\n**Why Correct Address Formatting Matters**\n\nUSPS processes over 400 million pieces of mail per day using high-speed automated sorting equipment. This equipment relies on OCR to read addresses and barcode them for carrier-route sorting. Addresses that don't conform to USPS standards may fail OCR processing and be redirected to manual handling — slowing delivery and increasing costs. For bulk mailers, non-standard addresses can result in surcharges or the loss of automation discounts.\n\n**ZIP+4 in USPS Formatted Addresses**\n\nThe ZIP+4 code (e.g., 62701-1234) is the USPS-preferred format because it routes mail to the specific block segment, reducing sorting steps. Bulk mailers who include ZIP+4 codes qualify for significant postage discounts — up to 20% on First Class mail — under USPS automation pricing.",
  faqs: [
    {q:'Should I use all caps for USPS mail?',a:'USPS prefers all-uppercase addresses for OCR processing. For personal letters, mixed case is acceptable — USPS equipment handles both — but all-caps is the standard for business and bulk mail.'},
    {q:'What is the correct abbreviation for Street vs. Avenue?',a:'Street abbreviates to ST, Avenue to AVE. Always use the USPS-standard abbreviation without a trailing period.'},
    {q:'How do I format an apartment address?',a:"Include the apartment designator on the same line as the street address: '123 MAIN ST APT 4B'. Never put the apartment number on a separate line."},
    {q:'What is a delivery point barcode?',a:'The DPBC is a barcode printed by USPS on each piece of mail that encodes the full ZIP+4 plus a 2-digit delivery point number unique to each mailbox. Mailers who pre-barcode their mail qualify for the largest automation discounts.'},
    {q:'How do I format a PO Box address?',a:"Line 2 should read 'PO BOX 123' (no periods, no space in PO). Never use 'P.O. BOX' or 'POST OFFICE BOX' — use the standard 'PO BOX' abbreviation."},
    {q:'What is CASS certification?',a:'CASS (Coding Accuracy Support System) is a USPS program that certifies address validation software for accuracy. CASS-certified systems are required for bulk mailers to qualify for automation postage discounts.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'USPS Address Format'} description={'Format any US address to USPS postal standards with correct capitalization and ZIP+4.'} icon={'📬'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
