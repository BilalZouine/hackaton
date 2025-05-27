import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClientToken(name: string): string | null {
  if (typeof window === 'undefined') return null

  // Try localStorage first
  const localToken = localStorage.getItem(name)
  if (localToken) return localToken

  // Fallback to non-HTTP-only cookie
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))

  return match ? decodeURIComponent(match.split('=')[1]) : null
}


export function setClientCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}


export function removeClientCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
