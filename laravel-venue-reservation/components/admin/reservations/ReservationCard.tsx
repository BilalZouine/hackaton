import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin, DollarSign, Clock4, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Reservation {
  id: number
  user: { id: number; nom: string; email: string }
  local: { nom: string; type_libelle: string }
  date_reservation: string
  heure_debut: string
  duree: number
  montant_total: number
  statut: string
}

interface ReservationCardProps {
  reservation: Reservation
  onView: (reservation: Reservation) => void
  onEdit: (reservation: Reservation) => void
  onDelete: (reservation: Reservation) => void
}

export default function ReservationCard({ reservation, onView, onEdit, onDelete }: ReservationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmee":
        return "bg-green-100 text-green-800 border-green-200"
      case "en_attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {reservation.local.nom}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(reservation)}>
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(reservation)}>
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(reservation)}
                  className="text-red-600"
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={`${getStatusColor(reservation.statut)} px-3 py-1 rounded-full`}>
                {reservation.statut === "confirmee"
                  ? "Confirmée"
                  : reservation.statut === "en_attente"
                    ? "En attente"
                    : "Annulée"}
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date(reservation.date_reservation).toLocaleDateString("fr-FR")}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{reservation.user.nom}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{reservation.local.type_libelle}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{reservation.heure_debut}</p>
                    <p className="text-xs text-gray-500">{reservation.duree}h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{reservation.montant_total}€</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 