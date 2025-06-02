"use server";

import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateDocumentGrade(documentId: string, grade: number) {
  try {
    // Validate input
    if (!documentId || typeof grade !== 'number' || grade < 0 || grade > 100) {
      return {
        success: false,
        error: "Data tidak valid. Nilai harus antara 0-100."
      };
    }

    // Update the grade in the database
    await db
      .update(documents)
      .set({ 
        grade: grade.toString() // Convert to string as schema uses numeric type
      })
      .where(eq(documents.id, documentId));

    // Revalidate the page to show updated data
    revalidatePath('/assignment');
    revalidatePath(`/assignment/[nameAssignment]`, 'page');

    return {
      success: true,
      message: "Nilai berhasil disimpan"
    };
  } catch (error) {
    console.error("Error updating grade:", error);
    return {
      success: false,
      error: "Gagal menyimpan nilai ke database"
    };
  }
}
