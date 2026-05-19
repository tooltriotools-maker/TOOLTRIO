import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'County ZIP Codes — All ZIP Codes in Any US County 2026 | TOOLTRIO',
  description: 'Find every ZIP code in any US county. Search by county name and state to get a complete ZIP code list. Free county ZIP lookup tool.',
  keywords: ['county zip codes', 'zip codes by county', 'all zip codes in county usa', 'county zip code list', 'find zip codes in county', 'us county zip code lookup', 'zip codes for county name', 'county postal codes usa'],
}
const relatedTools = [
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
  {name:'ZIPs by City Name',href:'/zip/zips-by-city-name',icon:'🔎'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]
const tips = ['Search by county name AND state for best results (many county names repeat across states).', "Some ZIP codes cross county lines — our tool shows which county holds the majority of each ZIP's addresses.", 'Click any ZIP in the results to open it in the ZIP Code Lookup tool for full details.']
const seoContent = {
  heading: 'County ZIP Codes — How to Find Every ZIP Code in a US County',
  body: 'County-level ZIP code lookup is essential for legal, tax, public health, and administrative research across the United States. Unlike cities or states, counties are the fundamental unit of local government for most services — from property recording to court jurisdiction to public health departments. Our County ZIP Codes tool returns every active ZIP code that falls within or overlaps a given county.\n\n**Why County ZIP Code Lookup Matters**\n\nCounties serve as the primary administrative subdivision in 48 of 50 US states (Louisiana uses parishes; Alaska uses boroughs, but these function identically for postal purposes). Over 3,143 counties and county-equivalents exist across the US, each with a distinct set of ZIP codes. Some dense urban counties like Los Angeles County, CA contain over 200 ZIP codes, while sparse rural counties in the Great Plains may have just 1 or 2.\n\nCounty-level ZIP data is critical for property tax research (real estate transactions are recorded at the county level), healthcare planning (hospitals and insurers use county boundaries to define service areas), legal jurisdiction (court filings and regulatory compliance require knowing whether an address falls within a specific county), political analysis (congressional districts are often defined in relation to county boundaries), and local marketing (advertising to residents of a specific county requires knowing all ZIP codes to target).\n\n**How County-to-ZIP Mapping Works**\n\nA ZIP code does not always fall entirely within a single county. Because ZIP codes follow postal delivery routes rather than political boundaries, a single ZIP code can straddle a county line, serving addresses in two adjacent counties. Our tool handles this by returning ZIP codes that have their centroid within the county as well as ZIP codes that are predominantly within the county boundary, flagging which ZIPs are fully contained versus which ones cross county borders.\n\n**County FIPS Codes and ZIP Code Matching**\n\nEach US county has a unique 5-digit FIPS (Federal Information Processing Standards) code — a 2-digit state code plus a 3-digit county code. For example, Los Angeles County, CA is FIPS 06037. When matching ZIP codes to counties in a database, the most reliable method is to use the USPS ZIP-to-county crosswalk file, which maps each ZIP code to its primary county FIPS code based on the share of ZIP code area that falls within each county. Our tool uses this crosswalk, updated quarterly, to ensure accurate county-ZIP associations.',
  faqs: [
    {q:'Can a ZIP code appear in two different counties?',a:'Yes. ZIP codes follow postal delivery routes, not political boundaries. A ZIP code that spans a county line will appear in results for both counties. Our tool flags these cross-county ZIPs.'},
    {q:'How do I search for a county that has the same name in multiple states?',a:"Append the two-letter state abbreviation (e.g., 'Franklin, OH' or 'Franklin, KY') to narrow results to the correct county."},
    {q:'Are independent cities treated as counties?',a:'Yes. Independent cities like Richmond, VA and Baltimore, MD that are not part of any county are treated as county-equivalents and can be searched by their city name.'},
    {q:'How many ZIP codes does Los Angeles County have?',a:'Los Angeles County, the most populous county in the US, has over 220 active ZIP codes spanning cities from Long Beach to Palmdale.'},
    {q:'Is Alaska and Hawaii county data included?',a:'Yes. Alaska borough equivalents and Hawaii counties are fully included in our database.'},
    {q:'Can I export the county ZIP code list?',a:'You can copy results from the tool and paste them into a spreadsheet. For bulk data needs, USPS offers Address Information System (AIS) products that include official ZIP-to-county crosswalk files.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'County ZIP Codes'} description={'Find all ZIP codes within any US county. Search by county name and state.'} icon={'📋'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
