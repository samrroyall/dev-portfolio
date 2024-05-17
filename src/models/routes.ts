import { t, type Cookie, type Static } from "elysia";

export interface DefaultPageProps {
  theme: Cookie<string | undefined>;
}

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

export const blogPostSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export interface BlogPostSchema {
  params: Static<typeof blogPostSchema.params>;
}

export const contactSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface ContactSchema {
  query: Static<typeof contactSchema.query>;
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

export const loginSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface LoginSchema {
  query: Static<typeof loginSchema.query>;
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
