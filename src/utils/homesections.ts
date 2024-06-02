import { desc, eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { homesectionentries, homesections } from "../models/db";
import {
  mapRowToHomeSection,
  mapRowToHomeSectionEntry,
  type HomeSection,
  type HomeSectionEntryData,
  type HomeSectionRow,
} from "../models/home";

type NewHomeSectionEntryFormData = Omit<
  HomeSectionEntryData,
  "id" | "createdAt" | "lastModifiedAt"
>;

type NewHomeSectionFormData = Omit<
  HomeSection,
  "id" | "order" | "entries" | "createdAt" | "lastModifiedAt"
> & {
  entries: NewHomeSectionEntryFormData[];
};

export const createHomeSection = async (
  db: LibSQLDatabase,
  section: NewHomeSectionFormData,
): Promise<void> => {
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
        title: section.title,
        createdAt: new Date(),
        lastModifiedAt: new Date(),
      })
      .returning({ sectionId: homesections.id });

    const sectionId = homeSectionResult[0].sectionId;

    if (section.entries.length > 0) {
      await tx.insert(homesectionentries).values(
        section.entries.map((entry) => ({
          sectionId,
          title: !!entry.title ? entry.title : undefined,
          subtitles: entry.subtitles,
          titleLink: !!entry.titleLink ? entry.titleLink : undefined,
          text: entry.text,
          createdAt: new Date(),
          lastModifiedAt: new Date(),
        })),
      );
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
  const rows = (await db
    .select({
      sectionId: homesections.id,
      order: homesections.order,
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
    .orderBy(homesections.order)) as HomeSectionRow[];

  if (rows.length === 0) {
    return null;
  }

  const section = mapRowToHomeSection(rows[0]);

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
      order: homesections.order,
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

    if (n === 0 || sections[n - 1].order !== row.order) {
      sections.push(mapRowToHomeSection(row));
    } else {
      sections[n - 1].entries.push(mapRowToHomeSectionEntry(row));
    }
  });

  return sections;
};

type ModifyHomeSectionEntryFormData = Omit<
  HomeSectionEntryData,
  "createdAt" | "lastModifiedAt"
>;

type ModifyHomeSectionFormData = Omit<
  HomeSection,
  "id" | "entries" | "createdAt" | "lastModifiedAt"
> & {
  entries: ModifyHomeSectionEntryFormData[];
};

export const modifyHomeSection = async (
  db: LibSQLDatabase,
  sectionId: number,
  section: ModifyHomeSectionFormData,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx
      .update(homesections)
      .set({
        title: section.title,
        order: section.order,
        lastModifiedAt: new Date(),
      })
      .where(eq(homesections.id, sectionId));

    for (const entry of section.entries) {
      if (entry.id) {
        await tx
          .update(homesectionentries)
          .set({
            title: !!entry.title ? entry.title : undefined,
            subtitles: entry.subtitles,
            titleLink: !!entry.titleLink ? entry.titleLink : undefined,
            text: entry.text,
            lastModifiedAt: new Date(),
          })
          .where(eq(homesectionentries.id, entry.id));
      } else {
        await tx.insert(homesectionentries).values({
          sectionId,
          title: !!entry.title ? entry.title : undefined,
          subtitles: entry.subtitles,
          titleLink: !!entry.titleLink ? entry.titleLink : undefined,
          text: entry.text,
          createdAt: new Date(),
          lastModifiedAt: new Date(),
        });
      }
    }
  });
};
