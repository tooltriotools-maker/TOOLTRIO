import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Nearest ZIP Code Finder | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find ZIP codes nearest to a given ZIP code. Shows the closest ZIP codes sorted by distance.',
  keywords: ['nearest zip code', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
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
      title="Nearest ZIP Code Finder"
      description="Find ZIP codes nearest to a given ZIP code. Shows the closest ZIP codes sorted by distance."
      icon="📌"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
