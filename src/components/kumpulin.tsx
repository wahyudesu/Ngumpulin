import { useState, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const classes = ["Class A", "Class B", "Class C", "Class D"];

type FileData = {
  uuid: string;
  nameFile: string;
  urlFile: string;
  class: string;
};

const AssignmentUploadForm = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string;
  const name = decodeURIComponent(geturlname);
  const [emailStudent, setEmailStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailStudent(e.target.value);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (!emailStudent || !selectedClass || !files || files.length === 0) {
      alert("Please fill in all fields and select at least one file.");
      return;
    }

    setStatusMessage("Uploading files to Supabase Storage...");

    try {
      const fileDataList: FileData[] = [];

      for (const file of files) {
        const uuid = uuidv4();
        const filePath = `${selectedClass}/${uuid}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("Kumpulin")
          .upload(filePath, file);

        if (uploadError) throw new Error(uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from("Kumpulin")
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) throw new Error("Failed to get public URL");

        fileDataList.push({
          uuid,
          nameFile: file.name,
          urlFile: publicUrlData.publicUrl,
          class: selectedClass,
        });
      }

      if (fileDataList.length === 0) {
        throw new Error("No files were processed.");
      }

      setStatusMessage("Saving file metadata to Supabase table...");

      const { error: insertError } = await supabase
        .from("documents")
        .insert(
          fileDataList.map((fileData) => ({
            uuid: fileData.uuid,
            nameFile: fileData.nameFile,
            urlFile: fileData.urlFile,
            class: fileData.class,
            emailStudent,
            uploadedDate: new Date().toISOString(),
          }))
        );

      if (insertError) throw new Error(insertError.message);

      if (fileDataList[0]) {
        setStatusMessage("Sending file paths to Fastapi...");

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
          throw new Error(errorData.error || "Failed to send data to Fastapi");
        }
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
          <label htmlFor="classSelect" className="block">Pilih Kelas</label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih Kelas</option>
            {classes.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="file" className="block">Assignment Files</label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            className="w-full border p-2 rounded"
            multiple
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
