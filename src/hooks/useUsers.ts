import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUsers, addUser, updateUser, deleteUser } from "../api/api"
import type { User } from "../types"
import { toast } from "sonner"

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old: User[] = []) => [
        ...old,
        { ...newUser, id: old.length + 1 },
      ])
      toast.success("User added successfully")
    },
    onError: () => toast.error("Failed to add user"),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old: User[] = []) =>
        old.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      )
      toast.success("User updated successfully")
    },
    onError: () => toast.error("Failed to update user"),
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (id) => {
      queryClient.setQueryData(["users"], (old: User[] = []) =>
        old.filter((user) => user.id !== id)
      )
      toast.success("User deleted successfully")
    },
    onError: () => toast.error("Failed to delete user"),
  })
}