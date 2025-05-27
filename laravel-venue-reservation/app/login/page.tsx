"use client"

import { useState } from "react"
import Link from "next/link"
import { QrCode, Mail, Eye, EyeOff, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { setClientCookie } from "@/lib/utils"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [qrResult, setQrResult] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login process
    if (email && password   ) {
      setTimeout(() => {

        window.location.href = "/dashboard"

        setClientCookie("token", "fake-token-for-demo", 7)
      }, 2000)
    }
    else {
      alert
    }
  }




  const handleQrScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setQrResult("QR Code détecté, connexion en cours...")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ReservaLoc
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
          <p className="mt-2 text-sm text-gray-600">Utilisez votre QR code ou vos identifiants</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <form className="space-y-4" onSubmit={handleEmailLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" type="email" onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Se souvenir de moi
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4 mt-6">
                <div className="text-center space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 min-h-[200px] flex flex-col items-center justify-center">
                    {!isScanning ? (
                      <>
                        <QrCode className="h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">
                          Scannez votre QR code personnel pour vous connecter instantanément
                        </p>
                        <Button onClick={handleQrScan} className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Activer la caméra
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="w-32 h-32 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center mb-4">
                          <div className="animate-pulse">
                            <QrCode className="h-12 w-12 text-blue-500" />
                          </div>
                        </div>
                        <p className="text-blue-600 font-medium">{qrResult || "Recherche de QR code..."}</p>
                        <Button variant="outline" size="sm" onClick={() => setIsScanning(false)} className="mt-2">
                          Annuler
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>Votre QR code a été envoyé par email lors de votre inscription.</p>
                    <p>Vous pouvez également le retrouver dans votre espace personnel.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800">Comptes de démonstration</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>Admin:</strong> admin@reservaloc.com / password
            </p>
            <p>
              <strong>Client:</strong> client@test.com / password
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Inscrivez-vous gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
