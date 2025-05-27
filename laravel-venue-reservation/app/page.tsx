"use client"
import Link from "next/link"
import { Calendar, Users, Star, ArrowRight, QrCode, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NavBar from "@/components/layout/navBar"

export default function HomePage() {
  const categories = [
    {
      id: "terrain_sport",
      nom: "Terrains de Sport",
      description: "Terrains de football, basketball, tennis...",
      icon: "⚽",
      count: 12,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-green-500",
    },
    {
      id: "salle_conference",
      nom: "Salles de Conférence",
      description: "Salles équipées pour réunions et présentations",
      icon: "🏢",
      count: 8,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-blue-500",
    },
    {
      id: "salle_fete",
      nom: "Salles de Fête",
      description: "Espaces pour événements et célébrations",
      icon: "🎉",
      count: 6,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Réservez vos locaux en quelques clics</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Système moderne de réservation avec authentification QR Code, planning en temps réel et paiement sécurisé
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <QrCode className="mr-2 h-5 w-5" />
              Scanner QR Code
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Découvrir les locaux
            </Button>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">26</div>
              <div className="text-gray-600">Locaux disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
              <div className="text-gray-600">Réservations effectuées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories de locaux */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez votre type de local</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de locaux adaptés à tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.nom}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.nom}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.count} locaux disponibles</span>
                    <Link href={`/locaux?type=${category.id}`}>
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white">
                        Voir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir ReservaLoc ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Connexion QR Code</h3>
              <p className="text-gray-600">Authentification rapide et sécurisée par QR code</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Planning en temps réel</h3>
              <p className="text-gray-600">Disponibilités mises à jour instantanément</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interface intuitive</h3>
              <p className="text-gray-600">Design moderne et facile à utiliser</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">Intégration Stripe et PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver votre local ?</h2>
          <p className="text-xl mb-8">Rejoignez des milliers d'utilisateurs qui font confiance à ReservaLoc</p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="mr-2 h-5 w-5" />
                Créer un compte
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Parcourir les locaux
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ReservaLoc</h3>
              <p className="text-gray-400">
                Système moderne de réservation de locaux développé pour le Hackathon OFPPT 2025
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link href="/locaux" className="hover:text-white">
                    Tous les locaux
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Connexion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>📧 contact@reservaloc.com</p>
                <p>📞 +212 5XX-XXXXXX</p>
                <p>📍 Casablanca, Maroc</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ReservaLoc - OFPPT ISGI Casablanca. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
