import { Elysia } from "elysia";
import { getMockBlogData, getMockBlogPostData } from "./data/mocks/blog";
import { getMockHomeData } from "./data/mocks/home";
import { getMockSpotifyData, getMockStravaData } from "./data/mocks/interests";
import { type Store } from "./models/store";

const storeData: Store = {
  home: getMockHomeData(),
  interests: {
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  },
  blog: getMockBlogData(),
  blogPost: {
    get: (slug: string) => getMockBlogPostData(slug),
  },
};

const store = new Elysia().state(storeData);

export default store;
