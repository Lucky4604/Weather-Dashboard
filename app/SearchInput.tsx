import { useState } from "react"
import { useWeather } from "./WeatherContext"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function SearchInput() {
  const { city, setCity, unit, setUnit } = useWeather()
  const [searchInput, setSearchInput] = useState(city)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCity(searchInput)
  }

  return (
    <Card className="bg-white/10 border-0">
      <div className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter city name..."
              className="pl-9 bg-white/20 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" variant="secondary">
            Search
          </Button>
          <Button
            variant={unit === "metric" ? "default" : "outline"}
            onClick={() => setUnit("metric")}
            className="w-12 border-gray-700"
          >
            °C
          </Button>
          <Button
            variant={unit === "imperial" ? "default" : "outline"}
            onClick={() => setUnit("imperial")}
            className="w-12 border-gray-700"
          >
            °F
          </Button>
        </form>
      </div>
    </Card>
  )
}

