import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Elevation | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find the elevation (above sea level) for any US ZIP code in feet and meters.',
  keywords: ['zip code elevation', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'}
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP Code Elevation"
      description="Find the elevation (above sea level) for any US ZIP code in feet and meters."
      icon="⛰️"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
