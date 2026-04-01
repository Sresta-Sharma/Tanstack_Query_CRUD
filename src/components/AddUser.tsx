import { useEffect } from "react"
import { useAddUser, useUpdateUser } from "../hooks/useUsers"
import type { User } from "../types"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import FormField from "./common/FormField"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Zod Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
})

type FormData = z.infer<typeof formSchema>

// Error styling
const inputErrorClass = (error?: any) =>
  error ? "border-red-500 focus-visible:ring-red-500" : ""

export default function AddUser({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}) {

  // Using custom hooks
  const addMutation = useAddUser()
  const updateMutation = useUpdateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // Prefill on edit
  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
      })
    }
  }, [selectedUser, reset])

  const onSubmit = (data: FormData) => {
    if (selectedUser) {
      updateMutation.mutate(
        { ...selectedUser, ...data },
        {
          onSuccess: () => {
            setSelectedUser(null)
          },
        }
      )
    } else {
      addMutation.mutate(data)
    }

    reset()
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Card className="shadow-sm border rounded-2xl py-4">
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            {selectedUser ? "Update User" : "Add New User"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <FormField label="Name" error={errors.name?.message}>
                <Input
                  {...register("name")}
                  className={inputErrorClass(errors.name)}
                />
              </FormField>

              <FormField label="Username" error={errors.username?.message}>
                <Input
                  {...register("username")}
                  className={inputErrorClass(errors.username)}
                />
              </FormField>

              <FormField label="Email" error={errors.email?.message}>
                <Input
                  type="email"
                  {...register("email")}
                  className={inputErrorClass(errors.email)}
                />
              </FormField>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              
              {selectedUser && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset()
                    setSelectedUser(null)
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={addMutation.isPending || updateMutation.isPending}
                className="h-10 px-4 cursor-pointer hover:bg-black/80 transition"
              >
                {selectedUser
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update User"
                  : addMutation.isPending
                  ? "Adding..."
                  : "Add User"}
              </Button>

            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}