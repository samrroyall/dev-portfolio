import { eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { homesectionentries, homesections } from "../../models/db";
import {
  mapRowToHomeSection,
  mapRowToHomeSectionEntry,
  type HomeData,
  type HomeSection,
} from "../../models/home";

export const getHomeData = async (db: LibSQLDatabase): HomeData => {
  const rows = await db
    .select({
      sectionId: homesections.id,
      sectionOrder: homesections.order,
      sectionTitle: homesections.title,
      entryId: homesectionentries.id,
      entryTitle: homesectionentries.title,
      subtitles: homesectionentries.subtitles,
      text: homesectionentries.text,
      titleLink: homesectionentries.titleLink,
    })
    .from(homesections)
    .fullJoin(
      homesectionentries,
      eq(homesections.id, homesectionentries.sectionId),
    )
    .orderBy(homesections.order);

  const sections: HomeSection[] = [];

  rows.forEach((row) => {
    const n = sections.length;

    if (n === 0 || sections[n - 1].order !== row.sectionOrder) {
      sections.push(mapRowToHomeSection(row));
    } else {
      sections[n - 1].entries.push(mapRowToHomeSectionEntry(row));
    }
  });

  return sections;
};
