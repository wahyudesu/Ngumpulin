CREATE TABLE "classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"className" text NOT NULL,
	"totalStudent" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"NRP" text,
	"nameStudent" text NOT NULL,
	"documentName" text NOT NULL,
	"documentUrl" text NOT NULL,
	"folder" text,
	"uploadedDate" timestamp DEFAULT now() NOT NULL,
	"deadline" timestamp,
	"embedding" vector(1024),
	"plagiarism" jsonb,
	"email" text,
	"grade" numeric,
	"feedback" text,
	"class" text,
	"sentences" integer,
	"page" integer,
	"isiTugas" text
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"nameAssignment" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now(),
	"dueDate" timestamp (3) NOT NULL,
	"className" text,
	"description" text,
	"attachmentUrl" text,
	"usePassword" boolean DEFAULT true,
	"password" text
);
--> statement-breakpoint
CREATE TABLE "userss" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP SEQUENCE "public"."folders_id_seq";--> statement-breakpoint
DROP SEQUENCE "public"."class_id_seq";--> statement-breakpoint
DROP SEQUENCE "public"."document_id_seq";--> statement-breakpoint
DROP SEQUENCE "public"."userss_id_seq";