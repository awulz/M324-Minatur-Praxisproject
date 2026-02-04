'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SearchBar from './components/SearchBar'
import { GeocodingResult } from './lib/geocoding'

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-400 text-lg">Loading map...</p>
    </div>
  ),
})

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)

  const handleCitySelect = (city: GeocodingResult) => {
    const location = { lat: city.latitude, lng: city.longitude }
    setSelectedLocation(location)
    setMapCenter(location)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-blue-900 mb-4">
            Swiss Weather App
          </h1>
          <p className="text-xl text-blue-700">
            Click on the map or search a Swiss city
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto mb-6 flex justify-center">
          <SearchBar onCitySelect={handleCitySelect} />
        </div>

        {/* Selected Location Info */}
        {selectedLocation && (
          <div className="max-w-6xl mx-auto mb-4">
            <div className="bg-white rounded-lg shadow-md border border-blue-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                Selected Location: <span className="font-semibold text-blue-900">
                  {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="max-w-6xl mx-auto">
          <div
            id="map"
            className="w-full h-[600px] bg-white rounded-lg shadow-xl border-2 border-blue-200 overflow-hidden"
          >
            <Map 
              onLocationSelect={setSelectedLocation}
              centerTo={mapCenter}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
