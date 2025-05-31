"use client"

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Document } from "@/server/db/types";
import { GradeEditModal, FeedbackEditModal } from "@/app/(dashboard)/assignment/[nameAssignment]/modals";

interface TableViewProps {
  documents: Document[];
  updateGrade: (id: String, newGrade: any) => void;
  updateFeedback: (id: String, newFeedback: any) => void;
}

export function TableView({ documents, updateGrade, updateFeedback }: TableViewProps) {
  const columns = useMemo(() => [
    {
      accessorKey: "index",
      header: "#",
      cell: ({ row }: any) => row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: "nameStudent",
      header: "Nama Siswa",
      cell: ({ row }: any) => row.original.nameStudent,
    },
    {
      accessorKey: "uploadedDate",
      header: "Tanggal Mengumpulkan",
      cell: ({ row }: any) => {
        if (!row.original.uploadedDate) return "-";

        const date = new Date(row.original.uploadedDate);
        const hour = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hour}:${minutes}`;
        const formattedDate = date.toLocaleDateString("id-ID");

        const isOnTime = row.original.plagiarism?.every((item: any) => item.similarity <= 70) ?? true;

        if (isOnTime) {
          return (
            <div className="flex items-center gap-2">
              <Badge variant="success">{formattedTime}</Badge>
              <span className="text-green-800">{formattedDate}</span>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <Badge variant="destructive">{formattedTime}</Badge>
            <span className="text-red-800">{formattedDate}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "plagiarism",
      header: "Plagiarisme",
      cell: ({ row }: any) => {
        const plagiarism = row.original.plagiarism || [];
        const label = plagiarism.length === 0 ||
          plagiarism.every((item: any) => item.similarity < 70) ? "aman" : "terdeteksi";

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={label === "aman" ? "success2" : "destructive2"} className="w-4/5 justify-center">
                  {label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className={label === "aman" ? "bg-green-700" : "bg-destructive" + " text-white p-2 rounded"}>
                <div>
                  <p>Terdeteksi {plagiarism.length} sumber plagiarisme.</p>
                  <ul className="mt-2 list-disc pl-4">
                    {plagiarism.map((item: any, index: number) => (
                      <li key={index}>
                        <span className="font-bold">{item.name}</span> dengan similarity <span className="font-bold">{item.similarity}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "documentUrl",
      header: "URL Dokumen",
      enableSorting: false,
      cell: ({ row }: any) => (
        <div>
          <a
            href={row.original.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            <ExternalLink size={16} /> Buka
          </a>
        </div>
      ),
    },
    {
      accessorKey: "sentences",
      header: "Kalimat / Halaman",
      enableSorting: false,
      cell: ({ row }: any) => {
        return (
          <div>
            {row.original.sentences || 0} / {row.original.page || 0}
          </div>
        )
      }
    },
    {
      accessorKey: "grade",
      header: "Nilai",
      cell: ({ row }: any) => (
        <GradeEditModal
          document={row.original}
          onSave={updateGrade}
          onSendEmail={undefined}
        />
      ),
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      cell: ({ row }: any) => (
        <FeedbackEditModal
          document={row.original}
          onSave={updateFeedback}
          onSendEmail={undefined}
        />
      ),
    },
  ], [updateGrade, updateFeedback]);

  const table = useReactTable({
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="mx-auto mt-4 w-full max-w-7xl rounded border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={header.column.getCanSort() ? "cursor-pointer select-none " : ""}
                >
                  <div className="flex items-center gap-x-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {header.column.getCanSort() && (
                      (() => {
                        const sortIcon = {
                          asc: <ArrowUp size={15} />,
                          desc: <ArrowDown size={15} />,
                        }[header.column.getIsSorted() as string] ?? <ArrowUpDown size={15} />;

                        return sortIcon;
                      })()
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Tidak ada dokumen ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
