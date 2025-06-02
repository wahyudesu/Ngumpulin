"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/server/db"
import { classes } from "@/server/db/schema"
import { z } from "zod"

// Schema for validation
const classSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  totalStudent: z.coerce.number().min(0, "Total students must be a positive number"),
})

// Get all classes
export const getDataClass = async () => {
  try {
    const data = await db.select().from(classes)
    return data
  } catch (error) {
    console.error("Failed to fetch classes:", error)
    throw new Error("Failed to fetch classes")
  }
}

// Get a single class by ID
export const getClassById = async (id: number) => {
  try {
    const data = await db.select().from(classes).where(eq(classes.id, id))
    return data[0]
  } catch (error) {
    console.error(`Failed to fetch class with ID ${id}:`, error)
    throw new Error("Failed to fetch class")
  }
}

// Add a new class
export const addClass = async (className: string, totalStudent: number) => {
  try {
    console.log("Adding class:", { className, totalStudent });
    
    // Validasi input
    const validation = classSchema.safeParse({ className, totalStudent });
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0]?.message || "Validation failed"
      };
    }

    // Generate random ID
    const randomId = Math.floor(Math.random() * 1000000);

    // Insert dengan id random
    const result = await db.insert(classes).values({
      id: randomId,
      className: className.trim(),
      totalStudent: totalStudent.toString(),
    }).returning();

    console.log("Insert result:", result);

    return {
      success: true,
      data: result[0]
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add class"
    };
  }
}

// Update an existing class
export const updateClass = async (id: number, className: string, totalStudent: number) => {
  try {
    // Validate input
    const validatedData = classSchema.parse({ className, totalStudent })

    await db
      .update(classes)
      .set({
        className: validatedData.className,
        totalStudent: validatedData.totalStudent.toString(),
      })
      .where(eq(classes.id, id))

    revalidatePath("/classes")
    return { success: true }
  } catch (error) {
    console.error(`Failed to update class with ID ${id}:`, error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update class" }
  }
}

// Delete a class
export const deleteClass = async (id: number) => {
  try {
    await db.delete(classes).where(eq(classes.id, id))
    revalidatePath("/classes")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete class with ID ${id}:`, error)
    return { success: false, error: "Failed to delete class" }
  }
}
