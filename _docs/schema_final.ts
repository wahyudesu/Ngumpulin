import {
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
  boolean,
  jsonb,
  vector,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

export const authUsers = pgTable('auth.users', {
  id: uuid().primaryKey().notNull(),
});

export const users = pgTable('users', {
  id: uuid().primaryKey().notNull().references(() => authUsers.id, { onDelete: 'cascade' }),
  firstName: text(),
  lastName: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  personalization: text().default(
    'Koreksi tugas ini dengan karakter dosen yang tegas namun adil, memberikan umpan balik secara objektif, langsung ke poin, dan tetap menghargai usaha mahasiswa.'
  ),
});

export const documents = pgTable('documents', {
  id: uuid().primaryKey(),
  NRP: text(),
  nameStudent: text().notNull(),
  documentName: text().notNull(),
  documentUrl: text().notNull(),
  folder_id: uuid().references(() => folders.id, { onDelete: 'cascade' }),
  class_id: uuid().references(() => classes.id, { onDelete: 'cascade' }),
  uploadedDate: timestamp().defaultNow().notNull(),
  deadline: timestamp(),
  embedding: vector('embedding', { dimensions: 1024 }),
  plagiarism: jsonb(),
  email: text(),
  grade: numeric(),
  feedback: text(),
  class: text(),
  sentences: integer(),
  page: integer(),
  isiTugas: text(),
  clustering: integer(),
});

export const classes = pgTable('classes', {
  id: serial().primaryKey(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  className: text(),
  totalStudent: numeric(),
  users_id: uuid().references(() => authUsers.id, { onDelete: 'cascade' }),
});

export const folders = pgTable('folders', {
  id: serial().primaryKey(),
  nameAssignment: text().notNull(),
  createdAt: timestamp({ precision: 3 }).defaultNow(),
  dueDate: timestamp({ precision: 3 }).notNull(),
  className: text(),
  description: text(),
  attachmentUrl: text(),
  plagiarismThresholds: numeric().array(),
  usePassword: boolean().default(true),
  password: text(),
  users_id: uuid().references(() => authUsers.id, { onDelete: 'cascade' }),
});