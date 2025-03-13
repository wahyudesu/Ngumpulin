import { pgTable, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const foldersIdSeq = pgSequence("folders_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const classIdSeq = pgSequence("class_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const documentIdSeq = pgSequence("document_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const userssIdSeq = pgSequence("userss_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })


