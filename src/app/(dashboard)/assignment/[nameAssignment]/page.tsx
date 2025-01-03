"use client";

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
import { Trash, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Document } from "@/server/db/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// Enum untuk sort direction
enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

const AssignmentDetail = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string; // Casting sebagai string
  const name = decodeURIComponent(geturlname);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Document>("nameStudent");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  useEffect(() => {
    const fetchDocuments = async () => {
      if (name) {
        try {
          const fetchedDocuments = await getDataByName(name);
          setDocuments(fetchedDocuments as Document[]); // Pastikan tipe sesuai
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
        return sortDirection === SortDirection.ASC
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === SortDirection.ASC
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [filteredDocuments, sortColumn, sortDirection]);

  const handleSort = (column: keyof Document) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC
      );
    } else {
      setSortColumn(column);
      setSortDirection(SortDirection.ASC);
    }
  };

  const handleDelete = (id: number) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => doc.id !== id)
    );
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
      <div className="p-4 mx-auto mt-8 w-full max-w-6xl rounded">
        <h1 className="text-xl font-bold">Nama Tugas: {name}</h1>
        <div className="mt-4 flex gap-2 justify-between">
          <div className="flex gap-2">
            <Link href={`/${name}/submit`}>
              <Button className="text-white py-2 px-4 rounded">
                Form Upload
              </Button>
            </Link>
            <Button className="text-white py-2 px-4 rounded">
              Bagikan Link Share
            </Button>
          </div>
          {/* <DownloadFiles bucketName="Next Task" folderName={doc.folder} /> */}
        </div>
        <Input
          placeholder="Cari dokumen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 w-full"
        />
      </div>
      <div className="mx-auto w-full max-w-6xl rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("nameStudent")}
              >
                Nama Siswa{" "}
                {sortColumn === "nameStudent" &&
                  (sortDirection === SortDirection.ASC ? "\u2191" : "\u2193")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("documentName")}
              >
                Nama Dokumen{" "}
                {sortColumn === "documentName" &&
                  (sortDirection === SortDirection.ASC ? "\u2191" : "\u2193")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("uploadedDate")}
              >
                Tanggal Upload{" "}
                {sortColumn === "uploadedDate" &&
                  (sortDirection === SortDirection.ASC ? "\u2191" : "\u2193")}
              </TableHead>
              <TableHead>URL Dokumen</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDocuments.length > 0 ? (
              sortedDocuments.map((doc, index) => (
                <TableRow key={doc.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{doc.nameStudent}</TableCell>
                  <TableCell>{doc.documentName}</TableCell>
                  <TableCell>{doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleString(): "Tanggal tidak tersedia"}
                  </TableCell>
                  <TableCell>
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={16} /> Buka
                    </a>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Trash size={16} /> Hapus
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Tidak ada dokumen ditemukan untuk tugas ini.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssignmentDetail;
