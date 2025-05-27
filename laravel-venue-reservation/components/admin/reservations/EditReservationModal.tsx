import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import UserSearchInput from "./UserSearchInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Reservation {
  id: number
  user: { id: number; nom: string; email: string }
  local: string
  date: string
  heure: string
  duree: number
  montant: number
  statut: string
}

interface EditReservationModalProps {
  open: boolean
  onClose: () => void
  reservation: Reservation | null
  onEdit: (data: Reservation) => void
}

export default function EditReservationModal({ open, onClose, reservation, onEdit }: EditReservationModalProps) {
  const [form, setForm] = useState<Reservation | null>(null)

  useEffect(() => {
    setForm(reservation)
  }, [reservation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    onEdit(form)
    onClose()
  }

  if (!form) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Modifier la réservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="user">Client</Label>
            <UserSearchInput
              onSelect={(user) => setForm((prev) => prev ? { ...prev, user } : null)}
              selectedUser={form.user}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="local">Local</Label>
            <Select
              value={form.local}
              onValueChange={(value) => setForm((prev) => prev ? { ...prev, local: value } : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terrain_football">Terrain de Football</SelectItem>
                <SelectItem value="salle_conference">Salle de Conférence</SelectItem>
                <SelectItem value="salle_sport">Salle de Sport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heure">Heure</Label>
              <Input
                id="heure"
                name="heure"
                type="time"
                value={form.heure}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duree">Durée (heures)</Label>
              <Input
                id="duree"
                name="duree"
                type="number"
                min={1}
                value={form.duree}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="montant">Montant (€)</Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                min={0}
                value={form.montant}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 