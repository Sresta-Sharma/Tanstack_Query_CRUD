import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUsers, addUser, updateUser, deleteUser } from "../api/api"
import type { User } from "../types"
import { QUERY_KEYS } from "../constants/queryKeys"

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: QUERY_KEYS.USERS,
    queryFn: fetchUsers,
  })
}

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(QUERY_KEYS.USERS, (old: User[] = []) => [
        ...old,
        { ...newUser, id: old.length + 1 },
      ])
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(QUERY_KEYS.USERS, (old: User[] = []) =>
        old.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      )
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (id) => {
      queryClient.setQueryData(QUERY_KEYS.USERS, (old: User[] = []) =>
        old.filter((user) => user.id !== id)
      )
    },
  })
}