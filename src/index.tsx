import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { getMockHomeData } from "./api/mocks/home";
import { getMockSpotifyData } from "./api/mocks/spotify";
import { getMockStravaData } from "./api/mocks/strava";
import { type HomeData } from "./api/models/home";
import { type InterestsData } from "./api/models/interests";
import { Blog, BlogPost, Contact, Home, Interests } from "./components/pages";

export interface Store {
  home: HomeData;
  interests: InterestsData;
}

const app = new Elysia()
  .use(staticPlugin())
  .use(bethStack())
  .state("home", getMockHomeData())
  .state("interests", {
    letterboxd: null,
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  })
  .get("/", ({ html, store }) => html(() => <Home data={store.home} />))
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
