import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUsers, deleteUser } from "../api/api"
import type { User } from "../types"

import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function UsersTable({ setSelectedUser }: any) {
  const queryClient = useQueryClient()

  // Dialog state
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (id) => {
      queryClient.setQueryData(["users"], (old: User[] = []) =>
        old.filter((user) => user.id !== id)
      )

      toast.success("User deleted successfully")
      setOpen(false)
    },
    onError: () => {
      toast.error("Failed to delete user")
    },
  })

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching users!
      </p>
    )

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          User Table
        </h1>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">

          <Table className="min-w-[1100px] text-xs">

            {/* Header */}
            <TableHeader className="bg-gray-100 text-gray-700 border-b sticky top-0 z-10">
              <TableRow>
                <TableHead rowSpan={2}>ID</TableHead>
                <TableHead rowSpan={2}>Name</TableHead>
                <TableHead rowSpan={2}>Username</TableHead>
                <TableHead rowSpan={2}>Email</TableHead>
                <TableHead rowSpan={2}>Phone</TableHead>
                <TableHead rowSpan={2}>Website</TableHead>

                <TableHead colSpan={6} className="text-center">
                  Address
                </TableHead>
                <TableHead colSpan={3} className="text-center">
                  Company
                </TableHead>

                <TableHead rowSpan={2} className="text-center">
                  Actions
                </TableHead>
              </TableRow>

              <TableRow>
                <TableHead>Street</TableHead>
                <TableHead>Suite</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Zip</TableHead>
                <TableHead>Lat</TableHead>
                <TableHead>Lng</TableHead>

                <TableHead>Name</TableHead>
                <TableHead>Phrase</TableHead>
                <TableHead>BS</TableHead>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {data?.map((user: User) => (
                <TableRow key={user.id} className="hover:bg-gray-100 transition">

                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>

                  <TableCell>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 hover:underline transition"
                    >
                      {user.website}
                    </a>
                  </TableCell>

                  {/* Address */}
                  <TableCell>{user.address?.street || "-"}</TableCell>
                  <TableCell>{user.address?.suite || "-"}</TableCell>
                  <TableCell>{user.address?.city || "-"}</TableCell>
                  <TableCell>{user.address?.zipcode || "-"}</TableCell>
                  <TableCell>{user.address?.geo.lat || "-"}</TableCell>
                  <TableCell>{user.address?.geo.lng || "-"}</TableCell>

                  {/* Company */}
                  <TableCell>{user.company?.name || "-"}</TableCell>
                  <TableCell className="max-w-[120px] truncate">
                    {user.company?.catchPhrase || "-"}
                  </TableCell>
                  <TableCell>{user.company?.bs || "-"}</TableCell>

                  {/* Actions */}
                  <TableCell className="space-x-2 text-center">

                    {/* Edit */}
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        setSelectedId(user.id)
                        setOpen(true)
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <DialogFooter>
              <Button 
                className="cursor-pointer"
                variant="outline" 
                onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={() => {
                  if (selectedId) deleteMutation.mutate(selectedId)
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}