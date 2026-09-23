export interface HomeSectionEntrySubtitle {
  title: string;
  detail?: string;
}

export interface HomeSectionEntryData {
  id: number;
  title: string;
  titleLink?: string;
  subtitles: HomeSectionEntrySubtitle[];
  text: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface HomeSection {
  id: number;
  order: number;
  title: string;
  entries: HomeSectionEntryData[];
  createdAt: Date;
  lastModifiedAt: Date;
}

// One row of `homesections LEFT JOIN homesectionentries`. Section columns are
// always present; entry columns are null when a section has no entries.
export interface HomeSectionRow {
  sectionId: number;
  order: number;
  sectionTitle: string;
  entryId: number | null;
  entryTitle: string | null;
  titleLink: string | null;
  subtitles: HomeSectionEntrySubtitle[] | null;
  text: string | null;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const mapRowToHomeSectionEntry = (
  row: HomeSectionRow,
): HomeSectionEntryData | null => {
  if (row.entryId === null) {
    return null;
  }

  return {
    id: row.entryId,
    title: row.entryTitle ?? "",
    subtitles: row.subtitles ?? [],
    text: row.text ?? "",
    createdAt: row.createdAt,
    lastModifiedAt: row.lastModifiedAt,
    titleLink: row.titleLink ?? undefined,
  };
};

export const mapRowToHomeSection = (row: HomeSectionRow): HomeSection => {
  const entry = mapRowToHomeSectionEntry(row);

  return {
    id: row.sectionId,
    order: row.order,
    title: row.sectionTitle,
    entries: entry ? [entry] : [],
    createdAt: row.createdAt,
    lastModifiedAt: row.lastModifiedAt,
  };
};
