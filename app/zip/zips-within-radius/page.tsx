import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Codes Within Radius — Find All ZIPs Within Miles of a ZIP Code 2026 | TOOLTRIO',
  description: 'Find all US ZIP codes within a specified radius (miles or km) of any ZIP code. Enter a ZIP and distance to get every ZIP in range. Free tool.',
  keywords: ['zips within radius', 'zip codes within radius', 'zip codes within miles', 'zip codes within 10 miles', 'zip codes near zip code radius', 'find zip codes in radius', 'zip code radius search', 'all zip codes within distance', 'zip code mile radius tool', 'zip code radius finder usa'],
}
const relatedTools = [
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
]
const tips = ['Results use centroid-to-centroid straight-line distance — nearby large-area ZIPs may be excluded if their centroid is far.', 'Urban areas return many more ZIPs per radius mile than rural areas due to higher ZIP density.', 'Copy results directly into ad platform geo-targeting fields for campaign setup.']
const seoContent = {
  heading: 'ZIPs Within Radius — How to Find All ZIP Codes Within a Distance',
  body: 'Finding every US ZIP code within a specific radius of a central ZIP code is one of the most powerful geographic operations for marketing, logistics, and territory analysis. Our ZIPs Within Radius tool accepts a center ZIP code and a distance in miles or kilometers and returns every ZIP code whose centroid falls within that circle — instantly building your geographic target list.\n\n**How Radius Search Works**\n\nThe tool calculates the straight-line (great-circle) distance from the centroid of your center ZIP code to the centroid of every other ZIP code in the database using the Haversine formula. Any ZIP whose centroid falls within the specified radius is included in results, sorted by distance from center so the nearest ZIPs appear first.\n\n**Formula: Is a ZIP Within the Radius?**\n\nFor each candidate ZIP with centroid (lat₂, lon₂) and center ZIP centroid (lat₁, lon₁): a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlon/2), then d = 2R × arcsin(√a). If d ≤ radius, the ZIP is included. Where R = 3,958.8 miles or 6,371 km. This computation runs against all 42,000+ ZIP codes in the database and returns matching results in under a second.\n\n**Choosing the Right Radius**\n\nThe appropriate radius depends on your use case. A 5–10 mile radius suits hyper-local service businesses like plumbers, restaurants, and urgent care clinics. A 15–25 mile radius suits local delivery services, brick-and-mortar retail trade areas, and suburban commute zones. A 30–50 mile radius suits regional service companies, day-trip leisure destinations, and regional franchise territories. A 50–100 mile radius suits multi-county market regions, distribution center service areas, and regional broadcast markets.\n\n**Practical Applications**\n\nMarketing campaigns use all ZIPs within a radius to build the exact ZIP code target list for Direct Mail, Facebook Ads, or Google Ads around a business location. Delivery zone definition defines the service area as all ZIP codes within 20 miles of a warehouse ZIP. Healthcare network analysis identifies all ZIP codes within the service area of a clinic to estimate the catchment population. Competitive intelligence finds all ZIP codes within 5 miles of a competitor location to understand their trade area. Emergency notification alerts residents in all ZIP codes within 10 miles of an incident location.',
  faqs: [
    {q:'How many ZIP codes are within 10 miles of downtown Chicago?',a:'A 10-mile radius centered on a downtown Chicago ZIP typically returns 60–100 ZIP codes, because Chicago and its immediate suburbs have very dense ZIP coverage.'},
    {q:"Does 'within radius' mean straight-line or driving distance?",a:'Radius is calculated as straight-line (great-circle) distance between ZIP code centroids. Driving distance to the same ZIP codes would be 20–40% longer due to road routing.'},
    {q:'Can I search by kilometers instead of miles?',a:'Yes — toggle the distance unit between miles and kilometers before running the search.'},
    {q:'Why are some nearby ZIP codes not in my radius results?',a:'Radius results are based on centroid-to-centroid distance. A neighboring ZIP code with a large area might have its centroid farther from your center than a ZIP code that appears more distant on a map but has a conveniently placed centroid.'},
    {q:'What is the maximum radius I can search?',a:'Our tool supports radius searches up to 500 miles, which returns ZIP codes across a significant multi-state region.'},
    {q:'Can I combine radius results with population filters?',a:'Yes — after getting your radius ZIP list, use our ZIP Code Population tool to append population data to each result, then filter or sort by population to prioritize high-density ZIPs.'},
    {q:'Is this the same as a ZIP code distance calculator?',a:"Related but different. ZIP Code Distance calculates the distance between two specific ZIPs. ZIPs Within Radius finds all ZIPs within a distance from one center ZIP — it's a one-to-many operation rather than a point-to-point calculation."},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIPs Within Radius'} description={'Find all US ZIP codes within a specified mile or kilometer radius of any ZIP.'} icon={'🎯'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
