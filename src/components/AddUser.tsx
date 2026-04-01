import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUser } from "../api/api"
import type { User } from "../types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddUser() {
  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
  })

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old: User[] = []) => [
        ...old,
        { ...newUser, id: old.length + 1 },
      ])
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
    setForm({ name: "", email: "", username: "" })
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      <Card className="shadow-sm border rounded-2xl">
        
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Add New User
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Name</label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Username</label>
              <Input
                placeholder="johndoe"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email</label>
              <Input
                type="email"
                placeholder="john@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Button */}
            <div className="flex items-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-10 cursor-pointer hover:bg-black/80 transition"
            >
              {mutation.isPending ? "Adding..." : "Add User"}
            </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}