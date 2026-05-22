import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Type — Find the Type of Any US ZIP Code 2026',
  description: 'Look up the type of any US ZIP code: Standard, P.O. Box, Unique, or Military. Know if a ZIP accepts physical deliveries. Free ZIP code type checker. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip code type','zip code types','standard zip code','po box zip code','unique zip code','military zip code','zip code type lookup','find zip code type','what type is zip code','zip code type checker','zip code classification','zip code s p u m type','residential zip code','po box only zip code','zip code type finder usa',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]

const tips = [
  'P.O. Box ZIP codes (type B) cannot receive physical package deliveries — always check type before shipping.',
  'Military ZIP codes (type M) route through APO/FPO military postal networks, not standard carrier networks.',
  'Unique ZIP codes (type U) are assigned to single large organizations — they do not correspond to a neighborhood or area.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '📦', title: `Delivery Type Check`, desc: `Know instantly if a ZIP accepts physical packages or is P.O. Box only — prevents failed shipments.`, bullets: [] },
    { icon: '🏷️', title: `4 Type Categories`, desc: `Standard (S), P.O. Box (B), Unique (U), and Military (M) — each with different delivery rules.`, bullets: [] },
    { icon: '🔄', title: `Checkout Safety`, desc: `Integrate type checking at checkout to reject P.O. Box ZIPs before orders are placed.`, bullets: [] },
  ],

  heading: `ZIP Code Types — Standard, P.O. Box, Unique, and Military ZIP Codes Explained`,
  populationChart: {
    title: 'US ZIP Code Distribution by Type',
    subtitle: 'Standard ZIPs handle the vast majority of residential and business deliveries',
    unit: 'thousands of ZIP codes',
    bars: [
      { label: 'Standard (S)', value: 30 },
      { label: 'P.O. Box (B)', value: 9 },
      { label: 'Unique (U)', value: 3 },
      { label: 'Military (M)', value: 0.6 },
    ],
  },
  statsTable: [
    { label: 'Standard (S) ZIPs', value: '~30,000 — residential and business' },
    { label: 'P.O. Box (B) ZIPs', value: '~9,000 — box pickup only, no physical delivery' },
    { label: 'Unique (U) ZIPs', value: '~3,000 — single large organization' },
    { label: 'Military (M) ZIPs', value: '~600 — APO/FPO/DPO overseas military' },
    { label: 'Type in USPS data', value: 'Single letter: S, B, U, or M' },
    { label: 'Business impact', value: 'P.O. Box ZIPs cannot receive packages' },
  ],
  body: `Not all ZIP codes are created equal. The United States Postal Service classifies every ZIP code into one of four types, each serving a different postal function and having different implications for deliverability. Knowing the type of a ZIP code is critical for e-commerce shipping, address validation, mailing list hygiene, and any application that needs to ensure physical packages reach their destination. Our ZIP Code Type tool returns the type classification for any 5-digit US ZIP code.

**Standard ZIP Codes (Type S)**

Standard ZIP codes — sometimes called Regular ZIP codes in USPS documentation — serve residential and business addresses with standard carrier route delivery. Approximately 30,000 of the 42,000+ active US ZIP codes are Standard type. These are the most familiar ZIP codes: neighborhood ZIP codes in cities and suburbs, rural route delivery zones, and mixed residential-commercial areas. Standard ZIP codes can receive all types of mail and packages via USPS and all major carriers (FedEx, UPS, DHL).

Standard ZIP codes are further subdivided by carrier route type within the ZIP: City Delivery (C routes serving urban and suburban door delivery), Rural Route (R routes serving rural areas), Highway Contract Route (H routes serving areas under contract delivery), Business Reply Mail (B routes), and General Delivery (G routes). For most applications, you only need to know the ZIP is Standard type, not its internal carrier route classification.

**P.O. Box ZIP Codes (Type B)**

P.O. Box ZIP codes serve customers who pick up their mail at a post office box rather than receiving delivery at a physical address. Approximately 9,000 US ZIP codes are P.O. Box type — these ZIP codes exist purely for mail sorting to boxes within the post office. Critically: **P.O. Box ZIP codes cannot receive physical package deliveries from any carrier**. USPS will not deliver packages to a P.O. Box ZIP code without a corresponding street address. FedEx and UPS cannot deliver to P.O. Box addresses at all.

This is the most business-critical ZIP type determination. E-commerce checkout flows should detect P.O. Box ZIP codes and notify customers that physical packages cannot be delivered to that address — they need to provide a street delivery address instead. Failure to catch P.O. Box ZIP codes at checkout results in failed delivery attempts, return-to-sender costs, and customer service escalations.

P.O. Box ZIP codes often have a different 5-digit value than the street delivery ZIP code for the same physical post office location. The post office at a given location may have one ZIP for street delivery (Standard type) and a completely different ZIP for P.O. Boxes (Box type). Both are valid ZIP codes with the same city and state, but different types and different delivery behaviors.

**Unique ZIP Codes (Type U)**

Unique ZIP codes are assigned to single large organizations that receive enough mail volume to warrant their own dedicated ZIP code. Approximately 3,000 US ZIP codes are Unique type. Recipients of Unique ZIP codes include large federal government agencies (the White House: 20502; the Pentagon: 22301), major corporations with extensive mail operations, large university systems, major hospitals, and significant military installations on US soil.

Unique ZIP codes cannot be interpreted as serving a geographic neighborhood or community. A query for "what city is ZIP 20502?" returns "Washington, DC," but ZIP 20502 does not serve any general DC neighborhood — it is exclusively the White House/Executive Office of the President. Unique ZIP codes do receive physical mail and packages, but addressed specifically to the organization, not to the general public.

**Military ZIP Codes (Type M)**

Military ZIP codes serve overseas military personnel through the Army Post Office (APO), Fleet Post Office (FPO), and Diplomatic Post Office (DPO) systems. Approximately 600 military ZIP codes cover mail addressed to US military installations and diplomatic missions worldwide.

Military ZIP codes are organized by geographic region: APO AE (Armed Forces Europe, Middle East, Africa — 090xx-098xx range), APO AP (Armed Forces Pacific — 962xx-966xx range), APO AA (Armed Forces Americas — 340xx range), and FPO equivalents for naval vessels. From the sender's perspective, military mail is addressed to "CITY, STATE ZIP" using the military designator as the city name (e.g., "APO AE 09001") and mailed through the standard US postal system to a military port of embarkation, where it is forwarded via military transport to the overseas installation.

**Business Logic: Type-Based Delivery Rules**

Shipping applications should implement type-based delivery rules:

1. **Check ZIP type at checkout**: Identify P.O. Box type ZIPs and prompt for a street delivery address.
2. **Flag Unique ZIPs**: Unique ZIPs often indicate large organizations — may warrant special handling for B2B sales.
3. **Military ZIPs**: Flag for special carrier handling — USPS is often the only carrier that delivers to APO/FPO addresses. FedEx and UPS have APO/FPO shipping programs but with restrictions.
4. **Standard ZIPs**: Process normally through standard carrier workflow.

This type-checking logic prevents a significant class of delivery failures and improves customer experience by catching issues at checkout rather than after a failed delivery attempt.

**Why Use TOOLTRIO for ZIP Code Lookups?**

TOOLTRIO (also searched as Tool Trio, Trio Tools, and ToolTrio) is a free suite of US address and ZIP code tools built for developers, marketers, logistics teams, and everyday users who need fast, reliable postal data. Every TOOLTRIO ZIP tool — from ZIP code lookup to drive time by ZIP, ZIP to city, and ZIP code distance — is free to use with no account required. When you search for "tooltrio zip code," "zip code tooltrio," or simply "tooltrio," you land on a platform built around one goal: making US ZIP code data instantly accessible to everyone. Bookmark tooltrio.com and share any TOOLTRIO tool link directly — every page is designed to be fast, ad-free, and accurate.`, [
    { q: 'What are the four types of US ZIP codes?', a: 'Standard (S): residential and business delivery. P.O. Box (B): post office box pickup only. Unique (U): single large organization. Military (M): APO/FPO/DPO overseas military mail.' },
    { q: 'Can I ship a physical package to a P.O. Box ZIP code?', a: 'No. P.O. Box ZIP codes (type B) do not have physical delivery addresses — they only serve box pickup. FedEx and UPS cannot deliver to P.O. Box addresses. USPS also cannot deliver packages to a P.O. Box without a street address.' },
    { q: 'How do I detect P.O. Box ZIP codes at checkout?', a: 'Use a ZIP type lookup API to check if the entered ZIP is type B (P.O. Box). If yes, display a message asking the customer to enter a street delivery address instead.' },
    { q: 'What is a Unique ZIP code?', a: 'A Unique ZIP (type U) is assigned to a single large organization — major federal agencies, large corporations, universities, or hospitals — that receives enough mail volume for its own ZIP code. Examples: 20502 (White House), 10048 (One World Trade Center).' },
    { q: 'Do military ZIP codes work with all shipping carriers?', a: 'No. FedEx and UPS have APO/FPO programs with restrictions. USPS is the most reliable carrier for military APO/FPO addresses. Always check carrier capabilities before accepting orders with military ZIP codes.' },
    { q: 'Can a neighborhood have both a Standard and a P.O. Box ZIP code?', a: 'Yes — many post offices have one ZIP for street carrier delivery (Standard) and a different ZIP for P.O. Boxes (Box type). Both ZIP codes share the same city and state but are different numbers with different types.' },
    { q: 'What does the ZIP code type letter mean in USPS data?', a: 'USPS uses single-letter codes: S = Standard, B = P.O. Box, U = Unique, M = Military. These codes appear in USPS ZIP code database files and address management products.' },
    { q: 'How many P.O. Box ZIP codes exist in the US?', a: 'Approximately 9,000 ZIP codes are classified as P.O. Box type — about 21% of all active US ZIP codes.' },
    { q: 'Does ZIP code type affect tax calculation?', a: 'Indirectly. P.O. Box ZIP codes return a valid city and state but the P.O. Box may be in a different county than the recipient's actual address, potentially affecting county-level tax rate application.' },
    { q: 'Are there ZIP codes that have changed type?', a: 'Yes — USPS may reclassify ZIP codes. A ZIP that was previously Standard may be converted to Unique if a large organization moves in and generates sufficient mail volume. Changes are published in USPS quarterly updates.' },
    { q: 'Is ZIP code type visible to the end user?', a: 'Usually not — most address forms don't display ZIP type. But the type should be validated programmatically to prevent shipping to non-deliverable addresses.' },
    { q: 'Is this tool free?', a: 'Yes — free, no account required.' },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP Code Type" description="Find out whether a ZIP code is Standard, P.O. Box, Unique, or Military." icon="🏷️" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Code Type — Find the Type of Any US ZIP Code 2026\",\"description\":\"Look up the type of any US ZIP code: Standard, P.O. Box, Unique, or Military. Know if a ZIP accepts physical deliveries. Free ZIP code type checker. F\",\"url\":\"https://tooltrio.com/zip/zip-code-type\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
