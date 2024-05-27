import { t, type Static } from "elysia";

interface NavRoute {
  label: string;
  link: string;
}
export const adminNavRoutes: NavRoute[] = [
  { label: "home", link: "/admin" },
  { label: "create blog post", link: "/admin/blog/new" },
  { label: "create home section", link: "/admin/home/new" },
];

export const navRoutes: NavRoute[] = [
  { label: "home", link: "/" },
  { label: "interests", link: "/interests" },
  { label: "blog", link: "/blog" },
  { label: "contact", link: "/contact" },
];

export const authenticateSchema = {
  body: t.Object({
    username: t.String(),
    password: t.String(),
    "g-recaptcha-response": t.String(),
  }),
};

export interface AuthenticateSchema {
  body: Static<typeof authenticateSchema.body>;
}

export const blogPostPageSchema = {
  params: t.Object({
    slug: t.String(),
  }),
};

export interface BlogPostPageSchema {
  params: Static<typeof blogPostPageSchema.params>;
}

export const contactPageSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface ContactPageSchema {
  query: Static<typeof contactPageSchema.query>;
}

export const cookieSchema = {
  cookie: t.Cookie({
    theme: t.Optional(t.String()),
    session: t.Optional(t.String()),
  }),
};

export interface CookieSchema {
  cookie: Static<typeof cookieSchema.cookie>;
}

export const createHomeSectionPageSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface CreateHomeSectionPageSchema {
  query: Static<typeof createHomeSectionPageSchema.query>;
}

export const deleteHomeSectionSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface DeleteHomeSectionSchema {
  params: Static<typeof deleteHomeSectionSchema.params>;
}

export const deleteHomeSectionEntrySchema = deleteHomeSectionSchema;

export type DeleteHomeSectionEntrySchema = DeleteHomeSectionSchema;

export const loginPageSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface LoginPageSchema {
  query: Static<typeof loginPageSchema.query>;
}

export const modifyHomeSectionSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface ModifyHomeSectionSchema {
  params: Static<typeof modifyHomeSectionSchema.params>;
}

export const modifyHomeSectionPageSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface ModifyHomeSectionPageSchema {
  params: Static<typeof modifyHomeSectionPageSchema.params>;
  query: Static<typeof modifyHomeSectionPageSchema.query>;
}

export const newHomeSectionEntrySubtitleSchema = {
  query: t.Object({
    entryId: t.String(),
  }),
};

export interface NewHomeSectionEntrySubtitleSchema {
  query: Static<typeof newHomeSectionEntrySubtitleSchema.query>;
}

export const sendEmailSchema = {
  body: t.Object({
    name: t.Union([t.String(), t.Undefined()]),
    email: t.String(),
    body: t.String(),
    "g-recaptcha-response": t.String(),
  }),
};

export interface SendEmailSchema {
  body: Static<typeof sendEmailSchema.body>;
}

export const toggleThemeSchema = {
  headers: t.Object({
    origin: t.String(),
    referer: t.String(),
  }),
};

export interface ToggleThemeSchema {
  headers: Static<typeof toggleThemeSchema.headers>;
}
