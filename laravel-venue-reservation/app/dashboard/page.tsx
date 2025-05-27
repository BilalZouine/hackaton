"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Star, Plus, Download, CreditCard, QrCode, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavBar from "@/components/layout/navBar"

export default function DashboardPage() {
  const [user] = useState({
    nom: "Client Test",
    email: "client@test.com",
    role: "client",
    qr_code: "abc123-def456-ghi789",
  })

  const stats = {
    total_reservations: 12,
    reservations_confirmees: 10,
    montant_total: 850,
  }

  const reservations_recentes = [
    {
      id: 1,
      local: { nom: "Terrain Football A", type_libelle: "Terrain de Sport" },
      date_reservation: "2025-01-30",
      heure_debut: "14:00",
      duree: 2,
      montant_total: 100,
      statut: "confirmee",
      statut_libelle: "Confirmée",
      facture: { statut_paiement: "paye", numero_facture: "FAC-2025-000123" },
    },
    {
      id: 2,
      local: { nom: "Salle Conférence Executive", type_libelle: "Salle de Conférence" },
      date_reservation: "2025-02-05",
      heure_debut: "09:00",
      duree: 4,
      montant_total: 320,
      statut: "confirmee",
      statut_libelle: "Confirmée",
      facture: { statut_paiement: "en_attente", numero_facture: "FAC-2025-000124" },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, {user.nom} 👋</h1>
          <p className="text-gray-600">Gérez vos réservations et découvrez de nouveaux locaux</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Réservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_reservations}</div>
              <p className="text-xs text-muted-foreground">Depuis votre inscription</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réservations Confirmées</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservations_confirmees}</div>
              <p className="text-xs text-muted-foreground">Réservations actives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant Total</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.montant_total}€</div>
              <p className="text-xs text-muted-foreground">Total dépensé</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="reservations" className="space-y-6">
              <TabsList>
                <TabsTrigger value="reservations">Mes Réservations</TabsTrigger>
                <TabsTrigger value="factures">Factures</TabsTrigger>
                <TabsTrigger value="favoris">Favoris</TabsTrigger>
              </TabsList>

              <TabsContent value="reservations" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Réservations récentes</h2>
                  <Link href="/categories">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle réservation
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {reservations_recentes.map((reservation) => (
                    <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{reservation.local.nom}</CardTitle>
                            <CardDescription>{reservation.local.type_libelle}</CardDescription>
                          </div>
                          <Badge variant="default">{reservation.statut_libelle}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{new Date(reservation.date_reservation).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>
                              {reservation.heure_debut} ({reservation.duree}h)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <span>{reservation.montant_total}€</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={reservation.facture.statut_paiement === "paye" ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {reservation.facture.statut_paiement === "paye" ? "Payé" : "En attente"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                          {reservation.facture.statut_paiement === "en_attente" && (
                            <Button size="sm">Payer maintenant</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="factures" className="space-y-4">
                <h2 className="text-xl font-semibold">Mes factures</h2>
                <div className="space-y-4">
                  {reservations_recentes.map((reservation) => (
                    <Card key={reservation.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{reservation.facture.numero_facture}</div>
                            <div className="text-sm text-gray-500">{reservation.local.nom}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(reservation.date_reservation).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{reservation.montant_total}€</div>
                            <Badge variant={reservation.facture.statut_paiement === "paye" ? "default" : "destructive"}>
                              {reservation.facture.statut_paiement === "paye" ? "Payé" : "En attente"}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favoris" className="space-y-4">
                <h2 className="text-xl font-semibold">Locaux favoris</h2>
                <div className="text-center py-12 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-4" />
                  <p>Aucun local en favori pour le moment</p>
                  <Link href="/categories">
                    <Button className="mt-4">Découvrir les locaux</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Mon QR Code
                </CardTitle>
                <CardDescription>Utilisez ce QR code pour vous connecter rapidement</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">Code: {user.qr_code}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/categories">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle réservation
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Voir toutes mes réservations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Mes factures
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres du compte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
