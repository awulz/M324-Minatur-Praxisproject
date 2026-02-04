export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-blue-900 mb-4">
            Swiss Weather App
          </h1>
          <p className="text-xl text-blue-700">
            Click on the map or search a Swiss city
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="max-w-6xl mx-auto">
          <div
            id="map"
            className="w-full h-[600px] bg-white rounded-lg shadow-xl border-2 border-blue-200 flex items-center justify-center"
          >
            <p className="text-gray-400 text-lg">Map will load here</p>
          </div>
        </div>
      </div>
    </main>
  );
}
