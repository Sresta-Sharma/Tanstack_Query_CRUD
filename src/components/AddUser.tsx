import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUser } from "../api/api"
import type { User } from "../types"

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
      // update cache
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
  <div className="p-4">
    <div className="shadow-lg rounded-xl p-3 bg-white">
      <h2 className="text-sm font-semibold mb-2 text-gray-700">
        Add New User
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center text-xs">
        
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded w-28 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded w-40 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 transition text-xs cursor-pointer"
        >
          {mutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  </div>
)
}