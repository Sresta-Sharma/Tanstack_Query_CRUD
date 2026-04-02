import { useEffect } from "react"
import { useAddUser, useUpdateUser } from "../hooks/useUsers"
import type { User } from "../types"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import FormField from "./common/FormField"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),

  phone: z.string().optional(),
  website: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function AddUser({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}) {
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

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
        phone: selectedUser.phone || "",
        website: selectedUser.website || "",
        street: selectedUser.address?.street || "",
        city: selectedUser.address?.city || "",
        company: selectedUser.company?.name || "",
      })
    }
  }, [selectedUser, reset])

  const handleClose = () => {
    reset()
    setSelectedUser(null)
  }

  const onSubmit = (data: FormData) => {
  const formattedUser: Partial<User> = {
    ...(selectedUser || {}),
    ...data,
    address: {
      street: data.street || "",
      suite: "",
      city: data.city || "",
      zipcode: "",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: data.company || "",
      catchPhrase: "",
      bs: "",
    },
  }

  const mutation = selectedUser ? updateMutation : addMutation

  mutation.mutate(formattedUser as User, {
    onSuccess: () => {
      toast.success(
        selectedUser ? "User updated" : "User added successfully"
      )
      handleClose()
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 pr-1"
    >

      <div className="border rounded-xl p-4 space-y-4">

        <h2 className="text-sm font-semibold text-gray-700">
          User Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Name *" error={errors.name?.message}>
            <Input {...register("name")} />
          </FormField>

          <FormField label="Email *" error={errors.email?.message}>
            <Input {...register("email")} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Username *" error={errors.username?.message}>
            <Input {...register("username")} />
          </FormField>

          <FormField label="Phone">
            <Input {...register("phone")} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Website">
            <Input {...register("website")} />
          </FormField>

          <FormField label="Company">
            <Input {...register("company")} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Street">
            <Input {...register("street")} />
          </FormField>

          <FormField label="City">
            <Input {...register("city")} />
          </FormField>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">

        <Button
          type="button"
          variant="outline"
          className="cursor-pointer hover:bg-gray-200 transition"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={addMutation.isPending || updateMutation.isPending}
          className="bg-black text-white hover:bg-black/80 cursor-pointer transition"
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
  )
}