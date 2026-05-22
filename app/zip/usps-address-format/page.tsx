import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'USPS Address Format — Official US Mailing Address Format Guide 2026',
  description: 'Learn the correct USPS address format for letters, packages, and bulk mail. Complete guide to US mailing address standards including abbreviations and formatting rules. Free on TOOLTRIO — no signup needed.',
  keywords: ['usps address format','us mailing address format','correct address format usa','usps address format guide','how to format us address','mailing address format united states','usps standard address format','address format for usps','us address format street','postal address format usa','usps address line format','correct way to write us address','usps addressing standards','domestic address format usa','address format mail usa',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'🏷️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]

const tips = [
  'USPS recommends ALL CAPS for machine-readable addresses on envelopes — though mixed case is accepted.',
  'Always include the ZIP code on the last line with city and state: CITY ST 12345.',
  'The return address goes in the upper-left corner; the delivery address goes in the center of the envelope.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '📬', title: `USPS Publication 28`, desc: `Reference for all official USPS domestic addressing standards and abbreviations.`, bullets: [] },
    { icon: '🏙️', title: `State Abbreviations`, desc: `All 50 states + DC + territories with official 2-letter USPS abbreviations.`, bullets: [] },
    { icon: '✅', title: `Machine Readable`, desc: `Formatting guide ensures OCR and automated sorting equipment can read your mail.`, bullets: [] },
  ],

  heading: `USPS Address Format — The Official Standards for US Mailing Addresses`,
  populationChart: {
    title: 'USPS Address Line Components — Standard Domestic Address Structure',
    subtitle: 'Each line serves a specific sorting and routing function in USPS automation',
    unit: 'characters max per line',
    bars: [
      { label: 'Recipient name line', value: 40 },
      { label: 'Secondary (company)', value: 40 },
      { label: 'Delivery address line', value: 46 },
      { label: 'City State ZIP line', value: 28 },
      { label: 'Return address lines', value: 40 },
      { label: 'International country line', value: 40 },
    ],
  },
  statsTable: [
    { label: 'Standard line order', value: 'Name → Delivery Address → City State ZIP' },
    { label: 'State abbreviation style', value: '2-letter USPS abbreviation (CA, NY, TX)' },
    { label: 'ZIP code position', value: 'After state, separated by 2 spaces' },
    { label: 'USPS recommended case', value: 'ALL CAPS for automation; mixed accepted' },
    { label: 'Max address lines', value: 'Up to 6 lines for domestic' },
    { label: 'Font recommendation', value: '10–12pt sans-serif for OCR readability' },
  ],
  body: `Properly formatted US mailing addresses are essential for reliable mail delivery, package shipping, bulk mail qualification, and address database integrity. The United States Postal Service (USPS) publishes comprehensive addressing standards in Publication 28 (Postal Addressing Standards) that define how every element of a domestic address should be formatted and ordered. Following these standards ensures your mail is machine-readable, processed efficiently, and delivered accurately.

**Standard USPS Domestic Address Format**

A correctly formatted USPS domestic address consists of up to six lines, ordered as follows:

**Line 1: Recipient Name (or Attention Line)**
The name of the individual, company department, or attention designation. Examples: JOHN SMITH; ACME CORPORATION; ATTN ACCOUNTS PAYABLE.

**Line 2: Secondary Addressee (if applicable)**
The company or organization name when Line 1 is an individual name within a company. Example: When mailing to John Smith at Acme Corporation, Line 1 = JOHN SMITH, Line 2 = ACME CORPORATION.

**Line 3: Delivery Address Line**
The street address including house/building number, pre-directional (if any), street name, street type abbreviation, post-directional (if any), and secondary unit designator and number. Examples: 123 MAIN ST; 456 N ELM AVE APT 2B; 789 W BROADWAY STE 400.

**Line 4: City, State, and ZIP Code**
The city name, followed by exactly two spaces (or a comma and space), followed by the 2-letter state abbreviation, followed by exactly two spaces (or one space), followed by the 5-digit ZIP code or ZIP+4. Example: NEW YORK NY 10001 or NEW YORK NY 10001-1234.

**USPS Street Type Abbreviations**

USPS maintains a complete list of approved street type abbreviations. The most common: ALLEY → ALY, AVENUE → AVE, BOULEVARD → BLVD, CIRCLE → CIR, COURT → CT, DRIVE → DR, EXPRESSWAY → EXPY, FREEWAY → FWY, HIGHWAY → HWY, LANE → LN, PARKWAY → PKWY, PLACE → PL, PLAZA → PLZ, ROAD → RD, SQUARE → SQ, STREET → ST, TERRACE → TER, TRAIL → TRL, TURNPIKE → TPKE, WAY → WAY.

**Directional Abbreviations**

Pre- and post-directionals are abbreviated: NORTH → N, SOUTH → S, EAST → E, WEST → W, NORTHEAST → NE, NORTHWEST → NW, SOUTHEAST → SE, SOUTHWEST → SW. Examples: 123 N MAIN ST (North Main Street), 456 MAPLE AVE NW (Maple Avenue Northwest).

**Secondary Unit Designators**

Secondary unit designators indicate unit type within a multi-unit building. USPS standards: APARTMENT → APT, SUITE → STE, UNIT → UNIT, FLOOR → FL, BUILDING → BLDG, ROOM → RM, DEPARTMENT → DEPT. Examples: 456 OAK ST APT 3C; 789 BROADWAY STE 200; 100 MAIN ST FL 5.

**State Abbreviations**

USPS 2-letter state abbreviations (always capitalized): Alabama-AL, Alaska-AK, Arizona-AZ, Arkansas-AR, California-CA, Colorado-CO, Connecticut-CT, Delaware-DE, Florida-FL, Georgia-GA, Hawaii-HI, Idaho-ID, Illinois-IL, Indiana-IN, Iowa-IA, Kansas-KS, Kentucky-KY, Louisiana-LA, Maine-ME, Maryland-MD, Massachusetts-MA, Michigan-MI, Minnesota-MN, Mississippi-MS, Missouri-MO, Montana-MT, Nebraska-NE, Nevada-NV, New Hampshire-NH, New Jersey-NJ, New Mexico-NM, New York-NY, North Carolina-NC, North Dakota-ND, Ohio-OH, Oklahoma-OK, Oregon-OR, Pennsylvania-PA, Rhode Island-RI, South Carolina-SC, South Dakota-SD, Tennessee-TN, Texas-TX, Utah-UT, Vermont-VT, Virginia-VA, Washington-WA, West Virginia-WV, Wisconsin-WI, Wyoming-WY, District of Columbia-DC.

**P.O. Box Format**

Post Office Box addresses: PO BOX [number]. Examples: PO BOX 1234 or PO BOX 9999. The P.O. Box address is used instead of the street address when the recipient mail is routed to a box rather than a physical location. P.O. Box addresses use the ZIP code of the post office, which may differ from the street delivery ZIP for the same location.

**Rural Route and Highway Contract Route**

Rural routes: RR [number] BOX [number]. Example: RR 3 BOX 45. Highway contract routes: HC [number] BOX [number]. Example: HC 2 BOX 128. These formats serve addresses in rural areas not served by standard carrier route delivery.

**Return Address Format**

The return address (your address, as the sender) goes in the upper-left corner of the envelope or upper-left portion of a shipping label. It uses the same format as the delivery address. Its presence ensures the item can be returned to you if undeliverable.

**Addressing for Automated Processing**

USPS Optical Character Recognition (OCR) and barcode readers process addresses automatically. For machine readability: use ALL CAPS (though mixed case is accepted by modern OCR); use a sans-serif font at 10–12pt; leave at least 1/8 inch margins on all sides; ensure good contrast between ink and envelope; avoid decorative fonts or handwriting if automated processing is important.`,
  faqs: [
    { q: 'My mailing was returned \'Undeliverable As Addressed\' even though I used the right ZIP. What format error caused this?', a: `Common format errors that cause UAAA returns: (1) City name not matching ZIP — you can write 'Manhattan' but if USPS only recognizes 'New York' for that ZIP, it may be returned. (2) Street type missing — '123 Oak' instead of '123 Oak ST'. (3) Directional missing — '456 North Main' when USPS record shows '456 N Main St'. (4) Unit designator wrong — 'Apt' vs 'APT' (USPS prefers uppercase abbreviation on the same line as street). (5) No space between street number and name. Run addresses through our Address to ZIP tool to see the USPS-normalized format before mailing.` },
    { q: 'Should the apartment or suite number go on a separate line or the same line as the street address?', a: `USPS prefers the unit designator on the same line as the street address when it fits: '456 OAK ST APT 3B'. This is called the 'preferred format' in USPS Publication 28. A second line is acceptable when the first line would exceed 46 characters: first line = company/building name, second line = street + unit. USPS optical character readers process the delivery address line (the line immediately above city/state/ZIP) as the primary routing element — putting unit on a separate line above the street address is the less-preferred format.` },
    { q: 'What is the correct USPS abbreviation for \'Highway\' and \'Boulevard\'?', a: `USPS Publication 28 abbreviation list: Highway = HWY, Boulevard = BLVD, Street = ST, Avenue = AVE, Drive = DR, Road = RD, Lane = LN, Court = CT, Place = PL, Circle = CIR, Parkway = PKWY, Expressway = EXPY, Freeway = FWY, Terrace = TER, Trail = TRL, Turnpike = TPKE. Always use these abbreviations for automated mail processing. Using spelled-out versions ('Highway' vs 'HWY') is acceptable for First-Class but may slow processing for bulk automated mail.` },
    { q: 'How do I format an address for a high-rise building with floor and suite numbers?', a: `For complex multi-unit buildings: Line 1 = recipient name. Line 2 = company name (if applicable). Line 3 = street address + floor + suite: '100 MAIN ST FL 12 STE 1200'. USPS unit designator order: street number, street name, then primary unit (floor) then secondary unit (suite). If the full address exceeds 46 characters: split 'FL 12' onto its own line between street and city/state/ZIP as a last resort. The USPS barcode always encodes the last non-city line before city/state/ZIP.` },
    { q: 'What is the maximum character length for each line of a USPS address?', a: `USPS Publication 28 recommends maximum 40 characters for name and secondary address lines, 46 characters for the delivery address line (street + unit). The city/state/ZIP line should not exceed 46 characters (city name + 2 spaces + 2-letter state + 2 spaces + ZIP = typically 25-35 chars). Optical Character Recognition systems are optimized for these lengths. Longer lines may be truncated or misread. Font size should be 10-12pt sans-serif (Helvetica, Arial) for OCR readability.` },
    { q: 'What is the difference between a pre-directional and post-directional in a street address?', a: `Pre-directional appears before the street name: '123 N Main St' (N = North is pre-directional). Post-directional appears after the street name/type: '123 Main St NW' (NW = Northwest is post-directional). Some streets have both: '456 N Oak Ave SW'. The directional is part of the official street name in USPS records. Omitting a required directional can cause misdelivery on streets where, for example, '1234 Main St' (no directional) is an unrecognized address but '1234 N Main St' and '1234 S Main St' both exist.` },
    { q: 'How should I format a Canadian address on a letter mailed from the US?', a: `Canadian address format (from USPS perspective): Recipient Name, Street Address, City PROVINCE POSTAL_CODE, CANADA. The country name must be on the last line in all caps: CANADA. The postal code is alphanumeric (e.g., M5V 2T6). Use Canada Post standard province abbreviations (ON=Ontario, BC=British Columbia, QC=Quebec). International mail from the US to Canada is addressed in US-standard block format with the country name as the final line.` },
    { q: 'Does USPS require all caps or is mixed case acceptable?', a: `Mixed case is accepted and delivered correctly. USPS recommends ALL CAPS for automated processing environments because it eliminates case-related OCR ambiguity (lowercase 'l' vs '1', 'O' vs '0'). Modern OCR systems handle mixed case well for individual pieces. For bulk automated mail seeking the deepest automation discounts, ALL CAPS on printed addresses ensures maximum machine readability. For personal correspondence and business letters, mixed case is perfectly fine.` },
    { q: 'What is a USPS Delivery Confirmation barcode and how does it differ from a tracking number?', a: `Delivery Confirmation (now integrated into USPS Tracking) is a barcode on the package or envelope that records scans at processing facilities and at delivery. It is distinct from the Intelligent Mail barcode (IMb) on individual letter envelopes that encodes ZIP+4 for sorting. Every USPS First-Class Package, Priority Mail, and Ground Advantage shipment includes a 22-digit Tracking Number that enables full scan-based tracking. Standard First-Class letter stamps do not include delivery tracking.` },
    { q: 'How should I address mail to Alaska or Hawaii — is there anything different?', a: `Alaska and Hawaii use standard US address format with no special formatting. Alaska uses AK as state abbreviation, ZIP codes 995-999. Hawaii uses HI, ZIP codes 967-968. No special country or territory designation is needed — they are US states. Mail is delivered by USPS standard service with the same First-Class timing as continental US (though actual delivery may take 1-2 additional days for Alaska and Hawaii due to air transport logistics).` },
    { q: 'What font and size should I use for addresses on envelopes to maximize OCR readability?', a: `USPS recommends: sans-serif fonts (Helvetica, Arial, Univers) at 10-12pt size. Avoid decorative, script, or italic fonts — OCR performs poorly on these. Minimum contrast: black ink on white paper (or very light-colored envelope). Minimum clear zone: 1/2 inch from left edge, 5/8 inch from bottom edge, 1/2 inch from right edge. These zones must be free of any printing to allow barcode application area. Reject address labels printed at angles — USPS sorters expect horizontal text.` },
    { q: `Is the USPS Address Format Guide on TOOLTRIO free?`, a: `Yes — completely free. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) at tooltrio.com provides the USPS Address Format Guide as part of 35+ free ZIP code tools.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="USPS Address Format" description="Complete guide to official USPS mailing address format rules and standards." icon="📬" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"USPS Address Format — Official US Mailing Address Format Guide 2026\",\"description\":\"Learn the correct USPS address format for letters, packages, and bulk mail. Complete guide to US mailing address standards including abbreviations and\",\"url\":\"https://tooltrio.com/zip/usps-address-format\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
