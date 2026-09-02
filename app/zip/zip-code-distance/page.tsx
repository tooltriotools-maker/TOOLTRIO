import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import dynamic from 'next/dynamic'
const ZipToolClient = dynamic(() => import('./ZipToolClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = {
  title:'US ZIP Code Distance Calculator – Distance Between ZIP Codes | ToolTrio',
  description:'Free US ZIP code distance calculator. Enter two ZIP codes to calculate the distance between them in miles and kilometers, compare straight-line distance with an estimated road distance, and open the route in Google Maps.',
 
 keywords: [
  'zip code distance calculator',
  'zip distance calculator',
  'zip distance',
  'zip code distance',
  'distance between zip codes',
  'distance between two zip codes',
  'distance between zip codes calculator',
  'zip to zip distance',
  'zip to zip distance calculator',
  'mileage calculator zip code to zip code',
  'mileage calculator zip code to',
  'US zip code distance calculator',
  'US zip distance calculator',
  'zip distance calculator online',
  'free zip distance calculator',
  'driving distance between zip codes',
  'straight line distance between zip codes',
  'air distance between zip codes',
],

  alternates: { canonical: 'https://tooltrio.com/zip/zip-code-distance' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/zip/zip-code-distance',
    siteName: 'ToolTrio',
    title:'US ZIP Code Distance Calculator – Distance Between ZIP Codes | ToolTrio',
    description:'Calculate the distance between two US ZIP codes online in miles and kilometers. Compare straight-line and estimated road distance, then open the route in Google Maps.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ZIP Code Distance Calculator — Miles Between Two ZIP Codes USA Free 2026 | ToolTrio' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US ZIP Code Distance Calculator – Distance Between ZIP Codes | ToolTrio',
    description:'Calculate the distance between two US ZIP codes online in miles and kilometers. Compare straight-line and estimated road distance, then open the route in Google Maps.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const relatedTools = [
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
  {name:'ZIP+4 Lookup',href:'/zip/zip-plus-4-lookup',icon:'➕'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'Same Timezone ZIPs',href:'/zip/same-timezone-zips',icon:'🕐'},
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
]

const tips = [
  'ZIP distance is based on representative coordinates. Estimated road distance can differ depending on roads, terrain, bridges, and geography.',
  'For driving distance and route, use our ZIP to ZIP Route and Drive Time by ZIP tools.',
  'ZIPs Within Radius finds all ZIP codes within a specified distance from a center ZIP.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  tagline: `Find the distance between any two US ZIP codes in **miles and kilometers**. Compare **straight-line distance** with an **estimated driving distance** for shipping, travel, service areas and geographic planning.`,
  proTip: `✓ Free • ✓ No Signup • ✓ 5-Digit US ZIP Lookup • ✓ Updated for 2026 • Need exact road mileage? Use our Drive Time by ZIP tool.`,
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
    { icon: '🏢',title: 'Sales Territory Planning',desc: 'Compare ZIP-to-ZIP proximity when reviewing customer territories, branch coverage, service areas, and regional sales assignments.'},
    { icon: '📦',title: 'Delivery & Service Areas',desc: 'Use ZIP distance as a first-pass geographic screen when evaluating delivery zones, customer coverage, and warehouse service areas.'},
    { icon: '🚚',title: 'Travel & Logistics Planning',desc: 'Compare locations before checking a detailed road route, then use the map link to verify the actual driving path.'},
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

  dataSources: [
    // { icon: '🌐', name: `Haversine Formula`, desc: `Industry-standard great-circle distance calculation using Census TIGER/Line ZCTA centroids.` },
    // { icon: '🗺️', name: `OpenStreetMap Road Data`, desc: `Real-world road network data for driving distance and time estimates.` },
  
  {
    icon: '🏛️',
    name: 'U.S. Census Bureau Geography',
    desc:
      'Census geographic documentation explains the distinction between USPS ZIP Codes and Census ZIP Code Tabulation Areas (ZCTAs), which is important when interpreting ZIP-level geographic calculations.',
  },
  {
    icon: '📐',
    name: 'Haversine Distance',
    desc:
      'ToolTrio calculates straight-line geographic distance from latitude and longitude using the Haversine formula and reports the result in miles and kilometers.',
  },

  ],

  heading: `ZIP Code Distance Between Two US ZIP Codes Calculator — How Distance Between ZIP Codes Is Calculated`,
  // populationChart: {
  //   title: 'Average Driving Distance vs. Straight-Line Distance Multiplier',
  //   subtitle: 'Road networks add 20–60% to straight-line distances depending on geography',
  //   unit: '% overhead',
  //   bars: [
  //     { label: 'Urban grid city', value: 22 },
  //     { label: 'Suburban (radial roads)', value: 30 },
  //     { label: 'Rural flat terrain', value: 18 },
  //     { label: 'Rural mountainous', value: 55 },
  //     { label: 'Cross-state highway', value: 25 },
  //     { label: 'Coastal detours', value: 40 },
  //   ],
  // },
body: `
**ZIP Distance Calculator: Calculate Miles Between ZIP Codes**

Use this free ZIP distance calculator to find the distance between two US ZIP codes in miles and kilometers. Enter a five-digit ZIP code for the starting location and another five-digit ZIP code for the destination. The calculator looks up the geographic coordinates associated with each ZIP and calculates the straight-line distance between the two locations.

You can use the result for travel planning, delivery-area analysis, sales territories, shipping estimates, relocation research, geographic comparisons, and other situations where you need a quick ZIP-to-ZIP distance.

The calculator reports the geographic distance separately from the estimated road distance. This distinction matters because a straight-line ZIP distance is not the same measurement as the number of miles a driver will travel on the road.

**US ZIP Code Distance Calculator: What You Get**

After entering two ZIP codes, the tool identifies the corresponding locations and provides:

- the origin ZIP code and city,
- the destination ZIP code and city,
- straight-line distance in miles,
- distance in kilometers,
- an estimated road distance,
- estimated travel time,
- an estimated fuel-cost range,
- timezone information,
- and a Google Maps route link for checking the actual road route.

This makes the page useful as both a ZIP distance calculator and a quick ZIP-to-ZIP mileage planning tool.

**ZIP Distance Calculator Online and Free**

The calculator runs online in your browser without requiring a download or account. You can enter another pair of ZIP codes whenever you need a new result.

For example, you can compare ZIP codes within the same city, between neighboring states, or across the United States. The same workflow works for short local distances and long cross-country comparisons.

**Mileage Calculator: ZIP Code to ZIP Code**

If you searched for a mileage calculator from one ZIP code to another, the important distinction is which type of mileage you need.

A ZIP-to-ZIP straight-line calculation measures the geographic separation between the representative coordinates of the two ZIP areas. A road-mileage calculation follows a route and therefore depends on the road network.

Use the straight-line result when you need geographic proximity, radius analysis, territory screening, or a quick distance comparison. Use a road-routing service when the exact miles driven by a vehicle are required.

**Distance Between ZIP Codes: Straight-Line vs. Road Distance**

Straight-line distance is calculated from coordinates and represents the shortest geographic distance between the two representative points. It does not follow highways, local streets, bridges, tunnels, or other road infrastructure.

Road distance is different. A vehicle may need to travel around a lake, cross a bridge, follow a mountain pass, or take a highway that does not follow the shortest geographic path.

That is why two ZIP codes can be relatively close geographically while requiring substantially more road miles to travel between them.

For an exact turn-by-turn route, use the Google Maps link provided after the calculation.

**Why ZIP Code Distance Can Differ From Google Maps**

A ZIP code is not a street address. The ZIP used by a calculator represents a geographic area or postal service area, so the calculation depends on the representative coordinates used for that ZIP.

Google Maps, by contrast, can calculate a route between specific coordinates or addresses and follows the available road network.

Therefore, these numbers answer different questions:

| Measurement | What it tells you | Best use |
| Straight-line ZIP distance | Geographic separation between ZIP representative points | Radius and proximity analysis |
| Estimated road distance | Approximate vehicle mileage | Planning and comparison |
| Google Maps route distance | Road route for the selected map points | Navigation and final route checking |

**How the ZIP Distance Calculation Works**

The straight-line calculation uses the latitude and longitude associated with each ZIP location and the Haversine formula.

The Haversine formula accounts for the Earth's curvature rather than treating the United States as a flat map. It converts the latitude and longitude difference between the two points into an angular distance and then converts that value into miles or kilometers.

The basic formula is:

a = sin²(Δlat / 2) + cos(lat₁) × cos(lat₂) × sin²(Δlon / 2)

c = 2 × atan2(√a, √(1 − a))

distance = R × c

where R is the Earth's mean radius.

This is appropriate for a ZIP-level geographic distance calculation because the input itself is representative rather than an exact street address.

**ZIP Codes Are Not the Same Thing as ZCTAs**

One important technical detail is that a USPS ZIP Code and a Census ZIP Code Tabulation Area (ZCTA) are not identical concepts.

ZIP Codes are created for mail delivery, while ZCTAs are generalized geographic representations created by the Census Bureau for mapping and statistical analysis. The Census Bureau explicitly notes that not every USPS ZIP Code has a corresponding ZCTA.

This matters when comparing ZIP datasets from different sources. Two databases can use slightly different representative points or coverage rules and therefore return slightly different distance values.

**When ZIP Distance Is Useful**

A ZIP distance calculator is useful for:

- delivery-area screening,
- sales-territory analysis,
- warehouse and service-area comparisons,
- relocation research,
- travel planning,
- shipping-distance estimates,
- customer proximity analysis,
- market-area research,
- real-estate location comparisons,
- and quick geographic comparisons.

For a final driving itinerary, however, use a road-routing service rather than treating a ZIP-centroid calculation as an exact route.

**Common ZIP-to-ZIP Distance Questions**

People often search for this tool using different wording: “zip distance,” “distance between zip codes,” “zip distance calculator online,” “US ZIP code distance calculator,” or “mileage calculator ZIP code to ZIP code.”

These phrases describe the same basic workflow: provide two ZIP codes and determine how far apart their representative locations are.

The calculation itself does not change because the search phrase changes. What matters is whether the user needs straight-line geographic distance or actual road mileage.

**How to Get the Most Useful Result**

For the best result, enter the ZIP codes that correspond as closely as possible to the locations you are comparing. Remember that a ZIP code can cover an area rather than a single building.

If the calculation is being used for an actual trip, delivery, reimbursement, or dispatch decision, verify the final route using a road-routing service and, when possible, the exact street addresses.

`,

infoTable: {
  title: 'Which ZIP Distance Measurement Should You Use?',
  subtitle:
    'Choose the distance type based on what you are trying to measure.',
  icon: '📏',
  columns: [
    'Measurement',
    'Input',
    'What It Measures',
    'Best For',
  ],
  rows: [
    [
      'ZIP straight-line distance',
      'Two ZIP codes',
      'Geographic separation',
      'Radius and proximity analysis',
    ],
    [
      'Estimated ZIP-to-ZIP road distance',
      'Two ZIP codes',
      'Approximate vehicle mileage',
      'Planning and comparison',
    ],
    [
      'Google Maps route',
      'ZIP coordinates or addresses',
      'Road-network route',
      'Navigation and final route checking',
    ],
  ],
},



  // faqs: [
  //   { q: 'What is the difference between air distance and driving distance between ZIP codes?', a: `Air distance (also called straight-line or great-circle distance) is the shortest possible path between two ZIP code centroids through the air — calculated with the Haversine formula. Driving distance follows actual roads and is always longer, typically 20–50% more depending on terrain and road network geometry. For a Dallas TX to Houston TX drive (~240 miles), the straight-line distance is about 225 miles. For route planning and delivery logistics, always use driving distance; for market radius analysis and geographic filtering, straight-line is appropriate.` },
  //   { q: 'I calculated ZIP-to-ZIP distance in Excel using Haversine and got a different number — why?', a: `Most likely cause: coordinate mismatch. Our tool uses Census Bureau TIGER/Line ZCTA centroid coordinates (official Census geographic center points). If your Excel spreadsheet uses different ZIP centroid sources (e.g., GeoNames, OpenDataSoft, or manually geocoded points), the coordinates may differ slightly, producing different distance results. To reproduce our results exactly, download the Census Bureau TIGER/Line ZCTA Centroids (.csv) file and use those lat/lng values.` },
  //   { q: 'How do I calculate drive time from ZIP code distance?', a: `Rough formula: Drive Time (hours) = Straight-Line Distance × Circuity Factor ÷ Average Speed. Use 1.3 as circuity factor for most US areas (1.2 for urban grids, 1.5 for mountainous terrain). For urban driving, use 30 mph average. For highway routes, use 65 mph. Example: 50 miles straight-line × 1.3 ÷ 65 mph = 1.0 hour. For precise drive times, use our Drive Time by ZIP tool which runs actual road network routing.` },
  //   { q: 'What is the Haversine formula and can I implement it in SQL?', a: `The Haversine formula: a = sin²(Δlat/2) + cos(lat₁)·cos(lat₂)·sin²(Δlon/2); d = 2R·arcsin(√a) where R = 3,958.8 miles. In PostgreSQL with PostGIS: ST_Distance(ST_MakePoint(lon1,lat1)::geography, ST_MakePoint(lon2,lat2)::geography) / 1609.34 gives miles. In standard SQL without PostGIS: use the trigonometric approximation with ACOS(SIN(lat1)*SIN(lat2) + COS(lat1)*COS(lat2)*COS(lon2-lon1)) * 3958.8.` },
  //   { q: 'For IRS mileage reimbursement, does ZIP-to-ZIP distance count as a valid record?', a: `ZIP code distance can serve as supporting documentation but is not a primary IRS record — the IRS requires a contemporaneous mileage log with date, destination, business purpose, and actual miles driven. However, ZIP-to-ZIP distance calculations can corroborate lost logs in an audit situation. IRS Publication 463 accepts reconstructed records when the original log is unavailable, and our tool can calculate distances between a home ZIP and client ZIP codes from CRM records.` },
  //   { q: 'Why does the distance between NYC ZIP 10001 and LA ZIP 90001 show 2,445 miles but Google Maps shows 2,790 miles?', a: `Our tool returns the straight-line (air/great-circle) distance: 2,445 miles. Google Maps shows driving distance: 2,790 miles. The difference (345 miles / 14%) reflects the additional road distance caused by the road network structure — interstates cannot take the perfectly straight geographic path. For the NYC-to-LA route, I-80 and I-70 zigzag through mountain passes, adding significant road miles over the direct geographic distance.` },
  //   { q: 'Can I use ZIP code distance to calculate shipping zones?', a: `Yes — shipping zone calculations typically use straight-line ZIP-to-ZIP distance from the origin warehouse ZIP. Zone 1 = 0–50 miles, Zone 2 = 50–150 miles, etc. (carrier-specific). Calculate the distance from your warehouse ZIP to each destination ZIP, then assign the zone based on your carrier mileage thresholds. This approach mirrors how USPS, FedEx, and UPS calculate their own zone tables — all use origin-to-destination ZIP mileage as the primary input.` },
  //   { q: 'What is the circuity factor (detour index) and why does it vary by terrain?', a: `The circuity factor is the ratio of driving distance to straight-line distance. US average is ~1.30. It varies because road networks must follow terrain — mountain switchbacks, river crossings requiring bridges, and coastal peninsulas all force longer road routes relative to the straight-line path. Urban grids (Chicago, Phoenix) have ~1.20 circuity because streets are direct. West Virginia, parts of Colorado, and peninsular Florida have circuity factors of 1.50–1.70 due to geographic constraints.` },
  //   { q: 'How accurate is ZIP code distance for logistics planning?', a: `For first-pass planning, ZIP-to-ZIP straight-line distance is accurate to within ±5% of the actual address-to-address distance for most urban and suburban ZIP pairs. It becomes less accurate for large-area rural ZIPs where the centroid may be far from the specific delivery address. For final logistics routing (driver assignment, fuel calculation), always use address-level geocoding with actual road network routing.` },
  //   { q: 'What are the longest ZIP-to-ZIP distances in the continental US?', a: `The longest continental US distances are between the easternmost Maine ZIPs (~67°W longitude) and the westernmost Washington state ZIPs (~124°W longitude) — approximately 2,700 miles straight-line. Add in Hawaii and the distance from Hawaiian ZIPs to Maine approaches 5,000+ miles. For practical business purposes, the New York City to Los Angeles corridor (~2,445 miles straight-line) is the most commonly calculated long-distance route.` },
  //   { q: 'Can I calculate distance between a ZIP code and a lat/lng coordinate?', a: `Yes — use the same Haversine formula with the ZIP's centroid coordinates and your target lat/lng. Get the ZIP centroid from our ZIP to Coordinates tool, then apply: a = sin²(Δlat/2) + cos(lat₁)·cos(lat₂)·sin²(Δlon/2); d = 2R·arcsin(√a). This is useful for calculating distance from a ZIP code to a specific point of interest (store, hospital, warehouse) when you have the POI's coordinates.` },
  //   { q: `Is the TOOLTRIO ZIP Code Distance Calculator free?`, a: `Yes — completely free with no account required. TOOLTRIO (also Tool Trio, ToolTrio, Trio Tools) offers ZIP code distance as part of a free suite of 35+ ZIP tools at tooltrio.com. No rate limits for individual use.` },
  // ],


  faqs: [
  {
    q: 'How do I calculate the distance between two ZIP codes?',
    a: 'Enter the two five-digit US ZIP codes into the calculator and select Calculate. ToolTrio looks up the representative coordinates for both ZIP codes and calculates their straight-line distance in miles and kilometers. An estimated road distance is also shown for planning.',
  },
  {
    q: 'What is a ZIP distance calculator?',
    a: 'A ZIP distance calculator measures the geographic distance between two ZIP codes. Most ZIP distance calculations use representative latitude and longitude coordinates and the Haversine formula to calculate straight-line distance.',
  },
  {
    q: 'Is this a free ZIP code distance calculator online?',
    a: 'Yes. ToolTrio provides the ZIP Code Distance Calculator online without requiring an account or software installation.',
  },
  {
    q: 'What is the distance between ZIP codes?',
    a: 'The distance between ZIP codes depends on the two ZIP codes you enter and the measurement method. ToolTrio reports straight-line distance and an estimated road distance so you can distinguish geographic distance from approximate vehicle mileage.',
  },
  {
    q: 'What is the difference between ZIP distance and driving distance?',
    a: 'ZIP distance normally refers to straight-line geographic distance between representative ZIP coordinates. Driving distance follows roads and is generally longer. Use the Google Maps route link after calculating when you need to inspect the actual road route.',
  },
  {
    q: 'Can I use this as a mileage calculator from ZIP code to ZIP code?',
    a: 'Yes. Enter the origin ZIP code and destination ZIP code to get a ZIP-to-ZIP distance result in miles and kilometers, along with an estimated road-distance figure.',
  },
  {
    q: 'Can I calculate ZIP code distance in miles and kilometers?',
    a: 'Yes. The result provides both miles and kilometers.',
  },
  {
    q: 'Why is my ZIP distance different from Google Maps?',
    a: 'ZIP distance and Google Maps route distance can measure different things. A ZIP distance is based on representative geographic coordinates, while Google Maps can calculate a road route. Large ZIP areas and road geography can make the two numbers differ significantly.',
  },
  {
    q: 'Does ZIP code distance equal driving distance?',
    a: 'No. ZIP-to-ZIP straight-line distance is a geographic measurement. Driving distance follows the road network and is usually longer.',
  },
  {
    q: 'How accurate is ZIP-to-ZIP distance?',
    a: 'The straight-line calculation is mathematically precise for the representative coordinates supplied to it, but the coordinates themselves represent a ZIP area rather than a specific street address. For exact trip mileage, verify the final route using a road-routing service and, when possible, the actual addresses.',
  },
],



}



export default function Page() {
  return (
    <ZipToolLayout
      slug="zip-code-distance" title="US ZIP Code Distance Calculator" description="Calculate the straight-line distance between any two US ZIP codes in miles or kilometers." icon="📏" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
