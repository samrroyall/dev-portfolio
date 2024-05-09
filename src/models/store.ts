import { type BlogData, type BlogPostData } from "./blog";
import { type HomeData } from "./home";
import { type InterestsData } from "./interests";

export interface Store {
  home: HomeData;
  interests: InterestsData;
  blog: BlogData;
  blogPost: {
    get: (id: number) => BlogPostData;
  };
}
