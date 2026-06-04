export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        {/* Title skeleton */}
        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-8" />
        {/* Card skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-10 w-32 bg-blue-200 rounded-lg animate-pulse" />
        </div>
        {/* Chart skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-64 w-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
