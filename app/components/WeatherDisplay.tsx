'use client'

import { WeatherData, getWeatherIcon, getWeatherDescription } from '../lib/weather'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface WeatherDisplayProps {
  weather: WeatherData
  cityName?: string
}

function WeatherIcon({ iconName, size = 24 }: { iconName: string; size?: number }) {
  const iconMap: Record<string, LucideIcon> = {
    sun: LucideIcons.Sun,
    'cloud-sun': LucideIcons.CloudSun,
    cloud: LucideIcons.Cloud,
    'cloud-fog': LucideIcons.CloudFog,
    'cloud-drizzle': LucideIcons.CloudDrizzle,
    'cloud-rain': LucideIcons.CloudRain,
    snowflake: LucideIcons.Snowflake,
    'cloud-rain-wind': LucideIcons.CloudRainWind,
    'cloud-snow': LucideIcons.CloudSnow,
    'cloud-lightning': LucideIcons.CloudLightning,
  }

  const Icon = iconMap[iconName] || LucideIcons.Cloud
  return <Icon size={size} />
}

export default function WeatherDisplay({ weather, cityName }: WeatherDisplayProps) {
  const { current, hourly, daily } = weather

  // Format time strings
  const formatHourlyTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false })
  }

  const formatDailyDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-2xl p-8 text-white">
        {cityName && (
          <h2 className="text-2xl font-bold mb-4">{cityName}</h2>
        )}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold mb-2">
              {Math.round(current.temperature)}°C
            </div>
            <div className="text-xl mb-4">
              {getWeatherDescription(current.weatherCode)}
            </div>
            <div className="space-y-1 text-blue-100">
              <div className="flex items-center gap-2">
                <LucideIcons.Droplets size={16} />
                <span>Humidity: {current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideIcons.Wind size={16} />
                <span>Wind: {Math.round(current.windSpeed)} km/h</span>
              </div>
            </div>
          </div>
          <div className="text-blue-100">
            <WeatherIcon iconName={getWeatherIcon(current.weatherCode)} size={120} />
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <LucideIcons.Clock size={20} />
          24-Hour Forecast
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {hourly.time.map((time, index) => (
              <div
                key={time}
                className="flex-shrink-0 bg-blue-50 rounded-lg p-4 text-center min-w-[100px] border border-blue-100"
              >
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {formatHourlyTime(time)}h
                </div>
                <div className="flex justify-center mb-2 text-blue-600">
                  <WeatherIcon iconName={getWeatherIcon(hourly.weatherCode[index])} size={32} />
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(hourly.temperature[index])}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <LucideIcons.Calendar size={20} />
          7-Day Forecast
        </h3>
        <div className="space-y-3">
          {daily.time.map((date, index) => (
            <div
              key={date}
              className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 border border-blue-100"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 font-semibold text-gray-700">
                  {formatDailyDate(date)}
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <WeatherIcon iconName={getWeatherIcon(daily.weatherCode[index])} size={28} />
                </div>
                <div className="text-sm text-gray-600 flex-1">
                  {getWeatherDescription(daily.weatherCode[index])}
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="text-gray-500 text-sm">
                  {Math.round(daily.temperatureMin[index])}°
                </div>
                <div className="w-16 h-2 bg-gradient-to-r from-blue-300 to-orange-300 rounded-full"></div>
                <div className="font-bold text-gray-900">
                  {Math.round(daily.temperatureMax[index])}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
