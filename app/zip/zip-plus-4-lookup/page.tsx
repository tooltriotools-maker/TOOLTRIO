import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP+4 Lookup — Find ZIP+4 Code for Any US Address 2026',
  description: 'Look up the ZIP+4 code for any US address. Find the full 9-digit ZIP code (ZIP plus 4) for precise mail sorting and bulk mail discounts. Free tool. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip plus 4 lookup','zip+4 code finder','9 digit zip code lookup','zip code plus 4','find zip+4 code','zip 4 digit extension','full zip code lookup','zip plus four finder','us 9 digit zip code','zip code 4 digit suffix','zip+4 code search','postal zip+4 lookup','zip code extended lookup','zip plus 4 address lookup','usps zip+4 lookup free',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'🏷️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]

const tips = [
  'ZIP+4 codes are required for USPS bulk mail presort discounts of 10–20 cents per piece.',
  'The 4-digit add-on code identifies a specific block, building floor, or P.O. Box within the 5-digit ZIP.',
  'USPS updates ZIP+4 assignments when new addresses are added or buildings change — use current data for mailing.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '🔢', title: `9-Digit Precision`, desc: `ZIP+4 identifies a specific city block face or building floor — beyond standard ZIP granularity.`, bullets: [] },
    { icon: '💰', title: `Postage Savings`, desc: `ZIP+4 qualifies bulk mailers for 10–20 cent per piece postage discounts on presort mailings.`, bullets: [] },
    { icon: '✅', title: `DPV Validation`, desc: `Delivery Point Validation — confirms address is deliverable, not just validly formatted.`, bullets: [] },
  ],

  heading: `ZIP+4 Code Lookup — What the ZIP+4 Extension Means and How to Use It`,
  populationChart: {
    title: 'Postage Savings from ZIP+4 and Delivery Point Barcode (DPB)',
    subtitle: 'Bulk mailers can save 10–20¢ per piece by using full ZIP+4 / DPB barcoding',
    unit: 'cents saved per piece',
    bars: [
      { label: 'First-Class presort', value: 7 },
      { label: 'First-Class carrier-rt', value: 10 },
      { label: 'Standard presort', value: 12 },
      { label: 'Standard carrier-rt', value: 18 },
      { label: 'Marketing mail', value: 15 },
      { label: 'Periodicals presort', value: 8 },
    ],
  },
  statsTable: [
    { label: 'ZIP+4 format', value: 'NNNNN-NNNN (10 characters)' },
    { label: '4-digit add-on granularity', value: 'City block, building, P.O. Box, floor' },
    { label: 'Total US ZIP+4 codes', value: 'Hundreds of millions (every address)' },
    { label: 'USPS update frequency', value: 'Weekly via AMS database' },
    { label: 'Bulk mail presort requirement', value: 'ZIP+4 or delivery point barcode' },
    { label: 'Delivery point barcode (DPB)', value: '11-digit code for individual address' },
  ],
  body: `The ZIP+4 code — the full 9-digit US ZIP code — extends the basic 5-digit ZIP with 4 additional digits that pinpoint a specific delivery location to within a city block, building, floor, or individual P.O. Box. Understanding ZIP+4 is essential for bulk mailers seeking postage discounts, address verification systems, and any application that needs the highest level of postal precision. Our ZIP+4 Lookup tool helps you find the full 9-digit code for any US address or ZIP code.

**What the 4-Digit Add-On Code Represents**

The 4-digit suffix added after a hyphen to the 5-digit ZIP narrows the delivery point through two additional levels of geographic precision.

The **first two digits of the add-on code** (digits 6 and 7 of the full 9-digit ZIP) identify a **sector** — typically a group of streets, buildings, or P.O. Boxes within the delivery zone. In a residential neighborhood, a sector might correspond to a few city blocks. In a downtown area, it might correspond to one side of a single city block. In a high-rise building, it might correspond to a floor or a range of floors.

The **last two digits of the add-on code** (digits 8 and 9) identify a **segment** — the final delivery unit within the sector. In a residential context, a segment typically corresponds to one side of one block. In a building, a segment might correspond to a specific office suite or apartment range.

This four-level hierarchy (region → SCF → delivery zone → sector/segment) provides the postal infrastructure for highly efficient automated mail sorting. Mail with a full ZIP+4 barcode can be sorted to the individual delivery sequence without any manual handling.

**The Delivery Point Barcode (DPB)**

The highest level of postal precision is the **Delivery Point Barcode (DPB)** — an 11-digit code that uniquely identifies every deliverable address in the US. The DPB is derived from the ZIP+4 plus two additional digits: the delivery point code (the last two digits of the street number, or a P.O. Box number suffix). USPS POSTNET and Intelligent Mail barcodes encode the DPB on mail pieces, enabling fully automated delivery sequence sorting.

Mailers who use DPB barcodes on qualifying mail qualify for the deepest automation discounts in USPS pricing — Carrier Route presort rates, which can save 15–20 cents per piece compared to non-barcoded standard rates.

**ZIP+4 for Bulk Mail Discounts**

USPS offers a tiered discount structure for bulk mail based on the level of address precision and presort depth:
- **Presort First-Class**: 5-digit sort — save ~3–5¢/piece; 3-digit sort — save ~5–7¢/piece; carrier route presort with ZIP+4 — save ~9–11¢/piece
- **Marketing Mail (formerly Standard Mail)**: 5-digit presort — save ~10¢/piece; carrier route presort — save ~18¢/piece
- **Periodicals**: Similar tiered structure

For an organization mailing 100,000 pieces monthly, the difference between basic presort and carrier-route ZIP+4 presort can represent $10,000–$15,000 in annual postage savings. This makes ZIP+4 lookup and address standardization a financially significant investment for high-volume mailers.

**How ZIP+4 Codes Are Assigned**

USPS assigns ZIP+4 codes through its **Address Management System (AMS)**, which maintains a database of every deliverable address in the United States. New addresses receive ZIP+4 assignments when USPS processes the address through AMS — typically when a new building is constructed, a new development is platted, or a rural route is renumbered. ZIP+4 codes are updated weekly as USPS adds new addresses and retires old ones.

The USPS City State API and Address Information Center products provide programmatic access to ZIP+4 data for high-volume address processing. Third-party CASS (Coding Accuracy Support System) certified software can append ZIP+4 codes to address files in bulk — a requirement for mailers applying for automation discount rates.

**ZIP+4 for Address Verification**

ZIP+4 lookup is a key step in address verification workflows. If an address returns a valid ZIP+4 code, it means USPS has a delivery record for that address — providing strong evidence that the address is real and deliverable. Addresses that fail ZIP+4 lookup may be undeliverable (non-existent street numbers), outside the USPS delivery area (rural addresses not served by carrier delivery), or require correction (transposed street number, wrong city).

Address verification using ZIP+4 is used in: e-commerce checkout to reduce failed delivery attempts; financial services for Know Your Customer (KYC) address verification; insurance for risk location validation; CRM data hygiene to identify non-deliverable records before a mailing.

**CASS Certification**

Mail processing software that appends ZIP+4 codes must meet USPS Coding Accuracy Support System (CASS) standards to qualify for bulk mail automation discounts. CASS-certified software is tested against USPS address database to ensure accuracy rates above specified thresholds. USPS publishes a list of CASS-certified products. Our ZIP+4 Lookup tool provides lookup capability for individual address verification; high-volume batch processing for mailing list preparation should use CASS-certified software.`,
  faqs: [
    { q: 'What exactly do the 4 extra digits in a ZIP+4 code represent?', a: `The 4-digit suffix encodes two levels of precision beyond the 5-digit ZIP. Digits 6-7 (the 'sector') identify a specific group of streets, a building, or a cluster of P.O. Boxes. Digits 8-9 (the 'segment') identify one side of one city block, or a specific floor range in a building, or an individual P.O. Box number range. Example: ZIP+4 10001-1234 — '12' narrows to a sector in Midtown Manhattan, '34' narrows to a specific block face or building. This precision enables USPS barcode sorters to sequence mail in exact carrier delivery order.` },
    { q: 'How do I qualify for USPS bulk mail discounts using ZIP+4 codes?', a: `To qualify for presort automation rates: (1) Your mailing must meet minimum volume thresholds (500 pieces for First-Class, 200 for Marketing Mail). (2) Each piece must have a valid ZIP+4 appended to the delivery address. (3) Pieces must be sorted by ZIP+4 and placed in trays/sacks in the required order. (4) A USPS-approved postage statement must be submitted. The discount for First-Class with carrier route presort is approximately 9-11 cents per piece. For Marketing Mail, up to 18 cents per piece. On 100,000 pieces, that is $9,000-18,000 in savings.` },
    { q: 'My address lookup returns a ZIP+4 of 9999 — is that a real code?', a: `The suffix 9999 is used by USPS for addresses that are valid but do not have a more specific delivery point code assigned — often new construction, rural addresses with simplified route codes, or certain government facilities. It is not an error. The USPS will deliver to the address; the 9999 suffix simply means the full 11-digit delivery point barcode cannot be assigned. For mailing list purposes, addresses with 9999 suffixes may receive slightly less favorable automation discounts than precisely coded addresses.` },
    { q: 'How does ZIP+4 enable carrier route presort and why does it save so much postage?', a: `USPS automation discounts are layered by sort depth. Basic 5-digit presort requires mailers to sort by ZIP — USPS still does significant downstream sorting. ZIP+4 presort enables USPS to go directly to the final carrier route, bypassing multiple intermediate sort steps. Carrier route presort is the deepest sort level — mail is ordered in the exact sequence the letter carrier walks their route. Because USPS avoids multiple sort operations, they pass the savings to the mailer. The postal arithmetic: human sort costs ~$0.07 per piece per sort pass; avoiding 2-3 sort passes saves $0.14-$0.21 per piece.` },
    { q: 'Can I look up ZIP+4 for a P.O. Box address?', a: `Yes. P.O. Box addresses have ZIP+4 codes derived from the box number. The 4-digit suffix for a P.O. Box is calculated from the box number: boxes 1-99 get a suffix derived from the box number range. USPS publishes the exact algorithm. Example: P.O. Box 1234 at the main post office serving ZIP 60601 would have a specific ZIP+4 that encodes that box sort position. Enter 'PO BOX 1234, CHICAGO, IL' in our tool to retrieve the full ZIP+4.` },
    { q: 'I have 500,000 addresses in a database without ZIP+4. How do I append them in bulk?', a: `Bulk ZIP+4 appending requires CASS-certified software or a commercial address standardization service. Options: (1) USPS Web Tools Address Validation API (free, requires USPS account, rate limited). (2) SmartyStreets LiveAddress API — pay-per-request, high accuracy. (3) Melissa Data Address Object — batch processing, monthly subscription. (4) Geocodio — bulk CSV upload, per-record pricing. These services normalize addresses, append ZIP+4, and return DPV confirmation. For 500,000 records, expect $50-200 depending on provider.` },
    { q: 'Is a ZIP+4 code permanent or does it change?', a: `ZIP+4 codes can change when USPS reorganizes delivery routes, when carrier assignments change, or when new addresses are added to an area. USPS updates ZIP+4 assignments weekly through the AMS database. High-growth areas see more frequent changes. For critical mailing applications (legal notices, financial statements), re-verify ZIP+4 codes against current USPS data no more than 90 days before mailing. For general marketing mail, annual refresh is usually sufficient.` },
    { q: 'What is a Delivery Point Barcode (DPB) and how does it relate to ZIP+4?', a: `The Delivery Point Barcode (DPB) is an 11-digit code that uniquely identifies every deliverable address in the US. It is calculated from the ZIP+4 plus two additional digits: the 'delivery point' suffix derived from the last two digits of the street number (for street addresses) or from the P.O. Box number. The DPB is encoded into USPS POSTNET or Intelligent Mail Barcodes printed on envelopes. Pieces with DPB barcodes qualify for the deepest automation discounts and are processed entirely by machine without manual handling.` },
    { q: 'Why does the same physical address have different ZIP+4 codes for different carriers?', a: `The ZIP+4 code is defined by USPS specifically for USPS delivery routing. FedEx and UPS have their own internal routing systems that do not use ZIP+4. When you look up ZIP+4 for a shipping label, it is relevant only for USPS shipments. FedEx and UPS use their own zone/district codes derived from their proprietary routing networks, which sometimes differ from USPS geography. Do not apply USPS ZIP+4 to non-USPS carrier labels.` },
    { q: 'Does ZIP+4 affect how quickly a letter is delivered?', a: `Yes — significantly for bulk mailings, less so for individual letters. First-Class single-piece mail is processed by OCR readers that often auto-assign ZIP+4 from the address. Bulk presorted mail with pre-printed ZIP+4 barcodes bypasses OCR reading and goes directly to carrier sequence sorting, arriving 1-2 days earlier than equivalent mail without barcodes. For individual First-Class stamps, the difference is typically not noticeable as OCR processing handles address interpretation.` },
    { q: 'What is CASS Form 3553 and when do I need it?', a: `CASS Form 3553 is the certification report generated by CASS-certified software after processing a mailing list. It documents the accuracy rate of your address standardization and ZIP+4 assignment — required by USPS for bulk mail qualification. Your software generates this automatically. To claim automation presort discounts at the post office, you must present Form 3553 showing your list achieved USPS minimum accuracy thresholds (typically 95%+ for address matches). Retain for one year for audit purposes.` },
    { q: `Is the ZIP+4 Lookup on TOOLTRIO free?`, a: `Yes — completely free, no account required. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) at tooltrio.com provides ZIP+4 Lookup as part of 35+ free ZIP code tools.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP+4 Lookup" description="Find the full 9-digit ZIP+4 code for any US address or ZIP code." icon="🔢" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP+4 Lookup — Find ZIP+4 Code for Any US Address 2026\",\"description\":\"Look up the ZIP+4 code for any US address. Find the full 9-digit ZIP code (ZIP plus 4) for precise mail sorting and bulk mail discounts. Free tool. Fr\",\"url\":\"https://tooltrio.com/zip/zip-plus-4-lookup\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
