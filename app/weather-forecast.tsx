import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface WeatherForecastProps {
  data: any
  isLoading: boolean
  unit: "metric" | "imperial"
}

export function WeatherForecast({ data, isLoading, unit }: WeatherForecastProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="bg-white">
            <div className="p-4 space-y-4">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-12 w-12 rounded-full mx-auto bg-gray-200" />
              <Skeleton className="h-4 w-16 mx-auto bg-gray-200" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) return null


  const dailyForecasts = data.list
    .reduce((acc: any[], item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if (!acc.find((forecast) => new Date(forecast.dt * 1000).toLocaleDateString() === date)) {
        acc.push(item)
      }
      return acc
    }, [])
    .slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
      {dailyForecasts.map((forecast: any) => {
        const date = new Date(forecast.dt * 1000)
        const temp = Math.round(forecast.main.temp)
        const icon = forecast.weather[0].icon
        const description = forecast.weather[0].description

        return (
            <Card key={forecast.dt} className="bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 text-white hover:shadow-lg transition-all hover:scale-105">
            <div className="p-4 text-center">
              <div className="text-sm text-gray-300">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-16 h-16 mx-auto"
              />
              <div className="font-semibold text-white">
                {temp}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="text-xs text-gray-300 capitalize mt-1">{description}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

