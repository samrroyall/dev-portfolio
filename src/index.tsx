import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import routes from "./routes";
import store from "./store";
import "dotenv/config";

if (!process.env.COOKIE_SECRET) {
  throw Error("No value provided for COOKIE_SECRET");
}

const app = new Elysia({
  cookie: {
    secrets: process.env.COOKIE_SECRET,
    sign: ["session"],
  },
})
  .use(staticPlugin())
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 303;
      set.redirect = "/404";
      return "";
    } else {
      return new Response(`${code}: ${JSON.stringify(error)}`);
    }
  })
  .state(store)
  .use(routes)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
