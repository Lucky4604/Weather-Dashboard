import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useWeather } from "./WeatherContext"

interface TemperatureGraphProps {
  data: any
}

export function TemperatureGraph({ data }: TemperatureGraphProps) {
  const { unit } = useWeather()
  const [graphUnit, setGraphUnit] = useState<"metric" | "imperial">(unit)

  if (!data || !data.list) {
    return (
      <Card className="bg-white/10 border-0 p-4 mt-6">
        <Skeleton className="h-[300px] w-full bg-gray-700" />
      </Card>
    )
  }

  const currentTime = new Date()
  const userTimezoneOffset = currentTime.getTimezoneOffset() * 60000
  const cityTimezoneOffset = data.city.timezone * 1000

  const graphData = data.list.slice(0, 8).map((item: any) => {
    const itemTime = new Date(item.dt * 1000 + userTimezoneOffset + cityTimezoneOffset)
    return {
      time: itemTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: item.main.temp,
      tempF: (item.main.temp * 9) / 5 + 32,
    }
  })

  return (
    <Card className="bg-white/10 border-0 text-white p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Temperature Forecast</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
          <Line type="monotone" dataKey={graphUnit === "metric" ? "temp" : "tempF"} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

