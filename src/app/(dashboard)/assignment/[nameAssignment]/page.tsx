"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDataByName } from "@/actions/getassignment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ExternalLink, Check, Copy, SquareArrowOutUpRight, ArrowUp, ArrowDown, ArrowUpDown, Edit, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Document } from "@/server/db/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Download_data from "./download-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { undefined } from "zod";
import { FeedbackEditModal, GradeEditModal } from "./modals";

function CopyLinkButton() {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      // await navigator.clipboard.writeText("string to copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="default"
            className={cn(
              "disabled:opacity-100 relative",
              "rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg"
            )}
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            disabled={copied}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all",
                copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            >
              <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            <div
              className={cn(
                "flex items-center justify-center transition-all",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
              )}
            >
              Link tugas
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


const AssignmentDetail = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      if (name) {
        try {
          const fetchedDocuments = await getDataByName(name);
          setDocuments(fetchedDocuments as unknown as Document[]);
          console.log(documents)
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }
    };

    fetchDocuments();
  }, [name]);

  // Update grade function
  const updateGrade = (id: String, newGrade: any) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, grade: newGrade } : doc
    ));
  };

  // Update feedback function
  const updateFeedback = (id: String, newFeedback: any) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, feedback: newFeedback } : doc
    ));
  };

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "index",
      header: "#",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: "nameStudent",
      header: "Nama Siswa",
      cell: ({ row }) => row.original.nameStudent,
    },
    {
      accessorKey: "uploadedDate",
      header: "Tanggal Mengumpulkan",
      cell: ({ row }) => {
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
      cell: ({ row }) => {
        const plagiarism = row.original.plagiarism || []; // Ensure it's always an array

        const isAllWithinThreshold = plagiarism.length === 0 ||
          plagiarism.every((item: any) => item.similarity <= 70);

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
      cell: ({ row }) => (
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
      cell: ({ row }) => {
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
      cell: ({ row }) => (
        <GradeEditModal
          document={row.original}
          onSave={updateGrade}
        />
      ),
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      cell: ({ row }) => (
        <FeedbackEditModal
          document={row.original}
          onSave={updateFeedback}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: documents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col">
      <header className="flex shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/assignment">Assignment</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4 mx-auto mt-8 w-full max-w-7xl rounded">
        <h1 className="text-xl font-bold">Nama Tugas: {name}</h1>
        <div className="mt-4 flex gap-2 justify-between">
          <div className="flex gap-2">
            <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
              <CopyLinkButton />
              <Link href={`/${name}/submit`} target="_blank" rel="noopener noreferrer">
                <Button
                  className="rounded-none shadow-none last:rounded-e-lg focus-visible:z-10"
                  variant="outline"
                  size="icon"
                  aria-label="Open link in new tab"
                >
                  <SquareArrowOutUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <Download_data />
          </div>
        </div>
        <Input
          placeholder="Cari Mahasiswa..."
          value={(table.getColumn("nameStudent")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nameStudent")?.setFilterValue(event.target.value)
          }
          className="mt-4 w-full"
        />

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
      </div>
    </div>
  );
};

export default AssignmentDetail;