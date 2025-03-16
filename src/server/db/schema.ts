import { pgTable, serial, text, timestamp, numeric, boolean, jsonb, integer, uuid } from 'drizzle-orm/pg-core';
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
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table "documents"
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey(), //frontend
  NRP: text('NRP'), //backend
  nameStudent: text('nameStudent').notNull(), //backend
  documentName: text('documentName').notNull(), //frontend
  documentUrl: text('documentUrl').notNull(), //frontend
  folder: text('folder'), //frontend
  uploadedDate: timestamp('uploadedDate').defaultNow().notNull(), //frontend
  deadline: timestamp('deadline'), //frontend
  embedding: vector('embedding', { size: 1024 }), //backend - for AI use case
  plagiarism: jsonb('plagiarism'), //backend - plagiarism terhadap mahasiswa yang lain (2 teratas)
  email: text('email'), //frontend
  grade: numeric('grade'), //after frontend
  feedback: text('feedback'), //backend
  class: text('class'), //backend/fronted
  sentences: integer('sentences'), //backend
  page: integer('page'), //backend
  isiTugas: text('isiTugas') //backend
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
