import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { getMockBlogData, getMockBlogPostData } from "./api/mocks/blog";
import { getMockHomeData } from "./api/mocks/home";
import { getMockSpotifyData } from "./api/mocks/spotify";
import { getMockStravaData } from "./api/mocks/strava";
import { type BlogData, type BlogPostData } from "./api/models/blog";
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
  blogPost: {
    get: (id: string) => BlogPostData;
  };
}

const plugins = new Elysia().use(bethStack());

const home = new Elysia()
  .use(plugins)
  .state("home", getMockHomeData())
  .get("/", ({ html, store }) => html(() => <Home data={store.home} />));

const interests = new Elysia()
  .use(plugins)
  .state("interests", {
    letterboxd: null,
    spotify: getMockSpotifyData(),
    strava: getMockStravaData(),
  })
  .get("/interests", ({ html, store }) =>
    html(() => <Interests data={store.interests} />),
  );

const blog = new Elysia()
  .use(plugins)
  .state("blog", getMockBlogData())
  .get("/blog", ({ html, store }) => html(() => <Blog data={store.blog} />));

const blogPost = new Elysia()
  .use(plugins)
  .state("blogPost", {
    get: (id: string) => getMockBlogPostData(id),
  })
  .get("/blog/post/:id", ({ html, store, params: { id } }) =>
    html(() => <BlogPost data={store.blogPost.get(id)} />),
  );

const contact = new Elysia()
  .use(plugins)
  .get("/contact", ({ html }) => html(() => <Contact />));

const pages = new Elysia()
  .use(home)
  .use(contact)
  .use(blog)
  .use(blogPost)
  .use(interests);

const notFound = new Elysia().use(plugins).onError(({ html, code }) => {
  if (code === "NOT_FOUND") {
    return html(() => <NotFound />);
  }
});

const app = new Elysia()
  .use(staticPlugin())
  .use(notFound)
  .use(pages)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
