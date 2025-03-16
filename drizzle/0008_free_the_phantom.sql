ALTER TABLE "documents" ALTER COLUMN "uploadedDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "dueDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "plagiarism" jsonb;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "status" text DEFAULT 'aman';