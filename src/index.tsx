import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { Blog, BlogPost, Contact, Home, Interests } from "./components/pages";

interface ContactState {
  textareaLength: number;
}

export interface Store {
  contact: ContactState;
}

const app = new Elysia()
  .use(staticPlugin())
  .use(bethStack())
  .get("/", ({ html }) => html(() => <Home />))
  .get("/interests", ({ html }) => html(() => <Interests />))
  .get("/blog", ({ html }) => html(() => <Blog />))
  .get("/blog/post", ({ html }) => html(() => <BlogPost />))
  .get("/contact", ({ html }) => html(() => <Contact />))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
