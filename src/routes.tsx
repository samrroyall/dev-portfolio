import { Elysia } from "elysia";
import {
  adminHandler,
  authenticateHandler,
  blogHandler,
  blogPostHandler,
  contactHandler,
  createBlogPostHandler,
  createHomeSectionHandler,
  homeHandler,
  interestsHandler,
  loginHandler,
  newHomeSectionEntryHandler,
  newHomeSectionEntrySubtitleHandler,
  notFoundHandler,
  sendEmailHandler,
  toggleThemeHandler,
} from "./handlers";
import {
  authenticateSchema,
  blogPostSchema,
  contactSchema,
  loginSchema,
  newHomeSectionEntrySubtitleSchema,
  sendEmailSchema,
  toggleThemeSchema,
} from "./models/routes";

export const publicRoutes = new Elysia()
  .get("/404", notFoundHandler)
  .get("/", homeHandler)
  .get("/blog", blogHandler)
  .get("/blog/post/:slug", blogPostHandler, blogPostSchema)
  .get("/contact", contactHandler, contactSchema)
  .get("/interests", interestsHandler)
  .get("/login", loginHandler, loginSchema)
  .post("/authenticate", authenticateHandler, authenticateSchema)
  .post("/sendemail", sendEmailHandler, sendEmailSchema)
  .post("/toggletheme", toggleThemeHandler, toggleThemeSchema);

export const adminRoutes = new Elysia()
  .get("/admin", adminHandler)
  .get("/admin/blog/new", createBlogPostHandler)
  //.post("/admin/blog/new", createBlogPostHandler)
  //.get("/admin/blog/:id", createBlogPostHandler)
  //.post("/admin/blog/:id", createBlogPostHandler)
  //.delete("/admin/blog/:id", createBlogPostHandler)
  .get("/admin/home/new", createHomeSectionHandler)
  .post("/admin/home/new", insertHomeSectionHandler)
  .post("/admin/home/entry/new", newHomeSectionEntryHandler)
  .post(
    "/admin/home/entry/subtitle/new",
    newHomeSectionEntrySubtitleHandler,
    newHomeSectionEntrySubtitleSchema,
  );
//.get("/admin/home/:id", createHomeSectionHandler)
//.post("/admin/home/:id", createHomeSectionHandler)
//.delete("/admin/home/:id", createHomeSectionHandler);
