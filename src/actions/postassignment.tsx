// "use server"

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import { documents, folders } from "@/server/db/schema"; // Import schema sesuai dengan struktur Drizzle

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const savefolders = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  try {
    await db.insert(folders).values({
        nameAssignment: data.name_assignment as string,
        createdAt: new Date(data.created_at as string),
        dueDate: new Date(data.due_date as string),
        className: data.kelas as string,
        description: data.description as string,
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder");
  }

  revalidatePath("/assignment");
  // redirect("/assignment");
};

export async function uploadassignment(formData: FormData): Promise<any> {
  // Mengambil file dan input
  const file = formData.get("file") as File | null;
  const nameStudent = formData.get("nameStudent") as string;
  const folder = formData.get("folder") as string | null;

  if (!file || !nameStudent) {
    throw new Error("Incomplete form data");
  }

  // Kirim file ke API
  try {
    const flaskResponse = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      throw new Error(errorData.error || "Failed to upload file to Flask API");
    }
    console.log(flaskResponse);

    // Mengambil Dokumen URL
    const { data } = await supabase.storage
      .from('Pdf document homework')
      .getPublicUrl(file.name, { download: true });

    const publicUrl: string = data?.publicUrl || '';
    console.log('Public URL:', publicUrl);

    // Simpan data ke database documents
    const insertedDocument = await db.insert(documents).values({
      nameStudent: nameStudent,
      documentName: file.name,
      documentUrl: publicUrl,
      folder: folder || null,
      uploadedDate: new Date(),
      embedding: null, // Jika belum ada embedding, bisa diisi null atau kosong
    });

    return { document: insertedDocument, publicUrl }; // Return document metadata dan URL
  } catch (error) {
    console.error("Error in uploadassignment:", error);
    throw error;
  }
}