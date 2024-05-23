import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type HomeSectionEntrySubtitle } from "../home";
import { homesections } from "./homesections";

export const homesectionentries = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sectionId: text("section_id")
    .references(() => homesections.id)
    .notNull(),
  title: text("title").notNull(),
  subtitles: blob("subtitles", { mode: "json" })
    .$type<HomeSectionEntrySubtitle[]>()
    .default([]),
  text: text("text").notNull(),
  titleLink: text("title_link"),
});
