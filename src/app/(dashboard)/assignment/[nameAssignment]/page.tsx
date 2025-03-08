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
import { SquareArrowOutUpRight } from "lucide-react";
import Download_data from "./download-data";

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
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      if (name) {
        try {
          const fetchedDocuments = await getDataByName(name);
          setDocuments(fetchedDocuments as Document[]);
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
          <Download_data />
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
                <TableHead>Plagiarism</TableHead>
                <TableHead>URL Dokumen</TableHead>
                <TableHead>Input Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDocuments.length > 0 ? (
                sortedDocuments.map((doc, index) => {
                  const highestPlagiarism = doc.plagiarism?.length ? doc.plagiarism.reduce((max, p) => (p.similarity > max.similarity ? p : max), doc.plagiarism[0]) : null;
                  return (
                    <TableRow key={String(doc.id)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.nameStudent}</TableCell>
                      <TableCell>{doc.uploadedDate ? `${new Date(doc.uploadedDate).getHours() + 24}:${new Date(doc.uploadedDate).getMinutes()}` : "-"}</TableCell>
                      <TableCell>{doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleDateString("id-ID") : "-"}</TableCell>
                      <TableCell title={highestPlagiarism ? `${highestPlagiarism.similarity}% - ${highestPlagiarism.name}` : "Aman"}>{highestPlagiarism && highestPlagiarism.similarity > 70 ? "Plagiarism" : "Aman"}</TableCell>
                      <TableCell>
                        <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                          <ExternalLink size={16} /> Buka
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">Tidak ada dokumen ditemukan.</TableCell>
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
