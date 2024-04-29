import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { getBlogMockData } from "./api/mocks/blog";
import { getMockHomeData } from "./api/mocks/home";
import { getMockSpotifyData } from "./api/mocks/spotify";
import { getMockStravaData } from "./api/mocks/strava";
import { type BlogData } from "./api/models/blog";
import { type HomeData } from "./api/models/home";
import { type InterestsData } from "./api/models/interests";
import {
  Blog,
  BlogPost,
  Contact,
  Home,
  Interests,
  NotFound,
} from "./components/pages";

export interface Store {
  home: HomeData;
  interests: InterestsData;
  blog: BlogData;
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
  .state("blog", getBlogMockData())
  .onError(({ html, code }) => {
    if (code === "NOT_FOUND") {
      return html(() => <NotFound />);
    }
  })
  .get("/", ({ html, store }) => html(() => <Home data={store.home} />))
  .get("/interests", ({ html, store }) =>
    html(() => <Interests data={store.interests} />),
  )
  .get("/blog", ({ html, store }) => html(() => <Blog data={store.blog} />))
  .get("/blog/post/:id", ({ html, params: { id } }) =>
    html(() => <BlogPost id={id} />),
  )
  .get("/contact", ({ html }) => html(() => <Contact />))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
