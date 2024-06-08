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

export interface HomeSectionRow {
  sectionId: number;
  order: number;
  sectionTitle: string;
  entryId: number;
  entryTitle?: string;
  titleLink?: string;
  subtitles: HomeSectionEntrySubtitle[];
  text: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const mapRowToHomeSectionEntry = (
  row: HomeSectionRow,
): HomeSectionEntryData => ({
  id: row.entryId,
  title: row.entryTitle ?? "",
  subtitles: row.subtitles,
  text: row.text,
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
  titleLink: row.titleLink ?? undefined,
});

export const mapRowToHomeSection = (row: HomeSectionRow): HomeSection => ({
  id: row.sectionId,
  order: row.order,
  title: row.sectionTitle,
  entries: [mapRowToHomeSectionEntry(row)],
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
});
