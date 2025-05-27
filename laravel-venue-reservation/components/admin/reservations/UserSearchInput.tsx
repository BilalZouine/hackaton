import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  nom: string
  email: string
}

interface UserSearchInputProps {
  onSelect: (user: User) => void
  selectedUser?: User
}

export default function UserSearchInput({ onSelect, selectedUser }: UserSearchInputProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([])

  // Simulated API call - replace with your actual API
  useEffect(() => {
    // This is where you'd make your API call
    const fetchUsers = async () => {
      // Simulated data - replace with actual API call
      const mockUsers = [
        { id: 1, nom: "Jean Dupont", email: "jean@email.com" },
        { id: 2, nom: "Marie Martin", email: "marie@email.com" },
        { id: 3, nom: "Pierre Durand", email: "pierre@email.com" },
      ]
      setUsers(mockUsers)
    }
    fetchUsers()
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser ? selectedUser.nom : "Sélectionner un utilisateur..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Rechercher un utilisateur..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                value={user.nom}
                onSelect={() => {
                  onSelect(user)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{user.nom}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 