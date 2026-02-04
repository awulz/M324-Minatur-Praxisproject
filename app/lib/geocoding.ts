export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

export async function searchSwissCities(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  try {
    const params = new URLSearchParams({
      name: query,
      count: '5',
      language: 'en',
      format: 'json',
    })

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${params}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch cities')
    }

    const data: GeocodingResponse = await response.json()

    // Filter only Swiss cities (country_code === 'CH')
    const swissCities = (data.results || []).filter(
      (city) => city.country_code === 'CH'
    )

    return swissCities
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}
