import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIPs by City Name Search | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Search for ZIP codes by entering a full or partial city name. Find all matching cities and their ZIP codes.',
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIPs in Radius',href:'/zip/zips-within-radius',icon:'🎯'}
]

export default function Page() {
  return (
    <ZipToolLayout title="ZIPs by City Name Search" description="Search for ZIP codes by entering a full or partial city name. Find all matching cities and their ZIP codes." icon="🔎" relatedTools={relatedTools}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
