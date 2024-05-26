import { Elysia } from "elysia";
import {
  adminHandler,
  authenticateHandler,
  blogHandler,
  blogPostHandler,
  contactHandler,
  createBlogPostHandler,
  createHomeSectionHandler,
  deleteHomeSectionHandler,
  homeHandler,
  insertHomeSectionHandler,
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
  modifyHomeSectionSchema,
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

//.post("/admin/blog/new", )
//.get("/admin/blog/:id", )
//.post("/admin/blog/:id", )
//.delete("/admin/blog/:id", )
//.get("/admin/home/:id", )
//.post("/admin/home/:id", )

export const adminRoutes = new Elysia()
  .get("/admin", adminHandler)
  .get("/admin/blog/new", createBlogPostHandler)
  .get("/admin/home/new", createHomeSectionHandler)
  .post("/admin/home/new", insertHomeSectionHandler)
  .post("/admin/home/entry/new", newHomeSectionEntryHandler)
  .post(
    "/admin/home/entry/subtitle/new",
    newHomeSectionEntrySubtitleHandler,
    newHomeSectionEntrySubtitleSchema,
  )
  .delete("/admin/home/:id", deleteHomeSectionHandler, modifyHomeSectionSchema);
