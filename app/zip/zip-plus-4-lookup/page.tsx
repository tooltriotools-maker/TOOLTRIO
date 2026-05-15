import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP+4 Code Lookup | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Learn about ZIP+4 codes (9-digit ZIP codes) and find the extended format for any US ZIP code.',
  keywords: ['zip plus 4 lookup', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
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
      title="ZIP+4 Code Lookup"
      description="Learn about ZIP+4 codes (9-digit ZIP codes) and find the extended format for any US ZIP code."
      icon="🔢"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
