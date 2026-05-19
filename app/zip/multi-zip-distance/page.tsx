import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Multi-ZIP Distance Calculator — Distance Matrix for Multiple ZIP Codes | TOOLTRIO',
  description: 'Calculate distances between multiple US ZIP codes at once. Get a full distance matrix for 3 or more ZIP codes. Free multi-ZIP distance tool.',
  keywords: ['multi zip distance calculator', 'distance between multiple zip codes', 'zip code distance matrix', 'multiple zip code distance tool', 'batch zip distance calculator', 'distance matrix zip codes usa', 'zip to zip distance list', 'calculate distance multiple zips'],
}
const relatedTools = [
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:'🎯'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📌'},
  {name:'ZIP to ZIP Route',href:'/zip/zip-to-zip-route',icon:'🛣️'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP to Coordinates',href:'/zip/zip-to-coordinates',icon:'🌐'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
]
const tips = ['Enter ZIP codes separated by commas or on separate lines.', 'Results show straight-line distances — multiply by ~1.3 for a driving distance approximation.', 'For route optimization, use the distance matrix as input to a routing algorithm.']
const seoContent = {
  heading: 'Multi-ZIP Distance Calculator — Distance Matrix for Multiple US ZIP Codes',
  body: 'When planning multi-stop routes, optimizing delivery networks, or analyzing geographic relationships between many locations, you need more than a simple two-point distance calculator. Our Multi-ZIP Distance tool calculates all pairwise distances between a list of ZIP codes, producing a complete distance matrix that reveals the spatial relationships across your entire set of locations.\n\n**What Is a ZIP Code Distance Matrix?**\n\nA distance matrix is a table where each row and column represents a ZIP code, and each cell contains the distance between the ZIP in that row and the ZIP in that column. For N ZIP codes, the matrix has N×N cells (N² total distances), though since distance is symmetric (A to B equals B to A), you only need to compute N×(N-1)/2 unique pairs. For example, with 5 ZIP codes, a distance matrix contains 10 unique pairwise distances. Our tool computes all of these and presents them in an easy-to-read grid.\n\n**How Multi-ZIP Distance Is Calculated**\n\nEach pair of ZIP codes is processed using the Haversine formula on their geographic centroids — the same approach used in our two-point ZIP Distance Calculator, scaled to handle all pairs simultaneously. The result is a symmetric distance matrix of straight-line (great-circle) distances in miles or kilometers.\n\n**Applications of Multi-ZIP Distance Analysis**\n\nVehicle routing optimization uses the distance matrix as the foundation of any VRP (Vehicle Routing Problem) solution. Feed the multi-ZIP matrix into routing algorithms to find the shortest path through all delivery stops. Facility location analysis uses the matrix to identify which ZIP code in a set minimizes the total distance to all other ZIPs — the optimal hub location for a distribution center. Clustering analysis groups ZIP codes by geographic proximity using k-means or hierarchical clustering on the distance matrix, creating natural territory clusters. Supply chain network design models transportation costs between supplier, warehouse, and customer ZIP codes using the distance matrix as an input to total cost optimization models.\n\n**Understanding the Traveling Salesman Problem in ZIP Code Planning**\n\nThe classic optimization challenge in multi-stop routing is the Traveling Salesman Problem: given N locations, find the shortest route that visits each exactly once and returns to the start. While mathematically NP-hard, heuristic algorithms like nearest-neighbor, 2-opt, and genetic algorithms use the distance matrix as their core input to produce near-optimal routes quickly. Our tool gives you the distance matrix — the critical first step for any route optimization workflow.',
  faqs: [
    {q:'How many ZIP codes can I enter at once?',a:'Our tool supports up to 20 ZIP codes in a single matrix calculation. For larger datasets, consider batch processing in multiple groups.'},
    {q:'Can I get the matrix in a downloadable format?',a:'Results can be copied to clipboard and pasted into Excel or Google Sheets, where the matrix layout is preserved.'},
    {q:'Is the distance straight-line or driving?',a:'The matrix shows straight-line (great-circle) distances between ZIP code centroids. Driving distances are longer — multiply by 1.2–1.4 for a rough driving distance estimate.'},
    {q:'What is the difference between Multi-ZIP Distance and ZIP Code Distance?',a:'ZIP Code Distance calculates the distance between exactly two ZIP codes. Multi-ZIP Distance handles 3 or more ZIPs and produces a full N×N matrix of all pairwise distances.'},
    {q:'How do I find the ZIP code closest to the center of my list?',a:'The ZIP with the smallest sum of distances to all other ZIPs in the matrix is the geographic center — the optimal hub location if you need to minimize total travel.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'Multi-ZIP Distance Calculator'} description={'Calculate distances between multiple US ZIP codes and get a complete distance matrix.'} icon={'📐'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
