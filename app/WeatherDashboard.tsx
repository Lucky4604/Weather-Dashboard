"use client"
import { useEffect } from "react"
import { useWeather } from "./WeatherContext"
import { SearchInput } from "./SearchInput"
import { WeatherDisplay } from "./WeatherDisplay"
import { WeatherForecast } from "./weather-forecast"
import { ErrorDisplay } from "./ErrorDisplay"
import { TemperatureGraph } from "./TemperatureGraph"

const BASE_URL = "https://api.openweathermap.org/data/2.5"

export function WeatherDashboard() {
  const { city, unit, setWeatherData, setForecastData, setError, weatherData, forecastData, error } = useWeather()

  const fetchWeatherData = async () => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${city}&units=${unit}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`),
        fetch(`${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`),
      ])

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found")
      }

      const weatherData = await weatherResponse.json()
      const forecastData = await forecastResponse.json()
      setWeatherData(weatherData)
      setForecastData(forecastData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  useEffect(() => {
    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 30000)
    return () => clearInterval(interval)
  }, [city, unit, fetchWeatherData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Weather Dashboard</h1>
        <SearchInput />
        {error ? (
          <ErrorDisplay message={error} />
        ) : (
          <>
            <WeatherDisplay data={weatherData} />
            <TemperatureGraph data={forecastData} />
            <WeatherForecast data={forecastData} isLoading={!weatherData} unit={unit} />
          </>
        )}
      </div>
    </div>
  )
}