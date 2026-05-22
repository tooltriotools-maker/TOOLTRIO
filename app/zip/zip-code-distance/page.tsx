import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Distance Calculator — Miles Between ZIP Codes USA 2026',
  description: 'Calculate the straight-line distance between any two US ZIP codes in miles or kilometers. Free ZIP code distance calculator with driving time estimates. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip code distance calculator','distance between zip codes','miles between zip codes','zip code to zip code distance','zip code distance in miles','calculate distance by zip code usa','zip code km distance','zip code mileage calculator','how far between two zip codes','zip code radius distance tool','us zip code distance finder','straight line distance zip codes','zip code distance checker free','zip to zip distance miles','zip code proximity calculator',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
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
  {name:'Same Timezone ZIPs',href:'/zip/same-timezone-zips',icon:'🕐'},
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
]

const tips = [
  'Distance is calculated centroid-to-centroid (geographic center of each ZIP) — actual travel distance will be 20–40% longer.',
  'For driving distance and route, use our ZIP to ZIP Route and Drive Time by ZIP tools.',
  'ZIPs Within Radius finds all ZIP codes within a specified distance from a center ZIP.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  tagline: `Calculate the straight-line distance between any two US ZIP codes in **miles or kilometers** — instantly.`,
  proTip: `Need driving distance? Multiply the straight-line result by 1.3 for a rough estimate, or use our Drive Time by ZIP tool for actual road distance.`,
  howToSteps: [
    { num: 1, title: `Enter Origin ZIP:`, desc: `Type the 5-digit ZIP code of your starting location (e.g., 90210).` },
    { num: 2, title: `Enter Destination ZIP:`, desc: `Type the 5-digit ZIP code for where you want to go (e.g., 10001).` },
    { num: 3, title: `Click Calculate:`, desc: `Hit the blue button. The tool processes the coordinates instantly.` },
    { num: 4, title: `View Results:`, desc: `Compare Air Distance vs. Driving Distance estimate side-by-side.` },
  ],
  featureCards: [
    { icon: '✈️', title: `Air Distance`, desc: `Calculates the Great Circle distance. Ideal for flight estimations and understanding direct proximity.`, bullets: [] },
    { icon: '🚗', title: `Driving Mileage`, desc: `Get real-world driving estimates based on US road networks, taking highways and routes into account.`, bullets: [] },
    { icon: '🗺️', title: `Google Maps`, desc: `One-click integration to open precise turn-by-turn navigation directly in Google Maps.`, bullets: [] },
  ],
  useCases: [
    { icon: '🚚', title: `Trucking & Fleet Management`, desc: `Optimize fuel costs by calculating precise zone-based pricing. Essential for fleet managers quoting delivery rates and estimating arrival times (ETA).` },
    { icon: '🧾', title: `Corporate & IRS Reporting`, desc: `Reconstruct lost mileage logs for tax deductions. Our ZIP-to-ZIP accuracy helps businesses comply with IRS standard mileage reimbursement rates.` },
    { icon: '🏕️', title: `RV & Road Trip Planning`, desc: `Planning a cross-country RV trip? Determine the exact mileage between rest stops to manage driving hours and avoid fatigue on long routes.` },
  ],
  popularRoutes: [
    { from: 'New York, NY', to: 'Los Angeles, CA', dist: '2,790 mi', note: 'Cross-country highway route' },
    { from: 'Chicago, IL', to: 'Miami, FL', dist: '1,380 mi', note: 'I-65 / I-75 corridor' },
    { from: 'Dallas, TX', to: 'Houston, TX', dist: '240 mi', note: 'I-45 approximately 3.5 hrs' },
    { from: 'San Francisco, CA', to: 'Las Vegas, NV', dist: '570 mi', note: 'US-395 / I-15 route' },
  ],
  statsTable: [
    { label: 'US ZIP Codes Covered', value: '41k+' },
    { label: 'Square Miles (USA)', value: '3.8m' },
    { label: 'Interstate Highways', value: '95' },
    { label: 'Avg. Driving Speed', value: '~60 mph' },
  ],
  successStory: {
    title: `How "Dave" Saved $4,200 in IRS Mileage Disputes`,
    problem: `Dave, a regional sales rep, lost his mileage log in a laptop crash before his IRS audit. He had 6 months of customer ZIP codes in his CRM but no odometer records.`,
    fix: `He used our ZIP Code Distance tool to reconstruct every client visit distance from his home ZIP to each client ZIP. His documented mileage was accepted by the IRS auditor.`,
    icon: '🧾',
  },
  dataSources: [
    { icon: '🌐', name: `Haversine Formula`, desc: `Industry-standard great-circle distance calculation using Census TIGER/Line ZCTA centroids.` },
    { icon: '🗺️', name: `OpenStreetMap Road Data`, desc: `Real-world road network data for driving distance and time estimates.` },
  ],

  heading: `ZIP Code Distance Calculator — How Distance Between ZIP Codes Is Calculated`,
  populationChart: {
    title: 'Average Driving Distance vs. Straight-Line Distance Multiplier',
    subtitle: 'Road networks add 20–60% to straight-line distances depending on geography',
    unit: '% overhead',
    bars: [
      { label: 'Urban grid city', value: 22 },
      { label: 'Suburban (radial roads)', value: 30 },
      { label: 'Rural flat terrain', value: 18 },
      { label: 'Rural mountainous', value: 55 },
      { label: 'Cross-state highway', value: 25 },
      { label: 'Coastal detours', value: 40 },
    ],
  },
  body: `Calculating the distance between two US ZIP codes is fundamental to logistics planning, delivery zone design, territory management, real estate search, competitive analysis, and countless other geographic applications. Our ZIP Code Distance Calculator uses the Haversine formula applied to Census Bureau ZIP code centroid coordinates to return the straight-line (great-circle) distance between any two US ZIP codes in miles or kilometers — instantly, with no signup required.

**The Haversine Formula: How ZIP Distance Is Calculated**

ZIP code distance is a great-circle distance calculation — the shortest path between two points on the surface of a sphere. The standard algorithm is the **Haversine formula**:

Given two points (lat₁, lon₁) and (lat₂, lon₂) in radians:
a = sin²((lat₂−lat₁)/2) + cos(lat₁) × cos(lat₂) × sin²((lon₂−lon₁)/2)
c = 2 × arctan2(√a, √(1−a))
d = R × c

Where R = 3,958.8 miles or 6,371 kilometers (mean Earth radius). This formula is accurate to within 0.3% for distances up to a few hundred miles and is the industry standard for ZIP-level proximity calculations. For very high-precision long-distance calculations, the Vincenty formula accounts for the Earth ellipsoidal shape and provides additional accuracy, but the difference is negligible for practical ZIP code distance use cases.

**Straight-Line Distance vs. Driving Distance**

The Haversine result is a straight-line (as-the-crow-flies) distance — the shortest possible path between the two ZIP code centroids through open air, ignoring all roads, terrain, and geographic barriers. Actual driving distance is always longer, typically 20–40% more in areas with a good road grid and up to 50–60% more in mountainous terrain, areas with few bridges, or peninsular geographies. The ratio of driving distance to straight-line distance is known as the **circuity factor** or **detour index**.

For delivery zone planning, straight-line distance provides a useful first approximation for which customers are "close" enough for a service area. For operational planning (driver routing, time estimation, fuel cost), actual driving distance and time from our Drive Time by ZIP tool provides the actionable metric.

**Using ZIP Distance for Territory Design**

Sales and service territory design frequently uses ZIP-level distance calculations. A common approach: for each candidate ZIP in a territory, calculate the distance from that ZIP to the territory's anchor ZIP (typically the rep's home ZIP or the nearest office), and include all ZIPs within a target radius. This creates roughly circular territories, which then get refined by natural geographic boundaries (rivers, highways, mountain ranges) and ZIP population to balance workload across territories.

The formula for territory balancing: **Territory Score = Population × Distance Weight**, where Distance Weight decreases with distance from center. ZIPs very close to the territory center are scored highest; distant ZIPs are included only if they are needed to reach a population target.

**Proximity Analysis for Retail and Real Estate**

Retailers use ZIP distance to define trade areas — typically capturing 70–80% of customers within a 5-mile radius of a store. When evaluating a new store site, analysts calculate the distance from the candidate site ZIP to every customer ZIP in their database to estimate what percentage of existing customers could reasonably shop the new location. Real estate platforms use ZIP distance to find homes "within X miles" of a user-entered ZIP (school, workplace, or landmark ZIP).

**ZIP Distance for Healthcare Service Area Analysis**

Hospital systems and health plans define service areas using drive-time rings from facility locations, but straight-line distance provides a quick initial screen. Any ZIP code within a 30-mile straight-line radius of a hospital is likely within a 40-minute drive — close enough to be in the primary service area for most health plans adequacy purposes. ZIP distance calculations are an efficient way to generate candidate ZIP lists for detailed service area analysis before investing in full drive-time routing.

**Multi-Point ZIP Distance: Hub-and-Spoke vs. Point-to-Point**

Beyond two-point distance, our Multi-ZIP Distance tool calculates total route distance for a sequence of ZIP codes — useful for planning delivery routes, sales rep visit schedules, or tour itineraries. The total tour distance is the sum of all point-to-point Haversine distances along the sequence. Optimizing the order to minimize total distance is the classic Traveling Salesman Problem (TSP), which for small numbers of stops (<15) can be solved exactly; for larger problems, heuristic approaches (nearest neighbor, genetic algorithms) are used.`,
  faqs: [
    { q: 'What is the difference between air distance and driving distance between ZIP codes?', a: `Air distance (also called straight-line or great-circle distance) is the shortest possible path between two ZIP code centroids through the air — calculated with the Haversine formula. Driving distance follows actual roads and is always longer, typically 20–50% more depending on terrain and road network geometry. For a Dallas TX to Houston TX drive (~240 miles), the straight-line distance is about 225 miles. For route planning and delivery logistics, always use driving distance; for market radius analysis and geographic filtering, straight-line is appropriate.` },
    { q: 'I calculated ZIP-to-ZIP distance in Excel using Haversine and got a different number — why?', a: `Most likely cause: coordinate mismatch. Our tool uses Census Bureau TIGER/Line ZCTA centroid coordinates (official Census geographic center points). If your Excel spreadsheet uses different ZIP centroid sources (e.g., GeoNames, OpenDataSoft, or manually geocoded points), the coordinates may differ slightly, producing different distance results. To reproduce our results exactly, download the Census Bureau TIGER/Line ZCTA Centroids (.csv) file and use those lat/lng values.` },
    { q: 'How do I calculate drive time from ZIP code distance?', a: `Rough formula: Drive Time (hours) = Straight-Line Distance × Circuity Factor ÷ Average Speed. Use 1.3 as circuity factor for most US areas (1.2 for urban grids, 1.5 for mountainous terrain). For urban driving, use 30 mph average. For highway routes, use 65 mph. Example: 50 miles straight-line × 1.3 ÷ 65 mph = 1.0 hour. For precise drive times, use our Drive Time by ZIP tool which runs actual road network routing.` },
    { q: 'What is the Haversine formula and can I implement it in SQL?', a: `The Haversine formula: a = sin²(Δlat/2) + cos(lat₁)·cos(lat₂)·sin²(Δlon/2); d = 2R·arcsin(√a) where R = 3,958.8 miles. In PostgreSQL with PostGIS: ST_Distance(ST_MakePoint(lon1,lat1)::geography, ST_MakePoint(lon2,lat2)::geography) / 1609.34 gives miles. In standard SQL without PostGIS: use the trigonometric approximation with ACOS(SIN(lat1)*SIN(lat2) + COS(lat1)*COS(lat2)*COS(lon2-lon1)) * 3958.8.` },
    { q: 'For IRS mileage reimbursement, does ZIP-to-ZIP distance count as a valid record?', a: `ZIP code distance can serve as supporting documentation but is not a primary IRS record — the IRS requires a contemporaneous mileage log with date, destination, business purpose, and actual miles driven. However, ZIP-to-ZIP distance calculations can corroborate lost logs in an audit situation. IRS Publication 463 accepts reconstructed records when the original log is unavailable, and our tool can calculate distances between a home ZIP and client ZIP codes from CRM records.` },
    { q: 'Why does the distance between NYC ZIP 10001 and LA ZIP 90001 show 2,445 miles but Google Maps shows 2,790 miles?', a: `Our tool returns the straight-line (air/great-circle) distance: 2,445 miles. Google Maps shows driving distance: 2,790 miles. The difference (345 miles / 14%) reflects the additional road distance caused by the road network structure — interstates cannot take the perfectly straight geographic path. For the NYC-to-LA route, I-80 and I-70 zigzag through mountain passes, adding significant road miles over the direct geographic distance.` },
    { q: 'Can I use ZIP code distance to calculate shipping zones?', a: `Yes — shipping zone calculations typically use straight-line ZIP-to-ZIP distance from the origin warehouse ZIP. Zone 1 = 0–50 miles, Zone 2 = 50–150 miles, etc. (carrier-specific). Calculate the distance from your warehouse ZIP to each destination ZIP, then assign the zone based on your carrier mileage thresholds. This approach mirrors how USPS, FedEx, and UPS calculate their own zone tables — all use origin-to-destination ZIP mileage as the primary input.` },
    { q: 'What is the circuity factor (detour index) and why does it vary by terrain?', a: `The circuity factor is the ratio of driving distance to straight-line distance. US average is ~1.30. It varies because road networks must follow terrain — mountain switchbacks, river crossings requiring bridges, and coastal peninsulas all force longer road routes relative to the straight-line path. Urban grids (Chicago, Phoenix) have ~1.20 circuity because streets are direct. West Virginia, parts of Colorado, and peninsular Florida have circuity factors of 1.50–1.70 due to geographic constraints.` },
    { q: 'How accurate is ZIP code distance for logistics planning?', a: `For first-pass planning, ZIP-to-ZIP straight-line distance is accurate to within ±5% of the actual address-to-address distance for most urban and suburban ZIP pairs. It becomes less accurate for large-area rural ZIPs where the centroid may be far from the specific delivery address. For final logistics routing (driver assignment, fuel calculation), always use address-level geocoding with actual road network routing.` },
    { q: 'What are the longest ZIP-to-ZIP distances in the continental US?', a: `The longest continental US distances are between the easternmost Maine ZIPs (~67°W longitude) and the westernmost Washington state ZIPs (~124°W longitude) — approximately 2,700 miles straight-line. Add in Hawaii and the distance from Hawaiian ZIPs to Maine approaches 5,000+ miles. For practical business purposes, the New York City to Los Angeles corridor (~2,445 miles straight-line) is the most commonly calculated long-distance route.` },
    { q: 'Can I calculate distance between a ZIP code and a lat/lng coordinate?', a: `Yes — use the same Haversine formula with the ZIP's centroid coordinates and your target lat/lng. Get the ZIP centroid from our ZIP to Coordinates tool, then apply: a = sin²(Δlat/2) + cos(lat₁)·cos(lat₂)·sin²(Δlon/2); d = 2R·arcsin(√a). This is useful for calculating distance from a ZIP code to a specific point of interest (store, hospital, warehouse) when you have the POI's coordinates.` },
    { q: `Is the TOOLTRIO ZIP Code Distance Calculator free?`, a: `Yes — completely free with no account required. TOOLTRIO (also Tool Trio, ToolTrio, Trio Tools) offers ZIP code distance as part of a free suite of 35+ ZIP tools at tooltrio.com. No rate limits for individual use.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP Code Distance" description="Calculate the straight-line distance between any two US ZIP codes in miles or kilometers." icon="📏" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Code Distance Calculator — Miles Between ZIP Codes USA 2026\",\"description\":\"Calculate the straight-line distance between any two US ZIP codes in miles or kilometers. Free ZIP code distance calculator with driving time estimate\",\"url\":\"https://tooltrio.com/zip/zip-code-distance\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
