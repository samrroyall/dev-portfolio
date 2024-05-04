export interface HomeSectionEntryData {
  title: string;
  subtitles: {
    title: string;
    detail?: string;
  }[];
  text: string;
  titleLink?: string;
  date?: string;
}

export interface HomeSection {
  title: string;
  entries: HomeSectionEntryData[];
}

export type HomeData = Promise<HomeSection[]>;
