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
import { Table2, Grid3X3, Download, Link } from "lucide-react";

// Import 2 komponen modular
import { TableView } from "@/components/assignment/table-view";
import { GalleryView } from "@/components/assignment/gallery-view";

const AssignmentDetail = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter documents based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(doc => 
        doc.nameStudent?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  }, [documents, searchQuery]);
  
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

  // Copy link function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Download assignment data function
  const downloadAssignmentData = () => {
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
      
      <main className="flex flex-1 flex-col gap-6 p-4 w-full mt-8 overflow-y-scroll">
        {/* Header dengan toggle view dan action buttons */}
        <section className="flex items-center justify-between">
          {/* Toggle buttons untuk view mode - di kiri */}
          <div className="flex bg-muted p-1 rounded-lg">
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
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              <Link size={16} />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAssignmentData}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </section>

        <section>
          <Input
            placeholder="Cari Mahasiswa..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full"
          />
        </section>

        <section className="flex-1">
          {viewMode === "table" ? (
            <TableView 
              documents={filteredDocuments}
              updateGrade={updateGrade}
              updateFeedback={updateFeedback}
            />
          ) : (
            <div>
              {filteredDocuments.length > 0 ? (
                <GalleryView 
                  documents={filteredDocuments} 
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