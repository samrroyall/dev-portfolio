import { desc } from "drizzle-orm";
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

const entryTitleRegex = /entryTitle-(?<entryId>.+)/g;
const entryTitleLinkRegex = /entryTitleLink-(?<entryId>.+)/g;
const entryTextRegex = /entryText-(?<entryId>.+)/g;
const entrySubtitleRegex = /entrySubtitle-(?<entryId>.+)-(?<subtitleId>.+)/g;
const entrySubtitleDetailRegex =
  /entrySubtitleDetail-(?<entryId>.+)-(?<subtitleId>.+)/g;

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
    if (key === "sectionTitle") {
      res.title = value;
    } else if (key.startsWith("entryTitle-")) {
      const groups = key.match(entryTitleRegex)?.groups;

      if (!!groups?.entryId) {
        entries[groups.entryId].title = value;
      }
    } else if (key.startsWith("entryTitleLink-")) {
      const groups = key.match(entryTitleLinkRegex)?.groups;

      if (!!groups?.entryId) {
        entries[groups.entryId].titleLink = value;
      }
    } else if (key.startsWith("entryText-")) {
      const groups = key.match(entryTextRegex)?.groups;

      if (!!groups?.entryId) {
        entries[groups.entryId].text = value;
      }
    } else if (key.startsWith("entrySubtitle-")) {
      const groups = key.match(entrySubtitleRegex)?.groups;

      if (!!groups?.entryId && !!groups?.subtitleId) {
        const entryId = groups.entryId;
        const subtitleId = groups.subtitleId;

        if (!!subtitles[entryId]) {
          subtitles[entryId] = {};
        }

        if (!!subtitles[entryId][subtitleId]) {
          subtitles[entryId][subtitleId] = {};
        }

        subtitles[entryId][subtitleId].title = value;
      }
    } else if (key.startsWith("entrySubtitleDetail-")) {
      const groups = key.match(entrySubtitleDetailRegex)?.groups;

      if (!!groups?.entryId && !!groups?.subtitleId) {
        const entryId = groups.entryId;
        const subtitleId = groups.subtitleId;

        if (!!subtitles[entryId]) {
          subtitles[entryId] = {};
        }

        if (!!subtitles[entryId][subtitleId]) {
          subtitles[entryId][subtitleId] = {};
        }

        subtitles[entryId][subtitleId].detail = value;
      }
    } else {
      console.log(
        `Unexpected key '${key}' passed as new home section form input.`,
      );
    }
  }

  for (const entryId in subtitles) {
    entries[entryId].subtitles = Object.values(
      subtitles[entryId],
    ) as HomeSectionEntrySubtitle[];
  }

  res.entries = Object.values(entries) as HomeSectionEntryFormData[];

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

  const homeSectionResult = await db
    .insert(homesections)
    .values({
      order: maxOrder + 1,
      title: formData.title,
      createdAt: Date.now(),
      lastModifiedAt: Date.now(),
    })
    .returning({ sectionId: homesections.id });

  const sectionId = homeSectionResult[0].sectionId;

  void db.insert(homesectionentries).values(
    formData.entries.map((entry) => ({
      sectionId,
      title: entry.title,
      subtitles: entry.subtitles,
      titleLink: entry.titleLink,
      text: entry.text,
      createdAt: Date.now(),
      lastModifiedAt: Date.now(),
    })),
  );
};
