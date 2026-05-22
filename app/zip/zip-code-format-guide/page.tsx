import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Format Guide — US ZIP Code Format Rules 2026',
  description: 'Complete guide to US ZIP code formats, types, ZIP+4, leading zeros, and best practices for storing and validating ZIP codes. Free reference guide. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip code format','zip code format guide','us zip code format','zip code format rules','zip code leading zero','zip+4 format','zip code format regex','how to format zip code','zip code format usa','5 digit zip code format','zip code format validation','zip code format best practices','zip plus 4 format','zip code string format','zip code database format',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'🏷️'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP Code Generator',href:'/zip/zip-code-generator',icon:'⚡'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
]

const tips = [
  'Always store ZIP codes as strings (VARCHAR/TEXT), never as integers — integers silently drop leading zeros.',
  'Use the regex /^\d{5}(-\d{4})?$/ to validate ZIP code format before database validation.',
  'The ZIP+4 format (12345-6789) qualifies bulk mailers for significant USPS postage discounts.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '📖', title: `5-Digit vs ZIP+4`, desc: `Full comparison of 5-digit standard ZIP and 9-digit ZIP+4 extended formats.`, bullets: [] },
    { icon: '⚠️', title: `Leading Zero Alert`, desc: `Critical guide on preserving leading zeros — the #1 ZIP code storage error in databases.`, bullets: [] },
    { icon: '🔧', title: `Regex Patterns`, desc: `Ready-to-use regex validation patterns for JavaScript, Python, SQL, and more.`, bullets: [] },
  ],

  heading: `US ZIP Code Format Guide — Everything About ZIP Code Structure and Storage`,
  populationChart: {
    title: 'US ZIP Code Leading-Zero States and Their ZIP Prefix Ranges',
    subtitle: '8 states + Puerto Rico + USVI have ZIPs starting with 0 — must be stored as text',
    unit: 'ZIP range start',
    bars: [
      { label: 'Connecticut', value: 60 },
      { label: 'Massachusetts', value: 1 },
      { label: 'New Hampshire', value: 30 },
      { label: 'New Jersey', value: 70 },
      { label: 'Maine', value: 39 },
      { label: 'Rhode Island', value: 28 },
      { label: 'Vermont', value: 50 },
      { label: 'Puerto Rico', value: 6 },
    ],
  },
  statsTable: [
    { label: '5-digit ZIP regex', value: '^\d{5}$' },
    { label: 'ZIP+4 regex', value: '^\d{5}(-\d{4})?$' },
    { label: 'Leading-zero states', value: 'CT, MA, ME, NH, NJ, RI, VT + parts of NY + PR + USVI' },
    { label: 'Database type', value: 'VARCHAR(5) or TEXT — never INT' },
    { label: 'ZIP+4 total length', value: '10 characters including hyphen' },
    { label: 'USPS update frequency', value: 'Quarterly ZIP code changes' },
  ],
  body: `Understanding the correct format for US ZIP codes is foundational to building reliable address systems, data pipelines, and form validations. ZIP codes look deceptively simple — just 5 digits — but the details of format, type, leading zeros, ZIP+4 extensions, and storage conventions are sources of frequent errors in real-world applications. This guide covers every aspect of US ZIP code formatting and best practices.

**The Basic 5-Digit ZIP Code Format**

A standard US ZIP code is exactly 5 digits, formatted as NNNNN. Each digit position carries geographic meaning. The **first digit** (0–9) identifies one of 10 national delivery regions. The **second and third digits** together identify a Sectional Center Facility (SCF) — a regional mail processing hub. The **fourth and fifth digits** identify the specific local delivery zone served by a post office.

Valid 5-digit ZIP codes range from 00001 to 99999, but only approximately 42,074 values in this range are active. Many 5-digit numbers are not assigned to any ZIP code. Format validation (checking that input is 5 digits) is necessary but not sufficient — always follow with a database lookup to confirm the ZIP is active.

**The ZIP+4 Extended Format**

The full ZIP+4 format adds a hyphen and 4 additional digits to the 5-digit ZIP: **NNNNN-NNNN**. The 4-digit suffix (called the "add-on code") narrows the delivery point to a specific city block, building, or P.O. Box. ZIP+4 format enables delivery point precision that is used for postal workshopping and barcode sorting.

Using ZIP+4 on bulk mailings qualifies mailers for significant USPS postage discounts. Presort Standard mail and Presort First-Class mail require ZIP+4 or delivery point barcodes. The discount can be 10–20 cents per piece — meaningful at scale for organizations mailing thousands of pieces monthly.

Regex for ZIP+4 validation: '^\d{5}(-\d{4})?$' in JavaScript, 'r'^\d{5}(-\d{4})?$'' in Python. This accepts either 5-digit or full ZIP+4 format.

**The Leading Zero Problem: The Most Common ZIP Code Error**

ZIP codes in eight states, Puerto Rico, and the US Virgin Islands begin with the digit 0: **Connecticut** (060–069), **Maine** (039–049), **Massachusetts** (010–027), **New Hampshire** (030–038), **New Jersey** (070–089), **Rhode Island** (028–029), **Vermont** (050–059), and parts of **New York** (100 and adjacent ranges), plus **Puerto Rico** (006–009) and **US Virgin Islands** (008).

When a ZIP code like "02134" (Boston, MA) is stored as an integer in a database or spreadsheet, the leading zero is silently stripped, producing "2134" — a 4-digit value that is not a valid ZIP code and will fail all lookup operations. This error causes silent data corruption that can be difficult to detect and expensive to remediate.

**Prevention**: Always declare ZIP code columns as VARCHAR(5) or TEXT in SQL databases. In Python, represent ZIP codes as strings from the moment they arrive — never parse them with 'int()'. In JavaScript, treat ZIP input values as strings and never call 'parseInt()' on a ZIP code. In Excel, format the cell as Text before entering ZIP data, or enter with a leading apostrophe to force text treatment.

**Restoration**: If you have a dataset with truncated 4-digit ZIP codes (former leading-zero ZIPs), restore them by zero-padding to 5 digits: in SQL: 'LPAD(zip_code::TEXT, 5, '0')'; in Python: 'zip_str.zfill(5)'; in JavaScript: 'zip.padStart(5, '0')'. Then validate the restored ZIPs against the USPS database.

**ZIP Code Types and Their Format Implications**

All ZIP codes share the same 5-digit format regardless of type, but their type affects how they should be used. **Standard (S)** ZIP codes serve residential and business addresses and can receive all types of mail and packages. **P.O. Box (B)** ZIP codes serve post office box customers only — physical parcels cannot be delivered to a P.O. Box ZIP without a separate street address. **Unique (U)** ZIP codes are assigned to large organizations (government agencies, large corporations, universities) that receive enough mail to warrant their own ZIP. **Military (M)** ZIP codes serve APO (Army Post Office), FPO (Fleet Post Office), and DPO (Diplomatic Post Office) addresses routed through military postal networks.

**Storing ZIP Codes in Databases**

The correct column definition in SQL: 'zip_code VARCHAR(5) NOT NULL CHECK (zip_code ~ '^\d{5}$')'. This enforces 5-digit format at the database level. For ZIP+4, use 'VARCHAR(10)' with check constraint 'CHECK (zip_code ~ '^\d{5}(-\d{4})?$')'. In application code (Python/Django): 'models.CharField(max_length=5, validators=[RegexValidator(r'^\d{5}$')])'. Never use 'models.IntegerField()' or 'models.PositiveIntegerField()' for ZIP codes.

**Input Masking and User Experience**

Web forms can guide users to correct ZIP format with input masking: restrict the ZIP field to numeric input only, enforce a 5-character maximum, and show an error immediately if the user enters non-digits or fewer/more than 5 characters. For ZIP+4 fields, use a split input (5 digits, hyphen, 4 digits) rather than a single 10-character field — this prevents format errors and is clearer to users. After the user completes the ZIP field, auto-populate city and state using a ZIP lookup API to confirm the ZIP is valid and reduce downstream data quality issues.

**ZIP Code Format in Different Systems**

Different systems handle ZIP codes with different quirks. USPS systems use 5-digit and ZIP+4 formats as described. Canadian postal codes look similar but use a completely different format (ANA NAN — alternating letters and digits, e.g., K1A 0B1) and are distinct from US ZIPs. UK postcodes (postcode) use yet another format. When building international address systems, ensure your data model can distinguish US ZIP codes from non-US postal codes and apply the correct format validation rules for each country.`,
  faqs: [
    { q: `What is the correct format for a US ZIP code?`, a: `A standard US ZIP code is exactly 5 digits (NNNNN). The extended ZIP+4 format adds a hyphen and 4 more digits: NNNNN-NNNN. Both formats are valid for USPS addressing.` },
    { q: `What regex validates a US ZIP code?`, a: `Use /^\d{5}$/ for 5-digit ZIP only, or /^\d{5}(-\d{4})?$/ to accept both 5-digit and ZIP+4 formats. This validates format only — still verify against the USPS database for active status.` },
    { q: `Why should ZIP codes be stored as VARCHAR instead of INT?`, a: `ZIP codes starting with 0 (8 states + PR + USVI) lose their leading zero when stored as integers, turning '02134' into '2134'. Always use VARCHAR(5) or TEXT to preserve all 5 digits.` },
    { q: `What states have ZIP codes starting with 0?`, a: `Connecticut, Maine, Massachusetts, New Hampshire, New Jersey, Rhode Island, Vermont, parts of New York, Puerto Rico, and the US Virgin Islands all have ZIP codes beginning with 0.` },
    { q: `What is a ZIP+4 code and when should I use it?`, a: `ZIP+4 adds a 4-digit suffix that pinpoints a specific delivery point (block, building, or P.O. Box) within a 5-digit ZIP. It qualifies bulk mailers for postage discounts and enables precise barcode-based mail sorting.` },
    { q: `How do I restore truncated ZIP codes that lost their leading zero?`, a: `Use zero-padding: in SQL: LPAD(zip::TEXT, 5, '0'); in Python: zip_str.zfill(5); in JavaScript: zip.padStart(5, '0'). Then validate the restored ZIPs against the USPS database.` },
    { q: `What are the four ZIP code types?`, a: `Standard (S): residential/business delivery. P.O. Box (B): box pickup only. Unique (U): single large organization. Military (M): APO/FPO/DPO overseas military mail.` },
    { q: `Can ZIP codes contain letters?`, a: `No — US ZIP codes are 5 numeric digits only (or 9 digits with the ZIP+4 suffix). The only non-digit character is the hyphen separating the 5-digit and 4-digit parts in ZIP+4. Canadian postal codes use letters; they are different from US ZIPs.` },
    { q: `How should I handle ZIP code input in web forms?`, a: `Set input type to 'text' (not 'number') to preserve leading zeros. Add maxlength='10' for ZIP+4 compatibility. Use a regex pattern attribute for browser-side validation. Call a ZIP lookup API after entry to confirm validity and auto-fill city/state.` },
    { q: `What is the maximum length of a US ZIP code field?`, a: `5 characters for standard ZIP, 10 characters for ZIP+4 (5 digits + hyphen + 4 digits). Design your database column accordingly: VARCHAR(10) if supporting ZIP+4.` },
    { q: `How often does USPS change ZIP codes?`, a: `USPS publishes quarterly ZIP code changes through the Address Management System (AMS). New ZIPs are added for growing areas; old ZIPs are retired when routes are consolidated. Production systems should synchronize with quarterly USPS updates.` },
    { q: `Is this guide free?`, a: `Yes — all TOOLTRIO ZIP tools are free, no account required.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP Code Format Guide" description="Complete guide to US ZIP code formats, types, leading zeros, ZIP+4, and storage best practices." icon="📖" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Code Format Guide — US ZIP Code Format Rules 2026\",\"description\":\"Complete guide to US ZIP code formats, types, ZIP+4, leading zeros, and best practices for storing and validating ZIP codes. Free reference guide. Fre\",\"url\":\"https://tooltrio.com/zip/zip-code-format-guide\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
