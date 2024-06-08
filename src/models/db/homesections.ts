import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const homesections = sqliteTable("homesections", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  lastModifiedAt: integer("last_modified_at", {
    mode: "timestamp",
  }).notNull(),
});
