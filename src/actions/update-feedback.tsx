"use server";

import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
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

    // Prepare data for AI feedback generation
    const feedbackData = {
      title: document.documentName || "Tugas",
      description: document.isiTugas || "Konten tugas tidak tersedia",
      content: document.isiTugas || "Konten tugas tidak tersedia", 
      persona: "teacher" // Default persona as teacher
    };

    // Send request to AI feedback service
    const response = await fetch('http://localhost:8000/feedback/?token=ngumpulin-fastapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Extract combined_output from the response
    const generatedFeedback = result.combined_output || "Feedback tidak dapat dihasilkan";

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
      error: "Gagal menghasilkan feedback AI. Pastikan service AI berjalan di http://127.0.0.1:8000"
    };
  }
}
