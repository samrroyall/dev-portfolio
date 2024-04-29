export interface HomeSectionEntry {
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
  entries: HomeSectionEntry[];
}

export type HomeData = Promise<HomeSection[]>;
