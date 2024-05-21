import { type BlogData, type BlogPostData } from "./blog";
import { type HomeData } from "./home";
import { type InterestsData } from "./interests";

export interface Store extends Record<string, unknown> {
  home: HomeData;
  interests: InterestsData;
  blog: BlogData;
  blogPost: {
    get: (slug: string) => BlogPostData;
  };
}
