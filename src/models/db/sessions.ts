import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  sessionId: text("sessionId").primaryKey(),
  expiry: integer("expiry", { mode: "timestamp" }).notNull(),
});
