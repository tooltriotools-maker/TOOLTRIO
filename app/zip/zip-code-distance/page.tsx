import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Distance Calculator — Miles Between ZIP Codes USA 2026 | TOOLTRIO',
  description: 'Calculate the straight-line and driving distance between any two US ZIP codes. Get miles, kilometers, and estimated drive time. Free ZIP distance calculator.',
  keywords: ['zip code distance calculator', 'distance between zip codes', 'miles between zip codes', 'zip code to zip code distance', 'zip code distance in miles', 'calculate distance by zip code usa', 'zip code km distance', 'zip code mileage calculator', 'how far between two zip codes', 'zip code radius distance tool', 'us zip code distance finder', 'straight line distance zip codes'],
}

const relatedTools = [
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
]

const tips = ['Distance is calculated using the geographic centroid (center point) of each ZIP code area.', 'Straight-line (as the crow flies) distance is shorter than actual driving distance.', 'For drive time estimates, use the Drive Time by ZIP tool after finding your distance.']

const seoContent = {
  heading: 'ZIP Code Distance Calculator — How to Measure the Distance Between US ZIP Codes',
  body: "Calculating the distance between two US ZIP codes is a fundamental task for delivery planning, sales territory design, real estate market analysis, and countless other applications. Our ZIP Code Distance Calculator gives you instant straight-line (great-circle) distance in both miles and kilometers, along with estimated driving distance, between any two valid US ZIP codes.\n\n**The Haversine Formula — How ZIP Code Distance Is Calculated**\n\nThe distance between two ZIP codes is computed using the Haversine formula, which accounts for the curvature of the Earth to give an accurate great-circle distance between two points on the globe. Each ZIP code is represented by its geographic centroid — the latitude/longitude coordinate at the center of its ZIP Code Tabulation Area (ZCTA).\n\nThe formula: a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlon/2), then c = 2 × atan2(√a, √(1−a)), and d = R × c. Where R is Earth's radius (3,958.8 miles or 6,371 km). The result is the straight-line distance — the shortest path over Earth's surface, ignoring roads, terrain, and obstacles.\n\n**Straight-Line vs. Driving Distance**\n\nStraight-line distance is always shorter than actual driving distance because roads curve, highways detour around obstacles, and urban grids are rarely perfectly direct. As a rule of thumb, driving distance is typically 20–40% longer than straight-line distance in urban and suburban areas, and can be 10–80% longer in rural or mountainous regions where roads must navigate terrain.\n\n**Why ZIP Code Centroid Distance Has Limitations**\n\nUsing the centroid of a ZIP code introduces a margin of error because ZIP codes cover areas of varying size. A large rural ZIP code in Montana might span hundreds of square miles, meaning two addresses within that ZIP code could be 20+ miles apart, yet the tool would show zero distance between them. For precise point-to-point distance, use full street addresses with a geocoding API. For general area-to-area distance — which is what most business planning requires — ZIP centroid distance is accurate enough.\n\n**Last-Mile Logistics and Shipping Zones**\n\nLast-mile delivery cost is heavily influenced by ZIP code distance clusters. Carriers group nearby ZIPs into delivery zones — typically Zone 1 is 0–50 miles from the origin, Zone 2 is 51–150 miles, and so on, up to Zone 8 for cross-country shipments. By knowing the distance between your ship-from ZIP and each customer ZIP, you can predict which shipping zone applies and estimate freight costs before generating a rate quote.",
  faqs: [
    {q:'Is the distance between ZIP codes straight-line or driving distance?',a:'Our calculator primarily returns the straight-line (great-circle) distance between the geographic centroids of the two ZIP codes. Driving distance is estimated separately and is typically 20–40% longer due to road routing.'},
    {q:'Why is the distance between two nearby ZIPs showing as 0?',a:'If two ZIP codes share the same centroid (or very nearly the same), the calculated distance will be zero or near-zero. This can happen with P.O. Box-only ZIPs that are assigned the same coordinates as the parent post office ZIP.'},
    {q:'Can I calculate distance between more than two ZIP codes at once?',a:'Yes — use our Multi-ZIP Distance tool, which lets you enter a list of ZIP codes and calculates all pairwise distances in a matrix format, useful for optimizing multi-stop routes.'},
    {q:'What is the maximum distance between two US ZIP codes?',a:'The greatest distance between two continental US ZIP codes is approximately 2,800 miles (Los Angeles to Maine). If you include Hawaii and Alaska, the maximum extends to roughly 5,000 miles.'},
    {q:'How accurate is ZIP code distance for shipping rate estimation?',a:"ZIP centroid distance is accurate enough for zone-based shipping rate estimation. USPS, UPS, and FedEx all use ZIP-based zones. For weight-based freight quotes, the distance is an input but actual route mileage from the carrier's system will be the final factor."},
    {q:'How do I find all ZIP codes within a certain distance from mine?',a:'Use our ZIPs Within Radius tool — enter your ZIP code and a radius in miles, and it will return every ZIP code centroid that falls within that circle.'},
  ],
}

export default function Page() {
  return (
    <ZipToolLayout title={'ZIP Code Distance Calculator'} description={'Calculate the exact distance between any two US ZIP codes — straight-line and driving.'} icon={'📏'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
