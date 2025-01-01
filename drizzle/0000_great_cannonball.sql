CREATE TABLE "class" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"className" text NOT NULL,
	"totalStudent" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document" (
	"id" serial PRIMARY KEY NOT NULL,
	"nameStudent" text NOT NULL,
	"documentName" text NOT NULL,
	"documentUrl" text NOT NULL,
	"folder" text NOT NULL,
	"uploadedDate" timestamp with time zone DEFAULT now(),
	"embedding" vector(256)
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_assignment" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"due_date" timestamp (3),
	"class_type" text,
	"description" text,
	"assignment_type" text
);
