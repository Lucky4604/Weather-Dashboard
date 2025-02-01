import { Cloud, Droplets, Wind } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeather } from "./WeatherContext"

interface WeatherDisplayProps {
  data: any
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  const { unit } = useWeather()

  if (!data) {
    return (
      <Card className="bg-white/10 border-0">
        <div className="p-6 space-y-4">
          <Skeleton className="h-12 w-48 bg-gray-700" />
          <div className="flex gap-4">
            <Skeleton className="h-24 w-24 rounded-full bg-gray-700" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-gray-700" />
              <Skeleton className="h-6 w-24 bg-gray-700" />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const temp = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const icon = data.weather[0].icon
  const description = data.weather[0].description

  return (
    <Card className="bg-white/10 border-0 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Weather in {data.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} className="w-24 h-24" />
            <div>
              <div className="text-4xl font-bold">
                {temp}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="text-gray-300 capitalize">{description}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-400" />
              <div>
                <div className="text-sm text-gray-300">Humidity</div>
                <div className="font-semibold">{data.main.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="text-green-400" />
              <div>
                <div className="text-sm text-gray-300">Wind Speed</div>
                <div className="font-semibold">
                  {Math.round(data.wind.speed)} {unit === "metric" ? "m/s" : "mph"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="text-purple-400" />
              <div>
                <div className="text-sm text-gray-300">Feels Like</div>
                <div className="font-semibold">
                  {feelsLike}°{unit === "metric" ? "C" : "F"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

