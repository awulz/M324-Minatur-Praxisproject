'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, icon } from 'leaflet'

const SWITZERLAND_CENTER: LatLngExpression = [46.8182, 8.2275]
const DEFAULT_ZOOM = 8

// Fix for default marker icon in production
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      console.log('Clicked coordinates:', { lat, lng })
      onLocationSelect(lat, lng)
    },
  })
  return null
}

interface MapProps {
  onLocationSelect?: (location: { lat: number; lng: number }) => void
}

export default function Map({ onLocationSelect }: MapProps) {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null)

  const handleLocationSelect = (lat: number, lng: number) => {
    setMarkerPosition([lat, lng])
    onLocationSelect?.({ lat, lng })
  }

  return (
    <MapContainer
      center={SWITZERLAND_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onLocationSelect={handleLocationSelect} />
      {markerPosition && <Marker position={markerPosition} icon={defaultIcon} />}
    </MapContainer>
  )
}
