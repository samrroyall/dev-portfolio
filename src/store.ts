import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { getBlogData, getBlogPostData } from "./data/api/blog";
import { getHomeData } from "./data/api/home";
import { getMockSpotifyData, getMockStravaData } from "./data/mocks/interests";
import { type Store } from "./models/store";

export const getStoreData = (db: LibSQLDatabase): Store => ({
  home: getHomeData(db),
  interests: {
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  },
  blog: getBlogData(db),
  blogPost: {
    get: (slug: string) => getBlogPostData(db, slug),
  },
});
