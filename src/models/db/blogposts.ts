import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogposts = sqliteTable(
  "blogposts",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    blurb: text("blurb").notNull(),
    text: text("text").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    lastModifiedAt: integer("last_modified_at", {
      mode: "timestamp",
    }).notNull(),
  },
  (table) => ({
    idx1: index("slug").on(table.slug),
  }),
);
