import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
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

const publicRoutes = new Elysia()
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

const routes = new Elysia().use(html()).use(publicRoutes).use(adminRoutes);

export default routes;
