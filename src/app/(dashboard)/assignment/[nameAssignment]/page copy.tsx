"use client"

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Document } from "@/server/db/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Download_data from "./download-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy, SquareArrowOutUpRight } from "lucide-react";

function ButtonDemo() {
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
            size="default" // Ubah dari `size="icon"` ke `size="default"` agar tombol menyesuaikan panjang teks
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

enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

const AssignmentDetail = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Document>("nameStudent");
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (name) {
        try {
          const fetchedDocuments = await getDataByName(name);
        
          setDocuments(fetchedDocuments as unknown as Document[]);
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }
    };

    fetchDocuments();
  }, [name]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      [doc.nameStudent, doc.documentName, doc.folder]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm]);

  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === SortDirection.ASC ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === SortDirection.ASC ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredDocuments, sortColumn, sortDirection]);

  const handleSort = (column: keyof Document) => {
    console.log("Documents", documents)
    if (sortColumn === column) {
      setSortDirection(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      setSortColumn(column);
      setSortDirection(SortDirection.ASC);
    }
  };

  return (
    <div className="flex h-screen flex-col">
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
              <ButtonDemo /> {/* Panggil ButtonDemo di sini */}
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
            <Download_data/>
          </div>
        </div>
        <Input placeholder="Cari dokumen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mt-4 w-full" />
      </div>
      <div className="px-10">
        <div className="mx-auto w-full max-w-7xl rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead onClick={() => handleSort("nameStudent")}>Nama Siswa</TableHead>
                <TableHead onClick={() => handleSort("uploadedDate")}>Waktu Mengumpulkan</TableHead>
                <TableHead onClick={() => handleSort("uploadedDate")}>Tanggal Mengumpulkan</TableHead>
                <TableHead>URL Dokumen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDocuments.length > 0 ? (
                sortedDocuments.map((doc, index) => (
                  <TableRow key={String(doc.id)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{doc.nameStudent}</TableCell>
                    <TableCell>{doc.uploadedDate ? `${new Date(doc.uploadedDate).getHours() + 24}:${new Date(doc.uploadedDate).getMinutes()}` : "-"}</TableCell>
                    <TableCell>{doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleDateString("id-ID") : "-"}</TableCell>
                    <TableCell>
                      <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                        <ExternalLink size={16} /> Buka
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Tidak ada dokumen ditemukan.</TableCell>
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
