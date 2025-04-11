DROP TABLE "assignment" CASCADE;--> statement-breakpoint
DROP TABLE "classes" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "plagiarismThresholds" real[];