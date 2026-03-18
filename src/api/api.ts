import axios from "axios"
import type { User } from "../types"

const API_URL = "https://jsonplaceholder.typicode.com/users"

// GET users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL)
  return response.data
}