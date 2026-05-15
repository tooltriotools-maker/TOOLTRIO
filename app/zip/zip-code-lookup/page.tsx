import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Lookup | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Get complete details for any US ZIP code: city, state, county, timezone, coordinates, area code and population.',
  keywords: ['zip code lookup', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]


const tips = [
  "Enter any 5-digit US ZIP code to get full details including city, county, timezone, and coordinates.",
    "Click any nearby ZIP to instantly look it up.",
    "Use the Google Maps buttons to visualize the location or get directions.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP Code Lookup"
      description="Get complete details for any US ZIP code: city, state, county, timezone, coordinates, area code and population."
      icon="🔍"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
