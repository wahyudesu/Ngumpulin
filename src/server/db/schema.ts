import { pgTable, serial, text, timestamp, numeric, boolean, jsonb } from 'drizzle-orm/pg-core';
import { customType } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const vector = customType<{
	data: number[];
	driverData: string;
	config: { size: number };
}>({
	dataType(config) {
		const dt =
			!!config && typeof config.size === "number"
				? `vector(${config.size})`
				: "vector";
		return dt;
	},
	fromDriver(value) {
		return JSON.parse(value);
	},
	toDriver(value) {
		return JSON.stringify(value);
	},
});

// Table "users"
export const users = pgTable('userss', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table "documents"
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  nameStudent: text('nameStudent').notNull(),
  documentName: text('documentName').notNull(),
  documentUrl: text('documentUrl').notNull(),
  folder: text('folder'),
  uploadedDate: timestamp('uploadedDate', { withTimezone: true }).defaultNow().notNull(),
  embedding: vector('embedding', { size: 1024 }),
  plagiarism: jsonb('plagiarism'),
  label: text('status').default('aman'),
  grade: numeric('grade'),
  feedback: text('feedback'),
  sentences: numeric('sentences'),
  page: numeric('page')
});

// Table "classes"
export const classes = pgTable('classes', {
  id: serial('id').primaryKey(), 
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  className: text('className').notNull(),
  totalStudent: numeric('totalStudent').notNull(),
});

// Table "folders"
export const folders = pgTable('folders', {
  id: serial('id').primaryKey(),
  nameAssignment: text('nameAssignment').notNull(),
  createdAt: timestamp('createdAt', { precision: 3 }).defaultNow(),
  dueDate: timestamp('dueDate', { precision: 3 }).notNull(),
  className: text('className'),
  description: text('description'),
  attachmentUrl: text('attachmentUrl'),
  usePassword: boolean('usePassword').default(true),
  password: text('password')
});

// Relations for documents
export const documentsRelations = relations(documents, ({ one }) => ({
  folder: one(folders, {
    fields: [documents.folder],
    references: [folders.nameAssignment]
  })
}));
