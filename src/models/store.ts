import { getMockBlogData, getMockBlogPostData } from "../data/mocks/blog";
import { getMockHomeData } from "../data/mocks/home";
import { getMockSpotifyData, getMockStravaData } from "../data/mocks/interests";
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

export const store = {
  home: getMockHomeData(),
  interests: {
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  },
  blog: getMockBlogData(),
  blogPost: {
    get: (id: number) => getMockBlogPostData(id),
  },
};
