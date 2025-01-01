"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { classes } from "@/server/db/schema";

// Mengambil data dari tabel folders
export const getDataClass = async () => {
  const data = await db.select().from(classes);
  return data;
};

// Menambahkan folder baru
export const addClass = async (className: string, totalStudent: number) => {
  await db.insert(classes).values({
    className,
    totalStudent: totalStudent.toString(),
  });
};

// Menghapus folder
export const deleteFolderAssignment = async (id: number) => {
  await db.delete(classes).where(eq(classes.id, id));
  // revalidatePath("/");
};