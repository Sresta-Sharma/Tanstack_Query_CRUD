import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function TableSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">

          <Table className="min-w-[1100px] text-xs">

            {/* Header */}
            <TableHeader>
              <TableRow>
                {[...Array(10)].map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {[...Array(6)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {[...Array(10)].map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </div>
    </div>
  )
}