import { staticPlugin } from "@elysiajs/static";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import { Blog, Contact, Home, Interests } from "./components/pages";

const app = new Elysia()
  .use(staticPlugin())
  .use(bethStack())
  .get("/", ({ html }) => html(() => <Home />))
  .get("/interests", ({ html }) => html(() => <Interests />))
  .get("/blog", ({ html }) => html(() => <Blog />))
  .get("/contact", ({ html }) => html(() => <Contact />))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
