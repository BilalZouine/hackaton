"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setClientCookie } from "@/lib/utils"
import { auth } from "@/services/api/auth"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationFields, setValidationFields] = useState({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true,
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || password !== passwordConfirmation) {
      alert("Veuillez remplir tous les champs correctement.")
      setValidationFields({
        name: !!name.length,
        email: !!email.length,
        password: !!password.length,
        passwordConfirmation: password === passwordConfirmation,
      })
      return
    }

    // All validations passed
    setValidationFields({
      name: true,
      email: true,
      password: true,
      passwordConfirmation: true,
    })


    try {

      // Here you can add further login logic (e.g., API call)
      const response = await auth.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      if (response.status === 200) {
        setClientCookie("token", response.data.token, 7)
        setClientCookie("role", response.data.role, 107)
        window.location.href = "/dashboard"
      } else {
        alert("Identifiants incorrects. Veuillez réessayer.")
      }
    }
    catch (error) {
      console.error("Erreur lors de la connexion :", error)
      alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.")
    }




    // Here you can add further registration logic (e.g., API call)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target

    switch (fieldName) {
      case "nom":
        setName(value)
        setValidationFields((prev) => ({ ...prev, name: !!value }))
        break
      case "email":
        setEmail(value)
        setValidationFields((prev) => ({ ...prev, email: !!value }))
        break
      case "password":
        setPassword(value)
        setValidationFields((prev) => ({ ...prev, password: !!value }))
        // Also check password confirmation validity if already typed
        setValidationFields((prev) => ({
          ...prev,
          passwordConfirmation: passwordConfirmation === value,
        }))
        break
      case "password_confirmation":
        setPasswordConfirmation(value)
        setValidationFields((prev) => ({
          ...prev,
          passwordConfirmation: value === password,
        }))
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ReservaLoc
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Créer votre compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez ReservaLoc et réservez vos locaux facilement
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="Votre nom complet"
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                  {!validationFields.name && (
                    <p className="text-red-500 text-sm mt-1">Veuillez entrer votre nom complet.</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                  {!validationFields.email && (
                    <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse email valide.</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {!validationFields.password && (
                  <p className="text-red-500 text-sm mt-1">Veuillez entrer un mot de passe.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {!validationFields.passwordConfirmation && (
                  <p className="text-red-500 text-sm mt-1">Les mots de passe ne correspondent pas.</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  J'accepte les{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full">
                Créer mon compte
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
