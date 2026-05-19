import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP+4 Lookup — Find the 9-Digit ZIP+4 Code for Any US Address 2026 | TOOLTRIO',
  description: 'Look up the ZIP+4 (9-digit ZIP code) for any US address. Get the full NNNNN-NNNN code for mail sorting and bulk postage discounts. Free tool.',
  keywords: ['zip+4 lookup', 'zip plus 4 code', '9 digit zip code lookup', 'zip+4 code finder', 'usps zip+4', 'zip code plus 4 digits', 'find zip+4 for address', 'zip plus 4 lookup free', 'full zip code 9 digit'],
}
const relatedTools = [
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'USPS Address Format',href:'/zip/usps-address-format',icon:'📬'},
  {name:'Address to ZIP',href:'/zip/address-to-zip',icon:'🏠'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Type',href:'/zip/zip-code-type',icon:'📬'},
  {name:'ZIP Code Format Guide',href:'/zip/zip-code-format-guide',icon:'📖'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]
const tips = ['Enter a full street address (including apartment number) for the most accurate ZIP+4 result.', 'ZIP+4 codes change when USPS redraws carrier routes — update your mailing list annually.', 'Bulk mailers using ZIP+4 can save up to 25% on USPS postage through automation discounts.']
const seoContent = {
  heading: 'ZIP+4 Lookup — How to Find the Full 9-Digit ZIP Code for Any US Address',
  body: 'The ZIP+4 code — officially the ZIP+4® Code — extends the standard 5-digit ZIP code with a hyphen and four additional digits to identify a specific delivery segment within a postal zone. Finding the correct ZIP+4 for an address enables faster mail delivery, qualifies bulk mailers for significant postage discounts, and is required for USPS automation pricing programs.\n\n**What the 4-Digit Extension Means**\n\nThe ZIP+4 format is NNNNN-NNNN, where the first five digits are the base ZIP code and the last four digits break down as: digits 6–7 (sector) identifying a group of delivery points such as a city block, a group of apartment buildings, or a P.O. Box range; and digits 8–9 (segment) identifying a specific side of a block, individual floor of a building, or precise P.O. Box grouping. Together, the 9-digit ZIP+4 narrows a mailing address to the level of a specific block face or building section, enabling automated sorting equipment to presort mail to the individual carrier route.\n\n**How ZIP+4 Lookup Works**\n\nZIP+4 codes are derived from USPS delivery point records. To find the ZIP+4 for an address, the lookup tool parses the input address into components, matches the parsed address against the USPS Delivery Point Validation (DPV) database, and returns the ZIP+4 code assigned to that specific delivery point record. If an address is not found in the DPV database (newly constructed, rural route address, or non-standard format), only the 5-digit ZIP can be returned.\n\n**Business Value of ZIP+4**\n\nUSPS offers substantial postage discounts for automation-compatible mailings that include ZIP+4 codes: First-Class Mail letters up to 18% discount vs. non-automated rate, and Marketing Mail (formerly Standard Mail) up to 25% discount vs. non-presorted rate. For a business sending 100,000 pieces of First-Class mail per month, implementing ZIP+4 addressing can save $10,000–$20,000 in annual postage costs.\n\n**ZIP+4 in Address Standardization**\n\nThe CASS (Coding Accuracy Support System) certification program requires address processing software to achieve a high match rate when assigning ZIP+4 codes. CASS-certified vendors process your mailing list and append ZIP+4 codes before you mail, ensuring compliance with USPS automation pricing requirements.',
  faqs: [
    {q:'What is a ZIP+4 code?',a:'A ZIP+4 code is the 9-digit postal code format (NNNNN-NNNN) that extends the 5-digit ZIP with a 4-digit sector-segment identifier, allowing USPS to sort mail to a specific block face or building section.'},
    {q:'How is ZIP+4 different from ZIP code?',a:'A regular 5-digit ZIP identifies a delivery area covering thousands of addresses. ZIP+4 narrows that down to a specific block face or P.O. Box group — typically 10–20 delivery points.'},
    {q:'Do I need ZIP+4 for regular mail?',a:'No — standard 5-digit ZIP codes are sufficient for regular letter and package delivery. ZIP+4 becomes important for bulk business mailers seeking automation postage discounts.'},
    {q:"Why can't I find the ZIP+4 for my address?",a:'Some addresses — particularly newly constructed buildings, rural routes, or non-standard address formats — are not yet in the USPS DPV database. In these cases, only the 5-digit ZIP is available.'},
    {q:'Does ZIP+4 change when I move within the same ZIP code?',a:'Yes. Moving to a different street or apartment within the same 5-digit ZIP will change your ZIP+4, since the 4-digit extension identifies your specific delivery segment.'},
    {q:'How do I use ZIP+4 for bulk mail discounts?',a:'Submit your mailing list to a CASS-certified address processing vendor who will append ZIP+4 codes and delivery point barcodes. The processed list qualifies for USPS automation postage discounts.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP+4 Lookup'} description={'Find the full 9-digit ZIP+4 code for any US mailing address.'} icon={'🔢'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
