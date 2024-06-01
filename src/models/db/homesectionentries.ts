import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type HomeSectionEntrySubtitle } from "../home";
import { homesections } from "./homesections";

export const homesectionentries = sqliteTable("homesectionentries", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  sectionId: integer("section_id")
    .references(() => homesections.id)
    .notNull(),
  title: text("title"),
  subtitles: blob("subtitles", { mode: "json" })
    .$type<HomeSectionEntrySubtitle[]>()
    .notNull(),
  text: text("text").notNull(),
  titleLink: text("title_link"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  lastModifiedAt: integer("last_modified_at", {
    mode: "timestamp",
  }).notNull(),
});
