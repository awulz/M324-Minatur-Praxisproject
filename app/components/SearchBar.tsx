'use client'

import { useState, useEffect, useRef } from 'react'
import { searchSwissCities, GeocodingResult } from '../lib/geocoding'

interface SearchBarProps {
  onCitySelect: (city: GeocodingResult) => void
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true)
        const cities = await searchSwissCities(query)
        setResults(cities)
        setIsLoading(false)
        setShowDropdown(true)
      } else {
        setResults([])
        setShowDropdown(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCityClick = (city: GeocodingResult) => {
    setQuery(city.name)
    setShowDropdown(false)
    onCitySelect(city)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Swiss cities..."
        className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
      />

      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-blue-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {results.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-semibold text-gray-900">{city.name}</div>
              <div className="text-sm text-gray-500">
                {city.admin1 && `${city.admin1}, `}Switzerland
              </div>
            </button>
          ))}
        </div>
      )}

      {showDropdown && !isLoading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-blue-200 rounded-lg shadow-xl p-4">
          <p className="text-gray-500 text-center">No Swiss cities found</p>
        </div>
      )}
    </div>
  )
}
