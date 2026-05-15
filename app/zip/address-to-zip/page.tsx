import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Address to ZIP Code | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find the ZIP code for any US address. Enter street, city, and state to look up the correct ZIP code.',
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
    <ZipToolLayout title="Address to ZIP Code" description="Find the ZIP code for any US address. Enter street, city, and state to look up the correct ZIP code." icon="🏠" relatedTools={relatedTools}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
