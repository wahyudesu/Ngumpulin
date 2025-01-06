"use server";
import { eq, and, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { documents, folders } from "@/server/db/schema";
import { cosineSimilarity } from "@/lib/cosinesimilarity";

// Mengambil data dari tabel folders
export const getDataAssignment = async () => {
  const data = await db.select().from(folders);
  return data;
};

// Menambahkan folder baru
export const addFolderAssignment = async (nameAssignment: string, className?: string, description?: string, dueDate?: Date) => {
  await db.insert(folders).values({
    nameAssignment: nameAssignment,
    className: className || null, // Jika className tidak ada, set null
    description: description || null, // Jika description tidak ada, set null
    dueDate: dueDate, // Jika dueDate tidak ada, set null
  });
  revalidatePath("/assignment");
};

// Menghapus folder
export const deleteFolderAssignment = async (id: number) => {
  await db.delete(folders).where(eq(folders.id, id));
  revalidatePath("/assignment");
};

export const getDataById = async (id: number) => {
  const data = await db
    .select()
    .from(folders)
    .where(eq(folders.id, id));
  return data;
};

export const getDataByName = async (nameAssignment: string) => {
  const data = await db
    .select()
    .from(documents)
    .where(eq(documents.folder, nameAssignment));
  return data;
};

export const getDataByNameLabel = async (nameAssignment: string, documentId: number) => {
  // Ambil uploadedDate dari tabel documents
  const data = await db
    .select({ uploadedDate: documents.uploadedDate })
    .from(documents)
    .where(
      and(
        eq(documents.folder, nameAssignment), // Kondisi 1: folder sesuai dengan nameAssignment
        eq(documents.id, documentId) // Kondisi 2: id sesuai dengan documentId
      )
    );

  // Ambil dueDate dari tabel folders
  const folder = await db
    .select({ dueDate: folders.dueDate })
    .from(folders)
    .where(eq(folders.nameAssignment, nameAssignment))
    .limit(1);

  // Pengecekan eksplisit untuk memastikan data[0] dan folder[0] ada
  const firstData = data[0];
  const firstFolder = folder[0];

  if (!firstData || !firstFolder) {
    throw new Error('Data tanggal tidak valid');
  }

  // Pengecekan eksplisit untuk memastikan uploadedDate dan dueDate ada
  const uploadedDate = firstData.uploadedDate;
  const dueDate = firstFolder.dueDate;

  if (!uploadedDate || !dueDate) {
    throw new Error('Tanggal tidak valid');
  }

  // Bandingkan uploadedDate dengan dueDate
  if (uploadedDate > dueDate) {
    return 'Terlambat';
  } else {
    return 'Tepat waktu';
  }
};

// Mengedit folder
export const editFolderAssignment = async (id: number, nameAssignment: string, className?: string, description?: string, dueDate?: Date) => {
  await db
    .update(folders)
    .set({
      nameAssignment: nameAssignment,
      className: className || null, // Jika className tidak ada, set null
      description: description || null, // Jika description tidak ada, set null
      dueDate: dueDate, // Jika dueDate tidak ada, set null
    })
    .where(eq(folders.id, id));

  // revalidatePath("/");
};

export const getplagiarism = async (nameAssignment: string, documentId: number) => {
  try {
    // Ambil uploadedDate dari dokumen saat ini
    const currentDocument = await db
      .select({ embedding: documents.embedding })
      .from(documents)
      .where(
        and(
          eq(documents.folder, nameAssignment), // Kondisi 1: folder sesuai dengan nameAssignment
          eq(documents.id, documentId) // Kondisi 2: id sesuai dengan documentId
        )
      )
      .limit(1);

    // Ambil dokumen-dokumen sebelumnya (id < documentId)
    const previousDocuments = await db
      .select({ id: documents.id, embedding: documents.embedding })
      .from(documents)
      .where(
        and(
          eq(documents.folder, nameAssignment), // Kondisi 1: folder sesuai dengan nameAssignment
          lt(documents.id, documentId) // Kondisi 2: id lebih kecil dari documentId
        )
      )

    return {
      currentDocument: currentDocument[0], // Dokumen saat ini
      previousDocuments, // Dokumen-dokumen sebelumnya
    };
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Gagal mengambil data dokumen");
  }
};

