CREATE TABLE "userss" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "embedding" SET DATA TYPE vector(1024);--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "attachmentUrl" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "usePassword" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "classId";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "folderId";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "assignmentType";