ALTER TABLE "folders" RENAME COLUMN "classType" TO "className";--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "embedding" SET DATA TYPE vector(384);