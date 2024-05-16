import { type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { type BlogData, type BlogPostData } from "./blog";
import { type HomeData } from "./home";
import { type InterestsData } from "./interests";

export interface Store extends Record<string, unknown> {
  db: {
    sessions: BunSQLiteDatabase;
  };
  home: HomeData;
  interests: InterestsData;
  blog: BlogData;
  blogPost: {
    get: (id: number) => BlogPostData;
  };
}
