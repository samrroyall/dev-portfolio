import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { getMockSpotifyData } from "./api/mocks/spotify";
import { getMockStravaData } from "./api/mocks/strava";
import { type Track } from "./api/models/spotify";
import { type RunMonth } from "./api/models/strava";
import { Blog, BlogPost, Contact, Home, Interests } from "./components/pages";

export interface InterestsData {
  letterboxd: null;
  spotify: Promise<[Track, Track, Track]>;
  strava: Promise<RunMonth>;
}

export interface Store {
  interests: InterestsData;
}

const app = new Elysia()
  .use(staticPlugin())
  .use(bethStack())
  .state<Store>("interests", {
    letterboxd: null,
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  })
  .get("/", ({ html }) => html(() => <Home />))
  .get("/interests", ({ html, store }) =>
    html(() => <Interests data={store.interests} />),
  )
  .get("/blog", ({ html }) => html(() => <Blog />))
  .get("/blog/post", ({ html }) => html(() => <BlogPost />))
  .get("/contact", ({ html }) => html(() => <Contact />))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
