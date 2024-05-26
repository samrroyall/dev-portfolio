export interface HomeSectionEntrySubtitle {
  title: string;
  detail?: string;
}

export interface HomeSectionEntryData {
  id: number;
  title: string;
  subtitles: HomeSectionEntrySubtitle[];
  text: string;
  createdAt: number;
  lastModifiedAt: number;
  titleLink?: string;
}

export const mapRowToHomeSectionEntry = (row: any): HomeSectionEntryData => ({
  id: row.entryId,
  title: row.title,
  subtitles: JSON.parse(row.subtitles) as HomeSectionEntrySubtitle[],
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
  createdAt: number;
  lastModifiedAt: number;
}

export const mapRowToHomeSection = (row: any): HomeSection => ({
  id: row.sectionId,
  order: row.sectionOrder,
  title: row.sectionTitle,
  entries: [mapRowToHomeSectionEntry(row)],
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
});

export type HomeData = Promise<HomeSection[]>;
