import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import type { User } from "../types";

// Reusable table components
const Th = ({ children, className = "", ...props }: any) => (
  <th className={`px-2 py-1 border ${className}`} {...props}>
    {children}
  </th>
);

const Td = ({ children, className = "", ...props }: any) => (
  <td className={`px-2 py-1 border break-words ${className}`} {...props}>
    {children}
  </td>
);

export default function Table() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching users!</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Table</h1>

      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="min-w-[900px] w-full table-fixed border border-gray-200 text-xs border-collapse">
          
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <Th rowSpan={2} className="w-10">ID</Th>
              <Th rowSpan={2} className="w-28">Name</Th>
              <Th rowSpan={2} className="w-24">Username</Th>
              <Th rowSpan={2} className="w-36">Email</Th>
              <Th rowSpan={2} className="w-28">Phone</Th>
              <Th rowSpan={2} className="w-28">Website</Th>

              <Th colSpan={6} className="text-center">Address</Th>
              <Th colSpan={3} className="text-center">Company</Th>
            </tr>

            <tr>
              <Th>Street</Th>
              <Th>Suite</Th>
              <Th>City</Th>
              <Th>Zip</Th>
              <Th>Lat</Th>
              <Th>Lng</Th>

              <Th>Name</Th>
              <Th>Phrase</Th>
              <Th>BS</Th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>

                <Td>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {user.website}
                  </a>
                </Td>

                {/* Address */}
                <Td>{user.address?.street || "-"}</Td>
                <Td>{user.address?.suite || "-"}</Td>
                <Td>{user.address?.city || "-"}</Td>
                <Td>{user.address?.zipcode || "-"}</Td>
                <Td>{user.address?.geo.lat || "-"}</Td>
                <Td>{user.address?.geo.lng || "-"}</Td>

                {/* Company */}
                <Td>{user.company?.name || "-"}</Td>
                <Td className="max-w-[120px]">{user.company?.catchPhrase || "-"}</Td>
                <Td>{user.company?.bs || "-"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
