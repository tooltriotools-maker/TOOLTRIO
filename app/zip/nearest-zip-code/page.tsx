import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Nearest ZIP Code — Find Closest ZIP Codes to Any Location USA | TOOLTRIO',
  description: 'Find the nearest ZIP codes to any US ZIP code or location. Get a list of the closest ZIP codes by distance. Free nearest ZIP code tool.',
  keywords: ['nearest zip code', 'closest zip code', 'zip codes near me', 'find nearest zip code', 'zip codes closest to me', 'neighboring zip codes', 'adjacent zip codes usa', 'zip codes near my location', 'closest postal code usa'],
}
const relatedTools = [
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'Multi-ZIP Distance',href:'/zip/multi-zip-distance',icon:'📐'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
]
const tips = ['Results are sorted by straight-line distance from the centroid of your input ZIP.', 'Use ZIPs Within Radius for a full list of ZIPs within a specific mileage.', 'Click any result ZIP to open full details in the ZIP Code Lookup tool.']
const seoContent = {
  heading: 'Nearest ZIP Codes — How to Find ZIP Codes Close to Your Location',
  body: "Finding the ZIP codes nearest to a given location is a foundational operation for radius-based delivery, local market analysis, store locator functionality, and geographic targeting. Our Nearest ZIP Code tool takes any US ZIP code as input and returns the closest surrounding ZIP codes, sorted by distance from the center of your input ZIP.\n\n**How Nearest ZIP Code Calculation Works**\n\nThe tool calculates the distance from the centroid of your input ZIP code to the centroids of all neighboring ZIP codes using the Haversine formula. Results are sorted by ascending distance, so the geographically closest ZIPs appear first. You can set a maximum distance threshold (e.g., show only ZIPs within 10 miles) to control the size of the result set.\n\n**Applications for Nearest ZIP Code Lookup**\n\nThe most common use case is store locator and service area logic. When a user enters their ZIP code to find nearby stores, the system queries which store ZIPs are in the list of nearest ZIPs to the user's ZIP, then ranks results by distance. This is more efficient than calculating distances from every store to every possible user ZIP in real time — instead, the nearby ZIPs are pre-computed and indexed.\n\nOther applications include marketing geo-targeting (upload a list of nearest ZIPs to your target location as a geo-fence in ad platforms), competitive analysis (identify which competitor locations by ZIP are nearest to your store ZIP), emergency notification systems (alert residents in ZIP codes within N miles of an incident ZIP), and utility service territory management (flag customers in ZIPs adjacent to a service boundary for proactive outreach during boundary changes).\n\n**Understanding ZIP Code Adjacency**\n\nNot all nearest ZIP codes are adjacent in the traditional map sense. Because ZIP code centroids are used for distance calculation, a ZIP code whose centroid is 3 miles away might share a full border with your ZIP, while a ZIP with a centroid 2 miles away might only touch at a corner. For precise border adjacency (which ZIPs physically touch your ZIP), you need ZCTA boundary polygon data from the Census Bureau. Our tool provides a practical approximation using centroid distances that works well for the vast majority of business applications.",
  faqs: [
    {q:'How many nearest ZIP codes does the tool return?',a:'By default, we return the 20 closest ZIP codes. You can adjust the maximum distance threshold to return more or fewer results.'},
    {q:"Is 'nearest' based on straight-line distance?",a:'Yes — we measure centroid-to-centroid straight-line (great-circle) distance. This is standard for geographic nearest-neighbor analysis.'},
    {q:'Can I find ZIPs within a radius instead of just the nearest?',a:'Yes — our ZIPs Within Radius tool is designed for exactly that use case. It returns all ZIPs within a specified number of miles from your input ZIP.'},
    {q:'Does the tool include ZIP codes in neighboring states?',a:"Yes. Distance doesn't respect state borders. If you're in a border ZIP, you'll see ZIPs from the adjacent state in your results."},
    {q:"Why might a nearby city's ZIP not appear in results?",a:"The centroid of a neighboring city's ZIP might be farther than it appears on a map if the ZIP covers a large geographic area with its centroid offset from the border nearest you."},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'Nearest ZIP Code'} description={'Find the ZIP codes closest to any US ZIP code, sorted by distance.'} icon={'📌'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
