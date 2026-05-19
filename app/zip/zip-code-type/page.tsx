import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Type — Standard, PO Box, Military or Unique ZIP Code? 2026 | TOOLTRIO',
  description: 'Find out the type of any US ZIP code: Standard, PO Box-only, Unique, or Military (APO/FPO/DPO). Free ZIP code type lookup tool.',
  keywords: ['zip code type', 'zip code type lookup', 'standard zip code', 'po box zip code', 'military zip code', 'unique zip code', 'apo fpo zip code', 'zip code classification', 'what type is my zip code', 'zip code type checker usa'],
}
const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'🔢'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
]
const tips = ['Standard ZIPs (Type S) are the only type suitable for geocoding and distance calculations.', 'PO Box ZIPs are valid for USPS mail but cannot be used for physical address delivery via UPS/FedEx.', 'Military ZIPs are domestic postage rate — only USPS delivers to APO/FPO/DPO addresses.']
const seoContent = {
  heading: 'ZIP Code Type — Understanding the Four Types of US ZIP Codes',
  body: 'Not all US ZIP codes are the same. The USPS classifies every ZIP code into one of four distinct types, each serving a different purpose and set of addresses. Knowing the type of a ZIP code before you use it in address validation, shipping logic, or database analysis is essential for avoiding errors.\n\n**The Four Types of US ZIP Codes**\n\nStandard ZIP Codes (Type S) are the most common type, assigned to geographic areas that contain a mix of residential, commercial, and industrial delivery addresses. These codes have deliverable addresses, a known geographic boundary (ZCTA), and population data available from the Census Bureau. Standard ZIPs are suitable for all address validation, shipping, geolocation, and demographic analysis purposes.\n\nPO Box ZIP Codes (Type P) are assigned exclusively to post office box sections within a post office building. They do not correspond to any physical street address delivery area — no letter carrier delivers to an address in a PO Box ZIP. PO Box ZIPs have their own unique 5-digit codes, often different from the standard ZIP for the same post office. Important: if a customer enters a PO Box ZIP as their delivery address, the address may fail validation for physical delivery confirmation.\n\nUnique ZIP Codes (Type U) are assigned to single high-volume mail recipients: large corporations, government agencies, universities, or other organizations that receive so much mail that USPS assigned them their own dedicated ZIP code. Examples include the IRS processing centers, the White House (20500), and large universities. Unique ZIPs should be recognized as valid but not treated as geographic delivery zones.\n\nMilitary ZIP Codes (Type M) serve US Armed Forces personnel stationed overseas through APO (Army Post Office/Air Force Post Office), FPO (Fleet Post Office), and DPO (Diplomatic Post Office) addresses. Military ZIPs use domestic US ZIP code numbering and are treated as domestic mail for postage rate purposes, even though the physical destination may be in Europe, the Pacific, or the Middle East.\n\n**Why ZIP Code Type Matters in Applications**\n\nAddress validation logic should handle each ZIP type differently: Standard — full geolocation, delivery verification, distance calculation all applicable. PO Box — valid for mail delivery, but physical address delivery not possible and cannot geocode. Unique — valid address but not a general delivery area; skip geolocation and demographic analysis. Military — valid domestic postage rate; physical geocoding not meaningful since location is overseas.',
  faqs: [
    {q:'What is a standard ZIP code?',a:'A standard ZIP code (Type S) serves residential and commercial delivery addresses. It is the most common type and can be geocoded, used for distance calculations, and analyzed with Census demographic data.'},
    {q:'What does a PO Box ZIP code mean?',a:'A PO Box ZIP (Type P) is assigned exclusively to post office boxes at a specific post office. It has no physical delivery area — mail is picked up by box holders at the post office, not delivered to a street address.'},
    {q:'Can I ship a physical package to a PO Box ZIP?',a:"Yes, USPS delivers packages to PO Boxes. However, UPS and FedEx Ground do not deliver to PO Boxes — only USPS. Check your carrier's PO Box policy before routing shipments."},
    {q:'What is a unique ZIP code?',a:'A unique ZIP (Type U) is assigned to a single large-volume organization like a government agency, university, or corporation. It is not a general delivery area — only that organization receives mail at that ZIP.'},
    {q:'How do I identify a military ZIP code?',a:'Military ZIP codes typically begin with 090–098 (APO AE — Europe/Middle East/Africa), 340 (APO AA — Americas), or 962–966 (APO AP — Pacific). They are labeled as Type M in our tool.'},
    {q:'Is shipping to a military ZIP code considered domestic or international?',a:'Domestic. USPS treats APO/FPO/DPO addresses as domestic mail, applying domestic postage rates. UPS and FedEx do not deliver to military ZIP codes — only USPS.'},
    {q:'Why does my ZIP code show as PO Box-only when I receive home delivery?',a:'Your home is served by a Standard ZIP for street delivery. The PO Box ZIP for your post office is a separate, different ZIP code. Ensure you are using your delivery ZIP rather than the PO Box ZIP.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP Code Type'} description={'Find out if a ZIP code is Standard, PO Box-only, Unique, or Military.'} icon={'📬'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
