import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogposts = sqliteTable(
  "blogposts",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    blurb: text("blurb").notNull(),
    text: text("text").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
    lastModifiedAt: integer("last_modified_at", {
      mode: "timestamp",
    }),
  },
  (table) => ({
    idx1: index("slug").on(table.slug),
  }),
);
