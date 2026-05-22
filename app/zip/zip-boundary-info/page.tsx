import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Boundary Info — ZIP Code Area & Border Details USA 2026',
  description: 'Get boundary details for any US ZIP code: area in square miles, perimeter, bounding box, and neighboring ZIP codes. Free ZIP boundary information tool. Free on TOOLTRIO — no signup needed.',
  keywords: ['zip code boundary','zip code boundary info','zip code area square miles','zip code boundary data','zip code border details','zip code geographic boundary','zip code perimeter','zip code bounding box','zip code zcta boundary','zip code land area','zip code boundary finder','zip code geographic size','zip code area info','zip code boundary shape','zip boundary lookup usa',
    'tooltrio','tooltrio zip code','zip code tooltrio','tooltrio zipcode tool','tooltrio zip lookup','tool trio','trio tools','tooltrio free tools','tooltrio address tools','tooltrio postal tools'
  ],
}

const relatedTools = [
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
  {name:'ZIP Code Population',href:'/zip/zip-code-population',icon:'👥'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'Largest ZIP Codes',href:'/zip/largest-zip-codes',icon:'📊'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'ZIP Code Elevation',href:'/zip/zip-code-elevation',icon:'⛰️'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
]

const tips = [
  'Land area excludes water bodies — a coastal ZIP code total area may be much larger than its land area.',
  'The bounding box gives the min/max lat/lng coordinates forming a rectangle around the ZIP boundary.',
  'Neighboring ZIPs are those whose ZCTA boundaries share an edge or vertex with the current ZIP ZCTA.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '🔲', title: `Area in Sq Miles`, desc: `Returns land area (excluding water) and total area from Census TIGER/Line ZCTA attributes.`, bullets: [] },
    { icon: '📦', title: `Bounding Box`, desc: `Returns [minLon, minLat, maxLon, maxLat] for spatial indexing and map viewport fitting.`, bullets: [] },
    { icon: '🤝', title: `Neighbor Detection`, desc: `Lists all ZIP codes that share a boundary edge or vertex — topologically adjacent ZCTAs.`, bullets: [] },
  ],

  heading: `ZIP Code Boundary Info — Understanding ZIP Code Geographic Boundaries and Area`,
  populationChart: {
    title: 'US ZIP Code Land Area Distribution',
    subtitle: 'ZIP code geographic size varies from under 1 sq mi in dense cities to thousands in rural areas',
    unit: '% of all ZIPs',
    bars: [
      { label: '< 1 sq mi', value: 8 },
      { label: '1–5 sq mi', value: 22 },
      { label: '5–25 sq mi', value: 28 },
      { label: '25–100 sq mi', value: 20 },
      { label: '100–500 sq mi', value: 14 },
      { label: '500+ sq mi', value: 8 },
    ],
  },
  statsTable: [
    { label: 'Boundary source', value: 'Census TIGER/Line ZCTA polygons' },
    { label: 'Coordinate system', value: 'WGS 84 (EPSG:4326)' },
    { label: 'Smallest ZIP by area', value: '<0.1 sq mi in Manhattan, NY' },
    { label: 'Largest ZIP by area', value: '>10,000 sq mi in rural Alaska' },
    { label: 'Bounding box format', value: '[minLon, minLat, maxLon, maxLat]' },
    { label: 'Neighbor detection method', value: 'Shared boundary edge or vertex' },
  ],
  body: `Every US ZIP code has a geographic boundary — a polygon that defines the spatial extent of the ZIP Code Tabulation Area (ZCTA) approximating where mail addressed to that ZIP is delivered. ZIP boundary data is fundamental to GIS analysis, proximity detection, map rendering, spatial joins, and any application that needs to know whether a location is inside or outside a ZIP code area. Our ZIP Boundary Info tool returns the key geographic characteristics of any ZIP code boundary: land area in square miles, total area, bounding box coordinates, perimeter length, and the list of neighboring ZIP codes that share a boundary edge.

**Where ZIP Code Boundary Data Comes From**

ZIP code boundary polygons are defined by the Census Bureau **ZIP Code Tabulation Areas (ZCTAs)** in the TIGER/Line geographic files. The Census Bureau builds ZCTAs by assigning each census block to the most common ZIP code among addresses in that block, then aggregating blocks with the same ZIP assignment into contiguous polygon areas. The resulting ZCTA polygons closely approximate USPS delivery zone boundaries but are defined in terms of census statistical geography.

TIGER/Line ZCTA files are released annually and are freely downloadable from the Census Bureau website as Shapefiles (.shp), Geodatabase (.gdb), or through the Census Bureau TIGERweb API. Each ZCTA polygon contains attributes for: ZCTA code (the ZIP code), land area in square meters (ALAND), water area in square meters (AWATER), internal point latitude and longitude (INTPTLAT and INTPTLON), and geographic identifier fields for joining to other Census data.

**Land Area vs. Total Area**

ZIP boundary data distinguishes between **land area** and **total area**. Total area includes both land and inland water bodies (lakes, rivers, reservoirs, bays) within the ZCTA boundary. Land area excludes water. For most inland ZIP codes, land area and total area are nearly identical. For coastal ZIP codes, lakefront ZIP codes, or ZIP codes that include significant river systems, total area may be much larger than land area.

This distinction matters for population density calculations: **Population Density = Population ÷ Land Area** (not total area). A coastal ZIP code with 50% water coverage would show half the correct population density if total area were used instead of land area.

**The Bounding Box**

A ZIP code **bounding box** (also called the minimum bounding rectangle or envelope) is the smallest axis-aligned rectangle that completely contains the ZCTA polygon. It is expressed as four coordinates: [minimum longitude, minimum latitude, maximum longitude, maximum latitude], or equivalently, [westernmost point, southernmost point, easternmost point, northernmost point].

Bounding boxes are widely used in spatial indexing (R-tree, quadtree, geohash) to quickly filter candidate ZIP codes before running exact polygon intersection tests. A location can only be inside a ZIP code if it is inside that ZIP bounding box first. Checking bounding box containment is a fast operation (four comparisons) compared to the full polygon containment test; spatial databases use bounding boxes as a pre-filter to avoid running expensive polygon tests against all 42,000+ ZCTAs for every query.

**Neighboring ZIP Codes**

Neighboring ZIP codes are those whose ZCTA polygons share a geographic boundary — either a common edge (full side adjacency) or a common vertex (corner adjacency). In the US postal system, neighboring ZIP codes represent the delivery zones immediately adjacent to a given ZIP. For proximity marketing, competitive analysis, and service area planning, knowing the immediate neighbors is a useful starting point for understanding the geographic context.

Formally, two ZCTAs are neighbors if their geometries are not disjoint — if they share any boundary segment or point, they are topologically adjacent. Our tool returns all ZCTAs that are topologically adjacent to the queried ZCTA, sorted by the length of the shared boundary (most adjacent first).

**ZIP Boundary Data in GIS Applications**

GIS applications that need to determine which ZIP code a point (latitude/longitude) falls in use a **spatial join** between the point and the ZCTA polygon layer. The operation: given point P at (lat, lon), find the ZCTA polygon that contains P. This is typically implemented using spatial databases (PostGIS, SpatiaLite, BigQuery GIS) or GIS libraries (Shapely in Python, GEOS, Turf.js in JavaScript).

The naïve approach — checking every ZCTA polygon — is O(n) per query and too slow for high-volume applications with 42,000+ polygons. The standard optimization: use an R-tree or quadtree spatial index on the ZCTA polygons for O(log n) lookup. PostGIS automatically maintains spatial indexes when you run 'CREATE INDEX ON zcta USING GIST (geom)'. Python Shapely with STRtree achieves similar performance.

**ZIP Boundary Accuracy and Limitations**

ZCTA boundaries are the best available approximation of ZIP code geographic boundaries, but they are approximations built from census block boundaries, not the actual USPS delivery route boundaries. Differences arise in areas where census blocks cross ZIP code delivery zone lines (especially in rural areas with irregular delivery routes). For most analytical purposes, ZCTA boundaries are accurate enough. For applications that require the exact USPS delivery boundary — such as determining whether a specific address is inside or outside a specific delivery zone — USPS provides its own geographic boundary data through Address Management System products.

**Perimeter and Shape Analysis**

The perimeter of a ZIP code boundary — the total length of the polygon boundary in miles — reflects the shape complexity of the ZCTA. A compact, nearly circular ZIP code has a perimeter close to the minimum for its area (following the isoperimetric inequality: circle minimizes perimeter for a given area). Elongated, narrow, or highly irregular ZIP codes have perimeters much larger than a circle of the same area. The ratio of area to perimeter squared (the **polsby-popper score** in redistricting analysis) measures shape compactness: **Compactness = 4π × Area ÷ Perimeter²**. Values close to 1.0 indicate a circle; values near 0 indicate a very elongated or irregular shape.

**ZIP Boundary Data for Flood Zone and Environmental Analysis**

Environmental analysis at the ZIP code level uses ZCTA boundaries to aggregate flood zone data, air quality monitoring data, environmental hazard assessments, and health outcome data. Overlaying ZCTA polygons with FEMA flood zone maps (available from the National Flood Insurance Program) enables ZIP-level flood risk assessment. Similarly, overlaying ZCTAs with EPA air quality monitoring station data enables ZIP-level air quality characterization.`,
  faqs: [
    { q: 'I need to know if a specific lat/lng coordinate is inside ZIP code 90210. How do I do this?', a: `Point-in-polygon query using Census ZCTA data: In PostGIS: SELECT zip FROM zcta WHERE ST_Contains(geom, ST_SetSRID(ST_Point(longitude, latitude), 4326)). In Python with Shapely: from shapely.geometry import Point; zip_polygon.contains(Point(longitude, latitude)). In JavaScript with Turf.js: turf.booleanPointInPolygon(turf.point([lon, lat]), zipPolygon). Download ZCTA polygons from Census Bureau TIGER/Line as GeoJSON or Shapefile, load into your tool, then query with the target coordinate.` },
    { q: 'The bounding box for ZIP 59001 (Montana) is enormous. Does that mean the ZIP covers most of a state?', a: `Not the whole state, but a very large area — yes. ZIP 59001 (Absarokee, MT) covers a portion of Stillwater County, Montana — a vast rural area where the sparse ranching population is served by a single delivery zone. Montana has some of the largest ZIPs in the US by geographic area. The bounding box shows the minimum rectangle containing the ZCTA polygon. A large bounding box means a large geographic delivery area — the centroid could be 20+ miles from some addresses in the ZIP.` },
    { q: 'What does the \'perimeter\' measurement of a ZIP code boundary tell me?', a: `Perimeter is the total length of the boundary polygon in miles. Combined with area, it gives a shape compactness measure: Polsby-Popper Score = 4π × Area ÷ Perimeter². Values near 1.0 = compact (circle-like). Values near 0 = elongated or irregular. Compact ZIPs have efficient delivery routes; elongated ZIPs may have long, linear routes along a single road corridor. This metric is used in GIS analysis to detect oddly shaped geographic units — relevant in redistricting and delivery network optimization.` },
    { q: 'How does knowing a ZIP code land area help with delivery cost estimation?', a: `Delivery cost correlates with addresses per square mile (address density). Formula: Address Density = Total Addresses ÷ Land Area. Low density (< 20 addresses/sq mi) = rural zone surcharges from all carriers. Moderate density (20-500/sq mi) = standard delivery cost. High density (>500/sq mi) = urban core with favorable cost-per-stop economics. Get land area from our ZIP Boundary Info tool, get address count from Census ACS housing unit data, calculate density, and apply carrier surcharge thresholds.` },
    { q: 'Why is the land area different from the total area for coastal ZIP codes?', a: `Coastal ZIP codes include water areas (ocean, bays, estuaries, tidal areas) within their ZCTA polygon. Total area = land + water. Land area excludes water. For population density calculations, always use land area as the denominator — using total area for a coastal ZIP would give artificially low population density. A ZIP covering 10 sq mi of land and 5 sq mi of bay would show 67% of the correct density if total area is used.` },
    { q: 'What is a \'multi-polygon\' ZCTA and how do I handle it in my GIS application?', a: `A multi-polygon ZCTA is a ZIP code whose geographic area consists of two or more non-contiguous polygon parts — physically separated areas served by the same ZIP code. Handle in GIS: your data model must support MultiPolygon geometry type (not just Polygon). In PostGIS, ZCTAs are stored as GEOMETRY type which handles both. In GeoJSON, the 'geometry.type' will be 'MultiPolygon' — check for this type and iterate over all polygon components in your rendering and spatial query logic.` },
    { q: 'I am building a heatmap of customer addresses and want to normalize by ZIP code area. Where do I get reliable area data?', a: `Use Census Bureau TIGER/Line ZCTA attributes: ALAND (land area in square meters) and AWATER (water area in square meters). Convert to square miles: sq_mi = ALAND / 2589988. These are the authoritative area measurements for all ZCTAs, updated annually. Alternatively, compute area from the ZCTA polygon geometry in PostGIS: ST_Area(geom::geography) / 2589988 gives square miles computed from the actual polygon. Both approaches give consistent results.` },
    { q: 'What does the \'internal point\' coordinate in Census ZCTA data represent?', a: `The internal point (INTPTLAT, INTPTLON in TIGER/Line files) is a point guaranteed to be inside the ZCTA polygon — the Census Bureau calculates it to avoid the centroid landing outside the polygon (which can happen for irregular or concave shapes). For map marker placement, the internal point is better than the centroid for irregular ZIPs. For distance calculations, the centroid (ALAND-weighted center) is more appropriate. Our ZIP to Coordinates tool returns the centroid; the internal point is available in raw TIGER/Line files.` },
    { q: 'How do I find ZIP codes that physically overlap with a county boundary?', a: `Download Census Bureau TIGER/Line files for both ZCTAs and county boundaries. In PostGIS: SELECT z.zip, c.name AS county FROM zcta z JOIN counties c ON ST_Intersects(z.geom, c.geom). This returns all ZIPs that touch or overlap each county. For 'majority in county' assignment (primary county): SELECT zip, county FROM (SELECT z.zip, c.name AS county, ST_Area(ST_Intersection(z.geom, c.geom))/ST_Area(z.geom) AS overlap_pct FROM zcta z JOIN counties c ON ST_Intersects) WHERE overlap_pct > 0.5.` },
    { q: 'Can ZIP code boundaries be used as census reporting geography?', a: `Not directly — the Census Bureau uses ZCTAs as the statistical approximation of ZIP codes, and ZCTAs do not cover every square mile of the US (some areas have no ZCTA). For formal Census reporting, standard geographies are: census blocks, block groups, tracts, counties, states. ZIP codes/ZCTAs are a non-standard geography in Census terms. The Census Bureau provides ZCTA-level data through ACS Table DP03 and similar, but notes they are not official Census tabulation units.` },
    { q: 'Why does ZIP 10001 have a very small land area compared to its population?', a: `ZIP 10001 covers Midtown Manhattan's Penn Station / Garment District / Hudson Yards area — approximately 0.6 square miles. With roughly 10,000 residents plus hundreds of thousands of daily commuters, the area is extraordinarily dense. Manhattan's grid layout and 30+ story residential buildings pack enormous populations into tiny land areas. At 10,000 residents in 0.6 sq mi, the residential density is ~16,667 per sq mi — and the daytime population density when office workers are counted exceeds 200,000 per sq mi.` },
    { q: `Is the ZIP Boundary Info tool on TOOLTRIO free?`, a: `Yes — free, no account required. TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) at tooltrio.com provides ZIP Boundary Info as part of 35+ free ZIP code tools.` },
  ],
}



export default function Page() {
  return (
    <ZipToolLayout title="ZIP Boundary Info" description="Get geographic boundary details, area, and neighbors for any US ZIP code." icon="🔲" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{\"@context\":\"https://schema.org\",\"@type\":\"WebApplication\",\"name\":\"ZIP Code Boundary Info — ZIP Code Area & Border Details USA 2026\",\"description\":\"Get boundary details for any US ZIP code: area in square miles, perimeter, bounding box, and neighboring ZIP codes. Free ZIP boundary information tool\",\"url\":\"https://tooltrio.com/zip/zip-boundary-info\",\"applicationCategory\":\"UtilitiesApplication\",\"operatingSystem\":\"Any\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"author\":{\"@type\":\"Organization\",\"name\":\"TOOLTRIO\",\"url\":\"https://tooltrio.com\",\"alternateName\":[\"Tool Trio\",\"ToolTrio\",\"Trio Tools\"]},\"isAccessibleForFree\":true}'}} />
    </ZipToolLayout>
  )
}
