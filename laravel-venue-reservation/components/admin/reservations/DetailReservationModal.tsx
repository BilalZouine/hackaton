import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, DollarSign, Clock4 } from "lucide-react"

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

interface DetailReservationModalProps {
  open: boolean
  onClose: () => void
  reservation: Reservation | null
}

export default function DetailReservationModal({ open, onClose, reservation }: DetailReservationModalProps) {
  if (!reservation) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmee":
        return "bg-green-100 text-green-800"
      case "en_attente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Détail de la réservation</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Badge className={`${getStatusColor(reservation.statut)} px-3 py-1 rounded-full`}>
              {reservation.statut === "confirmee"
                ? "Confirmée"
                : reservation.statut === "en_attente"
                  ? "En attente"
                  : "Annulée"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">{reservation.user.nom}</h3>
                <p className="text-sm text-gray-500">{reservation.user.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">{reservation.local.nom}</h3>
                <p className="text-sm text-gray-500">{reservation.local.type_libelle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(reservation.date_reservation).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Heure</p>
                  <p className="font-medium">{reservation.heure_debut}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Clock4 className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Durée</p>
                  <p className="font-medium">{reservation.duree} heures</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Montant</p>
                  <p className="font-medium">{reservation.montant_total}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline" className="w-full">
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 