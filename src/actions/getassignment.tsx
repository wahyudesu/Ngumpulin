"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { documents, folders } from "@/server/db/schema";

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
    dueDate: dueDate || null, // Jika dueDate tidak ada, set null
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

// Mengedit folder
export const editFolderAssignment = async (id: number, nameAssignment: string, className?: string, description?: string, dueDate?: Date) => {
  await db
    .update(folders)
    .set({
      nameAssignment: nameAssignment,
      className: className || null, // Jika className tidak ada, set null
      description: description || null, // Jika description tidak ada, set null
      dueDate: dueDate || null, // Jika dueDate tidak ada, set null
    })
    .where(eq(folders.id, id));

  // revalidatePath("/");
};

