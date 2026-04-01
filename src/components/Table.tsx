import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import type { User } from "../types";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function UsersTable() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching users!
      </p>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          User Table
        </h1>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">

          <Table className="min-w-[1000px] text-xs">

            {/* HEADER */}
            <TableHeader className="bg-gray-100 text-gray-700 border-b sticky top-0 z-10">
              <TableRow>
                <TableHead className="font-semibold" rowSpan={2}>ID</TableHead>
                <TableHead className="font-semibold" rowSpan={2}>Name</TableHead>
                <TableHead className="font-semibold" rowSpan={2}>Username</TableHead>
                <TableHead className="font-semibold" rowSpan={2}>Email</TableHead>
                <TableHead className="font-semibold" rowSpan={2}>Phone</TableHead>
                <TableHead className="font-semibold" rowSpan={2}>Website</TableHead>

                <TableHead  className="font-semibold text-center" colSpan={6}>
                  Address
                </TableHead>
                <TableHead className="font-semibold text-center" colSpan={3}>
                  Company
                </TableHead>
              </TableRow>

              <TableRow>
                <TableHead className="font-semibold">Street</TableHead>
                <TableHead className="font-semibold">Suite</TableHead>
                <TableHead className="font-semibold">City</TableHead>
                <TableHead className="font-semibold">Zip</TableHead>
                <TableHead className="font-semibold">Lat</TableHead>
                <TableHead className="font-semibold">Lng</TableHead>

                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Phrase</TableHead>
                <TableHead className="font-semibold">BS</TableHead>
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {data?.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-100 transition"
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>
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
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </div>
    </div>
  );
}