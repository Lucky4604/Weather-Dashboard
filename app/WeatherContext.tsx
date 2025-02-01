import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type WeatherContextType = {
  city: string
  setCity: (city: string) => void
  unit: "metric" | "imperial"
  setUnit: (unit: "metric" | "imperial") => void
  weatherData: any
  setWeatherData: (data: any) => void
  forecastData: any
  setForecastData: (data: any) => void
  error: string | null
  setError: (error: string | null) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lastCity") || "Hyderabad"
    }
    return "Hyderabad"
  })
  const [unit, setUnit] = useState<"metric" | "imperial">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("unit") as "metric" | "imperial") || "metric"
    }
    return "metric"
  })
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem("lastCity", city)
  }, [city])

  useEffect(() => {
    localStorage.setItem("unit", unit)
  }, [unit])

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        unit,
        setUnit,
        weatherData,
        setWeatherData,
        forecastData,
        setForecastData,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

