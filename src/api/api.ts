import axios from "axios"
import type { User } from "../types"

const API_URL = "https://jsonplaceholder.typicode.com/users"

// Get users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL)
  return response.data
}

// Create user
export const addUser = async (user: Partial<User>) => {
  const response = await axios.post(API_URL, user)
  return response.data
}

// Update user
export const updateUser = async (user: User) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user)
  return response.data
}

// Delete user
export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
}