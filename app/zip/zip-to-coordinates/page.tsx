import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to Coordinates — Latitude & Longitude by ZIP Code USA 2026',
  description: 'Find the latitude and longitude coordinates for any US ZIP code. Get centroid lat/lng for geocoding, mapping, and distance calculations. Free ZIP to coordinates tool. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip to coordinates','zip code latitude longitude','zip code lat long','zip code coordinates lookup','latitude longitude by zip code','zip code centroid coordinates','zip code gps coordinates','find lat lng by zip code usa','zip code geocoding','zip code to latlong','get coordinates from zip code','zip code location coordinates','zip code decimal degrees','zip code mapping coordinates','zip code centroid lat lng',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
  {name:'ZIP Code Elevation',href:'/zip/zip-code-elevation',icon:'⛰️'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
]

const tips = [
  'Coordinates returned are the centroid (geographic center) of the ZIP Code Tabulation Area — not the geometric center of the city.',
  'For precise address-level coordinates, use a full geocoding service with the complete street address.',
  'Decimal degrees format (e.g., 40.7128, -74.0060) is standard for most mapping APIs and databases.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '🌐', title: `Decimal Degrees`, desc: `Returns WGS 84 lat/lng — compatible with Google Maps, Mapbox, and all GIS tools.`, bullets: [] },
    { icon: '📏', title: `Haversine Distance`, desc: `Use coordinates with the Haversine formula for precise ZIP-to-ZIP distance calculations.`, bullets: [] },
    { icon: '🎯', title: `Centroid Accuracy`, desc: `Coordinates are Census ZCTA centroids — accurate to ~11 meters for proximity analysis.`, bullets: [] },
  ],

  heading: 'ZIP to Coordinates — Getting Latitude and Longitude from US ZIP Codes',
  populationChart: {
    title: 'US Geographic Extent by Latitude/Longitude',
    subtitle: 'ZIP code centroids range across the full geographic span of the US',
    unit: '°',
    bars: [
      { label: 'Northernmost (AK)', value: 71.5 },
      { label: 'Southernmost (HI)', value: 18.9 },
      { label: 'Hawaii longitude W', value: 155.5 },
      { label: 'Alaska longitude W', value: 179.1 },
      { label: 'Eastern longitude W', value: 66.9 },
      { label: 'Western CONUS W', value: 124.7 },
    ],
  },
  statsTable: [
    { label: 'Coordinate format', value: 'Decimal degrees (DD.DDDD)' },
    { label: 'Coordinate system', value: 'WGS 84 (EPSG:4326)' },
    { label: 'Precision', value: '4 decimal places (~11m accuracy)' },
    { label: 'Source', value: 'Census TIGER/Line ZCTA centroids' },
    { label: 'Latitude range (CONUS)', value: '24.4°N to 49.4°N' },
    { label: 'Longitude range (CONUS)', value: '66.9°W to 124.7°W' },
  ],
  body: `Getting latitude and longitude coordinates from a ZIP code is the cornerstone of geographic analysis, mapping, proximity calculation, and geo-targeting. Our ZIP to Coordinates tool returns the centroid latitude and longitude for any US ZIP code in decimal degrees format — the standard used by Google Maps, OpenStreetMap, Mapbox, AWS Location Services, and virtually every GIS platform. Results are based on the Census Bureau TIGER/Line ZIP Code Tabulation Area (ZCTA) centroids, providing consistent and reproducible coordinates for every active ZIP code.

**What ZIP Code Coordinates Represent**

ZIP code coordinates are **centroid values** — the geographic center of the ZIP Code Tabulation Area (ZCTA) polygon that approximates the ZIP code boundary. The centroid is not necessarily the center of the most populous part of the ZIP, the location of the post office, or the center of the city the ZIP is associated with. It is the mathematical center of the ZCTA polygon. This is important to understand for distance calculations: two ZIP codes that appear adjacent on a map may have centroids that are farther apart than expected because one is a large-area rural ZIP with a centroid deep in its interior.

**Coordinate Format: Decimal Degrees**

The standard format for geographic coordinates in modern applications is **decimal degrees (DD)**, where latitude and longitude are expressed as floating-point numbers. For the continental US, latitude values range from approximately 24.4°N (southernmost Florida) to 49.4°N (northernmost Maine), expressed as positive numbers. Longitude values range from 66.9°W (easternmost Maine) to 124.7°W (westernmost Washington state), expressed as negative numbers (negative = west of the prime meridian). Example: New York City ≈ 40.7128° N, -74.0060° W.

The alternative format — **degrees, minutes, seconds (DMS)** — is used in some aviation, surveying, and cartographic contexts. Convert from decimal degrees to DMS: degrees = integer part of DD; minutes = integer part of (DD - degrees) × 60; seconds = ((DD - degrees) × 60 - minutes) × 60. Most web APIs and databases prefer decimal degrees for simplicity and arithmetic.

**The Haversine Formula: Distance from ZIP Coordinates**

Given the lat/lng of two ZIP code centroids, distance is calculated using the **Haversine formula**, which accounts for the curvature of the Earth:

a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlon/2)
d = 2R × arcsin(√a)

Where R = 3,958.8 miles (or 6,371 km), Δlat = lat₂ − lat₁, and Δlon = lon₂ − lon₁, all in radians. This formula is accurate for most practical distances. For very long distances (>1,000 miles), the Vincenty formula provides marginally better accuracy on the WGS 84 ellipsoid. Our ZIP Code Distance tool uses this formula with ZIP centroid coordinates to calculate the straight-line distance between any two US ZIP codes.

**Coordinate Systems: WGS 84 and Why It Matters**

Coordinates are meaningless without a reference coordinate system. ZIP code centroid coordinates from the Census TIGER/Line database use the **WGS 84** datum (World Geodetic System 1984), identified by EPSG:4326 in GIS contexts. WGS 84 is the same coordinate system used by GPS devices and Google Maps. When combining ZIP coordinate data with other geographic datasets, always confirm both are using WGS 84 to avoid systematic positional errors that arise from datum mismatches.

**Use Cases for ZIP Code Coordinates**

Proximity marketing and geo-targeting: marketing platforms allow targeting by latitude/longitude radius. By converting ZIP code targets to coordinates, you can build a circle around each target ZIP and target all devices within that radius. This is more precise than ZIP-level targeting because it handles the large-area-ZIP problem — a rural ZIP code centroid may be far from the city it serves, but a radius around that centroid still captures the relevant population.

Store locator and nearest-location algorithms: a store locator takes a user's ZIP, converts it to coordinates, then calculates the distance from those coordinates to each store location's coordinates, and returns the N nearest stores. This is the standard implementation for "find stores near me" features.

Logistics and routing: fleet routing software uses origin and destination coordinates to plan multi-stop delivery routes. ZIP-to-coordinate conversion is often the first step when routing is planned at the ZIP code level for initial route design before address-level geocoding.

Choropleth mapping and data visualization: when visualizing data by ZIP code on a map, ZIP centroids serve as the anchor points for marker-based visualizations. For filled polygon maps, full ZCTA boundary polygons from the Census TIGER/Line shapefiles are needed, but for point-based visualizations, centroids are sufficient and much simpler to work with.

**Precision and Limitations**

ZIP code centroid coordinates are accurate to approximately 4 decimal places — about 11 meters of precision. This is sufficient for ZIP-level analysis but not for address-level precision. For individual addresses, full geocoding (converting a street address to lat/lng) provides much higher accuracy. Additionally, centroid coordinates do not account for the shape of the ZIP boundary — two neighboring ZIP codes may have centroids that appear farther apart than addresses near their shared boundary actually are.`,
  faqs: [
    { q: 'I plotted ZIP code centroids on a map and some rural ones are in the middle of a lake or forest — is that a bug?', a: `No — that is expected behavior. ZIP code centroids are the mathematical center of the ZCTA polygon, not the location of the most addresses or the post office. A ZIP code that covers both a river valley and surrounding hills will have its centroid land somewhere in the geographic middle — possibly over a river, forest, or non-residential area. For map markers, centroid coordinates are fine; they represent 'approximately where this ZIP is located.' For precise address plotting, geocode the specific street address.` },
    { q: 'What coordinate system do the ZIP code lat/lng values use?', a: `WGS 84 (World Geodetic System 1984), identified as EPSG:4326 in GIS contexts. WGS 84 is the same datum used by GPS devices, Google Maps, OpenStreetMap, Mapbox, and the US military GPS system. Latitude is positive (north) for all US locations (range: 18.9°N Hawaii to 71.5°N Alaska). Longitude is negative (west) for all US locations (range: -66.9°W Maine to -179.1°W Alaska). Store as FLOAT(7) or DECIMAL(9,6) for 6-decimal precision (~11cm accuracy).` },
    { q: 'How do I find all ZIP codes within 25 miles of a lat/lng coordinate?', a: `Use the reverse approach: convert your coordinate to a ZIP code (reverse geocoding), then use our ZIPs Within Radius tool centered on that ZIP. Or implement directly in SQL with PostGIS: SELECT zip, ST_Distance(ST_MakePoint(lon,lat)::geography, ST_MakePoint(target_lon,target_lat)::geography)/1609.34 AS miles_away FROM zip_centroids WHERE ST_DWithin(ST_MakePoint(lon,lat)::geography, ST_MakePoint(target_lon,target_lat)::geography, 40234) ORDER BY miles_away. The 40234 meters = 25 miles.` },
    { q: 'What is decimal degrees format vs. degrees-minutes-seconds and how do I convert?', a: `Decimal degrees (DD): latitude 40.7128, longitude -74.0060 (New York City). Degrees-minutes-seconds (DMS): 40° 42' 46.08" N, 74° 0' 21.6" W. Convert DD to DMS: degrees = floor(|DD|), minutes = floor((|DD| - degrees) × 60), seconds = ((|DD| - degrees) × 60 - minutes) × 60. Reapply N/S/E/W sign. Most web mapping APIs and databases use decimal degrees. GPS devices and aviation use DMS. Our tool returns decimal degrees.` },
    { q: 'Why does the centroid of ZIP 10001 (Midtown Manhattan) show lat 40.7484, long -73.9967 when Times Square is at 40.7580, -73.9855?', a: `Because the centroid is the geographic center of the entire ZIP 10001 boundary polygon, not the center of Times Square. ZIP 10001 covers a roughly rectangular area of Midtown Manhattan from about 30th to 40th Streets and from 7th to 9th Avenues. Times Square is at the northeast corner of that area. The centroid falls further south and west at the geometric center of the full polygon. This is correct — the centroid represents the whole ZIP area, not any specific landmark within it.` },
    { q: 'I am building a store locator — how do I use ZIP centroids for the initial distance filter?', a: `Standard store locator algorithm: (1) Get user ZIP centroid [lat_u, lon_u] from our ZIP to Coordinates tool. (2) Calculate Haversine distance from [lat_u, lon_u] to each store [lat_s, lon_s] coordinate. (3) Sort stores by distance ascending. (4) Return nearest N stores with their distances. (5) Show on map. Pre-filter using a bounding box before running Haversine to avoid calculating distance for stores that are clearly too far. Bounding box check is 4 comparisons vs. trigonometric Haversine — much faster for large store datasets.` },
    { q: 'What precision level do ZIP centroid coordinates have?', a: `Census Bureau ZCTA centroids are provided at 6 decimal places (e.g., 40.748432, -73.996654). At 6 decimal places, coordinate precision is approximately 11 centimeters — far more precise than needed for ZIP-level analysis. For storage in databases: FLOAT(7) gives 6 significant decimal digits, sufficient. DECIMAL(9,6) is more precise and recommended. Do not round to fewer than 4 decimal places (~11 meters) as that can cause meaningful errors in proximity calculations for nearby ZIP codes.` },
    { q: 'Can I use ZIP centroids for driving directions?', a: `ZIP centroids are not ideal for navigation — they may point to non-navigable locations (parks, water, parking lots). For driving directions, use the ZIP centroid as a starting point for your routing engine to find the nearest road segment, then route from there. Google Maps Directions API accepts lat/lng waypoints and will snap to the nearest road automatically. For end-user navigation, always use a full street address rather than a ZIP centroid.` },
    { q: 'How do I batch geocode a list of ZIP codes to coordinates?', a: `Our ZIP to Coordinates tool handles individual lookups. For batch processing, download the Census Bureau TIGER/Line ZCTA Centroid file directly from census.gov — it is a free CSV with ZIP code, latitude, and longitude for all ZCTAs. This is the same source data our tool uses. Import to your database and join on ZIP code. For larger geocoding projects beyond ZCTAs (individual addresses), use Google Geocoding API, HERE Geocoding, or Geocodio.` },
    { q: 'What is the coordinate of the geographic center of the United States?', a: `The geographic center of the contiguous 48 states is near Lebanon, Kansas — approximately 39.8333°N, 98.5851°W — ZIP code 66952. Including Alaska and Hawaii, the center shifts to approximately 39.5°N, 98.35°W. The geographic center of North America is near Rugby, North Dakota (ZIP 58368) at 48.1°N, 100.2°W. These are interesting geographic facts but not directly relevant to ZIP code operations — just useful trivia for perspective on the US ZIP code grid.` },
    { q: 'Can negative longitude values cause problems in my database ZIP distance calculations?', a: `Yes — a common bug. All US longitudes are negative (west of prime meridian). If your distance formula computes |lon1 - lon2|, the subtraction of two negative numbers works correctly. But if somewhere in your pipeline the longitude sign is stripped (stored as absolute value), distances across the 0°/360° boundary can be wrong. In the US this does not typically cause issues since all US longitudes are in the -66° to -180° range, but always store and compute with signed values.` },
    { q: `Is the ZIP to Coordinates tool on TOOLTRIO free?`, a: `Yes — completely free, no account required. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) at tooltrio.com provides ZIP to Coordinates as part of 35+ free ZIP code tools.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP to Coordinates" description="Get the latitude and longitude centroid coordinates for any US ZIP code." icon="🌐" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP to Coordinates — Latitude & Longitude by ZIP Code USA 2026\",\"description\":\"Find the latitude and longitude coordinates for any US ZIP code. Get centroid lat/lng for geocoding, mapping, and distance calculations. Free ZIP to c\",\"url\":\"https://tooltrio.com/zip/zip-to-coordinates\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
