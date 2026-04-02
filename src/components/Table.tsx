import { useState } from "react"
import { useUsers, useDeleteUser } from "../hooks/useUsers"
import type { User } from "../types"

import ConfirmDialog from "@/components/common/ConfirmDialog"
import AddUser from "./AddUser"
import TableSkeleton from "./common/TableSkeleton"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

export default function UsersTable() {
  const { data, isLoading, error } = useUsers()
  const deleteMutation = useDeleteUser()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (isLoading) return <TableSkeleton />

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching users!
      </p>
    )

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Users
          </h1>

          <Button
            onClick={() => {
              setSelectedUser(null)
              setFormOpen(true)
            }}
            className="bg-black text-white hover:bg-black/70 cursor-pointer flex items-center gap-2 transition w-auto sm:px-4 sm:py-2 sm:text-base px-2 py-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <Table className="min-w-[1200px] text-xs">

            <TableHeader className="bg-gray-100 text-gray-700 border-b sticky top-0 z-10">
              <TableRow>
                <TableHead className="sticky left-0 bg-gray-100 z-20">
                  ID
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Street</TableHead>
                <TableHead>Suite</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Zip</TableHead>
                <TableHead>Lat</TableHead>
                <TableHead>Lng</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phrase</TableHead>
                <TableHead>BS</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="group even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  {/* Sticky ID with zebra FIX */}
                  <TableCell className="sticky left-0 font-medium bg-white even:bg-gray-50 group-hover:bg-gray-100">
                    {user.id}
                  </TableCell>

                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>

                  <TableCell>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {user.website}
                    </a>
                  </TableCell>

                  <TableCell>{user.address?.street || "-"}</TableCell>
                  <TableCell>{user.address?.suite || "-"}</TableCell>
                  <TableCell>{user.address?.city || "-"}</TableCell>
                  <TableCell>{user.address?.zipcode || "-"}</TableCell>
                  <TableCell>{user.address?.geo?.lat || "-"}</TableCell>
                  <TableCell>{user.address?.geo?.lng || "-"}</TableCell>

                  <TableCell>{user.company?.name || "-"}</TableCell>
                  <TableCell className="max-w-[120px] truncate">
                    {user.company?.catchPhrase || "-"}
                  </TableCell>
                  <TableCell>{user.company?.bs || "-"}</TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3">

                      <Pencil
                        className="w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setSelectedUser(user)
                          setFormOpen(true)
                        }}
                      />

                      <Trash2
                        className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedId(user.id)
                          setDeleteOpen(true)
                        }}
                      />

                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>

        {/* Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:cursor-pointer">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Update User" : "Add User"}
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-500">
              Fill in the user details.
            </p>

            <AddUser
              selectedUser={selectedUser}
              setSelectedUser={(user) => {
                setSelectedUser(user)
                if (!user) setFormOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={() => {
            if (selectedId) {
              deleteMutation.mutate(selectedId, {
                onSuccess: () => {
                  toast.success("User deleted successfully")
                  setDeleteOpen(false)
                  setSelectedId(null)
                },
                onError: () => {
                  toast.error("Failed to delete user")
                },
              })
            }
          }}
        />

      </div>
    </div>
  )
}