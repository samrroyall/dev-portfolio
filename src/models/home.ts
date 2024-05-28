export interface HomeSectionEntrySubtitle {
  title: string;
  detail?: string;
}

export interface HomeSectionEntryData {
  id: number;
  title: string;
  subtitles: HomeSectionEntrySubtitle[];
  text: string;
  createdAt: Date;
  lastModifiedAt: Date;
  titleLink?: string;
}

export const mapRowToHomeSectionEntry = (row: any): HomeSectionEntryData => ({
  id: row.entryId,
  title: row.entryTitle,
  subtitles: row.subtitles,
  text: row.text,
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
  titleLink: row.titleLink ?? undefined,
});

export interface HomeSection {
  id: number;
  order: number;
  title: string;
  entries: HomeSectionEntryData[];
  createdAt: Date;
  lastModifiedAt: Date;
}

export const mapRowToHomeSection = (row: any): HomeSection => ({
  id: row.sectionId,
  order: row.sectionOrder,
  title: row.sectionTitle,
  entries: [mapRowToHomeSectionEntry(row)],
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
});

type HomeSectionEntryFormData = Omit<
  HomeSectionEntryData,
  "id" | "createdAt" | "lastModifiedAt"
> & { id?: number };

interface HomeSectionFormData {
  title: string;
  order?: number;
  entries: HomeSectionEntryFormData[];
}

const entryIdRegex = /entryId-(?<entryId>.+)/;
const entryTitleRegex = /entryTitle-(?<entryId>.+)/;
const entryTitleLinkRegex = /entryTitleLink-(?<entryId>.+)/;
const entryTextRegex = /entryText-(?<entryId>.+)/;
const entrySubtitleRegex = /entrySubtitle-(?<entryId>.+)-(?<subtitleId>.+)/;
const entrySubtitleDetailRegex =
  /entrySubtitleDetail-(?<entryId>.+)-(?<subtitleId>.+)/;

export const parseHomeSectionFormData = (
  data: unknown,
): HomeSectionFormData => {
  const subtitles: Record<
    string,
    Record<string, Partial<HomeSectionEntrySubtitle>>
  > = {};
  const entries: Record<string, Partial<HomeSectionEntryFormData>> = {};
  const res: Partial<HomeSectionFormData> = {};

  for (const [key, value] of Object.entries(data)) {
    const cleanedValue = value === "" ? undefined : value;

    if (key === "sectionTitle") {
      res.title = cleanedValue;
    } else if (key === "sectionOrder") {
      res.order = parseInt(cleanedValue);
    } else if (key.startsWith("entryId-")) {
      const groups = key.match(entryIdRegex)?.groups;

      if (!!groups?.entryId) {
        if (!entries[groups.entryId]) {
          entries[groups.entryId] = {};
        }

        entries[groups.entryId].id = parseInt(cleanedValue);
      }
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
