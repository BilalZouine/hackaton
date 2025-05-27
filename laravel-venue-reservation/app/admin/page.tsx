"use client"
import Link from "next/link"
import { BarChart3, MapPin, Calendar, DollarSign, Plus, Edit, Trash2, Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import NavBar from "@/components/layout/navBar"
import AjouterReservationModal from "@/components/admin/reservations/AjouterReservationModal"
import EditReservationModal from "@/components/admin/reservations/EditReservationModal"
import DetailReservationModal from "@/components/admin/reservations/DetailReservationModal"
import ReservationCard from "@/components/admin/reservations/ReservationCard"
import ReservationSearch from "@/components/admin/reservations/ReservationSearch"
import { useState } from "react"
import StatCard from "@/components/admin/dashboard/StatCard"
import DataTable from "@/components/admin/dashboard/DataTable"
import { Users, Building2 } from "lucide-react"

export default function AdminDashboard() {
  const stats = {
    total_reservations: {
      value: 247,
      trend: { value: 12, isPositive: true },
      description: "par rapport au mois dernier"
    },
    reservations_aujourd_hui: {
      value: 12,
      description: "Réservations du jour"
    },
    revenus_mois: {
      value: "15 420€",
      trend: { value: 8, isPositive: true },
      description: "par rapport au mois dernier"
    },
    locaux_actifs: {
      value: "26/28",
      description: "Locaux actifs"
    }
  }

  const reservations_recentes = [
    {
      id: 1,
      user: { nom: "Jean Dupont", email: "jean@email.com" },
      local: { nom: "Terrain Football A", type_libelle: "Terrain de Sport" },
      date_reservation: "2025-01-28",
      heure_debut: "14:00",
      duree: 2,
      montant_total: 100,
      statut: "confirmee",
      created_at: "2025-01-25",
    },
    {
      id: 2,
      user: { nom: "Marie Martin", email: "marie@email.com" },
      local: { nom: "Salle Conférence Executive", type_libelle: "Salle de Conférence" },
      date_reservation: "2025-01-29",
      heure_debut: "09:00",
      duree: 4,
      montant_total: 320,
      statut: "en_attente",
      created_at: "2025-01-26",
    },
  ]

  const locaux = [
    {
      id: 1,
      nom: "Terrain Football A",
      type: "terrain_sport",
      type_libelle: "Terrain de Sport",
      capacite: 22,
      prix_heure: 50,
      localisation: "Casablanca Centre",
      actif: true,
      reservations_count: 45,
    },
    {
      id: 2,
      nom: "Salle Conférence Executive",
      type: "salle_conference",
      type_libelle: "Salle de Conférence",
      capacite: 50,
      prix_heure: 80,
      localisation: "Business District",
      actif: true,
      reservations_count: 32,
    },
  ]

  const utilisateurs = [
    {
      id: 1,
      nom: "Jean Dupont",
      email: "jean@email.com",
      role: "client",
      reservations_count: 8,
      created_at: "2024-12-15",
    },
    {
      id: 2,
      nom: "Marie Martin",
      email: "marie@email.com",
      role: "client",
      reservations_count: 12,
      created_at: "2024-11-20",
    },
  ]

  const [ajouterOpen, setAjouterOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [reservations, setReservations] = useState(reservations_recentes)
  const [filteredReservations, setFilteredReservations] = useState(reservations_recentes)

  const handleAddReservation = (data) => {
    setReservations((prev) => [
      {
        id: prev.length + 1,
        user: { nom: data.user, email: "" },
        local: { nom: data.local, type_libelle: "" },
        date_reservation: data.date,
        heure_debut: data.heure,
        duree: data.duree,
        montant_total: data.montant,
        statut: "en_attente",
        created_at: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
  }
  const handleEditReservation = (data) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === data.id ? { ...r, ...data } : r))
    )
  }

  const handleDeleteReservation = (reservation: any) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      setReservations((prev) => prev.filter((r) => r.id !== reservation.id))
    }
  }

  const handleSearch = (filters: { search: string; status: string; date: Date | null }) => {
    let filtered = reservations_recentes

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.user.nom.toLowerCase().includes(searchLower) ||
          r.local.nom.toLowerCase().includes(searchLower) ||
          r.local.type_libelle.toLowerCase().includes(searchLower)
      )
    }

    if (filters.status) {
      filtered = filtered.filter((r) => r.statut === filters.status)
    }

    if (filters.date) {
      const searchDate = filters.date.toISOString().split("T")[0]
      filtered = filtered.filter((r) => r.date_reservation === searchDate)
    }

    setFilteredReservations(filtered)
  }

  const localColumns = [
    { key: "nom", label: "Nom", sortable: true },
    { key: "type_libelle", label: "Type", sortable: true },
    { key: "capacite", label: "Capacité", sortable: true },
    { key: "prix_heure", label: "Prix/h", sortable: true },
    { key: "localisation", label: "Localisation", sortable: true },
    { key: "reservations_count", label: "Réservations", sortable: true },
    { key: "actif", label: "Statut", sortable: true }
  ]

  const userColumns = [
    { key: "nom", label: "Nom", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Rôle", sortable: true },
    { key: "reservations_count", label: "Réservations", sortable: true },
    { key: "created_at", label: "Inscription", sortable: true }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Admin */}
      <NavBar />
      {/* Modals */}
      <AjouterReservationModal open={ajouterOpen} onClose={() => setAjouterOpen(false)} onAdd={handleAddReservation} />
      <EditReservationModal open={editOpen} onClose={() => setEditOpen(false)} reservation={selectedReservation} onEdit={handleEditReservation} />
      <DetailReservationModal open={detailOpen} onClose={() => setDetailOpen(false)} reservation={selectedReservation} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Gérez vos locaux, réservations et utilisateurs</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Réservations"
            value={stats.total_reservations.value}
            description={stats.total_reservations.description}
            icon={Calendar}
            trend={stats.total_reservations.trend}
          />
          <StatCard
            title="Aujourd'hui"
            value={stats.reservations_aujourd_hui.value}
            description={stats.reservations_aujourd_hui.description}
            icon={BarChart3}
          />
          <StatCard
            title="Revenus du mois"
            value={stats.revenus_mois.value}
            description={stats.revenus_mois.description}
            icon={DollarSign}
            trend={stats.revenus_mois.trend}
          />
          <StatCard
            title="Locaux Actifs"
            value={stats.locaux_actifs.value}
            description={stats.locaux_actifs.description}
            icon={MapPin}
          />
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="locaux">Locaux</TabsTrigger>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Gestion des réservations */}
          <TabsContent value="reservations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des réservations</h2>
              <Button onClick={() => setAjouterOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle réservation
              </Button>
            </div>

            <ReservationSearch onSearch={handleSearch} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onView={(res) => {
                    setSelectedReservation(res)
                    setDetailOpen(true)
                  }}
                  onEdit={(res) => {
                    setSelectedReservation(res)
                    setEditOpen(true)
                  }}
                  onDelete={handleDeleteReservation}
                />
              ))}
            </div>
          </TabsContent>

          {/* Gestion des locaux */}
          <TabsContent value="locaux" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des locaux</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un local
              </Button>
            </div>

            <DataTable
              columns={localColumns}
              data={locaux}
              searchPlaceholder="Rechercher un local..."
              filterOptions={[
                {
                  key: "type",
                  label: "Type de local",
                  options: [
                    { value: "terrain_sport", label: "Terrain de Sport" },
                    { value: "salle_conference", label: "Salle de Conférence" }
                  ]
                },
                {
                  key: "actif",
                  label: "Statut",
                  options: [
                    { value: "true", label: "Actif" },
                    { value: "false", label: "Inactif" }
                  ]
                }
              ]}
              onView={(local) => console.log("View local:", local)}
              onEdit={(local) => console.log("Edit local:", local)}
              onDelete={(local) => console.log("Delete local:", local)}
            />
          </TabsContent>

          {/* Gestion des utilisateurs */}
          <TabsContent value="utilisateurs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </div>

            <DataTable
              columns={userColumns}
              data={utilisateurs}
              searchPlaceholder="Rechercher un utilisateur..."
              filterOptions={[
                {
                  key: "role",
                  label: "Rôle",
                  options: [
                    { value: "admin", label: "Admin" },
                    { value: "client", label: "Client" }
                  ]
                }
              ]}
              onView={(user) => console.log("View user:", user)}
              onEdit={(user) => console.log("Edit user:", user)}
              onDelete={(user) => console.log("Delete user:", user)}
            />
          </TabsContent>

          {/* Statistiques */}
          <TabsContent value="statistiques" className="space-y-4">
            <h2 className="text-xl font-semibold">Statistiques et rapports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Réservations par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-gray-400" />
                    <span className="ml-4 text-gray-500">Graphique des réservations</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus par catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-gray-400" />
                    <span className="ml-4 text-gray-500">Graphique des revenus</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
