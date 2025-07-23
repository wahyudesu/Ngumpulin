"use client"

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/server/db/types";
import { GradeEditModal, FeedbackEditModal } from "@/app/(dashboard)/(sidebar)/assignment/[nameAssignment]/modals";
import { ScrollArea } from "@/components/ui/scroll-area"

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
  }, [documents, selectedDoc]);  const getStatusColor = (doc: Document) => {
    if (doc.grade) return "bg-green-100 text-green-800";
    if (doc.feedback) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (doc: Document) => {
    if (doc.grade) return "Dinilai";
    if (doc.feedback) return "Direview";
    return "Dikumpulkan";
  };

  // Function to format upload date with deadline status (similar to table-view)
  const formatUploadDate = (doc: Document) => {
    if (!doc.uploadedDate) return { date: "-", time: "", isOnTime: true };

    const date = new Date(doc.uploadedDate);
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hour}:${minutes}`;
    const formattedDate = date.toLocaleDateString("id-ID");    // Check if on time based on plagiarism (using same logic as table-view)
    const plagiarismArray = Array.isArray(doc.plagiarism) ? doc.plagiarism : [];
    const isOnTime = plagiarismArray.length === 0 || plagiarismArray.every((item: any) => item.similarity <= 70);

    return {
      date: formattedDate,
      time: formattedTime,
      isOnTime
    };
  };
  return (
    <div className="flex h-full">
      {/* Left Section - Document List (30%) */}
      <div className="w-[30%] border-r bg-muted/20">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-sm">{documents.length} Tugas Terkumpul</h2>
          </div>
        </div>

        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
          <div className="p-2 space-y-2">
            {documents.map((doc, index) => {
              const uploadInfo = formatUploadDate(doc);
              
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
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={uploadInfo.isOnTime ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {uploadInfo.time}
                              </Badge>
                              <span 
                                className={`text-xs ${uploadInfo.isOnTime ? 'text-green-800' : 'text-red-800'}`}
                              >
                                {uploadInfo.date}
                              </span>
                            </div>
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
          <>
            <div className="h-full bg-gray-50 flex flex-col">

              <div className="flex-1 relative">
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
                        {selectedDoc.nameStudent} - {formatUploadDate(selectedDoc).date}
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
