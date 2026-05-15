import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Map Viewer | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'View any US ZIP code location on an interactive map. Get direct Google Maps link with the exact ZIP location.',
  keywords: ['zip code map', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'}
]


const tips = [
  "Three map view options: standard view, satellite view, and navigation directions.",
    "The embedded map shows a 14x zoom level centered on the ZIP code centroid.",
    "For the most detailed map, use the 'Open in Google Maps' button.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP Code Map Viewer"
      description="View any US ZIP code location on an interactive map. Get direct Google Maps link with the exact ZIP location."
      icon="🗺️"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
