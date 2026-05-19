import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to Coordinates — Get Lat/Long for Any US ZIP Code 2026 | TOOLTRIO',
  description: 'Get the latitude and longitude coordinates for any US ZIP code. Find the centroid lat/lng of any ZIP code area. Free ZIP to coordinates tool.',
  keywords: ['zip to coordinates', 'zip code latitude longitude', 'zip code lat long', 'zip code coordinates lookup', 'latitude longitude by zip code', 'zip code centroid coordinates', 'zip code gps coordinates', 'find lat lng by zip code usa', 'zip code geocoding'],
}
const relatedTools = [
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
  {name:'ZIP Code Elevation',href:'/zip/zip-code-elevation',icon:'⛰️'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
]
const tips = ['Coordinates represent the centroid (center point) of the ZIP code area, not a specific address.', 'All coordinates use WGS84 datum — compatible with Google Maps, Leaflet, and all GIS platforms.', 'For address-level geocoding, use a full geocoding API with the complete street address.']
const seoContent = {
  heading: 'ZIP to Coordinates — Finding Latitude and Longitude for US ZIP Codes',
  body: "Converting a ZIP code to geographic coordinates (latitude and longitude) is the foundation of any location-based application that needs to work with ZIP codes as geographic entities. Our ZIP to Coordinates tool returns the centroid latitude and longitude for any US ZIP code, enabling distance calculations, map plotting, geofencing, and spatial analysis.\n\n**What Are ZIP Code Centroid Coordinates?**\n\nEach ZIP code is represented geographically by its centroid — the geographic center point of the ZIP Code Tabulation Area (ZCTA) boundary polygon. The centroid is calculated as the area-weighted center of the ZCTA polygon, minimizing the average distance to all locations within the ZIP code boundary. For irregularly shaped ZIP codes (many rural ZIPs have complex shapes), the centroid may not fall on a road or populated area.\n\n**Coordinate Format and Precision**\n\nZIP code coordinates are expressed in decimal degrees. Latitude is positive for all continental US, Hawaii, and territories (range: approximately 17.9°N to 71.3°N). Longitude is negative for all US ZIP codes (range: approximately -67.9°W to -179.1°W). Precision: ZIP code centroids are provided to 4–6 decimal places. One degree of latitude equals approximately 69 miles; one decimal place is about 6.9 miles; 4 decimal places is about 36 feet — more than sufficient for ZIP code centroid use.\n\n**Using ZIP Coordinates in Applications**\n\nDistance calculation: once you have the lat/lng for two ZIP codes, apply the Haversine formula to calculate the great-circle distance between them. Map plotting: pass the lat/lng to a mapping API (Google Maps, Leaflet, Mapbox) to drop a pin or draw a radius circle centered on the ZIP code. Geofencing: use the ZIP code centroid as the center point for a circular geofence, with radius set to half the ZIP code's average diameter. Spatial joins: in GIS software or databases with spatial extensions (PostGIS, SQL Server Spatial), use ZIP code coordinates for point-in-polygon tests and spatial queries.\n\n**Coordinate Datum**\n\nAll ZIP code coordinates use the WGS84 datum (World Geodetic System 1984), the same reference system used by GPS devices and Google Maps. This ensures compatibility with all modern mapping and GIS platforms without coordinate system transformation.",
  faqs: [
    {q:'What datum are ZIP code coordinates in?',a:'All coordinates use WGS84 (EPSG:4326), the standard for GPS and web mapping. They are compatible with Google Maps, Leaflet, Mapbox, and all major GIS platforms without conversion.'},
    {q:'Is the centroid always within the ZIP code area?',a:'Not always. For concave or crescent-shaped ZIP code boundaries, the geometric centroid may technically fall outside the polygon. Our tool uses the interior point when the true centroid falls outside.'},
    {q:'How accurate is ZIP code centroid geocoding?',a:'For area-level analysis, ZIP centroid accuracy is sufficient. The centroid represents the center of the postal delivery area, not any specific address. For address-level accuracy, use a full geocoding service with a complete street address.'},
    {q:'Can I reverse-geocode? (coordinates to ZIP code)',a:'Our tool converts ZIP to coordinates. For the reverse — coordinates to ZIP — use a reverse geocoding API like Google Maps Geocoding API or Nominatim with your lat/lng input.'},
    {q:'What are the approximate coordinate ranges for US ZIP codes?',a:'Continental US: Latitude 24.5°N–49.4°N, Longitude -66.9°W to -124.6°W. Alaska extends to 71.3°N and 179.1°W. Hawaii is around 19–22°N, 154–162°W.'},
    {q:'How do I calculate distance from ZIP coordinates?',a:'Use the Haversine formula: a = sin²(Δlat/2) + cos(lat1)·cos(lat2)·sin²(Δlon/2), then d = 2R·asin(√a) where R equals 3958.8 miles or 6371 km.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP to Coordinates'} description={'Get the latitude and longitude coordinates for any US ZIP code.'} icon={'🌐'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
