"use client"

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

  const getStatusColor = (doc: Document) => {
    const plagiarism = doc.plagiarism || [];
    const isOnTime = plagiarism.every((item: any) => item.similarity < 70);
    
    if (doc.grade) return "bg-green-100 text-green-800";
    if (doc.feedback) return "bg-yellow-100 text-yellow-800";
    return isOnTime ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800";
  };

  const getStatusText = (doc: Document) => {
    if (doc.grade) return "Dinilai";
    if (doc.feedback) return "Direview";
    return "Dikumpulkan";
  };

  return (
    <div className="flex h-[calc(100vh-16rem)]">
      {/* Left Section - Document List (30%) */}
      <div className="w-[30%] border-r bg-muted/20">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-sm">{documents.length} Tugas Terkumpul</h2>
            <p className="text-xs text-muted-foreground">
              {documents.filter(doc => {
                const plagiarism = doc.plagiarism || [];
                return plagiarism.every((item: any) => item.similarity < 70);
              }).length} mengumpulkan tepat waktu
            </p>
            <p className="text-xs text-muted-foreground">
              {documents.filter(doc => {
                const plagiarism = doc.plagiarism || [];
                return plagiarism.some((item: any) => item.similarity >= 70);
              }).length} terdeteksi plagiarisme
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh-20rem)] overflow-y-auto">
          <div className="p-2 space-y-2">
            {documents.map((doc, index) => {
              const uploadedDate = doc.uploadedDate ? new Date(doc.uploadedDate) : null;
              const formattedDate = uploadedDate ? uploadedDate.toLocaleDateString("id-ID") : "-";
              const plagiarism = doc.plagiarism || [];
              
              return (
                <Card
                  key={doc.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedDoc?.id === doc.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {doc.nameStudent?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'UN'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.nameStudent}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground">{formattedDate}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(doc)}`}>
                            {getStatusText(doc)}
                          </Badge>
                          {plagiarism.length > 0 && (
                            <Badge variant={plagiarism.some((item: any) => item.similarity >= 70) ? "destructive" : "success"} className="text-xs">
                              Plagiarisme
                            </Badge>
                          )}
                        </div>
                      </div>
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
            <div className="p-4 border-b">
              <h3 className="font-semibold">{selectedDoc.nameStudent}</h3>
              <p className="text-sm text-muted-foreground">
                Dikumpulkan: {selectedDoc.uploadedDate ? new Date(selectedDoc.uploadedDate).toLocaleDateString("id-ID") : "-"}
              </p>
              <div className="flex gap-2 mt-2">
                <GradeEditModal
                  document={selectedDoc}
                  onSave={updateGrade}
                  onSendEmail={undefined}
                />
                <FeedbackEditModal
                  document={selectedDoc}
                  onSave={updateFeedback}
                  onSendEmail={undefined}
                />
              </div>
            </div>

            {/* Document Preview Area */}
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
                
                {/* Plagiarism Info */}
                {selectedDoc.plagiarism && selectedDoc.plagiarism.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-medium text-yellow-800 mb-2">Deteksi Plagiarisme:</h4>
                    <ul className="space-y-1">
                      {selectedDoc.plagiarism.map((item: any, index: number) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{item.name}</span> - Similarity: 
                          <span className={`font-bold ml-1 ${item.similarity >= 70 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.similarity}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Dokumen Preview</p>
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
                    Buka Dokumen
                  </a>
                </div>
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
