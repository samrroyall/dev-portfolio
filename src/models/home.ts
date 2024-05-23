export interface HomeSectionEntrySubtitle {
  title: string;
  detail?: string;
}

export interface HomeSectionEntryData {
  title: string;
  subtitles: HomeSectionEntrySubtitle[];
  text: string;
  titleLink?: string;
}

export const mapRowToHomeSectionEntryData = (row: any) => ({
  title: row.title,
  subtitles: JSON.parse(row.subtitles),
  text: row.text,
  titleLink: row.titleLink ?? undefined,
});

export interface HomeSection {
  title: string;
  entries: HomeSectionEntryData[];
}

export type HomeData = Promise<HomeSection[]>;
