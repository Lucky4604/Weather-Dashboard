"use client"

import { useWeather, WeatherProvider } from './WeatherContext'
import { WeatherDashboard } from './WeatherDashboard'
WeatherDashboard

export default function Home() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  )
}