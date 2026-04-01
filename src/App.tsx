import { useState } from "react"
import Table from "./components/Table"
import AddUser from "./components/AddUser"
import type { User } from "./types"

function App() {
  // Shared state for editing
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="bg-gray-50 min-h-screen py-6 space-y-6">

      {/* Table */}
      <Table 
        setSelectedUser={setSelectedUser} 
      />

      {/* Form */}
      <AddUser 
        selectedUser={selectedUser} 
        setSelectedUser={setSelectedUser} 
      />

    </div>
  )
}

export default App