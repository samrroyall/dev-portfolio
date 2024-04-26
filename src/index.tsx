import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { getStravaData, type StravaData } from "./api";
import { Blog, BlogPost, Contact, Home, Interests } from "./components/pages";
import { getMockStravaData } from "./mocks";

export interface InterestsData {
  letterboxd: null;
  spotify: null;
  strava: StravaData;
}

export interface Store {
  interests: InterestsData;
}

const app = new Elysia()
  .use(staticPlugin())
  .use(bethStack())
  .state<Store>("interests", {
    letterboxd: null,
    strava: process.env.USE_MOCKS ? getMockStravaData() : getStravaData(),
    spotify: null,
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
