import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"

interface ReservationSearchProps {
  onSearch: (filters: {
    search: string
    status: string
    date: Date | null
  }) => void
}

export default function ReservationSearch({ onSearch }: ReservationSearchProps) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = () => {
    onSearch({
      search,
      status,
      date,
    })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setDate(null)
    onSearch({
      search: "",
      status: "",
      date: null,
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Rechercher une réservation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
            {(status || date) && (
              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                {[status, date].filter(Boolean).length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="confirmee">Confirmée</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="annulee">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={setDate}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500"
              >
                <X className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button size="sm" onClick={handleSearch}>
                Appliquer
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={handleSearch} className="w-full md:w-auto">
        Rechercher
      </Button>
    </div>
  )
} 