"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Users, Clock, Star, Heart, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LocauxPage() {
  const [filtres, setFiltres] = useState({
    type: "",
    capacite_min: "",
    prix_max: "",
    localisation: "",
  })

  const locaux = [
    {
      id: 1,
      nom: "Terrain de Football Premium",
      type: "terrain_sport",
      type_libelle: "Terrain de Sport",
      capacite: 22,
      prix_heure: 50,
      localisation: "Casablanca Centre",
      description: "Terrain en gazon naturel avec éclairage professionnel",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Éclairage", "Vestiaires", "Douches", "Parking"],
      note: 4.8,
      disponible: true,
    },
    {
      id: 2,
      nom: "Salle de Conférence Executive",
      type: "salle_conference",
      type_libelle: "Salle de Conférence",
      capacite: 50,
      prix_heure: 80,
      localisation: "Business District",
      description: "Salle moderne équipée pour présentations professionnelles",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Projecteur 4K", "Climatisation", "WiFi", "Tableau interactif"],
      note: 4.9,
      disponible: true,
    },
    {
      id: 3,
      nom: "Salle de Réception Royale",
      type: "salle_fete",
      type_libelle: "Salle de Fête",
      capacite: 200,
      prix_heure: 120,
      localisation: "Anfa",
      description: "Grande salle élégante pour événements prestigieux",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Sonorisation", "Éclairage spectacle", "Cuisine", "Parking VIP"],
      note: 4.7,
      disponible: false,
    },
    {
      id: 4,
      nom: "Court de Tennis Couvert",
      type: "terrain_sport",
      type_libelle: "Terrain de Sport",
      capacite: 4,
      prix_heure: 35,
      localisation: "Maarif",
      description: "Court de tennis professionnel avec surface en dur",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Éclairage LED", "Vestiaires", "Matériel inclus"],
      note: 4.6,
      disponible: true,
    },
    {
      id: 5,
      nom: "Salle de Formation Tech",
      type: "salle_conference",
      type_libelle: "Salle de Conférence",
      capacite: 30,
      prix_heure: 60,
      localisation: "Technopolis",
      description: "Espace moderne pour formations et workshops",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Écrans multiples", "Prises USB", "WiFi haut débit", "Café"],
      note: 4.8,
      disponible: true,
    },
    {
      id: 6,
      nom: "Espace Garden Party",
      type: "salle_fete",
      type_libelle: "Salle de Fête",
      capacite: 150,
      prix_heure: 100,
      localisation: "Ain Diab",
      description: "Espace extérieur avec jardin pour événements en plein air",
      image: "/placeholder.svg?height=250&width=400",
      equipements: ["Jardin paysager", "Tente", "Barbecue", "Parking"],
      note: 4.5,
      disponible: true,
    },
  ]

  const locauxFiltres = locaux.filter((local) => {
    if (filtres.type && local.type !== filtres.type) return false
    if (filtres.capacite_min && local.capacite < Number.parseInt(filtres.capacite_min)) return false
    if (filtres.prix_max && local.prix_heure > Number.parseInt(filtres.prix_max)) return false
    if (filtres.localisation && !local.localisation.toLowerCase().includes(filtres.localisation.toLowerCase()))
      return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                ReservaLoc
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Inscription</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tous nos locaux disponibles</h1>
          <p className="text-gray-600">Découvrez {locaux.length} locaux adaptés à vos besoins</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de local</label>
                  <Select value={filtres.type} onValueChange={(value) => setFiltres({ ...filtres, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="terrain_sport">Terrains de Sport</SelectItem>
                      <SelectItem value="salle_conference">Salles de Conférence</SelectItem>
                      <SelectItem value="salle_fete">Salles de Fête</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacité minimale</label>
                  <Input
                    type="number"
                    placeholder="Ex: 10"
                    value={filtres.capacite_min}
                    onChange={(e) => setFiltres({ ...filtres, capacite_min: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum (€/h)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 100"
                    value={filtres.prix_max}
                    onChange={(e) => setFiltres({ ...filtres, prix_max: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <Input
                    placeholder="Ex: Casablanca"
                    value={filtres.localisation}
                    onChange={(e) => setFiltres({ ...filtres, localisation: e.target.value })}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFiltres({ type: "", capacite_min: "", prix_max: "", localisation: "" })}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Liste des locaux */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {locauxFiltres.length} local{locauxFiltres.length > 1 ? "aux" : ""} trouvé
                {locauxFiltres.length > 1 ? "s" : ""}
              </p>
              <Select defaultValue="prix_asc">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prix_asc">Prix croissant</SelectItem>
                  <SelectItem value="prix_desc">Prix décroissant</SelectItem>
                  <SelectItem value="note">Mieux notés</SelectItem>
                  <SelectItem value="capacite">Capacité</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locauxFiltres.map((local) => (
                <Card key={local.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={local.image || "/placeholder.svg"}
                      alt={local.nom}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={local.disponible ? "default" : "destructive"}>
                        {local.disponible ? "Disponible" : "Occupé"}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary">{local.type_libelle}</Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{local.nom}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{local.note}</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {local.localisation}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{local.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{local.capacite} pers.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Réservation instantanée</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {local.equipements.slice(0, 3).map((equipement, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {equipement}
                        </Badge>
                      ))}
                      {local.equipements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{local.equipements.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">{local.prix_heure}€</span>
                        <span className="text-gray-500">/heure</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/locaux/${local.id}`}>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </Link>
                        <Link href={`/reservations/create?local=${local.id}`}>
                          <Button size="sm" disabled={!local.disponible}>
                            <Calendar className="h-4 w-4 mr-1" />
                            Réserver
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {locauxFiltres.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun local trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
