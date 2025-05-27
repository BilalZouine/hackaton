"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/layout/navBar"

export default function CategoriesPage() {
  const categories = [
    {
      id: "terrain_sport",
      nom: "Terrains de Sport",
      description: "Terrains de football, basketball, tennis et autres sports",
      icon: "⚽",
      count: 12,
      prix_min: 30,
      prix_max: 80,
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-green-500",
      locaux: [
        { nom: "Terrain Football A", capacite: 22, prix: 50, localisation: "Casablanca Centre" },
        { nom: "Court de Tennis", capacite: 4, prix: 30, localisation: "Anfa" },
        { nom: "Terrain Basketball", capacite: 10, prix: 40, localisation: "Maarif" },
      ],
    },
    {
      id: "salle_conference",
      nom: "Salles de Conférence",
      description: "Salles équipées pour réunions, formations et présentations",
      icon: "🏢",
      count: 8,
      prix_min: 60,
      prix_max: 150,
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-blue-500",
      locaux: [
        { nom: "Salle Executive", capacite: 50, prix: 80, localisation: "Business District" },
        { nom: "Salle Formation", capacite: 30, prix: 60, localisation: "Centre Ville" },
        { nom: "Auditorium", capacite: 100, prix: 150, localisation: "Technopolis" },
      ],
    },
    {
      id: "salle_fete",
      nom: "Salles de Fête",
      description: "Espaces pour événements, mariages et célébrations",
      icon: "🎉",
      count: 6,
      prix_min: 100,
      prix_max: 300,
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-purple-500",
      locaux: [
        { nom: "Salle Royale", capacite: 200, prix: 200, localisation: "Anfa" },
        { nom: "Espace Garden", capacite: 150, prix: 180, localisation: "Ain Diab" },
        { nom: "Hall Prestige", capacite: 300, prix: 300, localisation: "Marina" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
     <NavBar/>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Choisissez votre type de local</h1>
            <p className="text-xl max-w-2xl mx-auto">Découvrez notre sélection de locaux adaptés à tous vos besoins</p>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {categories.map((category, index) => (
              <Card key={category.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.nom}
                      className="w-full h-80 lg:h-full object-cover"
                    />
                    <div
                      className={`absolute top-4 left-4 w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl`}
                    >
                      {category.icon}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">{category.nom}</h2>
                        <Badge variant="secondary" className="text-sm">
                          {category.count} locaux
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-6">{category.description}</p>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Réservation instantanée</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>Équipements inclus</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Prix par heure</span>
                          <span className="text-lg font-bold text-blue-600">
                            {category.prix_min}€ - {category.prix_max}€
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exemples de locaux */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-semibold text-gray-900">Exemples de locaux :</h3>
                      {category.locaux.map((local, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{local.nom}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {local.capacite} pers.
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {local.localisation}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-blue-600">{local.prix}€/h</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href={`/locaux?type=${category.id}`}>
                      <Button size="lg" className="w-full group">
                        Voir tous les {category.nom.toLowerCase()}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-xl mb-8">
            Notre équipe est là pour vous conseiller et vous aider à trouver le local parfait
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Contacter un conseiller
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Voir tous les locaux
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
