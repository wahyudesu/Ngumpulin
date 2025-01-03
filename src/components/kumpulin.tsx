import { useState, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AssignmentUploadForm = () => {
  const params = useParams();
  const geturlname = params?.nameAssignment as string; // Casting sebagai string
  const name = decodeURIComponent(geturlname);
  const [nameStudent, setNameStudent] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameStudent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const files = fileInputRef.current?.files;
    if (!nameStudent || !files || files.length === 0) {
      alert("Please fill in all fields and select at least one file.");
      return;
    }
  
    setStatusMessage("Uploading files to Supabase...");
    try {
      // Array untuk menyimpan public URL dari file yang di-upload
      const filePaths: string[] = [];
  
      // Upload files ke Supabase
      for (const file of files) {
        const { data, error } = await supabase.storage
          .from('Kumpulin')
          .upload(`${name}/${file.name}`, file);
  
        if (error) throw new Error(error.message);
  
        // Ambil public URL dari file yang di-upload
        const { data: publicUrlData } = supabase.storage
          .from('Kumpulin')
          .getPublicUrl(`${name}/${file.name}`);
  
        if (publicUrlData?.publicUrl) {
          filePaths.push(publicUrlData.publicUrl); // Tambahkan URL ke array
        }
      }
  
      setStatusMessage("Files uploaded to Supabase successfully.");
  
      // Kirim data ke Flask API
      setStatusMessage("Sending file paths to Flask API...");
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameStudent, // Nama siswa
          filePaths,   // URL file
          name,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send data to Flask API");
      }
  
      // Hanya menampilkan pesan sukses tanpa menerima output
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
          <label htmlFor="nameStudent" className="block">Student Name</label>
          <input
            type="text"
            id="nameStudent"
            value={nameStudent}
            onChange={handleNameChange}
            className="w-full border p-2 rounded"
            placeholder="Enter student's name"
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
