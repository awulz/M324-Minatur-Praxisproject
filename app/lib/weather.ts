export interface CurrentWeather {
  temperature: number
  weatherCode: number
  windSpeed: number
  humidity: number
  time: string
}

export interface HourlyWeather {
  time: string[]
  temperature: number[]
  weatherCode: number[]
}

export interface DailyWeather {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  weatherCode: number[]
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyWeather
  daily: DailyWeather
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'Europe/Zurich',
      forecast_days: '7',
      models: 'icon_seamless',
    })

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data = await response.json()

    // Get next 24 hours from current time
    const currentHour = new Date().getHours()
    const hourlySlice = {
      time: data.hourly.time.slice(currentHour, currentHour + 24),
      temperature: data.hourly.temperature_2m.slice(currentHour, currentHour + 24),
      weatherCode: data.hourly.weather_code.slice(currentHour, currentHour + 24),
    }

    return {
      current: {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        time: data.current.time,
      },
      hourly: hourlySlice,
      daily: {
        time: data.daily.time,
        temperatureMax: data.daily.temperature_2m_max,
        temperatureMin: data.daily.temperature_2m_min,
        weatherCode: data.daily.weather_code,
      },
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}

export function getWeatherIcon(weatherCode: number): string {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  if (weatherCode === 0) return 'sun'
  if (weatherCode === 1 || weatherCode === 2) return 'cloud-sun'
  if (weatherCode === 3) return 'cloud'
  if (weatherCode >= 45 && weatherCode <= 48) return 'cloud-fog'
  if (weatherCode >= 51 && weatherCode <= 57) return 'cloud-drizzle'
  if (weatherCode >= 61 && weatherCode <= 67) return 'cloud-rain'
  if (weatherCode >= 71 && weatherCode <= 77) return 'snowflake'
  if (weatherCode >= 80 && weatherCode <= 82) return 'cloud-rain-wind'
  if (weatherCode >= 85 && weatherCode <= 86) return 'cloud-snow'
  if (weatherCode >= 95 && weatherCode <= 99) return 'cloud-lightning'
  return 'cloud'
}

export function getWeatherDescription(weatherCode: number): string {
  if (weatherCode === 0) return 'Clear sky'
  if (weatherCode === 1) return 'Mainly clear'
  if (weatherCode === 2) return 'Partly cloudy'
  if (weatherCode === 3) return 'Overcast'
  if (weatherCode === 45 || weatherCode === 48) return 'Foggy'
  if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle'
  if (weatherCode >= 61 && weatherCode <= 67) return 'Rain'
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow'
  if (weatherCode >= 80 && weatherCode <= 82) return 'Rain showers'
  if (weatherCode >= 85 && weatherCode <= 86) return 'Snow showers'
  if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm'
  return 'Unknown'
}
