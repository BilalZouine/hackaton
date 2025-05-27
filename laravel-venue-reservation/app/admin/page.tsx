"use client"
import Link from "next/link"
import { BarChart3, MapPin, Calendar, DollarSign, Plus, Edit, Trash2, Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const stats = {
    total_reservations: 247,
    reservations_aujourd_hui: 12,
    revenus_mois: 15420,
    locaux_actifs: 26,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Admin */}
      <nav className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                ReservaLoc
              </Link>
              <Badge className="ml-3 bg-red-600">ADMIN</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard Client
              </Link>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Gérez vos locaux, réservations et utilisateurs</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Réservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_reservations}</div>
              <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservations_aujourd_hui}</div>
              <p className="text-xs text-muted-foreground">Réservations du jour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenus_mois.toLocaleString()}€</div>
              <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locaux Actifs</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.locaux_actifs}</div>
              <p className="text-xs text-muted-foreground">Sur 28 locaux total</p>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="locaux">Locaux</TabsTrigger>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          {/* Gestion des réservations */}
          <TabsContent value="reservations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des réservations</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle réservation
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Réservations récentes</CardTitle>
                <CardDescription>Liste des dernières réservations effectuées</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations_recentes.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reservation.user.nom}</div>
                            <div className="text-sm text-gray-500">{reservation.user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reservation.local.nom}</div>
                            <div className="text-sm text-gray-500">{reservation.local.type_libelle}</div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(reservation.date_reservation).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          {reservation.heure_debut} ({reservation.duree}h)
                        </TableCell>
                        <TableCell className="font-medium">{reservation.montant_total}€</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.statut === "confirmee"
                                ? "default"
                                : reservation.statut === "en_attente"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {reservation.statut === "confirmee"
                              ? "Confirmée"
                              : reservation.statut === "en_attente"
                                ? "En attente"
                                : "Annulée"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Liste des locaux</CardTitle>
                <CardDescription>Gérez vos locaux et leurs paramètres</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacité</TableHead>
                      <TableHead>Prix/h</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Réservations</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locaux.map((local) => (
                      <TableRow key={local.id}>
                        <TableCell className="font-medium">{local.nom}</TableCell>
                        <TableCell>{local.type_libelle}</TableCell>
                        <TableCell>{local.capacite} pers.</TableCell>
                        <TableCell className="font-medium">{local.prix_heure}€</TableCell>
                        <TableCell>{local.localisation}</TableCell>
                        <TableCell>{local.reservations_count}</TableCell>
                        <TableCell>
                          <Badge variant={local.actif ? "default" : "secondary"}>
                            {local.actif ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Liste des utilisateurs</CardTitle>
                <CardDescription>Gérez les comptes utilisateurs et leurs permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Réservations</TableHead>
                      <TableHead>Inscription</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {utilisateurs.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.nom}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "destructive" : "default"}>
                            {user.role === "admin" ? "Admin" : "Client"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.reservations_count}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
