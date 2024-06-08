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

export const createBlogPostPageSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface CreateBlogPostPageSchema {
  query: Static<typeof createBlogPostPageSchema.query>;
}

export const createBlogPostSchema = {
  body: t.Object({
    slug: t.String(),
    title: t.String(),
    subtitle: t.String(),
    blurb: t.String(),
    text: t.String(),
    "g-recaptcha-response": t.String(),
  }),
};

export interface CreateBlogPostSchema {
  body: Static<typeof createBlogPostSchema.body>;
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

export const createHomeSectionSchema = {
  body: t.Object({
    "g-recaptcha-response": t.String(),
    jsonData: t.String(
      t.Object({
        title: t.String(),
        entries: t.Array(
          t.Object({
            title: t.Optional(t.String()),
            titleLink: t.Optional(t.String()),
            text: t.String(),
            subtitles: t.Array(
              t.Object({
                title: t.String(),
                detail: t.Optional(t.String()),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
};

export interface CreateHomeSectionSchema {
  body: Static<typeof createHomeSectionSchema.body>;
}

export const deleteBlogPostSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface DeleteBlogPostSchema {
  params: Static<typeof deleteBlogPostSchema.params>;
}

export const deleteHomeSectionSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface DeleteHomeSectionSchema {
  params: Static<typeof deleteHomeSectionSchema.params>;
}

export const deleteHomeSectionEntrySchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface DeleteHomeSectionEntrySchema {
  params: Static<typeof deleteHomeSectionEntrySchema.params>;
}

export const loginPageSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface LoginPageSchema {
  query: Static<typeof loginPageSchema.query>;
}

export const modifyBlogPostPageSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface ModifyBlogPostPageSchema {
  params: Static<typeof modifyBlogPostPageSchema.params>;
  query: Static<typeof modifyBlogPostPageSchema.query>;
}

export const modifyBlogPostSchema = {
  body: t.Object({
    slug: t.String(),
    title: t.String(),
    subtitle: t.String(),
    blurb: t.String(),
    text: t.String(),
    "g-recaptcha-response": t.String(),
  }),
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface ModifyBlogPostSchema {
  body: Static<typeof modifyBlogPostSchema.body>;
  params: Static<typeof modifyBlogPostSchema.params>;
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

export const modifyHomeSectionSchema = {
  body: t.Object({
    "g-recaptcha-response": t.String(),
    jsonData: t.String(
      t.Object({
        order: t.Numeric(),
        title: t.String(),
        entries: t.Array(
          t.Object({
            id: t.Optional(t.Numeric()),
            title: t.Optional(t.String()),
            titleLink: t.Optional(t.String()),
            text: t.String(),
            subtitles: t.Array(
              t.Object({
                title: t.String(),
                detail: t.Optional(t.String()),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
};

export interface ModifyHomeSectionSchema {
  body: Static<typeof modifyHomeSectionSchema.body>;
}

export const previewBlogPostSchema = {
  body: t.Object({
    slug: t.Optional(t.String()),
    title: t.Optional(t.String()),
    subtitle: t.Optional(t.String()),
    blurb: t.Optional(t.String()),
    text: t.Optional(t.String()),
  }),
};

export interface PreviewBlogPostSchema {
  body: Static<typeof previewBlogPostSchema.body>;
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
