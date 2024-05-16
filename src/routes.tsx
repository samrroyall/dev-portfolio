import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import {
  adminHandler,
  authenticateHandler,
  blogHandler,
  blogPostHandler,
  contactHandler,
  homeHandler,
  interestsHandler,
  loginHandler,
  notFoundHandler,
  sendEmailHandler,
  toggleThemeHandler,
} from "./handlers";
import {
  authenticateSchema,
  blogPostSchema,
  contactSchema,
  loginSchema,
  sendEmailSchema,
  toggleThemeSchema,
} from "./models/routes";

const publicRoutes = new Elysia()
  .get("/404", notFoundHandler)
  .get("/", homeHandler)
  .get("/blog", blogHandler)
  .get("/blog/post/:id", blogPostHandler, blogPostSchema)
  .get("/contact", contactHandler, contactSchema)
  .get("/interests", interestsHandler)
  .get("/login", loginHandler, loginSchema)
  .post("/authenticate", authenticateHandler, authenticateSchema)
  .post("/sendemail", sendEmailHandler, sendEmailSchema)
  .post("/toggletheme", toggleThemeHandler, toggleThemeSchema);

const adminRoutes = new Elysia().group("/admin", (app) =>
  app.get("", adminHandler),
);

const routes = new Elysia().use(html()).use(publicRoutes).use(adminRoutes);

export default routes;
