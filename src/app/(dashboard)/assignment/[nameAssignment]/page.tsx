"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDataByName } from "@/actions/getassignment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Document } from "@/server/db/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table2, Grid3X3, Download, Link, ChevronDown, Check, SquareArrowOutUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

// Import 2 komponen modular
import { TableView } from "../../components/assignment/table-view";
import { GalleryView } from "../../components/assignment/gallery-view";

const AssignmentDetail = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);  const [documents, setDocuments] = useState<Document[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "gallery">("table");
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

  // Copy link function component
  function CopyLinkButton() {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
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
    );  }

  // Download assignment data functions
  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nama Mahasiswa,Tanggal Upload,Kalimat,Halaman,Nilai,Feedback\n"
      + documents.map(doc => 
          `${doc.nameStudent},${doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleDateString("id-ID") : "-"},${doc.sentences || 0},${doc.page || 0},${doc.grade || "-"},${doc.feedback || "-"}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${name}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    // Simple Excel format using CSV with different extension
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nama Mahasiswa,Tanggal Upload,Kalimat,Halaman,Nilai,Feedback\n"
      + documents.map(doc => 
          `${doc.nameStudent},${doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleDateString("id-ID") : "-"},${doc.sentences || 0},${doc.page || 0},${doc.grade || "-"},${doc.feedback || "-"}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${name}_data.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const jsonData = documents.map(doc => ({
      namaMahasiswa: doc.nameStudent,
      tanggalUpload: doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleDateString("id-ID") : null,
      kalimat: doc.sentences || 0,
      halaman: doc.page || 0,
      nilai: doc.grade || null,
      feedback: doc.feedback || null
    }));
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `${name}_data.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center gap-2 h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/assignment" className="text-base">Assignment</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base">{name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col gap-6 p-4 w-full mt-2 overflow-y-scroll">
        {/* Header dengan toggle view dan action buttons */}
        <section className="flex items-center justify-between">
          {/* Toggle buttons untuk view mode - di kiri */}
          <div className="flex bg-muted p-1 rounded-lg ">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="flex items-center gap-2"
            >
              <Table2 size={16} />
              Data
            </Button>
            <Button
              variant={viewMode === "gallery" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("gallery")}
              className="flex items-center gap-2"
            >
              <Grid3X3 size={16} />
              Koreksi
            </Button>
          </div>

          {/* Action buttons - di kanan */}
          <div className="flex gap-2">
            <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
              <CopyLinkButton />
              <NextLink href={`/${name}/submit`} target="_blank" rel="noopener noreferrer">
                <Button
                  className="rounded-none shadow-none last:rounded-e-lg focus-visible:z-10"
                  variant="outline"
                  size="default"
                  aria-label="Open link in new tab"
                >
                  <SquareArrowOutUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </NextLink>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download CSV
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={downloadCSV}>
                  Download CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadExcel}>
                  Download Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadJSON}>
                  Download JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>        </section>        <section className="flex-1">
          {viewMode === "table" ? (
            <TableView 
              documents={documents}
              updateGrade={updateGrade}
              updateFeedback={updateFeedback}
            />
          ) : (
            <div>
              {documents.length > 0 ? (
                <GalleryView 
                  documents={documents} 
                  updateGrade={updateGrade}
                  updateFeedback={updateFeedback}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Tidak ada dokumen ditemukan.
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AssignmentDetail;