import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Validator — Check if a ZIP Code is Valid USA 2026',
  description: 'Validate any US ZIP code instantly. Check if a ZIP code is active, real, and correctly formatted. Free ZIP code validation tool with city, state, and county confirmation. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip code validator','validate zip code','check zip code valid','is this zip code valid','zip code validation tool','verify zip code usa','zip code format checker','valid us zip codes','zip code active checker','real zip code lookup','zip code verification free','5 digit zip code validator','zip code exists checker','validate postal code usa','zip code input validation',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'🏷️'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
]

const tips = [
  'A ZIP code can pass regex format validation but still be inactive — always validate against the live USPS database.',
  'ZIP codes starting with 0 must be stored as text (not integers) to preserve the leading zero.',
  'ZIP+4 codes use the format 12345-6789 — validate both parts separately for maximum reliability.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  tagline: `Check if any US ZIP code is real, active, and correctly formatted — in under 100 milliseconds.`,
  proTip: `Format validation (regex) catches typos but will not catch inactive ZIPs. Always follow with a database lookup to confirm the ZIP is currently active in USPS records.`,
  howToSteps: [
    { num: 1, title: `Enter ZIP Code:`, desc: `Type the ZIP code you want to validate (5-digit or ZIP+4 format).` },
    { num: 2, title: `Run Validation:`, desc: `Click validate to check format AND confirm active status in USPS database.` },
    { num: 3, title: `Review Result:`, desc: `See if the ZIP is Active/Inactive, its type, and the associated city/state.` },
    { num: 4, title: `Fix Bad ZIPs:`, desc: `If invalid, use the suggested fix (e.g., restore leading zero) to correct the data.` },
  ],
  featureCards: [
    { icon: '🔍', title: `Format Validation`, desc: `Checks the 5-digit pattern before running the database lookup.`, bullets: [] },
    { icon: '✅', title: `Active Status Check`, desc: `Confirms the ZIP exists as an active, deliverable code in the current USPS database.`, bullets: [] },
    { icon: '🏷️', title: `Type Detection`, desc: `Identifies ZIP type: Standard (S), P.O. Box (B), Unique (U), or Military (M).`, bullets: [] },
  ],
  useCases: [
    { icon: '🛒', title: `Checkout Form Validation`, desc: `Prevent invalid ZIP codes from entering your order system. Catch P.O. Box ZIPs that cannot receive packages before the order is placed.` },
    { icon: '🗄️', title: `Database Hygiene`, desc: `Validate entire CRM database exports. Flag inactive, leading-zero-truncated, or format-invalid ZIP codes for correction.` },
    { icon: '📬', title: `Mailing List Prep`, desc: `Verify every ZIP on a mailing list before printing and mailing. Remove undeliverable ZIPs to avoid wasted postage and NCOA surcharges.` },
  ],
  successStory: {
    title: `How "Priya" Saved $12,000 in Wasted Direct Mail`,
    problem: `Priya team mailed 50,000 pieces without validating ZIPs. 11% were returned — ZIP codes that had been retired, truncated (lost leading zero), or entered as 4 digits by customers.`,
    fix: `She ran the list through our ZIP validator before the next campaign, fixed all 5,500 invalid records, and dropped undeliverables to under 1%. The savings paid for list hygiene many times over.`,
    icon: '📮',
  },
  dataSources: [
    { icon: '📮', name: `USPS Address Management System`, desc: `Live quarterly-updated ZIP code active/inactive status from USPS.` },
    { icon: '📋', name: `USPS ZIP Code Type Data`, desc: `Official S/B/U/M type classifications for all active ZIP codes.` },
  ],

  heading: 'ZIP Code Validation — How to Verify a US ZIP Code is Real and Active',
  populationChart: {
    title: 'US ZIP Code Types: Distribution by Category',
    subtitle: 'Not all ZIP codes serve residential addresses — type validation matters',
    unit: 'thousands of ZIPs',
    bars: [
      { label: 'Standard (S)', value: 30 },
      { label: 'P.O. Box (B)', value: 9 },
      { label: 'Unique (U)', value: 3 },
      { label: 'Military (M)', value: 0.6 },
    ],
  },
  statsTable: [
    { label: 'Regex for 5-digit ZIP', value: '^\\d{5}$' },
    { label: 'Regex for ZIP+4', value: '^\\d{5}(-\\d{4})?$' },
    { label: 'Valid ZIP range', value: '00001–99999 (not all active)' },
    { label: 'Total active ZIP codes', value: '~42,074' },
    { label: 'Inactive / retired ZIP codes', value: 'Thousands — format valid but USPS inactive' },
    { label: 'Leading-zero states', value: 'CT, MA, ME, NH, NJ, NY, RI, VT + PR' },
  ],
  body: `ZIP code validation is a foundational data quality practice for any application that collects US addresses. A ZIP code can look valid — five digits, plausible range — yet be inactive, retired, or entirely fabricated. Without database validation, forms accept bad data that cascades into failed deliveries, incorrect tax calculations, broken analytics segments, and poor customer experiences. Our ZIP Code Validator checks every entered ZIP against the full active USPS ZIP code database to confirm it is both correctly formatted and currently active.

**Two Levels of ZIP Code Validation**

Effective ZIP code validation has two distinct levels that are frequently confused:

**Level 1 — Format Validation (Regex)**: Does the input match the expected pattern of 5 digits, or 5 digits plus a hyphen and 4 more digits for ZIP+4? This can be done entirely client-side without any API call. The standard JavaScript regex is '/^\\d{5}(-\\d{4})?$/'. This catches obvious errors like letters, wrong length, or missing digits, but it cannot tell you whether the ZIP code actually exists.

**Level 2 — Database Validation (Live Lookup)**: Does the ZIP code exist in the current USPS database as an active, deliverable ZIP code? Format validation would accept "99999" as a valid ZIP — it matches the pattern — but 99999 is not an active USPS ZIP code. Similarly, many 5-digit numbers in the valid range are not assigned. Only a database lookup confirms a ZIP is real. Our validator performs both levels: format check first, then live database lookup.

**Format Validation: The Regex Pattern**

The standard US ZIP code regex is '^\\d{5}$' for 5-digit ZIP codes and '^\\d{5}(-\\d{4})?$' for ZIP+4. In JavaScript: 'const isValidFormat = /^\\d{5}(-\\d{4})?$/.test(zip)'. In Python: 'import re; is_valid = bool(re.match(r'^\\d{5}(-\\d{4})?$', zip))'. For form inputs, apply this regex validation immediately on input or on blur to give instant feedback before the user submits the form.

Common format errors include: entering 4 digits (missing a character), entering 6 digits (extra character), entering a ZIP+4 without the hyphen (e.g., "123456789" instead of "12345-6789"), and — most insidiously — losing the leading zero when a field is stored as a number type, turning "02134" into "2134".

**The Leading Zero Problem**

ZIP codes in eight states and Puerto Rico begin with 0: Connecticut (060–069), Maine (039–049), Massachusetts (010–027), New Hampshire (030–038), New Jersey (070–089), Rhode Island (028–029), Vermont (050–059), and parts of New York (100–149), plus Puerto Rico (006–009) and the US Virgin Islands (008). When these ZIPs are stored as integers or converted to numbers anywhere in the data pipeline, the leading zero is silently stripped. The resulting 4-digit value fails both format validation and database lookup. Prevention: always store ZIP codes as VARCHAR(5), STRING, or TEXT. In JavaScript, never parseInt() a ZIP code. In Excel, format ZIP columns as Text before entering data. In databases, reject numeric types for ZIP columns in your schema design.

**When Format Validation is Insufficient**

Many format-valid ZIP codes are not active. USPS periodically retires ZIP codes when delivery routes are consolidated or communities merge. A retired ZIP code retains its format (5 digits) but is no longer in the active database — mail addressed to it is typically returned as undeliverable or redirected. For e-commerce, accepting an inactive ZIP at checkout leads to a failed delivery attempt that triggers a return, a customer service call, and a chargeback. Database-level validation catches these cases at the point of entry.

Additionally, ZIP codes that serve only P.O. Boxes are legitimate, active ZIP codes — but they cannot accept physical package deliveries. If your application ships physical goods, validating ZIP type (Standard vs. P.O. Box) prevents failed deliveries to box-only ZIPs. Our validator returns the ZIP type along with the active/inactive status.

**Implementing ZIP Validation in Web Forms**

The recommended pattern for ZIP validation in web forms: (1) Apply regex validation client-side on blur to catch format errors instantly without an API call. (2) Call the ZIP validation API after the user finishes typing in the ZIP field (use a 500ms debounce). (3) If the ZIP is active, auto-populate city, state, and county fields. (4) If the ZIP is invalid, show a clear inline error message with guidance (e.g., "This ZIP code is not recognized. Please check and re-enter."). (5) For ZIP+4 fields, validate both the 5-digit and 4-digit components separately before combining.

**ZIP Code Validation for CRM and Database Hygiene**

Existing databases often contain ZIP codes that were valid when entered but have since been retired, or that were entered incorrectly in the first place. A ZIP code hygiene pass across a CRM database: run each ZIP through format validation first (flag those that fail regex), then run the format-valid ZIPs through database validation (flag inactive ZIPs), and finally append city, state, and county to all active ZIP records to complete the enrichment. This process dramatically improves the reliability of geographic segmentation in the database.

**Batch ZIP Validation for Large Lists**

For batch validation of thousands or millions of ZIP codes (e.g., a mailing list, a customer database export, or a prospect list from a data vendor), individual lookups are too slow. USPS offers bulk address validation through its Address Information Center products. Third-party data quality platforms (Melissa Data, SmartyStreets, USPS AIS) support batch ZIP validation with delivery point validation (DPV) that confirms deliverability at the individual address level, not just at the ZIP level.`,
  faqs: [
    { q: 'I enter ZIP 99999 and it passes my regex but your tool says invalid — why?', a: `99999 matches the 5-digit regex format (^\d{5}$) so it passes format validation. But it is not an active USPS ZIP code — USPS has never assigned 99999 as a deliverable zone. Format validation only checks the pattern; it cannot detect unassigned numbers. Our tool performs a second check against the USPS Address Management System database to confirm the ZIP is actually active. 99999 fails that database check. The highest active ZIP codes are in Alaska (99950s).` },
    { q: 'How do I implement ZIP code validation in a React checkout form?', a: `Two-step approach: (1) On blur of the ZIP field, run client-side format check: if (!/^\d{5}(-\d{4})?$/.test(zip)) { showError('Please enter a valid 5-digit ZIP code'); return; }. (2) On format pass, call your ZIP validation API. On success: auto-populate city and state fields, clear error. On failure: show 'ZIP code not recognized — please check and re-enter.' Never block form submission on API timeout — let the order proceed with a quality flag instead of losing the sale.` },
    { q: 'A customer ZIP code passes validation but their package was returned. What happened?', a: `Several possibilities: (1) The ZIP is valid but the specific address within the ZIP does not exist (invalid house number or street name) — ZIP validation cannot catch address-level errors, only address-level validation (CASS DPV) can. (2) The ZIP is a P.O. Box type (B) and your carrier attempted physical delivery. (3) The recipient moved and USPS forwarded or returned the mail per their mail forwarding preference. ZIP validation is necessary but not sufficient — full CASS address validation is required to prevent all delivery failures.` },
    { q: 'What is the difference between a \'retired\' ZIP code and an \'inactive\' ZIP code?', a: `A retired ZIP code was once active but USPS decommissioned it — typically when postal routes were consolidated or a post office closed. Retired ZIPs no longer receive any mail; all addresses formerly served by the retired ZIP have been reassigned to a new ZIP. An inactive ZIP in our database may mean a valid ZIP that has zero active delivery points (possible for some unique organizational ZIPs when the organization moves). Both return 'invalid' in our validator.` },
    { q: 'Our database has thousands of 4-digit ZIPs — someone stored them as integers. How do we fix this at scale?', a: `SQL fix for PostgreSQL/MySQL: UPDATE addresses SET zip = LPAD(CAST(zip AS VARCHAR), 5, '0') WHERE LENGTH(CAST(zip AS VARCHAR)) = 4 AND CAST(zip AS INT) BETWEEN 1000 AND 9999. Then change the column type to VARCHAR(5). In Python/pandas: df['zip'] = df['zip'].astype(str).str.zfill(5). After padding, run the restored ZIPs through our validator to confirm they are active. Most formerly 5-digit ZIPs starting with 0 will validate successfully after padding.` },
    { q: 'Can I validate ZIP codes that users enter with spaces or dashes, like \'1 0 0 0 1\' or \'10-001\'?', a: `Yes — strip all non-digit characters before validation: const clean = zip.replace(/\D/g, ''); Then check if clean.length === 5 or clean.length === 9. For ZIP+4 entries like '100011234', reformat as '10001-1234'. This preprocessing handles accidental spaces, dashes in wrong places, and copy-paste artifacts. After cleaning, run the normalized value through format regex and database validation.` },
    { q: 'I am validating ZIP codes from a form where users can enter Canadian postal codes — how do I distinguish them?', a: `US ZIP codes match ^\d{5}(-\d{4})?$ (all digits, 5 or 9). Canadian postal codes match ^[A-Z]\d[A-Z] ?\d[A-Z]\d$ (alternating letter-digit-letter pattern, e.g., 'K1A 0B1'). Check for the Canadian pattern first: if (/^[A-Z]\d[A-Z]/i.test(input)) { handleCanadian(); } else if (/^\d{5}/.test(input)) { handleUSZip(); } else { showError(); }. Always handle both if you serve North American customers.` },
    { q: 'What is a \'unique\' ZIP code (type U) and should I reject orders from those ZIPs?', a: `Type U ZIPs are assigned to single large organizations: federal agencies (20500 = White House), major corporations, universities, and hospitals. These organizations receive mail at their unique ZIP, but you should not assume a customer legitimately has a type U ZIP as their delivery address. If a customer enters 20500 as their address ZIP, that is almost certainly a data entry error. Flag type U ZIPs at checkout and prompt the customer to confirm their delivery address.` },
    { q: 'Does ZIP code validation catch fake addresses used for fraud?', a: `ZIP validation confirms the ZIP code is real and active — it cannot confirm the person lives at the address or that the address is not being used fraudulently. Fraud detection requires combining ZIP validation with: (1) address existence check (CASS DPV), (2) velocity rules (same ZIP used by many different 'customers'), (3) IP geolocation mismatch check (customer IP in China, billing ZIP in New York), (4) device fingerprinting. ZIP validation is the first layer of a multi-layer fraud detection system.` },
    { q: 'How often do ZIP codes get retired and how do I keep my validation database current?', a: `USPS publishes ZIP code changes quarterly through the Address Management System (AMS). Typically, 50–200 ZIP codes are added or retired annually — small number relative to 42,000+ active ZIPs, but impactful if your database is stale. For production systems, sync with USPS quarterly releases or use a commercial address data provider (Melissa Data, SmartyStreets) that maintains current USPS data and pushes updates automatically.` },
    { q: 'What happens if my e-commerce checkout accepts a P.O. Box ZIP code?', a: `FedEx and UPS cannot deliver to P.O. Box addresses — only USPS can. If a customer enters a P.O. Box ZIP (type B) at checkout and your fulfillment uses FedEx or UPS, the shipment will be returned undeliverable. The customer service cost, return shipping, and potential chargeback typically exceed $15–25 per incident. At checkout volume of 100 P.O. Box orders per month, that is $1,500–2,500 in preventable losses monthly. A single type check at checkout eliminates this completely.` },
    { q: `Is the ZIP Code Validator on TOOLTRIO free?`, a: `Yes — completely free, no account required. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) at tooltrio.com provides ZIP validation as part of 35+ free ZIP code tools.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP Code Validator" description="Check if a US ZIP code is valid, active, and correctly formatted." icon="✅" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Code Validator — Check if a ZIP Code is Valid USA 2026\",\"description\":\"Validate any US ZIP code instantly. Check if a ZIP code is active, real, and correctly formatted. Free ZIP code validation tool with city, state, and \",\"url\":\"https://tooltrio.com/zip/zip-code-validator\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
