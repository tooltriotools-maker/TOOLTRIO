import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'State ZIP Codes — All ZIP Codes in Any US State 2026 | TOOLTRIO',
  description: 'Find every ZIP code in any US state. Browse all ZIP codes by state with city, county, and map links. Free state ZIP code list tool.',
  keywords: ['state zip codes', 'all zip codes by state', 'zip codes in state', 'state zip code list usa', 'list of zip codes for state', 'zip codes in california', 'zip codes in texas', 'all us zip codes by state', 'state postal codes usa'],
}
const relatedTools = [
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
  {name:'Largest ZIP Codes',href:'/zip/largest-zip-codes',icon:'📊'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
]
const tips = ["Use the two-letter state abbreviation (e.g., 'CA', 'TX') for fastest results.", 'Filter by county within a state using the County ZIP Codes tool.', 'P.O. Box ZIPs are included — look for the type label to distinguish them from standard ZIPs.']
const seoContent = {
  heading: 'State ZIP Codes — Complete List of ZIP Codes for Every US State',
  body: "A complete list of ZIP codes by state is indispensable for statewide marketing campaigns, regulatory compliance filings, public health research, and any analysis that requires comprehensive geographic coverage within state boundaries. Our State ZIP Codes tool returns every active ZIP code in any US state, along with each ZIP's primary city, county, and type.\n\n**Scale of State ZIP Code Data**\n\nThe number of ZIP codes per state varies dramatically based on population, geographic size, and urbanization. California, the most populous state, has over 2,500 active ZIP codes. Texas has over 1,700. Wyoming, the least populous state, has fewer than 100. The District of Columbia, despite being a tiny area, has nearly 30 ZIP codes due to its dense federal office buildings and unique organizational ZIP assignments.\n\n**Using State ZIP Lists for Marketing**\n\nState-level ZIP code lists are a core input for geographically targeted advertising. Facebook Ads, Google Ads, and programmatic ad platforms all accept ZIP code lists as geographic targeting parameters. By loading a state's full ZIP code list, you can ensure complete statewide coverage without manually entering city names or drawing inexact map boundaries. Direct mail campaigns use state ZIP lists to calculate postage rates, plan carrier route saturation mailings, and request USPS Every Door Direct Mail (EDDM) routes by ZIP code.\n\n**State ZIP Codes for Compliance and Licensing**\n\nMany professional licenses (contractor, real estate, insurance) are issued at the state level, and licensees must operate only within their licensed state. Verifying that a customer address ZIP code belongs to the correct state is a basic compliance check. Our state ZIP list lets compliance teams quickly cross-reference customer ZIP codes against the official list for any state.",
  faqs: [
    {q:'How many ZIP codes does California have?',a:'California has approximately 2,566 active ZIP codes — the most of any US state — reflecting its large population and diverse geography from dense urban cores to vast rural regions.'},
    {q:'Are P.O. Box-only ZIP codes included in state lists?',a:'Yes. Our state ZIP lists include all active ZIP types: standard, P.O. Box-only, unique, and military.'},
    {q:'How do I get ZIP codes for just one county in a state?',a:'Use the County ZIP Codes tool — enter the county name and state to get a filtered list.'},
    {q:'Is Washington D.C. included?',a:"Yes. Washington D.C. is treated as a state equivalent and has its own ZIP code list accessible by searching 'DC'."},
    {q:'How often are state ZIP lists updated?',a:'Quarterly, in sync with USPS ZIP code file releases.'},
    {q:'Can I use state ZIP lists for USPS Every Door Direct Mail?',a:'Yes. EDDM targeting is done at the carrier route level, and ZIP codes are the entry point for identifying available EDDM routes in a given area.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'State ZIP Codes'} description={'Browse all ZIP codes in any US state with city and county details.'} icon={'🗺️'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
