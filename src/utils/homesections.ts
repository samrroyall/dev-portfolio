import { desc, eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { homesectionentries, homesections } from "../models/db";
import {
  mapRowToHomeSection,
  mapRowToHomeSectionEntry,
  parseHomeSectionFormData,
  type HomeSection,
} from "../models/home";

export const createHomeSection = async (
  db: LibSQLDatabase,
  data: unknown,
): Promise<void> => {
  const formData = parseHomeSectionFormData(data);

  const maxOrderResult = await db
    .select({ order: homesections.order })
    .from(homesections)
    .orderBy(desc(homesections.order))
    .limit(1);

  const maxOrder = maxOrderResult.length > 0 ? maxOrderResult[0].order : 0;

  await db.transaction(async (tx) => {
    const homeSectionResult = await tx
      .insert(homesections)
      .values({
        order: maxOrder + 1,
        title: formData.title,
        createdAt: new Date(),
        lastModifiedAt: new Date(),
      })
      .returning({ sectionId: homesections.id });

    const sectionId = homeSectionResult[0].sectionId;

    const rows = formData.entries.map((entry) => ({
      sectionId,
      title: entry.title,
      subtitles: entry.subtitles ?? [],
      titleLink: entry.titleLink,
      text: entry.text,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    }));

    if (rows.length > 0) {
      await tx.insert(homesectionentries).values(rows);
    }
  });
};

export const deleteHomeSection = async (
  db: LibSQLDatabase,
  sectionId: number,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx
      .delete(homesectionentries)
      .where(eq(homesectionentries.sectionId, sectionId));

    await tx.delete(homesections).where(eq(homesections.id, sectionId));
  });
};

export const deleteHomeSectionEntry = async (
  db: LibSQLDatabase,
  entryId: number,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx
      .delete(homesectionentries)
      .where(eq(homesectionentries.id, entryId));
  });
};

export const getHomeSection = async (
  db: LibSQLDatabase,
  sectionId: number,
): Promise<HomeSection | null> => {
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
      createdAt: homesections.createdAt,
      lastModifiedAt: homesections.lastModifiedAt,
    })
    .from(homesections)
    .fullJoin(
      homesectionentries,
      eq(homesections.id, homesectionentries.sectionId),
    )
    .where(eq(homesections.id, sectionId))
    .orderBy(homesections.order);

  if (rows.length === 0) {
    return null;
  }

  const section: HomeSection = mapRowToHomeSection(rows[0]);

  for (let i = 1; i < rows.length; i++) {
    section.entries.push(mapRowToHomeSectionEntry(rows[i]));
  }

  return section;
};

export const getHomeSections = async (
  db: LibSQLDatabase,
): Promise<HomeSection[]> => {
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
      createdAt: homesections.createdAt,
      lastModifiedAt: homesections.lastModifiedAt,
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

export const modifyHomeSection = async (
  db: LibSQLDatabase,
  sectionId: number,
  data: unknown,
): Promise<void> => {
  const formData = parseHomeSectionFormData(data);

  await db.transaction(async (tx) => {
    await tx
      .update(homesections)
      .set({
        title: formData.title,
        order: formData.order,
        lastModifiedAt: new Date(),
      })
      .where(eq(homesections.id, sectionId));

    for (const entry of formData.entries) {
      await tx
        .insert(homesectionentries)
        .values({
          id: entry.id,
          sectionId,
          title: entry.title,
          subtitles: entry.subtitles ?? [],
          titleLink: entry.titleLink,
          text: entry.text,
          createdAt: new Date(),
          lastModifiedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: homesectionentries.id,
          set: {
            title: entry.title,
            subtitles: entry.subtitles ?? [],
            titleLink: entry.titleLink,
            text: entry.text,
            lastModifiedAt: new Date(),
          },
        });
    }
  });
};
