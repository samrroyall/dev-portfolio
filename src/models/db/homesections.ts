import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const homesections = sqliteTable("homesections", {
  id: text("id").primaryKey(),
  order: integer("order"),
  title: text("title"),
});
