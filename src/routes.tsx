import { Elysia } from "elysia";
import {
  adminPageHandler,
  authenticateHandler,
  blogPageHandler,
  blogPostPageHandler,
  contactPageHandler,
  createBlogPostHandler,
  createBlogPostPageHandler,
  createHomeSectionHandler,
  createHomeSectionPageHandler,
  deleteBlogPostHandler,
  deleteHomeSectionEntryHandler,
  deleteHomeSectionHandler,
  homePageHandler,
  interestsPageHandler,
  loginPageHandler,
  modifyBlogPostHandler,
  modifyBlogPostPageHandler,
  modifyHomeSectionHandler,
  modifyHomeSectionPageHandler,
  newHomeSectionEntryHandler,
  newHomeSectionEntrySubtitleHandler,
  notFoundPageHandler,
  previewBlogPostHandler,
  sendEmailHandler,
  toggleThemeHandler,
} from "./handlers";
import {
  authenticateSchema,
  blogPostPageSchema,
  contactPageSchema,
  createBlogPostPageSchema,
  createBlogPostSchema,
  createHomeSectionSchema,
  deleteBlogPostSchema,
  deleteHomeSectionEntrySchema,
  deleteHomeSectionSchema,
  loginPageSchema,
  modifyBlogPostPageSchema,
  modifyBlogPostSchema,
  modifyHomeSectionPageSchema,
  modifyHomeSectionSchema,
  previewBlogPostSchema,
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
  .delete("/admin/blog/:id", deleteBlogPostHandler, deleteBlogPostSchema)
  .get("/admin/blog/:id", modifyBlogPostPageHandler, modifyBlogPostPageSchema)
  .post("/admin/blog/:id", modifyBlogPostHandler, modifyBlogPostSchema)
  .get("/admin/blog/new", createBlogPostPageHandler, createBlogPostPageSchema)
  .post("/admin/blog/new", createBlogPostHandler, createBlogPostSchema)
  .post("/admin/blog/preview", previewBlogPostHandler, previewBlogPostSchema)
  .get("/admin/home/new", createHomeSectionPageHandler)
  .post("/admin/home/new", createHomeSectionHandler, createHomeSectionSchema)
  .get(
    "/admin/home/:id",
    modifyHomeSectionPageHandler,
    modifyHomeSectionPageSchema,
  )
  .post("/admin/home/:id", modifyHomeSectionHandler, modifyHomeSectionSchema)
  .delete("/admin/home/:id", deleteHomeSectionHandler, deleteHomeSectionSchema)
  .post("/admin/home/entry/new", newHomeSectionEntryHandler)
  .delete(
    "/admin/home/entry/:id",
    deleteHomeSectionEntryHandler,
    deleteHomeSectionEntrySchema,
  )
  .post("/admin/home/entry/subtitle/new", newHomeSectionEntrySubtitleHandler);
