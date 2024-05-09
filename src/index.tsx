import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import routes from "./routes";
import store from "./store";

const hooks = new Elysia().onError(({ code, set }) => {
  if (code === "NOT_FOUND") {
    set.status = 303;
    set.headers.location = "/404";
    return "";
  }
});

const app: Elysia = new Elysia()
  .use(staticPlugin())
  .state(store)
  .use(hooks)
  .use(routes)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
