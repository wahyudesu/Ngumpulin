"use server"

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import { documents, folders } from "@/server/db/schema"; // Import schema sesuai dengan struktur Drizzle

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const savefolders = async (formData: FormData) => {
//   const data = Object.fromEntries(formData.entries());
//   console.log(data);

//   try {
//     await db.insert(folders).values({
//         nameAssignment: data.name_assignment as string,
//         createdAt: new Date(data.created_at as string),
//         dueDate: new Date(data.due_date as string),
//         className: data.kelas as string,
//         description: data.description as string,
//     });
//   } catch (error) {
//     console.error("Error creating folder:", error);
//     throw new Error("Failed to create folder");
//   }

//   revalidatePath("/assignment");
//   // redirect("/assignment");
// };

export async function uploadassignment(formData: FormData): Promise<any> {
  try {
    // Mengambil file dan input
    const files = formData.getAll("file") as File[];
    const nameStudent = formData.get("nameStudent") as string;
    const email = formData.get("email") as string;
    const className = formData.get("class") as string;
    const folder = formData.get("folder") as string | null;

    if (!files.length || !nameStudent || !email || !className) {
      return {
        success: false,
        error: "Incomplete form data"
      };
    }

    const results = [];

    for (const file of files) {
      const uuid = crypto.randomUUID();
      
      try {
        // 1. Upload file ke Supabase Storage
        const filePath = `${folder}/${className}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('Kumpulin')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        // 2. Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('Kumpulin')
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) {
          throw new Error(`Failed to get public URL for ${file.name}`);
        }

        const publicUrl = publicUrlData.publicUrl;

        // 3. Simpan metadata ke database terlebih dahulu
        const insertedDocument = await db.insert(documents).values({
          id: uuid,
          nameStudent: email, // Temporary, akan diupdate oleh FastAPI
          documentName: file.name,
          documentUrl: publicUrl,
          class: className,
          email: email,
          folder: folder || null,
          uploadedDate: new Date(),
          embedding: null,
        });

        // 4. Kirim ke FastAPI untuk processing
        const fastApiFormData = new FormData();
        fastApiFormData.append("uuid", uuid);
        fastApiFormData.append("file_url", publicUrl);

        const fastApiResponse = await fetch("http://localhost:8000/upload", {

        // const fastApiResponse = await fetch("http://localhost:8000/assignment/upload?token=ngumpulin-fastapi", {
          method: "POST",
          body: fastApiFormData,
        });

        if (!fastApiResponse.ok) {
          const errorData = await fastApiResponse.json();
          console.error(`FastAPI processing failed for ${file.name}:`, errorData);
          // Continue with next file, don't fail the entire upload
        } else {
          const processingResult = await fastApiResponse.json();
          console.log(`FastAPI processing completed for ${file.name}:`, processingResult);
        }

        results.push({ 
          document: insertedDocument, 
          publicUrl,
          uuid,
          fileName: file.name
        });

      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        // Continue with other files
        results.push({
          document: null,
          publicUrl: null,
          uuid: null,
          fileName: file.name,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    // Check if any files were successfully processed
    const successfulUploads = results.filter(r => r.document !== null);
    
    if (successfulUploads.length === 0) {
      return {
        success: false,
        error: "No files were successfully uploaded"
      };
    }

    // Revalidate paths
    revalidatePath('/assignment');
    revalidatePath(`/assignment/[nameAssignment]`, 'page');

    return {
      success: true,
      results: results,
      message: `${successfulUploads.length}/${files.length} files uploaded successfully`
    };

  } catch (error) {
    console.error("Error in uploadassignment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}