"use server";

import { eq, and, lt } from "drizzle-orm";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { cosineSimilarity } from "@/lib/cosinesimilarity";

export const getPlagiarism = async (nameAssignment: string, id: number) => {
  try {
    // Ambil dokumen saat ini berdasarkan folder dan ID
    const currentDocuments = await db
      .select({ embedding: documents.embedding })
      .from(documents)
      .where(
        and(
          eq(documents.folder, nameAssignment), // Folder sesuai
          eq(documents.id, id) // ID dokumen sesuai
        )
      );

    if (currentDocuments.length === 0) {
      return { highestSimilarity: 0, id: null };
    }

    const currentEmbedding = currentDocuments[0]?.embedding;

    // Ambil dokumen sebelumnya berdasarkan folder dan ID lebih kecil
    const previousDocuments = await db
      .select({ id: documents.id, embedding: documents.embedding })
      .from(documents)
      .where(
        and(
          eq(documents.folder, nameAssignment), // Folder sesuai
          lt(documents.id, id) // ID dokumen lebih kecil
        )
      );

    if (previousDocuments.length === 0) {
      return { highestSimilarity: 0, id: null };
    }

    // Hitung cosine similarity untuk setiap dokumen sebelumnya
    let highestSimilarity = 0;
    let similarDocumentId: number | null = null;

    for (const doc of previousDocuments) {
      const previousEmbedding = doc.embedding;

      // Ensure embeddings are in the correct format
      if (!Array.isArray(currentEmbedding) || !Array.isArray(previousEmbedding)) {
        console.error("Embeddings are not in the correct format.");
        continue;
      }

      const similarity = cosineSimilarity(currentEmbedding, previousEmbedding); // Kalkulasi cosine similarity
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        similarDocumentId = doc.id;
      }
    }

    return { highestSimilarity, id: similarDocumentId }; // Kembalikan hasil
  } catch (error) {
    console.error("Error fetching documents or calculating similarity:", error);
    throw new Error("Gagal menghitung cosine similarity.");
  }
};