import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Codes Within Radius — Find All ZIPs Within Miles of a ZIP 2026',
  description: 'Find all US ZIP codes within a specified radius in miles or kilometers from any center ZIP code. Free radius search tool for marketing, logistics, and territory planning. Free on TOOLTRIO — no signup needed.',
  keywords: ['zips within radius','zip codes within radius','zip codes within miles','zip codes within 10 miles','zip codes near zip code radius','find zip codes in radius','zip code radius search','all zip codes within distance','zip code mile radius tool','zip code radius finder usa','zip codes in 5 mile radius','zip codes in 25 mile radius','zip code proximity list','zip code catchment area','find nearby zip codes list',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
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
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'Largest ZIP Codes',href:'/zip/largest-zip-codes',icon:'📊'},
]

const tips = [
  'Results use centroid-to-centroid distance — a large-area ZIP may be excluded if its centroid is far even if its boundary is close.',
  'Urban areas return many more ZIPs per mile than rural areas due to higher ZIP density.',
  'Export results for use in ad platforms (Facebook, Google, direct mail) for precise geographic targeting.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  tagline: `Find **every US ZIP code** within a specified radius — for targeting, territory design, and local marketing.`,
  proTip: `Urban areas return 50–120 ZIPs per 10-mile radius. Rural areas return 5–15. Always check result count before using in ad campaigns.`,
  howToSteps: [
    { num: 1, title: `Enter Center ZIP:`, desc: `Type the ZIP code you want to search from (your store, warehouse, or HQ).` },
    { num: 2, title: `Set Radius:`, desc: `Choose a distance in miles (5, 10, 25, 50 miles or custom).` },
    { num: 3, title: `Run Search:`, desc: `Click the button to find all ZIPs within your radius instantly.` },
    { num: 4, title: `Export Results:`, desc: `Copy or export the ZIP list for ad platforms, mail lists, or CRM filters.` },
  ],
  featureCards: [
    { icon: '🎯', title: `Radius Precision`, desc: `Haversine formula centroid-to-centroid distance. Accurate to within 0.1 miles for all US ZIP pairs.`, bullets: [] },
    { icon: '📋', title: `Instant Export`, desc: `Copy your ZIP list directly for use in Google Ads, Meta Ads, or any direct mail platform.`, bullets: [] },
    { icon: '📊', title: `Population Included`, desc: `Each result includes population estimate so you can size your audience before launching.`, bullets: [] },
  ],
  useCases: [
    { icon: '📬', title: `Direct Mail Campaigns`, desc: `Build precise mailing lists by ZIP radius instead of rough city or county targeting. Get only the ZIPs you actually want to reach.` },
    { icon: '🏪', title: `Local Business Targeting`, desc: `Find all ZIP codes within delivery range of your restaurant, store, or service business. Set delivery zones with confidence.` },
    { icon: '🏥', title: `Healthcare Service Areas`, desc: `Define patient catchment areas for CMS network adequacy reporting. Identify ZIP codes within your required drive-time threshold.` },
  ],
  statsTable: [
    { label: 'ZIP Codes Searched', value: '42,000+' },
    { label: '5-Mile Urban Result', value: '~40 ZIPs' },
    { label: '25-Mile Urban Result', value: '~250 ZIPs' },
    { label: 'Max Supported Radius', value: '500 miles' },
  ],
  dataSources: [
    { icon: '🌐', name: `Census TIGER/Line Centroids`, desc: `WGS 84 centroid coordinates for all active ZIP Code Tabulation Areas.` },
    { icon: '📮', name: `USPS AMS Database`, desc: `Active ZIP code status verification — only returns deliverable ZIP codes.` },
  ],

  heading: `ZIPs Within Radius — How to Find All ZIP Codes Within a Distance`,
  populationChart: {
    title: 'Approximate Number of ZIP Codes Within Common Search Radii',
    subtitle: 'Urban areas return far more ZIPs per radius mile than rural areas',
    unit: 'ZIP codes (urban est.)',
    bars: [
      { label: '5-mile urban', value: 40 },
      { label: '10-mile urban', value: 100 },
      { label: '25-mile urban', value: 250 },
      { label: '50-mile urban', value: 500 },
      { label: '5-mile rural', value: 4 },
      { label: '25-mile rural', value: 20 },
    ],
  },
  statsTable: [
    { label: 'Distance formula', value: 'Haversine (great-circle)' },
    { label: 'Total ZIPs searched', value: '42,000+' },
    { label: 'Results sorted by', value: 'Distance from center (nearest first)' },
    { label: 'Max supported radius', value: '500 miles' },
    { label: 'Rural 10-mile result avg', value: '~8–15 ZIPs' },
    { label: 'Urban 10-mile result avg', value: '~50–120 ZIPs' },
  ],
  body: `Finding every US ZIP code within a specific radius of a center ZIP code is one of the most powerful geographic operations for marketing, logistics, territory analysis, healthcare planning, and competitive intelligence. Our ZIPs Within Radius tool accepts a center ZIP code and a distance in miles or kilometers, then returns every ZIP code whose centroid falls within that circle — giving you an instantly usable geographic target list sorted by distance from your center point.

**How Radius Search Works**

The tool calculates the **Haversine formula** straight-line (great-circle) distance from the centroid of your center ZIP code to the centroid of every other ZIP code in the database. The Haversine formula accounts for the curvature of the Earth:

a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlon/2)
d = 2R × arcsin(√a)

Where R = 3,958.8 miles (or 6,371 km), Δlat = lat₂ − lat₁, and Δlon = lon₂ − lon₁ (all values in radians). This computation runs against all 42,000+ ZIP codes in the database and returns matching ZIPs sorted by distance in under a second.

**Formula: Is a ZIP Within the Radius?**

For any candidate ZIP with centroid (lat₂, lon₂) and center ZIP centroid (lat₁, lon₁): compute d using the Haversine formula. If d ≤ your specified radius r, the ZIP is included. The result set is sorted ascending by d so the closest ZIPs appear first. This enables "nearest N ZIP codes" queries by taking the top N results regardless of radius.

**Choosing the Right Radius**

The appropriate radius depends on your use case and geography. **5–10 miles** is appropriate for hyper-local service businesses (plumbers, electricians, restaurants, urgent care clinics) where customers are rarely willing to travel more than 15 minutes. **15–25 miles** suits local delivery services, brick-and-mortar retail trade areas, and suburban commute zones. **30–50 miles** covers regional service companies, day-trip leisure destinations, and regional franchise territories. **50–100 miles** is appropriate for multi-county market regions, distribution center service areas, and regional broadcast markets. **100–250 miles** captures DMA (Designated Market Area) scale geographies and major regional distribution networks.

Urban vs. rural dramatically affects results: a 10-mile radius in Manhattan returns 80–120 ZIP codes (because ZIPs are tiny and densely packed). The same 10-mile radius in rural Montana may return 3–8 ZIP codes (because each ZIP covers a vast area). Always check result count before using in a campaign to avoid surprising under- or over-coverage.

**Using Radius Results for Direct Mail**

Direct mail campaigns use ZIP lists as the fundamental targeting unit. Building a mailing list "within 20 miles of our new store at ZIP 30301" means running a ZIPs-within-radius query centered on 30301 with a 20-mile radius and mailing to every household in the resulting ZIP list. List brokers and Every Door Direct Mail (EDDM) through USPS both accept ZIP code target lists. Combining radius-based ZIP selection with demographic filtering (income, age, homeownership) from our ZIP Code Population data creates highly targeted, efficient campaigns.

**Ad Platform Targeting**

Google Ads, Facebook/Meta Ads, Snapchat, and most programmatic ad platforms accept ZIP code target lists. Building a radius campaign manually (drawing a circle on the platform's map) is imprecise — the circle may include ZIP codes partially, with unclear billing implications. Building an explicit ZIP list from a radius query gives you precise, known coverage: every ZIP in your list is fully included, and no ZIP outside your intended area is accidentally included. This is especially important for compliance-sensitive industries (finance, insurance, healthcare) where targeting must be precisely documented.

**Logistics and Last-Mile Delivery**

Delivery operations define service areas as all ZIP codes reachable within a target drive time or distance from a warehouse or distribution center. A ZIPs-within-radius query centered on the distribution center ZIP with the maximum delivery distance as the radius generates the initial candidate service area. This list is then refined by drive-time analysis to exclude ZIPs that are within the straight-line radius but require much longer driving routes due to geographic barriers (mountains, rivers, bridges).

**Healthcare Service Area and Catchment Analysis**

Hospitals, health systems, and federally qualified health centers define their service areas — the geographic region from which they draw patients — using radius-based approaches. CMS (Centers for Medicare and Medicaid Services) uses service area ZIP codes for network adequacy assessments and rural health designation purposes. A ZIPs-within-radius query centered on a clinic ZIP provides the candidate service area ZIP list for further analysis against population and provider data.

**Competitive Intelligence**

Understanding which ZIP codes fall within a competitor's trade area is valuable for targeting counter-programming. If a competitor is located at ZIP 60601, running a 5-mile radius query reveals all ZIPs in their likely trade area. Cross-referencing with your own customer data shows which of those ZIPs you have already penetrated and which represent untapped competitive opportunity adjacent to the competitor's stronghold.

**Why Use TOOLTRIO for ZIP Code Lookups?**

TOOLTRIO (also searched as Tool Trio, Trio Tools, and ToolTrio) is a free suite of US address and ZIP code tools built for developers, marketers, logistics teams, and everyday users who need fast, reliable postal data. Every TOOLTRIO ZIP tool — from ZIP code lookup to drive time by ZIP, ZIP to city, and ZIP code distance — is free to use with no account required. When you search for "tooltrio zip code," "zip code tooltrio," or simply "tooltrio," you land on a platform built around one goal: making US ZIP code data instantly accessible to everyone. Bookmark tooltrio.com and share any TOOLTRIO tool link directly — every page is designed to be fast, ad-free, and accurate.`, [
    { q: 'I searched a 10-mile radius around ZIP 60601 (Chicago Loop) and got 87 results. Is that normal?', a: `Yes — that is exactly right for a dense urban core. Chicago's Loop area has extremely high ZIP code density: many small ZIP codes packed into a compact geographic area. Compare this to a 10-mile radius around ZIP 59001 (Absarokee, MT) which returns only 3–4 ZIPs because each Montana ZIP covers hundreds of square miles. The number of results depends on ZIP density, not just your radius size. Always check result count before using in ad campaigns.` },
    { q: 'Why is a ZIP code that borders my center ZIP not showing in my radius results?', a: `Radius results are calculated centroid-to-centroid (geographic center to geographic center). A neighboring ZIP code with a large geographic area may have its centroid far from your center ZIP — even if their boundaries share an edge. This is common with large rural ZIPs adjacent to small urban ZIPs. Solution: either increase your radius slightly, or use our Nearest ZIP Code tool which returns the closest ZIPs by centroid distance regardless of your radius setting.` },
    { q: 'How do I use radius results to build a Facebook Ad targeting list?', a: `Copy your ZIP code result list from our tool, then in Facebook Ads Manager go to Audiences → Create Audience → Saved Audience → Location. Click 'Add Locations in Bulk' and paste your ZIP list. Facebook accepts up to 2,500 ZIP codes per audience. This method gives you exact, documented coverage — unlike Facebook's built-in radius tool which uses their own geographic interpretation that may include or exclude ZIPs inconsistently.` },
    { q: 'What radius should I use for a pizza delivery zone?', a: `For pizza delivery, 3–5 miles is standard for urban/suburban areas where deliveries must stay under 30 minutes. In a dense urban area, 3 miles might return 25–40 ZIP codes covering a practical delivery zone. In a suburban area, 5 miles might return 8–15 ZIPs. Start with 3 miles, look at the resulting ZIP list, check if it includes your known delivery area, then adjust. Some delivery operations use drive-time radius (our Drive Time by ZIP tool) instead of straight-line radius for more accurate zone definition.` },
    { q: 'Can I combine radius ZIP results with income or age data for targeted marketing?', a: `Yes — this is a standard market research workflow. Run your radius search to get the ZIP list, then use our ZIP Code Population tool for each ZIP to get Census ACS demographic data: median household income, age distribution, educational attainment. Filter the radius ZIP list to only ZIPs meeting your demographic criteria (e.g., median income > $75,000, median age 35–54). This creates a demographically qualified geographic target list.` },
    { q: 'Why do some ZIP codes at the edge of my radius appear partially inside my circle?', a: `ZIP code boundaries are irregular polygons — they don't fit neatly inside a circle. Our radius search uses centroid-to-centroid distance: if a ZIP's geographic center is within your radius, the whole ZIP is included, even if part of its boundary extends outside the circle. Conversely, a ZIP whose centroid is just outside your radius is excluded, even if a portion of its boundary overlaps your circle. This is standard behavior for centroid-based radius search.` },
    { q: 'What is the maximum radius I can use without getting the entire US?', a: `A 1,500-mile radius from the geographic center of the US (roughly Hays, KS — ZIP 67601) would cover most of the contiguous 48 states. Our tool supports up to 500 miles. At 500 miles from Chicago (60601), you reach Boston, Miami, Oklahoma City, and Minneapolis — about 12,000+ ZIP codes. For most business use cases, 50–100 miles is appropriate for regional targeting.` },
    { q: 'How is a ZIPs-within-radius search different from a state ZIP code list?', a: `State ZIP lists include all ZIPs within a political boundary regardless of geography. Radius search includes all ZIPs within a circular distance from a center point regardless of state boundaries. Radius is better for service area planning (your service reaches a geographic circle, not a state shape) and for metro areas that cross state lines (KC, Memphis, Philly suburbs). State lists are better for regulatory compliance and political or tax jurisdiction work.` },
    { q: 'I run a home services business — how do I use radius to set my service area?', a: `Enter your home or shop ZIP as the center. Set radius to your maximum willing travel distance (e.g., 20 miles). Export the resulting ZIP list. Use it to: (1) configure your Google Business Profile service area by adding each ZIP, (2) set geographic targeting in Google Local Services Ads, (3) set your website's service area description, (4) filter leads in your CRM to only those in your service ZIPs.` },
    { q: 'The radius results include ZIPs in a neighboring state. Is that a bug?', a: `No — that is correct behavior. Real service areas, trade zones, and delivery regions cross state lines. A 15-mile radius around Philadelphia (19103) naturally includes ZIPs in New Jersey (Camden, Cherry Hill). A radius around Memphis (38101) includes ZIPs in Arkansas and Mississippi. State boundaries are political — geographic markets are not. Our tool intentionally does not filter by state.` },
    { q: 'Can I weight radius ZIP results by population to prioritize high-density areas?', a: `Yes — after getting your radius ZIP list, add population data for each ZIP using our ZIP Code Population tool. Sort the combined list by population descending. Allocate your marketing budget proportionally: ZIPs with more residents get larger share of impressions, mail volume, or canvassing effort. This population-weighted approach is far more efficient than treating all ZIPs equally regardless of how many people live in each.` },
    { q: 'Is TOOLTRIO's ZIPs Within Radius tool free?', a: 'Yes — completely free, no account required. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) provides ZIPs Within Radius as part of a free suite of 35+ ZIP code tools at tooltrio.com.' },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIPs Within Radius" description="Find all US ZIP codes within a specified mile or kilometer radius of any center ZIP." icon="🎯" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Codes Within Radius — Find All ZIPs Within Miles of a ZIP 2026\",\"description\":\"Find all US ZIP codes within a specified radius in miles or kilometers from any center ZIP code. Free radius search tool for marketing, logistics, and\",\"url\":\"https://tooltrio.com/zip/zips-within-radius\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
