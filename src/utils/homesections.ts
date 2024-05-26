import { desc, eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { homesectionentries, homesections } from "../models/db";
import {
  HomeSectionEntrySubtitle,
  type HomeSectionEntryData,
} from "../models/home";

type HomeSectionEntryFormData = Omit<
  HomeSectionEntryData,
  "id" | "createdAt" | "lastModifiedAt"
>;

interface HomeSectionFormData {
  title: string;
  entries: HomeSectionEntryFormData[];
}

const entryTitleRegex = /entryTitle-(?<entryId>.+)/;
const entryTitleLinkRegex = /entryTitleLink-(?<entryId>.+)/;
const entryTextRegex = /entryText-(?<entryId>.+)/;
const entrySubtitleRegex = /entrySubtitle-(?<entryId>.+)-(?<subtitleId>.+)/;
const entrySubtitleDetailRegex =
  /entrySubtitleDetail-(?<entryId>.+)-(?<subtitleId>.+)/;

const parseHomeSectionFormData = (
  data: Record<string, string>,
): HomeSectionFormData => {
  const subtitles: Record<
    string,
    Record<string, Partial<HomeSectionEntrySubtitle>>
  > = {};
  const entries: Record<string, Partial<HomeSectionEntryFormData>> = {};
  const res: Partial<HomeSectionFormData> = {};

  for (const [key, value] of Object.entries(data)) {
    const cleanedValue = value.length === 0 ? undefined : value;

    if (key === "sectionTitle") {
      res.title = cleanedValue;
    } else if (key.startsWith("entryTitle-")) {
      const groups = key.match(entryTitleRegex)?.groups;

      if (!!groups?.entryId) {
        if (!entries[groups.entryId]) {
          entries[groups.entryId] = {};
        }

        entries[groups.entryId].title = cleanedValue;
      }
    } else if (key.startsWith("entryTitleLink-")) {
      const groups = key.match(entryTitleLinkRegex)?.groups;

      if (!!groups?.entryId) {
        if (!entries[groups.entryId]) {
          entries[groups.entryId] = {};
        }

        entries[groups.entryId].titleLink = cleanedValue;
      }
    } else if (key.startsWith("entryText-")) {
      const groups = key.match(entryTextRegex)?.groups;

      if (!!groups?.entryId) {
        if (!entries[groups.entryId]) {
          entries[groups.entryId] = {};
        }

        entries[groups.entryId].text = cleanedValue;
      }
    } else if (key.startsWith("entrySubtitle-")) {
      const groups = key.match(entrySubtitleRegex)?.groups;

      if (!!groups?.entryId && !!groups?.subtitleId) {
        const entryId = groups.entryId;
        const subtitleId = groups.subtitleId;

        if (!subtitles[entryId]) {
          subtitles[entryId] = {};
        }

        if (!subtitles[entryId][subtitleId]) {
          subtitles[entryId][subtitleId] = {};
        }

        subtitles[entryId][subtitleId].title = cleanedValue;
      }
    } else if (key.startsWith("entrySubtitleDetail-")) {
      const groups = key.match(entrySubtitleDetailRegex)?.groups;

      if (!!groups?.entryId && !!groups?.subtitleId) {
        const entryId = groups.entryId;
        const subtitleId = groups.subtitleId;

        if (!subtitles[entryId]) {
          subtitles[entryId] = {};
        }

        if (!subtitles[entryId][subtitleId]) {
          subtitles[entryId][subtitleId] = {};
        }

        subtitles[entryId][subtitleId].detail = cleanedValue;
      }
    }
  }

  for (const entryId in subtitles) {
    if (Object.keys(subtitles[entryId]).length > 0) {
      entries[entryId].subtitles = Object.values(
        subtitles[entryId],
      ) as HomeSectionEntrySubtitle[];
    } else {
      entries[entryId].subtitles = [];
    }
  }

  if (Object.keys(entries).length > 0) {
    res.entries = Object.values(entries) as HomeSectionEntryFormData[];
  } else {
    res.entries = [];
  }

  return res as HomeSectionFormData;
};

export const createNewHomeSection = async (
  db: LibSQLDatabase,
  data: Record<string, string>,
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
