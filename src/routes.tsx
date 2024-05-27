import { Elysia } from "elysia";
import {
  adminPageHandler,
  authenticateHandler,
  blogPageHandler,
  blogPostPageHandler,
  contactPageHandler,
  createBlogPostPageHandler,
  createHomeSectionHandler,
  createHomeSectionPageHandler,
  deleteHomeSectionEntryHandler,
  deleteHomeSectionHandler,
  homePageHandler,
  interestsPageHandler,
  loginPageHandler,
  modifyHomeSectionHandler,
  modifyHomeSectionPageHandler,
  newHomeSectionEntryHandler,
  newHomeSectionEntrySubtitleHandler,
  notFoundPageHandler,
  sendEmailHandler,
  toggleThemeHandler,
} from "./handlers";
import {
  authenticateSchema,
  blogPostPageSchema,
  contactPageSchema,
  deleteHomeSectionEntrySchema,
  deleteHomeSectionSchema,
  loginPageSchema,
  modifyHomeSectionPageSchema,
  modifyHomeSectionSchema,
  newHomeSectionEntrySubtitleSchema,
  sendEmailSchema,
  toggleThemeSchema,
} from "./models/routes";

export const publicRoutes = new Elysia()
  .get("/404", notFoundPageHandler)
  .get("/", homePageHandler)
  .get("/blog", blogPageHandler)
  .get("/blog/post/:slug", blogPostPageHandler, blogPostPageSchema)
  .get("/contact", contactPageHandler, contactPageSchema)
  .get("/interests", interestsPageHandler)
  .get("/login", loginPageHandler, loginPageSchema)
  .post("/authenticate", authenticateHandler, authenticateSchema)
  .post("/sendemail", sendEmailHandler, sendEmailSchema)
  .post("/toggletheme", toggleThemeHandler, toggleThemeSchema);

export const adminRoutes = new Elysia()
  .get("/admin", adminPageHandler)
  .get("/admin/blog/new", createBlogPostPageHandler)
  .get("/admin/home/new", createHomeSectionPageHandler)
  .post("/admin/home/new", createHomeSectionHandler)
  .post("/admin/home/entry/new", newHomeSectionEntryHandler)
  .delete(
    "/admin/home/entry/:id",
    deleteHomeSectionEntryHandler,
    deleteHomeSectionEntrySchema,
  )
  .post(
    "/admin/home/entry/subtitle/new",
    newHomeSectionEntrySubtitleHandler,
    newHomeSectionEntrySubtitleSchema,
  )
  .get(
    "/admin/home/:id",
    modifyHomeSectionPageHandler,
    modifyHomeSectionPageSchema,
  )
  .post("/admin/home/:id", modifyHomeSectionHandler, modifyHomeSectionSchema)
  .delete("/admin/home/:id", deleteHomeSectionHandler, deleteHomeSectionSchema);

//.post("/admin/blog/new", )
//.get("/admin/blog/:id", )
//.post("/admin/blog/:id", )
//.delete("/admin/blog/:id", )
