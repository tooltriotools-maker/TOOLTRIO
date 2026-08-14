import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          The page you requested does not exist or may have moved. Try one of ToolTrio&apos;s free tools instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors">
            Go Home
          </Link>
          <Link href="/zip" className="rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-bold text-green-700 hover:bg-green-50 transition-colors">
            ZIP Tools
          </Link>
          <Link href="/calculators/fun" className="rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-bold text-purple-700 hover:bg-purple-50 transition-colors">
            Fun Tools
          </Link>
        </div>
      </div>
    </main>
  )
}
