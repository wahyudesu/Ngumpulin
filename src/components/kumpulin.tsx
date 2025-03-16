import { useState, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AssignmentUploadForm = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);
  const [emailStudent, setEmailStudent] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailStudent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (!emailStudent || !files || files.length === 0) {
      alert("Please fill in all fields and select at least one file.");
      return;
    }

    setStatusMessage("Fetching class from Supabase...");

    // Ambil className dari tabel folders berdasarkan nameAssignment
    const { data: folderData, error: folderError } = await supabase
      .from("folders")
      .select("className")
      .eq("nameAssignment", name)
      .limit(1)
      .single();
    
    console.log("Debug - folderData:", folderData); // Log hasil data

    if (folderError || !folderData) {
      setStatusMessage(`Error fetching folder data: ${folderError?.message || "No folder found"}`);
      return;
    }

    const { className } = folderData;

    setStatusMessage("Uploading files to Supabase Storage...");

    try {
      // Array untuk menyimpan data file yang akan dikirim ke Flask dan disimpan ke tabel documents
      const fileDataList: { uuid: string; nameFile: string; urlFile: string; class: string }[] = [];

      // Upload files ke Supabase Storage dan generate UUID
      for (const file of files) {
        const uuid = uuidv4();
        const filePath = `${className}/${uuid}_${file.name}`; // Gunakan className sebagai folder

        // Upload file ke Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("Kumpulin")
          .upload(filePath, file);

        if (uploadError) throw new Error(uploadError.message);

        // Ambil public URL dari file yang di-upload
        const { data: publicUrlData } = supabase.storage
          .from("Kumpulin")
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) throw new Error("Failed to get public URL");

        // Simpan data file ke array
        fileDataList.push({
          uuid,
          nameFile: file.name,
          urlFile: publicUrlData.publicUrl,
          class: className, // Sesuai dengan kolom 'class' di tabel documents
        });
      }

      setStatusMessage("Files uploaded to Supabase Storage successfully.");

      // Simpan data ke tabel documents di Supabase
      setStatusMessage("Saving file metadata to Supabase table...");
      const { error: insertError } = await supabase
        .from("documents")
        .insert(
          fileDataList.map((fileData) => ({
            uuid: fileData.uuid,
            nameFile: fileData.nameFile,
            urlFile: fileData.urlFile,
            class: fileData.class, // Kolom 'class' di tabel documents
            emailStudent,
            uploadedDate: new Date().toISOString(),
          }))
        );

      if (insertError) throw new Error(insertError.message);

      setStatusMessage("File metadata saved to Supabase successfully.");

      // Kirim data ke Flask API
      setStatusMessage("Sending file paths to Flask API...");
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: fileDataList[0].uuid,
          file_url: fileDataList[0].urlFile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send data to Flask API");
      }

      setStatusMessage("Upload Successful!");

    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Upload {name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="emailStudent" className="block">Masukkan email</label>
          <input
            type="text"
            id="emailStudent"
            value={emailStudent}
            onChange={handleNameChange}
            className="w-full border p-2 rounded"
            placeholder="Enter student's email"
          />
        </div>

        <div>
          <label htmlFor="file" className="block">Assignment Files</label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Upload Assignments
        </button>

        <div className="flex items-center justify-center">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm">{statusMessage}</Badge>
        </div>
      </form>
    </div>
  );
};

export default AssignmentUploadForm;