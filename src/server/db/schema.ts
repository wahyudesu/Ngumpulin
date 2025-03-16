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
  id: uuid('id').primaryKey(),
  NRP: text('NRP'),
  nameStudent: text('nameStudent').notNull(), //nama mahasiswa
  documentName: text('documentName').notNull(), //nama file document mahasiswa
  documentUrl: text('documentUrl').notNull(), //file url document mahasiswa
  folder: text('folder'), //folder tugas
  uploadedDate: timestamp('uploadedDate').defaultNow().notNull(), //waktu tugas tersubmit
  deadline: timestamp('deadline'), //batas waktu pengumpulan
  embedding: vector('embedding', { size: 1024 }), //for AI use case
  plagiarism: jsonb('plagiarism'), //plagiarism terhadap mahasiswa yang lain (2 teratas)
  email: text('email'), //email mahasiswa
  grade: numeric('grade'), //nilai tugas
  feedback: text('feedback'), //koreksi dan feedback
  class: text('class'), //kelas mahasiswa
  sentences: integer('sentences'), //jumlah kalimat pada tugas
  page: integer('page'), //jumlah halaman pada tugas
  isiTugas: text('isiTugas')
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
