import { t, type Static } from "elysia";

export const authSchema = {
  body: t.Object({
    username: t.String(),
    password: t.String(),
    "g-recaptcha-response": t.String(),
  }),
};

export interface AuthSchema {
  body: Static<typeof authSchema.body>;
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

export const loginSchema = {
  query: t.Object({
    success: t.Optional(t.String()),
    error: t.Optional(t.String()),
  }),
};

export interface LoginSchema {
  query: Static<typeof loginSchema.query>;
}

export const sendSchema = {
  body: t.Object({
    name: t.Union([t.String(), t.Undefined()]),
    email: t.String(),
    body: t.String(),
    "g-recaptcha-response": t.String(),
  }),
};

export interface SendSchema {
  body: Static<typeof sendSchema.body>;
}
