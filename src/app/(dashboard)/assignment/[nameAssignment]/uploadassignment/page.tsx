"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB.");
      return;
    }

    setFile(selectedFile);
    toast.success("File selected successfully.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("File uploaded successfully.");
      setFile(null); // Reset the form
    } catch (error) {
      toast.error("File upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">File Upload</CardTitle>
          <CardDescription>Upload a PDF file (Max: 5MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileUp className="h-8 w-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500 text-center">
                {file ? (
                  <span className="font-medium text-gray-900">{file.name}</span>
                ) : (
                  <span>Drag and drop or click to upload a PDF.</span>
                )}
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={!file}>
              Upload File
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
