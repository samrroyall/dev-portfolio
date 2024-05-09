import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { getMockBlogData, getMockBlogPostData } from "./data/mocks/blog";
import { getMockHomeData } from "./data/mocks/home";
import { getMockSpotifyData, getMockStravaData } from "./data/mocks/interests";
import {
  adminHandler,
  authHandler,
  blogHandler,
  blogPostHandler,
  contactHandler,
  homeHandler,
  interestsHandler,
  loginHandler,
  notFoundHandler,
  sendHandler,
} from "./handlers";
import {
  authSchema,
  blogPostSchema,
  contactSchema,
  loginSchema,
  sendSchema,
} from "./models/routes";

const hooks = new Elysia().use(html()).onError(({ code, set }) => {
  if (code === "NOT_FOUND") {
    set.status = 303;
    set.headers.location = "/404";
    return "";
  }
});

const publicRoutes = new Elysia()
  .state({
    home: getMockHomeData(),
    interests: {
      letterboxd: null,
      spotify: getMockSpotifyData(),
      strava: getMockStravaData(),
    },
    blog: getMockBlogData(),
    blogPost: {
      get: (id: number) => getMockBlogPostData(id),
    },
  })
  .get("/404", notFoundHandler)
  .get("/", homeHandler)
  .get("/blog", blogHandler)
  .get("/blog/post/:id", blogPostHandler, blogPostSchema)
  .get("/contact", contactHandler, contactSchema)
  .get("/interests", interestsHandler)
  .get("/login", loginHandler, loginSchema)
  .post("/authenticate", authHandler, authSchema)
  .post("/send", sendHandler, sendSchema);

const adminRoutes = new Elysia().group("/admin", (app) =>
  app.get("", adminHandler),
);

const routes = new Elysia()
  .use(html())
  .use(hooks)
  .use(publicRoutes)
  .use(adminRoutes);

export default routes;
