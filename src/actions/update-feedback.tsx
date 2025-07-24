"use server";

import { db } from "@/server/db";
import { documents, folders } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateDocumentFeedback(documentId: string, feedback: string) {
  try {
    // Validate input
    if (!documentId || typeof feedback !== 'string') {
      return {
        success: false,
        error: "Data tidak valid."
      };
    }

    // Update the feedback in the database
    await db
      .update(documents)
      .set({ 
        feedback: feedback
      })
      .where(eq(documents.id, documentId));

    // Revalidate the page to show updated data
    revalidatePath('/assignment');
    revalidatePath(`/assignment/[nameAssignment]`, 'page');

    return {
      success: true,
      message: "Feedback berhasil disimpan"
    };
  } catch (error) {
    console.error("Error updating feedback:", error);
    return {
      success: false,
      error: "Gagal menyimpan feedback ke database"
    };
  }
}

export async function generateAIFeedback(document: any) {
  try {
    // Validate input
    if (!document) {
      return {
        success: false,
        error: "Data dokumen tidak valid."
      };
    }


    // Ambil folder yang sesuai dengan document.folder
    let folderData = { nameAssignment: "Tugas", description: "Konten tugas tidak tersedia" };
    try {
      const folderResult = await db.select().from(folders).where(eq(folders.nameAssignment, document.folder));
      if (folderResult && folderResult.length > 0 && folderResult[0]) {
        folderData = {
          nameAssignment: folderResult[0]?.nameAssignment || "Tugas",
          description: folderResult[0]?.description || "Konten tugas tidak tersedia"
        };
      }
    } catch (e) {
      // fallback ke default jika gagal
    }

    // Prepare data for AI feedback generation
    const feedbackData = {
      nameAssignment: folderData.nameAssignment,
      description: folderData.description,
      isiTugas: document.isiTugas || "Konten tugas tidak tersedia",
      personalization: "teacher" // Default personalization as teacher
    };

    console.log("Feedback data prepared for AI:", feedbackData);

    const response = await fetch(`https://ngumpulin-backend.bun-hono-backend.workers.dev/feedback`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Key": process.env.KEY || ""
        },
      body: JSON.stringify(feedbackData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("AI feedback response:", result);
    
    // Extract combined_output from the response
    const generatedFeedback = result.data.final_evaluation || "Feedback tidak dapat dihasilkan";

    // Update the feedback in the database
    const updateResult = await updateDocumentFeedback(document.id, generatedFeedback);
    
    if (updateResult.success) {
      return {
        success: true,
        feedback: generatedFeedback,
        message: "Feedback AI berhasil dibuat dan disimpan"
      };
    } else {
      return {
        success: false,
        error: updateResult.error
      };
    }

  } catch (error) {
    console.error("Error generating AI feedback:", error);
    return {
      success: false,
      error: "Gagal menghasilkan feedback AI. Pastikan service AI berjalan di http://localhost:8787"
    };
  }
}
