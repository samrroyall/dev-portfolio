import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { NotFound } from "./components/pages";
import {
  adminHandler,
  authHandler,
  blogHandler,
  blogPostHandler,
  contactHandler,
  homeHandler,
  interestsHandler,
  loginHandler,
  sendHandler,
} from "./handlers";
import {
  authSchema,
  blogPostSchema,
  contactSchema,
  loginSchema,
  sendSchema,
} from "./schemas";
import { store } from "./store";

const hooks = new Elysia().use(bethStack()).onError(({ html, code }) => {
  if (code === "NOT_FOUND") {
    return html(() => <NotFound />);
  }
});

const publicRoutes = new Elysia()
  .state(store)
  .use(bethStack())
  .get("/", homeHandler)
  .get("/blog", blogHandler)
  .get("/blog/post/:id", blogPostHandler, blogPostSchema)
  .get("/contact", contactHandler, contactSchema)
  .get("/interests", interestsHandler)
  .get("/login", loginHandler, loginSchema)
  .post("/authenticate", authHandler, authSchema)
  .post("/send", sendHandler, sendSchema);

const adminRoutes = new Elysia().group("/admin", (app) =>
  app.use(bethStack()).get("", adminHandler),
);

export default new Elysia().use(hooks).use(publicRoutes).use(adminRoutes);
