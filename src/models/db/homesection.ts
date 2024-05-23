import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const homesections = sqliteTable(
  "homesections",
  {
    sessionId: text("sessionId").primaryKey(),
    expiry: integer("expiry", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    idx1: index("sessionId").on(table.sessionId),
  }),
);
