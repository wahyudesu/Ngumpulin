"use client"

import { useState, useEffect } from "react";
import { ExternalLink, FileText, Loader2, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Document } from "@/server/db/types";
import { GradeEditModal, FeedbackEditModal } from "@/app/(dashboard)/assignment/[nameAssignment]/modals";

interface GalleryViewProps {
  documents: Document[];
  updateGrade: (id: String, newGrade: any) => void;
  updateFeedback: (id: String, newFeedback: any) => void;
}

export function GalleryView({ documents, updateGrade, updateFeedback }: GalleryViewProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  
  useEffect(() => {
    if (documents.length > 0 && !selectedDoc) {
      setSelectedDoc(documents[0] || null);
    }
  }, [documents, selectedDoc]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF loading error:', error);
    setPdfLoading(false);
    setPdfError(true);
  };  const handlePdfLoad = () => {
    setPdfLoading(false);
    setPdfError(false);
  };

  const handlePdfError = () => {
    setPdfLoading(false);
    setPdfError(true);
  };

  // Zoom functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 300)); // Max zoom 300%
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50)); // Min zoom 50%
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  // Page navigation functions
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, numPages || 1));
  };
  const getStatusColor = (doc: Document) => {
    if (doc.grade) return "bg-green-100 text-green-800";
    if (doc.feedback) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (doc: Document) => {
    if (doc.grade) return "Dinilai";
    if (doc.feedback) return "Direview";
    return "Dikumpulkan";
  };

  return (
    <div className="flex">
      {/* Left Section - Document List (30%) */}
      <div className="w-[30%] border-r bg-muted/20">        <div className="p-4 border-b flex items-center  justify-between">
          <div>
            <h2 className="font-semibold text-sm">{documents.length} Tugas Terkumpul</h2>
          </div>
        </div>

        <div className="h-[calc(100vh-20rem)] overflow-y-auto">
          <div className="p-2 space-y-2">            {documents.map((doc, index) => {
              const uploadedDate = doc.uploadedDate ? new Date(doc.uploadedDate) : null;
              const formattedDate = uploadedDate ? uploadedDate.toLocaleDateString("id-ID") : "-";
              
              return (
                <Card
                  key={doc.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedDoc?.id === doc.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.nameStudent}</p>
                          <div className="flex flex-col items-start gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{formattedDate}</span>
                            <Badge variant="secondary" className={`text-xs ${getStatusColor(doc)}`}>
                              {getStatusText(doc)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons - Only show for selected document */}
                      {selectedDoc?.id === doc.id && (
                        <div className="flex flex-col gap-1 ml-2">
                          <GradeEditModal
                            document={doc}
                            onSave={updateGrade}
                            onSendEmail={undefined}
                          />
                          <FeedbackEditModal
                            document={doc}
                            onSave={updateFeedback}
                            onSendEmail={undefined}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Section - Document Preview (70%) */}
      <div className="flex-1 relative">
        {selectedDoc ? (
          <>            <div className="p-4 border-b">
              <h3 className="font-semibold">{selectedDoc.nameStudent}</h3>
              <p className="text-sm text-muted-foreground">
                Dikumpulkan: {selectedDoc.uploadedDate ? new Date(selectedDoc.uploadedDate).toLocaleDateString("id-ID") : "-"}
              </p>
            </div>            {/* Document Preview Area */}
            <div className="h-[calc(100vh-24rem)] bg-gray-50 flex flex-col">
              <div className="p-4 border-b bg-white">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Kalimat:</span> {selectedDoc.sentences || 0}
                  </div>
                  <div>
                    <span className="font-medium">Halaman:</span> {selectedDoc.page || 0}
                  </div>
                </div>
              </div>              <div className="flex-1 relative">
                {/* Check if file is PDF */}
                {selectedDoc.documentUrl?.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={selectedDoc.documentUrl}
                    className="w-full h-full border-0"
                    title={`PDF - ${selectedDoc.nameStudent}`}
                  />
                ) : (
                  // Fallback for non-PDF files
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">Document Preview</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedDoc.nameStudent} - {selectedDoc.uploadedDate ? new Date(selectedDoc.uploadedDate).toLocaleDateString("id-ID") : "-"}
                      </p>
                      <a
                        href={selectedDoc.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        <ExternalLink size={16} />
                        Open Document
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Pilih dokumen untuk melihat detail</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
