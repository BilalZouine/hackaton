'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Bell, Settings } from 'lucide-react'
import { getClientToken, removeClientCookie } from '@/lib/utils'

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(!getClientToken('token'))

  const role = getClientToken('role')

  useEffect(() => {
    const token = getClientToken('token')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    removeClientCookie('token')
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ReservaLoc
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/categories" className="text-gray-700 hover:text-blue-600">
              Locaux
            </Link>
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (

              <>
                <Link href="/admin" className={`text-gray-700 hover:text-blue-600 ${role !== 'admin' ? '2' : ''}`}>
                  Admin
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50"
                >
                  Déconnexion
                </Button>
              </>

            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Connexion
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">Inscription</Button>
                </Link>
              </div>
            )}



          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
