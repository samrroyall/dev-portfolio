import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import {
  Blog,
  BlogPost,
  Contact,
  Home,
  Interests,
  NotFound,
} from "./components/pages";
import { getMockBlogData, getMockBlogPostData } from "./data/mocks/blog";
import { getMockHomeData } from "./data/mocks/home";
import { getMockSpotifyData, getMockStravaData } from "./data/mocks/interests";
import { type BlogData, type BlogPostData } from "./models/blog";
import { type HomeData } from "./models/home";
import { type InterestsData } from "./models/interests";

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
